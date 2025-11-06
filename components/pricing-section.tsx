"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Essentiel",
      desc: "Pour démarrer rapidement",
      features: [
        "Scoring de base et tableau de bord",
        "Gestion des demandes de prêts",
        "Exports CSV",
        "Support e-mail",
      ],
    },
    {
      name: "Pro",
      desc: "Pour équipes qui grandissent",
      features: [
        "Scoring avancé (pondérations & critères)",
        "Workflows prêts et validations",
        "API & webhooks",
        "SLA 99.9% & support prioritaire",
      ],
    },
    {
      name: "Entreprise",
      desc: "Sur mesure",
      features: [
        "Intégrations personnalisées (ERP, Mobile Money)",
        "Gouvernance & audit avancés",
        "Environnements dédiés",
        "Accompagnement dédié",
      ],
    },
  ]

  return (
    <section id="pricing" className="py-24 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Tarifs transparents</h2>
          <p className="text-lg text-muted-foreground">Sans engagement. Passez d’un plan à l’autre selon vos besoins.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


