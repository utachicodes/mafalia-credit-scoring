import { NextResponse } from "next/server";
import { clients, loanRequests } from "@/lib/mock-data";
import { mockLastSixMonthsFinancials } from "@/lib/mock-data";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const lr = loanRequests.find((x) => x.id === id);
  if (!lr) return new NextResponse("Not found", { status: 404 });
  const client = clients.find((c) => c.id === lr.clientId);
  if (!client) return new NextResponse("Client not found", { status: 404 });

  const financials = mockLastSixMonthsFinancials(client.id);
  const headers = ["month","revenue","txCount","expenses","cash","wave","orange_money","card"];
  const lines = [headers.join(",")];
  for (const m of financials) {
    const row = [
      m.month,
      m.revenue,
      m.txCount,
      m.expenses,
      m.paymentBreakdown.cash || 0,
      m.paymentBreakdown.wave || 0,
      m.paymentBreakdown.orange_money || 0,
      m.paymentBreakdown.card || 0,
    ];
    lines.push(row.join(","));
  }
  const body = lines.join("\n");
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=loan-report-${id}.csv`,
    },
  });
}
