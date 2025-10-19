import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CreditScoreCard } from "@/components/dashboard/credit-score-card"
import { QuickStatsGrid } from "@/components/dashboard/quick-stats-grid"
import { RecentLoans } from "@/components/dashboard/recent-loans"
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart"
import { CreditRatingBreakdown } from "@/components/dashboard/credit-rating-breakdown"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <CreditScoreCard />
            <QuickStatsGrid />
            <CashFlowChart />
          </div>
          <div className="space-y-6">
            <CreditRatingBreakdown />
            <RecentLoans />
          </div>
        </div>
      </main>
    </div>
  )
}
