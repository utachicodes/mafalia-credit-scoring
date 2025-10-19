"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"

export function SendMoneyForm() {
  const [formData, setFormData] = useState({
    provider: "",
    recipient: "",
    amount: "",
    note: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Send money:", formData)
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
                <SelectItem value="mpesa">M-Pesa</SelectItem>
                <SelectItem value="orange">Orange Money</SelectItem>
                <SelectItem value="mtn">MTN Mobile Money</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Number</Label>
            <Input
              id="recipient"
              type="tel"
              placeholder="+254 712 345 678"
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="100"
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
              <span className="font-medium text-foreground">$2.50</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold text-foreground">
                ${formData.amount ? (Number.parseFloat(formData.amount) + 2.5).toFixed(2) : "0.00"}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full gap-2">
            <Send className="h-4 w-4" />
            Send Money
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
