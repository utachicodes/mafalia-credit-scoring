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
import { formatCFA } from "@/lib/currency-utils"

export function LoanApplicationForm() {
  const { t } = useLanguage()
  const termOptions = ["12", "18", "24", "36", "48"]
  const purposeOptions = ["workingCapital", "equipment", "inventory", "expansion", "other"] as const

  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    term: "",
    description: "",
    documents: [] as File[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API
    console.log("Loan application submitted:", formData)
    alert(`Loan application submitted: ${formData.amount} FCFA for ${formData.term} months`)
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{t("loans.application.title")}</CardTitle>
        <CardDescription>{t("loans.application.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">{t("loans.application.amountLabel")}</Label>
              <Input
                id="amount"
                type="number"
                placeholder={t("loans.application.amountPlaceholder") ?? undefined}
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">{t("loans.application.termLabel")}</Label>
              <Select value={formData.term} onValueChange={(value) => setFormData({ ...formData, term: value })}>
                <SelectTrigger id="term">
                  <SelectValue placeholder={t("loans.application.termPlaceholder") ?? undefined} />
                </SelectTrigger>
                <SelectContent>
                  {termOptions.map((value) => (
                    <SelectItem key={value} value={value}>
                      {t(`loans.termOptions.${value}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">{t("loans.application.purposeLabel")}</Label>
            <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
              <SelectTrigger id="purpose">
                <SelectValue placeholder={t("loans.application.purposePlaceholder") ?? undefined} />
              </SelectTrigger>
              <SelectContent>
                {purposeOptions.map((value) => (
                  <SelectItem key={value} value={value}>
                    {t(`loans.purposeOptions.${value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("loans.application.descriptionLabel")}</Label>
            <Textarea
              id="description"
              placeholder={t("loans.application.descriptionPlaceholder") ?? undefined}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documents">Upload Documents</Label>
            <Input
              id="documents"
              type="file"
              multiple
              onChange={(e) =>
                setFormData({ ...formData, documents: e.target.files ? Array.from(e.target.files) : [] })
              }
            />
          </div>

          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("loans.summary.interestRate")}</span>
              <span className="font-semibold text-foreground">12.5% {t("loans.summary.interestSuffix")}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("loans.summary.monthlyPayment")}</span>
              <span className="font-semibold text-foreground">
                {formatCFA(
                  formData.amount && formData.term
                    ? Math.round((Number.parseInt(formData.amount, 10) * 1.125) / Number.parseInt(formData.term, 10))
                    : 0
                )}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("loans.summary.creditRating")}</span>
              <span className="font-semibold text-primary">AAA</span>
            </div>
          </div>

          <Button type="submit" className="w-full">
            {t("loans.application.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
