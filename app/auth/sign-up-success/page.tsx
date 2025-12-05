"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export default function SignUpSuccessPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <span className="text-foreground font-bold text-2xl">D-Credit</span>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("auth.success.title")}</CardTitle>
              <CardDescription>{t("auth.success.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t("auth.success.body")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
