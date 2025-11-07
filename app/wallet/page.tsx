"use client"

import { useEffect, useMemo, useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"
import { safeFetchJson } from "@/lib/safe-fetch"

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
  createdAt: string
}

export default function WalletPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [txs, setTxs] = useState<WalletTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [topUpOpen, setTopUpOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  // Top up form
  const [topUpAmount, setTopUpAmount] = useState(0)
  const [topUpNote, setTopUpNote] = useState("")

  // Withdraw form
  const [wdAmount, setWdAmount] = useState(0)
  const [wdDestinationKind, setWdDestinationKind] = useState<"wallet" | "bank">("wallet")
  const [wdProvider, setWdProvider] = useState("wave")
  const [wdWalletNumber, setWdWalletNumber] = useState("")
  const [wdIban, setWdIban] = useState("")
  const [wdAccountNumber, setWdAccountNumber] = useState("")
  const [wdNote, setWdNote] = useState("")

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: wallet?.currency || "XOF",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
    [wallet?.currency],
  )

  async function refresh() {
    setLoading(true)
    const [wRes, tRes] = await Promise.all([
      safeFetchJson<{ wallet: Wallet }>("/api/wallet"),
      safeFetchJson<{ items: WalletTransaction[] }>("/api/wallet/transactions"),
    ])
    if (!wRes.error && wRes.data?.wallet) setWallet(wRes.data.wallet)
    if (!tRes.error && tRes.data?.items) setTxs(tRes.data.items)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  async function handleTopUp() {
    const key = crypto.randomUUID()
    const res = await safeFetchJson<{ wallet: Wallet; transaction: WalletTransaction }>("/api/wallet/topup", {
      method: "POST",
      headers: { "content-type": "application/json", "x-idempotency-key": key },
      body: JSON.stringify({ amount: Number(topUpAmount), currency: wallet?.currency || "XOF", note: topUpNote || undefined }),
    })
    if (res.error) {
      toast({ title: t("common.error"), description: res.error })
      return
    }
    if (res.data?.wallet) setWallet(res.data.wallet)
    await refresh()
    setTopUpOpen(false)
    setTopUpAmount(0)
    setTopUpNote("")
    toast({ title: t("common.success"), description: t("wallet.toasts.topUpSuccess") })
  }

  async function handleWithdraw() {
    const key = crypto.randomUUID()
    const destination =
      wdDestinationKind === "wallet"
        ? { kind: "wallet", walletProvider: wdProvider, walletNumber: wdWalletNumber }
        : { kind: "bank", iban: wdIban || undefined, accountNumber: wdAccountNumber || undefined }
    const res = await safeFetchJson<{ wallet: Wallet; transaction: WalletTransaction }>("/api/wallet/withdraw", {
      method: "POST",
      headers: { "content-type": "application/json", "x-idempotency-key": key },
      body: JSON.stringify({ amount: Number(wdAmount), currency: wallet?.currency || "XOF", note: wdNote || undefined, destination }),
    })
    if (res.error) {
      toast({ title: t("common.error"), description: res.error })
      return
    }
    if (res.data?.wallet) setWallet(res.data.wallet)
    await refresh()
    setWithdrawOpen(false)
    setWdAmount(0)
    setWdNote("")
    setWdWalletNumber("")
    setWdIban("")
    setWdAccountNumber("")
    toast({ title: t("common.success"), description: t("wallet.toasts.withdrawSuccess") })
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">{t("wallet.title")}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 col-span-1 md:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{t("wallet.availableBalance")}</div>
                <div className="text-3xl font-bold mt-1">
                  {loading ? "…" : formatter.format(wallet?.balance ?? 0)}
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog open={topUpOpen} onOpenChange={setTopUpOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">{t("wallet.actions.topUp")}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("wallet.actions.topUp")}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">{t("wallet.forms.amountLabel")}</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={topUpAmount}
                          onChange={(e) => setTopUpAmount(Number(e.target.value))}
                          placeholder={t("wallet.forms.amountPlaceholder")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="note">{t("wallet.forms.noteLabel")}</Label>
                        <Input id="note" value={topUpNote} onChange={(e) => setTopUpNote(e.target.value)} />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setTopUpOpen(false)}>{t("common.cancel")}</Button>
                        <Button onClick={handleTopUp}>{t("wallet.forms.submitTopUp")}</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary">{t("wallet.actions.withdraw")}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("wallet.actions.withdraw")}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="wd-amount">{t("wallet.forms.amountLabel")}</Label>
                        <Input
                          id="wd-amount"
                          type="number"
                          value={wdAmount}
                          onChange={(e) => setWdAmount(Number(e.target.value))}
                          placeholder={t("wallet.forms.amountPlaceholder")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("wallet.forms.destinationKindLabel")}</Label>
                        <Select value={wdDestinationKind} onValueChange={(v) => setWdDestinationKind(v as any)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wallet">{t("wallet.forms.destinationKindWallet")}</SelectItem>
                            <SelectItem value="bank">{t("wallet.forms.destinationKindBank")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {wdDestinationKind === "wallet" ? (
                        <>
                          <div className="space-y-2">
                            <Label>{t("wallet.forms.providerLabel")}</Label>
                            <Select value={wdProvider} onValueChange={setWdProvider}>
                              <SelectTrigger>
                                <SelectValue placeholder={t("wallet.forms.providerPlaceholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="wave">Wave</SelectItem>
                                <SelectItem value="orange-money">Orange Money</SelectItem>
                                <SelectItem value="free-money">Free Money</SelectItem>
                                <SelectItem value="moov">Moov</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="wd-wallet">{t("wallet.forms.walletNumberLabel")}</Label>
                            <Input id="wd-wallet" value={wdWalletNumber} onChange={(e) => setWdWalletNumber(e.target.value)} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="wd-iban">{t("wallet.forms.ibanLabel")}</Label>
                            <Input id="wd-iban" value={wdIban} onChange={(e) => setWdIban(e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="wd-acc">{t("wallet.forms.accountNumberLabel")}</Label>
                            <Input id="wd-acc" value={wdAccountNumber} onChange={(e) => setWdAccountNumber(e.target.value)} />
                          </div>
                        </>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="wd-note">{t("wallet.forms.noteLabel")}</Label>
                        <Input id="wd-note" value={wdNote} onChange={(e) => setWdNote(e.target.value)} />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setWithdrawOpen(false)}>{t("common.cancel")}</Button>
                        <Button onClick={handleWithdraw}>{t("wallet.forms.submitWithdraw")}</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">{t("wallet.currency")}</div>
              <div className="text-xl font-medium">{wallet?.currency || "XOF"}</div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t("wallet.table.title")}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="py-2 pr-4">{t("wallet.table.id")}</th>
                  <th className="py-2 pr-4">{t("wallet.table.type")}</th>
                  <th className="py-2 pr-4">{t("wallet.table.status")}</th>
                  <th className="py-2 pr-4">{t("wallet.table.amount")}</th>
                  <th className="py-2 pr-4">{t("wallet.table.date")}</th>
                  <th className="py-2 pr-4">{t("wallet.table.note")}</th>
                </tr>
              </thead>
              <tbody>
                {txs.map((tx) => (
                  <tr key={tx.id} className="border-t border-border/40">
                    <td className="py-2 pr-4 font-mono text-xs">{tx.id}</td>
                    <td className="py-2 pr-4">
                      <Badge variant={tx.type === "topup" ? "default" : tx.type === "withdraw" ? "secondary" : "outline"}>
                        {t(`wallet.types.${tx.type}`)}
                      </Badge>
                    </td>
                    <td className="py-2 pr-4">
                      <Badge
                        variant={
                          tx.status === "succeeded" ? "default" : tx.status === "pending" ? "secondary" : tx.status === "failed" ? "destructive" : "outline"
                        }
                      >
                        {t(`wallet.status.${tx.status}`)}
                      </Badge>
                    </td>
                    <td className="py-2 pr-4">{formatter.format(tx.amount)}</td>
                    <td className="py-2 pr-4">{new Date(tx.createdAt).toLocaleString()}</td>
                    <td className="py-2 pr-4">{tx.note || ""}</td>
                  </tr>
                ))}
                {!txs.length && (
                  <tr>
                    <td className="py-6 text-muted-foreground" colSpan={6}>
                      {loading ? t("common.loading") : ""}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}


