export interface BusinessData {
  // Revenue and Financial Data
  monthlyRevenue: number
  annualRevenue: number
  revenueBreakdown: {
    cash: number
    mobileMoney: number
  }

  // Expenses and Cash Flow
  monthlyExpenses: number
  operatingCosts: number
  cashFlowInflows: number
  cashFlowOutflows: number

  // Margins
  grossMargin: number
  netMargin: number

  // Debt
  shortTermDebt: number
  longTermDebt: number

  // Inventory
  inventoryValue: number
  inventoryTurnover: number

  // Client Receivables
  totalReceivables: number
  paymentTerms: number
  doubtfulReceivables: number
  unpaidReceivables: number

  // Operational Data
  dailyTransactions: number
  weeklyTransactions: number
  averageSalesVolume: number
  averagePurchasesVolume: number

  // Mobile Money Data
  mobileMoneyInflows: number
  mobileMoneyOutflows: number
  transactionFrequency: number

  // Repayment History
  repaymentHistory: "perfect" | "occasional_delays" | "frequent_delays" | "average" | "poor"

  // Legal
  hasBusinessRegistration: boolean
  hasNINEA: boolean
  usesDCredit: boolean
}

export interface CreditScoreResult {
  finalScore: number
  rating: "AAA" | "AA" | "A" | "BBB" | "BB"
  ratingCoefficient: number
  categoryScores: {
    revenueAndCashFlow: number
    marginsAndProfitability: number
    debtAndRepayment: number
    clientReceivables: number
    inventoryAndOperations: number
    legalAndTools: number
  }
  recommendedCreditAmount: number
  maxCreditAmount: number
  riskLevel: string
  factors: {
    positive: string[]
    negative: string[]
  }
}

// Category weights from technical document
const WEIGHTS = {
  revenueAndCashFlow: 0.25,
  marginsAndProfitability: 0.15,
  debtAndRepayment: 0.15,
  clientReceivables: 0.15,
  inventoryAndOperations: 0.15,
  legalAndTools: 0.15,
}

// Repayment history coefficients
const REPAYMENT_COEFFICIENTS = {
  perfect: 1.0,
  occasional_delays: 0.9,
  frequent_delays: 0.8,
  average: 0.7,
  poor: 0.5,
}

// Rating thresholds and coefficients
const RATING_CONFIG = {
  AAA: { min: 90, max: 100, coefficient: 1.0, risk: "Very Low" },
  AA: { min: 75, max: 89, coefficient: 0.8, risk: "Low" },
  A: { min: 60, max: 74, coefficient: 0.6, risk: "Moderate" },
  BBB: { min: 45, max: 59, coefficient: 0.4, risk: "High" },
  BB: { min: 0, max: 44, coefficient: 0.2, risk: "Very High" },
}

function normalizeValue(value: number, min: number, max: number): number {
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
}

function calculateRevenueAndCashFlowScore(data: BusinessData): number {
  const revenueStability = normalizeValue(data.monthlyRevenue, 0, 5000000)
  const cashFlowRatio =
    data.cashFlowInflows > 0
      ? normalizeValue(((data.cashFlowInflows - data.cashFlowOutflows) / data.cashFlowInflows) * 100, 0, 100)
      : 0
  const mobileMoneyRatio =
    data.monthlyRevenue > 0
      ? normalizeValue((data.revenueBreakdown.mobileMoney / data.monthlyRevenue) * 100, 0, 100)
      : 0

  return revenueStability * 0.5 + cashFlowRatio * 0.3 + mobileMoneyRatio * 0.2
}

function calculateMarginsAndProfitabilityScore(data: BusinessData): number {
  const grossMarginScore = normalizeValue(data.grossMargin, 0, 50)
  const netMarginScore = normalizeValue(data.netMargin, 0, 30)

  return grossMarginScore * 0.6 + netMarginScore * 0.4
}

