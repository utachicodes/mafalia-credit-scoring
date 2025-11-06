import { QuickStatsGrid } from "@/components/dashboard/quick-stats-grid"
import { RecentLoansTable } from "@/components/dashboard/recent-loans-table"
import { AppLayout } from "@/components/app-layout"

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-slide-up animate-stagger-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s your financial overview.</p>
        </div>

        <div className="animate-slide-up animate-stagger-2">
          <QuickStatsGrid />
        </div>

        <div className="animate-slide-up animate-stagger-3">
          <RecentLoansTable />
        </div>
      </div>
    </AppLayout>
  )
}
