"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { profile } from "@/data"

const LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Contact",    href: "#contact"    },
]

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function scrollTo(href: string) {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
      >
        <div
          className={`flex items-center justify-between gap-8 px-5 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl border border-[#2B1B2E]/[0.09] shadow-lg shadow-[#FF7E5F]/10"
              : "bg-transparent"
          }`}
        >
          {/* Logo + avatar */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home") }}
            className="flex items-center gap-2.5 text-sm font-bold text-[#2B1B2E]/80 hover:text-[#2B1B2E] transition-colors shrink-0"
          >
            <span className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#FF7E5F]/40 ring-offset-1 ring-offset-white/80 flex-shrink-0">
              <Image
                src={profile.headshotSrc}
                alt={profile.name}
                fill
                sizes="32px"
                className="object-cover object-top"
              />
            </span>
            <span className="hidden sm:block"><span className="text-[#FF7E5F]">A</span>njali</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                className="px-4 py-1.5 rounded-full text-sm text-[#7A5C6E] hover:text-[#2B1B2E] hover:bg-[#2B1B2E]/[0.06] transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="mailto:anjali.aggarwal534@gmail.com"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full
                       bg-gradient-to-r from-[#FF7E5F] to-[#9B5DE5] text-white text-sm font-semibold
                       shadow-md shadow-[#FF7E5F]/25 hover:shadow-[#FF7E5F]/40 transition-shadow duration-300"
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-1.5"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-5 bg-[#2B1B2E]/60 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block h-px w-5 bg-[#2B1B2E]/60 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-[#2B1B2E]/60 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl border border-[#2B1B2E]/10
                       bg-[#FFF8F3]/97 backdrop-blur-xl p-4 shadow-xl shadow-[#FF7E5F]/12"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                className="flex items-center px-4 py-3 rounded-xl text-[#7A5C6E] hover:text-[#2B1B2E] hover:bg-[#FF7E5F]/[0.07] transition-all text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 pt-2 border-t border-[#2B1B2E]/[0.07]">
              <a
                href="mailto:anjali.aggarwal534@gmail.com"
                className="flex items-center justify-center px-4 py-2.5 rounded-xl
                           bg-gradient-to-r from-[#FF7E5F] to-[#9B5DE5] text-white text-sm font-semibold"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
