import { Phone } from 'lucide-react'
import { company } from '../data/content'

export default function FloatingContact() {
  return (
    <a
      href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-teal-950 font-semibold text-sm pl-4 pr-5 py-3 shadow-xl shadow-amber-900/20 transition-transform hover:scale-105"
      aria-label="Call ARISKA"
    >
      <Phone size={18} strokeWidth={2.5} />
      <span className="hidden sm:inline">Call Us</span>
    </a>
  )
}
