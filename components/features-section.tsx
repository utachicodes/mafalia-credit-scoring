"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Wallet, BarChart3, Smartphone, Brain, Shield, Zap, Globe } from "lucide-react"
import Image from "next/image"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Brain,
      title: "Notation de crédit",
      description: "Évaluez le risque de manière fiable et transparente.",
      gradient: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
    },
    {
      icon: Wallet,
      title: t("features.loans.title"),
      description: t("features.loans.desc"),
      gradient: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-500",
    },
    {
      icon: BarChart3,
      title: t("features.analytics.title"),
      description: t("features.analytics.desc"),
      gradient: "from-green-500/20 to-green-500/5",
      iconColor: "text-green-500",
    },
    {
      icon: Smartphone,
      title: t("features.mobile.title"),
      description: t("features.mobile.desc"),
      gradient: "from-purple-500/20 to-purple-500/5",
      iconColor: "text-purple-500",
    },
    {
      icon: Shield,
      title: "Sécurité Bancaire",
      description: "Protection maximale de vos données avec cryptage de niveau bancaire et conformité BCEAO",
      gradient: "from-orange-500/20 to-orange-500/5",
      iconColor: "text-orange-500",
    },
    {
      icon: Zap,
      title: "Décision Instantanée",
      description: "Obtenez votre score de crédit et montant approuvé en moins de 2 minutes grâce à l'IA",
      gradient: "from-yellow-500/20 to-yellow-500/5",
      iconColor: "text-yellow-500",
    },
    {
      icon: Globe,
      title: "Multi-Devises",
      description: "Support FCFA, Euro, Dollar avec conversion automatique et taux en temps réel",
      gradient: "from-cyan-500/20 to-cyan-500/5",
      iconColor: "text-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Analyses avancées",
      description: "Anticipez vos flux de trésorerie et optimisez votre gestion financière.",
      gradient: "from-pink-500/20 to-pink-500/5",
      iconColor: "text-pink-500",
    },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-10 right-10 opacity-5">
        <Image src="/mafalia-logo.png" alt="" width={300} height={120} className="w-64" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-20 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Zap className="h-4 w-4" />
            Crédit & Financement
          </div>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("features.title")}
          </h2>
          <p className="text-pretty text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Des outils simples et fiables pour évaluer le risque, gérer les prêts et piloter votre activité — avec Orange
            Money, Wave et autres intégrations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border transition-colors duration-200 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="relative">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-muted ${feature.iconColor} mb-4`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
