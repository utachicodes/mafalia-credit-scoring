"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Language = "en" | "fr"

type TranslationReplacements = Record<string, string | number>

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, replacements?: TranslationReplacements) => string
}

type TranslationDictionary = typeof baseTranslations

const baseTranslations = {
  nav: {
    home: "Home",
    dashboard: "Dashboard",
    loans: "Loans",
    analytics: "Analytics",
    receivables: "Receivables",
    settings: "Settings",
    mobileMoney: "Mobile Money",
    onboarding: "Onboarding",
    loanRequests: "Loan Requests",
    transactions: "Transactions",
    clients: "Clients",
    lenders: "Lenders",
    scoring: "Scoring",
    kyc: "KYC",
    security: "Security",
    more: "More",
    navigation: "Navigation",
  },
  navigation: {
    searchPlaceholder: "Search…",
    notifications: "Notifications",
    toggleTheme: "Toggle theme",
    toggleLanguage: "Switch language",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
  },
  hero: {
    title: "AI-Powered Credit Scoring",
    subtitle: "Smart Finance Platform",
    description:
      "Revolutionize your business financing with intelligent credit scoring, real-time analytics, and seamless loan management.",
    cta: {
      primary: "Get Started",
      secondary: "Learn More",
    },
  },
  features: {
    title: "Everything You Need",
    credit: {
      title: "Credit Scoring",
      desc: "AI-powered AAA to BB rating system",
    },
    loans: {
      title: "Loan Management",
      desc: "Automated credit amount calculation",
    },
    analytics: {
      title: "Real-time Analytics",
      desc: "Track cash flows and margins",
    },
    mobile: {
      title: "Mobile Money",
      desc: "Integrated payment tracking",
    },
  },
  dashboard: {
    welcome: "Welcome back",
    infoBanner: {
      title: "Improved Dashboard!",
      description: "Discover new features: real-time analytics, organization management, and push notifications.",
      close: "Close banner",
    },
    credit: {
      score: "Credit Score",
      rating: "Credit Rating",
      assessmentSubtitle: "AI-powered credit assessment",
      recommendedAmount: "Recommended Credit Amount",
      maxAmount: "Max",
      revenueFlow: "Revenue & Flow",
      profitability: "Profitability",
      debtRatio: "Debt Ratio",
      positiveFactors: "Positive Factors",
      riskLevel: "{risk} Risk",
      scoreProgress: "Score Progress",
    },
    configurableScore: {
      title: "Configurable Score",
      adjustLink: "Adjust criteria",
      description: "Based on the last 6 months of data for client {client}.",
    },
    availableCredit: "Available Credit",
    totalLoans: "Total Loans",
    receivables: "Receivables",
    cashFlow: "Cash Flow",
    pendingApprovals: "Pending Approvals",
    recentLoans: {
      title: "Recent Loans",
      description: "Manage and track all your transactions",
      transactions: "transactions",
      filters: "Filters",
      filterDescription: "Filter loans by status and type",
      exportAll: "Export All",
      exportSuccess: "Loans exported successfully",
      noTransactions: "No transactions found",
      due: "Due",
      viewAll: "View All Loans",
      table: {
        id: "ID Transaction",
        amount: "Amount",
        currency: "Currency",
        status: "Status",
        date: "Date",
        type: "Type",
        actions: "Actions",
        view: "View",
      },
      status: {
        active: "Active",
        pending: "Pending",
        completed: "Completed",
      },
    },
    activeLoans: {
      title: "Active Loans",
      description: "Overview of your current loan portfolio",
      repaymentProgress: "Repayment Progress",
      outstanding: "Outstanding",
      nextPayment: "Next Payment",
      paymentAmount: "Payment Amount",
      nextPaymentDate: "Next Payment Date",
    },
    quickActions: {
      repaymentProgress: "Repayment Progress",
      outstanding: "Outstanding",
      nextPayment: "Next Payment",
      paymentAmount: "Payment Amount",
      applicationUnderReview: "Application under review",
      checkStatus: "Check Status",
      viewDetails: "View Details",
      makePayment: "Make Payment",
      downloadStatement: "Download Statement",
    },
    status: {
      active: "Active",
      pending: "Pending",
      completed: "Completed",
    },
  },
  common: {
    loading: "Loading…",
    error: "Error",
    success: "Success",
    apply: "Apply",
    cancel: "Cancel",
    save: "Save",
    viewDetails: "View Details",
    export: "Export",
    manage: "Manage",
    all: "All",
    reset: "Reset",
    months: {
      short: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec",
      },
      full: {
        january: "January",
        february: "February",
        march: "March",
        april: "April",
        may: "May",
        june: "June",
        july: "July",
        august: "August",
        september: "September",
        october: "October",
        november: "November",
        december: "December",
      },
    },
  },
  loans: {
    header: {
      title: "Loans",
      subtitle: "Manage and apply for business loans",
      newApplication: "New Application",
    },
    application: {
      title: "Apply for New Loan",
      description: "Fill out the form to submit a loan application",
      amountLabel: "Loan Amount (FCFA)",
      amountPlaceholder: "5 000 000",
      termLabel: "Loan Term (months)",
      termPlaceholder: "Select term",
      purposeLabel: "Loan Purpose",
      purposePlaceholder: "Select purpose",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Provide details about how you plan to use the loan…",
      submit: "Submit Application",
      interestRate: "Estimated Interest Rate",
      monthlyPayment: "Estimated Monthly Payment",
      creditRating: "Your Credit Rating",
    },
    summary: {
      interestRate: "Estimated Interest Rate",
      monthlyPayment: "Estimated Monthly Payment",
      creditRating: "Your Credit Rating",
      interestSuffix: "APR",
    },
    calculator: {
      title: "Loan Calculator",
      description: "Estimate your payments",
      amountMin: "500K",
      amountMax: "50M",
      termMin: "6 months",
      termMax: "60 months",
    },
    totals: {
      totalPayment: "Total Payment",
      totalInterest: "Total Interest",
      principal: "Principal",
    },
    termOptions: {
      "12": "12 months",
      "18": "18 months",
      "24": "24 months",
      "36": "36 months",
      "48": "48 months",
    },
    purposeOptions: {
      workingCapital: "Working Capital",
      equipment: "Equipment Purchase",
      inventory: "Inventory Financing",
      expansion: "Business Expansion",
      other: "Other",
    },
    exportSuccess: "Loans exported successfully",
  },
  analytics: {
    subtitle: "Track your financial performance and insights",
    download: "Export",
    downloadSuccess: "downloaded successfully",
    range: {
      lastMonth: "Last Month",
      last3Months: "Last 3 Months",
      last6Months: "Last 6 Months",
      lastYear: "Last Year",
      all: "All Time",
    },
    metrics: {
      totalRevenue: "Total Revenue",
      netProfit: "Net Profit",
      profitMargin: "Profit Margin",
      operatingExpenses: "Operating Expenses",
      roi: "ROI",
      cashFlow: "Cash Flow",
    },
    charts: {
      revenueVsExpenses: {
        title: "Revenue vs Expenses",
        description: "Monthly comparison of income and costs",
        labels: {
          revenue: "Revenue",
          expenses: "Expenses",
        },
      },
      profitMargin: {
        title: "Profit Margin Trend",
        description: "Monthly profit margin percentage",
        label: "Profit Margin %",
      },
      loanPerformance: {
        title: "Loan Portfolio Performance",
        description: "Track disbursements, repayments, and outstanding balances",
        labels: {
          disbursed: "Disbursed",
          repaid: "Repaid",
          outstanding: "Outstanding",
        },
      },
      monthlyComparison: {
        title: "Month-over-Month Comparison",
        description: "{current} vs {previous}",
        currentPeriod: "December 2025",
        previousPeriod: "November 2025",
        metrics: {
          revenue: "Revenue",
          expenses: "Expenses",
          netProfit: "Net Profit",
          loansDisbursed: "Loans Disbursed",
          repayments: "Repayments",
          defaultRate: "Default Rate",
        },
      },
    },
    reports: {
      title: "Export Reports",
      description: "Download financial reports",
      items: {
        financialSummary: {
          name: "Financial Summary",
          description: "Complete financial overview",
          format: "PDF",
        },
        loanPortfolio: {
          name: "Loan Portfolio",
          description: "Detailed loan analysis",
          format: "Excel",
        },
        cashFlowStatement: {
          name: "Cash Flow Statement",
          description: "Monthly cash flow report",
          format: "PDF",
        },
        taxReport: {
          name: "Tax Report",
          description: "Annual tax documentation",
          format: "PDF",
        },
      },
    },
  },
  mobileMoney: {
    title: "Connected Providers",
    description: "Your linked mobile money accounts",
    balance: "Balance",
    transactions: "Transactions",
    sync: "Sync",
    addProvider: {
      button: "Add Provider",
      title: "Add Mobile Money Provider",
      description: "Connect a new mobile money account to track transactions",
      typeLabel: "Provider Type",
      typePlaceholder: "Select provider type",
      nameLabel: "Provider Name",
      namePlaceholder: "e.g. Wave, Orange Money",
      accountLabel: "Account Number",
      accountPlaceholder: "+221 77 123 45 67",
      submit: "Add Provider",
      other: "Other",
    },
    overview: {
      totalBalance: "Total Balance",
      incoming: "Incoming",
      outgoing: "Outgoing",
      pending: "Pending",
      thisMonth: "This month",
      transactionsCount: "{count} transactions",
    },
  },
  notifications: {
    title: "Notifications",
    empty: "No notifications",
    markAllRead: "Mark all as read",
    markRead: "Mark as read",
    clearAll: "Clear all",
    loanApproved: {
      title: "Loan Approved",
      message: "Your loan application L-001 has been approved",
    },
    paymentReceived: {
      title: "Payment Received",
      message: "You received 50,000 FCFA from Mamadou Ndiaye",
    },
    paymentDue: {
      title: "Payment Due Soon",
      message: "Your next payment of 1,250 FCFA is due in 3 days",
    },
  },
  profile: {
    viewProfile: "View Profile",
    settings: "Settings",
    changePassword: "Change Password",
    changePasswordDescription: "Update your account password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    passwordChanged: "Password changed successfully",
    editInstitution: "Edit Institution/Company",
    loginHistory: "Login History",
    updated: "Profile updated successfully",
  },
  onboarding: {
    header: {
      title: "Company onboarding information",
      description: "Collect corporate identity data to complete registration",
    },
    form: {
      cardTitle: "Registration form",
      cardDescription: "Please complete all required fields accurately",
      sections: {
        companyIdentity: "Company identity",
        contact: "Contact details",
      },
      fields: {
        companyName: {
          label: "Legal name *",
          placeholder: "Mafalia Corporation",
          helper: "Official registered business name",
        },
        legalForm: {
          label: "Legal form *",
          placeholder: "Select...",
          helper: "SARL, SA, SAS, GIE, Cooperative, etc.",
          options: {
            sarl: "SARL",
            sa: "SA",
            sas: "SAS",
            gie: "GIE",
            cooperative: "Cooperative",
          },
        },
        registrationNumber: {
          label: "Registration number *",
          placeholder: "SN.DKR.2024.A.10842",
          helper: "RCCM or local registry number",
        },
        taxId: {
          label: "Tax ID (NINEA) *",
          placeholder: "009876543N",
          helper: "Unique fiscal identifier",
        },
        creationDate: {
          label: "Incorporation date *",
          helper: "Date shown on the registry",
        },
        businessPurpose: {
          label: "Business purpose *",
          placeholder: "Digital and financial services",
          helper: "Primary activity of the company",
        },
        address: {
          label: "Registered address *",
          placeholder: "Djaraf Jaraff Building, Point E, Dakar, Senegal",
          helper: "Complete address (city, country, postal code)",
        },
        email: {
          label: "Company email *",
          placeholder: "contact@mafalia.com",
          helper: "Official contact email",
        },
        phone: {
          label: "Company phone *",
          placeholder: "+221 78 209 2780",
          helper: "Primary company number",
        },
        website: {
          label: "Website (optional)",
          placeholder: "www.mafalia.com",
          helper: "Company URL",
        },
      },
      actions: {
        saveDraft: "Save as draft",
        submit: "Submit registration",
      },
    },
    infoCard: {
      title: "Security & privacy",
      description:
        "All information is encrypted and stored securely. We comply with GDPR and Senegalese regulatory requirements.",
    },
  },
  auth: {
    common: {
      passwordMismatch: "Passwords do not match",
      genericError: "An error occurred",
    },
    signOut: "Sign Out",
    login: {
      brandTitle: "Your finance, simplified.",
      brandDescription:
        "Access your dashboard, track your cash flow, and obtain precise credit scoring for your institution.",
      title: "Sign in",
      description: "Enter your lending institution details to access Mafalia",
      institutionLabel: "Credit institution *",
      institutionPlaceholder: "e.g. Al Rahma",
      nameLabel: "Full name *",
      namePlaceholder: "e.g. John Doe",
      emailLabel: "Email *",
      emailPlaceholder: "you@example.com",
      passwordLabel: "Password *",
      forgotPassword: "Forgot password?",
      submit: "Sign in",
      submitting: "Signing in...",
      terms: "By signing in, you agree to our terms.",
    },
    success: {
      title: "Check your email",
      description: "Confirm your account to continue",
      body: "We sent a confirmation email to your address. Click the link in the email to activate your account.",
    },
    error: {
      title: "Authentication error",
      fallback: "An error occurred during authentication.",
      code: "Error code: {code}",
    },
  },
} as const

