import { LoansHeader } from "@/components/loans/loans-header"
import { LoanApplicationForm } from "@/components/loans/loan-application-form"
import { ActiveLoansTable } from "@/components/loans/active-loans-table"
import { LoanCalculator } from "@/components/loans/loan-calculator"
import { AppLayout } from "@/components/app-layout"
import { LoanStatusTracker } from "@/components/loans/loan-status-tracker"

export default function LoansPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <LoansHeader />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ActiveLoansTable />
            <LoanApplicationForm />
          </div>
          <div className="space-y-6">
            <LoanCalculator />
            <LoanStatusTracker />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
