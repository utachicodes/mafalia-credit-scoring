import { LoansHeader } from "@/components/loans/loans-header"
import { LoanApplicationForm } from "@/components/loans/loan-application-form"
import { ActiveLoansTable } from "@/components/loans/active-loans-table"
import { LoanCalculator } from "@/components/loans/loan-calculator"
import { AppLayout } from "@/components/app-layout"
import { LoanStatusTracker } from "@/components/loans/loan-status-tracker"

export default function LoansPage() {
  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-fade-in">
          <LoansHeader />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-slide-up animate-stagger-1">
              <ActiveLoansTable />
            </div>
            <div className="animate-slide-up animate-stagger-2">
              <LoanApplicationForm />
            </div>
          </div>
          <div className="space-y-6">
            <div className="animate-slide-up animate-stagger-1">
              <LoanCalculator />
            </div>
            <div className="animate-slide-up animate-stagger-2">
              <LoanStatusTracker />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
