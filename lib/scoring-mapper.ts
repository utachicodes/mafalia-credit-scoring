import { defaultCriteria } from "./default-criteria";
import { computeScore } from "./criteria-scoring";
import type { ScoreInput } from "./criteria";
import { clients, transactions, mockLastSixMonthsFinancials } from "./mock-data";

function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }

export function buildScoreInputForClient(clientId: string): { inputs: ScoreInput; score01: number } {
  const fin = mockLastSixMonthsFinancials(clientId);
  const tx = transactions.filter(t => t.clientId === clientId);
  if (fin.length === 0) return { inputs: {}, score01: 0 };

  const avgRevenue = fin.reduce((s, m) => s + m.revenue, 0) / fin.length;
  const avgExpenses = fin.reduce((s, m) => s + m.expenses, 0) / fin.length;
  const avgTxCount = fin.reduce((s, m) => s + m.txCount, 0) / fin.length;
  const totalRevenue = fin.reduce((s, m) => s + m.revenue, 0);
  const totalTxCount = fin.reduce((s, m) => s + m.txCount, 0);

  const last = fin[fin.length - 1];
  const shares = last ? last.paymentBreakdown : { cash: 0, wave: 0, orange_money: 0, card: 0 };
  const sumShares = Object.values(shares).reduce((a, b) => a + b, 0) || 1;
  const probs = Object.values(shares).map(v => v / sumShares);
  const entropy = -probs.reduce((s, p) => s + (p > 0 ? p * Math.log(p) : 0), 0);
  const maxEntropy = Math.log(probs.length || 1);
  const diversity = maxEntropy > 0 ? entropy / maxEntropy : 0;

  const revenueVar = fin.reduce((s, m) => s + Math.pow(m.revenue - avgRevenue, 2), 0) / fin.length;
  const revenueStd = Math.sqrt(revenueVar);
  const cov = avgRevenue > 0 ? revenueStd / avgRevenue : 1;

  const avgTxAmount = totalTxCount > 0 ? totalRevenue / totalTxCount : 0;

  // Derive repayment-like signals from monthly net cashflows
  const monthlyNet = fin.map(m => m.revenue - m.expenses);
  const positiveMonths = monthlyNet.filter(n => n >= 0).length;
  const nonNegativeRatio = positiveMonths / fin.length;
  // Fewer negative months -> better repayment history
  const repaymentHistoryScore = clamp01(nonNegativeRatio);
  // Incidents: proportion of months with negative net -> higher incidents => lower score
  const incidentRatio = 1 - nonNegativeRatio; // 0 (no incidents) .. 1 (all months negative)
  const incidentsScore = clamp01(1 - incidentRatio);

  // Engagement proxy: based on average tx count relative to 400/month and consistency
  const engagement = 0.7 * clamp01(avgTxCount / 400) + 0.3 * clamp01(1 - Math.min(1, cov));

  const inputs: ScoreInput = {
    avg_revenue_6_12m: clamp01(avgRevenue / 3_000_000), // cap ~3M CFA
    tx_count: clamp01(avgTxCount / 400), // cap ~400 tx/month
    avg_tx_amount: clamp01(avgTxAmount / 100_000), // cap ~100k CFA
    cashflow_net: clamp01((avgRevenue > 0 ? (avgRevenue - avgExpenses) / avgRevenue : 0)),
    available_balance: clamp01((last && last.revenue > 0) ? (last.revenue - last.expenses) / last.revenue : 0),
    debt_repayment_history: repaymentHistoryScore,
    payment_mix: clamp01(diversity),
    late_payment_incidents: incidentsScore,
    tx_consistency: clamp01(1 - Math.min(1, cov)),
    business_age: clamp01(((() => { const c = clients.find(c => c.id === clientId); if (!c) return 0; const years = (Date.now() - Date.parse(c.joinedAt)) / (365*24*3600*1000); return years / 5; })())),
    avg_purchase_volume: clamp01(avgExpenses / avgRevenue || 0),
    sales_variability: clamp01(1 - Math.min(1, cov)),
    business_type: 0.5,
    location: 0.5,
    reputation_reviews: 0.5,
    dcredit_engagement: clamp01(engagement),
    market_stability: 0.5,
    repayment_capacity: clamp01((avgRevenue > 0 ? (avgRevenue - avgExpenses) / avgRevenue : 0)),
  };

  const score01 = computeScore(defaultCriteria, inputs);
  return { inputs, score01 };
}

export function estimateRepaymentCapacity(clientId: string, amount: number, termMonths: number) {
  const fin = mockLastSixMonthsFinancials(clientId);
  if (fin.length === 0 || termMonths <= 0 || amount <= 0) return { ratio: 0, installment: 0, ok: false };
  const avgNet = fin.reduce((s, m) => s + (m.revenue - m.expenses), 0) / fin.length;
  const installment = amount / termMonths; // simple estimate (no interest)
  const ratio = installment > 0 ? avgNet / installment : 0;
  return { ratio, installment: Math.round(installment), ok: ratio >= 1.2 };
}
