import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

type Item = {
  icon: LucideIcon
  title: string
  description: string
}

export default function OfferTimeline({ items }: { items: Item[] }) {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-amber-400/60 via-teal-900/15 to-amber-400/60 hidden md:block -translate-x-1/2" />
      <div className="space-y-10 md:space-y-6">
        {items.map((item, i) => {
          const Icon = item.icon
          const flip = i % 2 === 1
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className={`relative md:flex items-center gap-8 ${flip ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="hidden md:block w-1/2" aria-hidden="true" />

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex h-14 w-14 rounded-full bg-teal-700 border-4 border-white shadow-lg items-center justify-center z-10">
                <Icon size={22} className="text-amber-400" />
              </div>

              <div className="md:w-1/2">
                <div
                  className={`group rounded-2xl border border-teal-900/10 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${
                    flip ? 'md:text-right' : ''
                  }`}
                >
                  <div
                    className={`md:hidden h-11 w-11 rounded-xl bg-teal-700 flex items-center justify-center mb-4 ${
                      flip ? 'ml-auto' : ''
                    }`}
                  >
                    <Icon size={20} className="text-amber-400" />
                  </div>
                  <span className="text-xs font-semibold text-amber-600 tracking-wide">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 font-display font-semibold text-lg text-teal-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-teal-900/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
