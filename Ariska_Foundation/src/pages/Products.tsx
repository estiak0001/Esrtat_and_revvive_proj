import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import GridBackdrop from '../components/GridBackdrop'
import { services } from '../data/content'
import pineapplePhoto from '../assets/photos/agro/pineapple.jpg'
import dragonfruitPhoto from '../assets/photos/agro/dragonfruit.jpg'
import bananaPhoto from '../assets/photos/agro/banana.jpg'
import papayaPhoto from '../assets/photos/agro/papaya.jpg'
import guavaPhoto from '../assets/photos/agro/guava.jpg'
import rubberPhoto from '../assets/photos/gallery/rubber-tapping.jpg'
import leatherPhoto from '../assets/photos/products/leather.jpg'
import rawMaterialsPhoto from '../assets/photos/products/rawmaterials.jpg'
import aboutStoryPhoto from '../assets/photos/gallery/about-story.jpg'
import warehousePhoto from '../assets/photos/gallery/warehouse-worker.jpg'
import residentialPhoto from '../assets/photos/products/residential.jpg'
import exportPackagingPhoto from '../assets/photos/gallery/export-packaging.jpg'
import printingPhoto from '../assets/photos/gallery/printing-press.jpg'
import finePaperPhoto from '../assets/photos/products/finepaper.jpg'

const supplyService = services.find((s) => s.slug === 'supply-procurement')!
const printingService = services.find((s) => s.slug === 'printing-packaging')!
const exportService = services.find((s) => s.slug === 'export-trading')!
const agroService = services.find((s) => s.slug === 'agro')!

const exportCommodities = exportService.groups.find((g) => g.heading === 'Commodity Exports')!.items
const exportPhotos = [rubberPhoto, leatherPhoto]

const localTrading = exportService.groups.find((g) => g.heading === 'Local Trading & Wholesale')!.items
const localTradingPhotos = [leatherPhoto, rawMaterialsPhoto]

const supplyItems = supplyService.groups[0].items
const supplyPhotos = [aboutStoryPhoto, warehousePhoto, residentialPhoto]

const printingGroupPhotos: Record<string, string> = {
  'Industrial & Commercial Packaging': exportPackagingPhoto,
  'Corporate & Commercial Printing Services': printingPhoto,
  'Paper Import & Raw Material Trading': finePaperPhoto,
}

const agroFruits = agroService.groups.find((g) => g.heading === 'Fresh Produce Portfolio')!.items
const agroPhotos = [pineapplePhoto, dragonfruitPhoto, bananaPhoto, papayaPhoto, guavaPhoto]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }),
}

function ImageTile({
  src,
  title,
  description,
  index = 0,
  aspect = 'aspect-[3/4]',
}: {
  src: string
  title: string
  description: string
  index?: number
  aspect?: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      custom={index}
      className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${aspect}`}
    >
      <img src={src} alt={title} className="absolute inset-0 w-full h-full object-cover select-none" draggable={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/20 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-4">
        <h3 className="font-display text-sm font-bold text-white leading-snug">{title}</h3>
        <p className="mt-1 text-[11px] text-white/70 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

export default function Products() {
  return (
    <div>
      <PageHero
        eyebrow="Our Products"
        title="A Showcase of What We Supply, Trade &amp; Grow"
        subtitle="A look at the goods ARISKA works with across procurement, printing, export, and agro production — shared here for reference, not for direct sale. For pricing, availability, or sourcing requests, please contact our team."
      />

      {/* Agro & Fresh Produce */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <SectionHeading
          eyebrow="Agro &amp; Fresh Produce"
          title="Fresh From Modhupur, Tangail"
          subtitle="Large-scale commercial farming and bulk wholesale supply operating across 100+ acres of agricultural land in Modhupur, Tangail — the Pineapple Capital of Bangladesh."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {agroFruits.map((fruit, i) => (
            <ImageTile key={fruit.title} src={agroPhotos[i]} title={fruit.title} description={fruit.description} index={i} />
          ))}
        </div>
      </section>

      {/* Export & commodity trading */}
      <section className="bg-teal-950/[0.03] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading eyebrow="Commodity Exports" title="From Bangladesh to the World" subtitle={exportService.intro} />
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10">
            {exportCommodities.map((product, i) => (
              <ImageTile
                key={product.title}
                src={exportPhotos[i]}
                title={product.title}
                description={product.description}
                index={i}
                aspect="aspect-[4/3]"
              />
            ))}
          </div>

          <p className="text-center text-xs font-semibold uppercase tracking-wider text-amber-600 mb-4">
            Local Trading &amp; Wholesale
          </p>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {localTrading.map((item, i) => (
              <ImageTile
                key={item.title}
                src={localTradingPhotos[i]}
                title={item.title}
                description={item.description}
                index={i}
                aspect="aspect-[4/3]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Supply range */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <SectionHeading eyebrow="Supply &amp; Procurement" title="B2B Supply &amp; Institutional Procurement" subtitle={supplyService.intro} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supplyItems.map((item, i) => (
            <ImageTile
              key={item.title}
              src={supplyPhotos[i]}
              title={item.title}
              description={item.description}
              index={i}
              aspect="aspect-[4/3]"
            />
          ))}
        </div>
      </section>

      {/* Printing & packaging range */}
      <section className="bg-teal-950/[0.03] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Printing &amp; Packaging"
            title="Products That Support Your Business"
            subtitle={printingService.intro}
          />
          <div className="grid sm:grid-cols-3 gap-6">
            {printingService.groups.map((group, i) => (
              <motion.div
                key={group.heading}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-[4/5]"
              >
                <img
                  src={printingGroupPhotos[group.heading]}
                  alt={group.heading}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-950/50 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-5">
                  <h3 className="font-display text-base font-bold text-white leading-snug">{group.heading}</h3>
                  <ul className="mt-2 space-y-1">
                    {group.items.map((item) => (
                      <li key={item.title} className="text-[11px] text-white/75 leading-relaxed">
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
