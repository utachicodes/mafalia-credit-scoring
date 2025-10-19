"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Percent, Target, Activity } from "lucide-react"
import { formatCFA } from "@/lib/currency-utils"

export function FinancialMetrics() {
  const metrics = [
    {
      label: "Total Revenue",
      value: 328500,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Net Profit",
      value: 89200,
      change: "+8.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-600/10 dark:bg-green-400/10",
    },
    {
      label: "Profit Margin",
      value: "27.2%",
      change: "-2.1%",
      trend: "down",
      icon: Percent,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Operating Expenses",
      value: 239300,
      change: "+5.7%",
      trend: "up",
      icon: Activity,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      label: "ROI",
      value: "18.5%",
      change: "+3.2%",
      trend: "up",
      icon: Target,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      label: "Cash Flow",
      value: 125400,
      change: "+15.8%",
      trend: "up",
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {metric.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {metric.change}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">
                {typeof metric.value === "number" ? formatCFA(metric.value) : metric.value}
              </div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
