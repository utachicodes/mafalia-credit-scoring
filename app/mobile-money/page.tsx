import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MobileMoneyHeader } from "@/components/mobile-money/mobile-money-header"
import { MobileMoneyProviders } from "@/components/mobile-money/mobile-money-providers"
import { TransactionHistory } from "@/components/mobile-money/transaction-history"
import { SendMoneyForm } from "@/components/mobile-money/send-money-form"
import { AccountBalances } from "@/components/mobile-money/account-balances"

export default function MobileMoneyPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <MobileMoneyHeader />
        <AccountBalances />
        <MobileMoneyProviders />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TransactionHistory />
          </div>
          <SendMoneyForm />
        </div>
      </main>
    </div>
  )
}
