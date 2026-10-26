import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Photo = { src: string; alt: string }

export default function HeroGallery({ photos }: { photos: Photo[] }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3200)
    return () => clearInterval(id)
  }, [])

  const slots = [0, 1, 2, 3]

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto">
      {slots.map((slot) => {
        const photo = photos[(tick + slot) % photos.length]
        return (
          <div
            key={slot}
            className="relative overflow-hidden rounded-2xl shadow-xl aspect-square bg-teal-800"
          >
            <AnimatePresence mode="sync" initial={false}>
              <motion.img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                initial={{ opacity: 0, y: 24, scale: 1.06 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.94 }}
                transition={{ duration: 0.65, delay: slot * 0.1, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover select-none"
                draggable={false}
              />
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
