"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export function DashboardHeader() {
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/mafalia-logo.png" alt="Mafalia" width={100} height={40} className="h-8 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-medium text-foreground">
                {t("nav.dashboard")}
              </Link>
              <Link href="/loans" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                {t("nav.loans")}
              </Link>
              <Link href="/loans/requests" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Loan Requests
              </Link>
              <Link href="/analytics" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                {t("nav.analytics")}
              </Link>
              <Link href="/receivables" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                {t("nav.receivables")}
              </Link>
              <Link href="/mobile-money" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Mobile Money
              </Link>
              <Link href="/transactions" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Transactions
              </Link>
              <Link href="/kyc" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                KYC
              </Link>
              <Link href="/security" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Sécurité
              </Link>
              <Link href="/clients" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Clients
              </Link>
              <Link href="/lenders" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Lenders
              </Link>
              <Link href="/scoring" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Scoring
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 w-64" />
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
