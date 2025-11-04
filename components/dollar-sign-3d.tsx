'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { OrbitControls, Text3D, Center, useMatcapTexture } from '@react-three/drei'

function DollarSign3D() {
  const meshRef = useRef<Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  const [matcapTexture] = useMatcapTexture('7B7BDA_4D43BC_5496CF_1F78DA', 1024)

  return (
    <mesh ref={meshRef}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={1.5}
          height={0.2}
          weight={78}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          levelSpacing={334}
          depth={1}
        >
          $
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>
    </mesh>
  )
}

export function DollarSign3DScene() {
  return (
    <div>
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <DollarSign3D />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  )
}

