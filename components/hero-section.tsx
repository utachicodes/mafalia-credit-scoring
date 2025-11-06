"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { ArrowRight, Shield, Zap, Brain } from "lucide-react"
import dynamic from "next/dynamic"

const DollarSign3DScene = dynamic(
  () => import("@/components/dollar-sign-3d").then((mod) => mod.DollarSign3DScene),
  { ssr: false }
)

interface HeroSectionProps {
  showContent: boolean
  onGetStarted: () => void
}

export function HeroSection({ showContent, onGetStarted }: HeroSectionProps) {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden">
      {/* Softer, subtler background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-5">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Crédit d'entreprise, simple et fiable
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Notation de crédit intelligente, gestion des prêts et intégrations Mobile Money (Orange Money, Wave).
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>Sécurisé & Conforme</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                <span>Paiements rapides</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="h-4 w-4 text-primary" />
                <span>Notation de crédit IA</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 h-12 px-6 text-base"
                onClick={() => {
                  onGetStarted()
                  window.location.href = "/dashboard"
                }}
              >
                Créer un compte
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 text-base" asChild>
                <a href="#pricing">Tarifs transparents</a>
              </Button>
            </div>
          </div>

          {/* Keep the dollar sign minimal and only on large screens */}
          <div className="relative w-full h-[420px] lg:h-[520px] xl:h-[620px] hidden lg:flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl" />
            <DollarSign3DScene />
          </div>
        </div>
      </div>
    </section>
  )
}
