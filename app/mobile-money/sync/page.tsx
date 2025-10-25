"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function MobileMoneySyncPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Sync Mobile Money</CardTitle>
            <CardDescription>Trigger a manual synchronization of recent transactions from your connected providers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">This demo triggers a mock sync and shows a confirmation.</p>
            <Button onClick={() => alert("Sync started. This is a demo action.")} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Start Sync
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
