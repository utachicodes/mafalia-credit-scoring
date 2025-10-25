"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function NewProviderPage() {
  const [provider, setProvider] = useState("")
  const [account, setAccount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Connected ${provider} for ${account}. (Demo)`) // In real app, call API
  }

  return (
    <AppLayout>
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Add Provider</CardTitle>
          <CardDescription>Connect a Mobile Money provider to track transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div className="grid gap-2">
              <Label>Provider</Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wave">Wave</SelectItem>
                  <SelectItem value="Orange Money">Orange Money</SelectItem>
                  <SelectItem value="Free Money">Free Money</SelectItem>
                  <SelectItem value="Wari">Wari</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Account/Phone</Label>
              <Input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="+221 77 ..." required />
            </div>
            <Button type="submit" className="mt-2">Connect</Button>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  )
}
