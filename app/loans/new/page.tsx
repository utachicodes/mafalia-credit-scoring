"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function NewLoanApplicationPage() {
  const [amount, setAmount] = useState("")
  const [purpose, setPurpose] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Application submitted for ${amount} FCFA: ${purpose}. (Demo)`) // Replace with API
  }

  return (
    <AppLayout>
      <Card className="border-border max-w-xl">
        <CardHeader>
          <CardTitle>New Loan Application</CardTitle>
          <CardDescription>Submit a basic loan application (demo form).</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (FCFA)</Label>
              <Input id="amount" type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Input id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} required />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  )
}
