"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LoginHistoryPage() {
  const entries = [
    { id: "1", date: new Date().toISOString(), ip: "192.168.1.1", location: "Dakar, Sénégal", device: "Chrome sur Windows" },
    { id: "2", date: new Date(Date.now() - 86400000).toISOString(), ip: "192.168.1.2", location: "Dakar, Sénégal", device: "Safari sur iOS" },
    { id: "3", date: new Date(Date.now() - 172800000).toISOString(), ip: "192.168.1.3", location: "Thiès, Sénégal", device: "Chrome sur Android" },
  ]

  return (
    <AppLayout>
      <div className="space-y-6 page-enter max-w-3xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Historique de connexion</h1>
          <p className="text-muted-foreground mt-1">Dernières connexions à votre compte</p>
        </div>

        <Card className="border-border/50 shadow-sm animate-slide-up">
          <CardHeader>
            <CardTitle>Connexions récentes</CardTitle>
            <CardDescription>{entries.length} événements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {entries.map((e) => (
              <div key={e.id} className="flex items-start justify-between rounded-lg border border-border/50 p-3">
                <div>
                  <div className="text-sm font-medium">{new Date(e.date).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{e.device}</div>
                </div>
                <div className="text-xs text-muted-foreground">{e.location} • {e.ip}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

