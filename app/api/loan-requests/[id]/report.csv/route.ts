import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch loan request
  const { data: loanRequest } = await supabase.from("loan_requests").select("*").eq("id", id).single()

  if (!loanRequest) {
    return new NextResponse("Not found", { status: 404 })
  }

  // Fetch client
  const { data: client } = await supabase.from("clients").select("*").eq("id", loanRequest.client_id).single()

  if (!client) {
    return new NextResponse("Client not found", { status: 404 })
  }

  // Fetch financials
  const { data: months } = await supabase
    .from("monthly_financials")
    .select("*")
    .eq("client_id", client.id)
    .order("year_month", { ascending: false })
    .limit(6)

  const headers = ["month", "revenue", "txCount", "expenses", "cash", "wave", "orange_money", "card"]
  const lines = [headers.join(",")]

  for (const m of months || []) {
    const row = [m.year_month, m.revenue, m.tx_count, m.expenses, m.cash || 0, m.wave || 0, m.orange || 0, m.card || 0]
    lines.push(row.join(","))
  }

  const body = lines.join("\n")
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=loan-report-${id}.csv`,
    },
  })
}
