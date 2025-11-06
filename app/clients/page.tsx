"use client"

import { AppLayout } from "@/components/app-layout"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, MapPin, Calendar } from "lucide-react"

interface Client {
  id: string
  name: string
  type: string
  location: string
  joined_at: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadClients() {
      const supabase = createClient()
      const { data } = await supabase.from("clients").select("*").order("joined_at", { ascending: false })
      setClients(data || [])
      setLoading(false)
    }
    loadClients()
  }, [])

  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground mt-1">Manage your business clients and their financial data</p>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((c, index) => {
              const staggerClass = index === 0 ? "animate-stagger-1" : index === 1 ? "animate-stagger-2" : index === 2 ? "animate-stagger-3" : "animate-stagger-4"
              return (
              <Link key={c.id} href={`/clients/${c.id}`} className={`animate-slide-up ${staggerClass}`}>
                <Card className="hover:shadow-lg transition-smooth hover:scale-[1.02] cursor-pointer border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      {c.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {c.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Joined {new Date(c.joined_at).toLocaleDateString()}
                    </div>
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full inline-block">
                      {c.type}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )})}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
