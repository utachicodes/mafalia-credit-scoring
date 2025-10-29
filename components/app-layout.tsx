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
import { useState } from "react"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { href: "/loans", label: t("nav.loans"), icon: CreditCard },
    { href: "/analytics", label: t("nav.analytics"), icon: TrendingUp },
    { href: "/receivables", label: t("nav.receivables"), icon: Receipt },
    { href: "/mobile-money", label: "Mobile Money", icon: Smartphone },
    { href: "/onboarding", label: "Inscription", icon: UserPlus },
    { href: "/loans/requests", label: "Demandes", icon: FileText },
    { href: "/transactions", label: "Transactions", icon: Receipt },
    { href: "/clients", label: "Clients", icon: Users },
    { href: "/lenders", label: "Prêteurs", icon: Building2 },
    { href: "/scoring", label: "Notation", icon: Target },
    { href: "/kyc", label: "KYC", icon: CheckCircle },
    { href: "/security", label: "Sécurité", icon: Shield },
  ]

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
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Plus
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
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-9 w-48 lg:w-64 h-9 bg-muted/50 border-border/50 focus:bg-background transition-all duration-200"
                />
              </div>

              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-muted/50 transition-all duration-200">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">
                    English {language === "en" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("fr")} className="cursor-pointer">
                    Français {language === "fr" && "✓"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Switcher */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9 hover:bg-muted/50 transition-all duration-200"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-muted/50 transition-all duration-200 relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
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
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="container mx-auto px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
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
