"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

export default function ManageProviderPage() {
  const params = useSearchParams()
  const name = params.get("provider") || "Provider"

  return (
    <AppLayout>
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
    </AppLayout>
  )
}
