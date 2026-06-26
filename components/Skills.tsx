"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { skills } from "@/data"
import TiltCard from "@/components/TiltCard"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const CATEGORIES = [
  { key: "languages" as const, label: "Languages",      dot: "bg-violet-500",      chip: "bg-violet-100 text-violet-800 border-violet-200",   bar: "from-violet-100/80 to-transparent", border: "border-violet-200/60" },
  { key: "frontend"  as const, label: "Frontend",       dot: "bg-[#FF6B9D]",       chip: "bg-pink-100 text-pink-800 border-pink-200",         bar: "from-pink-100/80 to-transparent",   border: "border-pink-200/60"   },
  { key: "backend"   as const, label: "Backend",        dot: "bg-[#FF7E5F]",       chip: "bg-orange-100 text-orange-800 border-orange-200",   bar: "from-orange-100/80 to-transparent", border: "border-orange-200/60" },
  { key: "mobile"    as const, label: "Mobile",         dot: "bg-rose-500",        chip: "bg-rose-100 text-rose-800 border-rose-200",         bar: "from-rose-100/80 to-transparent",   border: "border-rose-200/60"   },
  { key: "databases" as const, label: "Databases",      dot: "bg-amber-500",       chip: "bg-amber-100 text-amber-800 border-amber-200",      bar: "from-amber-100/80 to-transparent",  border: "border-amber-200/60"  },
  { key: "aiml"      as const, label: "AI / ML & Data", dot: "bg-emerald-500",     chip: "bg-emerald-100 text-emerald-800 border-emerald-200", bar: "from-emerald-100/80 to-transparent",border: "border-emerald-200/60"},
  { key: "cloud"     as const, label: "Cloud / DevOps", dot: "bg-[#9B5DE5]",       chip: "bg-violet-100 text-violet-800 border-violet-200",   bar: "from-violet-100/60 to-transparent", border: "border-violet-200/50" },
]

function SkillCard({ cat, index }: { cat: (typeof CATEGORIES)[number]; index: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const items: string[] = skills[cat.key]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: EASE }}
    >
      <TiltCard
        intensity={5}
        className={`group relative h-full p-5 rounded-2xl border ${cat.border} bg-white/65
                    hover:bg-white/90 transition-all duration-300 overflow-hidden
                    shadow-sm hover:shadow-md`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${cat.bar} pointer-events-none`} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
            <span className="text-[#2B1B2E] text-sm font-bold">{cat.label}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {items.map((s, si) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.06 + si * 0.04, duration: 0.4, ease: EASE }}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold
                            transition-all duration-200 hover:scale-105 cursor-default ${cat.chip}`}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Skills() {
  const headingRef    = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" })

  return (
    <section id="skills" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#FF7E5F]/6 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#9B5DE5]/5 rounded-full blur-3xl -translate-y-1/2" />
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
            <span className="h-px w-8 bg-[#9B5DE5]" />
            <span className="text-[#9B5DE5] text-xs font-bold tracking-[0.18em] uppercase">Technical Skills</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2B1B2E] leading-tight">
            Technologies I work with
          </h2>
          <p className="mt-4 text-[#7A5C6E] text-base max-w-xl">
            A cross-stack toolkit — from database schema and RESTful APIs to native mobile and machine learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => <SkillCard key={cat.key} cat={cat} index={i} />)}
        </div>
      </div>
    </section>
  )
}
