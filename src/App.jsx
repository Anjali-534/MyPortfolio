import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './styles/global.css'

import Cursor     from './components/Cursor'
import Navbar     from './components/Navbar'
import Footer     from './components/Footer'

import Home       from './pages/Home'
import About      from './pages/About'
import Experience from './pages/Experience'
import Projects   from './pages/Projects'
import Gallery    from './pages/Gallery'
import Contact    from './pages/Contact'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function Layout() {
  return (
    <>
      <div className="noise" />
      <Cursor />
      <Navbar />
      <ScrollTop />
      <Routes>
        <Route path="/"           element={<Home />}       />
        <Route path="/about"      element={<About />}      />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects"   element={<Projects />}   />
        <Route path="/gallery"    element={<Gallery />}    />
        <Route path="/contact"    element={<Contact />}    />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
