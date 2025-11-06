"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const supabase = createClient()
    const redirectTo =
      typeof window !== "undefined" ? `${window.location.origin}/auth/update-password` : undefined
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Réinitialiser le mot de passe</CardTitle>
            <CardDescription>Recevez un lien de réinitialisation par e-mail.</CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="text-sm text-muted-foreground">
                Un e-mail a été envoyé à {email}. Veuillez suivre les instructions pour définir un nouveau mot de passe.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {error && <div className="text-sm text-destructive">{error}</div>}
                <Button type="submit" className="w-full">Envoyer le lien</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


