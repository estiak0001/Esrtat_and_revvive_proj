import { motion } from 'framer-motion'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative bg-teal-700 overflow-hidden">
      <div className="absolute inset-0 bg-grid-squares [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_75%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#E8A33D_0,transparent_45%),radial-gradient(circle_at_80%_0%,#3D3D3D_0,transparent_50%)]" />
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-20 md:py-28 text-center">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-amber-400 uppercase tracking-[0.25em] text-xs md:text-sm font-semibold mb-4"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
