import SceneClient from "@/components/SceneClient"
import HeroBackground from "@/components/HeroBackground"
import HeroForeground from "@/components/HeroForeground"
import SmoothScroll from "@/components/SmoothScroll"
import Nav from "@/components/Nav"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Education from "@/components/Education"
import Achievements from "@/components/Achievements"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <SmoothScroll />

      {/* Fixed 3D canvas — sits behind everything, visible on all sections */}
      <SceneClient />

      <Nav />

      <main className="relative text-[#2B1B2E] overflow-x-hidden" style={{ zIndex: 1 }}>

        {/* ── Hero — shader gradient bg at z-0, orbs + particles + text above ── */}
        <section id="home" className="relative w-full min-h-screen overflow-hidden">
          <HeroBackground />
          <div className="absolute inset-0 pointer-events-none z-[2] bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,248,243,0.55),transparent)]" />
          <div className="absolute inset-0 pointer-events-none z-[2] bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(155,93,229,0.05),transparent)]" />
          <HeroForeground />
        </section>

        {/* ── All other sections — cream at 82% opacity so 3D glows through ── */}
        <div style={{ backgroundColor: "rgba(255,248,243,0.82)" }}>
          <div className="h-px bg-gradient-to-r from-transparent via-[#FF7E5F]/15 to-transparent" />
          <About />
          <div className="h-px bg-gradient-to-r from-transparent via-[#2B1B2E]/[0.06] to-transparent" />
          <Skills />
          <div className="h-px bg-gradient-to-r from-transparent via-[#2B1B2E]/[0.06] to-transparent" />
          <Experience />
          <div className="h-px bg-gradient-to-r from-transparent via-[#2B1B2E]/[0.06] to-transparent" />
          <Projects />
          <div className="h-px bg-gradient-to-r from-transparent via-[#2B1B2E]/[0.06] to-transparent" />
          <Education />
          <div className="h-px bg-gradient-to-r from-transparent via-[#2B1B2E]/[0.06] to-transparent" />
          <Achievements />
          <div className="h-px bg-gradient-to-r from-transparent via-[#2B1B2E]/[0.06] to-transparent" />
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  )
}