const translations: Record<Language, TranslationDictionary> = {
  en: baseTranslations,
  fr: {
    ...baseTranslations,
    profile: {
      ...baseTranslations.profile,
      viewProfile: "Voir le profil",
      settings: "Paramètres",
      changePassword: "Changer le mot de passe",
      changePasswordDescription: "Mettre à jour le mot de passe du compte",
      currentPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      passwordChanged: "Mot de passe modifié avec succès",
      editInstitution: "Modifier l'institution/entreprise",
      loginHistory: "Historique de connexion",
      updated: "Profil mis à jour avec succès",
    },
    nav: {
      home: "Accueil",
      dashboard: "Tableau de bord",
      loans: "Prêts",
      analytics: "Analytique",
      receivables: "Créances",
      settings: "Paramètres",
      mobileMoney: "Mobile Money",
      onboarding: "Inscription",
      loanRequests: "Demandes",
      transactions: "Transactions",
      clients: "Clients",
      lenders: "Prêteurs",
      scoring: "Notation",
      kyc: "KYC",
      security: "Sécurité",
      more: "Plus",
      navigation: "Navigation",
    },
    navigation: {
      searchPlaceholder: "Rechercher…",
      notifications: "Notifications",
      toggleTheme: "Changer de thème",
      toggleLanguage: "Changer de langue",
      openMenu: "Ouvrir le menu de navigation",
      closeMenu: "Fermer le menu de navigation",
    },
    hero: {
      title: "Notation de Crédit par IA",
      subtitle: "Plateforme Financière Intelligente",
      description:
      "Révolutionnez le financement de votre entreprise avec une notation de crédit intelligente, des analyses en temps réel et une gestion de prêts transparente.",
      cta: {
        primary: "Commencer",
        secondary: "En savoir plus",
      },
    },
    features: {
      title: "Tout ce dont vous avez besoin",
      credit: {
        title: "Notation de Crédit",
        desc: "Système de notation AAA à BB par IA",
      },
      loans: {
        title: "Gestion des Prêts",
        desc: "Calcul automatique du montant du crédit",
      },
      analytics: {
        title: "Analytique en Temps Réel",
        desc: "Suivez les flux de trésorerie et les marges",
      },
      mobile: {
        title: "Mobile Money",
        desc: "Suivi des paiements intégré",
      },
    },
    dashboard: {
      welcome: "Bon retour",
      infoBanner: {
        title: "Tableau de bord amélioré!",
        description: "Découvrez les nouvelles fonctionnalités: analytics en temps réel, gestion des organisations et notifications push.",
        close: "Fermer la bannière",
      },
      credit: {
        score: "Score de Crédit",
        rating: "Notation de Crédit",
        assessmentSubtitle: "Analyse de crédit alimentée par l'IA",
        recommendedAmount: "Montant de crédit recommandé",
        maxAmount: "Max",
        revenueFlow: "Revenus & Flux",
        profitability: "Rentabilité",
        debtRatio: "Ratio d'endettement",
        positiveFactors: "Facteurs positifs",
        riskLevel: "Risque {risk}",
        scoreProgress: "Progression du score",
      },
      availableCredit: "Crédit disponible",
      totalLoans: "Total des prêts",
      receivables: "Créances",
      cashFlow: "Flux de trésorerie",
      pendingApprovals: "Approbations en attente",
      recentLoans: {
        title: "Prêts récents",
        description: "Gérez et suivez toutes vos transactions",
        transactions: "transactions",
        filters: "Filtres",
        filterDescription: "Filtrer les prêts par statut et type",
        exportAll: "Exporter tout",
        exportSuccess: "Prêts exportés avec succès",
        noTransactions: "Aucune transaction trouvée",
        due: "Échéance",
        viewAll: "Voir tous les prêts",
        table: {
          id: "ID Transaction",
          amount: "Montant",
          currency: "Devise",
          status: "Statut",
          date: "Date",
          type: "Type",
          actions: "Actions",
          view: "Voir",
        },
        status: {
          active: "Actif",
          pending: "En attente",
          completed: "Terminé",
        },
      },
      activeLoans: {
        title: "Prêts actifs",
        description: "Aperçu de votre portefeuille de prêts actuel",
        repaymentProgress: "Progression du remboursement",
        outstanding: "Encours",
        nextPayment: "Prochain paiement",
        paymentAmount: "Montant de la mensualité",
        nextPaymentDate: "Date du prochain paiement",
      },
      configurableScore: {
        title: "Score configurable",
        adjustLink: "Ajuster les critères",
        description: "Basé sur les 6 derniers mois de données pour le client {client}.",
      },
      quickActions: {
        repaymentProgress: "Progression du remboursement",
        outstanding: "Encours",
        nextPayment: "Prochain paiement",
        paymentAmount: "Montant de la mensualité",
        applicationUnderReview: "Demande en cours d'étude",
        checkStatus: "Vérifier le statut",
        viewDetails: "Voir les détails",
        makePayment: "Effectuer un paiement",
        downloadStatement: "Télécharger le relevé",
      },
      status: {
        active: "Actif",
        pending: "En attente",
        completed: "Terminé",
      },
    },
    common: {
      loading: "Chargement…",
      error: "Erreur",
      success: "Succès",
      apply: "Appliquer",
      cancel: "Annuler",
      save: "Enregistrer",
      viewDetails: "Voir les détails",
      export: "Exporter",
      manage: "Gérer",
      all: "Tous",
      reset: "Réinitialiser",
      months: {
        short: {
          jan: "janv.",
          feb: "févr.",
          mar: "mars",
          apr: "avr.",
          may: "mai",
          jun: "juin",
          jul: "juil.",
          aug: "août",
          sep: "sept.",
          oct: "oct.",
          nov: "nov.",
          dec: "déc.",
        },
        full: {
          january: "janvier",
          february: "février",
          march: "mars",
          april: "avril",
          may: "mai",
          june: "juin",
          july: "juillet",
          august: "août",
          september: "septembre",
          october: "octobre",
          november: "novembre",
          december: "décembre",
        },
      },
    },
    loans: {
      header: {
        title: "Prêts",
        subtitle: "Gérez et demandez des prêts professionnels",
        newApplication: "Nouvelle demande",
      },
      application: {
        title: "Demander un nouveau prêt",
        description: "Remplissez le formulaire pour soumettre une demande de prêt",
        amountLabel: "Montant du prêt (FCFA)",
        amountPlaceholder: "5 000 000",
        termLabel: "Durée du prêt (mois)",
        termPlaceholder: "Sélectionnez une durée",
        purposeLabel: "Objet du prêt",
        purposePlaceholder: "Sélectionnez un objet",
        descriptionLabel: "Description",
        descriptionPlaceholder: "Précisez comment vous comptez utiliser le prêt…",
        submit: "Soumettre la demande",
        interestRate: "TAEG estimé",
        monthlyPayment: "Mensualité estimée",
        creditRating: "Votre notation de crédit",
      },
      summary: {
        interestRate: "TAEG estimé",
        monthlyPayment: "Mensualité estimée",
        creditRating: "Votre notation de crédit",
        interestSuffix: "TAEG",
      },
      calculator: {
        title: "Simulateur de prêt",
        description: "Estimez vos mensualités",
        amountMin: "500K",
        amountMax: "50M",
        termMin: "6 mois",
        termMax: "60 mois",
      },
      totals: {
        totalPayment: "Paiement total",
        totalInterest: "Intérêts totaux",
        principal: "Capital",
      },
      termOptions: {
        "12": "12 mois",
        "18": "18 mois",
        "24": "24 mois",
        "36": "36 mois",
        "48": "48 mois",
      },
      purposeOptions: {
        workingCapital: "Fonds de roulement",
        equipment: "Achat d'équipement",
        inventory: "Financement du stock",
        expansion: "Expansion de l'entreprise",
        other: "Autre",
      },
    },
    analytics: {
      subtitle: "Suivez vos performances financières et vos insights",
      download: "Exporter",
      downloadSuccess: "téléchargé avec succès",
      range: {
        lastMonth: "Dernier mois",
        last3Months: "3 derniers mois",
        last6Months: "6 derniers mois",
        lastYear: "Année écoulée",
        all: "Depuis le début",
      },
      metrics: {
        totalRevenue: "Chiffre d'affaires",
        netProfit: "Résultat net",
        profitMargin: "Marge bénéficiaire",
        operatingExpenses: "Charges d'exploitation",
        roi: "ROI",
        cashFlow: "Flux de trésorerie",
      },
      charts: {
        revenueVsExpenses: {
          title: "Revenus vs Dépenses",
          description: "Comparaison mensuelle des revenus et des coûts",
          labels: {
            revenue: "Revenus",
            expenses: "Dépenses",
          },
        },
        profitMargin: {
          title: "Évolution de la marge",
          description: "Pourcentage de marge bénéficiaire mensuel",
          label: "% marge bénéficiaire",
        },
        loanPerformance: {
          title: "Performance du portefeuille de prêts",
          description: "Suivez décaissements, remboursements et encours",
          labels: {
            disbursed: "Décaissé",
            repaid: "Remboursé",
            outstanding: "Encours",
          },
        },
        monthlyComparison: {
          title: "Comparaison mois sur mois",
          description: "{current} vs {previous}",
          currentPeriod: "Décembre 2025",
          previousPeriod: "Novembre 2025",
          metrics: {
            revenue: "Revenus",
            expenses: "Dépenses",
            netProfit: "Résultat net",
            loansDisbursed: "Prêts décaissés",
            repayments: "Remboursements",
            defaultRate: "Taux de défaut",
          },
        },
      },
      reports: {
        title: "Exporter les rapports",
        description: "Téléchargez vos rapports financiers",
        items: {
          financialSummary: {
            name: "Synthèse financière",
        description: "Vue d'ensemble complète",
            format: "PDF",
          },
          loanPortfolio: {
            name: "Portefeuille de prêts",
            description: "Analyse détaillée des prêts",
            format: "Excel",
          },
          cashFlowStatement: {
            name: "Flux de trésorerie",
            description: "Rapport de trésorerie mensuel",
            format: "PDF",
          },
          taxReport: {
            name: "Rapport fiscal",
            description: "Documentation fiscale annuelle",
            format: "PDF",
          },
        },
      },
    },
    mobileMoney: {
      title: "Fournisseurs connectés",
      description: "Vos comptes Mobile Money liés",
      balance: "Solde",
      transactions: "Transactions",
      sync: "Synchroniser",
      addProvider: {
        button: "Ajouter un fournisseur",
        title: "Ajouter un fournisseur Mobile Money",
        description: "Connectez un nouveau compte Mobile Money pour suivre les transactions",
        typeLabel: "Type de fournisseur",
        typePlaceholder: "Sélectionner le type",
        nameLabel: "Nom du fournisseur",
        namePlaceholder: "Ex: Wave, Orange Money",
        accountLabel: "Numéro de compte",
        accountPlaceholder: "+221 77 123 45 67",
        submit: "Ajouter",
        other: "Autre",
      },
      overview: {
        totalBalance: "Solde total",
        incoming: "Entrées",
        outgoing: "Sorties",
        pending: "En attente",
        thisMonth: "Ce mois-ci",
        transactionsCount: "{count} transactions",
      },
    },
    notifications: {
      title: "Notifications",
      empty: "Aucune notification",
      markAllRead: "Tout marquer comme lu",
      markRead: "Marquer comme lu",
      clearAll: "Tout effacer",
      loanApproved: {
        title: "Prêt approuvé",
        message: "Votre demande de prêt L-001 a été approuvée",
      },
      paymentReceived: {
        title: "Paiement reçu",
        message: "Vous avez reçu 50 000 FCFA de Mamadou Ndiaye",
      },
      paymentDue: {
        title: "Paiement à venir",
        message: "Votre prochain paiement de 1 250 FCFA est dû dans 3 jours",
      },
    },
    profile: {
      viewProfile: "Voir le profil",
      settings: "Paramètres",
      changePassword: "Changer le mot de passe",
      changePasswordDescription: "Mettez à jour le mot de passe de votre compte",
      currentPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      passwordChanged: "Mot de passe modifié avec succès",
      editInstitution: "Modifier l'institution/entreprise",
      loginHistory: "Historique de connexion",
      updated: "Profil mis à jour avec succès",
    },
    onboarding: {
      header: {
        title: "Informations générales sur la société",
        description: "Collectez les données d'identification de la personne morale pour l'inscription",
      },
      form: {
        cardTitle: "Formulaire d'inscription",
        cardDescription: "Veuillez remplir tous les champs requis avec précision",
        sections: {
          companyIdentity: "Identité de l'entreprise",
          contact: "Coordonnées",
        },
        fields: {
          companyName: {
            label: "Raison sociale *",
            placeholder: "Société Mafalia SAS",
            helper: "Nom officiel de l'entreprise",
          },
          legalForm: {
            label: "Forme juridique *",
            placeholder: "Sélectionner...",
            helper: "SARL, SA, SAS, GIE, Coopérative, etc.",
            options: {
              sarl: "SARL",
              sa: "SA",
              sas: "SAS",
              gie: "GIE",
              cooperative: "Coopérative",
            },
          },
          registrationNumber: {
            label: "Numéro d'immatriculation *",
            placeholder: "SN.DKR.2024.A.10842",
            helper: "RCCM ou équivalent",
          },
          taxId: {
            label: "Numéro fiscal (NINEA) *",
            placeholder: "009876543N",
            helper: "Identifiant fiscal unique",
          },
          creationDate: {
            label: "Date de création *",
            helper: "Date figurant au registre",
          },
          businessPurpose: {
            label: "Objet social *",
            placeholder: "Services numériques et financiers",
            helper: "Activité principale de l'entreprise",
          },
          address: {
            label: "Adresse du siège social *",
            placeholder: "Immeuble Djaraf Jaraff, Point E, Dakar, Sénégal",
            helper: "Adresse complète (ville, pays, code postal)",
          },
          email: {
            label: "Email professionnel *",
            placeholder: "contact@mafalia.com",
            helper: "Email de contact officiel",
          },
          phone: {
            label: "Téléphone professionnel *",
            placeholder: "+221 78 209 2780",
            helper: "Numéro de la société",
          },
          website: {
            label: "Site web (facultatif)",
            placeholder: "www.mafalia.com",
            helper: "URL de l'entreprise",
          },
        },
        actions: {
          saveDraft: "Enregistrer comme brouillon",
          submit: "Soumettre l'inscription",
        },
      },
      infoCard: {
        title: "Sécurité et confidentialité",
        description:
          "Toutes vos informations sont cryptées et stockées en toute sécurité. Nous respectons les normes de conformité RGPD et les réglementations locales du Sénégal.",
      },
    },
    auth: {
      common: {
        passwordMismatch: "Les mots de passe ne correspondent pas",
        genericError: "Une erreur s'est produite",
      },
      signOut: "Déconnexion",
      login: {
        brandTitle: "Votre finance, plus simple.",
        brandDescription:
          "Accédez à votre tableau de bord, suivez vos flux de trésorerie et obtenez un scoring précis pour votre institution.",
        title: "Connexion",
        description: "Renseignez votre institution de crédit pour accéder à Mafalia",
        institutionLabel: "Institution de crédit *",
        institutionPlaceholder: "Ex: Al Rahma",
        nameLabel: "Nom complet *",
        namePlaceholder: "Ex: Jean Dupont",
        emailLabel: "Email *",
        emailPlaceholder: "vous@exemple.com",
        passwordLabel: "Mot de passe *",
        forgotPassword: "Mot de passe oublié ?",
        submit: "Se connecter",
        submitting: "Connexion...",
        terms: "En vous connectant, vous acceptez nos conditions.",
      },
      success: {
        title: "Vérifiez votre email",
        description: "Confirmez votre compte pour continuer",
        body:
          "Nous avons envoyé un email de confirmation à votre adresse. Veuillez cliquer sur le lien dans l'email pour activer votre compte.",
      },
      error: {
        title: "Erreur d'authentification",
        fallback: "Une erreur s'est produite lors de l'authentification.",
        code: "Code d'erreur : {code}",
      },
    },
  } satisfies TranslationDictionary,
}

