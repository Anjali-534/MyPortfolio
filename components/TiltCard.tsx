"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface TiltCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export default function TiltCard({ children, className = "", intensity = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-1, 1], [ intensity, -intensity]), { stiffness: 180, damping: 26 })
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-intensity,  intensity]), { stiffness: 180, damping: 26 })
  const glowX   = useTransform(mx, [-1, 1], ["0%", "100%"])
  const glowY   = useTransform(my, [-1, 1], ["0%", "100%"])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width  * 2 - 1)
    my.set((e.clientY - r.top)  / r.height * 2 - 1)
  }
  function onLeave() { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
    >
      {/* Glare — higher opacity for light backgrounds */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(350px circle at ${glowX} ${glowY}, rgba(255,255,255,0.42) 0%, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  )
}
