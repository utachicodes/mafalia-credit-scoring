"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { ArrowRight, Shield, Zap, Award } from "lucide-react"
import Image from "next/image"
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
    <section className="relative">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-5">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Sécurisé & Conforme</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4" />
                <span>Décision en 2min</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4" />
                <span>Score transparent</span>
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
                {t("hero.cta.primary")}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 text-base" asChild>
                <a href="/analytics">{t("hero.cta.secondary")}</a>
              </Button>
            </div>
          </div>

          <div className="relative w-full h-[320px] md:h-[420px] lg:h-[480px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 rounded-xl">
              <DollarSign3DScene />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
