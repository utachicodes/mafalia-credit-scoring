import { NextResponse } from "next/server"
import { createClient as createServerSupabase } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import {
  getOrCreateWallet as memGetOrCreateWallet,
  pushTransaction as memPushTx,
  debitWallet as memDebit,
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
    const currency = String(body?.currency || "XOF").toUpperCase()
    const note = typeof body?.note === "string" ? body.note.slice(0, 255) : null
    const recipientEmail = String(body?.recipientEmail || "").trim().toLowerCase()
    if (!Number.isFinite(amount) || amount <= 0) return badRequest("amount must be > 0")
    if (!recipientEmail) return badRequest("recipient_email_required")
    if (recipientEmail === (user.email || "").toLowerCase()) return badRequest("cannot_transfer_to_self")

    const idemKey = req.headers.get("x-idempotency-key") || ""
    if (idemKey) {
      const prev = getIdem(idemKey)
      if (prev) return NextResponse.json(prev as any, { status: 201 })
    }

    // Try DB first
    try {
      const admin = createAdminClient()
      // Resolve recipient user by email
      const rec = await admin.auth.admin.getUserByEmail(recipientEmail)
      if (!rec?.data?.user) return badRequest("recipient_not_found")
      const recipientId = rec.data.user.id

      // Fetch or create wallets
      const ensureWallet = async (uid: string) => {
        const { data: w, error: wErr } = await admin
          .from("wallets")
          .select("id,balance,currency")
          .eq("user_id", uid)
          .maybeSingle()
        if (wErr) throw wErr
        if (!w) {
          const { data: created, error: insErr } = await admin
            .from("wallets")
            .insert({ user_id: uid, currency, balance: 0 })
            .select("id,balance,currency")
            .single()
          if (insErr) throw insErr
          return created
        }
        return w
      }

      const sender = await ensureWallet(user.id)
      const recipient = await ensureWallet(recipientId)
      if (sender.balance < amount) return badRequest("insufficient_funds")

      const outId = `wtx_${crypto.randomUUID()}`
      const inId = `wtx_${crypto.randomUUID()}`

      // Insert both transactions
      const { error: txErr1 } = await admin.from("wallet_transactions").insert({
        id: outId,
        wallet_id: sender.id,
        type: "transfer_out",
        status: "succeeded",
        amount,
        currency,
        note,
        metadata: { recipientEmail },
      })
      if (txErr1) throw txErr1
      const { error: txErr2 } = await admin.from("wallet_transactions").insert({
        id: inId,
        wallet_id: recipient.id,
        type: "transfer_in",
        status: "succeeded",
        amount,
        currency,
        note,
        metadata: { senderEmail: user.email },
      })
      if (txErr2) throw txErr2

      // Update balances
      const { error: up1 } = await admin.from("wallets").update({ balance: sender.balance - amount }).eq("id", sender.id)
      if (up1) throw up1
      const { data: recUpd, error: up2 } = await admin
        .from("wallets")
        .update({ balance: recipient.balance + amount })
        .eq("id", recipient.id)
        .select("id,user_id,currency,balance,created_at,updated_at")
        .single()
      if (up2) throw up2

      const response = {
        wallet: {
          id: sender.id,
          userId: user.id,
          currency: currency,
          balance: sender.balance - amount,
        },
        recipient: {
          id: recUpd.id,
          userId: recUpd.user_id,
          currency: recUpd.currency,
          balance: recUpd.balance,
        },
      }
      if (idemKey) setIdem(idemKey, response)
      return NextResponse.json(response, { status: 201 })
    } catch {
      // Memory fallback
      const sender = memGetOrCreateWallet(user.id, currency)
      if (sender.balance < amount) return badRequest("insufficient_funds")
      // Emulate recipient by hashing email as an ID namespace
      const recipient = memGetOrCreateWallet(`email:${recipientEmail}`, currency)

      const outTx = {
        id: `wtx_${crypto.randomUUID()}`,
        walletId: sender.id,
        type: "transfer_out" as const,
        status: "succeeded" as const,
        amount,
        currency,
        note,
        metadata: { recipientEmail } as Record<string, unknown>,
        createdAt: new Date().toISOString(),
      }
      const inTx = {
        id: `wtx_${crypto.randomUUID()}`,
        walletId: recipient.id,
        type: "transfer_in" as const,
        status: "succeeded" as const,
        amount,
        currency,
        note,
        metadata: { senderEmail: user.email } as Record<string, unknown>,
        createdAt: new Date().toISOString(),
      }
      memDebit(sender, amount)
      memCredit(recipient, amount)
      memPushTx(outTx)
      memPushTx(inTx)
      const response = { wallet: sender }
      if (idemKey) setIdem(idemKey, response)
      return NextResponse.json(response, { status: 201 })
    }
  } catch {
    return NextResponse.json({ error: "internal_error" }, { status: 500 })
  }
}


