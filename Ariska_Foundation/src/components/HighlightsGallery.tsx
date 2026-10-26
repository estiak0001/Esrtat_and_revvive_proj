import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { useApi, assetUrl } from '../lib/api'
import type { Highlight } from '../lib/types'

const MotionLink = motion(Link)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: Math.min(i, 9) * 0.05 } }),
}

const accentPalette = [
  { glow: 'rgba(245,158,11,0.45)', bar: 'bg-amber-400', ring: 'ring-amber-400/40' },
  { glow: 'rgba(14,165,233,0.45)', bar: 'bg-sky-400', ring: 'ring-sky-400/40' },
  { glow: 'rgba(16,185,129,0.45)', bar: 'bg-emerald-400', ring: 'ring-emerald-400/40' },
  { glow: 'rgba(139,92,246,0.45)', bar: 'bg-violet-400', ring: 'ring-violet-400/40' },
  { glow: 'rgba(244,63,94,0.45)', bar: 'bg-rose-400', ring: 'ring-rose-400/40' },
]

const MAX_VISIBLE = 10

export default function HighlightsGallery() {
  const { data: highlights } = useApi<Highlight[]>('/api/highlights', [])
  const visible = highlights.slice(0, MAX_VISIBLE)

  if (visible.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {visible.map((item, i) => {
        const accent = accentPalette[i % accentPalette.length]
        return (
          <motion.div
            key={item.slug}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={i}
          >
            <MotionLink
              to={`/highlights/${item.slug}`}
              className={`group relative block overflow-hidden rounded-2xl aspect-[3/4] ring-1 ring-black/5 ${accent.ring}`}
              initial={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
              whileHover={{ y: -6, scale: 1.02, boxShadow: `0 22px 40px -12px ${accent.glow}` }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              {item.cover_image ? (
                <img
                  src={assetUrl(item.cover_image)}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover select-none group-hover:scale-[1.15] group-hover:rotate-1 transition-transform duration-700 ease-out"
                  draggable={false}
                />
              ) : (
                <div className="absolute inset-0 bg-teal-900/10" />
              )}

              {/* diagonal shine sweep on hover */}
              <div className="absolute inset-0 -translate-x-[120%] skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[120%] transition-transform duration-1000 ease-out" />

              {/* base gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-950/10 to-transparent transition-opacity duration-300 group-hover:from-teal-950/85" />

              <div className="relative h-full flex flex-col justify-end p-3">
                {item.date_label && (
                  <span className="self-start mb-1.5 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur text-teal-950 text-[9px] font-bold px-2 py-0.5 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Calendar size={9} /> {item.date_label}
                  </span>
                )}
                <h3 className="font-display text-sm font-bold text-white leading-snug drop-shadow-sm line-clamp-2 transition-transform duration-300 group-hover:-translate-y-0.5">
                  {item.title}
                </h3>
                <span className={`block h-0.5 w-0 group-hover:w-8 transition-all duration-500 rounded-full mt-2 ${accent.bar}`} />
              </div>

              {/* floating reveal button */}
              <span className="absolute bottom-3 right-3 h-7 w-7 rounded-full bg-amber-400 text-teal-950 flex items-center justify-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out shadow-lg">
                <ArrowRight size={13} strokeWidth={2.5} />
              </span>
            </MotionLink>
          </motion.div>
        )
      })}
    </div>
  )
}
