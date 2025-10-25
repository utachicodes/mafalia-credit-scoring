"use client"

import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"
import Link from "next/link"

export function MobileMoneyHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mobile Money</h1>
        <p className="text-muted-foreground mt-1">Manage payments and track transactions</p>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" className="gap-2 bg-transparent">
          <Link href="/mobile-money/sync">
            <RefreshCw className="h-4 w-4" />
            Sync
          </Link>
        </Button>
        <Button asChild className="gap-2">
          <Link href="/mobile-money/providers/new">
            <Plus className="h-4 w-4" />
            Add Provider
          </Link>
        </Button>
      </div>
    </div>
  )
}
