"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

export default function AuthErrorPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const errorCode = searchParams.get("error")

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center items-center mb-4">
            <img src="/mafalia-logo.png" alt="Mafalia" className="h-10 w-auto" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("auth.error.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              {errorCode ? (
                <p className="text-sm text-muted-foreground">{t("auth.error.code", { code: errorCode })}</p>
              ) : (
                <p className="text-sm text-muted-foreground">{t("auth.error.fallback")}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
