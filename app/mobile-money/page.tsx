import { MobileMoneyHeader } from "@/components/mobile-money/mobile-money-header"
import { MobileMoneyProviders } from "@/components/mobile-money/mobile-money-providers"
import { TransactionHistory } from "@/components/mobile-money/transaction-history"
import { SendMoneyForm } from "@/components/mobile-money/send-money-form"
import { AccountBalances } from "@/components/mobile-money/account-balances"
import { AppLayout } from "@/components/app-layout"

export default function MobileMoneyPage() {
  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-fade-in">
          <MobileMoneyHeader />
        </div>
        <div className="animate-slide-up animate-stagger-1">
          <AccountBalances />
        </div>
        <div className="animate-slide-up animate-stagger-2">
          <MobileMoneyProviders />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 animate-slide-up animate-stagger-3">
            <TransactionHistory />
          </div>
          <div className="animate-slide-up animate-stagger-4">
            <SendMoneyForm />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
