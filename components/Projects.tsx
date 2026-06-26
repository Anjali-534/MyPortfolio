"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { projects, type Project } from "@/data"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Sunset-palette accent sets for Full-Stack cards (coral → peach family)
const FS_ACCENTS = [
  {
    bar: "linear-gradient(90deg, #FF7E5F, #FFB088)",
    from: "#FF7E5F",
    chip: "bg-[#FFF0E8] text-[#C0491A] border-[#FFD0B5]",
  },
  {
    bar: "linear-gradient(90deg, #FFB088, #FF6B9D)",
    from: "#FFB088",
    chip: "bg-[#FFF5F0] text-[#C0541A] border-[#FFD5B8]",
  },
  {
    bar: "linear-gradient(90deg, #F9C74F, #FF7E5F)",
    from: "#F9C74F",
    chip: "bg-[#FFFBEC] text-[#996800] border-[#FFE89A]",
  },
  {
    bar: "linear-gradient(90deg, #FF6B9D, #9B5DE5)",
    from: "#FF6B9D",
    chip: "bg-[#FFF0F7] text-[#9B2A6B] border-[#FFB8D9]",
  },
]

// Sunset-palette accent sets for AI / ML cards (violet → lavender family)
const AI_ACCENTS = [
  {
    bar: "linear-gradient(90deg, #9B5DE5, #B57EDC)",
    from: "#9B5DE5",
    chip: "bg-[#F5F0FF] text-[#5A20B0] border-[#D4BBFF]",
  },
  {
    bar: "linear-gradient(90deg, #B57EDC, #FF6B9D)",
    from: "#B57EDC",
    chip: "bg-[#FDF0FF] text-[#7A35A0] border-[#E4BBFF]",
  },
  {
    bar: "linear-gradient(90deg, #7B68EE, #9B5DE5)",
    from: "#7B68EE",
    chip: "bg-[#EEEEFF] text-[#3535AA] border-[#C0C0FF]",
  },
]

// ── Icons ─────────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.01-2-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StackChips({ chips, chipClass }: { chips: string[]; chipClass: string }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tech stack">
      {chips.map((s) => (
        <span
          key={s}
          role="listitem"
          className={`text-[11px] font-semibold px-2.5 py-[3px] rounded-full border ${chipClass}`}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

function CardLinks({ project, accentColor }: { project: Project; accentColor: string }) {
  return (
    <div className="flex items-center gap-4 pt-1 mt-auto">
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} GitHub repository`}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#5A3D5C]/65 hover:text-[#2B1B2E] transition-colors duration-200"
        >
          <GitHubIcon />
          GitHub
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#2B1B2E]/25 cursor-default select-none italic">
          Private repo
        </span>
      )}

      {project.live && (
        <>
          <span className="w-px h-3.5 bg-[#2B1B2E]/10" aria-hidden="true" />
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} live demo`}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200 hover:opacity-75"
            style={{ color: accentColor }}
          >
            Live Demo
            <ExternalIcon />
          </a>
        </>
      )}
    </div>
  )
}

// ── Featured card (gogoo) ─────────────────────────────────────────────────────

function FeaturedCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduced = useReducedMotion()
  const accent = FS_ACCENTS[0]

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.8, ease: EASE }}
      whileHover={reduced ? {} : { y: -5 }}
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white/78 border border-[#2B1B2E]/[0.07] shadow-[0_6px_36px_rgba(43,27,46,0.08)] hover:shadow-[0_18px_56px_rgba(43,27,46,0.13)] transition-shadow duration-300"
      aria-label={`Featured project: ${project.name}`}
    >
      {/* Thick gradient top bar */}
      <div className="h-[10px] w-full" style={{ background: accent.bar }} aria-hidden="true" />

      {/* Warm background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 45% at 25% 10%, rgba(255,126,95,0.07), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row gap-8 p-8 lg:p-10 relative z-10">
        {/* Left column: badge, title, description, links */}
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          <div className="flex flex-col gap-2">
            <span
              className="self-start text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-[5px] rounded-full"
              style={{ background: "rgba(255,126,95,0.12)", color: "#FF7E5F" }}
            >
              Featured Project
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1B2E] leading-[1.05] group-hover:text-[#FF7E5F] transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-[15px] text-[#7A5C6E] font-medium">{project.tagline}</p>
          </div>

          <p className="text-[14.5px] text-[#5A3D5C]/80 leading-relaxed max-w-2xl">
            {project.description}
          </p>

          <CardLinks project={project} accentColor={accent.from} />
        </div>

        {/* Right column: tech stack */}
        <div className="flex flex-col gap-3 lg:min-w-[220px] lg:pt-12 shrink-0">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#7A5C6E]/55">
            Tech Stack
          </p>
          <StackChips chips={project.stack} chipClass={accent.chip} />
        </div>
      </div>
    </motion.article>
  )
}

