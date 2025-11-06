"use client"

import { useState } from "react"
import { Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function InfoBanner() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 flex items-start gap-3 relative">
      <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <h3 className="font-semibold text-foreground mb-1">{t("dashboard.infoBanner.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("dashboard.infoBanner.description")}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 flex-shrink-0"
        onClick={() => setIsVisible(false)}
        aria-label={t("dashboard.infoBanner.close")}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

