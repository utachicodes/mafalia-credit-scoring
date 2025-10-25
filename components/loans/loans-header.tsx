"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Plus, Download } from "lucide-react"
import Link from "next/link"

export function LoansHeader() {
  const { t } = useLanguage()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("nav.loans")}</h1>
        <p className="text-muted-foreground mt-1">Manage and apply for business loans</p>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" className="gap-2 bg-transparent">
          <Link href="/loans/export">
            <Download className="h-4 w-4" />
            Export
          </Link>
        </Button>
        <Button asChild className="gap-2">
          <Link href="/loans/new">
            <Plus className="h-4 w-4" />
            New Application
          </Link>
        </Button>
      </div>
    </div>
  )
}
