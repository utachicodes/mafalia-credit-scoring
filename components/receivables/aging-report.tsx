"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatCFA } from "@/lib/currency-utils"

export function AgingReport() {
  const agingData = [
    { period: "Current (0-30 days)", amount: 24450, percentage: 54, color: "bg-green-600" },
    { period: "31-60 days", amount: 12300, percentage: 27, color: "bg-yellow-600" },
    { period: "61-90 days", amount: 6000, percentage: 13, color: "bg-orange-600" },
    { period: "90+ days", amount: 2450, percentage: 6, color: "bg-red-600" },
  ]

  const total = agingData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Aging Report</CardTitle>
        <CardDescription>Receivables by age</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center pb-4 border-b border-border">
          <div className="text-3xl font-bold text-foreground">{formatCFA(total)}</div>
          <div className="text-sm text-muted-foreground">Total Receivables</div>
        </div>

        {agingData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{item.period}</span>
              <span className="text-muted-foreground">{item.percentage}%</span>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={item.percentage} className="h-2 flex-1" />
              <span className="text-sm font-semibold text-foreground w-28 text-right">
                {formatCFA(item.amount)}
              </span>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Collection Rate</span>
            <span className="font-semibold text-green-600 dark:text-green-400">92%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Avg. Days to Pay</span>
            <span className="font-semibold text-foreground">38 days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
