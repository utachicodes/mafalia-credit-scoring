"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useLanguage } from "@/components/language-provider"

const rawChartData = [
  { month: "jul", disbursed: 85000, repaid: 62000, outstanding: 145000 },
  { month: "aug", disbursed: 92000, repaid: 68000, outstanding: 169000 },
  { month: "sep", disbursed: 78000, repaid: 71000, outstanding: 176000 },
  { month: "oct", disbursed: 105000, repaid: 75000, outstanding: 206000 },
  { month: "nov", disbursed: 88000, repaid: 79000, outstanding: 215000 },
  { month: "dec", disbursed: 115000, repaid: 85000, outstanding: 245000 },
]

export function LoanPerformanceChart() {
  const { t } = useLanguage()

  const chartConfig = useMemo(
    () => ({
      disbursed: {
        label: t("analytics.charts.loanPerformance.labels.disbursed"),
        color: "hsl(var(--primary))",
      },
      repaid: {
        label: t("analytics.charts.loanPerformance.labels.repaid"),
        color: "hsl(var(--chart-2))",
      },
      outstanding: {
        label: t("analytics.charts.loanPerformance.labels.outstanding"),
        color: "hsl(var(--chart-4))",
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
        <CardTitle>{t("analytics.charts.loanPerformance.title")}</CardTitle>
        <CardDescription>{t("analytics.charts.loanPerformance.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="disbursed"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="repaid"
                stackId="2"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="outstanding"
                stackId="3"
                stroke="hsl(var(--chart-4))"
                fill="hsl(var(--chart-4))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
