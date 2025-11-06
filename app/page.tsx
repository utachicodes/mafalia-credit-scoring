"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PartnersStrip } from "@/components/partners-strip"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  const [showContent, setShowContent] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <Navigation showContent={false} />
      <main>
        <HeroSection showContent={showContent} onGetStarted={() => setShowContent(true)} />
        <PartnersStrip />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
