"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { clients, transactions, loanRequests } from "@/lib/mock-data";
import type { PaymentMethod } from "@/lib/domain-types";
import { buildScoreInputForClient, estimateRepaymentCapacity } from "@/lib/scoring-mapper";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = clients.find((c) => c.id === params.id);
  if (!client) return notFound();

  const tx = useMemo(() => transactions.filter((t) => t.clientId === client.id), [client.id]);
  const loans = useMemo(() => loanRequests.filter((lr) => lr.clientId === client.id), [client.id]);

  const totals = tx.reduce(
    (acc, t) => {
      if (t.direction === "inflow") acc.inflows += t.amount;
      else acc.outflows += t.amount;
      acc.byMethod[t.method] = (acc.byMethod[t.method] ?? 0) + t.amount;
      return acc;
    },
    { inflows: 0, outflows: 0, byMethod: { cash: 0, wave: 0, orange_money: 0, card: 0 } as Record<PaymentMethod, number> }
  );

  const net = totals.inflows - totals.outflows;

  const score01 = buildScoreInputForClient(client.id).score01;
  const [amount, setAmount] = useState<number>(1000000);
  const [term, setTerm] = useState<number>(12);
  const cap = estimateRepaymentCapacity(client.id, amount, term);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{client.name}</h1>
          <div className="text-sm text-muted-foreground">{client.type} • {client.location}</div>
        </div>
        <Link className="underline" href={`/api/lenders/restaurants/${client.id}/financials`} target="_blank">6-Month Financials (API)</Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="border rounded-lg p-4">
          <div className="text-xs text-muted-foreground">Total Inflows</div>
          <div className="text-xl font-semibold">{totals.inflows.toLocaleString()} FCFA</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-xs text-muted-foreground">Total Outflows</div>
          <div className="text-xl font-semibold">{totals.outflows.toLocaleString()} FCFA</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-xs text-muted-foreground">Net Cashflow</div>
          <div className={`text-xl font-semibold ${net >= 0 ? "text-green-600" : "text-red-600"}`}>{net.toLocaleString()} FCFA</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-xs text-muted-foreground">Credit Score (configurable)</div>
          <div className="text-xl font-semibold">{Math.round(score01 * 100)} / 100</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-lg p-4">
          <div className="font-medium mb-2">Payment Breakdown</div>
          <ul className="text-sm space-y-1">
            <li>Cash: {totals.byMethod.cash.toLocaleString()} FCFA</li>
            <li>Wave: {totals.byMethod.wave.toLocaleString()} FCFA</li>
            <li>Orange Money: {totals.byMethod.orange_money.toLocaleString()} FCFA</li>
            <li>Card: {totals.byMethod.card.toLocaleString()} FCFA</li>
          </ul>
        </div>
        <div className="border rounded-lg p-4">
          <div className="font-medium mb-2">Loan Requests</div>
          <ul className="text-sm space-y-2">
            {loans.map((lr) => (
              <li key={lr.id} className="flex items-center justify-between">
                <span>{lr.amount.toLocaleString()} FCFA • {lr.termMonths} mois • {lr.status}</span>
                <a className="underline" href={`/api/loan-requests/${lr.id}/report`} target="_blank">Report</a>
              </li>
            ))}
            {loans.length === 0 && <li className="text-muted-foreground">No loan requests</li>}
          </ul>
          <div className="mt-4 border-t pt-4">
            <div className="font-medium mb-2">Repayment Capacity (estimate)</div>
            <div className="flex gap-3 items-end">
              <div>
                <div className="text-xs text-muted-foreground">Amount</div>
                <input type="number" className="border rounded px-2 py-1 w-36" value={amount} onChange={(e) => setAmount(Number(e.target.value || 0))} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Term (months)</div>
                <input type="number" className="border rounded px-2 py-1 w-28" value={term} onChange={(e) => setTerm(Number(e.target.value || 0))} />
              </div>
              <div className="ml-auto text-sm">
                <div>Installment: <b>{cap.installment.toLocaleString()} FCFA</b></div>
                <div>Ratio: <b>{cap.ratio.toFixed(2)}x</b> {cap.ok ? "✅" : "⚠️"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Method</th>
              <th className="text-left p-3">Direction</th>
            </tr>
          </thead>
          <tbody>
            {tx.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.amount.toLocaleString()} FCFA</td>
                <td className="p-3">{t.method}</td>
                <td className="p-3">{t.direction}</td>
              </tr>
            ))}
            {tx.length === 0 && (
              <tr>
                <td className="p-3" colSpan={4}>No transactions</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
