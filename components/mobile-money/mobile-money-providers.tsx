"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Smartphone, CheckCircle2, Settings } from "lucide-react"
import { formatCFA } from "@/lib/currency-utils"
import { useLanguage } from "@/components/language-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Provider {
  id: string
  name: string
  account: string
  balance: number
  status: string
  transactions: number
  color: string
}

export function MobileMoneyProviders() {
  const { t } = useLanguage()
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "1",
      name: "Wave",
      account: "+221 77 123 45 67",
      balance: 18450,
      status: "active",
      transactions: 156,
      color: "bg-green-600",
    },
    {
      id: "2",
      name: "Orange Money",
      account: "+221 78 234 56 78",
      balance: 12830,
      status: "active",
      transactions: 89,
      color: "bg-orange-600",
    },
    {
      id: "3",
      name: "Free Money",
      account: "+221 76 345 67 89",
      balance: 14000,
      status: "active",
      transactions: 124,
      color: "bg-yellow-600",
    },
  ])

  const [manageDialogOpen, setManageDialogOpen] = useState<string | null>(null)
  const [manageFormData, setManageFormData] = useState({ account: "", balance: "" })

  const handleManage = (provider: Provider) => {
    setManageFormData({ account: provider.account, balance: provider.balance.toString() })
    setManageDialogOpen(provider.id)
  }

  const handleSaveManage = (id: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              account: manageFormData.account,
              balance: Number.parseFloat(manageFormData.balance) || 0,
            }
          : p
      )
    )
    setManageDialogOpen(null)
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{t("mobileMoney.title")}</CardTitle>
        <CardDescription>{t("mobileMoney.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <div key={provider.id} className="rounded-lg border border-border p-4 space-y-4">
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
                  {t(`dashboard.status.${provider.status}`)}
                </Badge>
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("mobileMoney.balance")}</span>
                  <span className="text-lg font-bold text-foreground">{formatCFA(provider.balance)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("mobileMoney.transactions")}</span>
                  <span className="text-sm font-medium text-foreground">{provider.transactions}</span>
                </div>
              </div>

              <Dialog open={manageDialogOpen === provider.id} onOpenChange={(open) => !open && setManageDialogOpen(null)}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent" onClick={() => handleManage(provider)}>
                    <Settings className="h-4 w-4" />
                    {t("common.manage")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("common.manage")} {provider.name}</DialogTitle>
                    <DialogDescription>{t("mobileMoney.addProvider.description")}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="manage-account">{t("mobileMoney.addProvider.accountLabel")}</Label>
                      <Input
                        id="manage-account"
                        value={manageFormData.account}
                        onChange={(e) => setManageFormData({ ...manageFormData, account: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manage-balance">{t("mobileMoney.balance")}</Label>
                      <Input
                        id="manage-balance"
                        type="number"
                        value={manageFormData.balance}
                        onChange={(e) => setManageFormData({ ...manageFormData, balance: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setManageDialogOpen(null)}>
                      {t("common.cancel")}
                    </Button>
                    <Button onClick={() => handleSaveManage(provider.id)}>{t("common.save")}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
