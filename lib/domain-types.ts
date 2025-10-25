export type PaymentMethod = "cash" | "wave" | "orange_money" | "card";

export interface Client {
  id: string;
  name: string;
  type: "restaurant" | "hotel" | "fast_food" | "glacier" | "other";
  location: string;
  joinedAt: string; // ISO date
}

export interface Transaction {
  id: string;
  clientId: string;
  date: string; // ISO date
  amount: number;
  method: PaymentMethod;
  direction: "inflow" | "outflow";
}

export type LoanRequestStatus = "pending" | "approved" | "rejected";

export interface LoanRequest {
  id: string;
  clientId: string;
  amount: number;
  termMonths: number;
  createdAt: string; // ISO date
  status: LoanRequestStatus;
  purpose?: string;
}

export interface MonthlyFinancials {
  month: string; // YYYY-MM
  revenue: number;
  txCount: number;
  expenses: number;
  paymentBreakdown: Record<PaymentMethod, number>;
}
