import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser'
import './Contact.css'

// ─── YOUR EMAILJS CREDENTIALS ────────────────────────────
// 1. Sign up free at https://emailjs.com
// 2. Add service → Gmail → connect anjali.aggarwal534@gmail.com
// 3. Create template — use these variable names:
//    {{from_name}}, {{from_email}}, {{message}}
// 4. Paste your IDs below
const SERVICE_ID  = 'YOUR_SERVICE_ID'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
// ─────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const { ref, inView }     = useInView({ threshold: 0.08, triggerOnce: true })

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const send = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('empty'); return
    }
    setStatus('sending')
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name:  form.name,
        from_email: form.email,
        message:    form.message,
        to_email:   'anjali.aggarwal534@gmail.com',
      }, PUBLIC_KEY)
      setStatus('done')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const btnLabel = { idle:'Send Message', empty:'Fill all fields!', sending:'Sending...', done:'Sent! I\'ll reply soon ✓', error:'Error — try again' }

  return (
    <div className="page">
      <div className="wrap">
        <div className="sec-label">
          <span className="sec-label-text">Contact</span>
          <div className="sec-label-line" />
          <span className="sec-label-num">05</span>
        </div>

        <div ref={ref} className={`contact-layout reveal ${inView ? 'in' : ''}`}>
          {/* LEFT */}
          <div className="cl-left">
            <h2 className="contact-big">
              Let's build<br/>
              <em>something</em><br/>
              <strong>together.</strong>
            </h2>
            <p className="contact-sub">
              Open to Full Stack Developer and Data Science roles in Delhi, Noida, and Gurgaon.
              I bring ML depth and strong frontend craft to every role I take.
            </p>
            <div className="contact-links">
              <a href="mailto:anjali.aggarwal534@gmail.com" className="clink hoverable">
                <span className="cl-type">Email</span>
                anjali.aggarwal534@gmail.com
              </a>
              <a href="tel:+917827194116" className="clink hoverable">
                <span className="cl-type">Phone</span>
                +91-7827194116
              </a>
              <a href="https://github.com/Anjali-534" target="_blank" rel="noreferrer" className="clink hoverable">
                <span className="cl-type">GitHub</span>
                github.com/Anjali-534
              </a>
            </div>

            {/* availability card */}
            <div className="avail-card">
              <div className="avail-dot" />
              <div>
                <div className="avail-title">Available for opportunities</div>
                <div className="avail-sub">Full Stack · Data Science · Delhi NCR</div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="cr-right">
            <div className="form-card">
              <h3>Send a message</h3>
              <p className="fc-sub">It lands directly in my inbox — I'll get back to you within 24 hours.</p>
              <div className="fi">
                <label>Your name</label>
                <input name="name" value={form.name} onChange={handle} placeholder="What should I call you?" />
              </div>
              <div className="fi">
                <label>Email address</label>
                <input name="email" type="email" value={form.email} onChange={handle} placeholder="Where should I reply?" />
              </div>
              <div className="fi">
                <label>Message</label>
                <textarea name="message" rows={5} value={form.message} onChange={handle} placeholder="Tell me about the role, project, or collaboration..." />
              </div>
              <button
                className={`submit hoverable ${status}`}
                onClick={send}
                disabled={status === 'sending'}
              >
                {btnLabel[status]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
