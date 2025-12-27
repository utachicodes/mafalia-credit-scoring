'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { Mesh } from 'three'
import { OrbitControls, Text3D, Center } from '@react-three/drei'

function DollarSign3D() {
  const meshRef = useRef<Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth continuous rotation
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  return (
    <mesh ref={meshRef}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={12}
          height={2}
          weight={78}
          curveSegments={16}
          bevelEnabled
          bevelThickness={0.3}
          bevelSize={0.3}
          bevelOffset={0}
          bevelSegments={8}
          levelSpacing={334}
          depth={3}
        >
          $
          <meshStandardMaterial color="#E31E24" metalness={0.95} roughness={0.05} emissive="#E31E24" emissiveIntensity={0.4} />
        </Text3D>
      </Center>
    </mesh>
  )
}

export function DollarSign3DScene() {
  const [hasError, setHasError] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault()
      // Suppress console error - just handle it silently
      setHasError(true)
    }

    const handleContextRestored = () => {
      // Suppress console log
      setHasError(false)
    }

    // Wait for canvas to be available
    const timer = setTimeout(() => {
      const canvas = canvasRef.current?.querySelector('canvas')
      if (canvas) {
        canvas.addEventListener('webglcontextlost', handleContextLost)
        canvas.addEventListener('webglcontextrestored', handleContextRestored)
      }
    }, 200)

    // Also listen on window for context lost events (global handler)
    window.addEventListener('webglcontextlost', handleContextLost)
    window.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      clearTimeout(timer)
      const canvas = canvasRef.current?.querySelector('canvas')
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      }
      window.removeEventListener('webglcontextlost', handleContextLost)
      window.removeEventListener('webglcontextrestored', handleContextRestored)
    }
  }, [])

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-9xl font-bold text-primary animate-pulse">$</div>
      </div>
    )
  }

  return (
    <div ref={canvasRef} className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 18], fov: 55 }} 
        className="bg-transparent"
        onError={(error) => {
          // Suppress WebGL context errors - handle silently
          if (error?.message?.includes('Context') || error?.message?.includes('WebGL')) {
            setHasError(true)
            return
          }
          console.error('Canvas error:', error)
          setHasError(true)
        }}
        gl={{ 
          preserveDrawingBuffer: false,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          onContextLost: () => {
            setHasError(true)
          }
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} />
        <pointLight position={[0, 0, 10]} intensity={0.8} />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.6} penumbra={1} />
        <DollarSign3D />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} enablePan={false} />
      </Canvas>
    </div>
  )
}

