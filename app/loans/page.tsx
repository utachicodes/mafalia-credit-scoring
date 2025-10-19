import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { LoansHeader } from "@/components/loans/loans-header"
import { LoanApplicationForm } from "@/components/loans/loan-application-form"
import { ActiveLoansTable } from "@/components/loans/active-loans-table"
import { LoanCalculator } from "@/components/loans/loan-calculator"

export default function LoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <LoansHeader />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ActiveLoansTable />
            <LoanApplicationForm />
          </div>
          <div>
            <LoanCalculator />
          </div>
        </div>
      </main>
    </div>
  )
}
