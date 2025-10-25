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
      <div className="space-y-6">
        <AnalyticsHeader />
        <FinancialMetrics />
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart />
          <ProfitMarginChart />
        </div>
        <LoanPerformanceChart />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MonthlyComparison />
          </div>
          <ExportReports />
        </div>
      </div>
    </AppLayout>
  )
}
