"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { formatCFA } from "@/lib/currency-utils"
import { ArrowDownRight, ArrowUpRight, Calendar } from "lucide-react"

interface Txn {
  id: string
  date: string // ISO
  type: "received" | "sent"
  provider: "Wave" | "Orange Money" | "Free Money" | "Wari"
  counterparty: string
  amount: number
  status: "completed" | "pending"
}

function generateLast6MonthsTransactions(): Txn[] {
  const providers: Txn["provider"][] = ["Wave", "Orange Money", "Free Money", "Wari"]
  const names = [
    "Mamadou Ndiaye",
    "Awa Diop",
    "Ibrahima Sarr",
    "Fatou Sy",
    "Boutique Diop",
    "Société Baobab",
    "Ndiaye & Fils",
    "Client Sene Services",
  ]
  const now = new Date()
  const txns: Txn[] = []
  let idCounter = 1000
  for (let m = 0; m < 6; m++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - m, 1)
    const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()
    const count = 10
    for (let i = 0; i < count; i++) {
      const day = Math.min(1 + Math.floor(Math.random() * daysInMonth), daysInMonth)
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day, 12, 0, 0)
      const type = Math.random() > 0.5 ? "received" : "sent"
      const provider = providers[Math.floor(Math.random() * providers.length)]
      const counterparty = names[Math.floor(Math.random() * names.length)]
      const base = 1500 + Math.floor(Math.random() * 50000)
      txns.push({
        id: `TXN-${date.getFullYear()}${date.getMonth() + 1}-${idCounter++}`,
        date: date.toISOString(),
        type,
        provider,
        counterparty,
        amount: base,
        status: Math.random() > 0.9 ? "pending" : "completed",
      })
    }
  }
  return txns.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function TransactionsPage() {
  const { t } = useLanguage()
  const [provider, setProvider] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [search, setSearch] = useState("")

  const data = useMemo(() => generateLast6MonthsTransactions(), [])

  const filtered = useMemo(() => {
    return data.filter((tx) => {
      if (provider && tx.provider !== provider) return false
      if (type && tx.type !== (type as Txn["type"])) return false
      if (search) {
        const s = search.toLowerCase()
        if (!tx.counterparty.toLowerCase().includes(s) && !tx.id.toLowerCase().includes(s)) return false
      }
      return true
    })
  }, [data, provider, type, search])

  const groupByMonth = useMemo(() => {
    const groups: Record<string, Txn[]> = {}
    for (const tx of filtered) {
      const d = new Date(tx.date)
      const key = d.toLocaleString("fr-FR", { month: "long", year: "numeric" })
      groups[key] = groups[key] || []
      groups[key].push(tx)
    }
    return groups
  }, [filtered])

  const months = Object.keys(groupByMonth)

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 page-enter">
      <div className="animate-fade-in flex items-center gap-2 text-muted-foreground">
        <Calendar className="h-5 w-5" />
        <h1 className="text-2xl font-bold">Historique des transactions (6 mois)</h1>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
          <CardDescription>Affinez par opérateur, type et recherche</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Opérateur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous</SelectItem>
                <SelectItem value="Wave">Wave</SelectItem>
                <SelectItem value="Orange Money">Orange Money</SelectItem>
                <SelectItem value="Free Money">Free Money</SelectItem>
                <SelectItem value="Wari">Wari</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous</SelectItem>
                <SelectItem value="received">Reçus</SelectItem>
                <SelectItem value="sent">Envoyés</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input placeholder="Rechercher par nom ou ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {months.map((month) => (
          <Card key={month} className="border-border">
            <CardHeader>
              <CardTitle className="capitalize">{month}</CardTitle>
              <CardDescription>
                {groupByMonth[month].length} transaction{groupByMonth[month].length > 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {groupByMonth[month].map((tx) => {
                  const d = new Date(tx.date)
                  return (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            tx.type === "received" ? "bg-green-600/10 dark:bg-green-400/10" : "bg-chart-3/10"
                          }`}
                        >
                          {tx.type === "received" ? (
                            <ArrowDownRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 text-chart-3" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium text-foreground">{tx.counterparty}</div>
                          <div className="text-sm text-muted-foreground">
                            {tx.provider} • {tx.id}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div
                          className={`text-lg font-bold ${
                            tx.type === "received" ? "text-green-600 dark:text-green-400" : "text-foreground"
                          }`}
                        >
                          {`${tx.type === "received" ? "+" : "-"}${formatCFA(tx.amount)}`}
                        </div>
                        <Badge variant={tx.status === "completed" ? "default" : "secondary"}>{tx.status}</Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
