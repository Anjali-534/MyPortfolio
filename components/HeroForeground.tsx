"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import {
  motion, useMotionValue, useTransform, useSpring, useInView,
  useReducedMotion, type Variants,
} from "framer-motion"
import Image from "next/image"
import { profile, metrics } from "@/data"

const CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Derived from data.ts profile.stack
const ORBIT_LABELS = [
  ...profile.stack.split(" · "),
  "TypeScript", "PostgreSQL", "Docker",
].slice(0, 8)

// ── Animated count-up ─────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, enabled = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!enabled) return
    let start: number | null = null
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
      else setValue(target)
    }
    requestAnimationFrame(tick)
  }, [target, duration, enabled])
  return value
}

// ── Metric card ───────────────────────────────────────────────────────────────
function MetricCard({ count, suffix, label, index }: { count: number; suffix: string; label: string; index: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })
  const displayed = useCountUp(count, 1200 + index * 100, inView)

  const FADE: Variants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 + 0.5, duration: 0.65, ease: CUBIC } },
  }

  return (
    <motion.div
      ref={ref}
      variants={FADE}
      initial="hidden"
      animate="visible"
      className="group flex flex-col items-center gap-1 px-4 py-3.5 rounded-2xl
                 border border-[#2B1B2E]/[0.08] bg-white/60 backdrop-blur-sm
                 hover:border-[#FF7E5F]/35 hover:bg-white/80 transition-all duration-300
                 shadow-sm shadow-[#FF7E5F]/8"
    >
      <span className="text-2xl sm:text-3xl font-bold leading-none tabular-nums
                       bg-gradient-to-br from-[#FF7E5F] via-[#FF6B9D] to-[#9B5DE5] bg-clip-text text-transparent">
        {displayed}{suffix}
      </span>
      <span className="text-[#7A5C6E] text-[11px] font-medium text-center leading-tight">{label}</span>
    </motion.div>
  )
}

// ── CTA button ────────────────────────────────────────────────────────────────
function CTAButton({ href, label, variant, index, download }: {
  href: string; label: string; variant: "primary" | "secondary" | "ghost"; index: number; download?: boolean
}) {
  const FADE: Variants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: index * 0.08 + 0.8, duration: 0.6, ease: CUBIC } },
  }

  const styles = {
    primary:
      "bg-gradient-to-r from-[#FF7E5F] via-[#FF6B9D] to-[#9B5DE5] text-white shadow-lg shadow-[#FF7E5F]/30 hover:shadow-[#FF7E5F]/50",
    secondary:
      "border border-[#2B1B2E]/15 text-[#2B1B2E]/80 bg-white/60 backdrop-blur-sm hover:border-[#FF7E5F]/40 hover:text-[#2B1B2E] hover:bg-white/90",
    ghost:
      "text-[#7A5C6E] hover:text-[#2B1B2E] hover:bg-[#2B1B2E]/[0.05]",
  }

  return (
    <motion.a
      variants={FADE}
      initial="hidden"
      animate="visible"
      href={href}
      {...(download ? { download: true } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold
                  transition-all duration-300 px-6 py-2.5 ${styles[variant]}`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.a>
  )
}

// ── Particle assembly reveal (sunset palette) ─────────────────────────────────
function ParticleReveal({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    if (!ctx) return

    const N = 150
    const particles = Array.from({ length: N }, () => {
      const tx = Math.random() * width
      const ty = Math.random() * height
      const angle = Math.random() * Math.PI * 2
      const dist  = 180 + Math.random() * 280
      return {
        sx: tx + Math.cos(angle) * dist,
        sy: ty + Math.sin(angle) * dist,
        tx, ty,
        color: Math.random() > 0.5 ? "#FF7E5F" : "#FF6B9D",
        size:  0.8 + Math.random() * 1.8,
        alpha: 0.7 + Math.random() * 0.3,
      }
    })

    const CONVERGE = 1300
    const FADE     = 700
    const TOTAL    = CONVERGE + FADE
    let t0: number | null = null
    let raf: number

    function frame(ts: number) {
      if (t0 === null) t0 = ts
      const elapsed = ts - t0
      const convP   = Math.min(elapsed / CONVERGE, 1)
      const eased   = 1 - Math.pow(1 - convP, 3)
      const overlay = elapsed > CONVERGE ? Math.max(0, 1 - (elapsed - CONVERGE) / FADE) : 1

      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        const cx = p.sx + (p.tx - p.sx) * eased
        const cy = p.sy + (p.ty - p.sy) * eased
        ctx.save()
        ctx.globalAlpha = p.alpha * overlay
        ctx.shadowBlur  = 10
        ctx.shadowColor = p.color
        ctx.fillStyle   = p.color
        ctx.beginPath()
        ctx.arc(cx, cy, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      if (elapsed < TOTAL) raf = requestAnimationFrame(frame)
      else setGone(true)
    }

    const delay = setTimeout(() => { raf = requestAnimationFrame(frame) }, 80)
    return () => { clearTimeout(delay); cancelAnimationFrame(raf) }
  }, [width, height])

  if (gone) return null
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 z-30 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  )
}

// ── Orbiting tech ring (sunset palette) ───────────────────────────────────────
function OrbitRing({ labels }: { labels: string[] }) {
  const n = labels.length
  return (
    <div
      className="absolute -inset-10 pointer-events-none z-0"
      style={{ perspective: "480px", perspectiveOrigin: "50% 50%" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d", rotateX: -16 }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {labels.map((label, i) => {
          const angle = (i / n) * 360
          return (
            <div
              key={label}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotateY(${angle}deg) translateZ(152px) translateX(-50%) translateY(-50%)`,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <span
                className="block text-[10px] font-bold px-2.5 py-[3px] rounded-full whitespace-nowrap select-none
                           border border-[#FF7E5F]/45 text-[#CC4A2A]"
                style={{
                  background: "rgba(255,248,243,0.95)",
                  boxShadow: "0 0 12px rgba(255,126,95,0.35), inset 0 0 6px rgba(255,126,95,0.08)",
                }}
              >
                {label}
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

// ── 3D Headshot card ──────────────────────────────────────────────────────────
function HeadshotCard() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [imgError,  setImgError]  = useState(false)
  const [mounted,   setMounted]   = useState(false)
  const [isMobile,  setIsMobile]  = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setIsMobile(window.matchMedia("(max-width: 768px)").matches) }, [])

  const showParticles = mounted && !isMobile && !prefersReduced

  const rawMx = useMotionValue(0)
  const rawMy = useMotionValue(0)

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return
    rawMx.set((e.clientX - r.left) / r.width  * 2 - 1)
    rawMy.set((e.clientY - r.top)  / r.height * 2 - 1)
  }, [rawMx, rawMy])
  const onLeave = useCallback(() => { rawMx.set(0); rawMy.set(0) }, [rawMx, rawMy])

  // Layer 1 — glow (slowest)
  const glowX = useSpring(useTransform(rawMx, [-1, 1], [-10, 10]), { stiffness: 55, damping: 18 })
  const glowY = useSpring(useTransform(rawMy, [-1, 1], [-7,   7]), { stiffness: 55, damping: 18 })
  // Layer 2 — card (medium tilt + translate)
  const rotateX = useSpring(useTransform(rawMy, [-1, 1], [13, -13]), { stiffness: 160, damping: 22 })
  const rotateY = useSpring(useTransform(rawMx, [-1, 1], [-13, 13]), { stiffness: 160, damping: 22 })
  const frameX  = useSpring(useTransform(rawMx, [-1, 1], [-5,  5 ]), { stiffness: 110, damping: 20 })
  const frameY  = useSpring(useTransform(rawMy, [-1, 1], [-4,  4 ]), { stiffness: 110, damping: 20 })
  // Layer 3 — badges (fastest)
  const badgeX = useSpring(useTransform(rawMx, [-1, 1], [-18, 18]), { stiffness: 210, damping: 25 })
  const badgeY = useSpring(useTransform(rawMy, [-1, 1], [-13, 13]), { stiffness: 210, damping: 25 })
  // Glare
  const glareX = useTransform(rawMx, [-1, 1], ["0%", "100%"])
  const glareY = useTransform(rawMy, [-1, 1], ["0%", "100%"])

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.55, duration: 0.9, ease: CUBIC }}
      className="relative flex items-center justify-center"
    >
      {/* Layer 1: glow backdrop */}
      <motion.div style={{ x: glowX, y: glowY }} className="absolute -inset-12 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl opacity-40 blur-3xl
                        bg-gradient-to-br from-[#FF7E5F] via-[#FF6B9D] to-[#9B5DE5] animate-pulse" />
      </motion.div>

      <div ref={wrapRef} className="relative" onMouseMove={onMove} onMouseLeave={onLeave}>
        <OrbitRing labels={ORBIT_LABELS} />

        {/* Layer 2: card frame */}
        <motion.div
          style={{ x: frameX, y: frameY, rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-[270px] h-[315px] sm:w-[290px] sm:h-[340px] rounded-2xl cursor-pointer"
        >
          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-[#2B1B2E]/[0.10]
                          bg-white/30 backdrop-blur-md shadow-2xl shadow-[#FF7E5F]/15">
            {/* Glare */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl z-20"
              style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35) 0%, transparent 55%)` }}
            />

            {/* Photo */}
            <motion.div
              className="absolute inset-0"
              initial={showParticles ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ delay: showParticles ? 1.2 : 0, duration: 0.85, ease: CUBIC }}
            >
              {!imgError ? (
                <Image
                  src={profile.headshotSrc}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 640px) 270px, 290px"
                  className="object-cover object-top"
                  onError={() => setImgError(true)}
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center
                                bg-gradient-to-br from-[#FFB088]/40 to-[#9B5DE5]/20">
                  <span className="text-6xl font-bold text-[#2B1B2E]/15 select-none">AA</span>
                </div>
              )}
            </motion.div>

            {showParticles && <ParticleReveal width={270} height={315} />}

            {/* Name strip */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 z-30
                            bg-gradient-to-t from-[#FFF8F3]/90 via-[#FFF8F3]/55 to-transparent rounded-b-2xl">
              <p className="text-[#2B1B2E] text-sm font-semibold">{profile.name}</p>
              <p className="text-[#FF7E5F] text-xs mt-0.5 font-medium">{profile.available}</p>
            </div>
          </div>
        </motion.div>

        {/* Layer 3: badges */}
        <motion.div style={{ x: badgeX, y: badgeY }} className="absolute inset-0 pointer-events-none z-40">
          <div
            className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full
                       border border-emerald-400/50 bg-emerald-50/95 backdrop-blur-md shadow-lg shadow-emerald-200/40"
            style={{ top: -14, right: -16 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-xs font-semibold whitespace-nowrap">Available</span>
          </div>
          <div
            className="absolute px-3 py-1.5 rounded-full
                       border border-[#9B5DE5]/30 bg-[#9B5DE5]/10 backdrop-blur-md shadow-lg"
            style={{ bottom: -40, left: -16 }}
          >
            <span className="text-[#6B2DB5] text-[11px] font-semibold whitespace-nowrap">React · Node · Go</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function HeroForeground() {
  const FADE: Variants = {
    hidden:  { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1 + 0.2, duration: 0.72, ease: CUBIC },
    }),
  }
  const FADE_IN: Variants = {
    hidden:  { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.1 + 0.2, duration: 0.8 },
    }),
  }

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-6 sm:px-10 lg:px-16 py-24">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

        {/* ── Left ── */}
        <div className="flex flex-col gap-6 max-w-2xl">
          {/* Eyebrow */}
          <motion.div custom={0} variants={FADE_IN} initial="hidden" animate="visible" className="inline-flex items-center gap-2.5 w-fit">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FF7E5F]" />
            <span className="text-[#FF7E5F] text-xs font-bold tracking-[0.2em] uppercase">{profile.subtitle}</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            custom={1} variants={FADE} initial="hidden" animate="visible"
            className="text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight"
          >
            <span className="text-[#2B1B2E]">{profile.name.split(" ")[0]}</span>
            {" "}<br />
            <span className="bg-gradient-to-r from-[#FF7E5F] via-[#FF6B9D] to-[#9B5DE5] bg-clip-text text-transparent">
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.p custom={2} variants={FADE} initial="hidden" animate="visible" className="text-xl sm:text-2xl font-semibold text-[#7A5C6E]">
            {profile.title}
          </motion.p>

          {/* Tagline */}
          <motion.p custom={3} variants={FADE} initial="hidden" animate="visible" className="text-base text-[#7A5C6E]/70 leading-relaxed max-w-md">
            {profile.tagline}
          </motion.p>

          {/* Metrics */}
          <motion.div custom={4} variants={FADE} initial="hidden" animate="visible" className="grid grid-cols-4 gap-2 sm:gap-3">
            {metrics.map((m, i) => (
              <MetricCard key={m.label} count={m.count} suffix={m.suffix} label={m.label} index={i} />
            ))}
          </motion.div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <CTAButton href="#projects"             label="View Projects"    variant="primary"   index={0} />
            <CTAButton href={profile.resumeSrc}     label="Download Resume"  variant="secondary" index={1} download />
            <CTAButton href={`mailto:${profile.email}`} label="Contact"      variant="ghost"     index={2} />
          </div>

          {/* Social */}
          <motion.div custom={12} variants={FADE_IN} initial="hidden" animate="visible" className="flex items-center gap-4 pt-1">
            <a
              href={profile.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#7A5C6E]/60 hover:text-[#2B1B2E]/80 transition-colors text-sm font-medium"
            >
              <GithubIcon />
              github.com/Anjali-534
            </a>
            <span className="text-[#2B1B2E]/20">·</span>
            <span className="text-[#7A5C6E]/50 text-sm">{profile.location}</span>
          </motion.div>
        </div>

        {/* ── Right: headshot — first on mobile, right column on desktop ── */}
        <div className="flex items-center justify-center lg:justify-end order-first lg:order-last">
          <HeadshotCard />
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[#2B1B2E]/25 text-[10px] font-semibold tracking-[0.18em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-[#FF7E5F]/40 to-transparent"
        />
      </motion.div>
    </div>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}
