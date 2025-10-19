"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

export function ExportReports() {
  const reports = [
    { name: "Financial Summary", description: "Complete financial overview", format: "PDF" },
    { name: "Loan Portfolio", description: "Detailed loan analysis", format: "Excel" },
    { name: "Cash Flow Statement", description: "Monthly cash flow report", format: "PDF" },
    { name: "Tax Report", description: "Annual tax documentation", format: "PDF" },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Export Reports</CardTitle>
        <CardDescription>Download financial reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.map((report, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground text-sm">{report.name}</div>
                <div className="text-xs text-muted-foreground">{report.description}</div>
              </div>
            </div>
            <Button size="sm" variant="ghost">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
