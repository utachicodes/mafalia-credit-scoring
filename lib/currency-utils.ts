export function formatCFA(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`
}

export function formatCFAShort(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M FCFA`
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K FCFA`
  }
  return `${amount} FCFA`
}

export function parseCFA(value: string): number {
  return Number.parseInt(value.replace(/[^0-9]/g, "")) || 0
}
