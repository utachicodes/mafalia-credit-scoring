"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "Jul", revenue: 45000, expenses: 32000 },
  { month: "Aug", revenue: 52000, expenses: 35000 },
  { month: "Sep", revenue: 48000, expenses: 33000 },
  { month: "Oct", revenue: 61000, expenses: 38000 },
  { month: "Nov", revenue: 55000, expenses: 36000 },
  { month: "Dec", revenue: 67000, expenses: 42000 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
}

export function RevenueChart() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Revenue vs Expenses</CardTitle>
        <CardDescription>Monthly comparison of income and costs</CardDescription>
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
