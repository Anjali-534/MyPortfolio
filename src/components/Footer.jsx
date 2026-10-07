import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo">Anjali Aggarwal</div>
        <p>Full Stack Dev · AI/ML Engineer · Delhi NCR</p>
      </div>
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/experience">Experience</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="footer-right">
        <a href="mailto:anjali.aggarwal534@gmail.com">anjali.aggarwal534@gmail.com</a>
        <span>© 2025 · Built with intention.</span>
      </div>
    </footer>
  )
}
