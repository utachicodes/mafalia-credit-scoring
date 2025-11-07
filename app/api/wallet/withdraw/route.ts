import { NextResponse } from "next/server"
import { createClient as createServerSupabase } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import {
  getOrCreateWallet as memGetOrCreateWallet,
  pushTransaction as memPushTx,
  debitWallet as memDebit,
  getIdem,
  setIdem,
} from "@/lib/wallet/memory"

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || ""
    if (!contentType.includes("application/json")) return badRequest("content-type must be application/json")

    const supabase = await createServerSupabase()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

    const body = await req.json()
    const amount = Number(body?.amount)
    if (!Number.isFinite(amount) || amount <= 0) return badRequest("amount must be > 0")
    const currency = String(body?.currency || "XOF").toUpperCase()
    const note = typeof body?.note === "string" ? body.note.slice(0, 255) : null
    const reference = typeof body?.reference === "string" ? body.reference.slice(0, 255) : null
    const destination = body?.destination
    if (!destination || typeof destination !== "object" || !("kind" in destination)) return badRequest("destination is required")

    if (destination.kind === "wallet") {
      if (!destination.walletNumber) return badRequest("walletNumber is required")
    } else if (destination.kind === "bank") {
      if (!destination.iban && !destination.accountNumber) return badRequest("iban or accountNumber is required")
    } else {
      return badRequest("unsupported destination kind")
    }

    const idemKey = req.headers.get("x-idempotency-key") || ""
    if (idemKey) {
      const prev = getIdem(idemKey)
      if (prev) return NextResponse.json(prev as any, { status: 201 })
    }

    // Try DB first
    try {
      const admin = createAdminClient()
      const { data: walletRow, error: wErr } = await admin
        .from("wallets")
        .select("id,balance,currency,created_at,updated_at")
        .eq("user_id", user.id)
        .maybeSingle()
      if (wErr) throw wErr
      if (!walletRow) return badRequest("wallet_not_found")
      if (walletRow.balance < amount) return badRequest("insufficient_funds")

      const txId = `wtx_${crypto.randomUUID()}`
      const { error: txErr } = await admin.from("wallet_transactions").insert({
        id: txId,
        wallet_id: walletRow.id,
        type: "withdraw",
        status: "succeeded",
        amount,
        currency,
        note,
        reference,
        metadata: { destination },
      })
      if (txErr) throw txErr

      const { data: updated, error: upErr } = await admin
        .from("wallets")
        .update({ balance: walletRow.balance - amount })
        .eq("id", walletRow.id)
        .select("id,currency,balance,created_at,updated_at")
        .single()
      if (upErr) throw upErr

      // Trigger payout creation (best-effort)
      try {
        const payoutRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/payouts`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            ...(idemKey ? { "x-idempotency-key": `${idemKey}:payout` } : {}),
          },
          body: JSON.stringify({ amount, currency, destination, reference, metadata: { source: "wallet", walletId: updated.id, txId } }),
        })
        // Ignore payout errors; wallet debit already recorded
        await payoutRes?.text().catch(() => null)
      } catch {}

      const response = {
        wallet: {
          id: updated.id,
          userId: user.id,
          currency: updated.currency,
          balance: updated.balance,
          createdAt: updated.created_at,
          updatedAt: updated.updated_at,
        },
        transaction: {
          id: txId,
          walletId: updated.id,
          type: "withdraw" as const,
          status: "succeeded" as const,
          amount,
          currency,
          note,
          reference,
          createdAt: new Date().toISOString(),
        },
      }
      if (idemKey) setIdem(idemKey, response)
      return NextResponse.json(response, { status: 201 })
    } catch {
      // Memory fallback
      const wallet = memGetOrCreateWallet(user.id, currency)
      if (wallet.balance < amount) return badRequest("insufficient_funds")
      const tx = {
        id: `wtx_${crypto.randomUUID()}`,
        walletId: wallet.id,
        type: "withdraw" as const,
        status: "succeeded" as const,
        amount,
        currency,
        note,
        reference,
        metadata: { destination } as Record<string, unknown>,
        createdAt: new Date().toISOString(),
      }
      memDebit(wallet, amount)
      memPushTx(tx)
      // Best-effort payout
      try {
        const payoutRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/payouts`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            ...(idemKey ? { "x-idempotency-key": `${idemKey}:payout` } : {}),
          },
          body: JSON.stringify({ amount, currency, destination, reference, metadata: { source: "wallet", walletId: wallet.id, txId: tx.id } }),
        })
        await payoutRes?.text().catch(() => null)
      } catch {}
      const response = { wallet, transaction: tx }
      if (idemKey) setIdem(idemKey, response)
      return NextResponse.json(response, { status: 201 })
    }
  } catch {
    return NextResponse.json({ error: "internal_error" }, { status: 500 })
  }
}


