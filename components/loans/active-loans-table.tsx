"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Eye, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatCFA } from "@/lib/currency-utils"

export function ActiveLoansTable() {
  const loans = [
    {
      id: "L-2025-001",
      amount: 25000,
      disbursed: 25000,
      outstanding: 18500,
      rate: 12.5,
      term: 24,
      status: "active",
      nextPayment: "Jan 15, 2026",
      paymentAmount: 1250,
    },
    {
      id: "L-2025-002",
      amount: 15000,
      disbursed: 0,
      outstanding: 0,
      rate: 11.0,
      term: 18,
      status: "pending",
      nextPayment: "-",
      paymentAmount: 0,
    },
    {
      id: "L-2024-089",
      amount: 30000,
      disbursed: 30000,
      outstanding: 22000,
      rate: 13.0,
      term: 36,
      status: "active",
      nextPayment: "Jan 20, 2026",
      paymentAmount: 950,
    },
    {
      id: "L-2024-067",
      amount: 20000,
      disbursed: 20000,
      outstanding: 5000,
      rate: 12.0,
      term: 24,
      status: "active",
      nextPayment: "Jan 10, 2026",
      paymentAmount: 1100,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Active Loans</CardTitle>
        <CardDescription>Overview of your current loan portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loans.map((loan) => {
            const repaidPercentage =
              loan.disbursed > 0 ? ((loan.disbursed - loan.outstanding) / loan.disbursed) * 100 : 0

            return (
              <div key={loan.id} className="rounded-lg border border-border p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{loan.id}</span>
                      <Badge variant={getStatusColor(loan.status)}>{loan.status}</Badge>
                    </div>
                    <div className="text-2xl font-bold text-foreground">{formatCFA(loan.amount)}</div>
                    <div className="text-sm text-muted-foreground">
                      {loan.rate}% APR • {loan.term} months
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Make Payment</DropdownMenuItem>
                      <DropdownMenuItem>Download Statement</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {loan.status === "active" && (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Repayment Progress</span>
                        <span className="font-medium text-foreground">
                          {formatCFA(loan.disbursed - loan.outstanding)} / {formatCFA(loan.disbursed)}
                        </span>
                      </div>
                      <Progress value={repaidPercentage} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div>
                        <div className="text-sm text-muted-foreground">Outstanding</div>
                        <div className="text-lg font-semibold text-foreground">{formatCFA(loan.outstanding)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Next Payment</div>
                        <div className="text-lg font-semibold text-foreground">{formatCFA(loan.paymentAmount)}</div>
                        <div className="text-xs text-muted-foreground">{loan.nextPayment}</div>
                      </div>
                    </div>
                  </>
                )}

                {loan.status === "pending" && (
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Application under review</span>
                    <Button size="sm" variant="outline">
                      Check Status
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
