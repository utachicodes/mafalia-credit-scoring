"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface PremiumCTAProps {
  titleEn: string
  titleFr: string
  descriptionEn: string
  descriptionFr: string
  buttonTextEn: string
  buttonTextFr: string
  href: string
}

export function PremiumCTA({
  titleEn,
  titleFr,
  descriptionEn,
  descriptionFr,
  buttonTextEn,
  buttonTextFr,
  href,
}: PremiumCTAProps) {
  const { language } = useLanguage()

  return (
    <div className="relative overflow-hidden rounded-2xl gradient-dark-red p-12 md:p-16 text-center">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          {language === "fr" ? titleFr : titleEn}
        </h2>

        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
          {language === "fr" ? descriptionFr : descriptionEn}
        </p>

        <div className="pt-4">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Link href={href}>
              {language === "fr" ? buttonTextFr : buttonTextEn}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    </div>
  )
}
