"use client"

import { Card } from "@/components/ui/card"

export function PartnersStrip() {
  const partners = ["Orange Money", "Wave", "Visa", "Mastercard"]

  return (
    <section className="py-10 md:py-14 border-t border-b border-border/50 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {partners.map((p) => (
            <Card
              key={p}
              className="px-4 py-2 text-sm md:text-base bg-background border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              {p}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


