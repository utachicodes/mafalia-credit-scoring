"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Download, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AnalyticsHeader() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("nav.analytics")}</h1>
        <p className="text-muted-foreground mt-1">{t("analytics.subtitle")}</p>
      </div>
      <div className="flex items-center gap-2">
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">{t("analytics.range.lastMonth")}</SelectItem>
            <SelectItem value="3months">{t("analytics.range.last3Months")}</SelectItem>
            <SelectItem value="6months">{t("analytics.range.last6Months")}</SelectItem>
            <SelectItem value="1year">{t("analytics.range.lastYear")}</SelectItem>
            <SelectItem value="all">{t("analytics.range.all")}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          {t("analytics.download")}
        </Button>
      </div>
    </div>
  )
}
