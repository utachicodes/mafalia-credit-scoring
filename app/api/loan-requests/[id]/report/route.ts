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
    endpoint: `/api/loan-requests/${id}/report`,
    method: "GET",
    resourceId: id,
  })

  // Fetch loan request
  const { data: loanRequest, error: lrError } = await supabase.from("loan_requests").select("*").eq("id", id).single()

  if (lrError || !loanRequest) {
    return NextResponse.json({ error: "Loan request not found" }, { status: 404 })
  }

  // Fetch client
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("*")
    .eq("id", loanRequest.client_id)
    .single()

  if (clientError || !client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 })
  }

  // Fetch last 6 months of financials
  const { data: months, error: monthsError } = await supabase
    .from("monthly_financials")
    .select("*")
    .eq("client_id", client.id)
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

  // Calculate summary
  const totals = financials.reduce(
    (acc, m) => {
      acc.revenue += m.revenue
      acc.expenses += m.expenses
      acc.txCount += m.txCount
      acc.paymentBreakdown.cash += m.paymentBreakdown.cash
      acc.paymentBreakdown.wave += m.paymentBreakdown.wave
      acc.paymentBreakdown.orange_money += m.paymentBreakdown.orange_money
      acc.paymentBreakdown.card += m.paymentBreakdown.card
      return acc
    },
    {
      revenue: 0,
      expenses: 0,
      txCount: 0,
      paymentBreakdown: { cash: 0, wave: 0, orange_money: 0, card: 0 },
    },
  )

  const summary = {
    periodMonths: financials.length,
    avgMonthlyRevenue: financials.length ? Math.round(totals.revenue / financials.length) : 0,
    avgMonthlyExpenses: financials.length ? Math.round(totals.expenses / financials.length) : 0,
    avgMonthlyTxCount: financials.length ? Math.round(totals.txCount / financials.length) : 0,
    paymentBreakdownTotals: totals.paymentBreakdown,
  }

  return NextResponse.json({
    loanRequest,
    client: {
      id: client.id,
      name: client.name,
      type: client.type,
      location: client.location,
    },
    financials,
    summary,
    generatedAt: new Date().toISOString(),
  })
}
