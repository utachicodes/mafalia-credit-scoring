"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.loans": "Loans",
    "nav.analytics": "Analytics",
    "nav.receivables": "Receivables",
    "nav.settings": "Settings",

    // Hero
    "hero.title": "AI-Powered Credit Scoring",
    "hero.subtitle": "Smart Finance Platform",
    "hero.description":
      "Revolutionize your business financing with intelligent credit scoring, real-time analytics, and seamless loan management.",
    "hero.cta.primary": "Get Started",
    "hero.cta.secondary": "Learn More",

    // Features
    "features.title": "Everything You Need",
    "features.credit.title": "Credit Scoring",
    "features.credit.desc": "AI-powered AAA to BB rating system",
    "features.loans.title": "Loan Management",
    "features.loans.desc": "Automated credit amount calculation",
    "features.analytics.title": "Real-time Analytics",
    "features.analytics.desc": "Track cash flows and margins",
    "features.mobile.title": "Mobile Money",
    "features.mobile.desc": "Integrated payment tracking",

    // Dashboard
    "dashboard.welcome": "Welcome back",
    "dashboard.credit.score": "Credit Score",
    "dashboard.credit.rating": "Credit Rating",
    "dashboard.available.credit": "Available Credit",
    "dashboard.total.loans": "Total Loans",
    "dashboard.receivables": "Receivables",
    "dashboard.cash.flow": "Cash Flow",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.apply": "Apply",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.view.details": "View Details",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.dashboard": "Tableau de bord",
    "nav.loans": "Prêts",
    "nav.analytics": "Analytique",
    "nav.receivables": "Créances",
    "nav.settings": "Paramètres",

    // Hero
    "hero.title": "Notation de Crédit par IA",
    "hero.subtitle": "Plateforme Financière Intelligente",
    "hero.description":
      "Révolutionnez le financement de votre entreprise avec une notation de crédit intelligente, des analyses en temps réel et une gestion de prêts transparente.",
    "hero.cta.primary": "Commencer",
    "hero.cta.secondary": "En savoir plus",

    // Features
    "features.title": "Tout ce dont vous avez besoin",
    "features.credit.title": "Notation de Crédit",
    "features.credit.desc": "Système de notation AAA à BB par IA",
    "features.loans.title": "Gestion des Prêts",
    "features.loans.desc": "Calcul automatique du montant du crédit",
    "features.analytics.title": "Analytique en Temps Réel",
    "features.analytics.desc": "Suivez les flux de trésorerie et les marges",
    "features.mobile.title": "Mobile Money",
    "features.mobile.desc": "Suivi des paiements intégré",

    // Dashboard
    "dashboard.welcome": "Bon retour",
    "dashboard.credit.score": "Score de Crédit",
    "dashboard.credit.rating": "Notation de Crédit",
    "dashboard.available.credit": "Crédit Disponible",
    "dashboard.total.loans": "Total des Prêts",
    "dashboard.receivables": "Créances",
    "dashboard.cash.flow": "Flux de Trésorerie",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.apply": "Appliquer",
    "common.cancel": "Annuler",
    "common.save": "Enregistrer",
    "common.view.details": "Voir les détails",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("mafalia-language") as Language
    if (saved && (saved === "en" || saved === "fr")) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("mafalia-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
