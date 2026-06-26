"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { profile } from "@/data"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const LINKS = [
  {
    label: "Email",
    value: profile.email,
    href:  `mailto:${profile.email}`,
    icon:  "✉",
    desc:  "Fastest response — typically same day",
  },
  {
    label: "GitHub",
    value: "github.com/Anjali-534",
    href:  profile.github,
    icon:  "{ }",
    desc:  "Projects, commits, and open source",
  },
  {
    label: "LinkedIn",
    value: "Anjali Aggarwal",
    href:  "https://www.linkedin.com/in/anjali-aggarwal534",
    icon:  "in",
    desc:  "Professional background and updates",
  },
  {
    label: "Location",
    value: profile.location,
    href:  null,
    icon:  "◎",
    desc:  "Open to hybrid and remote roles",
  },
]

function LinkCard({ link, index }: { link: (typeof LINKS)[number]; index: number }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: EASE }}
      className="group flex items-start gap-4 p-5 rounded-2xl border border-[#2B1B2E]/[0.08] bg-white/65
                 hover:border-[#FF7E5F]/30 hover:bg-white/90 transition-all duration-300 cursor-pointer shadow-sm"
      whileHover={{ y: -3 }}
    >
      <div className="shrink-0 w-10 h-10 rounded-xl border border-[#2B1B2E]/10 bg-gradient-to-br from-[#FF7E5F]/10 to-[#9B5DE5]/10
                      flex items-center justify-center text-sm font-bold text-[#FF7E5F] group-hover:from-[#FF7E5F]/20 group-hover:to-[#9B5DE5]/20 transition-all">
        {link.icon}
      </div>
      <div>
        <p className="text-[#2B1B2E]/60 text-[10px] font-bold tracking-widest uppercase mb-0.5">{link.label}</p>
        <p className="text-[#2B1B2E] text-sm font-semibold leading-snug">{link.value}</p>
        <p className="text-[#7A5C6E] text-xs mt-0.5">{link.desc}</p>
      </div>
      {link.href && (
        <span className="ml-auto shrink-0 text-[#7A5C6E]/40 group-hover:text-[#FF7E5F]/70 transition-colors text-sm">↗</span>
      )}
    </motion.div>
  )

  if (link.href) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    )
  }
  return inner
}

export default function Contact() {
  const headingRef    = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" })

  return (
    <section id="contact" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#FDEEE3] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7E5F]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#9B5DE5]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#FF7E5F]" />
            <span className="text-[#FF7E5F] text-xs font-bold tracking-[0.18em] uppercase">Get in touch</span>
            <span className="h-px w-8 bg-[#FF7E5F]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2B1B2E] leading-tight mb-5">
            Let&apos;s build something
            <br />
            <span className="bg-gradient-to-r from-[#FF7E5F] via-[#FF6B9D] to-[#9B5DE5] bg-clip-text text-transparent">
              worth talking about
            </span>
          </h2>
          <p className="text-[#7A5C6E] text-base max-w-md mx-auto leading-relaxed">
            I&apos;m actively looking for full-time software engineering roles. Whether it&apos;s a product pitch, a role that fits, or just a chat — I&apos;d love to connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {LINKS.map((link, i) => <LinkCard key={link.label} link={link} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          className="text-center"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-base
                       bg-gradient-to-r from-[#FF7E5F] via-[#FF6B9D] to-[#9B5DE5] text-white
                       shadow-lg shadow-[#FF7E5F]/30 hover:shadow-[#FF7E5F]/50 hover:-translate-y-1
                       transition-all duration-300"
          >
            <span>Start a conversation</span>
            <span>→</span>
          </a>
          <p className="text-[#7A5C6E]/50 text-xs mt-4">{profile.available} · {profile.location}</p>
        </motion.div>
      </div>
    </section>
  )
}
