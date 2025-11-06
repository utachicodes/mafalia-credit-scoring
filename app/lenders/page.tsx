"use client";

import { useMemo, useState } from "react";
import { clients, loanRequests } from "@/lib/mock-data";
import type { Client } from "@/lib/domain-types";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { formatCFA } from "@/lib/currency-utils";

type TypeFilter = Client["type"] | "all";

export default function LenderDashboardPage() {
  const { t } = useLanguage();
  const [type, setType] = useState<TypeFilter>("all");
  const [minAmount, setMinAmount] = useState<number | "">("");
  const [maxAmount, setMaxAmount] = useState<number | "">("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const rows = useMemo(() => {
    return loanRequests
      .map((lr) => ({
        lr,
        client: clients.find((c) => c.id === lr.clientId)!,
      }))
      .filter(({ lr, client }) => {
        if (type !== "all" && client.type !== type) return false;
        if (minAmount !== "" && lr.amount < minAmount) return false;
        if (maxAmount !== "" && lr.amount > maxAmount) return false;
        if (startDate && lr.createdAt < startDate) return false;
        if (endDate && lr.createdAt > endDate) return false;
        return true;
      });
  }, [type, minAmount, maxAmount, startDate, endDate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-0">Rejected</Badge>;
      default:
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-0">Pending</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("nav.lenders")}</h1>
          <p className="text-muted-foreground mt-1">Tableau de bord prêteur et gestion des prêts</p>
        </div>

        <div className="animate-slide-up animate-stagger-1">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
              <CardDescription>Filtrer les demandes de prêt selon différents critères</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={type} onValueChange={(v) => setType(v as TypeFilter)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="fast_food">Restauration rapide</SelectItem>
                      <SelectItem value="hotel">Hôtel</SelectItem>
                      <SelectItem value="glacier">Glacier</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Montant min</Label>
                  <Input type="number" value={minAmount as any} onChange={(e) => setMinAmount(e.target.value === "" ? "" : Number(e.target.value))} placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Montant max</Label>
                  <Input type="number" value={maxAmount as any} onChange={(e) => setMaxAmount(e.target.value === "" ? "" : Number(e.target.value))} placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Date de début</Label>
                  <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Date de fin</Label>
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="animate-slide-up animate-stagger-2">
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-smooth">
            <CardHeader>
              <CardTitle>Demandes de prêt</CardTitle>
              <CardDescription>{rows.length} demandes trouvées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Client</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Montant</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Durée</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Statut</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Rapports</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(({ lr, client }) => (
                      <tr key={lr.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 text-sm font-medium text-foreground">{client.name}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{client.type}</td>
                        <td className="py-3 px-4 text-sm text-foreground">{formatCFA(lr.amount)}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{lr.termMonths} mois</td>
                        <td className="py-3 px-4">{getStatusBadge(lr.status)}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{lr.createdAt}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <a className="text-sm text-primary hover:underline" href={`/api/loan-requests/${lr.id}/report`} target="_blank">JSON</a>
                            <a className="text-sm text-primary hover:underline" href={`/api/loan-requests/${lr.id}/report.csv`} target="_blank">CSV</a>
                            <a className="text-sm text-primary hover:underline" href={`/reports/loan/${lr.id}`} target="_blank">Imprimer</a>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-muted-foreground">Aucun résultat</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
