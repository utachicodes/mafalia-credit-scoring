"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { formatCFA } from "@/lib/currency-utils"

export function TransactionHistory() {
  const transactions = [
    {
      id: "TXN-2025-1234",
      type: "received",
      from: "Mamadou Ndiaye",
      amount: 2500,
      provider: "Wave",
      date: "Dec 28, 2025",
      time: "14:32",
      status: "completed",
    },
    {
      id: "TXN-2025-1233",
      type: "sent",
      from: "Awa Diop",
      amount: 1800,
      provider: "Orange Money",
      date: "Dec 28, 2025",
      time: "11:15",
      status: "completed",
    },
    {
      id: "TXN-2025-1232",
      type: "received",
      from: "Société Baobab",
      amount: 5000,
      provider: "Free Money",
      date: "Dec 27, 2025",
      time: "16:45",
      status: "completed",
    },
    {
      id: "TXN-2025-1231",
      type: "sent",
      from: "Fournisseur Ndiaye & Fils",
      amount: 3200,
      provider: "Wave",
      date: "Dec 27, 2025",
      time: "09:20",
      status: "completed",
    },
    {
      id: "TXN-2025-1230",
      type: "received",
      from: "Client Sene Services",
      amount: 4500,
      provider: "Orange Money",
      date: "Dec 26, 2025",
      time: "13:10",
      status: "completed",
    },
    {
      id: "TXN-2025-1229",
      type: "sent",
      from: "Commerçant Diallo",
      amount: 1500,
      provider: "Wari",
      date: "Dec 26, 2025",
      time: "10:30",
      status: "pending",
    },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent mobile money transactions</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-9" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    transaction.type === "received" ? "bg-green-600/10 dark:bg-green-400/10" : "bg-chart-3/10"
                  }`}
                >
                  {transaction.type === "received" ? (
                    <ArrowDownRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-chart-3" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-foreground">{transaction.from}</div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.provider} • {transaction.id}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {transaction.date} at {transaction.time}
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div
                  className={`text-lg font-bold ${
                    transaction.type === "received" ? "text-green-600 dark:text-green-400" : "text-foreground"
                  }`}
                >
                  {`${transaction.type === "received" ? "+" : "-"}${formatCFA(transaction.amount)}`}
                </div>
                <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
