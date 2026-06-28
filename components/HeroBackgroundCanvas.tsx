"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useReducedMotion } from "framer-motion"

// ── GLSL ──────────────────────────────────────────────────────────────────────

const GRAD_VERT = `
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const GRAD_FRAG = `
uniform float uTime;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p  = p * 2.1 + vec2(5.2, 1.3);
    a *= 0.5;
  }
  return v;
}

void main() {
  float t  = uTime * 0.03;
  vec2  uv = vUv;

  // Double domain warp — organic flowing light
  vec2  q = vec2(fbm(uv * 1.4 + t),
                 fbm(uv * 1.4 + vec2(3.2, 1.7) + t * 0.7));
  float f = fbm(uv * 1.4 + q * 0.65 + t * 0.4);

  // Sunset palette
  vec3 cream  = vec3(1.000, 0.961, 0.933);
  vec3 peach  = vec3(1.000, 0.898, 0.851);
  vec3 coral  = vec3(1.000, 0.541, 0.420);
  vec3 pink   = vec3(1.000, 0.435, 0.659);
  vec3 violet = vec3(0.647, 0.420, 0.878);

  // Right-side guard: rich color only on right, left stays pale
  float right = smoothstep(0.0, 0.70, uv.x);
  float n     = clamp(f, 0.0, 1.0);

  vec3 col = mix(cream, peach, smoothstep(0.30, 0.60, n));
  col = mix(col, coral,  smoothstep(0.50, 0.75, n) * right);
  col = mix(col, pink,   smoothstep(0.65, 0.85, n) * right);
  col = mix(col, violet, smoothstep(0.80, 1.00, n) * right * 0.55);

  // Floor: never darker than warm pale rose — keeps it light
  col = max(col, vec3(0.88, 0.84, 0.88));

  gl_FragColor = vec4(col, 1.0);
}
`

const ORB_VERT = `
attribute vec3 aColor;
varying vec2  vUv;
varying vec3  vColor;
void main() {
  vUv    = uv;
  vColor = aColor;
  vec4 worldPos = instanceMatrix * vec4(position, 1.0);
  gl_Position   = projectionMatrix * modelViewMatrix * worldPos;
}
`

const ORB_FRAG = `
varying vec2 vUv;
varying vec3 vColor;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float a = (1.0 - smoothstep(0.0, 1.0, d * d)) * 0.17;
  if (a < 0.004) discard;
  gl_FragColor = vec4(vColor, a);
}
`

// ── Gradient mesh (clip-space, camera-independent) ────────────────────────────

function GradientMesh({ frozen }: { frozen: boolean }) {
  const matRef   = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame(({ clock }) => {
    if (frozen || !matRef.current) return
    matRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={GRAD_VERT}
        fragmentShader={GRAD_FRAG}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

// ── Floating orbs ─────────────────────────────────────────────────────────────

const PALETTE = [
  new THREE.Color("#FF8A6B"),
  new THREE.Color("#FF6FA8"),
  new THREE.Color("#A56BE0"),
  new THREE.Color("#FFB088"),
]

const ORB_COUNT = 20

function FloatingOrbs({
  frozen,
  mouseRef,
}: {
  frozen: boolean
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy   = useMemo(() => new THREE.Object3D(), [])

  const { orbs, geom, mat } = useMemo(() => {
    const orbs = Array.from({ length: ORB_COUNT }, (_, i) => ({
      x:      (Math.random() - 0.5) * 10,
      y:      (Math.random() - 0.5) * 6,
      z:      -1 - Math.random() * 4,
      speed:  0.10 + Math.random() * 0.15,
      offset: Math.random() * Math.PI * 2,
      scale:  0.55 + Math.random() * 1.1,
      color:  PALETTE[i % PALETTE.length],
    }))

    const colorArr = new Float32Array(ORB_COUNT * 3)
    orbs.forEach((orb, i) => {
      colorArr[i * 3]     = orb.color.r
      colorArr[i * 3 + 1] = orb.color.g
      colorArr[i * 3 + 2] = orb.color.b
    })

    const geom = new THREE.PlaneGeometry(1, 1)
    geom.setAttribute("aColor", new THREE.InstancedBufferAttribute(colorArr, 3))

    const mat = new THREE.ShaderMaterial({
      vertexShader:   ORB_VERT,
      fragmentShader: ORB_FRAG,
      transparent:    true,
      depthWrite:     false,
      blending:       THREE.NormalBlending,
    })

    return { orbs, geom, mat }
  }, [])

  // Dispose GPU resources on unmount
  useEffect(() => () => { geom.dispose(); mat.dispose() }, [geom, mat])

  useFrame(({ clock, camera }) => {
    if (!meshRef.current) return
    const t  = frozen ? 0 : clock.getElapsedTime()
    const mx = mouseRef.current.x * 0.15
    const my = mouseRef.current.y * 0.10

    orbs.forEach((orb, i) => {
      const x = orb.x + Math.cos(t * orb.speed * 0.7 + orb.offset) * 0.35 + mx
      const y = orb.y + Math.sin(t * orb.speed       + orb.offset) * 0.50 + my
      dummy.position.set(x, y, orb.z)
      dummy.scale.setScalar(orb.scale)
      dummy.quaternion.copy(camera.quaternion) // billboard toward camera
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return <instancedMesh ref={meshRef} args={[geom, mat, ORB_COUNT]} />
}

// ── Mouse parallax ref (passive, no re-renders) ───────────────────────────────

function useMouseRef() {
  const ref = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      ref.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
      ref.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", fn, { passive: true })
    return () => window.removeEventListener("mousemove", fn)
  }, [])
  return ref
}

// ── Scene root ────────────────────────────────────────────────────────────────

function Scene({ frozen }: { frozen: boolean }) {
  const mouseRef = useMouseRef()
  return (
    <>
      <GradientMesh frozen={frozen} />
      <FloatingOrbs frozen={frozen} mouseRef={mouseRef} />
    </>
  )
}

// ── Canvas export ─────────────────────────────────────────────────────────────

export default function HeroBackgroundCanvas() {
  const frozen = !!useReducedMotion()
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color("#FFF8F3"), 1)}
      style={{ display: "block", width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <Scene frozen={frozen} />
    </Canvas>
  )
}
