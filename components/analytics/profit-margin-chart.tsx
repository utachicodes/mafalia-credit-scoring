"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "Jul", margin: 28.9 },
  { month: "Aug", margin: 32.7 },
  { month: "Sep", margin: 31.3 },
  { month: "Oct", margin: 37.7 },
  { month: "Nov", margin: 34.5 },
  { month: "Dec", margin: 37.3 },
]

const chartConfig = {
  margin: {
    label: "Profit Margin %",
    color: "hsl(var(--chart-3))",
  },
}

export function ProfitMarginChart() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Profit Margin Trend</CardTitle>
        <CardDescription>Monthly profit margin percentage</CardDescription>
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
