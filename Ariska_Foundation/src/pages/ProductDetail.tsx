import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import { useApi, assetUrl } from '../lib/api'
import type { Product } from '../lib/types'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: product, loading } = useApi<Product | null>(`/api/products/${slug}`, null)
  const [activeImage, setActiveImage] = useState(0)

  if (loading) {
    return <div className="max-w-4xl mx-auto px-5 sm:px-8 py-24 text-center text-teal-900/50">Loading...</div>
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-24 text-center">
        <p className="text-teal-900/70">This product could not be found.</p>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 text-amber-600 font-semibold">
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-20">
      <Link to="/products" className="inline-flex items-center gap-2 text-teal-900/60 hover:text-amber-600 text-sm font-medium mb-8">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-3">
          {product.images.length > 0 && (
            <>
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl overflow-hidden shadow-xl border border-teal-900/5 aspect-[4/3]"
              >
                <img
                  src={assetUrl(product.images[activeImage])}
                  alt={product.title}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
              </motion.div>
              {product.images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {product.images.map((img, i) => (
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
            </>
          )}
        </div>

        <div className="lg:col-span-2">
          {product.category && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 text-amber-600 text-xs font-semibold px-3 py-1 mb-4">
              <Tag size={12} /> {product.category}
            </span>
          )}
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-teal-950 leading-snug">{product.title}</h1>
          <p className="mt-4 text-teal-900/70 leading-relaxed">{product.summary}</p>
          {product.description && (
            <p className="mt-4 text-sm text-teal-900/70 leading-relaxed whitespace-pre-line">{product.description}</p>
          )}
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-3 transition-colors"
          >
            Discuss This Product <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
