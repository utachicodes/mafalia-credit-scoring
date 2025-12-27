'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { Mesh } from 'three'
import { OrbitControls, Text3D, Center } from '@react-three/drei'

function DollarSign3D() {
  const meshRef = useRef<Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={6}
          height={0.8}
          weight={78}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.1}
          bevelSize={0.1}
          bevelOffset={0}
          bevelSegments={5}
          levelSpacing={334}
          depth={2}
        >
          $
          <meshStandardMaterial color="#E31E24" metalness={0.9} roughness={0.1} emissive="#E31E24" emissiveIntensity={0.3} />
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
        camera={{ position: [0, 0, 10], fov: 50 }} 
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
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} />
        <pointLight position={[0, 0, 5]} intensity={0.5} />
        <DollarSign3D />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  )
}

