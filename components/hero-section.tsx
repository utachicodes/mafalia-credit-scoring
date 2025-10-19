"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { ArrowRight, Shield, Zap, Award } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Text3D, Center } from "@react-three/drei"
import { Suspense } from "react"

function FCFASign3D() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
      <Center>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
          size={3.5}
          height={0.6}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.04}
          bevelOffset={0}
          bevelSegments={12}
        >
          $
          <meshStandardMaterial
            color="#E31E24"
            metalness={0.95}
            roughness={0.05}
            emissive="#E31E24"
            emissiveIntensity={0.4}
          />
        </Text3D>
      </Center>
    </Float>
  )
}

interface HeroSectionProps {
  showContent: boolean
  onGetStarted: () => void
}

export function HeroSection({ showContent, onGetStarted }: HeroSectionProps) {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 via-primary/5 to-transparent animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="flex flex-col justify-center space-y-10 animate-in fade-in slide-in-from-left duration-700">
            <div className="space-y-6">
              <h1 className="text-balance text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
                <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                  {t("hero.title")}
                </span>
              </h1>

              <p className="text-pretty text-xl text-muted-foreground md:text-2xl leading-relaxed max-w-xl">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span>Sécurisé & Conforme</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <span>Décision en 2min</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <span>IA Avancée</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all"
                onClick={() => {
                  onGetStarted()
                  window.location.href = "/dashboard"
                }}
              >
                {t("hero.cta.primary")}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-2 hover:bg-primary/5 hover:border-primary hover:scale-105 transition-all bg-transparent"
              >
                {t("hero.cta.secondary")}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div className="group cursor-default">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  98%
                </div>
                <div className="text-sm text-muted-foreground mt-1">Précision IA</div>
              </div>
              <div className="group cursor-default">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground mt-1">Support</div>
              </div>
              <div className="group cursor-default">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  5k+
                </div>
                <div className="text-sm text-muted-foreground mt-1">Entreprises</div>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] lg:h-[700px] animate-in fade-in slide-in-from-right duration-700 delay-300">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 8], fov: 45 }}
              gl={{
                powerPreference: "high-performance",
                antialias: true,
                preserveDrawingBuffer: false,
                failIfMajorPerformanceCaveat: false,
              }}
              onCreated={(state: any) => {
                const canvas = state?.gl?.domElement as HTMLCanvasElement | undefined
                if (!canvas) return
                const handleContextLost = (e: Event) => {
                  e.preventDefault()
                }
                canvas.addEventListener("webglcontextlost", handleContextLost as EventListener, false)
              }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <spotLight position={[15, 15, 15]} angle={0.2} penumbra={1} intensity={2} castShadow />
                <spotLight position={[-15, -15, -15]} angle={0.2} penumbra={1} intensity={0.8} color="#E31E24" />
                <pointLight position={[0, 8, 8]} intensity={1.5} color="#E31E24" />
                <pointLight position={[0, -8, -8]} intensity={0.8} color="#ffffff" />
                <FCFASign3D />
                <Environment preset="city" />
                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={1.5}
                  enablePan={false}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.5}
                />
              </Suspense>
            </Canvas>

            <div className="absolute inset-0 -z-10 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
