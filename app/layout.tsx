import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { Toaster } from "@/components/ui/toaster"
import { ErrorSuppressor } from "@/components/error-suppressor"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Mafalia - Your Smart Finance Platform",
  description: "AI-powered credit scoring and loan management platform for businesses",
  generator: "v0.app",
  icons: {
    icon: "/mafalia-logo.png",
    shortcut: "/mafalia-logo.png",
    apple: "/mafalia-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ErrorSuppressor />
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
