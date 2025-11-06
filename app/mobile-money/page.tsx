"use client"

import { useState } from "react"
import { MobileMoneyHeader } from "@/components/mobile-money/mobile-money-header"
import { MobileMoneyProviders } from "@/components/mobile-money/mobile-money-providers"
import { TransactionHistory } from "@/components/mobile-money/transaction-history"
import { SendMoneyForm } from "@/components/mobile-money/send-money-form"
import { AccountBalances } from "@/components/mobile-money/account-balances"
import { AppLayout } from "@/components/app-layout"
import { useToast } from "@/components/ui/use-toast"

export default function MobileMoneyPage() {
  const [providers, setProviders] = useState<any[]>([])
  const { toast } = useToast()

  const handleProviderAdd = (provider: { name: string; account: string; type: string }) => {
    setProviders((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...provider,
        balance: 0,
        status: "active",
        transactions: 0,
        color: "bg-blue-600",
      },
    ])
    toast({
      title: "Provider Added",
      description: `${provider.name} has been added successfully`,
    })
  }

  const handleSync = async () => {
    toast({
      title: "Sync Complete",
      description: "All providers have been synchronized",
    })
  }

  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-fade-in">
          <MobileMoneyHeader onProviderAdd={handleProviderAdd} onSync={handleSync} />
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
