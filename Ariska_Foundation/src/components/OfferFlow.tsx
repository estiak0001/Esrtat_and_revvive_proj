import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

type Item = {
  icon: LucideIcon
  image: string
  title: string
  description: string
}

export default function OfferFlow({ items }: { items: Item[] }) {
  return (
    <div className="relative">
      {/* Curved connector — desktop only */}
      <svg
        className="hidden lg:block absolute inset-x-0 top-10 w-full h-40 pointer-events-none"
        viewBox="0 0 1000 170"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M 60 40 C 210 40 210 150 375 150 C 500 150 500 40 625 40 C 750 40 750 150 915 150"
          stroke="#E8A33D"
          strokeWidth="2.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
        {items.map((_, i) => (
          <circle
            key={i}
            cx={60 + i * 285}
            cy={i % 2 === 0 ? 40 : 150}
            r="5"
            fill="#0A0A0A"
          />
        ))}
      </svg>

      <div className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`flex flex-col items-center text-center ${i % 2 === 1 ? 'lg:mt-28' : 'lg:mt-0'}`}
            >
              <div className="relative mb-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-32 sm:h-36 sm:w-36 rounded-full object-cover border-4 border-white shadow-xl select-none"
                  draggable={false}
                />
                <span className="absolute -top-1 -left-1 h-10 w-10 rounded-full bg-amber-500 text-teal-950 flex items-center justify-center shadow-md">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                <span className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-teal-950 text-white flex items-center justify-center font-display font-bold text-xs shadow-md">
                  0{i + 1}
                </span>
              </div>

              <div className="w-full rounded-2xl bg-white border-2 border-dotted border-teal-950 p-5 shadow-sm hover:shadow-xl hover:border-solid transition-all duration-300">
                <h3 className="font-display font-semibold text-base text-teal-950">{item.title}</h3>
                <p className="mt-2 text-sm text-teal-900/70 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
