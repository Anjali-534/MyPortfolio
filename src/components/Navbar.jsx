import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Navbar.css'

const links = [
  { to: '/',           label: 'Home'       },
  { to: '/about',      label: 'About'      },
  { to: '/experience', label: 'Experience' },
  { to: '/projects',   label: 'Projects'   },
  { to: '/gallery',    label: 'Gallery'    },
  { to: '/contact',    label: 'Contact'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location                = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <NavLink to="/" className="nav-logo">
        Anjali <span>Aggarwal</span>
      </NavLink>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l.to}>
            <NavLink to={l.to} end className={({ isActive }) => isActive ? 'active' : ''}>
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <div className="nav-pill">
          <span className="pulse-dot" />
          Open to Work
        </div>
        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
