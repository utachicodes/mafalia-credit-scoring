"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calculator } from "lucide-react"
import { formatCFA, formatCFAShort } from "@/lib/currency-utils"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export function LoanCalculator() {
  const { t, language } = useLanguage()
  const [amount, setAmount] = useState(5000000) // 5M FCFA
  const [term, setTerm] = useState(24)
  const [rate, setRate] = useState(12.5)

  const monthlyRate = rate / 100 / 12
  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
  const totalPayment = monthlyPayment * term
  const totalInterest = totalPayment - amount

  return (
    <Card className="border-border sticky top-24 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              {t("loans.calculator.title")}
              <Image src="/logo.svg" alt="" width={20} height={20} className="object-contain" />
            </CardTitle>
            <CardDescription>{t("loans.calculator.description")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t("loans.application.amountLabel")}: {formatCFAShort(amount)}
            </Label>
            <Slider
              value={[amount]}
              onValueChange={(value) => setAmount(value[0])}
              min={500000}
              max={50000000}
              step={500000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t("loans.calculator.amountMin")}</span>
              <span>{t("loans.calculator.amountMax")}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t("loans.application.termLabel")}: {term} {language === "fr" ? "mois" : "months"}
            </Label>
            <Slider
              value={[term]}
              onValueChange={(value) => setTerm(value[0])}
              min={6}
              max={60}
              step={6}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t("loans.calculator.termMin")}</span>
              <span>{t("loans.calculator.termMax")}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {t("loans.summary.interestRate")}: {rate}%
            </Label>
            <Slider
              value={[rate]}
              onValueChange={(value) => setRate(value[0])}
              min={5}
              max={25}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5%</span>
              <span>25%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 transition-all">
            <span className="text-sm font-medium text-muted-foreground">{t("loans.summary.monthlyPayment")}</span>
            <span className="text-2xl font-bold text-primary">{formatCFAShort(Math.round(monthlyPayment))}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm p-2 rounded hover:bg-muted/50 transition-colors">
              <span className="text-muted-foreground">{t("loans.totals.totalPayment")}</span>
              <span className="font-semibold text-foreground">{formatCFA(Math.round(totalPayment))}</span>
            </div>
            <div className="flex items-center justify-between text-sm p-2 rounded hover:bg-muted/50 transition-colors">
              <span className="text-muted-foreground">{t("loans.totals.totalInterest")}</span>
              <span className="font-semibold text-foreground">{formatCFA(Math.round(totalInterest))}</span>
            </div>
            <div className="flex items-center justify-between text-sm p-2 rounded hover:bg-muted/50 transition-colors">
              <span className="text-muted-foreground">{t("loans.totals.principal")}</span>
              <span className="font-semibold text-foreground">{formatCFA(amount)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
