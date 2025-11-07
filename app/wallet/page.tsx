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
import { ArrowUpRight, ArrowDownLeft, PlusCircle, Download, Copy } from "lucide-react"

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
  const [transferOpen, setTransferOpen] = useState(false)

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
  // Transfer form
  const [trAmount, setTrAmount] = useState(0)
  const [trRecipientEmail, setTrRecipientEmail] = useState("")
  const [trNote, setTrNote] = useState("")

  // Filters
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [search, setSearch] = useState("")

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

  async function handleTransfer() {
    const key = crypto.randomUUID()
    const res = await safeFetchJson<{ wallet: Wallet }>("/api/wallet/transfer", {
      method: "POST",
      headers: { "content-type": "application/json", "x-idempotency-key": key },
      body: JSON.stringify({ amount: Number(trAmount), currency: wallet?.currency || "XOF", recipientEmail: trRecipientEmail, note: trNote || undefined }),
    })
    if (res.error) {
      toast({ title: t("common.error"), description: res.error })
      return
    }
    if (res.data?.wallet) setWallet(res.data.wallet)
    await refresh()
    setTransferOpen(false)
    setTrAmount(0)
    setTrRecipientEmail("")
    setTrNote("")
    toast({ title: t("common.success"), description: t("wallet.toasts.transferSuccess") })
  }

  const filteredTxs = useMemo(() => {
    return txs.filter((tx) => {
      const typeOk = filterType === "all" || tx.type === filterType
      const statusOk = filterStatus === "all" || tx.status === filterStatus
      const s = search.trim().toLowerCase()
      const text = `${tx.id} ${tx.note || ""}`.toLowerCase()
      const searchOk = !s || text.includes(s)
      return typeOk && statusOk && searchOk
    })
  }, [txs, filterType, filterStatus, search])

  function exportCsv() {
    const headers = ["id", "type", "status", "amount", "currency", "date", "note"]
    const rows = filteredTxs.map((tx) => [tx.id, tx.type, tx.status, tx.amount, tx.currency, new Date(tx.createdAt).toISOString(), (tx.note || "").replace(/\n|\r/g, " ")])
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `wallet-transactions-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function copyId() {
    if (!wallet?.id) return
    await navigator.clipboard.writeText(wallet.id)
    toast({ title: t("wallet.copied") })
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">{t("wallet.title")}</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportCsv}>
              <Download className="h-4 w-4 mr-2" /> {t("wallet.exportCsv")}
            </Button>
          </div>
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
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <PlusCircle className="h-4 w-4 mr-2" /> {t("wallet.actions.topUp")}
                    </Button>
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
                        <div className="flex gap-2 pt-1">
                          {[10000, 25000, 50000, 100000].map((v) => (
                            <Button key={v} size="sm" variant="secondary" onClick={() => setTopUpAmount(v)}>
                              {v.toLocaleString()}
                            </Button>
                          ))}
                        </div>
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
                    <Button variant="secondary">
                      <ArrowUpRight className="h-4 w-4 mr-2" /> {t("wallet.actions.withdraw")}
                    </Button>
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

                <Dialog open={transferOpen} onOpenChange={setTransferOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <ArrowDownLeft className="h-4 w-4 mr-2" /> {t("wallet.actions.transfer")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("wallet.actions.transfer")}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="tr-amount">{t("wallet.forms.amountLabel")}</Label>
                        <Input
                          id="tr-amount"
                          type="number"
                          value={trAmount}
                          onChange={(e) => setTrAmount(Number(e.target.value))}
                          placeholder={t("wallet.forms.amountPlaceholder")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tr-email">{t("wallet.forms.recipientEmailLabel")}</Label>
                        <Input id="tr-email" type="email" value={trRecipientEmail} onChange={(e) => setTrRecipientEmail(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tr-note">{t("wallet.forms.noteLabel")}</Label>
                        <Input id="tr-note" value={trNote} onChange={(e) => setTrNote(e.target.value)} />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setTransferOpen(false)}>{t("common.cancel")}</Button>
                        <Button onClick={handleTransfer}>{t("wallet.forms.submitTransfer")}</Button>
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
            <div className="mt-4 space-y-1">
              <div className="text-sm text-muted-foreground">ID</div>
              <div className="flex items-center gap-2">
                <code className="text-xs break-all">{wallet?.id}</code>
                <Button size="icon" variant="ghost" onClick={copyId} aria-label={t("wallet.copyId")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold">{t("wallet.table.title")}</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-48">
                <Label className="text-xs text-muted-foreground">{t("wallet.filters.type")}</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("wallet.filters.allTypes")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("wallet.filters.allTypes")}</SelectItem>
                    <SelectItem value="topup">{t("wallet.types.topup")}</SelectItem>
                    <SelectItem value="transfer_in">{t("wallet.types.transfer_in")}</SelectItem>
                    <SelectItem value="transfer_out">{t("wallet.types.transfer_out")}</SelectItem>
                    <SelectItem value="withdraw">{t("wallet.types.withdraw")}</SelectItem>
                    <SelectItem value="refund">{t("wallet.types.refund")}</SelectItem>
                    <SelectItem value="adjustment">{t("wallet.types.adjustment")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <Label className="text-xs text-muted-foreground">{t("wallet.filters.status")}</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("wallet.filters.allStatuses")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("wallet.filters.allStatuses")}</SelectItem>
                    <SelectItem value="pending">{t("wallet.status.pending")}</SelectItem>
                    <SelectItem value="succeeded">{t("wallet.status.succeeded")}</SelectItem>
                    <SelectItem value="failed">{t("wallet.status.failed")}</SelectItem>
                    <SelectItem value="cancelled">{t("wallet.status.cancelled")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-64">
                <Label className="text-xs text-muted-foreground">{t("wallet.filters.searchPlaceholder")}</Label>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("wallet.filters.searchPlaceholder")} />
              </div>
            </div>
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
                {filteredTxs.map((tx) => (
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
                {!filteredTxs.length && (
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


