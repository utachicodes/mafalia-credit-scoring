"use client";

import Link from "next/link";
import { clients, transactions, loanRequests } from "@/lib/mock-data";

export default function ClientsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Clients</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c) => {
          const txCount = transactions.filter((t) => t.clientId === c.id).length;
          const loanCount = loanRequests.filter((lr) => lr.clientId === c.id).length;
          return (
            <Link key={c.id} href={`/clients/${c.id}`} className="border rounded-lg p-4 hover:bg-muted/40">
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.type} • {c.location}</div>
              <div className="mt-3 text-sm">Transactions: {txCount}</div>
              <div className="text-sm">Loan requests: {loanCount}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
