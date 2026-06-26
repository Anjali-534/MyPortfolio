"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { profile } from "@/data"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const QUICK_FACTS = [
  { label: "Degree",       value: "B.Tech IT",    sub: "GGSIPU · 91%"   },
  { label: "Minor",        value: "AI / ML",      sub: "2021–2025"       },
  { label: "Availability", value: "Immediate",    sub: "Open to roles"   },
  { label: "Location",     value: "Delhi NCR",    sub: "India"           },
  { label: "Spoken",       value: "3 Languages",  sub: "EN · HI · FR"   },
  { label: "Focus",        value: "Full-Stack",   sub: "+ Mobile + AI"   },
]

function QuickFact({ label, value, sub, delay }: { label: string; value: string; sub: string; delay: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="group flex flex-col gap-1 p-4 rounded-xl border border-[#2B1B2E]/[0.08] bg-white/60
                 hover:border-[#FF7E5F]/30 hover:bg-white/85 transition-all duration-300 shadow-sm"
    >
      <span className="text-[#7A5C6E]/60 text-[10px] font-semibold tracking-[0.15em] uppercase">{label}</span>
      <span className="text-[#2B1B2E] font-semibold text-base leading-tight">{value}</span>
      <span className="text-[#7A5C6E] text-xs">{sub}</span>
    </motion.div>
  )
}

export default function About() {
  const [imgError,   setImgError]   = useState(false)
  const headingRef   = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" })

  return (
    <section id="about" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF7E5F]/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#9B5DE5]/5 rounded-full blur-3xl" />
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
            <span className="h-px w-8 bg-[#FF7E5F]" />
            <span className="text-[#FF7E5F] text-xs font-bold tracking-[0.18em] uppercase">About Me</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2B1B2E] leading-tight">
            The developer behind
            <br />
            <span className="bg-gradient-to-r from-[#FF7E5F] via-[#FF6B9D] to-[#9B5DE5] bg-clip-text text-transparent">
              the portfolio
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">
          {/* Photo card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            <div className="relative w-full aspect-[3/4] max-w-[280px] mx-auto lg:mx-0 rounded-2xl overflow-hidden
                            border border-[#2B1B2E]/10 shadow-xl shadow-[#FF7E5F]/12">
              {!imgError ? (
                <Image
                  src={profile.headshotSrc}
                  alt={profile.name}
                  fill
                  sizes="280px"
                  className="object-cover object-top"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFB088]/30 to-[#9B5DE5]/20 flex items-center justify-center">
                  <span className="text-5xl font-bold text-[#2B1B2E]/15">AA</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F3]/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[#2B1B2E] text-sm font-semibold">{profile.name}</p>
                <p className="text-[#FF7E5F] text-xs font-medium mt-0.5">{profile.title}</p>
              </div>
            </div>
            <div className="absolute -inset-4 rounded-3xl bg-[#FF7E5F]/8 blur-2xl -z-10" />
          </motion.div>

          {/* Text */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="space-y-4"
            >
              <p className="text-[#2B1B2E]/75 text-base sm:text-lg leading-relaxed">{profile.summary}</p>
              <p className="text-[#7A5C6E] text-base leading-relaxed">
                When I'm not shipping code, I manage{" "}
                <span className="text-[#2B1B2E]/80 font-medium">Hamara Book Bank NGO</span> — a community-driven initiative I've been running since 2018, supporting book distribution across Delhi. I'm also working toward a{" "}
                <span className="text-[#2B1B2E]/80 font-medium">Diploma in French</span> from Delhi University.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="flex items-start gap-3 px-5 py-4 rounded-xl border-l-2 border-[#FF7E5F] bg-[#FF7E5F]/[0.06]"
            >
              <span className="text-[#FF7E5F] text-2xl leading-none mt-0.5 font-serif">"</span>
              <p className="text-[#7A5C6E] text-sm sm:text-base italic leading-relaxed">
                I care about shipping products that are fast, accessible, and built to last — not just code that passes tests.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {QUICK_FACTS.map((f, i) => <QuickFact key={f.label} {...f} delay={0.08 * i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
