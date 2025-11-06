"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Building2, Phone } from "lucide-react"

export default function LoginPage() {
  const { t } = useLanguage()
  const [institution, setInstitution] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      if (password !== confirmPassword) {
        throw new Error(t("auth.common.passwordMismatch"))
      }
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/dashboard")
      router.refresh()
    } catch (error: unknown) {
      const fallbackMessage = t("auth.common.genericError")
      setError(error instanceof Error ? error.message || fallbackMessage : fallbackMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-svh grid grid-cols-1 md:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden md:flex items-center justify-center p-10 bg-gradient-to-b from-primary/20 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-md text-center space-y-6">
          <Image src="/logo.svg" alt="Mafalia" width={160} height={54} className="mx-auto" />
          <h2 className="text-2xl md:text-3xl font-semibold">{t("auth.login.brandTitle")}</h2>
          <p className="text-muted-foreground">{t("auth.login.brandDescription")}</p>
          <Image src="/mafalia-logo.png" alt="Mafalia" width={160} height={54} className="mx-auto" />
          <h2 className="text-2xl md:text-3xl font-semibold">Votre finance, plus simple.</h2>
          <p className="text-muted-foreground">Accédez à votre tableau de bord, suivez vos flux, et obtenez un scoring précis.</p>
        </div>
      </div>

      {/* Auth card */}
      <div className="flex items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-md">
          <Card className="border-border/60 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">{t("auth.login.title")}</CardTitle>
              <CardDescription>{t("auth.login.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="grid gap-2">
                  <Label htmlFor="institution">{t("auth.login.institutionLabel")}</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="institution"
                      type="text"
                      placeholder={t("auth.login.institutionPlaceholder") ?? undefined}
                      required
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("auth.login.emailLabel")}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("auth.login.emailPlaceholder") ?? undefined}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t("auth.login.passwordLabel")}</Label>
                    <Link href="/auth/reset-password" className="text-xs text-primary underline-offset-4 hover:underline">
                      {t("auth.login.forgotPassword")}
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">{t("auth.login.confirmPasswordLabel")}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">{t("auth.login.phoneLabel")}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t("auth.login.phonePlaceholder") ?? undefined}
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    t("auth.login.submitting")
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      {t("auth.login.submit")}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground">{t("auth.login.terms")}</p>
                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline">
                    Register
                  </Link>
                </p>
                <p className="text-center text-sm text-muted-foreground">En vous connectant, vous acceptez nos conditions.</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
