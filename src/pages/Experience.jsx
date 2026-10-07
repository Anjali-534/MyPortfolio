import { useInView } from 'react-intersection-observer'
import './Experience.css'

const jobs = [
  { date: '2025 – Present', company: 'Bogie AI Technologies Pvt. Ltd.', role: 'Co-founder & Lead Engineer', desc: "Building India's multi-vertical mobility and logistics platform from zero — cab, truck, ambulance, and parcel delivery. Architected and built the entire stack solo: Go/Gin REST backend on Railway with PostgreSQL, Next.js admin panels, Expo/React Native user-app and driver-app (Play Store submission in progress), Razorpay and RazorpayX payout integration, driver wallet with monthly ledger PDFs via Resend, push notifications via Expo Push API, i18n in English/Hindi/Odia, referral system, OTP brute-force protection. Also built Bogie Tracker — a standalone B2B SaaS fleet dispatch and tracking panel with subscription billing and live fleet mapping. 53+ screens redesigned, 10+ auth boundary security gaps fixed.", tags: ['Go/Gin','PostgreSQL','React Native','Next.js','Expo EAS','Razorpay','Docker','Railway','B2B SaaS'], link: 'https://bogie.in' },
  { date: '2025 – Present', company: 'Aggarwal Publicity & Marketing', role: 'Freelance Web Developer', desc: 'Built a modern business website with accessibility-first design, structured information delivery, and optimized UI/UX. Collaborated with stakeholders to align digital solutions with business goals. Improved digital visibility and user engagement.', tags: ['React.js','UI/UX','Accessibility'] },
  { date: "May '25 – Feb '26", company: 'KVON Technologies', role: 'Machine Learning Trainee', desc: 'Hands-on training in supervised and unsupervised learning, model evaluation, and real-world problem solving using Python, scikit-learn, NumPy, and Pandas. Applied ML to automation and data-driven decision-making.', tags: ['Python','scikit-learn','NumPy','Pandas'] },
  { date: "Dec '24 – May '25", company: 'Zobox Protech Limited', role: 'Web Developer', desc: 'Full-stack development using Next.js — UI component design, cross-device performance optimization, real-time updates, and secure authentication. Also used Advanced Excel for data prediction and market analysis.', tags: ['Next.js','React.js','REST APIs','Excel'] },
  { date: "Jun '24 – Sep '24", company: 'Code Alpha', role: 'Web Development Intern', desc: 'Built a feature-rich music browser with playlist management, search, and volume control — increased session times by 30% from early user testing. Shipped a personal portfolio with responsive design and clean UX.', tags: ['React.js','JavaScript','Responsive Design','+30% Engagement'] },
]

function ExpRow({ job, i }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <div ref={ref} className={`exp-row hoverable reveal ${inView ? 'in' : ''}`} style={{ transitionDelay: `${i * .1}s` }}>
      <div className="exp-meta">
        <div className="exp-date">{job.date}</div>
        <div className="exp-co">{job.company}</div>
      </div>
      <div className="exp-content">
        <div className="exp-title">{job.role}</div>
        <p className="exp-body">{job.desc}</p>
        <div className="exp-tags">
          {job.tags.map((t,j) => <span key={j} className="etag">{t}</span>)}
        </div>
        {job.link && (
          <a href={job.link} target="_blank" rel="noopener noreferrer" className="exp-link">↗ Visit site</a>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <div className="page">
      <div className="wrap">
        <div className="sec-label">
          <span className="sec-label-text">Experience</span>
          <div className="sec-label-line" />
          <span className="sec-label-num">02</span>
        </div>
        <h2 className="st">Where I've been <em>building.</em></h2>
        <div className="exp-list">
          {jobs.map((j, i) => <ExpRow key={i} job={j} i={i} />)}
        </div>
      </div>
    </div>
  )
}
