import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetch } from '../lib/useFetch'
import { getMediaUrl } from '../lib/media'

export default function Header() {
  const [open, setOpen] = useState(false)
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
          <NavLink to="/books" className="nav-link">Books</NavLink>
          <NavLink to="/workshops" className="nav-link">Workshops</NavLink>
          <NavLink to="/collaborations">Collaborations</NavLink>
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
          <NavLink to="/books" className="nav-link">Books</NavLink>
          <NavLink to="/workshops" className="nav-link">Workshops</NavLink>
          <NavLink to="/collaborations">Collaborations</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </div>
      )}
    </header>
  )
}