"use client";

import { useMemo, useState } from "react";
import { loanRequests as initialLoanRequests, clients } from "@/lib/mock-data";
import type { LoanRequest, LoanRequestStatus } from "@/lib/domain-types";
import { buildScoreInputForClient, estimateRepaymentCapacity } from "@/lib/scoring-mapper";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/language-provider";
import { formatCFA } from "@/lib/currency-utils";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const STATUSES: LoanRequestStatus[] = ["pending", "approved", "rejected"];

export default function LoanRequestsPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState<LoanRequestStatus>("pending");
  const [data, setData] = useState<LoanRequest[]>(() => [...initialLoanRequests]);

  const list = useMemo(() => data.filter((lr) => lr.status === active), [data, active]);

  const counts = useMemo(() => {
    return {
      pending: data.filter((x) => x.status === "pending").length,
      approved: data.filter((x) => x.status === "approved").length,
      rejected: data.filter((x) => x.status === "rejected").length,
    };
  }, [data]);

  const approve = (id: string) => {
    setData((prev) => prev.map((x) => (x.id === id ? { ...x, status: "approved" } : x)));
  };
  const reject = (id: string) => {
    setData((prev) => prev.map((x) => (x.id === id ? { ...x, status: "rejected" } : x)));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0"><CheckCircle2 className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-0"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-0"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("nav.loanRequests")}</h1>
          <p className="text-muted-foreground mt-1">Manage and review loan applications</p>
        </div>

        <div className="animate-slide-up animate-stagger-1">
          <Tabs value={active} onValueChange={(v) => setActive(v as LoanRequestStatus)}>
            <TabsList>
              <TabsTrigger value="pending">
                Pending ({counts.pending})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({counts.approved})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({counts.rejected})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="animate-slide-up animate-stagger-2">
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-smooth">
            <CardHeader>
              <CardTitle>Loan Requests</CardTitle>
              <CardDescription>Review and manage loan applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Client</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Score</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Term</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Capacity</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((lr) => {
                      const client = clients.find((c) => c.id === lr.clientId);
                      const score = buildScoreInputForClient(lr.clientId).score01;
                      const cap = estimateRepaymentCapacity(lr.clientId, lr.amount, lr.termMonths);
                      return (
                        <tr key={lr.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4 text-sm font-medium text-foreground">{client?.name ?? lr.clientId}</td>
                          <td className="py-3 px-4 text-sm text-foreground">{Math.round(score * 100)} / 100</td>
                          <td className="py-3 px-4 text-sm text-foreground">{formatCFA(lr.amount)}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{lr.termMonths} months</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            <div className="flex flex-col gap-0.5">
                              <span>Inst.: {formatCFA(cap.installment)}</span>
                              <span>Ratio: {cap.ratio.toFixed(2)}x {cap.ok ? "✅" : "⚠️"}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{lr.createdAt}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {getStatusBadge(lr.status)}
                              {lr.status === "pending" && (
                                <>
                                  <Button size="sm" variant="outline" onClick={() => approve(lr.id)}>Approve</Button>
                                  <Button size="sm" variant="outline" onClick={() => reject(lr.id)}>Reject</Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {list.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-muted-foreground">No {active} requests found</td>
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
