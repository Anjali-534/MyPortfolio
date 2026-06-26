"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { experience } from "@/data"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function ExperienceCard({ item, index, isLast }: {
  item: (typeof experience)[number]; index: number; isLast: boolean
}) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
      className="relative flex gap-6 sm:gap-8"
    >
      <div className="flex flex-col items-center shrink-0">
        <div className="relative mt-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF7E5F] shadow-[0_0_12px_rgba(255,126,95,0.5)]" />
          <div className="absolute inset-0 rounded-full bg-[#FF7E5F]/30 animate-ping" />
        </div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-[#FF7E5F]/40 via-[#FF6B9D]/15 to-transparent min-h-[40px]" />
        )}
      </div>

      <div className="flex-1 pb-12">
        <div className="group p-5 sm:p-6 rounded-2xl border border-[#2B1B2E]/[0.08] bg-white/60
                        hover:border-[#FF7E5F]/25 hover:bg-white/85 transition-all duration-300 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="text-[#2B1B2E] font-semibold text-base sm:text-lg leading-tight">{item.role}</h3>
              <div className="flex items-center gap-2 mt-1">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer"
                    className="text-[#FF7E5F] hover:text-[#CC4A2A] text-sm font-semibold transition-colors">
                    {item.company} ↗
                  </a>
                ) : (
                  <span className="text-[#7A5C6E] text-sm font-medium">{item.company}</span>
                )}
              </div>
            </div>
            <span className="shrink-0 px-3 py-1 rounded-full border border-[#2B1B2E]/[0.08] bg-[#2B1B2E]/[0.04] text-[#7A5C6E] text-xs font-medium">
              {item.period}
            </span>
          </div>
          <ul className="space-y-2.5">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-[#7A5C6E] leading-relaxed">
                <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[#FF7E5F]/70" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const headingRef    = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" })

  return (
    <section id="experience" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#FF6B9D]/5 rounded-full blur-3xl" />
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
            <span className="text-[#FF6B9D] text-xs font-bold tracking-[0.18em] uppercase">Experience</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2B1B2E] leading-tight">
            Where I&apos;ve built things
          </h2>
          <p className="mt-4 text-[#7A5C6E] text-base max-w-xl">
            Production experience across freelance, corporate, and research environments.
          </p>
        </motion.div>

        <div className="max-w-3xl">
          {experience.map((item, i) => (
            <ExperienceCard key={item.company} item={item} index={i} isLast={i === experience.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
