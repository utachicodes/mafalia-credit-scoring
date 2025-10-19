"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"

export function LoanApplicationForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    term: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Loan application submitted:", formData)
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Apply for New Loan</CardTitle>
        <CardDescription>Fill out the form to submit a loan application</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Loan Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="25000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Loan Term (months)</Label>
              <Select value={formData.term} onValueChange={(value) => setFormData({ ...formData, term: value })}>
                <SelectTrigger id="term">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="18">18 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                  <SelectItem value="48">48 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Loan Purpose</Label>
            <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
              <SelectTrigger id="purpose">
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="working-capital">Working Capital</SelectItem>
                <SelectItem value="equipment">Equipment Purchase</SelectItem>
                <SelectItem value="inventory">Inventory Financing</SelectItem>
                <SelectItem value="expansion">Business Expansion</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide details about how you plan to use the loan..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated Interest Rate</span>
              <span className="font-semibold text-foreground">12.5% APR</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated Monthly Payment</span>
              <span className="font-semibold text-foreground">
                $
                {formData.amount && formData.term
                  ? Math.round((Number.parseInt(formData.amount) * 1.125) / Number.parseInt(formData.term))
                  : 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your Credit Rating</span>
              <span className="font-semibold text-primary">AAA</span>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
