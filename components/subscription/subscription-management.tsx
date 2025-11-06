"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SubscriptionManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Plan</CardTitle>
        <CardDescription>You are currently on the <span className="font-semibold text-primary">Pro</span> plan.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">$99/month</p>
            <p className="text-sm text-muted-foreground">Billed monthly</p>
          </div>
          <Button variant="outline">Change Plan</Button>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm">Visa ending in 1234</p>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Billing History</h3>
          <p className="text-sm text-muted-foreground">No invoices yet.</p>
        </div>
      </CardContent>
    </Card>
  )
}
