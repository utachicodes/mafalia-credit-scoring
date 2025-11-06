"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Plus, Download } from "lucide-react"

export function LoansHeader() {
  const { t } = useLanguage()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("loans.header.title")}</h1>
        <p className="text-muted-foreground mt-1">{t("loans.header.subtitle")}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          {t("common.export")}
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("loans.header.newApplication")}
        </Button>
      </div>
    </div>
  )
}
