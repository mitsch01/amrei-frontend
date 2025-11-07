import { Link } from 'react-router-dom'
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
        console.log(res)
      } catch (err) {
        console.error('Error fetching logo:', err)
      }
    }
    loadLogo()
  }, [])

  return (
    <header>
      {/* Navigation */}
      <div className="flex items-center justify-between py-6 px-8">
        
        {/* Logo */}
        <div className="flex items-center justify-between py-6 px-8">
          <Link to="/" className="text-xl font-semibold">
            <img src={logo} alt="Amrei Fiedler" className="h-36" />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          <Link to="/">Home</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/workshops">Workshops</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden p-4 border-t">
          <Link to="/">Home</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/workshops">Workshops</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      )}
    </header>
  )
}