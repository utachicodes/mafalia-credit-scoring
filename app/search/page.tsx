"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

const targets = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Loans", href: "/loans" },
  { label: "Loan Requests", href: "/loans/requests" },
  { label: "Analytics", href: "/analytics" },
  { label: "Receivables", href: "/receivables" },
  { label: "Mobile Money", href: "/mobile-money" },
  { label: "Transactions", href: "/transactions" },
  { label: "Clients", href: "/clients" },
  { label: "Lenders", href: "/lenders" },
  { label: "Scoring", href: "/scoring" },
  { label: "KYC", href: "/kyc" },
  { label: "Security", href: "/security" },
]

function SearchInner() {
  const router = useRouter()
  const params = useSearchParams()
  const q = (params.get("q") || "").toLowerCase()
  const matches = targets.filter((t) => t.label.toLowerCase().includes(q))
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget as HTMLFormElement)
            const query = (data.get("q") as string) || ""
            router.push(`/search?q=${encodeURIComponent(query)}`)
          }}
          className="flex gap-2"
        >
          <Input name="q" defaultValue={q} placeholder="Type to search..." />
        </form>
        <div className="space-y-2">
          {matches.length === 0 && <div className="text-sm text-muted-foreground">No results.</div>}
          {matches.map((m) => (
            <a key={m.href} href={m.href} className="block px-3 py-2 rounded border hover:bg-muted/50">
              {m.label}
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function SearchPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="text-sm text-muted-foreground p-4">Loading...</div>}>
        <SearchInner />
      </Suspense>
    </AppLayout>
  )
}
