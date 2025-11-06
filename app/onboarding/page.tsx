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
              <h1 className="text-3xl font-bold tracking-tight">{t("onboarding.header.title")}</h1>
              <p className="text-muted-foreground">{t("onboarding.header.description")}</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-border/50 shadow-xl">
          <CardHeader className="border-b border-border/50 bg-gradient-red-subtle">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {t("onboarding.form.cardTitle")}
            </CardTitle>
            <CardDescription>{t("onboarding.form.cardDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Identity Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">{t("onboarding.form.sections.companyIdentity")}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="flex items-center gap-2 text-sm font-medium">
                      <Building2 className="h-4 w-4 text-primary" />
                      {t("onboarding.form.fields.companyName.label")}
                    </Label>
                    <Input
                      id="companyName"
                      placeholder={t("onboarding.form.fields.companyName.placeholder") ?? undefined}
                      value={formData.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">{t("onboarding.form.fields.companyName.helper")}</p>
                  </div>

                  {/* Legal Form */}
                  <div className="space-y-2">
                    <Label htmlFor="legalForm" className="flex items-center gap-2 text-sm font-medium">
                      <Briefcase className="h-4 w-4 text-primary" />
                      {t("onboarding.form.fields.legalForm.label")}
                    </Label>
                    <Select value={formData.legalForm} onValueChange={(value) => handleChange("legalForm", value)}>
                      <SelectTrigger className="h-11 border-border/50 focus:border-primary">
                        <SelectValue placeholder={t("onboarding.form.fields.legalForm.placeholder") ?? undefined} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarl">{t("onboarding.form.fields.legalForm.options.sarl")}</SelectItem>
                        <SelectItem value="sa">{t("onboarding.form.fields.legalForm.options.sa")}</SelectItem>
                        <SelectItem value="sas">{t("onboarding.form.fields.legalForm.options.sas")}</SelectItem>
                        <SelectItem value="gie">{t("onboarding.form.fields.legalForm.options.gie")}</SelectItem>
                        <SelectItem value="cooperative">{t("onboarding.form.fields.legalForm.options.cooperative")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">{t("onboarding.form.fields.legalForm.helper")}</p>
                  </div>

                  {/* Registration Number */}
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber" className="flex items-center gap-2 text-sm font-medium">
                      <Hash className="h-4 w-4 text-primary" />
                      {t("onboarding.form.fields.registrationNumber.label")}
                    </Label>
                    <Input
                      id="registrationNumber"
                      placeholder={t("onboarding.form.fields.registrationNumber.placeholder") ?? undefined}
                      value={formData.registrationNumber}
                      onChange={(e) => handleChange("registrationNumber", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">{t("onboarding.form.fields.registrationNumber.helper")}</p>
                  </div>

                  {/* Tax ID (NINEA) */}
                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="flex items-center gap-2 text-sm font-medium">
                      <Shield className="h-4 w-4 text-primary" />
                      {t("onboarding.form.fields.taxId.label")}
                    </Label>
                    <Input
                      id="taxId"
                      placeholder={t("onboarding.form.fields.taxId.placeholder") ?? undefined}
                      value={formData.taxId}
                      onChange={(e) => handleChange("taxId", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">{t("onboarding.form.fields.taxId.helper")}</p>
                  </div>

                  {/* Creation Date */}
                  <div className="space-y-2">
                    <Label htmlFor="creationDate" className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4 text-primary" />
                      {t("onboarding.form.fields.creationDate.label")}
                    </Label>
                    <Input
                      id="creationDate"
                      type="date"
                      value={formData.creationDate}
                      onChange={(e) => handleChange("creationDate", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">{t("onboarding.form.fields.creationDate.helper")}</p>
                  </div>

                  {/* Business Purpose */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="businessPurpose" className="flex items-center gap-2 text-sm font-medium">
                      <Briefcase className="h-4 w-4 text-primary" />
                      {t("onboarding.form.fields.businessPurpose.label")}
                    </Label>
                    <Textarea
                      id="businessPurpose"
                      placeholder={t("onboarding.form.fields.businessPurpose.placeholder") ?? undefined}
                      value={formData.businessPurpose}
                      onChange={(e) => handleChange("businessPurpose", e.target.value)}
                      className="min-h-[100px] border-border/50 focus:border-primary transition-colors resize-none"
                      required
                    />
                    <p className="text-xs text-muted-foreground">{t("onboarding.form.fields.businessPurpose.helper")}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">{t("onboarding.form.sections.contact")}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="h-4 w-4 text-primary" />
                      {t("onboarding.form.fields.address.label")}
                    </Label>
                    <Textarea
                      id="address"
                      placeholder={t("onboarding.form.fields.address.placeholder") ?? undefined}
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="min-h-[80px] border-border/50 focus:border-primary transition-colors resize-none"
                      required
                    />
                    <p className="text-xs text-muted-foreground">{t("onboarding.form.fields.address.helper")}</p>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4 text-primary" />
                      {t("onboarding.form.fields.email.label")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("onboarding.form.fields.email.placeholder") ?? undefined}
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">{t("onboarding.form.fields.email.helper")}</p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="h-4 w-4 text-primary" />
                      {t("onboarding.form.fields.phone.label")}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t("onboarding.form.fields.phone.placeholder") ?? undefined}
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                      required
                    />
                    <p className="text-xs text-muted-foreground">{t("onboarding.form.fields.phone.helper")}</p>
                  </div>

                  {/* Website */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website" className="flex items-center gap-2 text-sm font-medium">
                      <Globe className="h-4 w-4 text-primary" />
                      {t("onboarding.form.fields.website.label")}
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder={t("onboarding.form.fields.website.placeholder") ?? undefined}
                      value={formData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      className="h-11 border-border/50 focus:border-primary transition-colors"
                    />
                    <p className="text-xs text-muted-foreground">{t("onboarding.form.fields.website.helper")}</p>
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
                  {t("onboarding.form.actions.saveDraft")}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all"
                >
                  {t("onboarding.form.actions.submit")}
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
                <h4 className="font-semibold">{t("onboarding.infoCard.title")}</h4>
                <p className="text-sm text-muted-foreground">{t("onboarding.infoCard.description")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
