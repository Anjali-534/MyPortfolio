"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useInView } from "framer-motion"

// ── Design tokens ─────────────────────────────────────────────────────────────
const EM  = "#059669"   // Emerald
const OR  = "#ea580c"   // Burnt Orange
const BG  = "#fafaf9"   // Stone 50
const DK  = "#1c1917"   // Stone 900
const MID = "#78716c"   // Stone 500

const HEADING: React.CSSProperties = {
  fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
  fontWeight: 900,
  letterSpacing: "-0.04em",
  lineHeight: "0.92",
  margin: 0,
}
const BODY: React.CSSProperties = {
  fontFamily: "'Satoshi', system-ui, sans-serif",
}
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const GRADIENT_TEXT: React.CSSProperties = {
  background: `linear-gradient(90deg, ${EM}, ${OR})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}

// ── Helper: GoldBadge-style pill ──────────────────────────────────────────────
function Pill({ text, color = EM }: { text: string; color?: string }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      background: `${color}18`,
      border: `1px solid ${color}30`,
      borderRadius: "40px",
      padding: "6px 14px",
    }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0 }} />
      <span style={{ ...BODY, fontSize: "11px", fontWeight: 700, color, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {text}
      </span>
    </div>
  )
}

// ── Sticky Header ─────────────────────────────────────────────────────────────
function Header() {
  const NAV = ["Shop", "Benefits", "Products", "About"]
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100, height: "80px",
      background: "rgba(255,255,255,0.96)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(214,211,209,0.6)",
      display: "flex", alignItems: "center", padding: "0 48px",
      gap: "32px",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
        <div style={{
          width: "40px", height: "40px", background: EM,
          borderRadius: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "20px",
          boxShadow: `0 4px 12px ${EM}40`,
        }}>
          🌿
        </div>
        <span style={{ ...HEADING, fontSize: "17px", fontWeight: 800, color: DK, letterSpacing: "-0.03em", lineHeight: 1 }}>
          AMANTRA
        </span>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", gap: "28px" }}>
        {NAV.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{ ...BODY, fontSize: "14px", color: MID, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = EM)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MID)}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            ...BODY, background: DK, color: "#fff", border: "none",
            borderRadius: "40px", padding: "10px 22px",
            fontSize: "14px", fontWeight: 700, cursor: "pointer",
            transition: "all 0.3s ease",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = EM; e.currentTarget.style.transform = "translateY(-1px)" }}
          onMouseLeave={(e) => { e.currentTarget.style.background = DK; e.currentTarget.style.transform = "translateY(0)" }}
          onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.95)" }}
          onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(-1px)" }}
        >
          Shop Now
        </button>
      </div>
    </header>
  )
}

// ── 3D Interactive Card Stack ─────────────────────────────────────────────────
function CardStack() {
  const containerRef = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rx = (e.clientY - cy) / 22
    const ry = -(e.clientX - cx) / 22
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
  }, [])

  const onLeave = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = "rotateX(0deg) rotateY(0deg)"
    }
  }, [])

  return (
    <div
      style={{ perspective: "1000px", perspectiveOrigin: "50% 50%", width: "360px", height: "420px", position: "relative" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%", height: "100%", position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.18s ease-out",
        }}
      >
        {/* Card A — Emerald, base layer */}
        <div style={{
          position: "absolute",
          width: "256px", height: "320px",
          background: `linear-gradient(140deg, #059669, #047857 60%, #065f46)`,
          borderRadius: "28px",
          transform: "rotateY(-15deg) rotateX(10deg)",
          boxShadow: `0 24px 60px rgba(5,150,105,0.45), 0 4px 20px rgba(0,0,0,0.15)`,
          left: "24px", top: "24px",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "14px",
          color: "#fff",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15), transparent 50%)", pointerEvents: "none" }} />
          <span style={{ fontSize: "52px", position: "relative" }}>🌿</span>
          <div style={{ textAlign: "center", padding: "0 20px", position: "relative" }}>
            <p style={{ ...HEADING, fontSize: "19px", fontWeight: 800, color: "#fff", margin: 0 }}>GREEN BLEND</p>
            <p style={{ ...BODY, fontSize: "12px", opacity: 0.7, margin: "5px 0 0" }}>Daily Superfood Formula</p>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.18)",
            borderRadius: "40px", padding: "6px 16px",
            fontSize: "12px", fontWeight: 700, ...BODY,
          }}>
            30 servings · $49
          </div>
        </div>

        {/* Card B — Orange, front layer */}
        <div style={{
          position: "absolute",
          width: "220px", height: "270px",
          background: `linear-gradient(140deg, #ea580c, #c2410c 60%, #9a3412)`,
          borderRadius: "24px",
          transform: "translateZ(50px) rotateY(15deg) rotateX(-5deg)",
          boxShadow: `0 20px 55px rgba(234,88,12,0.45), 0 4px 16px rgba(0,0,0,0.2)`,
          right: "8px", bottom: "18px",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "12px",
          color: "#fff",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 20%, rgba(255,255,255,0.15), transparent 55%)", pointerEvents: "none" }} />
          <span style={{ fontSize: "44px", position: "relative" }}>⚡</span>
          <div style={{ textAlign: "center", padding: "0 16px", position: "relative" }}>
            <p style={{ ...HEADING, fontSize: "16px", fontWeight: 800, color: "#fff", margin: 0 }}>ENERGY BOOST</p>
            <p style={{ ...BODY, fontSize: "11px", opacity: 0.7, margin: "4px 0 0" }}>Daily Vitality</p>
          </div>
        </div>

        {/* Floating leaf */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "-14px", right: "28px", fontSize: "32px", filter: `drop-shadow(0 4px 10px ${EM}60)` }}
        >
          🍃
        </motion.div>

        {/* Floating carrot */}
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
          style={{ position: "absolute", bottom: "6px", left: "-2px", fontSize: "28px", filter: `drop-shadow(0 4px 10px ${OR}50)` }}
        >
          🥕
        </motion.div>
      </div>
    </div>
  )
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="shop" style={{ background: BG, minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center" }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        padding: "72px 48px 80px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px",
        width: "100%",
      }}>
        {/* Left */}
        <div style={{ flex: 1, maxWidth: "580px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <Pill text="100% Certified Organic" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            style={{ ...HEADING, fontSize: "clamp(52px, 7vw, 88px)", color: DK, margin: "24px 0 26px" }}
          >
            NATURE&apos;S FUEL FOR{" "}
            <span style={GRADIENT_TEXT}>PEAK FLOW</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            style={{ ...BODY, fontSize: "17px", color: MID, lineHeight: 1.75, margin: "0 0 36px", maxWidth: "420px" }}
          >
            Supercharge your daily wellness routine with lab-tested, nature-sourced formulas. Peak performance starts here.
          </motion.p>

          {/* CTA grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", maxWidth: "360px", marginBottom: "44px" }}
          >
            <button
              style={{
                background: EM, color: "#fff", border: "none",
                borderRadius: "24px", padding: "15px 22px",
                ...BODY, fontWeight: 700, fontSize: "15px", cursor: "pointer",
                boxShadow: `0 8px 24px ${EM}38`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#047857"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 28px ${EM}50` }}
              onMouseLeave={(e) => { e.currentTarget.style.background = EM; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 24px ${EM}38` }}
              onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.95)" }}
            >
              Shop Now →
            </button>
            <button
              style={{
                background: "transparent", color: DK,
                border: `1.5px solid rgba(28,25,23,0.18)`,
                borderRadius: "24px", padding: "15px 22px",
                ...BODY, fontWeight: 600, fontSize: "15px", cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = EM; e.currentTarget.style.color = EM }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(28,25,23,0.18)"; e.currentTarget.style.color = DK }}
            >
              Learn More
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "14px" }}
          >
            <div style={{ display: "flex" }}>
              {["👩‍🦰","👨‍🦱","👩‍🦳","👨"].map((av, i) => (
                <div key={i} style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: ["#ecfdf5","#fff7ed","#eff6ff","#fdf4ff"][i],
                  border: "2.5px solid #fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "17px", marginLeft: i ? "-10px" : 0,
                  zIndex: 4 - i, position: "relative",
                }}>
                  {av}
                </div>
              ))}
            </div>
            <div>
              <div style={{ display: "flex", gap: "1px", marginBottom: "3px" }}>
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} style={{ color: OR, fontSize: "13px" }}>{s}</span>
                ))}
              </div>
              <p style={{ ...BODY, fontSize: "13px", color: MID, margin: 0 }}>
                <strong style={{ color: DK }}>5,000+</strong> happy customers
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right — 3D Cards */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
        >
          <CardStack />
        </motion.div>
      </div>
    </section>
  )
}

// ── Dark Benefits Grid ────────────────────────────────────────────────────────
const BENEFITS = [
  { icon: "🌱", color: EM,      bg: `${EM}1a`,      title: "100% Organic",    desc: "Every ingredient is certified organic, sourced directly from nature's finest farms. No synthetic fillers, ever." },
  { icon: "⚡", color: OR,      bg: `${OR}1a`,      title: "Peak Energy",      desc: "Scientifically formulated for sustained, clean energy without the crash of synthetic stimulants or added sugars." },
  { icon: "🧬", color: "#f59e0b", bg: "#f59e0b1a",  title: "Bio-Available",    desc: "Enhanced absorption matrices ensure your body receives maximum benefit from every micro and macronutrient." },
]

function Benefits() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="benefits" ref={ref} style={{ background: DK, padding: "100px 48px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }} style={{ marginBottom: "56px" }}>
          <p style={{ ...BODY, color: OR, fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "14px" }}>Why Amantra</p>
          <h2 style={{ ...HEADING, fontSize: "clamp(38px, 5vw, 60px)", color: "#fff" }}>
            BUILT DIFFERENT,<br />
            <span style={GRADIENT_TEXT}>FEELS DIFFERENT</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              style={{
                background: "#292524",
                border: "1px solid #44403c",
                borderRadius: "28px",
                padding: "36px",
                display: "flex", flexDirection: "column", gap: "16px",
              }}
            >
              <div style={{
                width: "56px", height: "56px", borderRadius: "16px",
                background: b.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px",
              }}>
                {b.icon}
              </div>
              <h3 style={{ ...HEADING, fontSize: "22px", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                {b.title}
              </h3>
              <p style={{ ...BODY, fontSize: "14px", color: "#a8a29e", lineHeight: 1.75, margin: 0 }}>
                {b.desc}
              </p>
              <div style={{ marginTop: "auto", ...BODY, fontSize: "13px", fontWeight: 700, color: b.color, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                Learn more <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Product Bento Card ────────────────────────────────────────────────────────
type ProductCardProps = { name: string; desc: string; emoji: string; bg: string; badge?: string; badgeColor?: string; index: number }

function BentoCard({ name, desc, emoji, bg, badge, badgeColor = EM, index }: ProductCardProps) {
  const [hov, setHov]  = useState(false)
  const animRef = useRef<HTMLDivElement>(null)  // scroll reveal
  const tiltRef = useRef<HTMLDivElement>(null)  // 3D tilt
  const inView  = useInView(animRef, { once: true, margin: "-60px" })

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const rx =  (e.clientY - cy) / 30
    const ry = -(e.clientX - cx) / 30
    el.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`
    el.style.boxShadow = "0 28px 64px rgba(214,211,209,0.85), 0 8px 24px rgba(0,0,0,0.07)"
  }, [])

  const onLeave = useCallback(() => {
    const el = tiltRef.current
    if (!el) return
    el.style.transform = "translateY(0) rotateX(0deg) rotateY(0deg)"
    el.style.boxShadow = "0 8px 32px rgba(214,211,209,0.55)"
    setHov(false)
  }, [])

  return (
    <motion.div
      ref={animRef}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={tiltRef}
        onMouseEnter={() => setHov(true)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          background: "#fff",
          borderRadius: "40px",
          padding: "32px",
          position: "relative",
          boxShadow: "0 8px 32px rgba(214,211,209,0.55)",
          transition: "transform 0.18s ease-out, box-shadow 0.3s ease",
          cursor: "pointer",
          overflow: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        {badge && (
          <div style={{
            position: "absolute", top: "22px", right: "22px",
            background: badgeColor, color: "#fff",
            borderRadius: "40px", padding: "5px 13px",
            ...BODY, fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em",
            zIndex: 1,
          }}>
            {badge}
          </div>
        )}

        {/* Visual square */}
        <div style={{
          aspectRatio: "1 / 1",
          background: bg,
          borderRadius: "28px",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "24px", overflow: "hidden",
        }}>
          <span style={{
            fontSize: "72px", display: "block",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: hov ? "scale(1.25) rotate(12deg)" : "scale(1) rotate(0deg)",
          }}>
            {emoji}
          </span>
        </div>

        <h3 style={{ ...HEADING, fontSize: "22px", fontWeight: 800, color: DK, letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 8px" }}>
          {name}
        </h3>
        <p style={{ ...BODY, fontSize: "14px", color: MID, margin: "0 0 22px", lineHeight: 1.65 }}>
          {desc}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ ...HEADING, fontSize: "24px", fontWeight: 900, color: DK }}>$49</span>
            <span style={{ ...BODY, color: MID, fontSize: "13px" }}> / 30 days</span>
          </div>
          <button style={{
            background: DK, color: "#fff", border: "none",
            borderRadius: "40px", padding: "10px 20px",
            ...BODY, fontSize: "13px", fontWeight: 700, cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.95)" }}
          onMouseUp={(e)   => { e.currentTarget.style.transform = "scale(1)" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function BuildBoxCard() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: DK,
        borderRadius: "40px",
        padding: "40px 32px",
        display: "flex", flexDirection: "column", gap: "0",
        boxShadow: hov ? "0 28px 60px rgba(0,0,0,0.35)" : "0 8px 32px rgba(0,0,0,0.22)",
        transition: "all 0.4s ease",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        cursor: "pointer",
        position: "relative", overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 75% 80%, ${EM}18, transparent 55%), radial-gradient(circle at 25% 20%, ${OR}14, transparent 50%)`,
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "18px", height: "100%" }}>
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: "52px" }}
        >
          📦
        </motion.div>

        <div style={{
          display: "inline-block", width: "fit-content",
          background: `linear-gradient(90deg, ${EM}, ${OR})`,
          borderRadius: "40px", padding: "5px 14px",
        }}>
          <span style={{ ...BODY, color: "#fff", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em" }}>
            BUILD YOUR BOX
          </span>
        </div>

        <h3 style={{ ...HEADING, fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 900, color: "#fff", lineHeight: "1.0", margin: 0 }}>
          CURATE YOUR PERFECT STACK
        </h3>

        <p style={{ ...BODY, fontSize: "14px", color: "#a8a29e", lineHeight: 1.75, margin: 0 }}>
          Mix and match from 20+ products. Get 15% off when you build a custom box of 3 or more items.
        </p>

        <div style={{ marginTop: "auto", paddingTop: "8px" }}>
          <div style={{ ...BODY, fontSize: "13px", color: "#78716c", marginBottom: "12px" }}>
            🎁 Free shipping on boxes over $79
          </div>
          <button style={{
            background: `linear-gradient(90deg, ${EM}, ${OR})`,
            color: "#fff", border: "none",
            borderRadius: "40px", padding: "15px 28px",
            ...BODY, fontSize: "15px", fontWeight: 700, cursor: "pointer",
            boxShadow: `0 6px 24px ${EM}40`,
            transition: "all 0.3s ease",
            width: "100%",
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.95)" }}
          onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)" }}
          >
            Build My Box →
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function Products() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="products" ref={ref} style={{ background: BG, padding: "100px 48px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Heading row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px" }}
        >
          <div>
            <p style={{ ...BODY, color: EM, fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>Our Products</p>
            <h2 style={{ ...HEADING, fontSize: "clamp(38px, 5vw, 60px)", color: DK }}>
              FUEL YOUR<br />POTENTIAL
            </h2>
          </div>
          {/* Circular nav */}
          <div style={{ display: "flex", gap: "10px", paddingBottom: "8px" }}>
            {["←", "→"].map((ch, i) => (
              <button
                key={ch}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  border: `1.5px solid ${i === 1 ? EM : "#e7e5e4"}`,
                  background: i === 1 ? EM : "transparent",
                  color: i === 1 ? "#fff" : MID,
                  fontSize: "16px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { if (i === 0) { e.currentTarget.style.borderColor = EM; e.currentTarget.style.color = EM } }}
                onMouseLeave={(e) => { if (i === 0) { e.currentTarget.style.borderColor = "#e7e5e4"; e.currentTarget.style.color = MID } }}
              >
                {ch}
              </button>
            ))}
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", alignItems: "stretch" }}>
          <BentoCard name="Green Superfood Blend" desc="10 raw greens, adaptogens, and digestive enzymes in one powerful daily scoop." emoji="🌿" bg="#ecfdf5" badge="Best Seller" badgeColor={EM} index={0} />
          <BentoCard name="Orange Energy Boost" desc="Citrus superfoods, B-vitamins, and natural caffeine for sustained, clean energy." emoji="🍊" bg="#fff7ed" badge="New" badgeColor={OR} index={1} />
          <BuildBoxCard />
        </div>
      </div>
    </section>
  )
}

// ── Newsletter ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("")
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} style={{ background: OR, padding: "100px 48px", position: "relative", overflow: "hidden" }}>
      {/* Rotated bg icon */}
      <div style={{
        position: "absolute", right: "-80px", top: "50%",
        transform: "translateY(-50%) rotate(45deg)",
        fontSize: "300px", opacity: 0.07, pointerEvents: "none", lineHeight: 1,
      }}>
        🌿
      </div>
      <div style={{ position: "absolute", left: "-60px", bottom: "-40px", fontSize: "200px", opacity: 0.04, pointerEvents: "none" }}>
        ⚡
      </div>

      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }}>
          <p style={{ ...BODY, color: "rgba(255,255,255,0.65)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "14px" }}>
            Join the Movement
          </p>
          <h2 style={{ ...HEADING, fontSize: "clamp(52px, 8vw, 88px)", color: "#fff", margin: "0 0 24px" }}>
            STAY RADIANT
          </h2>
          <p style={{ ...BODY, fontSize: "16px", color: "rgba(255,255,255,0.72)", margin: "0 0 40px", lineHeight: 1.7 }}>
            Wellness tips, exclusive offers, and early product access — delivered to your inbox weekly.
          </p>

          {/* Form */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", maxWidth: "520px", margin: "0 auto" }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                padding: "15px 20px",
                borderRadius: "16px",
                border: "1.5px solid rgba(255,255,255,0.28)",
                background: "rgba(255,255,255,0.16)",
                color: "#fff",
                fontSize: "15px",
                ...BODY,
                outline: "none",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            />
            <button
              style={{
                background: "#000", color: "#fff", border: "none",
                borderRadius: "16px", padding: "15px 24px",
                ...BODY, fontSize: "13px", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase",
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = EM }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#000" }}
              onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.95)" }}
              onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)" }}
            >
              Sign Me Up
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Stats Strip ──────────────────────────────────────────────────────────────
const STATS = [
  { num: "10K+",  label: "Happy Customers"      },
  { num: "100%",  label: "Certified Organic"     },
  { num: "30",    label: "Day Money-Back"        },
  { num: "$79+",  label: "Free Shipping Orders"  },
]

function Stats() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <div ref={ref} style={{ background: "#fff", borderTop: "1px solid #f5f5f4", borderBottom: "1px solid #f5f5f4" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
            style={{
              padding: "32px 24px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
              borderRight: i < 3 ? "1px solid #f5f5f4" : "none",
            }}
          >
            <span style={{
              ...HEADING, fontSize: "40px", fontWeight: 900,
              background: i % 2 === 0 ? `linear-gradient(90deg, ${EM}, ${EM}cc)` : `linear-gradient(90deg, ${OR}, ${OR}cc)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {s.num}
            </span>
            <span style={{ ...BODY, fontSize: "13px", color: MID, fontWeight: 500, textAlign: "center" }}>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Ingredients Showcase ──────────────────────────────────────────────────────
const INGREDIENTS = [
  { emoji: "🌿", name: "Spirulina",         tag: "Protein",      tagColor: EM,      desc: "Complete amino acid profile with 60% protein content by weight." },
  { emoji: "🍋", name: "Vitamin C Complex", tag: "Immunity",     tagColor: OR,      desc: "Buffered ascorbate for superior absorption and immune resilience." },
  { emoji: "🫚", name: "MCT Oil",           tag: "Brain Fuel",   tagColor: "#8b5cf6", desc: "Rapid-onset ketone energy without the crash of sugar-based sources." },
  { emoji: "🌸", name: "Ashwagandha",       tag: "Adaptogen",   tagColor: OR,      desc: "KSM-66 extract clinically shown to reduce cortisol by up to 28%." },
  { emoji: "🟢", name: "Chlorella",         tag: "Detox",        tagColor: EM,      desc: "Cellular detoxification and heavy-metal chelation support." },
  { emoji: "🫐", name: "Blueberry Extract", tag: "Antioxidants", tagColor: "#7c3aed", desc: "600+ anthocyanins per serving for oxidative stress protection." },
]

function Ingredients() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} style={{ background: BG, padding: "100px 48px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: "56px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <div>
            <p style={{ ...BODY, color: OR, fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>Transparency Promise</p>
            <h2 style={{ ...HEADING, fontSize: "clamp(36px, 5vw, 58px)", color: DK }}>
              WHAT GOES<br /><span style={GRADIENT_TEXT}>INSIDE</span>
            </h2>
          </div>
          <p style={{ ...BODY, fontSize: "14px", color: MID, maxWidth: "280px", lineHeight: 1.7, paddingBottom: "8px" }}>
            Every ingredient is listed in full — nothing hidden, nothing artificial. Scan the QR on any pack to see our lab reports.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {INGREDIENTS.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              style={{
                background: "#fff",
                borderRadius: "24px", padding: "24px",
                border: "1px solid #f5f5f4",
                display: "flex", gap: "16px", alignItems: "flex-start",
                boxShadow: "0 2px 16px rgba(214,211,209,0.4)",
                transition: "box-shadow 0.3s ease",
                cursor: "default",
              }}
            >
              <div style={{
                width: "52px", height: "52px", borderRadius: "16px", flexShrink: 0,
                background: `${ing.tagColor}12`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "26px",
              }}>
                {ing.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ ...HEADING, fontSize: "16px", fontWeight: 800, color: DK, letterSpacing: "-0.02em", lineHeight: 1 }}>{ing.name}</span>
                  <span style={{
                    ...BODY, fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: ing.tagColor, background: `${ing.tagColor}14`,
                    border: `1px solid ${ing.tagColor}25`,
                    borderRadius: "20px", padding: "2px 8px",
                  }}>
                    {ing.tag}
                  </span>
                </div>
                <p style={{ ...BODY, fontSize: "13px", color: MID, lineHeight: 1.65, margin: 0 }}>{ing.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ marginTop: "36px", textAlign: "center" }}
        >
          <button style={{
            ...BODY, background: "transparent", border: `1.5px solid rgba(28,25,23,0.15)`,
            borderRadius: "40px", padding: "12px 32px",
            fontSize: "14px", fontWeight: 700, color: DK, cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = EM; e.currentTarget.style.color = EM }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(28,25,23,0.15)"; e.currentTarget.style.color = DK }}
          >
            View Full Ingredient List →
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Sarah K.", handle: "@sarahkfitness", avatar: "👩‍🦰",
    avatarBg: "#ecfdf5",
    text: "I've tried every green powder on the market and nothing comes close. Amantra actually tastes good and I notice a real difference in my energy by day three.",
    stars: 5, product: "Green Superfood Blend",
  },
  {
    name: "Marcus T.", handle: "@marcusthrive", avatar: "👨‍🦱",
    avatarBg: "#fff7ed",
    text: "The Energy Boost is unreal. Clean focus, no jitters, no crash. I cancelled my old pre-workout subscription the same week I got my first order.",
    stars: 5, product: "Orange Energy Boost",
  },
  {
    name: "Priya M.", handle: "@priyawellness", avatar: "👩‍🦳",
    avatarBg: "#eff6ff",
    text: "As a nutritionist I'm incredibly picky about supplements. The transparency here — full lab reports, sourcing info — is exactly what the industry needs.",
    stars: 5, product: "Custom Box (3 products)",
  },
]

function TestimonialCard({ t, index }: { t: (typeof TESTIMONIALS)[number]; index: number }) {
  const animRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(animRef, { once: true, margin: "-60px" })

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rx =  (e.clientY - cy) / 28
    const ry = -(e.clientX - cx) / 28
    el.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }, [])

  const onLeave = useCallback(() => {
    if (tiltRef.current) tiltRef.current.style.transform = "translateY(0) rotateX(0deg) rotateY(0deg)"
  }, [])

  return (
    <motion.div
      ref={animRef}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: EASE }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          background: "rgba(255,255,255,0.90)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "28px",
          border: "1px solid rgba(255,255,255,0.9)",
          padding: "32px",
          boxShadow: "0 8px 40px rgba(214,211,209,0.6)",
          transition: "transform 0.2s ease-out, box-shadow 0.3s ease",
          transformStyle: "preserve-3d",
          cursor: "default",
        }}
      >
        {/* Stars */}
        <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
          {"★★★★★".slice(0, t.stars).split("").map((s, i) => (
            <span key={i} style={{ color: OR, fontSize: "16px" }}>{s}</span>
          ))}
        </div>

        {/* Quote */}
        <p style={{ ...BODY, fontSize: "15px", color: "#44403c", lineHeight: 1.75, margin: "0 0 24px", fontStyle: "italic" }}>
          &ldquo;{t.text}&rdquo;
        </p>

        {/* Product tag */}
        <div style={{
          ...BODY, fontSize: "11px", fontWeight: 700, color: EM,
          background: `${EM}12`, border: `1px solid ${EM}22`,
          borderRadius: "20px", padding: "3px 10px",
          display: "inline-block", letterSpacing: "0.04em",
          marginBottom: "20px",
        }}>
          {t.product}
        </div>

        {/* Author row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "50%",
              background: t.avatarBg, border: "2px solid #fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}>
              {t.avatar}
            </div>
            <div>
              <p style={{ ...BODY, fontSize: "14px", fontWeight: 700, color: DK, margin: 0 }}>{t.name}</p>
              <p style={{ ...BODY, fontSize: "12px", color: MID, margin: 0 }}>{t.handle}</p>
            </div>
          </div>
          {/* Verified badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "5px",
            background: `${EM}10`, border: `1px solid ${EM}20`,
            borderRadius: "20px", padding: "4px 10px",
          }}>
            <span style={{ color: EM, fontSize: "11px" }}>✓</span>
            <span style={{ ...BODY, fontSize: "10px", fontWeight: 700, color: EM, letterSpacing: "0.06em" }}>Verified</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Testimonials() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} style={{
      background: `linear-gradient(180deg, ${BG} 0%, #fff 100%)`,
      padding: "100px 48px",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ marginBottom: "56px", textAlign: "center" }}
        >
          <p style={{ ...BODY, color: EM, fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>
            Real People, Real Results
          </p>
          <h2 style={{ ...HEADING, fontSize: "clamp(36px, 5vw, 58px)", color: DK, margin: "0 0 16px" }}>
            THEY FELT THE<br /><span style={GRADIENT_TEXT}>DIFFERENCE</span>
          </h2>
          <p style={{ ...BODY, fontSize: "15px", color: MID, maxWidth: "420px", margin: "0 auto", lineHeight: 1.7 }}>
            Over 10,000 customers have made the switch. Here&apos;s what they&apos;re saying.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={t.name} t={t} index={i} />)}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.55, ease: EASE }}
          style={{
            marginTop: "48px",
            padding: "24px 32px",
            background: "#fff",
            borderRadius: "24px",
            border: "1px solid #f5f5f4",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            boxShadow: "0 2px 16px rgba(214,211,209,0.35)",
          }}
        >
          {[
            { icon: "⭐", val: "4.9/5", label: "Average Rating" },
            { icon: "💬", val: "2,400+", label: "Verified Reviews" },
            { icon: "🔁", val: "87%",    label: "Repeat Customers" },
            { icon: "🏅", val: "#1",     label: "Organic Wellness Brand" },
          ].map((item, i) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "24px" }}>{item.icon}</span>
              <div>
                <p style={{ ...HEADING, fontSize: "20px", fontWeight: 900, color: DK, letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}>{item.val}</p>
                <p style={{ ...BODY, fontSize: "12px", color: MID, margin: 0 }}>{item.label}</p>
              </div>
              {i < 3 && <div style={{ width: "1px", height: "40px", background: "#f5f5f4", marginLeft: "12px" }} />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const SOCIALS      = ["𝕏", "ig", "fb", "yt"]
  const SHOP_LINKS   = ["Green Blends", "Energy Boost", "Recovery", "Bundles", "Gift Cards"]
  const RESOURCE_LINKS = ["About Us", "Our Farms", "Certifications", "Blog", "FAQ"]

  function FooterLink({ children }: { children: React.ReactNode }) {
    return (
      <a
        href="#"
        style={{ display: "block", ...BODY, fontSize: "14px", color: MID, textDecoration: "none", marginBottom: "12px", transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = EM)}
        onMouseLeave={(e) => (e.currentTarget.style.color = MID)}
      >
        {children}
      </a>
    )
  }

  return (
    <footer style={{ background: "#fff", padding: "72px 48px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", gap: "48px", paddingBottom: "64px" }}>
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "38px", height: "38px", background: EM, borderRadius: "11px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px" }}>🌿</div>
              <span style={{ ...HEADING, fontSize: "15px", fontWeight: 800, color: DK, letterSpacing: "-0.03em", lineHeight: 1 }}>AMANTRA ORGANICS</span>
            </div>
            <p style={{ ...BODY, fontSize: "14px", color: MID, lineHeight: 1.75, margin: 0, maxWidth: "260px" }}>
              Premium organic wellness formulas crafted for those who demand the best from nature and themselves.
            </p>
            <div style={{ display: "flex", gap: "9px" }}>
              {SOCIALS.map((s) => (
                <div
                  key={s}
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%",
                    border: "1px solid #e7e5e4",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 700, color: MID,
                    cursor: "pointer", transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = EM; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = EM }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = MID; e.currentTarget.style.borderColor = "#e7e5e4" }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p style={{ ...HEADING, fontSize: "14px", fontWeight: 800, color: DK, letterSpacing: "-0.01em", marginBottom: "20px", lineHeight: 1 }}>Shop</p>
            {SHOP_LINKS.map((l) => <FooterLink key={l}>{l}</FooterLink>)}
          </div>

          {/* Resources */}
          <div>
            <p style={{ ...HEADING, fontSize: "14px", fontWeight: 800, color: DK, letterSpacing: "-0.01em", marginBottom: "20px", lineHeight: 1 }}>Resources</p>
            {RESOURCE_LINKS.map((l) => <FooterLink key={l}>{l}</FooterLink>)}
          </div>

          {/* Visit */}
          <div>
            <p style={{ ...HEADING, fontSize: "14px", fontWeight: 800, color: DK, letterSpacing: "-0.01em", marginBottom: "20px", lineHeight: 1 }}>Visit Us</p>
            <p style={{ ...BODY, fontSize: "14px", color: MID, lineHeight: 1.8, margin: "0 0 16px" }}>
              123 Green Valley Lane<br />
              San Francisco, CA 94102<br />
              United States
            </p>
            <a
              href="mailto:hello@amantraorganics.com"
              style={{ ...HEADING, fontSize: "15px", fontWeight: 800, color: EM, textDecoration: "none", letterSpacing: "-0.02em" }}
            >
              hello@amantraorganics.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid #f5f5f4",
          padding: "22px 0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <p style={{ ...BODY, fontSize: "13px", color: "#a8a29e", margin: 0 }}>
            © {new Date().getFullYear()} Amantra Organics. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((l) => (
              <a
                key={l}
                href="#"
                style={{ ...BODY, fontSize: "13px", color: "#a8a29e", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = DK)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a8a29e")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Page root ─────────────────────────────────────────────────────────────────
export default function AmantraOrganics() {
  return (
    <div style={{ background: BG, color: DK, minHeight: "100vh" }}>
      <Header />
      <Hero />
      <Stats />
      <Benefits />
      <Ingredients />
      <Products />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  )
}
