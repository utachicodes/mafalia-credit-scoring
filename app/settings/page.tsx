"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [defaultInterest, setDefaultInterest] = useState<string>("")
  const { toast } = useToast()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      const rate = user?.user_metadata?.defaultInterestRate
      if (rate) setDefaultInterest(String(rate))
    })
  }, [])

  const handleSaveLending = async () => {
    const supabase = createClient()
    const parsed = Number.parseFloat(defaultInterest || "0")
    const { error } = await supabase.auth.updateUser({
      data: { defaultInterestRate: isFinite(parsed) ? parsed : 0 },
    })
    if (error) {
      toast({ title: "Erreur", description: error.message })
    } else {
      toast({ title: "Enregistré", description: "Préférences de prêt mises à jour" })
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 page-enter max-w-3xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Paramètres</h1>
          <p className="text-muted-foreground mt-1">Personnalisez votre expérience Mafalia</p>
        </div>

        <Card className="border-border/50 shadow-sm animate-slide-up">
          <CardHeader>
            <CardTitle>Apparence</CardTitle>
            <CardDescription>Thème de l’interface</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button variant={theme === "light" ? "default" : "outline"} onClick={() => setTheme("light")}>
              Clair
            </Button>
            <Button variant={theme === "dark" ? "default" : "outline"} onClick={() => setTheme("dark")}>
              Sombre
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm animate-slide-up">
          <CardHeader>
            <CardTitle>Langue</CardTitle>
            <CardDescription>Langue d’affichage de l’interface</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button variant={language === "fr" ? "default" : "outline"} onClick={() => setLanguage("fr")}>
              Français
            </Button>
            <Button variant={language === "en" ? "default" : "outline"} onClick={() => setLanguage("en")}>
              English
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm animate-slide-up">
          <CardHeader>
            <CardTitle>Prêts</CardTitle>
            <CardDescription>Préférences de prêt pour votre institution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="default-interest">Taux d’intérêt par défaut (%)</Label>
              <Input
                id="default-interest"
                type="number"
                step="0.01"
                placeholder="ex: 12.5"
                value={defaultInterest}
                onChange={(e) => setDefaultInterest(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Modifiable lors de chaque demande de prêt.</p>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">Part plateforme sur intérêts</div>
              <div className="text-sm text-muted-foreground">2 points d’intérêt (inclus dans le taux total payé par l’emprunteur)</div>
            </div>
            <div className="pt-2">
              <Button onClick={handleSaveLending}>Enregistrer</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm animate-slide-up">
          <CardHeader>
            <CardTitle>Compte</CardTitle>
            <CardDescription>Gestion de la sécurité</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button asChild>
              <a href="/auth/reset-password">Réinitialiser le mot de passe</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

