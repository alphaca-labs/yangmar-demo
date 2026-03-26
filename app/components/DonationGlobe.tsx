'use client'

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box } from '@react-three/drei'
import { Physics, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

function Sock({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <RigidBody position={position} colliders="cuboid">
      <Box args={[0.15, 0.3, 0.08]} castShadow>
        <meshStandardMaterial color={color} />
      </Box>
    </RigidBody>
  )
}

function GlobeContent({ sockCount }: { sockCount: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  const socks = useMemo(() => {
    const colors = ['#000000', '#FFFFFF', '#808080']
    const displayCount = Math.min(sockCount, 100) // 성능을 위해 최대 100개
    
    return Array.from({ length: displayCount }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 2,
        Math.random() * 3 + 2,
        (Math.random() - 0.5) * 2
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
  }, [sockCount])

  return (
    <group ref={groupRef}>
      {/* 투명 구체 */}
      <Sphere args={[3, 32, 32]}>
        <meshPhysicalMaterial
          transparent
          opacity={0.2}
          transmission={0.9}
          thickness={0.5}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* 물리 시뮬레이션 */}
      <Physics gravity={[0, -2, 0]}>
        {/* 바닥 */}
        <RigidBody type="fixed" position={[0, -2.9, 0]}>
          <Box args={[5.8, 0.2, 5.8]}>
            <meshStandardMaterial transparent opacity={0} />
          </Box>
        </RigidBody>

        {/* 양말들 */}
        {socks.map((sock) => (
          <Sock key={sock.id} position={sock.position} color={sock.color} />
        ))}
      </Physics>
    </group>
  )
}

export default function DonationGlobe({ sockCount = 50, className = '' }: { sockCount?: number; className?: string }) {
  return (
    <div className={`w-full h-[400px] md:h-[600px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <GlobeContent sockCount={sockCount} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
