"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo, Suspense, useEffect } from "react"
import * as THREE from "three"

// ── Sunset galaxy ─────────────────────────────────────────────────────────────
function Galaxy() {
  const ref = useRef<THREE.Points>(null)
  const COUNT = 4000
  const ARMS  = 3

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)
    // Sunset palette
    const c1 = new THREE.Color("#FF7E5F") // coral
    const c2 = new THREE.Color("#FF6B9D") // hot pink
    const c3 = new THREE.Color("#9B5DE5") // violet

    for (let i = 0; i < COUNT; i++) {
      const arm   = i % ARMS
      const t     = (i / COUNT) * Math.PI * 12
      const r     = 2 + (i / COUNT) * 16
      const spin  = r * 0.35
      const angle = t + (arm * (Math.PI * 2)) / ARMS + spin

      const rand  = (Math.pow(Math.random(), 3) - 0.5) * 2
      const randX = rand * (1 - r * 0.04) * 1.5
      const randY = (Math.random() - 0.5) * 2.5
      const randZ = rand * (1 - r * 0.04) * 1.5

      pos[i * 3]     = Math.cos(angle) * r + randX
      pos[i * 3 + 1] = randY
      pos[i * 3 + 2] = Math.sin(angle) * r + randZ - 14

      const c = arm === 0 ? c1 : arm === 1 ? c2 : c3
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.018
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]}    attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors sizeAttenuation transparent opacity={0.85} />
    </points>
  )
}

// ── Coral glowing nodes ───────────────────────────────────────────────────────
function TechNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const COUNT   = 70
  const dummy   = useMemo(() => new THREE.Object3D(), [])
  const data    = useMemo(
    () => Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 22,
      y: (Math.random() - 0.5) * 12,
      z: -2 - Math.random() * 10,
      speed: 0.15 + Math.random() * 0.4,
      offset: Math.random() * Math.PI * 2,
      scale: 0.05 + Math.random() * 0.1,
    })),
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    data.forEach((p, i) => {
      const pulse = Math.sin(t * p.speed + p.offset)
      dummy.position.set(p.x, p.y + pulse * 0.4, p.z)
      dummy.scale.setScalar(p.scale + pulse * 0.01)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current!.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#FFB088" emissive="#FF7E5F" emissiveIntensity={2.5} toneMapped={false} />
    </instancedMesh>
  )
}

// ── Violet accent nodes ───────────────────────────────────────────────────────
function VioletNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const COUNT   = 40
  const dummy   = useMemo(() => new THREE.Object3D(), [])
  const data    = useMemo(
    () => Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 22,
      y: (Math.random() - 0.5) * 12,
      z: -5 - Math.random() * 8,
      speed: 0.1 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
      scale: 0.03 + Math.random() * 0.07,
    })),
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    data.forEach((p, i) => {
      const pulse = Math.sin(t * p.speed + p.offset)
      dummy.position.set(p.x, p.y + pulse * 0.3, p.z)
      dummy.scale.setScalar(p.scale + pulse * 0.007)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current!.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#C99BF0" emissive="#9B5DE5" emissiveIntensity={2.5} toneMapped={false} />
    </instancedMesh>
  )
}

// ── Warm wireframe objects ────────────────────────────────────────────────────
function WireframeObjects() {
  const icoRef   = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const octaRef  = useRef<THREE.Mesh>(null)
  const ringRef  = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (icoRef.current)   { icoRef.current.rotation.x   = t * 0.07; icoRef.current.rotation.y   = t * 0.1  }
    if (torusRef.current) { torusRef.current.rotation.x  = t * 0.05; torusRef.current.rotation.z  = t * 0.08 }
    if (octaRef.current)  { octaRef.current.rotation.y   = t * 0.09; octaRef.current.rotation.x   = t * 0.05 }
    if (ringRef.current)  { ringRef.current.rotation.y   = t * 0.04; ringRef.current.rotation.x   = 0.3      }
  })

  return (
    <>
      <mesh ref={icoRef}   position={[-9, 3, -6]}>
        <icosahedronGeometry args={[3, 1]} />
        <meshBasicMaterial color="#FF7E5F" wireframe transparent opacity={0.13} />
      </mesh>
      <mesh ref={torusRef} position={[9.5, -3, -8]}>
        <torusKnotGeometry args={[2.2, 0.6, 100, 10]} />
        <meshBasicMaterial color="#FF6B9D" wireframe transparent opacity={0.11} />
      </mesh>
      <mesh ref={octaRef}  position={[1, -6, -12]}>
        <octahedronGeometry args={[3.5, 0]} />
        <meshBasicMaterial color="#9B5DE5" wireframe transparent opacity={0.09} />
      </mesh>
      <mesh ref={ringRef}  position={[0, 0, -14]}>
        <torusGeometry args={[12, 0.08, 6, 100]} />
        <meshBasicMaterial color="#FFB088" transparent opacity={0.10} />
      </mesh>
    </>
  )
}

