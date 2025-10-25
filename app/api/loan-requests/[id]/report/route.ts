import { NextResponse } from "next/server";
import { clients, loanRequests, mockLastSixMonthsFinancials } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";
import { resolveRole, ensureLender } from "@/lib/rbac";
import { logAccess } from "@/lib/audit";

// GET /api/loan-requests/:id/report
// Read-only report for a loan request with summarized recent financials
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const role = await resolveRole();
  try { ensureLender(role); } catch { return NextResponse.json({ error: "Forbidden" }, { status: 403 }); }
  try { await logAccess(req as any, { endpoint: `/api/loan-requests/${id}/report`, resourceId: id }); } catch {}

  // Try DB
  try {
    const lrDb = await prisma.loanRequest.findUnique({ where: { id } });
    if (lrDb) {
      const clientDb = await prisma.client.findUnique({ where: { id: lrDb.clientId } });
      if (!clientDb) return NextResponse.json({ error: "Client not found" }, { status: 404 });
      const months = await prisma.monthlyFinancial.findMany({ where: { clientId: clientDb.id }, orderBy: { ym: "asc" } });
      const financialsDb = months.map((m) => ({
        month: m.ym,
        revenue: m.revenue,
        txCount: m.txCount,
        expenses: m.expenses,
        paymentBreakdown: { cash: m.cash, wave: m.wave, orange_money: m.orange, card: m.card },
      }));
      const totals = financialsDb.reduce(
        (acc: any, m: any) => {
          acc.revenue += m.revenue;
          acc.expenses += m.expenses;
          acc.txCount += m.txCount;
          acc.paymentBreakdown.cash += m.paymentBreakdown.cash;
          acc.paymentBreakdown.wave += m.paymentBreakdown.wave;
          acc.paymentBreakdown.orange_money += m.paymentBreakdown.orange_money;
          acc.paymentBreakdown.card += m.paymentBreakdown.card;
          return acc;
        },
        { revenue: 0, expenses: 0, txCount: 0, paymentBreakdown: { cash: 0, wave: 0, orange_money: 0, card: 0 } }
      );
      const summary = {
        periodMonths: financialsDb.length,
        avgMonthlyRevenue: financialsDb.length ? Math.round(totals.revenue / financialsDb.length) : 0,
        avgMonthlyExpenses: financialsDb.length ? Math.round(totals.expenses / financialsDb.length) : 0,
        avgMonthlyTxCount: financialsDb.length ? Math.round(totals.txCount / financialsDb.length) : 0,
        paymentBreakdownTotals: totals.paymentBreakdown,
      };
      return NextResponse.json({
        loanRequest: lrDb,
        client: { id: clientDb.id, name: clientDb.name, type: clientDb.type, location: clientDb.location },
        financials: financialsDb,
        summary,
        generatedAt: new Date().toISOString(),
      });
    }
  } catch {}

  // Fallback to mock data
  const lr = loanRequests.find((x) => x.id === id);
  if (!lr) return NextResponse.json({ error: "Loan request not found" }, { status: 404 });
  const client = clients.find((c) => c.id === lr.clientId);
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
  const financials = mockLastSixMonthsFinancials(client.id);
  const totals = financials.reduce(
    (acc, m) => {
      acc.revenue += m.revenue;
      acc.expenses += m.expenses;
      acc.txCount += m.txCount;
      for (const [k, v] of Object.entries(m.paymentBreakdown)) {
        acc.paymentBreakdown[k as keyof typeof acc.paymentBreakdown] =
          (acc.paymentBreakdown[k as keyof typeof acc.paymentBreakdown] ?? 0) + v;
      }
      return acc;
    },
    { revenue: 0, expenses: 0, txCount: 0, paymentBreakdown: { cash: 0, wave: 0, orange_money: 0, card: 0 } }
  );

  const summary = {
    periodMonths: 6,
    avgMonthlyRevenue: Math.round(totals.revenue / financials.length),
    avgMonthlyExpenses: Math.round(totals.expenses / financials.length),
    avgMonthlyTxCount: Math.round(totals.txCount / financials.length),
    paymentBreakdownTotals: totals.paymentBreakdown,
  };

  return NextResponse.json({
    loanRequest: lr,
    client: { id: client.id, name: client.name, type: client.type, location: client.location },
    financials,
    summary,
    generatedAt: new Date().toISOString(),
  });
}
