import { NavLink, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchAPI } from '../lib/api'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [logo, setLogo] = useState(null)
  const baseURL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

  useEffect(() => {
    async function loadLogo() {
      try {
        const res = await fetchAPI('global?populate=logo')
        const logoData = res?.data?.logo
        if (logoData) setLogo(`${baseURL}${logoData.url}`)
      } catch (err) {
        console.error('Error fetching logo:', err)
      }
    }
    loadLogo()
  }, [])

  return (
    <header>
      {/* Navigation */}
      <div className="flex items-center justify-between py-6 max-w-6xl mx-auto">

        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            <img src={logo} alt="Amrei Fiedler" className="h-36" />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-xl px-8">
          <NavLink to="/" className="nav-link">Home</NavLink>
          {/* <NavLink to="/portfolio" className="nav-link">Portfolio</NavLink> */}
          <NavLink to="/workshop" className="nav-link">Workshops</NavLink>
          <NavLink to="/book" className="nav-link">Books</NavLink>
          <NavLink to="/collaboration">Collaborations</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-3xl px-8"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden p-4 border-t">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/portfolio" className="nav-link">Portfolio</NavLink>
          <NavLink to="/workshops" className="nav-link">Workshops</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </div>
      )}
    </header>
  )
}