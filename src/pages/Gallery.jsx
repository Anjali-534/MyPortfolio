import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import './Gallery.css'

// Project cards (no real screenshots yet — styled placeholder tiles)
const projectItems = [
  { title: 'Fake News Detector', label: 'AI · NLP',        accent: '#8B2635', stat: '95% Accuracy' },
  { title: 'Elevate Sphere',     label: 'GenAI',           accent: '#C9922A', stat: 'AI-Powered' },
  { title: 'Netflix Clone',      label: 'Full Stack',      accent: '#5C3D22', stat: '300+ Users' },
  { title: 'JarvisAI Bot',       label: 'Automation',      accent: '#3D2714', stat: 'Voice-Controlled' },
  { title: 'Movie Booking',      label: 'Full Stack',      accent: '#221508', stat: 'Real-Time Seats' },
  { title: 'X-Ray Classifier',   label: 'XAI · Medical',   accent: '#6B1F2A', stat: 'WIP — XAI' },
  { title: 'FryCuisine Blog',    label: 'React + WP',      accent: '#C9922A', stat: 'Food Blog' },
  { title: 'Aggarwal Publicity', label: 'Freelance',       accent: '#4A2E1A', stat: 'Live Website' },
]

const personalItems = [
  { caption: 'EverBake moment ☕',        hint: 'The photo on the homepage — chocolate cake era 🎂' },
  { caption: 'Building FryCuisine 🍳',    hint: 'Debugging the mosaic grid at midnight' },
  { caption: 'IEEE Ideathon 🏅',          hint: 'Runner-up. Two consecutive years.' },
  { caption: 'SIH Level 2 🚀',            hint: 'National hackathon energy' },
  { caption: 'NGO work 📚',              hint: 'Hamara Book Bank since 2018' },
  { caption: 'Learning French 🗼',        hint: 'Delhi University · 2026' },
]

function GallerySection({ title, sub, children }) {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  return (
    <div ref={ref} className={`gallery-section reveal ${inView ? 'in' : ''}`}>
      <div className="gs-header">
        <h3 className="gs-title">{title}</h3>
        <p className="gs-sub">{sub}</p>
      </div>
      {children}
    </div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <div className="page">
      <div className="wrap">
        <div className="sec-label">
          <span className="sec-label-text">Gallery</span>
          <div className="sec-label-line" />
          <span className="sec-label-num">05</span>
        </div>
        <h2 className="st">Work &amp; <em>life in frames.</em></h2>
        <p className="gallery-intro">A visual snapshot of what I've built and who I am beyond the resume.</p>

        {/* PROJECTS GRID */}
        <GallerySection title="Projects" sub="Things I've shipped — hover to explore">
          <div className="proj-mosaic">
            {projectItems.map((p, i) => (
              <div
                key={i} className="pm-tile hoverable"
                style={{ '--accent': p.accent, animationDelay: `${i * .06}s` }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="pm-bg" />
                <div className="pm-content">
                  <div className="pm-label">{p.label}</div>
                  <div className="pm-title">{p.title}</div>
                  <div className={`pm-stat ${active === i ? 'show' : ''}`}>{p.stat}</div>
                </div>
                <div className="pm-index">0{i+1}</div>
              </div>
            ))}
          </div>
        </GallerySection>

        {/* PERSONAL SECTION */}
        <GallerySection title="Personal" sub="Life beyond the IDE">
          <div className="personal-grid">
            {/* Hero photo featured */}
            <div className="pg-feature hoverable">
              <img src="/anjali.jpeg" alt="Anjali at EverBake" />
              <div className="pg-feature-caption">
                <span className="pgf-tag">Personal · Delhi</span>
                <span className="pgf-title">EverBake Night ☕</span>
                <span className="pgf-sub">The girl who codes and eats cake. Both with equal dedication.</span>
              </div>
            </div>
            {/* Personal tiles */}
            <div className="personal-tiles">
              {personalItems.map((p, i) => (
                <div key={i} className="ptile hoverable" style={{ animationDelay: `${i * .07}s` }}>
                  <div className="ptile-emoji">
                    {['☕','🍳','🏅','🚀','📚','🗼'][i]}
                  </div>
                  <div className="ptile-caption">{p.caption}</div>
                  <div className="ptile-hint">{p.hint}</div>
                </div>
              ))}
            </div>
          </div>
        </GallerySection>

        {/* UPLOAD CTA */}
        <div className="upload-cta">
          <div className="uc-icon">📸</div>
          <div>
            <div className="uc-title">Want to add more photos?</div>
            <div className="uc-sub">Drop your project screenshots or personal pics into <code>public/gallery/</code> and update the Gallery component — it'll render them in the masonry grid automatically.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
