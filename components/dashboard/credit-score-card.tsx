"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { TrendingUp, Info, Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { calculateCreditScore, generateSampleBusinessData } from "@/lib/credit-scoring-engine"
import { formatCFA } from "@/lib/currency-utils"
import { useEffect, useState } from "react"

export function CreditScoreCard() {
  const { t } = useLanguage()
  const [scoreResult, setScoreResult] = useState<any>(null)

  useEffect(() => {
    const businessData = generateSampleBusinessData()
    const result = calculateCreditScore(businessData)
    setScoreResult(result)
  }, [])

  if (!scoreResult) return null

  const scorePercentage = scoreResult.finalScore

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "AAA":
        return "text-green-500"
      case "AA":
        return "text-blue-500"
      case "A":
        return "text-yellow-500"
      case "BBB":
        return "text-orange-500"
      case "BB":
        return "text-red-500"
      default:
        return "text-foreground"
    }
  }

  return (
    <Card className="border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-foreground font-bold text-sm">D-Credit</span>
            <div>
              <CardTitle className="text-2xl">{t("dashboard.credit.score")}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                {t("dashboard.credit.assessmentSubtitle")}
              </CardDescription>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 animate-pulse">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-end gap-4">
          <div className="text-6xl font-bold text-foreground animate-in fade-in duration-500">
            {scoreResult.finalScore}
          </div>
          <div className="pb-2">
            <div
              className={`text-3xl font-bold ${getRatingColor(scoreResult.rating)} animate-in slide-in-from-bottom duration-500`}
            >
              {scoreResult.rating}
            </div>
            <div className="text-sm text-muted-foreground">{t("dashboard.credit.rating")}</div>
            <Badge variant="outline" className="mt-1 text-xs">
              {t("dashboard.credit.riskLevel", { risk: scoreResult.riskLevel })}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("dashboard.credit.scoreProgress")}</span>
            <span className="font-medium text-foreground">{scoreResult.finalScore} / 100</span>
          </div>
          <Progress value={scorePercentage} className="h-3 transition-all duration-1000" />
        </div>

        <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-4 border border-primary/20">
          <div className="text-sm text-muted-foreground mb-1">{t("dashboard.credit.recommendedAmount")}</div>
          <div className="text-2xl font-bold text-primary">{formatCFA(scoreResult.recommendedCreditAmount)}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {t("dashboard.credit.maxAmount")}: {formatCFA(scoreResult.maxCreditAmount)}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="group hover:scale-105 transition-transform">
            <div className="text-sm text-muted-foreground">{t("dashboard.credit.revenueFlow")}</div>
            <div className="text-lg font-semibold text-foreground">
              {Math.round(scoreResult.categoryScores.revenueAndCashFlow)}%
            </div>
          </div>
          <div className="group hover:scale-105 transition-transform">
            <div className="text-sm text-muted-foreground">{t("dashboard.credit.profitability")}</div>
            <div className="text-lg font-semibold text-foreground">
              {Math.round(scoreResult.categoryScores.marginsAndProfitability)}%
            </div>
          </div>
          <div className="group hover:scale-105 transition-transform">
            <div className="text-sm text-muted-foreground">{t("dashboard.credit.debtRatio")}</div>
            <div className="text-lg font-semibold text-foreground">
              {Math.round(scoreResult.categoryScores.debtAndRepayment)}%
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-primary/5 p-4 hover:bg-primary/10 transition-colors">
          <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <div className="font-semibold text-foreground mb-1">{t("dashboard.credit.positiveFactors")}</div>
            <ul className="list-disc list-inside space-y-1">
              {scoreResult.factors.positive.map((factor: string, i: number) => (
                <li key={i}>{factor}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
