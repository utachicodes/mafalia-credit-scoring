"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-12 md:p-20">
          <div className="relative z-10 mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
              Ready to Transform Your Business?
            </h2>
            <p className="text-pretty text-lg text-primary-foreground/90 md:text-xl">
              Join thousands of businesses already using Mafalia to manage their finances smarter
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="gap-2">
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                {t("hero.cta.secondary")}
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -z-0 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -z-0 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
