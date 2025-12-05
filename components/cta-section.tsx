"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-border bg-background p-10 md:p-14 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Prêt à démarrer avec D-Credit ?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Configurez vos critères de scoring et vos workflows de prêts en quelques minutes.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2" asChild>
                <a href="/dashboard">
                  {t("hero.cta.primary")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">{t("hero.cta.secondary")}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
