"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, FileCheck2, Globe } from "lucide-react"

export default function SecurityStandardsPage() {
  const items = [
    {
      icon: Shield,
      title: "Conformité BCEAO & Normes Bancaires",
      points: [
        "Respect des directives de la BCEAO (UMOA) pour les services financiers digitaux",
        "Processus KYC/AML basés sur les meilleures pratiques (identité, vérification documentaire)",
        "Journalisation des accès et traçabilité des opérations sensibles",
      ],
    },
    {
      icon: Lock,
      title: "Sécurité des Données & Chiffrement",
      points: [
        "Chiffrement au repos (at-rest) des données sensibles",
        "Chiffrement en transit (TLS 1.2+) pour toutes les communications",
        "Gestion de secrets centralisée, rotation des clés et principe du moindre privilège",
      ],
    },
    {
      icon: FileCheck2,
      title: "Gouvernance, Risques & Conformité",
      points: [
        "Politique de sauvegarde et plan de reprise d'activité (PRA/PCA)",
        "Contrôles d'accès basés sur les rôles (RBAC) et séparation des environnements",
        "Tests de sécurité réguliers (revues de code, scans, pentests)",
      ],
    },
    {
      icon: Globe,
      title: "Protection des Clients & Opérations",
      points: [
        "Surveillance antifraude et détection d'anomalies",
        "Authentification multifacteur (MFA) pour les accès sensibles",
        "Notifications en temps réel et limitations de taux (rate limiting)",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Shield className="h-5 w-5" />
        <h1 className="text-2xl font-bold">Normes de sécurité (Sénégal)</h1>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Référentiel & Portée</CardTitle>
          <CardDescription>
            Alignement sur les directives BCEAO pour l'UMOA et les bonnes pratiques de la banque numérique au Sénégal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cette application applique des contrôles techniques et organisationnels couvrant la confidentialité,
            l'intégrité et la disponibilité des données financières. Les processus KYC/AML et la protection des
            consommateurs sont au cœur du dispositif de conformité.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((s, i) => (
          <Card key={i} className="border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{s.title}</CardTitle>
                  <CardDescription>Contrôles et pratiques recommandées</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-foreground">
                {s.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
