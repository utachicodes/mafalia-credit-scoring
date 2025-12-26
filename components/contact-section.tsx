"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Parlons de votre projet</h2>
          <p className="text-lg text-muted-foreground">Notre équipe vous accompagne dans l’intégration.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="font-medium">Email</div>
                  <a className="text-muted-foreground hover:underline" href="mailto:contact@mafalia.com">
                    contact@mafalia.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="font-medium">Téléphone</div>
                  <a className="text-muted-foreground hover:underline" href="tel:+221000000000">
                    +221 00 000 00 00
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="font-medium">Adresse</div>
                  <div className="text-muted-foreground">Dakar, Sénégal</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="font-medium">Support</div>
                  <div className="text-muted-foreground">24/7</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}


