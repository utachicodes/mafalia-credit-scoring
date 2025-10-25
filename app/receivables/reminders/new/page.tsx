"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Suspense } from "react"

function ReminderInner() {
  const params = useSearchParams()
  const client = params.get("client") || "Client"
  const [message, setMessage] = useState("")
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Reminder sent to ${client}: ${message} (demo)`) // replace with API
  }
  return (
    <Card className="border-border max-w-xl">
      <CardHeader>
        <CardTitle>Send Reminder</CardTitle>
        <CardDescription>Notify {client} about outstanding receivables.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Input id="message" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Your reminder message" />
          </div>
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function NewReminderPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="text-sm text-muted-foreground p-4">Loading...</div>}>
        <ReminderInner />
      </Suspense>
    </AppLayout>
  )
}
