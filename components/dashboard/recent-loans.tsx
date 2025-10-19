"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function RecentLoans() {
  const loans = [
    { id: "L-001", amount: "$25,000", status: "active", dueDate: "Dec 15, 2025" },
    { id: "L-002", amount: "$15,000", status: "pending", dueDate: "Jan 20, 2026" },
    { id: "L-003", amount: "$30,000", status: "active", dueDate: "Feb 10, 2026" },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Recent Loans</CardTitle>
        <CardDescription>Your latest loan applications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loans.map((loan) => (
          <div key={loan.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="space-y-1">
              <div className="font-medium text-foreground">{loan.id}</div>
              <div className="text-sm text-muted-foreground">{loan.amount}</div>
              <div className="text-xs text-muted-foreground">Due: {loan.dueDate}</div>
            </div>
            <Badge variant={loan.status === "active" ? "default" : "secondary"}>{loan.status}</Badge>
          </div>
        ))}
        <Button variant="outline" className="w-full gap-2 bg-transparent">
          View All Loans
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
