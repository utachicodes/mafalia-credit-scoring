"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()

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

