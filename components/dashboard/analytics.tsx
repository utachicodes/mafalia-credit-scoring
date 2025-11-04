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
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => setData(data))
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
