"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Plus, Download } from "lucide-react"

export function LoansHeader() {
  const { t } = useLanguage()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("nav.loans")}</h1>
        <p className="text-muted-foreground mt-1">Manage and apply for business loans</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Application
        </Button>
      </div>
    </div>
  )
}
