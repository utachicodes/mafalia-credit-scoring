export type CriterionId =
  | "avg_revenue_6_12m"
  | "tx_count"
  | "avg_tx_amount"
  | "cashflow_net"
  | "available_balance"
  | "debt_repayment_history"
  | "payment_mix"
  | "late_payment_incidents"
  | "tx_consistency"
  | "business_age"
  | "avg_purchase_volume"
  | "sales_variability"
  | "business_type"
  | "location"
  | "reputation_reviews"
  | "dcredit_engagement"
  | "market_stability"
  | "repayment_capacity";

export interface Criterion {
  id: CriterionId;
  label: string;
  description: string;
  defaultWeight: number; // percent
  customizable: boolean;
  minScore: number; // 0
  maxScore: number; // 1
}

export type ScoreInput = Partial<Record<CriterionId, number>>;
