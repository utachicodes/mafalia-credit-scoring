"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Loader2 } from "lucide-react"
import { AddProviderDialog } from "@/components/mobile-money/add-provider-dialog"
import { useLanguage } from "@/components/language-provider"

interface MobileMoneyHeaderProps {
  onProviderAdd?: (provider: { name: string; account: string; type: string }) => void
  onSync?: () => void
}

export function MobileMoneyHeader({ onProviderAdd, onSync }: MobileMoneyHeaderProps) {
  const { t } = useLanguage()
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      if (onSync) {
        await onSync()
      } else {
        // Simulate sync
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }
    } finally {
      setIsSyncing(false)
    }
  }

  const handleProviderAdd = (provider: { name: string; account: string; type: string }) => {
    if (onProviderAdd) {
      onProviderAdd(provider)
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mobile Money</h1>
        <p className="text-muted-foreground mt-1">Manage payments and track transactions</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2 bg-transparent" onClick={handleSync} disabled={isSyncing}>
          {isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          {t("mobileMoney.sync")}
        </Button>
        <AddProviderDialog onAdd={handleProviderAdd} />
      </div>
    </div>
  )
}
