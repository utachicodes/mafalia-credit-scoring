"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"

export default function ReceivableClientPage() {
  const params = useSearchParams()
  const name = params.get("name") || "Client"

  return (
    <AppLayout>
      <Card className="border-border">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Receivables and payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This is a demo details page for {name}.</p>
        </CardContent>
      </Card>
    </AppLayout>
  )
}
