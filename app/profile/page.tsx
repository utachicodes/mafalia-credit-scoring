"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [institution, setInstitution] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setEmail(user.email ?? "")
        setName((user.user_metadata as any)?.name ?? "")
        setInstitution((user.user_metadata as any)?.institution ?? (user.user_metadata as any)?.company ?? "")
      } else {
        setError("Utilisateur non connecté.")
      }
      setLoading(false)
    })
  }, [])

  const onSave = async () => {
    setMessage(null)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ data: { name, institution } })
    if (error) setError(error.message)
    else setMessage("Profil mis à jour.")
  }

  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold">Profil</h1>
        </div>

        <Card className="border-border animate-slide-up">
          <CardHeader>
            <CardTitle>Informations du compte</CardTitle>
            <CardDescription>Gérez votre nom et votre institution.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input value={email} disabled />
            </div>
            <div className="space-y-2">
              <Label>Nom</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Institution / Entreprise</Label>
              <Input value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Nom de l'institution" />
            </div>
            <div className="md:col-span-2">
              <Button onClick={onSave} disabled={loading}>Enregistrer</Button>
              {message && <span className="ml-3 text-sm text-green-600">{message}</span>}
              {error && <span className="ml-3 text-sm text-destructive">{error}</span>}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}