function calculateDebtAndRepaymentScore(data: BusinessData): number {
  const totalDebt = data.shortTermDebt + data.longTermDebt
  const debtToRevenueRatio = data.annualRevenue > 0 ? (totalDebt / data.annualRevenue) * 100 : 100

  const debtScore = normalizeValue(100 - debtToRevenueRatio, 0, 100)
  const repaymentScore = REPAYMENT_COEFFICIENTS[data.repaymentHistory] * 100

  return debtScore * 0.5 + repaymentScore * 0.5
}

function calculateClientReceivablesScore(data: BusinessData): number {
  const receivablesRatio = data.monthlyRevenue > 0 ? (data.totalReceivables / data.monthlyRevenue) * 100 : 100

  const doubtfulRatio = data.totalReceivables > 0 ? (data.doubtfulReceivables / data.totalReceivables) * 100 : 0

  const receivablesScore = normalizeValue(100 - receivablesRatio, 0, 100)
  const qualityScore = normalizeValue(100 - doubtfulRatio, 0, 100)

  return receivablesScore * 0.5 + qualityScore * 0.5
}

function calculateInventoryAndOperationsScore(data: BusinessData): number {
  const turnoverScore = normalizeValue(data.inventoryTurnover, 0, 12)
  const transactionConsistency = normalizeValue(data.dailyTransactions, 0, 100)
  const volumeScore = normalizeValue(data.averageSalesVolume, 0, 1000000)

  return turnoverScore * 0.4 + transactionConsistency * 0.3 + volumeScore * 0.3
}

function calculateLegalAndToolsScore(data: BusinessData): number {
  let score = 0

  if (data.hasBusinessRegistration) score += 40
  if (data.hasNINEA) score += 30
  if (data.usesDCredit) score += 30

  return score
}

function getRating(score: number): "AAA" | "AA" | "A" | "BBB" | "BB" {
  if (score >= 90) return "AAA"
  if (score >= 75) return "AA"
  if (score >= 60) return "A"
  if (score >= 45) return "BBB"
  return "BB"
}

function calculateCreditAmount(data: BusinessData, score: number, rating: "AAA" | "AA" | "A" | "BBB" | "BB"): number {
  const averageMonthlyCashFlow = data.cashFlowInflows - data.cashFlowOutflows
  const scoreCoefficient = RATING_CONFIG[rating].coefficient
  const repaymentCoefficient = REPAYMENT_COEFFICIENTS[data.repaymentHistory]

  const creditAmount = Math.max(
    0,
    averageMonthlyCashFlow * scoreCoefficient * repaymentCoefficient - data.doubtfulReceivables,
  )

  return Math.round(creditAmount)
}

function identifyFactors(data: BusinessData, categoryScores: any): { positive: string[]; negative: string[] } {
  const positive: string[] = []
  const negative: string[] = []

  // Revenue factors
  if (categoryScores.revenueAndCashFlow >= 75) {
    positive.push("Strong and stable revenue streams")
  } else if (categoryScores.revenueAndCashFlow < 50) {
    negative.push("Inconsistent revenue patterns")
  }

  // Margin factors
  if (data.grossMargin >= 30) {
    positive.push("Healthy profit margins")
  } else if (data.grossMargin < 15) {
    negative.push("Low profitability margins")
  }

  // Debt factors
  const debtRatio = (data.shortTermDebt + data.longTermDebt) / data.annualRevenue
  if (debtRatio < 0.3) {
    positive.push("Low debt burden")
  } else if (debtRatio > 0.7) {
    negative.push("High debt-to-revenue ratio")
  }

  // Receivables factors
  if (data.doubtfulReceivables / data.totalReceivables < 0.1) {
    positive.push("Excellent receivables quality")
  } else if (data.doubtfulReceivables / data.totalReceivables > 0.3) {
    negative.push("High doubtful receivables")
  }

  // Repayment history
  if (data.repaymentHistory === "perfect") {
    positive.push("Perfect repayment history")
  } else if (data.repaymentHistory === "poor") {
    negative.push("Poor repayment track record")
  }

  // Legal compliance
  if (data.hasBusinessRegistration && data.hasNINEA) {
    positive.push("Fully registered and compliant")
  } else {
    negative.push("Missing legal documentation")
  }

  // Mobile Money usage
  const mmRatio = data.revenueBreakdown.mobileMoney / data.monthlyRevenue
  if (mmRatio > 0.5) {
    positive.push("Strong digital payment adoption")
  }

  return { positive, negative }
}