// ── Regular card ──────────────────────────────────────────────────────────────

function RegularCard({
  project,
  index,
  accents,
}: {
  project: Project
  index: number
  accents: typeof FS_ACCENTS
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduced = useReducedMotion()
  const accent = accents[index % accents.length]

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : index * 0.07, ease: EASE }}
      whileHover={reduced ? {} : { y: -4 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/70 border border-[#2B1B2E]/[0.07] shadow-[0_4px_24px_rgba(43,27,46,0.06)] hover:shadow-[0_14px_44px_rgba(43,27,46,0.11)] transition-shadow duration-300"
    >
      {/* Gradient top band */}
      <div className="h-[7px] w-full" style={{ background: accent.bar }} aria-hidden="true" />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${accent.from}0D, transparent 65%)` }}
        aria-hidden="true"
      />

      <div className="flex flex-col flex-1 p-6 gap-4 relative z-10">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-[#2B1B2E] leading-snug group-hover:text-[#FF7E5F] transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-[13px] text-[#7A5C6E] font-medium mt-0.5">{project.tagline}</p>
        </div>

        <p className="text-[13.5px] text-[#5A3D5C]/80 leading-relaxed">
          {project.description}
        </p>

        <StackChips chips={project.stack} chipClass={accent.chip} />

        <CardLinks project={project} accentColor={accent.from} />
      </div>
    </motion.article>
  )
}

// ── Group header ──────────────────────────────────────────────────────────────

function GroupHeader({
  label,
  count,
  gradientFrom,
  gradientTo,
  index,
}: {
  label: string
  count: number
  gradientFrom: string
  gradientTo: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.1, ease: EASE }}
      className="flex items-center gap-4"
    >
      {/* Colored rule */}
      <div
        className="h-[3px] w-10 rounded-full shrink-0"
        style={{ background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})` }}
        aria-hidden="true"
      />
      <h3 className="text-lg font-bold tracking-tight text-[#2B1B2E]">{label}</h3>
      <span className="ml-1 text-sm text-[#7A5C6E]/60 font-medium tabular-nums">
        {count} project{count !== 1 ? "s" : ""}
      </span>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Projects() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" })
  const reduced = useReducedMotion()

  const fullstack = projects.filter((p) => p.group === "fullstack")
  const aiml      = projects.filter((p) => p.group === "aiml")
  const featured  = fullstack.find((p) => p.featured)!
  const fsRest    = fullstack.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* ── Section heading ── */}
        <div ref={headingRef}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF7E5F] mb-3"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.08, ease: EASE }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2B1B2E] leading-[1.05]"
          >
            Things I&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#FF7E5F] via-[#FF6B9D] to-[#9B5DE5] bg-clip-text text-transparent">
              Shipped
            </span>
          </motion.h2>
        </div>

        {/* ── Full-Stack & Web group ── */}
        <div className="flex flex-col gap-8">
          <GroupHeader
            label="Full-Stack & Web"
            count={fullstack.length}
            gradientFrom="#FF7E5F"
            gradientTo="#FFB088"
            index={0}
          />

          {/* Featured (gogoo) */}
          <FeaturedCard project={featured} />

          {/* 2-column grid for the remaining fullstack projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fsRest.map((project, i) => (
              <RegularCard
                key={project.name}
                project={project}
                index={i}
                accents={FS_ACCENTS}
              />
            ))}
          </div>
        </div>

        {/* ── AI / ML group ── */}
        <div className="flex flex-col gap-8">
          <GroupHeader
            label="AI / ML"
            count={aiml.length}
            gradientFrom="#9B5DE5"
            gradientTo="#B57EDC"
            index={1}
          />

          {/* 3-column grid, collapses to 1 on mobile, 2 on sm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiml.map((project, i) => (
              <RegularCard
                key={project.name}
                project={project}
                index={i}
                accents={AI_ACCENTS}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
