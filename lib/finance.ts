"use client"

export function computePlatformFee(principal: number, feePercent: number = 0.02): number {
  if (!isFinite(principal) || principal <= 0) return 0
  return Math.max(0, Math.round(principal * feePercent))
}

export function computeMonthlyPayment(principal: number, annualRatePercent: number, termMonths: number): number {
  if (!isFinite(principal) || principal <= 0 || !isFinite(termMonths) || termMonths <= 0) return 0
  const annualRate = (annualRatePercent || 0) / 100
  const r = annualRate / 12
  if (r <= 0) {
    return Math.round(principal / termMonths)
  }
  const numerator = principal * r
  const denominator = 1 - Math.pow(1 + r, -termMonths)
  return Math.round(numerator / denominator)
}

export function computeTotalRepayable(monthlyPayment: number, termMonths: number): number {
  if (!isFinite(monthlyPayment) || !isFinite(termMonths) || termMonths <= 0) return 0
  return Math.max(0, Math.round(monthlyPayment * termMonths))
}

export function amortizationTotals(
  principal: number,
  annualRatePercent: number,
  termMonths: number,
  platformRatePoints: number = 2,
) {
  if (!isFinite(principal) || principal <= 0 || !isFinite(termMonths) || termMonths <= 0) {
    return {
      monthlyPayment: 0,
      totalRepayable: 0,
      totalInterest: 0,
      platformInterest: 0,
      lenderInterest: 0,
    }
  }

  const totalRatePct = Math.max(0, annualRatePercent || 0)
  const platformPts = Math.min(Math.max(0, platformRatePoints || 0), totalRatePct)
  const lenderPts = Math.max(0, totalRatePct - platformPts)

  const rTotal = (totalRatePct / 100) / 12
  const rPlatform = (platformPts / 100) / 12
  const rLender = (lenderPts / 100) / 12

  const monthlyPayment = computeMonthlyPayment(principal, totalRatePct, termMonths)

  if (rTotal === 0) {
    return {
      monthlyPayment,
      totalRepayable: computeTotalRepayable(monthlyPayment, termMonths),
      totalInterest: 0,
      platformInterest: 0,
      lenderInterest: 0,
    }
  }

  let outstanding = principal
  let platformInterest = 0
  let lenderInterest = 0

  for (let i = 0; i < termMonths; i++) {
    const interestTotal = outstanding * rTotal
    const interestPlat = outstanding * rPlatform
    const interestLend = interestTotal - interestPlat

    platformInterest += interestPlat
    lenderInterest += Math.max(0, interestLend)

    const principalPortion = monthlyPayment - interestTotal
    outstanding = Math.max(0, outstanding - principalPortion)
  }

  const totalInterest = Math.round(platformInterest + lenderInterest)
  return {
    monthlyPayment,
    totalRepayable: monthlyPayment * termMonths,
    totalInterest,
    platformInterest: Math.round(platformInterest),
    lenderInterest: Math.round(lenderInterest),
  }
}

