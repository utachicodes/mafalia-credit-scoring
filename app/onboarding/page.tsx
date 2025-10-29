"use client"

import type React from "react"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"
import { Building2, FileText, MapPin, Mail, Phone, Globe, Calendar, Briefcase, Hash, Shield } from "lucide-react"
import { useState } from "react"

export default function OnboardingPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    companyName: "",
    legalForm: "",
    registrationNumber: "",
    taxId: "",
    creationDate: "",
    businessPurpose: "",
    address: "",
    email: "",
    phone: "",
    website: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    // Handle form submission
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Informations générales sur la société</h1>
              <p className="text-muted-foreground">
                Collectez les données d'identification de la personne morale pour l'inscription
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-border/50 shadow-xl">
          <CardHeader className="border-b border-border/50 bg-gradient-red-subtle">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Formulaire d'inscription
            </CardTitle>
            <CardDescription>Veuillez remplir tous les champs requis avec précision</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Identity Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Identité de l'entreprise</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="flex items-center gap-2 text-sm font-medium">
                      <Building2 className="h-4 w-4 text-primary" />
                      Raison sociale *
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="Société Mafalia SAS"
                      value={formData.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Nom officiel de l'entreprise</p>
                  </div>

                  {/* Legal Form */}
                  <div className="space-y-2">
                    <Label htmlFor="legalForm" className="flex items-center gap-2 text-sm font-medium">
                      <Briefcase className="h-4 w-4 text-primary" />
                      Forme juridique *
                    </Label>
                    <Select value={formData.legalForm} onValueChange={(value) => handleChange("legalForm", value)}>
                      <SelectTrigger className="h-11 border-border/50 focus:border-primary">
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarl">SARL</SelectItem>
                        <SelectItem value="sa">SA</SelectItem>
                        <SelectItem value="sas">SAS</SelectItem>
                        <SelectItem value="gie">GIE</SelectItem>
                        <SelectItem value="cooperative">Coopérative</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">SARL, SA, SAS, GIE, Coopérative, etc.</p>
                  </div>

                  {/* Registration Number */}
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber" className="flex items-center gap-2 text-sm font-medium">
                      <Hash className="h-4 w-4 text-primary" />
                      Numéro d'immatriculation *
                    </Label>
                    <Input
                      id="registrationNumber"
                      placeholder="SN.DKR.2024.A.10842"
                      value={formData.registrationNumber}
                      onChange={(e) => handleChange("registrationNumber", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">RCCM ou équivalent</p>
                  </div>

                  {/* Tax ID (NINEA) */}
                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="flex items-center gap-2 text-sm font-medium">
                      <Shield className="h-4 w-4 text-primary" />
                      Numéro fiscal (NINEA) *
                    </Label>
                    <Input
                      id="taxId"
                      placeholder="009876543N"
                      value={formData.taxId}
                      onChange={(e) => handleChange("taxId", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Identifiant fiscal unique</p>
                  </div>

                  {/* Creation Date */}
                  <div className="space-y-2">
                    <Label htmlFor="creationDate" className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4 text-primary" />
                      Date de création *
                    </Label>
                    <Input
                      id="creationDate"
                      type="date"
                      value={formData.creationDate}
                      onChange={(e) => handleChange("creationDate", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Date figurant au registre</p>
                  </div>

                  {/* Business Purpose */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="businessPurpose" className="flex items-center gap-2 text-sm font-medium">
                      <Briefcase className="h-4 w-4 text-primary" />
                      Objet social *
                    </Label>
                    <Textarea
                      id="businessPurpose"
                      placeholder="Services numériques et financiers"
                      value={formData.businessPurpose}
                      onChange={(e) => handleChange("businessPurpose", e.target.value)}
                      className="min-h-[100px] border-border/50 focus:border-primary transition-colors resize-none"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Activité principale de l'entreprise</p>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Coordonnées</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="h-4 w-4 text-primary" />
                      Adresse du siège social *
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Immeuble Djaraf Jaraff, Point E, Dakar, Sénégal"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="min-h-[80px] border-border/50 focus:border-primary transition-colors resize-none"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Adresse complète (ville, pays, code postal)</p>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4 text-primary" />
                      Email professionnel *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@mafalia.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Email de contact officiel</p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="h-4 w-4 text-primary" />
                      Téléphone professionnel *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+221 78 209 2780"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Numéro de la société</p>
                  </div>

                  {/* Website */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website" className="flex items-center gap-2 text-sm font-medium">
                      <Globe className="h-4 w-4 text-primary" />
                      Site web (facultatif)
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="www.mafalia.com"
                      value={formData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                    />
                    <p className="text-xs text-muted-foreground">URL de l'entreprise</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12 border-border/50 hover:bg-muted/50 transition-all bg-transparent"
                >
                  Enregistrer comme brouillon
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all"
                >
                  Soumettre l'inscription
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-primary/20 bg-gradient-red-subtle">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold">Sécurité et confidentialité</h4>
                <p className="text-sm text-muted-foreground">
                  Toutes vos informations sont cryptées et stockées en toute sécurité. Nous respectons les normes de
                  conformité RGPD et les réglementations locales du Sénégal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
