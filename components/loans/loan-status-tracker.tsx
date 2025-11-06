"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle, XCircle } from "lucide-react"

export function LoanStatusTracker() {
  const steps = [
    { name: "Application Submitted", status: "completed" },
    { name: "Documents Under Review", status: "completed" },
    { name: "Loan Approved", status: "current" },
    { name: "Funds Disbursed", status: "upcoming" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-shrink-0">
                {step.status === "completed" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : step.status === "current" ? (
                  <Circle className="h-5 w-5 text-blue-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">{step.name}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
