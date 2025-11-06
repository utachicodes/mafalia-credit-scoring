"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { formatCFA } from "@/lib/currency-utils"
import { useLanguage } from "@/components/language-provider"
import { formatDateForLanguage } from "@/lib/date-utils"

export function RecentLoans() {
  const { t, language } = useLanguage()

  const loans = [
    { id: "L-001", amount: 25000000, status: "active" as const, dueDate: "2025-12-15" },
    { id: "L-002", amount: 15000000, status: "pending" as const, dueDate: "2026-01-20" },
    { id: "L-003", amount: 30000000, status: "active" as const, dueDate: "2026-02-10" },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{t("dashboard.recentLoans.title")}</CardTitle>
        <CardDescription>{t("dashboard.recentLoans.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loans.map((loan) => (
          <div key={loan.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="space-y-1">
              <div className="font-medium text-foreground">{loan.id}</div>
              <div className="text-sm text-muted-foreground">{formatCFA(loan.amount)}</div>
              <div className="text-xs text-muted-foreground">
                {t("dashboard.recentLoans.due")}: {formatDateForLanguage(loan.dueDate, language)}
              </div>
            </div>
            <Badge variant={loan.status === "active" ? "default" : "secondary"}>
              {t(`dashboard.recentLoans.status.${loan.status}`)}
            </Badge>
          </div>
        ))}
        <Button variant="outline" className="w-full gap-2 bg-transparent">
          {t("dashboard.recentLoans.viewAll")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
