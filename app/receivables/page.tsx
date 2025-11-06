import { ReceivablesHeader } from "@/components/receivables/receivables-header"
import { ReceivablesOverview } from "@/components/receivables/receivables-overview"
import { ClientReceivablesTable } from "@/components/receivables/client-receivables-table"
import { AgingReport } from "@/components/receivables/aging-report"
import { AddInvoiceForm } from "@/components/receivables/add-invoice-form"
import { AppLayout } from "@/components/app-layout"

export default function ReceivablesPage() {
  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-fade-in">
          <ReceivablesHeader />
        </div>
        <div className="animate-slide-up animate-stagger-1">
          <ReceivablesOverview />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-slide-up animate-stagger-2">
              <ClientReceivablesTable />
            </div>
          </div>
          <div className="space-y-6">
            <div className="animate-slide-up animate-stagger-2">
              <AgingReport />
            </div>
            <div className="animate-slide-up animate-stagger-3">
              <AddInvoiceForm />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
