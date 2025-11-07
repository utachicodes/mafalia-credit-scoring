import { NextResponse } from "next/server"
import { createClient as createServerSupabase } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import {
  getOrCreateWallet as memGetOrCreateWallet,
  pushTransaction as memPushTx,
  creditWallet as memCredit,
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
    const note = typeof body?.note === "string" ? body.note.slice(0, 255) : null
    if (!Number.isFinite(amount) || amount <= 0) return badRequest("amount must be > 0")
    const currency = String(body?.currency || "XOF").toUpperCase()

    const idemKey = req.headers.get("x-idempotency-key") || ""
    if (idemKey) {
      const prev = getIdem(idemKey)
      if (prev) return NextResponse.json(prev as any, { status: 201 })
    }

    // Try DB first
    try {
      const admin = createAdminClient()
      // Ensure wallet exists
      const { data: walletRow, error: wErr } = await admin
        .from("wallets")
        .select("id,balance,currency,created_at,updated_at")
        .eq("user_id", user.id)
        .maybeSingle()
      let walletId: string
      let balance = 0
      if (wErr) throw wErr
      if (!walletRow) {
        const { data: created, error: insErr } = await admin
          .from("wallets")
          .insert({ user_id: user.id, currency, balance: 0 })
          .select("id,balance,currency,created_at,updated_at")
          .single()
        if (insErr) throw insErr
        walletId = created.id
        balance = created.balance
      } else {
        walletId = walletRow.id
        balance = walletRow.balance
      }

      const txId = `wtx_${crypto.randomUUID()}`
      const { error: txErr } = await admin.from("wallet_transactions").insert({
        id: txId,
        wallet_id: walletId,
        type: "topup",
        status: "succeeded",
        amount,
        currency,
        note,
      })
      if (txErr) throw txErr

      const { data: updated, error: upErr } = await admin
        .from("wallets")
        .update({ balance: balance + amount })
        .eq("id", walletId)
        .select("id,currency,balance,created_at,updated_at")
        .single()
      if (upErr) throw upErr

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
          type: "topup" as const,
          status: "succeeded" as const,
          amount,
          currency,
          note,
          createdAt: new Date().toISOString(),
        },
      }
      if (idemKey) setIdem(idemKey, response)
      return NextResponse.json(response, { status: 201 })
    } catch {
      // Memory fallback
      const wallet = memGetOrCreateWallet(user.id, currency)
      const tx = {
        id: `wtx_${crypto.randomUUID()}`,
        walletId: wallet.id,
        type: "topup" as const,
        status: "succeeded" as const,
        amount,
        currency,
        note,
        createdAt: new Date().toISOString(),
      }
      memCredit(wallet, amount)
      memPushTx(tx)
      const response = { wallet, transaction: tx }
      if (idemKey) setIdem(idemKey, response)
      return NextResponse.json(response, { status: 201 })
    }
  } catch (e) {
    return NextResponse.json({ error: "internal_error" }, { status: 500 })
  }
}


