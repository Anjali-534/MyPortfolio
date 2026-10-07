import { useInView } from 'react-intersection-observer'
import './Projects.css'

const projects = [
  { index:'00 — Flagship', cat:'Startup · Full Stack · Mobile', mega:true, title:'Bogie — Mobility & Logistics Platform', desc:"Co-founded and built end-to-end as Lead Engineer at Bogie AI Technologies Pvt. Ltd. A multi-vertical mobility platform covering cab, truck, ambulance, and parcel delivery — India's Uber meets Dunzo, built from scratch. Full production system with real users across Delhi NCR.",
    highlights:[
      'Go/Gin REST backend on Railway + PostgreSQL',
      'Next.js admin dashboard + master panel',
      'Bogie Tracker — standalone B2B SaaS fleet dispatch panel',
      'Expo/React Native user-app + driver-app (Play Store ready)',
      'Razorpay + RazorpayX payout integration, driver wallet & ledger PDFs',
      'Rider referral system, OTP brute-force protection, push notifications',
      'i18n in English, Hindi & Odia across 53+ screens redesigned',
      'DPDP Act 2023-compliant, trademark filed across 4 classes',
    ],
    tech:['Go/Gin','PostgreSQL','Next.js','React Native','Expo EAS','Razorpay','Resend','Railway','Docker'], link:'https://bogie.in', linkLabel:'bogie.in' },
  { index:'01', cat:'B2B SaaS · Fleet Tech', title:'Bogie Tracker', desc:'Standalone B2B SaaS fleet dispatch and tracking panel for logistics companies. Subscription billing with daily charge jobs, live fleet mapping, multi-drop trip support, proof-of-delivery flows, CSV export, date-range filters, and traffic-aware route planning via Ola Directions API. Built as a standalone Next.js app integrated with the Bogie master dashboard.', tech:['Next.js','PostgreSQL','Google Places API','Ola Maps','JWT Auth','Cloudflare'], link:'https://bogie.in', linkLabel:'bogie.in' },
  { index:'02', cat:'AI · NLP', featured:true, title:'Fake News Detector', desc:'ML-powered detection using PassiveAggressiveClassifier — 95% accuracy. NLTK preprocessing, TF-IDF feature extraction, Streamlit deployment for real-time predictions. Production-grade NLP pipeline from scratch.', tech:['Python','scikit-learn','NLTK','TF-IDF','Streamlit'] },
  { index:'03', cat:'GenAI',      title:'Elevate Sphere',        desc:'AI-driven business idea generator from prompts — market analysis and crowdsourcing insights built in. Smarter ideation at the speed of thought.',                                                        tech:['Python','NLP','AI/ML'] },
  { index:'04', cat:'Full Stack',  title:'Netflix Clone',         desc:'Streaming clone with seamless playback, Google + email auth. Usability-tested with 300+ real users. Production-level complexity and polish.',                                                         tech:['React.js','Firebase','Auth'] },
  { index:'05', cat:'Automation',  title:'JarvisAI Desktop Bot',  desc:'Voice-controlled desktop assistant — web searches, app launches, system commands. Speech recognition + TTS + ML capabilities combined.',                                                            tech:['Python','Speech Recognition','TTS'] },
  { index:'06', cat:'Full Stack',  title:'Movie Booking System',  desc:'Real-time seat selection, booking history, Firebase storage and auth. End-to-end web booking platform for movies and showtimes.',                                                                   tech:['React.js','Firebase','Node.js'] },
  { index:'07 — WIP', cat:'XAI · Medical AI', title:'X-Ray Classifier', desc:'Explainable AI for medical X-ray classification — predicts AND explains why. Responsible AI pipeline with LIME/SHAP interpretability for healthcare.',                                      tech:['PyTorch','LIME/SHAP','CNN'] },
  { index:'08', cat:'NGO · MERN',  title:'Hamara Book Bank Platform', desc:"Full MERN platform for the NGO I've managed since 2018. 50+ REST endpoints, Razorpay donation payments, MongoDB Atlas, and a complete admin system for book inventory and distribution management.", tech:['MongoDB','Express','React.js','Node.js','Razorpay'] },
  { index:'09', cat:'AI · RAG',    title:'RAG PDF Q&A System',        desc:'Retrieval-Augmented Generation system for querying PDF documents using a FAISS vector store. Ask any question, get grounded cited answers from your own documents.', tech:['Python','FAISS','LangChain','RAG','LLM'] },
]

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  return (
    <div className="page">
      <div className="wrap">
        <div className="sec-label">
          <span className="sec-label-text">Projects</span>
          <div className="sec-label-line" />
          <span className="sec-label-num">03</span>
        </div>
        <h2 className="st">Things I've actually <em>shipped.</em></h2>
        <div ref={ref} className={`proj-grid reveal ${inView ? 'in' : ''}`}>
          {projects.map((p, i) => p.mega ? (
            <div key={i} className="pj mega hoverable" style={{ transitionDelay: `${i * .07}s` }}>
              <div className="pj-index">{p.index}</div>
              <div className="pj-cat">{p.cat}</div>
              <div className="pj-title">{p.title}</div>
              <p className="pj-desc">{p.desc}</p>
              <ul className="pj-highlights">
                {p.highlights.map((h,j) => <li key={j}><span className="pj-hl-bullet">◆</span>{h}</li>)}
              </ul>
              <div className="pj-tech">{p.tech.map((t,j) => <span key={j} className="pt">{t}</span>)}</div>
              <div className="pj-mega-foot">
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-fill pj-mega-link">↗ {p.linkLabel}</a>
              </div>
            </div>
          ) : (
            <div key={i} className={`pj hoverable ${p.featured ? 'featured' : ''}`} style={{ transitionDelay: `${i * .07}s` }}>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="pj-link" aria-label={`Visit ${p.linkLabel || p.title}`}>↗</a>
              )}
              <div className="pj-index">{p.index}</div>
              <div className="pj-cat">{p.cat}</div>
              <div className="pj-title">{p.title}</div>
              <p className="pj-desc">{p.desc}</p>
              <div className="pj-tech">{p.tech.map((t,j) => <span key={j} className="pt">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
