import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <Image src="/logo.svg" alt="Mafalia" width={120} height={40} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Vérifiez votre email</CardTitle>
              <CardDescription>Confirmez votre compte pour continuer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Nous avons envoyé un email de confirmation à votre adresse. Veuillez cliquer sur le lien dans l'email
                pour activer votre compte.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
