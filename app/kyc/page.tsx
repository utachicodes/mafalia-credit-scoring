"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ShieldCheck } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/components/ui/use-toast"

export default function KYCPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    nid: "",
    address: "",
    city: "",
    businessName: "",
    businessType: "",
    taxId: "",
    idFront: undefined as File | undefined,
    idBack: undefined as File | undefined,
    businessDoc: undefined as File | undefined,
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.phone || !form.email || !form.nid) {
      toast({
        title: t("common.error"),
        description: "Please fill in all required fields.",
      })
      return
    }
    toast({
      title: t("common.success"),
      description: "KYC submitted. An agent will verify your information within 24-48h.",
    })
    console.log("KYC payload:", form)
  }

  return (
    <AppLayout>
      <div className="space-y-6 page-enter max-w-4xl mx-auto">
        <div className="animate-fade-in flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("nav.kyc")}</h1>
            <p className="text-muted-foreground mt-1">KYC Registration - BCEAO Compliance</p>
          </div>
        </div>

        <div className="animate-slide-up animate-stagger-1">
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-smooth">
            <CardHeader>
              <CardTitle>Required Information</CardTitle>
              <CardDescription>BCEAO KYC Compliance — provide accurate information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input placeholder="Mamadou" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Ndiaye" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="+221 77 123 45 67" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="contact@exemple.sn" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>NIN/NINEA</Label>
                    <Input placeholder="NINEA / National ID Number" value={form.nid} onChange={(e) => setForm({ ...form, nid: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dakar">Dakar</SelectItem>
                        <SelectItem value="thies">Thiès</SelectItem>
                        <SelectItem value="saint-louis">Saint-Louis</SelectItem>
                        <SelectItem value="ziguinchor">Ziguinchor</SelectItem>
                        <SelectItem value="kaolack">Kaolack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Address</Label>
                    <Input placeholder="Parcelles Assainies U26, Dakar" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input placeholder="Société Baobab" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Select value={form.businessType} onValueChange={(v) => setForm({ ...form, businessType: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarl">SARL</SelectItem>
                        <SelectItem value="sa">SA</SelectItem>
                        <SelectItem value="sasu">SASU</SelectItem>
                        <SelectItem value="micro">Micro-enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Tax ID (NINEA/IFU)</Label>
                    <Input placeholder="0123456789" value={form.taxId} onChange={(e) => setForm({ ...form, taxId: e.target.value })} />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>ID Document (Front)</Label>
                    <Input type="file" accept="image/*,application/pdf" onChange={(e) => setForm({ ...form, idFront: e.target.files?.[0] })} />
                  </div>
                  <div className="space-y-2">
                    <Label>ID Document (Back)</Label>
                    <Input type="file" accept="image/*,application/pdf" onChange={(e) => setForm({ ...form, idBack: e.target.files?.[0] })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Document</Label>
                    <Input type="file" accept="image/*,application/pdf" onChange={(e) => setForm({ ...form, businessDoc: e.target.files?.[0] })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Additional Information</Label>
                  <Textarea placeholder="Add useful details for verification" />
                </div>

                <Button type="submit" className="w-full">Submit KYC</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
