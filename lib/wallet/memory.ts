type Wallet = {
  id: string
  userId: string
  currency: string
  balance: number
  createdAt: string
  updatedAt: string
}

type WalletTransaction = {
  id: string
  walletId: string
  type: "topup" | "transfer_in" | "transfer_out" | "withdraw" | "refund" | "adjustment"
  status: "pending" | "succeeded" | "failed" | "cancelled"
  amount: number
  currency: string
  note?: string | null
  reference?: string | null
  metadata?: Record<string, unknown>
  createdAt: string
}

const WALLETS = new Map<string, Wallet>() // key: userId
const TXS = new Map<string, WalletTransaction[]>() // key: walletId
const IDEMPOTENCY = new Map<string, unknown>()

export function getIdem<T = unknown>(key: string): T | undefined {
  return IDEMPOTENCY.get(key) as T | undefined
}

export function setIdem<T = unknown>(key: string, value: T) {
  IDEMPOTENCY.set(key, value)
}

export function getOrCreateWallet(userId: string, currency = "XOF"): Wallet {
  const existing = WALLETS.get(userId)
  if (existing) return existing
  const wallet: Wallet = {
    id: `wa_${crypto.randomUUID()}`,
    userId,
    currency,
    balance: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  WALLETS.set(userId, wallet)
  TXS.set(wallet.id, [])
  return wallet
}

export function listTransactions(walletId: string, limit = 50): WalletTransaction[] {
  const arr = TXS.get(walletId) || []
  return arr.slice(-limit).reverse()
}

export function pushTransaction(tx: WalletTransaction) {
  const arr = TXS.get(tx.walletId) || []
  arr.push(tx)
  TXS.set(tx.walletId, arr)
}

export function creditWallet(wallet: Wallet, amount: number) {
  wallet.balance += amount
  wallet.updatedAt = new Date().toISOString()
}

export function debitWallet(wallet: Wallet, amount: number) {
  wallet.balance -= amount
  wallet.updatedAt = new Date().toISOString()
}

export type { Wallet, WalletTransaction }


