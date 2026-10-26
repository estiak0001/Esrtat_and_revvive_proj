import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'
import { useApi, assetUrl } from '../lib/api'
import type { Highlight } from '../lib/types'

export default function HighlightDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: highlight, loading } = useApi<Highlight | null>(`/api/highlights/${slug}`, null)
  const [activeImage, setActiveImage] = useState(0)

  if (loading) {
    return <div className="max-w-4xl mx-auto px-5 sm:px-8 py-24 text-center text-teal-900/50">Loading...</div>
  }

  if (!highlight) {
    return (
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-24 text-center">
        <p className="text-teal-900/70">This item could not be found.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-amber-600 font-semibold">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    )
  }

  const gallery = highlight.images.length > 0 ? highlight.images : highlight.cover_image ? [highlight.cover_image] : []

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 md:py-20">
      <Link to="/" className="inline-flex items-center gap-2 text-teal-900/60 hover:text-amber-600 text-sm font-medium mb-8">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      {highlight.date_label && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 text-amber-600 text-xs font-semibold px-3 py-1 mb-4">
          <Calendar size={12} /> {highlight.date_label}
        </span>
      )}
      <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-teal-950 leading-snug">
        {highlight.title}
      </h1>
      <p className="mt-4 text-teal-900/70 text-base sm:text-lg leading-relaxed">{highlight.summary}</p>

      {gallery.length > 0 && (
        <div className="mt-8">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl overflow-hidden shadow-xl border border-teal-900/5 aspect-[16/9]"
          >
            <img
              src={assetUrl(gallery[activeImage])}
              alt={highlight.title}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </motion.div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {gallery.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 h-16 w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === activeImage ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <img src={assetUrl(img)} alt="" className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {highlight.content && (
        <div className="mt-8 text-teal-900/80 leading-relaxed whitespace-pre-line">{highlight.content}</div>
      )}
    </div>
  )
}
