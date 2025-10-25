import { Client, LoanRequest, MonthlyFinancials, PaymentMethod, Transaction } from "./domain-types";

export const clients: Client[] = [
  { id: "c1", name: "Restaurant Teranga", type: "restaurant", location: "Dakar Plateau", joinedAt: "2024-01-15" },
  { id: "c2", name: "Chez Awa Fast Food", type: "fast_food", location: "Pikine", joinedAt: "2023-08-02" },
  { id: "c3", name: "Hotel Baobab", type: "hotel", location: "Saly", joinedAt: "2022-11-20" },
];

export const transactions: Transaction[] = [
  // recent inflows/outflows for c1
  { id: "t1", clientId: "c1", date: "2025-09-28", amount: 120000, method: "wave", direction: "inflow" },
  { id: "t2", clientId: "c1", date: "2025-09-28", amount: 45000, method: "cash", direction: "inflow" },
  { id: "t3", clientId: "c1", date: "2025-09-29", amount: 80000, method: "orange_money", direction: "inflow" },
  { id: "t4", clientId: "c1", date: "2025-09-29", amount: 30000, method: "card", direction: "inflow" },
  { id: "t5", clientId: "c1", date: "2025-09-30", amount: 95000, method: "cash", direction: "inflow" },
  { id: "t6", clientId: "c1", date: "2025-09-30", amount: 40000, method: "wave", direction: "outflow" },
  // samples for c2
  { id: "t7", clientId: "c2", date: "2025-09-29", amount: 60000, method: "wave", direction: "inflow" },
  { id: "t8", clientId: "c2", date: "2025-09-30", amount: 35000, method: "cash", direction: "inflow" },
  // samples for c3
  { id: "t9", clientId: "c3", date: "2025-09-28", amount: 220000, method: "card", direction: "inflow" },
];

export const loanRequests: LoanRequest[] = [
  { id: "lr1", clientId: "c1", amount: 1500000, termMonths: 12, createdAt: "2025-09-25", status: "pending", purpose: "Working capital" },
  { id: "lr2", clientId: "c2", amount: 700000, termMonths: 6, createdAt: "2025-09-20", status: "approved" },
  { id: "lr3", clientId: "c3", amount: 5000000, termMonths: 18, createdAt: "2025-09-10", status: "rejected" },
];

const methods: PaymentMethod[] = ["cash", "wave", "orange_money", "card"];

export function mockLastSixMonthsFinancials(clientId: string): MonthlyFinancials[] {
  // simple deterministic mock for 6 months
  const now = new Date("2025-09-30");
  const list: MonthlyFinancials[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const base = 800000 + (i * 50000);
    const revenue = base + (clientId.charCodeAt(0) % 7) * 10000;
    const expenses = Math.round(revenue * 0.65);
    const txCount = 200 + i * 10;
    const paymentBreakdown = methods.reduce((acc, m, idx) => {
      const weight = 1 + ((idx + i) % 3);
      acc[m] = Math.round((revenue * weight) / (methods.length + 3));
      return acc;
    }, {} as Record<PaymentMethod, number>);
    list.push({ month: ym, revenue, txCount, expenses, paymentBreakdown });
  }
  return list;
}
