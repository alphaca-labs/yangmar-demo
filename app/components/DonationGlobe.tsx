'use client'

import { Suspense, useRef, useMemo, Component, ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box } from '@react-three/drei'
import * as THREE from 'three'

// Error Boundary for Three.js / WASM issues on static hosting
class GlobeErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function Sock({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  const velocity = useRef(Math.random() * 0.02 + 0.005)
  const targetY = useRef(-2.5 + Math.random() * 1.5)

  useFrame(() => {
    if (ref.current) {
      if (ref.current.position.y > targetY.current) {
        ref.current.position.y -= velocity.current
      }
      ref.current.rotation.x += 0.002
      ref.current.rotation.z += 0.001
    }
  })

  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[0.15, 0.3, 0.08]} />
      <meshStandardMaterial color={color} />
    </mesh>
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
    const displayCount = Math.min(sockCount, 100)
    
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

      {/* 양말들 (CSS-like gravity animation, no WASM physics) */}
      {socks.map((sock) => (
        <Sock key={sock.id} position={sock.position} color={sock.color} />
      ))}
    </group>
  )
}

function GlobeFallback() {
  return (
    <div className="w-full h-[400px] md:h-[600px] bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center justify-center rounded-lg">
      <div className="text-8xl mb-4 animate-bounce">🧦</div>
      <p className="text-gray-500 text-lg font-medium">기부통에 양말이 쌓이는 중...</p>
      <p className="text-gray-400 text-sm mt-2">50켤레 기부 완료!</p>
    </div>
  )
}

export default function DonationGlobe({ sockCount = 50, className = '' }: { sockCount?: number; className?: string }) {
  return (
    <GlobeErrorBoundary fallback={<GlobeFallback />}>
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
    </GlobeErrorBoundary>
  )
}
