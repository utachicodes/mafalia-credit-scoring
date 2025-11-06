"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, Users } from "lucide-react"
import { useEffect, useState } from "react"

export function Analytics() {
  const [data, setData] = useState({
    mrr: 0,
    churnRate: 0,
    cac: 0,
    activeUsers: 0,
  })

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await fetch("/api/analytics")
        if (!res.ok) {
          console.error(`API error: ${res.status} ${res.statusText}`)
          return
        }
        const contentType = res.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text()
          // Check if it's HTML (error page)
          if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
            console.error("API returned HTML error page instead of JSON")
            return
          }
          console.error("Response is not JSON:", contentType)
          return
        }
        const data = await res.json()
        setData(data)
      } catch (error) {
        // Silently handle JSON parsing errors
        if (error instanceof SyntaxError && error.message.includes('JSON')) {
          console.error("Failed to parse JSON response")
        } else {
          console.error("Failed to fetch analytics:", error)
        }
      }
    }
    loadAnalytics()
  }, [])

  const kpiData = [
    {
      title: "Monthly Recurring Revenue",
      value: `$${data.mrr.toLocaleString()}`,
      change: "+12.5%",
      icon: DollarSign,
    },
    {
      title: "Churn Rate",
      value: `${(data.churnRate * 100).toFixed(1)}%`,
      change: "-0.2%",
      icon: TrendingDown,
    },
    {
      title: "Customer Acquisition Cost",
      value: `$${data.cac.toLocaleString()}`,
      change: "+5.0%",
      icon: Users,
    },
    {
      title: "Active Users",
      value: data.activeUsers.toLocaleString(),
      change: "+20%",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">{kpi.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
