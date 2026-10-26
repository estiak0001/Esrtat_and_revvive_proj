import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Photo = { src: string; alt: string }

export default function HeroBackdrop({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), 6000)
    return () => clearInterval(id)
  }, [photos.length])

  const photo = photos[index]

  return (
    <div className="absolute inset-0 overflow-hidden bg-teal-950">
      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.16 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: 6.8, ease: 'linear' },
          }}
          className="absolute inset-0 w-full h-full object-cover select-none"
          draggable={false}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-teal-950/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/35 to-teal-950/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  )
}
