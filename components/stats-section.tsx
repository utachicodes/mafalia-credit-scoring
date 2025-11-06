"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Users, TrendingUp, Award, Building2, Clock, CheckCircle, Globe } from "lucide-react"
import Image from "next/image"

export function StatsSection() {
  const stats = [
    {
      icon: DollarSign,
      value: "125Mds",
      suffix: "FCFA",
      label: "Prêts Traités",
      gradient: "from-primary to-primary/60",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Users,
      value: "5,000+",
      suffix: "",
      label: "Entreprises Actives",
      gradient: "from-blue-500 to-blue-400",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: TrendingUp,
      value: "98%",
      suffix: "",
      label: "Taux d'Approbation",
      gradient: "from-green-500 to-green-400",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500",
    },
    {
      icon: Award,
      value: "AAA",
      suffix: "",
      label: "Note Maximale",
      gradient: "from-yellow-500 to-yellow-400",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-500",
    },
    {
      icon: Building2,
      value: "14",
      suffix: "",
      label: "Régions du Sénégal",
      gradient: "from-purple-500 to-purple-400",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      icon: Clock,
      value: "2min",
      suffix: "",
      label: "Temps de Décision",
      gradient: "from-orange-500 to-orange-400",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: CheckCircle,
      value: "99.9%",
      suffix: "",
      label: "Disponibilité",
      gradient: "from-cyan-500 to-cyan-400",
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-500",
    },
    {
      icon: Globe,
      value: "24/7",
      suffix: "",
      label: "Support Client",
      gradient: "from-pink-500 to-pink-400",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-500",
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />

      <div className="absolute bottom-10 left-10 opacity-5">
        <Image src="/mafalia-logo.png" alt="" width={300} height={120} className="w-64" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Mafalia en Chiffres</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La confiance de milliers d'entreprises sénégalaises
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <CardContent className="pt-8 pb-6 relative">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}
                  >
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1 mb-1">
                      <div
                        className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform`}
                      >
                        {stat.value}
                      </div>
                      {stat.suffix && <div className="text-sm font-semibold text-muted-foreground">{stat.suffix}</div>}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
