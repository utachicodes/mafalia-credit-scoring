"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import { Menu, X, Moon, Sun, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavigationProps {
  showContent?: boolean
}

export function Navigation({ showContent = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()

  const languageLabels: Record<typeof language, string> = {
    en: "English",
    fr: "Français",
  }

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/dashboard", label: t("nav.dashboard") },
    { href: "/loans", label: t("nav.loans") },
    { href: "/analytics", label: t("nav.analytics") },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-40">
              <Image 
                src="/mafalia-logo.png" 
                alt="Mafalia" 
                fill
                sizes="(max-width: 768px) 160px, 200px"
                className="object-contain"
                priority
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '';
                  target.parentElement!.innerHTML = '<span class="text-foreground font-bold text-xl">Mafalia</span>';
                }}
              />
            </div>
          </Link>

          {showContent && (
            <div className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 transition-colors"
                  aria-label={t("navigation.toggleLanguage")}
                >
                  <Globe className="h-5 w-5" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  {languageLabels.en} {language === "en" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("fr")}>
                  {languageLabels.fr} {language === "fr" && "✓"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-primary/10 transition-colors"
              aria-label={t("navigation.toggleTheme")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
            </Button>

            {showContent && <Button className="hidden md:inline-flex">{t("hero.cta.primary")}</Button>}

            {showContent && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? t("navigation.closeMenu") : t("navigation.openMenu")}
                aria-expanded={isOpen}
                aria-controls="mafalia-landing-mobile-nav"
              >
                {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && showContent && (
          <div className="border-t border-border py-4 md:hidden">
            <div id="mafalia-landing-mobile-nav" className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="w-full">{t("hero.cta.primary")}</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
