"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Plus, Download, Send } from "lucide-react"

export function ReceivablesHeader() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("nav.receivables")}</h1>
        <p className="text-muted-foreground mt-1">Track and manage client payments</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Send className="h-4 w-4" />
          Send Reminders
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Invoice
        </Button>
      </div>
    </div>
  )
}
