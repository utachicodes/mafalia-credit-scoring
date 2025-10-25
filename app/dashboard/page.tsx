import { CreditScoreCard } from "@/components/dashboard/credit-score-card"
import { QuickStatsGrid } from "@/components/dashboard/quick-stats-grid"
import { RecentLoans } from "@/components/dashboard/recent-loans"
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart"
import { CreditRatingBreakdown } from "@/components/dashboard/credit-rating-breakdown"
import { ConfigurableScoreCard } from "@/components/dashboard/configurable-score-card"
import { AppLayout } from "@/components/app-layout"

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your financial overview.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <CreditScoreCard />
            <ConfigurableScoreCard />
            <QuickStatsGrid />
            <CashFlowChart />
          </div>
          <div className="space-y-6">
            <CreditRatingBreakdown />
            <RecentLoans />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
