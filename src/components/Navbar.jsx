import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './Logo.jsx'
import { NAV, CONTACT } from '../data/site.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const link = ({ isActive }) =>
    `relative rounded-full px-3.5 py-2 text-sm font-medium transition ${isActive ? 'text-navy-700 bg-navy-50' : 'text-ink-soft hover:text-navy-700 hover:bg-navy-50/70'}`

  return (
    <header className={`sticky top-0 z-40 border-b transition ${scrolled ? 'border-navy-100 bg-white/90 shadow-card backdrop-blur-md' : 'border-transparent bg-paper/80 backdrop-blur'}`}>
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.to}><NavLink to={n.to} end={n.end} className={link}>{n.label}</NavLink></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact#phone" aria-label="View our phone number" className="btn btn-primary hidden !py-2.5 sm:inline-flex"><Phone size={16} aria-hidden="true" />Call us</Link>
          <button
            type="button" className="grid h-11 w-11 place-items-center rounded-full border border-navy-200 text-navy-700 lg:hidden"
            aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-navy-100 bg-white lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <li key={n.to}><NavLink to={n.to} end={n.end} className={({ isActive }) => `block rounded-xl px-4 py-3 text-base font-medium ${isActive ? 'bg-navy-50 text-navy-700' : 'text-ink-soft'}`}>{n.label}</NavLink></li>
            ))}
            <li className="pt-2"><Link to="/contact#phone" className="btn btn-primary w-full"><Phone size={16} aria-hidden="true" />Call us</Link></li>
          </ul>
        </nav>
      )}
    </header>
  )
}
