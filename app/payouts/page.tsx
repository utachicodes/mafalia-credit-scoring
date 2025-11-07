"use client"

import { useEffect, useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { safeFetch } from "@/lib/safe-fetch"
import { formatCFA } from "@/lib/currency-utils"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

type PayoutRow = {
  id: string
  amount: number
  currency: string
  status: string
  destination_kind?: string
  wallet_provider?: string | null
  wallet_number?: string | null
  recipient_name?: string | null
  bank_iban?: string | null
  bank_account_number?: string | null
  bank_code?: string | null
  reference?: string | null
  metadata?: Record<string, unknown> | null
  created_at?: string
}

export default function PayoutsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<PayoutRow[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [kindFilter, setKindFilter] = useState<string>("all")
  const [providerFilter, setProviderFilter] = useState<string>("all")
  const [viewOpen, setViewOpen] = useState(false)
  const [selected, setSelected] = useState<PayoutRow | null>(null)

  const load = async () => {
    setLoading(true)
    const res = await safeFetch<{ items: PayoutRow[] }>("/api/payouts")
    setLoading(false)
    if (!res) return
    setItems(res.items || [])
  }

  useEffect(() => {
    load()
  }, [])

  const mutateStatus = async (id: string, action: "process" | "complete" | "fail") => {
    const resp = await safeFetch<{ id: string; status: string }>(`/api/payouts/${id}/${action}`, { method: "POST" })
    if (!resp) {
      toast({ title: "Erreur", description: "Mise à jour du statut échouée" })
      return
    }
    toast({ title: "Statut mis à jour", description: `${id} → ${resp.status}` })
    await load()
  }

  const filtered = items.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false
    if (kindFilter !== "all" && (p.destination_kind || "wallet") !== kindFilter) return false
    if (providerFilter !== "all") {
      const prov = (p.wallet_provider || "").toLowerCase()
      if (!prov.includes(providerFilter.toLowerCase())) return false
    }
    if (search) {
      const s = search.toLowerCase()
      const hay =
        `${p.id} ${p.reference || ""} ${p.wallet_number || ""} ${p.recipient_name || ""} ${p.bank_iban || ""} ${p.bank_account_number || ""}`.toLowerCase()
      if (!hay.includes(s)) return false
    }
    return true
  })

  const exportCsv = () => {
    const rows = [
      [
        "id",
        "created_at",
        "amount",
        "currency",
        "status",
        "destination_kind",
        "wallet_provider",
        "wallet_number",
        "recipient_name",
        "bank_iban",
        "bank_account_number",
        "bank_code",
        "reference",
        "metadata",
      ],
      ...filtered.map((p) => [
        p.id,
        p.created_at || "",
        p.amount,
        p.currency,
        p.status,
        p.destination_kind || "",
        p.wallet_provider || "",
        p.wallet_number || "",
        p.recipient_name || "",
        p.bank_iban || "",
        p.bank_account_number || "",
        p.bank_code || "",
        p.reference || "",
        p.metadata ? JSON.stringify(p.metadata) : "",
      ]),
    ]
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `payouts_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast({ title: "Exporté", description: `Export de ${filtered.length} lignes` })
  }

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      succeeded: "bg-green-600/15 text-green-700 dark:text-green-400",
      processing: "bg-amber-600/15 text-amber-700 dark:text-amber-400",
      failed: "bg-red-600/15 text-red-700 dark:text-red-400",
    }
    const cls = map[s] || "bg-muted text-foreground"
    return <Badge className={cls}>{s}</Badge>
  }

  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold">Payouts</h1>
          <p className="text-muted-foreground">Historique et gestion des paiements sortants</p>
        </div>

        <Card className="border-border/50 shadow-sm animate-slide-up">
          <CardHeader>
            <CardTitle>Filtres</CardTitle>
            <CardDescription>Affinez la liste et exportez les résultats</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-5">
            <div className="md:col-span-2">
              <Input
                placeholder="Rechercher (id, référence, numéro, IBAN…)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="succeeded">Validé</SelectItem>
                  <SelectItem value="processing">En cours</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={kindFilter} onValueChange={setKindFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="wallet">Wallet</SelectItem>
                  <SelectItem value="bank">Banque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Provider (ex. wave, orange)"
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value)}
              />
              <Button variant="outline" onClick={exportCsv} className="whitespace-nowrap">
                Exporter CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Payouts récents</CardTitle>
              <CardDescription>{filtered.length} éléments</CardDescription>
            </div>
            <Button onClick={load} variant="outline" disabled={loading}>
              {loading ? "Actualisation..." : "Actualiser"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {filtered.length === 0 && <div className="text-sm text-muted-foreground">Aucun payout pour le moment</div>}
            {filtered.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <div className="font-medium">{p.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(p.created_at || Date.now()).toLocaleString()} • {p.destination_kind || "wallet"}
                      {p.wallet_number ? ` • ${p.wallet_number}` : ""}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-semibold">
                      {p.currency?.toUpperCase() === "XOF" ? formatCFA(p.amount || 0) : `${p.amount} ${p.currency || ""}`}
                    </div>
                    <div className="mt-1">{statusBadge(p.status)}</div>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <Button size="sm" variant="outline" onClick={() => { setSelected(p); setViewOpen(true) }}>
                      Voir
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => mutateStatus(p.id, "process")}>
                      En traiter
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => mutateStatus(p.id, "complete")}>
                      Valider
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => mutateStatus(p.id, "fail")}>
                      Échouer
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Détails du payout</DialogTitle>
              <DialogDescription>ID {selected?.id}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[360px] pr-2">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Créé le</span><span>{selected?.created_at ? new Date(selected.created_at).toLocaleString() : "-"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Montant</span><span>{selected?.currency?.toUpperCase() === "XOF" ? formatCFA(selected?.amount || 0) : `${selected?.amount} ${selected?.currency || ""}`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Statut</span><span>{selected ? statusBadge(selected.status) : null}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span>{selected?.destination_kind || "wallet"}</span></div>
                {selected?.wallet_provider ? <div className="flex justify-between"><span className="text-muted-foreground">Provider</span><span>{selected.wallet_provider}</span></div> : null}
                {selected?.wallet_number ? <div className="flex justify-between"><span className="text-muted-foreground">Numéro</span><span>{selected.wallet_number}</span></div> : null}
                {selected?.recipient_name ? <div className="flex justify-between"><span className="text-muted-foreground">Destinataire</span><span>{selected.recipient_name}</span></div> : null}
                {selected?.bank_iban ? <div className="flex justify-between"><span className="text-muted-foreground">IBAN</span><span>{selected.bank_iban}</span></div> : null}
                {selected?.bank_account_number ? <div className="flex justify-between"><span className="text-muted-foreground">Compte</span><span>{selected.bank_account_number}</span></div> : null}
                {selected?.bank_code ? <div className="flex justify-between"><span className="text-muted-foreground">Code banque</span><span>{selected.bank_code}</span></div> : null}
                {selected?.reference ? <div className="flex justify-between"><span className="text-muted-foreground">Référence</span><span>{selected.reference}</span></div> : null}
                <div className="pt-2">
                  <div className="text-muted-foreground">Metadata</div>
                  <pre className="mt-1 rounded bg-muted/50 p-2 text-xs overflow-auto">{selected?.metadata ? JSON.stringify(selected.metadata, null, 2) : "-"}</pre>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}

