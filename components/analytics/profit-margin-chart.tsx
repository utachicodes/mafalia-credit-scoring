"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useLanguage } from "@/components/language-provider"

const rawChartData = [
  { month: "jul", margin: 28.9 },
  { month: "aug", margin: 32.7 },
  { month: "sep", margin: 31.3 },
  { month: "oct", margin: 37.7 },
  { month: "nov", margin: 34.5 },
  { month: "dec", margin: 37.3 },
]

export function ProfitMarginChart() {
  const { t } = useLanguage()

  const chartConfig = useMemo(
    () => ({
      margin: {
        label: t("analytics.charts.profitMargin.label"),
        color: "hsl(var(--chart-3))",
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
        <CardTitle>{t("analytics.charts.profitMargin.title")}</CardTitle>
        <CardDescription>{t("analytics.charts.profitMargin.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="margin"
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-3))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
