"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navigation showContent={showContent} />
      <main>
        <HeroSection showContent={showContent} onGetStarted={() => setShowContent(true)} />
        {showContent && (
          <>
            <FeaturesSection />
            <StatsSection />
            <CTASection />
          </>
        )}
      </main>
      {showContent && <Footer />}
    </div>
  )
}
