"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const sample = [
  { id: "LN-1001", amount: 500000, status: "approved" },
  { id: "LN-1002", amount: 250000, status: "pending" },
]

export default function LoansExportPage() {
  const exportCSV = () => {
    const header = Object.keys(sample[0]).join(",")
    const rows = sample.map((r) => Object.values(r).join(","))
    const csv = [header, ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "loans.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AppLayout>
      <Card className="border-border max-w-md">
        <CardHeader>
          <CardTitle>Export Loans</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={exportCSV}>Download CSV</Button>
        </CardContent>
      </Card>
    </AppLayout>
  )
}
