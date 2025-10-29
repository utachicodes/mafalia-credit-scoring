"use client";

import { useMemo, useState } from "react";
import { loanRequests as initialLoanRequests, clients } from "@/lib/mock-data";
import type { LoanRequest, LoanRequestStatus } from "@/lib/domain-types";
import { buildScoreInputForClient, estimateRepaymentCapacity } from "@/lib/scoring-mapper";

const STATUSES: LoanRequestStatus[] = ["pending", "approved", "rejected"];

export default function LoanRequestsPage() {
  const [active, setActive] = useState<LoanRequestStatus>("pending");
  const [data, setData] = useState<LoanRequest[]>(() => [...initialLoanRequests]);

  const list = useMemo(() => data.filter((lr) => lr.status === active), [data, active]);

  const counts = useMemo(() => {
    return {
      pending: data.filter((x) => x.status === "pending").length,
      approved: data.filter((x) => x.status === "approved").length,
      rejected: data.filter((x) => x.status === "rejected").length,
    };
  }, [data]);

  const approve = (id: string) => {
    setData((prev) => prev.map((x) => (x.id === id ? { ...x, status: "approved" } : x)));
  };
  const reject = (id: string) => {
    setData((prev) => prev.map((x) => (x.id === id ? { ...x, status: "rejected" } : x)));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Loan Requests</h1>

      <div className="flex gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`px-3 py-1 rounded border ${active === s ? "bg-primary/10 border-primary" : ""}`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s] as number})
          </button>
        ))}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">Client</th>
              <th className="text-left p-3">Score</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Term</th>
              <th className="text-left p-3">Capacity</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((lr) => {
              const client = clients.find((c) => c.id === lr.clientId);
              const score = buildScoreInputForClient(lr.clientId).score01;
              const cap = estimateRepaymentCapacity(lr.clientId, lr.amount, lr.termMonths);
              return (
                <tr key={lr.id} className="border-t">
                  <td className="p-3">{client?.name ?? lr.clientId}</td>
                  <td className="p-3">{Math.round(score * 100)} / 100</td>
                  <td className="p-3">{lr.amount.toLocaleString()} FCFA</td>
                  <td className="p-3">{lr.termMonths} mois</td>
                  <td className="p-3">
                    <div className="flex flex-col gap-0.5">
                      <span>Inst.: {cap.installment.toLocaleString()} FCFA</span>
                      <span>Ratio: {cap.ratio.toFixed(2)}x {cap.ok ? "✅" : "⚠️"}</span>
                    </div>
                  </td>
                  <td className="p-3">{lr.createdAt}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <a className="underline" href={`/api/loan-requests/${lr.id}/report`} target="_blank">JSON</a>
                      <a className="underline" href={`/api/loan-requests/${lr.id}/report.csv`} target="_blank">CSV</a>
                      <a className="underline" href={`/reports/loan/${lr.id}`} target="_blank">Print</a>
                      {lr.status === "pending" && (
                        <>
                          <button className="px-2 py-1 border rounded" onClick={() => approve(lr.id)}>Approve</button>
                          <button className="px-2 py-1 border rounded" onClick={() => reject(lr.id)}>Reject</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
