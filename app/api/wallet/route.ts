import { NextResponse } from "next/server"
import { createClient as createServerSupabase } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getOrCreateWallet as memGetOrCreateWallet } from "@/lib/wallet/memory"

export async function GET() {
  try {
    const supabase = await createServerSupabase()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }

    // Try DB first
    try {
      const admin = createAdminClient()
      const { data: existing, error: selErr } = await admin
        .from("wallets")
        .select("id,user_id,currency,balance,created_at,updated_at")
        .eq("user_id", user.id)
        .maybeSingle()

      if (selErr && selErr.code !== "PGRST116") {
        throw selErr
      }

      if (!existing) {
        const { data: created, error: insErr } = await admin
          .from("wallets")
          .insert({ user_id: user.id, currency: "XOF", balance: 0 })
          .select("id,user_id,currency,balance,created_at,updated_at")
          .single()
        if (insErr) throw insErr
        return NextResponse.json({
          wallet: {
            id: created.id,
            userId: created.user_id,
            currency: created.currency,
            balance: created.balance,
            createdAt: created.created_at,
            updatedAt: created.updated_at,
          },
        })
      }

      return NextResponse.json({
        wallet: {
          id: existing.id,
          userId: existing.user_id,
          currency: existing.currency,
          balance: existing.balance,
          createdAt: existing.created_at,
          updatedAt: existing.updated_at,
        },
      })
    } catch {
      // Fallback to in-memory store
      const w = memGetOrCreateWallet(user.id)
      return NextResponse.json({ wallet: w })
    }
  } catch (e) {
    return NextResponse.json({ error: "internal_error" }, { status: 500 })
  }
}