const FALLBACK_LANGUAGE: Language = "en"

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getNestedTranslation(dictionary: TranslationDictionary | undefined, key: string): string | undefined {
  if (!dictionary) return undefined
  return key
    .split(".")
    .reduce<unknown>((acc, segment) => (typeof acc === "object" && acc !== null ? (acc as Record<string, unknown>)[segment] : undefined), dictionary) as
    | string
    | undefined
}

function applyReplacements(message: string, replacements?: TranslationReplacements): string {
  if (!replacements) return message
  return message.replace(/\{(.*?)\}/g, (match, token) => {
    const value = replacements[token]
    return value !== undefined ? String(value) : match
  })
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "fr"
    }

    const stored = window.localStorage.getItem("mafalia-language") as Language | null
    if (stored === "en" || stored === "fr") {
      return stored
    }

    const browserLang = window.navigator.language.toLowerCase()
    return browserLang.startsWith("fr") ? "fr" : "en"
  })

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
    }
  }, [language])

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      window.localStorage.setItem("mafalia-language", lang)
    }
  }

  const t = useMemo(
    () =>
      (key: string, replacements?: TranslationReplacements) => {
        const primary = getNestedTranslation(translations[language], key)
        if (typeof primary === "string") {
          return applyReplacements(primary, replacements)
        }

        const fallback = getNestedTranslation(translations[FALLBACK_LANGUAGE], key)
        return typeof fallback === "string" ? applyReplacements(fallback, replacements) : key
      },
    [language],
  )

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
