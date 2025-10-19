import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ReceivablesHeader } from "@/components/receivables/receivables-header"
import { ReceivablesOverview } from "@/components/receivables/receivables-overview"
import { ClientReceivablesTable } from "@/components/receivables/client-receivables-table"
import { AgingReport } from "@/components/receivables/aging-report"
import { AddInvoiceForm } from "@/components/receivables/add-invoice-form"

export default function ReceivablesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <ReceivablesHeader />
        <ReceivablesOverview />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ClientReceivablesTable />
          </div>
          <div className="space-y-6">
            <AgingReport />
            <AddInvoiceForm />
          </div>
        </div>
      </main>
    </div>
  )
}
