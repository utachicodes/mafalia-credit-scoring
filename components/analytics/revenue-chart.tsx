"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useLanguage } from "@/components/language-provider"

const rawChartData = [
  { month: "jul", revenue: 45000, expenses: 32000 },
  { month: "aug", revenue: 52000, expenses: 35000 },
  { month: "sep", revenue: 48000, expenses: 33000 },
  { month: "oct", revenue: 61000, expenses: 38000 },
  { month: "nov", revenue: 55000, expenses: 36000 },
  { month: "dec", revenue: 67000, expenses: 42000 },
]

export function RevenueChart() {
  const { t } = useLanguage()

  const chartConfig = useMemo(
    () => ({
      revenue: {
        label: t("analytics.charts.revenueVsExpenses.labels.revenue"),
        color: "hsl(var(--primary))",
      },
      expenses: {
        label: t("analytics.charts.revenueVsExpenses.labels.expenses"),
        color: "hsl(var(--chart-2))",
      },
    }),
    [t],
  )

  const chartData = useMemo(
    () =>
      rawChartData.map((item) => ({
        ...item,
        month: t(`common.months.short.${item.month}`),
      })),
    [t],
  )

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{t("analytics.charts.revenueVsExpenses.title")}</CardTitle>
        <CardDescription>{t("analytics.charts.revenueVsExpenses.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
