"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import {
  LayoutDashboard,
  CreditCard,
  TrendingUp,
  Smartphone,
  FileText,
  Users,
  Building2,
  Target,
  Shield,
  CheckCircle,
  Receipt,
  Moon,
  Sun,
  Globe,
  Bell,
  Search,
  Menu,
  X,
  UserPlus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMemo, useState } from "react"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const languageLabels: Record<typeof language, string> = {
    en: "English",
    fr: "Français",
  }

  const navItems = useMemo(
    () => [
      { href: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
      { href: "/loans", label: t("nav.loans"), icon: CreditCard },
      { href: "/analytics", label: t("nav.analytics"), icon: TrendingUp },
      { href: "/receivables", label: t("nav.receivables"), icon: Receipt },
      { href: "/mobile-money", label: t("nav.mobileMoney"), icon: Smartphone },
      { href: "/onboarding", label: t("nav.onboarding"), icon: UserPlus },
      { href: "/loans/requests", label: t("nav.loanRequests"), icon: FileText },
      { href: "/transactions", label: t("nav.transactions"), icon: Receipt },
      { href: "/clients", label: t("nav.clients"), icon: Users },
      { href: "/lenders", label: t("nav.lenders"), icon: Building2 },
      { href: "/scoring", label: t("nav.scoring"), icon: Target },
      { href: "/kyc", label: t("nav.kyc"), icon: CheckCircle },
      { href: "/security", label: t("nav.security"), icon: Shield },
    ],
    [t],
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Image
                src="/mafalia-logo.png"
                alt="Mafalia"
                width={120}
                height={48}
                className="h-9 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center max-w-4xl">
              {navItems.slice(0, 6).map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md scale-105"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-105"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              {/* More dropdown for additional items */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={t("nav.more")}
                  >
                    {t("nav.more")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {navItems.slice(6).map((item) => {
                    const Icon = item.icon
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  placeholder={t("navigation.searchPlaceholder")}
                  className="pl-9 w-48 lg:w-64 h-9 bg-muted/50 border-border/50 focus:bg-background transition-all duration-200"
                  aria-label={t("navigation.searchPlaceholder")}
                />
              </div>

              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-muted/50 transition-all duration-200"
                    aria-label={t("navigation.toggleLanguage")}
                  >
                    <Globe className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">
                    {languageLabels.en} {language === "en" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("fr")} className="cursor-pointer">
                    {languageLabels.fr} {language === "fr" && "✓"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Switcher */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9 hover:bg-muted/50 transition-all duration-200"
                aria-label={t("navigation.toggleTheme")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-muted/50 transition-all duration-200 relative"
                aria-label={t("navigation.notifications")}
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                <span className="sr-only">{t("navigation.notifications")}</span>
              </Button>

              {/* User Avatar */}
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md ring-2 ring-background hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
                <span className="text-xs font-semibold text-primary-foreground">JD</span>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? t("navigation.closeMenu") : t("navigation.openMenu")}
                aria-expanded={mobileMenuOpen}
                aria-controls="mafalia-mobile-nav"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
            <nav
              id="mafalia-mobile-nav"
              className="container mx-auto px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">{children}</main>
    </div>
  )
}
