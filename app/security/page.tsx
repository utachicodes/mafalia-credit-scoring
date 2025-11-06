"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, FileCheck2, Globe } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { useLanguage } from "@/components/language-provider"

export default function SecurityStandardsPage() {
  const { t } = useLanguage()
  const items = [
    {
      icon: Shield,
      title: "BCEAO Compliance & Banking Standards",
      points: [
        "Compliance with BCEAO (UMOA) directives for digital financial services",
        "KYC/AML processes based on best practices (identity, document verification)",
        "Access logging and traceability of sensitive operations",
      ],
    },
    {
      icon: Lock,
      title: "Data Security & Encryption",
      points: [
        "Encryption at rest for sensitive data",
        "Encryption in transit (TLS 1.2+) for all communications",
        "Centralized secret management, key rotation, and least privilege principle",
      ],
    },
    {
      icon: FileCheck2,
      title: "Governance, Risk & Compliance",
      points: [
        "Backup policy and business continuity plan (BCP/DRP)",
        "Role-based access controls (RBAC) and environment separation",
        "Regular security testing (code reviews, scans, pentests)",
      ],
    },
    {
      icon: Globe,
      title: "Client Protection & Operations",
      points: [
        "Anti-fraud monitoring and anomaly detection",
        "Multi-factor authentication (MFA) for sensitive access",
        "Real-time notifications and rate limiting",
      ],
    },
  ]

  return (
    <AppLayout>
      <div className="space-y-6 page-enter">
        <div className="animate-fade-in flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("nav.security")}</h1>
            <p className="text-muted-foreground mt-1">Security Standards (Senegal)</p>
          </div>
        </div>

        <div className="animate-slide-up animate-stagger-1">
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-smooth">
            <CardHeader>
              <CardTitle>Framework & Scope</CardTitle>
              <CardDescription>
                Alignment with BCEAO directives for UMOA and best practices for digital banking in Senegal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This application applies technical and organizational controls covering the confidentiality,
                integrity, and availability of financial data. KYC/AML processes and consumer protection
                are at the heart of the compliance framework.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((s, i) => {
            const Icon = s.icon
            const staggerClass = i === 0 ? "animate-stagger-1" : i === 1 ? "animate-stagger-2" : i === 2 ? "animate-stagger-3" : "animate-stagger-4"
            return (
              <Card key={i} className={`border-border/50 shadow-sm hover:shadow-md transition-smooth hover:scale-[1.02] animate-slide-up ${staggerClass}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{s.title}</CardTitle>
                      <CardDescription>Recommended controls and practices</CardDescription>
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
            )
          })}
        </div>
      </div>
    </AppLayout>
  )
}
