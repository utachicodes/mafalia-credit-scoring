"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyAccountSchema, type CompanyAccount } from "@/lib/validation/company";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CompanyAccountForm() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompanyAccount>({
    resolver: zodResolver(companyAccountSchema),
    defaultValues: {
      raisonSociale: "",
      formeJuridique: "SAS",
      numeroImmatriculation: "",
      ninea: "",
      dateCreation: "",
      objetSocial: "",
      adresseSiege: "",
      emailPro: "",
      telephonePro: "",
      siteWeb: "",
    },
  });

  const onSubmit = async (data: CompanyAccount) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/company-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Erreur inconnue");
      alert("Compte société créé (brouillon). ID: " + json.id);
    } catch (e: any) {
      alert(e.message || "Impossible d'enregistrer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-6 max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="raisonSociale">Raison sociale</Label>
        <Input id="raisonSociale" placeholder="Société Mafalia SAS" {...register("raisonSociale")} />
        {errors.raisonSociale && <p className="text-sm text-red-600">{errors.raisonSociale.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Forme juridique</Label>
        <Select
          defaultValue="SAS"
          onValueChange={(v) => setValue("formeJuridique", v as CompanyAccount["formeJuridique"], { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="SARL">SARL</SelectItem>
              <SelectItem value="SA">SA</SelectItem>
              <SelectItem value="SAS">SAS</SelectItem>
              <SelectItem value="GIE">GIE</SelectItem>
              <SelectItem value="Cooperative">Coopérative</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.formeJuridique && <p className="text-sm text-red-600">{errors.formeJuridique.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="numeroImmatriculation">Numéro d'immatriculation (RCCM)</Label>
        <Input id="numeroImmatriculation" placeholder="SN.DKR.2024.A.10842" {...register("numeroImmatriculation")} />
        {errors.numeroImmatriculation && <p className="text-sm text-red-600">{errors.numeroImmatriculation.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="ninea">Numéro fiscal (NINEA)</Label>
        <Input id="ninea" placeholder="009876543N" {...register("ninea")} />
        {errors.ninea && <p className="text-sm text-red-600">{errors.ninea.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateCreation">Date de création</Label>
        <Input id="dateCreation" type="date" {...register("dateCreation")} />
        {errors.dateCreation && <p className="text-sm text-red-600">{errors.dateCreation.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="objetSocial">Objet social</Label>
        <Textarea id="objetSocial" placeholder="Services numériques et financiers" {...register("objetSocial")} />
        {errors.objetSocial && <p className="text-sm text-red-600">{errors.objetSocial.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="adresseSiege">Adresse du siège social</Label>
        <Textarea id="adresseSiege" placeholder="Immeuble Djaraf Jaraff, Point E, Dakar, Sénégal" {...register("adresseSiege")} />
        {errors.adresseSiege && <p className="text-sm text-red-600">{errors.adresseSiege.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="emailPro">Email professionnel</Label>
        <Input id="emailPro" placeholder="contact@mafalia.com" type="email" {...register("emailPro")} />
        {errors.emailPro && <p className="text-sm text-red-600">{errors.emailPro.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telephonePro">Téléphone professionnel</Label>
        <Input id="telephonePro" placeholder="+221 78 209 2780" {...register("telephonePro")} />
        {errors.telephonePro && <p className="text-sm text-red-600">{errors.telephonePro.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="siteWeb">Site web (facultatif)</Label>
        <Input id="siteWeb" placeholder="https://www.mafalia.com" {...register("siteWeb")} />
        {errors.siteWeb && <p className="text-sm text-red-600">{(errors.siteWeb as any)?.message}</p>}
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Envoi..." : "Créer le compte"}
        </Button>
      </div>
    </form>
  );
}
