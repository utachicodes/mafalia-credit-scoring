"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter, Download } from "lucide-react"
import { formatCFA } from "@/lib/currency-utils"
import { useLanguage } from "@/components/language-provider"
import { formatDateForLanguage } from "@/lib/date-utils"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function RecentLoansTable() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({ status: "all", type: "all" })

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

  const handleExport = () => {
    const csv = [
      ["ID", "Amount", "Currency", "Status", "Date", "Type"].join(","),
      ...loans.map((loan) =>
        [loan.id, loan.amount, loan.currency, loan.status, loan.dueDate, loan.type].join(",")
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `loans-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: t("common.success"),
      description: t("dashboard.recentLoans.exportSuccess"),
    })
  }

  const handleView = (loanId: string) => {
    toast({
      title: t("dashboard.recentLoans.table.view"),
      description: `Viewing details for ${loanId}`,
    })
  }

  const filteredLoans = loans.filter((loan) => {
    if (filters.status !== "all" && loan.status !== filters.status) return false
    if (filters.type !== "all" && loan.type !== filters.type) return false
    return true
  })

  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-smooth">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t("dashboard.recentLoans.title")}</CardTitle>
            <CardDescription>
              {t("dashboard.recentLoans.description")} ({filteredLoans.length} {t("dashboard.recentLoans.transactions")})
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {t("dashboard.recentLoans.filters")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("dashboard.recentLoans.filters")}</DialogTitle>
                  <DialogDescription>{t("dashboard.recentLoans.filterDescription")}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>{t("dashboard.recentLoans.table.status")}</Label>
                    <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("common.all")}</SelectItem>
                        <SelectItem value="active">{t("dashboard.recentLoans.status.active")}</SelectItem>
                        <SelectItem value="pending">{t("dashboard.recentLoans.status.pending")}</SelectItem>
                        <SelectItem value="completed">{t("dashboard.recentLoans.status.completed")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("dashboard.recentLoans.table.type")}</Label>
                    <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("common.all")}</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setFilters({ status: "all", type: "all" })}>
                    {t("common.reset")}
                  </Button>
                  <Button onClick={() => setFilterOpen(false)}>{t("common.apply")}</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              {t("dashboard.recentLoans.exportAll")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredLoans.length === 0 ? (
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
                {filteredLoans.map((loan) => (
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
                      <Button variant="ghost" size="sm" className="h-8" onClick={() => handleView(loan.id)}>
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

