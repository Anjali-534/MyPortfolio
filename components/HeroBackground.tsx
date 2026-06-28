"use client"

import dynamic from "next/dynamic"

const HeroBackgroundCanvas = dynamic(
  () => import("@/components/HeroBackgroundCanvas"),
  { ssr: false }
)

export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}
    >
      {/* WebGL shader gradient + floating orbs — fills hero behind all content */}
      <HeroBackgroundCanvas />

      {/* Directional scrim: protects left-side text, lets right side show colour */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(105deg, rgba(255,245,238,0.55) 0%, rgba(255,235,230,0.22) 50%, rgba(255,230,240,0.05) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
