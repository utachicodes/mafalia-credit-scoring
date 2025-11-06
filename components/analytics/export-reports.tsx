"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

type ReportKey = "financialSummary" | "loanPortfolio" | "cashFlowStatement" | "taxReport"

const REPORT_KEYS: ReportKey[] = ["financialSummary", "loanPortfolio", "cashFlowStatement", "taxReport"]

export function ExportReports() {
  const { t } = useLanguage()

  const reports = useMemo(
    () =>
      REPORT_KEYS.map((key) => ({
        key,
        name: t(`analytics.reports.items.${key}.name`),
        description: t(`analytics.reports.items.${key}.description`),
        format: t(`analytics.reports.items.${key}.format`),
      })),
    [t],
  )

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{t("analytics.reports.title")}</CardTitle>
        <CardDescription>{t("analytics.reports.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.map((report) => (
          <div key={report.key} className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground text-sm">{report.name}</div>
                <div className="text-xs text-muted-foreground">{report.description}</div>
              </div>
            </div>
            <Button size="sm" variant="ghost" aria-label={`${t("analytics.download")} ${report.name} (${report.format})`}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
