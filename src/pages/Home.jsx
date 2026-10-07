import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import './Home.css'

const stats = [
  { n: '91%', l: 'B.Tech CGPA' },
  { n: '95%', l: 'ML Accuracy' },
  { n: '6+',  l: 'Projects'    },
  { n: '3×',  l: 'Work Roles'  },
]

const ticker = ['REACT.JS','PYTHON','PYTORCH','NODE.JS','TENSORFLOW','NEXT.JS','NLP',
  'SCIKIT-LEARN','SQL','DOCKER','FIREBASE','MONGODB','STREAMLIT','REST APIs','ADVANCED EXCEL']

export default function Home() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <div className="page home-page">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow1" />
        <div className="hero-glow2" />

        <div className="hero-inner">
          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-eyebrow">Full Stack Developer &amp; AI/ML Engineer</div>
            <h1 className="hero-name">
              <span className="name-italic">Anjali</span>
              <span className="name-bold">Aggarwal.</span>
            </h1>
            <p className="hero-desc">
              Co-founder &amp; Lead Engineer at Bogie AI Technologies — building India's mobility &amp; logistics platform.
              Full-stack engineer, AI/ML practitioner, and perpetual builder.
              Based in Delhi NCR.
            </p>
            <div className="hero-btns">
              <Link to="/projects" className="btn-fill">View Work</Link>
              <Link to="/contact"  className="btn-ghost">Let's Talk</Link>
            </div>
            <div className="hero-stats">
              {stats.map((s,i) => (
                <div key={i} className="hstat">
                  <div className="hstat-n">{s.n}</div>
                  <div className="hstat-l">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="hero-quote">
              <span className="hq-mark">&ldquo;</span>
              <p className="hq-text">That brain of mine is something more than merely mortal.</p>
              <span className="hq-attr">— Ada Lovelace, world's first programmer</span>
            </div>
          </div>

          {/* RIGHT — PHOTO */}
          <div className="hero-photo-wrap">
            <div className="photo-frame">
              <img src="/anjali.jpeg" alt="Anjali Aggarwal" className="hero-photo" />
              <div className="photo-badge">
                <span className="pb-dot" />
                Open to Work
              </div>
              <div className="photo-tag">Delhi NCR · 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...ticker, ...ticker].map((t,i) => (
            <span key={i}>{t}<span className="ticker-dot">◆</span></span>
          ))}
        </div>
      </div>

      {/* ── QUICK INTRO ── */}
      <section ref={ref} className={`quick-intro reveal ${inView ? 'in' : ''}`}>
        <div className="wrap qi-grid">
          <div className="qi-text">
            <div className="sec-label">
              <span className="sec-label-text">Who I am</span>
              <div className="sec-label-line" />
            </div>
            <h2 className="st">The engineer who<br/><em>does it all.</em></h2>
            <p>A girl who scores <strong>91%</strong> AND ships real <strong>ML models</strong> AND builds <strong>full-stack apps</strong> AND runs a <strong>food blog</strong> AND manages an <strong>NGO</strong> AND is <strong>learning French</strong>. Like... that's not normal. That's someone who refuses to be one thing.</p>
            <p>Anjali understands both — the <strong>mathematics</strong> of a neural network and the craft of a <strong>pixel-perfect</strong> interface. She doesn't choose between AI and design. She refuses to.</p>
            <div className="qi-links">
              <Link to="/about"    className="btn-fill">About Me</Link>
              <Link to="/projects" className="btn-ghost">See Projects</Link>
            </div>
          </div>
          <div className="qi-cards">
            {[
              { icon: '🚀', title: 'Co-founder',     sub: 'Bogie AI Technologies · Delhi NCR mobility startup' },
              { icon: '🧠', title: 'AI / ML',        sub: 'PyTorch · TensorFlow · scikit-learn · XAI · RAG'    },
              { icon: '🌐', title: 'Full Stack',     sub: 'Go · React · Next.js · React Native · Node.js'      },
              { icon: '📊', title: 'Data & Infra',   sub: 'PostgreSQL · MongoDB · Docker · Railway · Razorpay' },
            ].map((c,i) => (
              <div key={i} className="qi-card hoverable" style={{ animationDelay: `${i*.1}s` }}>
                <div className="qi-icon">{c.icon}</div>
                <div className="qi-card-title">{c.title}</div>
                <div className="qi-card-sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
