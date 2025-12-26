"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    product: [
      { label: t("nav.dashboard"), href: "/dashboard" },
      { label: t("nav.loans"), href: "/loans" },
      { label: t("nav.analytics"), href: "/analytics" },
      { label: t("nav.receivables"), href: "/receivables" },
    ],
    company: [
      { label: "Onboarding", href: "/onboarding" },
      { label: "Lenders", href: "/lenders" },
      { label: "Clients", href: "/clients" },
      { label: "Contact", href: "#contact" },
    ],
    legal: [
      { label: "Security", href: "/security" },
      { label: "KYC", href: "/kyc" },
    ],
  }

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/mafalia-logo.png" alt="Mafalia" className="h-8 w-auto" />
              <span className="text-foreground font-bold text-xl">Mafalia</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered credit scoring and loan management platform for modern businesses.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mafalia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
