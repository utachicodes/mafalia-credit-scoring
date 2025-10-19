"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { formatCFA } from "@/lib/currency-utils"

export function ReceivablesOverview() {
  const stats = [
    {
      label: "Total Outstanding",
      value: 45200,
      change: "12 invoices",
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Overdue",
      value: 8450,
      change: "3 invoices",
      icon: AlertCircle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-600/10 dark:bg-red-400/10",
    },
    {
      label: "Due Soon",
      value: 12300,
      change: "Within 7 days",
      icon: Clock,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-600/10 dark:bg-yellow-400/10",
    },
    {
      label: "Collected This Month",
      value: 32100,
      change: "18 payments",
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-600/10 dark:bg-green-400/10",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">{formatCFA(stat.value)}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.change}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
