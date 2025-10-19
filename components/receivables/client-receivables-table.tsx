"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Eye, Send, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ClientReceivablesTable() {
  const clients = [
    {
      name: "ABC Corporation",
      totalOwed: 15000,
      paid: 10000,
      outstanding: 5000,
      invoices: 3,
      overdue: 1,
      nextDue: "Jan 15, 2026",
      status: "partial",
    },
    {
      name: "XYZ Enterprises",
      totalOwed: 8500,
      paid: 0,
      outstanding: 8500,
      invoices: 2,
      overdue: 2,
      nextDue: "Overdue",
      status: "overdue",
    },
    {
      name: "Tech Solutions Ltd",
      totalOwed: 12000,
      paid: 12000,
      outstanding: 0,
      invoices: 4,
      overdue: 0,
      nextDue: "-",
      status: "paid",
    },
    {
      name: "Global Trading Co",
      totalOwed: 9700,
      paid: 4000,
      outstanding: 5700,
      invoices: 2,
      overdue: 0,
      nextDue: "Jan 20, 2026",
      status: "partial",
    },
    {
      name: "Retail Partners Inc",
      totalOwed: 6200,
      paid: 0,
      outstanding: 6200,
      invoices: 1,
      overdue: 0,
      nextDue: "Jan 25, 2026",
      status: "pending",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "partial":
        return "secondary"
      case "overdue":
        return "destructive"
      case "pending":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Client Receivables</CardTitle>
            <CardDescription>Track outstanding payments by client</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search clients..." className="pl-9" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map((client, index) => {
            const paidPercentage = (client.paid / client.totalOwed) * 100

            return (
              <div key={index} className="rounded-lg border border-border p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-lg">{client.name}</span>
                      <Badge variant={getStatusColor(client.status)}>{client.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {client.invoices} invoice{client.invoices !== 1 ? "s" : ""}
                      {client.overdue > 0 && (
                        <span className="text-red-600 dark:text-red-400 ml-2">• {client.overdue} overdue</span>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="h-4 w-4 mr-2" />
                        Send Reminder
                      </DropdownMenuItem>
                      <DropdownMenuItem>Record Payment</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Payment Progress</span>
                    <span className="font-medium text-foreground">
                      ${client.paid.toLocaleString()} / ${client.totalOwed.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={paidPercentage} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
                  <div>
                    <div className="text-sm text-muted-foreground">Outstanding</div>
                    <div className="text-lg font-semibold text-foreground">${client.outstanding.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Next Due</div>
                    <div
                      className={`text-sm font-medium ${
                        client.nextDue === "Overdue"
                          ? "text-red-600 dark:text-red-400"
                          : client.nextDue === "-"
                            ? "text-muted-foreground"
                            : "text-foreground"
                      }`}
                    >
                      {client.nextDue}
                    </div>
                  </div>
                  <div className="flex items-end justify-end">
                    {client.status === "overdue" && (
                      <Button size="sm" variant="destructive">
                        Send Reminder
                      </Button>
                    )}
                    {client.status === "partial" && (
                      <Button size="sm" variant="outline">
                        Record Payment
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
