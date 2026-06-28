"use client"

import { useRef, useEffect } from "react"
import { useReducedMotion } from "framer-motion"

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (prefersReduced) {
      video.pause()
    } else {
      video.play().catch(() => {})
    }
  }, [prefersReduced])

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}
    >
      {/* Full-bleed video — bottom-most layer */}
      <video
        ref={videoRef}
        className="hero-video-el"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.35,
          filter: "blur(2px) saturate(1.1)",
          mixBlendMode: "soft-light",
          zIndex: 0,
          animation: prefersReduced
            ? "none"
            : "hero-ken-burns 20s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Warm cream-to-transparent scrim — above video, below all text/UI */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(105deg, rgba(255,245,238,0.92) 0%, rgba(255,235,230,0.6) 45%, rgba(255,230,240,0.35) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
