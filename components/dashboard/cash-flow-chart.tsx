"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", income: 45000, expenses: 32000 },
  { month: "Feb", income: 52000, expenses: 35000 },
  { month: "Mar", income: 48000, expenses: 33000 },
  { month: "Apr", income: 61000, expenses: 38000 },
  { month: "May", income: 55000, expenses: 36000 },
  { month: "Jun", income: 67000, expenses: 42000 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--primary))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
}

export function CashFlowChart() {
  const { t } = useLanguage()

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{t("dashboard.cash.flow")}</CardTitle>
        <CardDescription>Monthly income vs expenses overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="income"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="2"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
