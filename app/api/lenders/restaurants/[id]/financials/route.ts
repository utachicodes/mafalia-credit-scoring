import { NextResponse } from "next/server";
import { clients, mockLastSixMonthsFinancials } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";
import { resolveRole, ensureLender } from "@/lib/rbac";
import { logAccess } from "@/lib/audit";

// GET /api/lenders/restaurants/:id/financials
// Read-only summary for last 6 months
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const role = await resolveRole();
  try { ensureLender(role); } catch { return NextResponse.json({ error: "Forbidden" }, { status: 403 }); }

  // Audit
  try { await logAccess(req as any, { endpoint: `/api/lenders/restaurants/${id}/financials`, resourceId: id }); } catch {}

  // Try DB first
  try {
    const clientDb = await prisma.client.findUnique({ where: { id } });
    if (clientDb) {
      const months = await prisma.monthlyFinancial.findMany({ where: { clientId: id }, orderBy: { ym: "asc" } });
      if (months.length > 0) {
        const financials = months.map((m) => ({
          month: m.ym,
          revenue: m.revenue,
          txCount: m.txCount,
          expenses: m.expenses,
          paymentBreakdown: { cash: m.cash, wave: m.wave, orange_money: m.orange, card: m.card },
        }));
        return NextResponse.json({ client: { id: clientDb.id, name: clientDb.name }, financials });
      }
    }
  } catch (e) {
    // fall through to mock
  }

  // Fallback to mock data
  const client = clients.find((c) => c.id === id);
  if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
  const financials = mockLastSixMonthsFinancials(id);
  return NextResponse.json({ client: { id: client.id, name: client.name }, financials });
}