export function calculateCreditScore(data: BusinessData): CreditScoreResult {
  // Calculate category scores
  const categoryScores = {
    revenueAndCashFlow: calculateRevenueAndCashFlowScore(data),
    marginsAndProfitability: calculateMarginsAndProfitabilityScore(data),
    debtAndRepayment: calculateDebtAndRepaymentScore(data),
    clientReceivables: calculateClientReceivablesScore(data),
    inventoryAndOperations: calculateInventoryAndOperationsScore(data),
    legalAndTools: calculateLegalAndToolsScore(data),
  }

  // Calculate weighted final score
  let finalScore = 0
  finalScore += categoryScores.revenueAndCashFlow * WEIGHTS.revenueAndCashFlow
  finalScore += categoryScores.marginsAndProfitability * WEIGHTS.marginsAndProfitability
  finalScore += categoryScores.debtAndRepayment * WEIGHTS.debtAndRepayment
  finalScore += categoryScores.clientReceivables * WEIGHTS.clientReceivables
  finalScore += categoryScores.inventoryAndOperations * WEIGHTS.inventoryAndOperations
  finalScore += categoryScores.legalAndTools * WEIGHTS.legalAndTools

  // Adjust for doubtful receivables
  if (data.monthlyRevenue > 0) {
    const receivablesAdjustment = 1 - data.doubtfulReceivables / data.monthlyRevenue
    finalScore = finalScore * Math.max(0.5, receivablesAdjustment)
  }

  finalScore = Math.min(100, Math.max(0, finalScore))

  // Determine rating
  const rating = getRating(finalScore)
  const ratingConfig = RATING_CONFIG[rating]

  // Calculate credit amount
  const recommendedCreditAmount = calculateCreditAmount(data, finalScore, rating)
  const maxCreditAmount = Math.round(recommendedCreditAmount * 1.5)

  // Identify factors
  const factors = identifyFactors(data, categoryScores)

  return {
    finalScore: Math.round(finalScore),
    rating,
    ratingCoefficient: ratingConfig.coefficient,
    categoryScores,
    recommendedCreditAmount,
    maxCreditAmount,
    riskLevel: ratingConfig.risk,
    factors,
  }
}

// Generate sample business data for demonstration
export function generateSampleBusinessData(): BusinessData {
  return {
    monthlyRevenue: 2500000,
    annualRevenue: 30000000,
    revenueBreakdown: {
      cash: 1000000,
      mobileMoney: 1500000,
    },
    monthlyExpenses: 1800000,
    operatingCosts: 1500000,
    cashFlowInflows: 2500000,
    cashFlowOutflows: 1800000,
    grossMargin: 28,
    netMargin: 12,
    shortTermDebt: 3000000,
    longTermDebt: 5000000,
    inventoryValue: 4000000,
    inventoryTurnover: 8,
    totalReceivables: 1500000,
    paymentTerms: 30,
    doubtfulReceivables: 150000,
    unpaidReceivables: 200000,
    dailyTransactions: 45,
    weeklyTransactions: 315,
    averageSalesVolume: 85000,
    averagePurchasesVolume: 60000,
    mobileMoneyInflows: 1500000,
    mobileMoneyOutflows: 800000,
    transactionFrequency: 280,
    repaymentHistory: "perfect",
    hasBusinessRegistration: true,
    hasNINEA: true,
    usesDCredit: true,
  }
}
