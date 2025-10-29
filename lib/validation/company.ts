import { z } from "zod";

export const companyAccountSchema = z.object({
  raisonSociale: z.string().min(2).max(150),
  formeJuridique: z.enum(["SARL", "SA", "SAS", "GIE", "Cooperative", "Autre"]),
  numeroImmatriculation: z
    .string()
    .min(6)
    .max(40)
    .regex(/^[A-Za-z0-9.\-\s/]+$/),
  ninea: z.string().min(8).max(15).regex(/^[A-Za-z0-9]+$/),
  dateCreation: z
    .string()
    .refine((v) => !Number.isNaN(Date.parse(v)), { message: "Date invalide" })
    .refine((v) => new Date(v) <= new Date(), { message: "Ne peut pas être dans le futur" }),
  objetSocial: z.string().min(10).max(300),
  adresseSiege: z.string().min(10).max(300),
  emailPro: z.string().email(),
  telephonePro: z
    .string()
    .regex(/^\+?[1-9]\d{7,14}$/),
  siteWeb: z
    .string()
    .url()
    .or(z.literal(""))
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
});

export type CompanyAccount = z.infer<typeof companyAccountSchema>;
