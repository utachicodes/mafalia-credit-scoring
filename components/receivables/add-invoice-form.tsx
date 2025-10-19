"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export function AddInvoiceForm() {
  const [formData, setFormData] = useState({
    client: "",
    amount: "",
    dueDate: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New invoice:", formData)
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Quick Invoice</CardTitle>
        <CardDescription>Create a new invoice</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select value={formData.client} onValueChange={(value) => setFormData({ ...formData, client: value })}>
              <SelectTrigger id="client">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abc">ABC Corporation</SelectItem>
                <SelectItem value="xyz">XYZ Enterprises</SelectItem>
                <SelectItem value="tech">Tech Solutions Ltd</SelectItem>
                <SelectItem value="global">Global Trading Co</SelectItem>
                <SelectItem value="retail">Retail Partners Inc</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="5000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Services rendered..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
