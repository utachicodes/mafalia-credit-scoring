"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { formatCFA } from "@/lib/currency-utils"
import { useLanguage } from "@/components/language-provider"

export function AccountBalances() {
  const { t } = useLanguage()

  const pendingTransactions = 5

  const balances = [
    {
      label: t("mobileMoney.overview.totalBalance"),
      value: 45280,
      change: `+${formatCFA(2340)}`,
      trend: "up",
      icon: Wallet,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: t("mobileMoney.overview.incoming"),
      value: 12450,
      change: t("mobileMoney.overview.thisMonth"),
      trend: "neutral",
      icon: ArrowDownRight,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-600/10 dark:bg-green-400/10",
    },
    {
      label: t("mobileMoney.overview.outgoing"),
      value: 8920,
      change: t("mobileMoney.overview.thisMonth"),
      trend: "neutral",
      icon: ArrowUpRight,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: t("mobileMoney.overview.pending"),
      value: 3150,
      change: t("mobileMoney.overview.transactionsCount", { count: pendingTransactions }),
      trend: "neutral",
      icon: TrendingUp,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {balances.map((balance, index) => (
        <Card key={index} className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${balance.bgColor}`}>
                <balance.icon className={`h-6 w-6 ${balance.color}`} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{formatCFA(balance.value)}</div>
              <div className="text-sm text-muted-foreground">{balance.label}</div>
              <div className="text-xs text-muted-foreground">{balance.change}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
