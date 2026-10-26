import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { navLinks } from '../lib/nav'
import { useApi } from '../lib/api'
import { defaultCompany, type Company } from '../lib/types'
import wordmarkDark from '../assets/logo/ariska-wordmark-dark.png'
import wordmarkLight from '../assets/logo/ariska-wordmark-light.png'

const mid = Math.ceil(navLinks.length / 2)
const leftLinks = navLinks.slice(0, mid)
const rightLinks = navLinks.slice(mid)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { data: company } = useApi<Company>('/api/company', defaultCompany)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isHome = location.pathname === '/'
  const dark = isHome && !scrolled

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${
      isActive
        ? 'text-amber-400'
        : dark
          ? 'text-white/80 hover:text-amber-300'
          : 'text-teal-900/75 hover:text-amber-600'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        dark
          ? 'bg-teal-950 border-b border-white/10'
          : `bg-white/95 backdrop-blur border-b border-teal-900/10 ${scrolled ? 'shadow-md' : ''}`
      }`}
    >
      {/* Desktop: links split both sides of a centered, boxed logo */}
      <div className="hidden lg:grid max-w-7xl mx-auto px-5 sm:px-8 h-20 grid-cols-[1fr_auto_1fr] items-center gap-6">
        <nav className="flex items-center justify-end gap-7">
          {leftLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/"
          className={`flex items-center gap-3 justify-self-center group rounded-lg border px-4 py-2 transition-colors ${
            dark ? 'border-white/20 hover:border-amber-400/50' : 'border-teal-900/15 hover:border-amber-500/50'
          }`}
        >
          <img
            src={dark ? wordmarkLight : wordmarkDark}
            alt="ARISKA"
            className="h-5 w-auto select-none"
            draggable={false}
          />
          <span
            className={`pl-3 border-l text-[9px] uppercase tracking-[0.2em] text-amber-400 ${
              dark ? 'border-white/20' : 'border-teal-900/15'
            }`}
          >
            Bangladesh
          </span>
        </Link>

        <div className="flex items-center justify-start gap-7">
          <nav className="flex items-center gap-7">
            {rightLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <a
            href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}
            className="flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-teal-950 font-semibold text-sm px-4 py-2 transition-colors shrink-0"
          >
            <Phone size={15} strokeWidth={2.5} />
            Call
          </a>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-5 h-16">
        <Link to="/" className="flex items-center group">
          <img
            src={dark ? wordmarkLight : wordmarkDark}
            alt="ARISKA"
            className="h-5 w-auto select-none"
            draggable={false}
          />
        </Link>
        <button
          className={`p-2 -mr-2 ${dark ? 'text-white' : 'text-teal-950'}`}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Mobile left sidebar drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-[60] bg-teal-950/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="lg:hidden fixed inset-y-0 left-0 z-[70] w-[82%] max-w-xs bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-teal-900/10">
                <img src={wordmarkDark} alt="ARISKA" className="h-5 w-auto select-none" draggable={false} />
                <button
                  className="text-teal-950 p-2 -mr-2"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `py-3.5 text-base font-medium border-b border-teal-900/5 ${
                        isActive ? 'text-amber-600' : 'text-teal-900/75'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="px-5 py-5 border-t border-teal-900/10">
                <a
                  href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center justify-center gap-2 rounded-full bg-amber-500 text-teal-950 font-semibold text-sm px-4 py-3"
                >
                  <Phone size={15} strokeWidth={2.5} />
                  {company.phone}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
