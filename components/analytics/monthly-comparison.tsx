"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function MonthlyComparison() {
  const comparisons = [
    { metric: "Revenue", current: 67000, previous: 55000, change: 21.8, trend: "up" },
    { metric: "Expenses", current: 42000, previous: 36000, change: 16.7, trend: "up" },
    { metric: "Net Profit", current: 25000, previous: 19000, change: 31.6, trend: "up" },
    { metric: "Loans Disbursed", current: 115000, previous: 88000, change: 30.7, trend: "up" },
    { metric: "Repayments", current: 85000, previous: 79000, change: 7.6, trend: "up" },
    { metric: "Default Rate", current: 2.1, previous: 2.8, change: -25.0, trend: "down" },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Month-over-Month Comparison</CardTitle>
        <CardDescription>December 2025 vs November 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {comparisons.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="space-y-1">
                <div className="font-medium text-foreground">{item.metric}</div>
                <div className="text-sm text-muted-foreground">
                  ${item.current.toLocaleString()} vs ${item.previous.toLocaleString()}
                </div>
              </div>
              <div
                className={`flex items-center gap-2 font-semibold ${
                  (item.trend === "up" && item.change > 0) || (item.trend === "down" && item.change < 0)
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {item.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {Math.abs(item.change).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
