"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ManageInner() {
  const params = useSearchParams()
  const name = params.get("provider") || "Provider"
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Manage {name}</CardTitle>
        <CardDescription>Update settings or disconnect this provider.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="outline" onClick={() => alert("Settings saved (demo)")}>Save Settings</Button>
        <Button variant="destructive" onClick={() => alert("Disconnected (demo)")}>Disconnect</Button>
      </CardContent>
    </Card>
  )
}

export default function ManageProviderPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="text-sm text-muted-foreground p-4">Loading...</div>}>
        <ManageInner />
      </Suspense>
    </AppLayout>
  )
}
