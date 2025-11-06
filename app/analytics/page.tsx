import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { ProfitMarginChart } from "@/components/analytics/profit-margin-chart"
import { LoanPerformanceChart } from "@/components/analytics/loan-performance-chart"
import { FinancialMetrics } from "@/components/analytics/financial-metrics"
import { MonthlyComparison } from "@/components/analytics/monthly-comparison"
import { ExportReports } from "@/components/analytics/export-reports"
import { AppLayout } from "@/components/app-layout"

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-fade-in">
          <AnalyticsHeader />
        </div>
        <div className="animate-slide-up animate-stagger-1">
          <FinancialMetrics />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="animate-slide-up animate-stagger-2">
            <RevenueChart />
          </div>
          <div className="animate-slide-up animate-stagger-3">
            <ProfitMarginChart />
          </div>
        </div>
        <div className="animate-slide-up animate-stagger-4">
          <LoanPerformanceChart />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 animate-slide-up animate-stagger-1">
            <MonthlyComparison />
          </div>
          <div className="animate-slide-up animate-stagger-2">
            <ExportReports />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
