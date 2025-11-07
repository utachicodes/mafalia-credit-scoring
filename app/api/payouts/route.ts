"use server"

import { NextResponse } from "next/server"

// Simple in-memory store for idempotency and listing (ephemeral)
const IDEMPOTENT_RESULTS = new Map<string, unknown>()
const RECENT: any[] = []
import { createAdminClient } from "@/lib/supabase/admin"

type PayoutDestination =
  | {
      kind: "wallet"
      walletProvider?: string // optional, generic
      walletNumber: string
      recipientName?: string
    }
  | {
      kind: "bank"
      iban?: string
      accountNumber?: string
      bankCode?: string
      recipientName?: string
    }

interface CreatePayoutRequest {
  amount: number
  currency?: string // default XOF
  destination: PayoutDestination
  reference?: string
  metadata?: Record<string, unknown>
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || ""
    if (!contentType.includes("application/json")) {
      return badRequest("content-type must be application/json")
    }

    const body = (await req.json()) as CreatePayoutRequest
    if (!body || typeof body !== "object") return badRequest("invalid payload")

    const amount = Number(body.amount)
    if (!Number.isFinite(amount) || amount <= 0) return badRequest("amount must be > 0")

    const currency = (body.currency || "XOF").toUpperCase()
    if (!/^[A-Z]{3,5}$/.test(currency)) return badRequest("invalid currency")

    const dest = body.destination as PayoutDestination
    if (!dest || typeof dest !== "object" || !("kind" in dest)) return badRequest("destination is required")

    if (dest.kind === "wallet") {
      if (!dest.walletNumber || typeof dest.walletNumber !== "string") return badRequest("walletNumber is required")
    } else if (dest.kind === "bank") {
      if (!dest.iban && !dest.accountNumber) return badRequest("iban or accountNumber is required for bank payouts")
    } else {
      return badRequest("unsupported destination kind")
    }

    // Idempotency
    const idemKey = req.headers.get("x-idempotency-key") || ""
    if (idemKey) {
      const existing = IDEMPOTENT_RESULTS.get(idemKey)
      if (existing) {
        return NextResponse.json(existing as any, { status: 201 })
      }
    }

    // Generate an id (works on Edge and Node runtimes)
    const id = `po_${crypto.randomUUID()}`

    // Simulate processing; respond success immediately
    const payout = {
      id,
      status: "succeeded" as const,
      amount,
      currency,
      destination: dest,
      reference: body.reference || null,
      metadata: body.metadata || {},
      createdAt: new Date().toISOString(),
    }

    const response = { payout }

    if (idemKey) IDEMPOTENT_RESULTS.set(idemKey, response)
    RECENT.unshift(response)
    if (RECENT.length > 50) RECENT.pop()

    // Persist to Supabase if available
    try {
      const admin = createAdminClient()
      const dest = payout.destination as any
      await admin.from("payouts").insert({
        id: payout.id,
        amount: payout.amount,
        currency: payout.currency,
        status: payout.status,
        reference: payout.reference,
        metadata: payout.metadata,
        destination_kind: dest.kind,
        wallet_provider: dest.kind === "wallet" ? dest.walletProvider ?? null : null,
        wallet_number: dest.kind === "wallet" ? dest.walletNumber ?? null : null,
        recipient_name: dest.recipientName ?? null,
        bank_iban: dest.kind === "bank" ? dest.iban ?? null : null,
        bank_account_number: dest.kind === "bank" ? dest.accountNumber ?? null : null,
        bank_code: dest.kind === "bank" ? dest.bankCode ?? null : null,
      })
    } catch {
      // ignore if persistence fails
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "internal_error" }, { status: 500 })
  }
}

export async function GET() {
  // Try fetch from DB, fallback to memory
  try {
    const admin = createAdminClient()
    const { data, error } = await admin
      .from("payouts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
    if (!error && data) {
      return NextResponse.json({ items: data, hasMore: false })
    }
  } catch {
    // ignore
  }
  return NextResponse.json({ items: RECENT, hasMore: false })
}

