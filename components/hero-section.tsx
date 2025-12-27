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
      {/* Subtle layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background pointer-events-none" />
      {/* Faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(120,119,198,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,119,198,0.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />
      {/* Blurred floating blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float-slow" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float-slower" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-primary/10 blur-2xl animate-float-slow" aria-hidden="true" />
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
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
                <span>Notation de crédit fiable</span>
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

          {/* Dollar sign 3D visual */}
          <div className="relative w-full h-[500px] lg:h-[600px] xl:h-[700px] flex items-center justify-center animate-in fade-in duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <DollarSign3DScene />
          </div>
        </div>
      </div>
    </section>
  )
}
