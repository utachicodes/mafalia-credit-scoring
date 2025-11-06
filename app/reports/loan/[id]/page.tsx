"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface ReportData {
  loanRequest: { id: string; amount: number; termMonths: number; createdAt: string; status: string };
  client: { id: string; name: string; type: string; location: string };
  financials: Array<{ month: string; revenue: number; txCount: number; expenses: number; paymentBreakdown: Record<string, number> }>;
  summary: { periodMonths: number; avgMonthlyRevenue: number; avgMonthlyExpenses: number; avgMonthlyTxCount: number; paymentBreakdownTotals: Record<string, number> };
  generatedAt: string;
}

export default function LoanReportPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/loan-requests/${id}/report`);
        if (!res.ok) {
          console.error(`API error: ${res.status} ${res.statusText}`);
          setLoading(false);
          return;
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Response is not JSON");
          setLoading(false);
          return;
        }
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch report:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">Report not found</div>;

  const { loanRequest: lr, client, summary } = data;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <h1 className="text-2xl font-semibold">Loan Report</h1>
        <div className="flex gap-2">
          <a className="border rounded px-3 py-2 text-sm" href={`/api/loan-requests/${lr.id}/report.csv`}>Download CSV</a>
          <button className="border rounded px-3 py-2 text-sm" onClick={() => window.print()}>Print PDF</button>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="text-sm text-muted-foreground">Client</div>
        <div className="text-lg font-semibold">{client.name}</div>
        <div className="text-xs text-muted-foreground">{client.type} • {client.location}</div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="border rounded-lg p-4">
          <div className="text-xs text-muted-foreground">Amount</div>
          <div className="text-xl font-semibold">{lr.amount.toLocaleString()} FCFA</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-xs text-muted-foreground">Term</div>
          <div className="text-xl font-semibold">{lr.termMonths} months</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-xs text-muted-foreground">Status</div>
          <div className="text-xl font-semibold">{lr.status}</div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="font-medium mb-2">Summary (last {summary.periodMonths} months)</div>
        <ul className="text-sm space-y-1">
          <li>Avg Monthly Revenue: {summary.avgMonthlyRevenue.toLocaleString()} FCFA</li>
          <li>Avg Monthly Expenses: {summary.avgMonthlyExpenses.toLocaleString()} FCFA</li>
          <li>Avg Monthly Transactions: {summary.avgMonthlyTxCount.toLocaleString()}</li>
          <li>Payment Breakdown Totals: cash {summary.paymentBreakdownTotals.cash?.toLocaleString?.() ?? summary.paymentBreakdownTotals.cash} • wave {summary.paymentBreakdownTotals.wave?.toLocaleString?.() ?? summary.paymentBreakdownTotals.wave} • orange_money {summary.paymentBreakdownTotals.orange_money?.toLocaleString?.() ?? summary.paymentBreakdownTotals.orange_money} • card {summary.paymentBreakdownTotals.card?.toLocaleString?.() ?? summary.paymentBreakdownTotals.card}</li>
        </ul>
      </div>

      <div className="text-xs text-muted-foreground">Generated at {new Date(data.generatedAt).toLocaleString()}</div>
    </div>
  );
}
