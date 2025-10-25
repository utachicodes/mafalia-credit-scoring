"use client"

import { AppLayout } from "@/components/app-layout"
import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCFA } from "@/lib/currency-utils"
import { ArrowDownLeft, ArrowUpRight, Building2, MapPin } from "lucide-react"

interface Client {
  id: string
  name: string
  type: string
  location: string
  joined_at: string
}

interface Transaction {
  id: string
  date: string
  amount: number
  method: string
  direction: string
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const [client, setClient] = useState<Client | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()

      const { data: clientData } = await supabase.from("clients").select("*").eq("id", params.id).single()

      if (!clientData) {
        notFound()
      }

      const { data: txData } = await supabase
        .from("transactions")
        .select("*")
        .eq("client_id", params.id)
        .order("date", { ascending: false })
        .limit(50)

      setClient(clientData)
      setTransactions(txData || [])
      setLoading(false)
    }
    loadData()
  }, [params.id])

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-6 animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-muted rounded" />
            ))}
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!client) return notFound()

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.direction === "INFLOW") acc.inflows += t.amount
      else acc.outflows += t.amount
      return acc
    },
    { inflows: 0, outflows: 0 },
  )

  const net = totals.inflows - totals.outflows

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              {client.name}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <MapPin className="h-4 w-4" />
              {client.location} • {client.type}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Inflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
                <ArrowDownLeft className="h-5 w-5" />
                {formatCFA(totals.inflows)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Outflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5" />
                {formatCFA(totals.outflows)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Net Cashflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${net >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatCFA(net)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactions.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-3 font-medium">Date</th>
                    <th className="text-left p-3 font-medium">Amount</th>
                    <th className="text-left p-3 font-medium">Method</th>
                    <th className="text-left p-3 font-medium">Direction</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">{new Date(t.date).toLocaleDateString()}</td>
                      <td className="p-3 font-medium">{formatCFA(t.amount)}</td>
                      <td className="p-3 capitalize">{t.method.replace("_", " ")}</td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                            t.direction === "INFLOW" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {t.direction === "INFLOW" ? (
                            <ArrowDownLeft className="h-3 w-3" />
                          ) : (
                            <ArrowUpRight className="h-3 w-3" />
                          )}
                          {t.direction}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {transactions.length === 0 && (
                    <tr>
                      <td className="p-3 text-center text-muted-foreground" colSpan={4}>
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
