"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { DollarSign, TrendingUp, Wallet, Clock } from "lucide-react"
import { formatCFA } from "@/lib/currency-utils"

export function QuickStatsGrid() {
  const { t } = useLanguage()

  const stats = [
    {
      label: t("dashboard.available.credit"),
      value: 125000,
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: t("dashboard.total.loans"),
      value: "8",
      change: "+2",
      trend: "up",
      icon: Wallet,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      label: t("dashboard.receivables"),
      value: 45200,
      change: "-5%",
      trend: "down",
      icon: TrendingUp,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: t("dashboard.pendingApprovals"),
      value: "3",
      change: "0",
      trend: "neutral",
      icon: Clock,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div
                className={`text-sm font-medium ${
                  stat.trend === "up"
                    ? "text-green-600 dark:text-green-400"
                    : stat.trend === "down"
                      ? "text-red-600 dark:text-red-400"
                      : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">
                {typeof stat.value === "number" ? formatCFA(stat.value) : stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