// ── Warm glass panels ─────────────────────────────────────────────────────────
const PANELS = [
  { x: -7, y: 2,    z: -5,  rx: 0.2,  ry: 0.3,   w: 3.5, h: 2.2, s: 0.13, o: 0   },
  { x:  7, y: -1,   z: -6,  rx: -0.1, ry: -0.35, w: 2.8, h: 3.2, s: 0.1,  o: 1.5 },
  { x: -2, y: -3.5, z: -9,  rx: 0.35, ry: 0.1,   w: 4.5, h: 2,   s: 0.08, o: 3   },
  { x:  5, y: 3.5,  z: -4,  rx: -0.25,ry: 0.2,   w: 2.2, h: 2.8, s: 0.15, o: 4.5 },
]

function GlassPanels() {
  const refs  = useRef<(THREE.Mesh | null)[]>([])
  const eRefs = useRef<(THREE.LineSegments | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    PANELS.forEach((p, i) => {
      const m  = refs.current[i]
      const e  = eRefs.current[i]
      const dy = Math.sin(t * p.s + p.o) * 0.55
      const rx = p.rx + Math.sin(t * p.s + p.o) * 0.07
      const ry = p.ry + Math.cos(t * p.s * 0.7 + p.o) * 0.09
      if (m) { m.position.y = p.y + dy; m.rotation.x = rx; m.rotation.y = ry }
      if (e) { e.position.y = p.y + dy; e.rotation.x = rx; e.rotation.y = ry }
    })
  })

  return (
    <>
      {PANELS.map((p, i) => (
        <group key={i}>
          <mesh ref={(el) => { refs.current[i] = el }} position={[p.x, p.y, p.z]} rotation={[p.rx, p.ry, 0]}>
            <planeGeometry args={[p.w, p.h]} />
            <meshStandardMaterial color="#FFB088" transparent opacity={0.07} side={THREE.DoubleSide} metalness={0.4} roughness={0.2} />
          </mesh>
          <lineSegments ref={(el) => { eRefs.current[i] = el as THREE.LineSegments | null }} position={[p.x, p.y, p.z]} rotation={[p.rx, p.ry, 0]}>
            <edgesGeometry args={[new THREE.PlaneGeometry(p.w, p.h)]} />
            <lineBasicMaterial color="#FF7E5F" transparent opacity={0.18} />
          </lineSegments>
        </group>
      ))}
    </>
  )
}

// ── Warm grid plane ───────────────────────────────────────────────────────────
function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = -7 + Math.sin(clock.getElapsedTime() * 0.1) * 0.3
  })
  return (
    <gridHelper ref={ref} args={[60, 40, "#FFD4C2", "#FFF0E8"]} position={[0, -7, -8]} />
  )
}

// ── Sunset drifting lights ────────────────────────────────────────────────────
function DynamicLights() {
  const pRef = useRef<THREE.PointLight>(null)
  const kRef = useRef<THREE.PointLight>(null)
  const gRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (pRef.current) {
      pRef.current.position.set(Math.sin(t * 0.28) * 10, Math.cos(t * 0.18) * 5, 4)
      pRef.current.intensity = 45 + Math.sin(t * 0.5) * 8
    }
    if (kRef.current) {
      kRef.current.position.set(Math.cos(t * 0.22) * 9, Math.sin(t * 0.14) * 5, 3)
      kRef.current.intensity = 35 + Math.sin(t * 0.4 + 1) * 6
    }
    if (gRef.current) {
      gRef.current.position.set(Math.sin(t * 0.16 + 2) * 7, Math.cos(t * 0.24) * 4, 2)
      gRef.current.intensity = 22 + Math.sin(t * 0.6 + 2) * 5
    }
  })

  return (
    <>
      <ambientLight intensity={0.55} color="#FFF8F3" />
      <pointLight ref={pRef} color="#FF7E5F" intensity={45} distance={30} decay={2} />
      <pointLight ref={kRef} color="#FF6B9D" intensity={35} distance={26} decay={2} />
      <pointLight ref={gRef} color="#F9C74F" intensity={22} distance={20} decay={2} />
      <pointLight position={[0, 2, 5]} color="#9B5DE5" intensity={14} />
    </>
  )
}

// ── Mouse-responsive camera ───────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree()
  const tx = useRef(0)
  const ty = useRef(0)
  const mx = useRef(0)
  const my = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current =  (e.clientX / window.innerWidth)  * 2 - 1
      my.current = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useFrame(() => {
    tx.current += (mx.current * 2.2 - tx.current) * 0.035
    ty.current += (my.current * 1.2 - ty.current) * 0.035
    camera.position.x = tx.current
    camera.position.y = ty.current
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── Fade-in group ─────────────────────────────────────────────────────────────
function SceneContent() {
  const groupRef = useRef<THREE.Group>(null)
  const startRef = useRef<number | null>(null)

  useFrame(({ clock }) => {
    if (startRef.current === null) startRef.current = clock.getElapsedTime()
    const t = Math.min((clock.getElapsedTime() - startRef.current) / 2, 1)
    if (groupRef.current) groupRef.current.scale.setScalar(0.9 + t * 0.1)
  })

  return (
    <group ref={groupRef}>
      <DynamicLights />
      <Galaxy />
      <TechNodes />
      <VioletNodes />
      <GlassPanels />
      <WireframeObjects />
      <GridFloor />
    </group>
  )
}

export default function Scene() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 9], fov: 56 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <CameraRig />
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  )
}
