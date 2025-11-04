import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { logAudit } from "@/lib/supabase/audit"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Check authentication and role
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || !["LENDER", "ADMIN"].includes(profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // Audit log
  await logAudit({
    endpoint: `/api/clients/${id}/financials`,
    method: "GET",
    resourceId: id,
  })

  // Fetch client
  const { data: client, error: clientError } = await supabase.from("clients").select("*").eq("id", id).single()

  if (clientError || !client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 })
  }

  // Fetch last 6 months of financials
  const { data: months, error: monthsError } = await supabase
    .from("monthly_financials")
    .select("*")
    .eq("client_id", id)
    .order("year_month", { ascending: false })
    .limit(6)

  if (monthsError) {
    return NextResponse.json({ error: "Failed to fetch financials" }, { status: 500 })
  }

  const financials = (months || []).map((m) => ({
    month: m.year_month,
    revenue: m.revenue,
    txCount: m.tx_count,
    expenses: m.expenses,
    paymentBreakdown: {
      cash: m.cash,
      wave: m.wave,
      orange_money: m.orange,
      card: m.card,
    },
  }))

  return NextResponse.json({
    client: { id: client.id, name: client.name },
    financials,
  })
}
