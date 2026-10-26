import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Images } from 'lucide-react'
import PageHero from '../components/PageHero'
import GridBackdrop from '../components/GridBackdrop'
import { useApi, assetUrl } from '../lib/api'
import type { Product } from '../lib/types'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: Math.min(i, 6) * 0.07 } }),
}

const categoryAccents = ['amber', 'sky', 'emerald', 'violet', 'rose'] as const
type Accent = (typeof categoryAccents)[number]

const accentClasses: Record<Accent, { badge: string; glow: string; text: string }> = {
  amber: { badge: 'bg-amber-500/90 text-teal-950', glow: 'from-amber-400/30', text: 'text-amber-600' },
  sky: { badge: 'bg-sky-500/90 text-white', glow: 'from-sky-400/30', text: 'text-sky-600' },
  emerald: { badge: 'bg-emerald-500/90 text-white', glow: 'from-emerald-400/30', text: 'text-emerald-600' },
  violet: { badge: 'bg-violet-500/90 text-white', glow: 'from-violet-400/30', text: 'text-violet-600' },
  rose: { badge: 'bg-rose-500/90 text-white', glow: 'from-rose-400/30', text: 'text-rose-600' },
}

function groupByCategory(products: Product[]) {
  const map = new Map<string, Product[]>()
  for (const p of products) {
    const key = p.category || 'Other'
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(p)
  }
  return Array.from(map.entries())
}

function ProductTile({ product, accent, index, aspect = 'aspect-[4/5]' }: { product: Product; accent: Accent; index: number; aspect?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      custom={index}
    >
      <Link
        to={`/products/${product.slug}`}
        className={`group relative block overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 ${aspect}`}
      >
        {product.images[0] ? (
          <img
            src={assetUrl(product.images[0])}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover select-none group-hover:scale-110 transition-transform duration-700 ease-out"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 bg-teal-900/10" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-950/20 to-transparent" />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${accentClasses[accent].glow} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {product.images.length > 1 && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 text-teal-950 text-[11px] font-semibold px-2.5 py-1 shadow-md">
            <Images size={11} /> {product.images.length}
          </span>
        )}

        <div className="relative h-full flex flex-col justify-end p-5">
          <h3 className="font-display text-base font-bold text-white leading-snug drop-shadow-sm">
            {product.title}
          </h3>
          <p className="mt-2 text-xs text-white/80 leading-relaxed line-clamp-2 max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
            {product.summary}
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold group-hover:gap-2.5 transition-all">
            View Details <ArrowRight size={13} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

/** Alternating layout A — one featured product + the rest in a tight grid */
function FeaturedSection({ items, accent }: { items: Product[]; accent: Accent }) {
  const [featured, ...rest] = items
  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-2"
      >
        <Link to={`/products/${featured.slug}`} className="group relative block overflow-hidden rounded-3xl shadow-xl aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[22rem]">
          {featured.images[0] ? (
            <img
              src={assetUrl(featured.images[0])}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-700 ease-out"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 bg-teal-900/10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-950/25 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-6">
            <span className={`self-start mb-3 rounded-full text-[11px] font-bold uppercase tracking-wide px-3 py-1 shadow-md ${accentClasses[accent].badge}`}>
              Featured
            </span>
            <h3 className="font-display text-xl font-bold text-white leading-snug">{featured.title}</h3>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">{featured.summary}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-amber-400 text-sm font-semibold group-hover:gap-2.5 transition-all">
              View Details <ArrowRight size={15} />
            </span>
          </div>
        </Link>
      </motion.div>

      <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
        {rest.map((product, i) => (
          <ProductTile key={product.slug} product={product} accent={accent} index={i} aspect="aspect-[4/3]" />
        ))}
      </div>
    </div>
  )
}

/** Alternating layout B — uniform grid of image tiles */
function GridSection({ items, accent }: { items: Product[]; accent: Accent }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((product, i) => (
        <ProductTile key={product.slug} product={product} accent={accent} index={i} />
      ))}
    </div>
  )
}

export default function Products() {
  const { data: products } = useApi<Product[]>('/api/products', [])

  const groups = useMemo(() => groupByCategory(products), [products])

  return (
    <div>
      <PageHero
        eyebrow="Our Products"
        title="A Showcase of What We Supply, Trade &amp; Grow"
        subtitle="A look at the goods ARISKA works with across procurement, printing, export, and agro production — shared here for reference, not for direct sale. For pricing, availability, or sourcing requests, please contact our team."
      />

      {groups.map(([category, items], idx) => {
        const accent = categoryAccents[idx % categoryAccents.length]
        const alternate = idx % 2 === 1

        return (
          <section
            key={category}
            className={alternate ? 'bg-teal-950/[0.03]' : ''}
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
              <div className="flex items-center gap-4 mb-10">
                <span className={`font-display text-4xl sm:text-5xl font-extrabold ${accentClasses[accent].text} opacity-30`}>
                  0{idx + 1}
                </span>
                <div>
                  <p className={`uppercase tracking-[0.2em] text-xs font-semibold mb-1 ${accentClasses[accent].text}`}>
                    Product Category
                  </p>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-teal-950 leading-snug">
                    {category}
                  </h2>
                </div>
              </div>

              {items.length >= 2 && !alternate ? (
                <FeaturedSection items={items} accent={accent} />
              ) : (
                <GridSection items={items} accent={accent} />
              )}
            </div>
          </section>
        )
      })}

      {groups.length === 0 && (
        <p className="text-center text-teal-900/50 py-16 max-w-7xl mx-auto px-5 sm:px-8">
          No products available yet.
        </p>
      )}

      {/* Closing note + single CTA (no per-product buying actions) */}
      <section className="relative overflow-hidden bg-teal-700 text-white">
        <GridBackdrop />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-16 md:py-20 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            Looking for a Specific Product or Requirement?
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            This page is a showcase of our supply, export, and agro categories &mdash; not an
            online store. Share your requirements with our team and we&apos;ll get back to you
            with availability, specifications, and next steps.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-teal-950 font-semibold px-6 py-3 transition-colors"
          >
            Discuss Your Requirements <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
