"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Plus, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function LoansHeader() {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()

  const handleExport = () => {
    toast({
      title: t("common.success"),
      description: t("loans.exportSuccess"),
    })
  }

  const handleNewApplication = () => {
    router.push("/loans/requests")
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t("loans.header.title")}</h1>
        <p className="text-muted-foreground mt-1">{t("loans.header.subtitle")}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2 bg-transparent" onClick={handleExport}>
          <Download className="h-4 w-4" />
          {t("common.export")}
        </Button>
        <Button className="gap-2" onClick={handleNewApplication}>
          <Plus className="h-4 w-4" />
          {t("loans.header.newApplication")}
        </Button>
      </div>
    </div>
  )
}
