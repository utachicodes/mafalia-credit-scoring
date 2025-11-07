import { NextResponse } from "next/server"
import { createClient as createServerSupabase } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getOrCreateWallet as memGetOrCreateWallet, listTransactions as memListTransactions } from "@/lib/wallet/memory"

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
      const { data: wallet, error: wErr } = await admin
        .from("wallets")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle()
      if (wErr) throw wErr
      if (!wallet) {
        return NextResponse.json({ items: [], hasMore: false })
      }
      const { data: txs, error: tErr } = await admin
        .from("wallet_transactions")
        .select("id,wallet_id,type,status,amount,currency,note,reference,metadata,created_at")
        .eq("wallet_id", wallet.id)
        .order("created_at", { ascending: false })
        .limit(50)
      if (tErr) throw tErr
      return NextResponse.json({ items: txs || [], hasMore: false })
    } catch {
      const w = memGetOrCreateWallet(user.id)
      const items = memListTransactions(w.id, 50)
      return NextResponse.json({ items, hasMore: false })
    }
  } catch {
    return NextResponse.json({ error: "internal_error" }, { status: 500 })
  }
}


