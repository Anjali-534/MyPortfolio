"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { achievements } from "@/data"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const ICONS = ["🏆", "🚀", "🥈", "🌱", "🌐"]

function AchievementItem({ text, index }: { text: string; index: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="flex gap-4 p-5 rounded-2xl border border-[#2B1B2E]/[0.08] bg-white/65
                 hover:border-[#FF6B9D]/30 hover:bg-white/85 transition-all duration-300 group shadow-sm"
    >
      <span className="text-xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
        {ICONS[index] ?? "✦"}
      </span>
      <p className="text-[#7A5C6E] text-sm leading-relaxed group-hover:text-[#2B1B2E]/70 transition-colors duration-200">
        {text}
      </p>
    </motion.div>
  )
}

export default function Achievements() {
  const headingRef    = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" })

  return (
    <section id="achievements" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#9B5DE5]/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B9D]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#FF6B9D]" />
            <span className="text-[#FF6B9D] text-xs font-bold tracking-[0.18em] uppercase">
              Achievements & Leadership
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2B1B2E] leading-tight">Beyond the code</h2>
          <p className="mt-4 text-[#7A5C6E] text-base max-w-xl">
            Recognition, community impact, and a few languages to go with the tech stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
          {achievements.map((item, i) => <AchievementItem key={i} text={item} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-8 max-w-4xl flex flex-wrap items-center gap-3"
        >
          <span className="text-[#7A5C6E]/50 text-xs uppercase tracking-widest">Certifications</span>
          {["IBM Data Science", "SIH Level 2", "IEEE Ideathon Runner-Up ×2"].map((cert) => (
            <span
              key={cert}
              className="px-3 py-1.5 rounded-full border border-[#9B5DE5]/30 bg-[#9B5DE5]/10
                         text-[#6B2DB5] text-xs font-semibold hover:border-[#9B5DE5]/50 transition-colors"
            >
              {cert}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
