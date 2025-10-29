import { NextResponse } from "next/server";
import { companyAccountSchema } from "@/lib/validation/company";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const parsed = companyAccountSchema.parse(payload);

    const toSnake = {
      raison_sociale: parsed.raisonSociale,
      forme_juridique: parsed.formeJuridique,
      numero_immatriculation: parsed.numeroImmatriculation,
      ninea: parsed.ninea,
      date_creation: parsed.dateCreation,
      objet_social: parsed.objetSocial,
      adresse_siege: parsed.adresseSiege,
      email_pro: parsed.emailPro,
      telephone_pro: parsed.telephonePro,
      site_web: parsed.siteWeb ?? null,
    };

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("company_accounts")
      .insert(toSnake)
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { message: "Erreur d'enregistrement", detail: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: (data as any)?.id }, { status: 201 });
  } catch (err: any) {
    if (err?.name === "ZodError") {
      return NextResponse.json(
        { message: "Données invalides", issues: err.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
