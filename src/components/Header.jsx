import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetch } from '../lib/useFetch'
import { getMediaUrl } from '../lib/media'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { data: globalData } = useFetch('global?populate=logo')

  const logo = getMediaUrl(globalData?.logo)

  return (
    <header>
      {/* Navigation */}
      <div className="flex items-center justify-between pt-24 pb-8 max-w-6xl mx-auto">

        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            <img src={logo} alt="Amrei Fiedler" className="h-28 pb-2 pl-4" />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-xl px-8">
          <NavLink to="/" className="nav-link">Home</NavLink>

          {/* Leistungen dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <NavLink to="/services" className="nav-link inline-flex items-center gap-2">
              Leistungen
              <span className="text-base">▾</span>
            </NavLink>

            {servicesOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-md border bg-white shadow-lg py-3 px-4 space-y-3">
                <NavLink to="/books" className="block nav-link text-base">Bücher</NavLink>
                <NavLink to="/workshops" className="block nav-link text-base">Workshops</NavLink>
                <NavLink to="/collaborations" className="block nav-link text-base">Kollaborationen</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/about" className="nav-link">Über</NavLink>
          <NavLink to="/contact" className="nav-link">Kontakt</NavLink>
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
        <div className="md:hidden p-4 border-t space-y-3">
          <NavLink to="/" className="nav-link block text-lg">Home</NavLink>

          <div className="space-y-2">
            <NavLink to="/services" className="nav-link block text-lg">Leistungen</NavLink>
            <div className="pl-4 space-y-1 text-base text-gray-700">
              <NavLink to="/books" className="nav-link block text-base">Bücher</NavLink>
              <NavLink to="/workshops" className="nav-link block text-base">Workshops</NavLink>
              <NavLink to="/collaborations" className="nav-link block text-base">Kollaborationen</NavLink>
            </div>
          </div>

          <NavLink to="/about" className="nav-link block text-lg">Über</NavLink>
          <NavLink to="/contact" className="nav-link block text-lg">Kontakt</NavLink>
        </div>
      )}
    </header>
  )
}