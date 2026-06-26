"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { education } from "@/data"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Education() {
  const headingRef    = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" })

  return (
    <section id="education" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#F9C74F]/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-amber-500" />
            <span className="text-amber-600 text-xs font-bold tracking-[0.18em] uppercase">Education</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2B1B2E] leading-tight">Academic background</h2>
        </motion.div>

        {/* Primary degree */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative p-6 sm:p-8 rounded-2xl border border-amber-300/50 bg-amber-50/80
                     overflow-hidden mb-5 hover:border-amber-400/60 transition-all duration-300 shadow-md shadow-amber-200/30"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 rounded-bl-full pointer-events-none" />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400/60" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200/80 border border-amber-300/60 text-amber-800 text-xs font-bold">
                  {education.minor} Minor
                </span>
              </div>
              <h3 className="text-[#2B1B2E] font-bold text-lg sm:text-xl leading-snug">{education.degree}</h3>
              <p className="text-[#7A5C6E] text-sm mt-1 font-medium">{education.institution}</p>
              <p className="text-[#7A5C6E]/60 text-xs mt-0.5">{education.period}</p>
            </div>
            <div className="shrink-0 flex flex-col items-start sm:items-end gap-1">
              <span className="text-[3.5rem] font-black text-amber-500 leading-none tracking-tight">
                {education.grade}
              </span>
              <span className="text-[#7A5C6E] text-xs font-medium">Overall Grade</span>
            </div>
          </div>
        </motion.div>

        {/* Additional */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {education.additional.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 + 0.15, duration: 0.55, ease: EASE }}
              className="p-4 rounded-xl border border-[#2B1B2E]/[0.08] bg-white/65
                         hover:border-amber-300/50 hover:bg-white/85 transition-all duration-300 shadow-sm"
            >
              <p className="text-[#2B1B2E]/75 text-sm font-semibold leading-snug">{a.label}</p>
              <div className="flex items-baseline justify-between mt-2 gap-2">
                <span className={`font-bold text-base ${a.grade === "In progress" ? "text-[#9B5DE5]" : "text-amber-600"}`}>
                  {a.grade}
                </span>
                <span className="text-[#7A5C6E]/60 text-xs">{a.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
