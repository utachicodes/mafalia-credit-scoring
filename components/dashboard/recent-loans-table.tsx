"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter, Download } from "lucide-react"
import { formatCFA } from "@/lib/currency-utils"
import { useLanguage } from "@/components/language-provider"
import { formatDateForLanguage } from "@/lib/date-utils"

export function RecentLoansTable() {
  const { t, language } = useLanguage()

  const loans = [
    { id: "L-001", amount: 25000000, status: "active" as const, dueDate: "2025-12-15", currency: "FCFA", type: "Business" },
    { id: "L-002", amount: 15000000, status: "pending" as const, dueDate: "2026-01-20", currency: "FCFA", type: "Personal" },
    { id: "L-003", amount: 30000000, status: "active" as const, dueDate: "2026-02-10", currency: "FCFA", type: "Business" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    }
  }

  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-smooth">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t("dashboard.recentLoans.title")}</CardTitle>
            <CardDescription>
              {t("dashboard.recentLoans.description")} ({loans.length} {t("dashboard.recentLoans.transactions")})
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              {t("dashboard.recentLoans.filters")}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {t("dashboard.recentLoans.exportAll")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loans.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">{t("dashboard.recentLoans.noTransactions")}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t("dashboard.recentLoans.table.id")}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t("dashboard.recentLoans.table.amount")}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t("dashboard.recentLoans.table.currency")}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t("dashboard.recentLoans.table.status")}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t("dashboard.recentLoans.table.date")}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t("dashboard.recentLoans.table.type")}</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t("dashboard.recentLoans.table.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{loan.id}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{formatCFA(loan.amount)}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{loan.currency}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(loan.status)} border-0`}>
                        {t(`dashboard.recentLoans.status.${loan.status}`)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{formatDateForLanguage(loan.dueDate, language)}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{loan.type}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="h-8">
                        {t("dashboard.recentLoans.table.view")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

