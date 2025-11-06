import { AppLayout } from "@/components/app-layout"
import { SubscriptionManagement } from "@/components/subscription/subscription-management"

export default function SubscriptionPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Subscription</h1>
          <p className="text-muted-foreground mt-1">Manage your subscription plan and billing details.</p>
        </div>
        <SubscriptionManagement />
      </div>
    </AppLayout>
  )
}
