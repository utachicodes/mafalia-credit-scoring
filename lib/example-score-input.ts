import type { ScoreInput } from "./criteria";

// Example sub-scores in [0,1] for quick testing in the UI
export const exampleScoreInput: ScoreInput = {
  avg_revenue_6_12m: 0.7,
  tx_count: 0.6,
  avg_tx_amount: 0.5,
  cashflow_net: 0.65,
  available_balance: 0.55,
  debt_repayment_history: 0.8,
  payment_mix: 0.5,
  late_payment_incidents: 0.2,
  tx_consistency: 0.7,
  business_age: 0.6,
  avg_purchase_volume: 0.5,
  sales_variability: 0.4,
  business_type: 0.5,
  location: 0.6,
  reputation_reviews: 0.7,
  dcredit_engagement: 0.8,
  market_stability: 0.5,
  repayment_capacity: 0.75,
};
