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
  LogOut,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMemo, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface DashboardSidebarProps {
  children: React.ReactNode
}

export function DashboardSidebar({ children }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userName, setUserName] = useState("John Doe")
  const [userEmail, setUserEmail] = useState("john@example.com")
  const [userInitials, setUserInitials] = useState("JD")
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const name = user.user_metadata?.name || user.email?.split("@")[0] || "User"
        const email = user.email || "user@example.com"
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
        setUserName(name)
        setUserEmail(email)
        setUserInitials(initials)
      }
    })
  }, [])

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

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border/40 bg-muted/30">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border/40">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <Image
              src="/mafalia-logo.png"
              alt="Mafalia"
              width={120}
              height={48}
              className="h-9 w-auto transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Primary Action Button */}
        <div className="p-4 border-b border-border/40">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/loans/requests">
              <CreditCard className="h-4 w-4 mr-2" />
              {t("loans.header.newApplication")}
            </Link>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("nav.navigation")}</span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth
                  ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-[1.02]"
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-border/40 p-4 space-y-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder={t("navigation.searchPlaceholder")}
              className="pl-9 h-9 bg-muted/50 border-border/50 focus:bg-background transition-all duration-200"
              aria-label={t("navigation.searchPlaceholder")}
            />
          </div>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start h-9 hover:bg-muted/50 transition-all duration-200"
                aria-label={t("navigation.toggleLanguage")}
              >
                <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
                <span className="flex-1 text-left">{languageLabels[language]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
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
            className="w-full justify-start h-9 hover:bg-muted/50 transition-all duration-200 relative"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t("navigation.toggleTheme")}
          >
            <Sun className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
            <Moon className="absolute h-4 w-4 mr-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
            <span className="flex-1 text-left">{t("navigation.toggleTheme")}</span>
          </Button>

          {/* Sign Out */}
          <Button
            variant="ghost"
            className="w-full justify-start h-9 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
            <span className="flex-1 text-left">{t("auth.signOut")}</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Image
                src="/mafalia-logo.png"
                alt="Mafalia"
                width={120}
                height={48}
                className="h-9 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-muted/50 transition-all duration-200 relative"
                aria-label={t("navigation.notifications")}
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? t("navigation.closeMenu") : t("navigation.openMenu")}
                aria-expanded={mobileMenuOpen}
                aria-controls="dashboard-mobile-nav"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
              <nav
                id="dashboard-mobile-nav"
                className="container mx-auto px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto"
              >
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 pt-16 lg:pt-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 h-16 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 lg:block hidden">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              {/* Search */}
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  placeholder={t("navigation.searchPlaceholder")}
                  className="pl-9 w-full h-9 bg-muted/50 border-border/50 focus:bg-background transition-all duration-200"
                  aria-label={t("navigation.searchPlaceholder")}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-muted/50 transition-all duration-200 relative"
                aria-label={t("navigation.notifications")}
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              </Button>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md ring-2 ring-background hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
                  <span className="text-xs font-semibold text-primary-foreground">{userInitials}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{userName}</span>
                  <span className="text-xs text-muted-foreground">{userEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

