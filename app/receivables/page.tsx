import { ReceivablesHeader } from "@/components/receivables/receivables-header"
import { ReceivablesOverview } from "@/components/receivables/receivables-overview"
import { ClientReceivablesTable } from "@/components/receivables/client-receivables-table"
import { AgingReport } from "@/components/receivables/aging-report"
import { AddInvoiceForm } from "@/components/receivables/add-invoice-form"
import { AppLayout } from "@/components/app-layout"

export default function ReceivablesPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
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
      </div>
    </AppLayout>
  )
}
