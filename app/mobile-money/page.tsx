import { MobileMoneyHeader } from "@/components/mobile-money/mobile-money-header"
import { MobileMoneyProviders } from "@/components/mobile-money/mobile-money-providers"
import { TransactionHistory } from "@/components/mobile-money/transaction-history"
import { SendMoneyForm } from "@/components/mobile-money/send-money-form"
import { AccountBalances } from "@/components/mobile-money/account-balances"
import { AppLayout } from "@/components/app-layout"

export default function MobileMoneyPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <MobileMoneyHeader />
        <AccountBalances />
        <MobileMoneyProviders />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TransactionHistory />
          </div>
          <SendMoneyForm />
        </div>
      </div>
    </AppLayout>
  )
}
