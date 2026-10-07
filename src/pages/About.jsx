import { useInView } from 'react-intersection-observer'
import './About.css'

const skills = [
  { label: 'Python',         type: 'hot'  }, { label: 'React.js',       type: 'hot'  },
  { label: 'PyTorch',        type: 'hot'  }, { label: 'Node.js',        type: 'hot'  },
  { label: 'TensorFlow',     type: 'warm' }, { label: 'Next.js',        type: 'warm' },
  { label: 'NLP / NLTK',     type: 'warm' }, { label: 'scikit-learn',   type: 'warm' },
  { label: 'SQL'             }, { label: 'MongoDB'         }, { label: 'Firebase'       },
  { label: 'Docker'          }, { label: 'REST APIs'       }, { label: 'Git'            },
  { label: 'Streamlit'       }, { label: 'Advanced Excel'  }, { label: 'Pandas & NumPy' },
  { label: 'Matplotlib'      },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  return (
    <div className="page">
      <div className="wrap">
        <div className="sec-label">
          <span className="sec-label-text">About Me</span>
          <div className="sec-label-line" />
          <span className="sec-label-num">01</span>
        </div>
        <h2 className="st">The person behind <em>the code.</em></h2>

        <div ref={ref} className={`about-layout reveal ${inView ? 'in' : ''}`}>
          <div className="about-body">
            <p>I'm co-founder and lead engineer at <strong>Bogie AI Technologies Pvt. Ltd.</strong>, where I'm building India's multi-vertical mobility and logistics platform covering cab, truck, ambulance, and parcel delivery. I also graduated B.Tech IT from <strong>Dr. ADGIPS, GGSIPU</strong> in 2025 with a 91%.</p>
            <p>Right now I'm building an <strong>Explainable AI system for medical X-ray classification</strong> — a responsible AI pipeline that doesn't just predict, it explains why. Because in healthcare, black-box models are unacceptable.</p>
            <p>I've worked across <strong>three real roles</strong>, shipped products for actual users, and trained ML models that hold up under pressure. I also run <strong>FryCuisine</strong>, a React + WordPress food blog, and have been <strong>Program Manager at Hamara Book Bank NGO since 2018.</strong></p>
            <p>IBM certified in Data Science. Two-time Ideathon runner-up at IEEE GGSIPU. SIH Level 2 qualifier. Trilingual — Hindi, English, and French.</p>
            <div className="skill-strip">
              {skills.map((s, i) => (
                <div key={i} className={`sk hoverable ${s.type || ''}`}>{s.label}</div>
              ))}
            </div>
          </div>

          <div className="about-sidebar">
            {[
              { label: 'Company',      val: 'Bogie AI Technologies',          sub: 'Co-founder & Lead Engineer · Delhi NCR', link: 'https://bogie.in' },
              { label: 'Status',      val: 'Open to Work',                   sub: 'Delhi · Noida · Gurgaon' },
              { label: 'Education',    val: 'B.Tech IT — 91%',                sub: 'GGSIPU · Minor in AI/ML · 2025' },
              { label: 'Certified',    val: 'IBM Data Science',               sub: 'Industry Standard' },
              { label: 'Languages',    val: 'Hindi · English · Français',     sub: 'French (DU, 2026)' },
              { label: 'Email',        val: 'anjali.aggarwal534@gmail.com',   sub: '+91-7827194116', sm: true },
              { label: 'GitHub',       val: 'github.com/Anjali-534',          sub: 'Open source work', sm: true },
            ].map((c,i) => {
              const inner = (
                <>
                  <div className="ac-label">{c.label}</div>
                  <div className={`ac-val ${c.sm ? 'sm' : ''}`}>{c.val}</div>
                  <div className="ac-sub">{c.sub}</div>
                </>
              )
              return c.link ? (
                <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className="aside-card hoverable"
                   style={{ display: 'block', position: 'relative', textDecoration: 'none', color: 'inherit' }}>
                  <span style={{ position: 'absolute', top: '.8rem', right: '1rem', fontSize: '.75rem', fontWeight: 700, color: 'var(--mustard)' }}>↗</span>
                  {inner}
                </a>
              ) : (
                <div key={i} className="aside-card hoverable">{inner}</div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
