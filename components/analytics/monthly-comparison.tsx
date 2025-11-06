"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { formatCFA } from "@/lib/currency-utils"
import { useLanguage } from "@/components/language-provider"
import { getLocaleForLanguage } from "@/lib/date-utils"

type ComparisonMetric = "revenue" | "expenses" | "netProfit" | "loansDisbursed" | "repayments" | "defaultRate"

const COMPARISON_DATA: Array<{
  metric: ComparisonMetric
  current: number
  previous: number
  change: number
  trend: "up" | "down"
  type: "currency" | "percentage"
}> = [
  { metric: "revenue", current: 67000, previous: 55000, change: 21.8, trend: "up", type: "currency" },
  { metric: "expenses", current: 42000, previous: 36000, change: 16.7, trend: "up", type: "currency" },
  { metric: "netProfit", current: 25000, previous: 19000, change: 31.6, trend: "up", type: "currency" },
  { metric: "loansDisbursed", current: 115000, previous: 88000, change: 30.7, trend: "up", type: "currency" },
  { metric: "repayments", current: 85000, previous: 79000, change: 7.6, trend: "up", type: "currency" },
  { metric: "defaultRate", current: 2.1, previous: 2.8, change: -25.0, trend: "down", type: "percentage" },
]

export function MonthlyComparison() {
  const { t, language } = useLanguage()
  const locale = getLocaleForLanguage(language)

  const comparisonDescription = useMemo(
    () =>
      t("analytics.charts.monthlyComparison.description", {
        current: t("analytics.charts.monthlyComparison.currentPeriod"),
        previous: t("analytics.charts.monthlyComparison.previousPeriod"),
      }),
    [t],
  )

  const percentFormatter = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1, minimumFractionDigits: 1 }),
    [locale],
  )

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{t("analytics.charts.monthlyComparison.title")}</CardTitle>
        <CardDescription>{comparisonDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {COMPARISON_DATA.map((item, index) => {
            const metricLabel = t(`analytics.charts.monthlyComparison.metrics.${item.metric}`)
            const isPositiveChange =
              (item.trend === "up" && item.change > 0) || (item.trend === "down" && item.change < 0)

            const currentValue =
              item.type === "percentage"
                ? `${percentFormatter.format(item.current)}%`
                : formatCFA(item.current)
            const previousValue =
              item.type === "percentage"
                ? `${percentFormatter.format(item.previous)}%`
                : formatCFA(item.previous)

            return (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="space-y-1">
                  <div className="font-medium text-foreground">{metricLabel}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentValue} vs {previousValue}
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 font-semibold ${
                    isPositiveChange ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {item.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {percentFormatter.format(Math.abs(item.change))}%
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
