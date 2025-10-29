"use client"

import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"

export function MobileMoneyHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mobile Money</h1>
        <p className="text-muted-foreground mt-1">Manage payments and track transactions</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2 bg-transparent">
          <RefreshCw className="h-4 w-4" />
          Sync
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Provider
        </Button>
      </div>
    </div>
  )
}
