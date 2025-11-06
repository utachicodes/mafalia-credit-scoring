"use client";

import { useMemo, useState } from "react";
import { clients, loanRequests } from "@/lib/mock-data";
import type { Client } from "@/lib/domain-types";

type TypeFilter = Client["type"] | "all";

export default function LenderDashboardPage() {
  const [type, setType] = useState<TypeFilter>("all");
  const [minAmount, setMinAmount] = useState<number | "">("");
  const [maxAmount, setMaxAmount] = useState<number | "">("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const rows = useMemo(() => {
    return loanRequests
      .map((lr) => ({
        lr,
        client: clients.find((c) => c.id === lr.clientId)!,
      }))
      .filter(({ lr, client }) => {
        if (type !== "all" && client.type !== type) return false;
        if (minAmount !== "" && lr.amount < minAmount) return false;
        if (maxAmount !== "" && lr.amount > maxAmount) return false;
        if (startDate && lr.createdAt < startDate) return false;
        if (endDate && lr.createdAt > endDate) return false;
        return true;
      });
  }, [type, minAmount, maxAmount, startDate, endDate]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 page-enter">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold">Lender Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-5 border rounded-lg p-4">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Type</div>
          <select value={type} onChange={(e) => setType(e.target.value as TypeFilter)} className="border rounded px-2 py-1">
            <option value="all">All</option>
            <option value="restaurant">Restaurant</option>
            <option value="fast_food">Fast food</option>
            <option value="hotel">Hotel</option>
            <option value="glacier">Glacier</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Min amount</div>
          <input type="number" value={minAmount as any} onChange={(e) => setMinAmount(e.target.value === "" ? "" : Number(e.target.value))} className="border rounded px-2 py-1 w-full"/>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Max amount</div>
          <input type="number" value={maxAmount as any} onChange={(e) => setMaxAmount(e.target.value === "" ? "" : Number(e.target.value))} className="border rounded px-2 py-1 w-full"/>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Start date</div>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border rounded px-2 py-1 w-full"/>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">End date</div>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border rounded px-2 py-1 w-full"/>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">Client</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Term</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Reports</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ lr, client }) => (
              <tr key={lr.id} className="border-t">
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.type}</td>
                <td className="p-3">{lr.amount.toLocaleString()} FCFA</td>
                <td className="p-3">{lr.termMonths} mois</td>
                <td className="p-3">{lr.status}</td>
                <td className="p-3">{lr.createdAt}</td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <a className="underline" href={`/api/loan-requests/${lr.id}/report`} target="_blank">JSON</a>
                    <a className="underline" href={`/api/loan-requests/${lr.id}/report.csv`} target="_blank">CSV</a>
                    <a className="underline" href={`/reports/loan/${lr.id}`} target="_blank">Print</a>
                    <a className="underline" href={`/api/clients/${client.id}/financials`} target="_blank">6M</a>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="p-3" colSpan={7}>No results</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
