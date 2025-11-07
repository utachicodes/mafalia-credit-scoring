"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"
import { formatCFA } from "@/lib/currency-utils"
import { useToast } from "@/components/ui/use-toast"
import { safeFetch } from "@/lib/safe-fetch"

export function SendMoneyForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    provider: "",
    recipient: "",
    amount: "",
    note: "",
  })

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseInt(formData.amount || "0", 10)
    if (!Number.isFinite(amount) || amount <= 0) {
      toast({ title: "Erreur", description: "Montant invalide" })
      return
    }
    if (!formData.recipient) {
      toast({ title: "Erreur", description: "Numéro destinataire requis" })
      return
    }
    setSubmitting(true)
    const idempotencyKey = crypto.randomUUID()
    const payload = {
      amount,
      currency: "XOF",
      destination: {
        kind: "wallet",
        walletNumber: formData.recipient,
        walletProvider: formData.provider || undefined,
      },
      reference: formData.note || undefined,
      metadata: { source: "ui-mobile-money" },
    }
    const res = await safeFetch<{ payout: { id: string; status: string } }>("/api/payouts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-idempotency-key": idempotencyKey,
      },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (!res) {
      toast({ title: "Erreur", description: "Echec de l’envoi de payout" })
      return
    }
    toast({
      title: "Payout envoyé",
      description: `#${res.payout.id} • ${formatCFA(amount)} à ${formData.recipient}`,
    })
    setFormData({ provider: "", recipient: "", amount: "", note: "" })
  }

  return (
    <Card className="border-border sticky top-24">
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
        <CardDescription>Transfer funds via mobile money</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Select value={formData.provider} onValueChange={(value) => setFormData({ ...formData, provider: value })}>
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wave">Wave</SelectItem>
                <SelectItem value="orange">Orange Money</SelectItem>
                <SelectItem value="free">Free Money</SelectItem>
                <SelectItem value="wari">Wari</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Number</Label>
            <Input
              id="recipient"
              type="tel"
              placeholder="+221 77 123 45 67"
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (FCFA)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="10000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              placeholder="Payment for..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            />
          </div>

          <div className="rounded-lg bg-muted/50 p-3 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Transaction Fee</span>
              <span className="font-medium text-foreground">{formatCFA(250)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold text-foreground">
                {formatCFA(formData.amount ? Number.parseInt(formData.amount, 10) + 250 : 0)}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full gap-2" disabled={submitting}>
            <Send className="h-4 w-4" />
            {submitting ? "Envoi..." : "Send Money"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
