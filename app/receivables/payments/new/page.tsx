"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Suspense } from "react"

function PaymentInner() {
  const params = useSearchParams()
  const client = params.get("client") || "Client"
  const [amount, setAmount] = useState("")
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Recorded payment of ${amount} for ${client} (demo)`) // replace with API
  }
  return (
    <Card className="border-border max-w-xl">
      <CardHeader>
        <CardTitle>Record Payment</CardTitle>
        <CardDescription>Add a payment received from {client}.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (FCFA)</Label>
            <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function NewPaymentPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="text-sm text-muted-foreground p-4">Loading...</div>}>
        <PaymentInner />
      </Suspense>
    </AppLayout>
  )
}
