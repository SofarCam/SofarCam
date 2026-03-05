import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingOrb({ mouse }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    // Gentle float
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.15
    meshRef.current.rotation.x = t * 0.12
    meshRef.current.rotation.z = t * 0.08
    // Mouse follow — subtle
    meshRef.current.rotation.y += (mouse.current[0] * 0.5 - meshRef.current.rotation.y) * 0.04
    meshRef.current.position.x += (mouse.current[0] * 0.4 - meshRef.current.position.x) * 0.03
    meshRef.current.position.z += (mouse.current[1] * 0.2 - meshRef.current.position.z) * 0.03
  })

  return (
    <Sphere ref={meshRef} args={[1.2, 128, 128]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#7c3aed"
        attach="material"
        distort={0.45}
        speed={2.5}
        roughness={0}
        metalness={0.1}
        transparent
        opacity={0.85}
        envMapIntensity={1}
      />
    </Sphere>
  )
}

function InnerGlow({ mouse }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.position.y = Math.sin(t * 0.4 + 1) * 0.1
    meshRef.current.rotation.x = -t * 0.08
    meshRef.current.rotation.z = t * 0.12
    meshRef.current.position.x += (mouse.current[0] * 0.35 - meshRef.current.position.x) * 0.025
  })

  return (
    <Sphere ref={meshRef} args={[0.75, 64, 64]} position={[0, 0, 0.3]}>
      <MeshDistortMaterial
        color="#06b6d4"
        attach="material"
        distort={0.6}
        speed={3}
        roughness={0}
        metalness={0}
        transparent
        opacity={0.5}
      />
    </Sphere>
  )
}

function ParticleRing() {
  const pointsRef = useRef()
  const count = 800

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.8 + Math.random() * 1.2
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.06
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#7c3aed" />
      <pointLight position={[-5, -3, -3]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[0, 0, 4]} intensity={0.5} color="#f9a8d4" />
      <FloatingOrb mouse={mouse} />
      <InnerGlow mouse={mouse} />
      <ParticleRing />
    </>
  )
}

export default function HeroScene({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Scene mouse={mouse} />
    </Canvas>
  )
}
