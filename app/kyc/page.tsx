"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ShieldCheck } from "lucide-react"

export default function KYCPage() {
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
    if (!form.firstName || !form.lastName || !form.phone || !form.email || !form.nid) return alert("Veuillez remplir les champs obligatoires.")
    alert("KYC soumis. Un agent vérifiera vos informations sous 24-48h.")
    console.log("KYC payload:", form)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <ShieldCheck className="h-5 w-5" />
        <h1 className="text-2xl font-bold">Inscription KYC</h1>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Informations requises</CardTitle>
          <CardDescription>Conformité KYC (BCEAO) — fournissez des informations exactes</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Prénom</Label>
                <Input placeholder="Mamadou" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Nom</Label>
                <Input placeholder="Ndiaye" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input placeholder="+221 77 123 45 67" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="contact@exemple.sn" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>NIN/NINEA</Label>
                <Input placeholder="NINEA / N° ID national" value={form.nid} onChange={(e) => setForm({ ...form, nid: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Ville</Label>
                <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
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
                <Label>Adresse</Label>
                <Input placeholder="Parcelles Assainies U26, Dakar" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Raison sociale</Label>
                <Input placeholder="Société Baobab" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Type d'entreprise</Label>
                <Select value={form.businessType} onValueChange={(v) => setForm({ ...form, businessType: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarl">SARL</SelectItem>
                    <SelectItem value="sa">SA</SelectItem>
                    <SelectItem value="sasu">SASU</SelectItem>
                    <SelectItem value="micro">Micro-entreprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>N° Contribuable (NINEA/IFU)</Label>
                <Input placeholder="0123456789" value={form.taxId} onChange={(e) => setForm({ ...form, taxId: e.target.value })} />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Pièce d'identité (recto)</Label>
                <Input type="file" accept="image/*,application/pdf" onChange={(e) => setForm({ ...form, idFront: e.target.files?.[0] })} />
              </div>
              <div className="space-y-2">
                <Label>Pièce d'identité (verso)</Label>
                <Input type="file" accept="image/*,application/pdf" onChange={(e) => setForm({ ...form, idBack: e.target.files?.[0] })} />
              </div>
              <div className="space-y-2">
                <Label>Document d'entreprise (registre, statuts)</Label>
                <Input type="file" accept="image/*,application/pdf" onChange={(e) => setForm({ ...form, businessDoc: e.target.files?.[0] })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Informations complémentaires</Label>
              <Textarea placeholder="Ajoutez des précisions utiles à la vérification" />
            </div>

            <Button type="submit" className="w-full">Soumettre KYC</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
