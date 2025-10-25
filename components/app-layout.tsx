"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
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
  PanelLeft,
  PanelRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { UserAvatar } from "@/components/user-avatar"
import { createClient } from "@/lib/supabase/client"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const savedOpen = localStorage.getItem("mafalia_sidebar_open")
    const savedCompact = localStorage.getItem("mafalia_sidebar_compact")
    if (savedOpen !== null) {
      setSidebarOpen(savedOpen === "true")
    } else {
      setSidebarOpen(window.innerWidth >= 1024) // default open on desktop
    }
    if (savedCompact !== null) {
      setCompact(savedCompact === "true")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("mafalia_sidebar_open", String(sidebarOpen))
  }, [sidebarOpen])

  useEffect(() => {
    localStorage.setItem("mafalia_sidebar_compact", String(compact))
  }, [compact])

  // Grouped navigation
  const navSections = [
    {
      title: "Operations",
      items: [
        { href: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
        { href: "/loans", label: t("nav.loans"), icon: CreditCard },
        { href: "/loans/requests", label: "Loan Requests", icon: FileText },
        { href: "/receivables", label: t("nav.receivables"), icon: Receipt },
        { href: "/mobile-money", label: "Mobile Money", icon: Smartphone },
        { href: "/transactions", label: "Transactions", icon: Receipt },
        { href: "/clients", label: "Clients", icon: Users },
        { href: "/lenders", label: "Lenders", icon: Building2 },
      ],
    },
    {
      title: "Analytics",
      items: [
        { href: "/analytics", label: t("nav.analytics"), icon: TrendingUp },
        { href: "/scoring", label: "Scoring", icon: Target },
      ],
    },
    {
      title: "Admin",
      items: [
        { href: "/kyc", label: "KYC", icon: CheckCircle },
        { href: "/security", label: "Sécurité", icon: Shield },
      ],
    },
  ]

  // Keyboard shortcut Cmd/Ctrl+B to toggle sidebar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isToggle = (e.key === "b" || e.key === "B") && (e.metaKey || e.ctrlKey)
      if (isToggle) {
        e.preventDefault()
        setSidebarOpen((s) => !s)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  // Auto-close sidebar on route change in mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [pathname])

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 ${compact ? "w-20" : "w-64"} border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 px-3 flex items-center justify-between border-b border-border/60">
          <Link href="/" className="flex items-center gap-2 w-full">
            <Image src="/mafalia-logo.png" alt="Mafalia" width={compact ? 36 : 110} height={40} className="h-8 w-auto mx-auto" />
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="px-2 py-3 space-y-4 overflow-y-auto" style={{ height: "calc(100vh - 7.5rem)" }}>
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!compact && (
                <div className="px-3 text-[10px] uppercase tracking-wider text-muted-foreground/70">{section.title}</div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center ${compact ? "justify-center" : "gap-3"} px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                    title={compact ? item.label : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    {!compact && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
        <div className="border-t border-border/60 p-2 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCompact((c) => !c)}
            title={compact ? "Expand" : "Compact"}
            aria-label={compact ? "Expand sidebar" : "Compact sidebar"}
          >
            {compact ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>
        </div>
      </aside>

      {/* Overlay when sidebar is open (click to close) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:bg-transparent"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Main */}
      <div className={`${sidebarOpen ? (compact ? "lg:ml-20" : "lg:ml-64") : "lg:ml-0"}`}> 
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="px-4 lg:px-6">
            <div className="flex h-16 items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen((s) => !s)}>
                  {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9 w-48 lg:w-64 h-9" />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLanguage("en")}>English {language === "en" && "✓"}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("fr")}>Français {language === "fr" && "✓"}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>

                <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                </Button>

                {/* Profile menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button aria-label="Open profile menu"><UserAvatar size={36} /></button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={async () => {
                        const supabase = createClient()
                        await supabase.auth.signOut()
                        router.push("/auth/login")
                        router.refresh()
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
