import { Link } from 'react-router-dom'
import { Phone, Globe, MapPin, ArrowRight } from 'lucide-react'
import { navLinks } from '../lib/nav'
import { useApi } from '../lib/api'
import { defaultCompany, type Company, type Pillar, type Market } from '../lib/types'
import wordmarkLight from '../assets/logo/ariska-wordmark-light.png'
import GridBackdrop from './GridBackdrop'

export default function Footer() {
  const { data: company } = useApi<Company>('/api/company', defaultCompany)
  const { data: pillars } = useApi<Pillar[]>('/api/content/pillars', [])
  const { data: markets } = useApi<Market[]>('/api/content/markets', [])

  return (
    <footer className="relative overflow-hidden bg-teal-950 text-white/70">
      <div className="h-[3px] w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />
      <GridBackdrop />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={wordmarkLight} alt="ARISKA" className="h-7 w-auto select-none" draggable={false} />
          <p className="mt-4 text-amber-400 text-sm font-medium">{company.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed max-w-md text-white/55">
            {pillars.map((p) => p.title).join(' · ')}
          </p>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <MapPin size={14} className="text-amber-400" />
              </span>
              <span className="pt-1 leading-relaxed">{company.businessAddress}</span>
            </div>
            <div className="flex gap-3 items-center">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <Phone size={14} className="text-amber-400" />
              </span>
              <a href={`tel:${company.phone.replace(/[^+\d]/g, '')}`} className="hover:text-amber-300 transition-colors">
                {company.phone}
              </a>
            </div>
            <div className="flex gap-3 items-center">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <Globe size={14} className="text-amber-400" />
              </span>
              <span>{company.website}</span>
            </div>
          </div>

          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-teal-950 font-semibold text-sm px-5 py-2.5 transition-colors"
          >
            Get in Touch <ArrowRight size={15} />
          </Link>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-5 pb-2 border-b border-white/10">
            Navigate
          </h4>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-amber-300 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-5 pb-2 border-b border-white/10">
            Our Markets
          </h4>
          <ul className="space-y-2.5 text-sm">
            {markets.map((m) => (
              <li key={m.country} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-amber-400" />
                {m.country}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 text-xs text-white/40 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} {company.name}. All Rights Reserved.</span>
          <span>{pillars.map((p) => p.title).join(' · ')}</span>
        </div>
      </div>
    </footer>
  )
}
