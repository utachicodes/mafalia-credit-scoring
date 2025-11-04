import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <Image src="/mafalia-logo.png" alt="Mafalia" width={120} height={40} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Erreur d'authentification</CardTitle>
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-sm text-muted-foreground">Code d'erreur: {params.error}</p>
              ) : (
                <p className="text-sm text-muted-foreground">Une erreur s'est produite lors de l'authentification.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
