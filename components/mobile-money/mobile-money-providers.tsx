"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Smartphone, CheckCircle2, Settings } from "lucide-react"

export function MobileMoneyProviders() {
  const providers = [
    {
      name: "M-Pesa",
      account: "+254 712 345 678",
      balance: "$18,450",
      status: "active",
      transactions: 156,
      color: "bg-green-600",
    },
    {
      name: "Orange Money",
      account: "+225 07 12 34 56 78",
      balance: "$12,830",
      status: "active",
      transactions: 89,
      color: "bg-orange-600",
    },
    {
      name: "MTN Mobile Money",
      account: "+233 24 123 4567",
      balance: "$14,000",
      status: "active",
      transactions: 124,
      color: "bg-yellow-600",
    },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Connected Providers</CardTitle>
        <CardDescription>Your linked mobile money accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider, index) => (
            <div key={index} className="rounded-lg border border-border p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${provider.color}`}>
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{provider.name}</div>
                    <div className="text-sm text-muted-foreground">{provider.account}</div>
                  </div>
                </div>
                <Badge variant="default" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {provider.status}
                </Badge>
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Balance</span>
                  <span className="text-lg font-bold text-foreground">{provider.balance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Transactions</span>
                  <span className="text-sm font-medium text-foreground">{provider.transactions}</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                <Settings className="h-4 w-4" />
                Manage
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
