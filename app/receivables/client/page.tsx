"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ClientInner() {
  const params = useSearchParams()
  const name = params.get("name") || "Client"
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Receivables and payment history</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">This is a demo details page for {name}.</p>
      </CardContent>
    </Card>
  )
}

export default function ReceivableClientPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="text-sm text-muted-foreground p-4">Loading...</div>}>
        <ClientInner />
      </Suspense>
    </AppLayout>
  )
}
