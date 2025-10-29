import { CreditScoreCard } from "@/components/dashboard/credit-score-card"
import { QuickStatsGrid } from "@/components/dashboard/quick-stats-grid"
import { RecentLoans } from "@/components/dashboard/recent-loans"
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart"
import { CreditRatingBreakdown } from "@/components/dashboard/credit-rating-breakdown"
import { ConfigurableScoreCard } from "@/components/dashboard/configurable-score-card"
import { AppLayout } from "@/components/app-layout"
import { PremiumCTA } from "@/components/premium-cta"

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

        <PremiumCTA
          titleEn="Ready to apply for your loan?"
          titleFr="Prêt à demander votre prêt?"
          descriptionEn="Get instant credit scoring and receive your loan decision in under 2 minutes with our AI-powered platform."
          descriptionFr="Obtenez une notation de crédit instantanée et recevez votre décision de prêt en moins de 2 minutes avec notre plateforme alimentée par l'IA."
          buttonTextEn="Start Application"
          buttonTextFr="Commencer la demande"
          href="/loans"
        />
      </div>
    </AppLayout>
  )
}
