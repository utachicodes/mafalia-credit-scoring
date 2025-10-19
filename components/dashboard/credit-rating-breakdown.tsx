"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function CreditRatingBreakdown() {
  const factors = [
    { label: "Payment History", score: 98, weight: 35, color: "bg-primary" },
    { label: "Credit Utilization", score: 85, weight: 30, color: "bg-chart-2" },
    { label: "Credit Age", score: 92, weight: 15, color: "bg-chart-3" },
    { label: "Credit Mix", score: 88, weight: 10, color: "bg-chart-4" },
    { label: "New Credit", score: 95, weight: 10, color: "bg-chart-5" },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Credit Factors</CardTitle>
        <CardDescription>Breakdown of your credit score</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {factors.map((factor, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{factor.label}</span>
              <span className="text-muted-foreground">{factor.score}%</span>
            </div>
            <Progress value={factor.score} className="h-2" />
            <div className="text-xs text-muted-foreground">Weight: {factor.weight}%</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
