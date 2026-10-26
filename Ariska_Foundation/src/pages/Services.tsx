import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, Package, Printer, Ship, Sprout, Building2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import OfferTimeline from '../components/OfferTimeline'
import GridBackdrop from '../components/GridBackdrop'
import { services, whatWeDo } from '../data/content'
import warehousePhoto from '../assets/photos/gallery/warehouse-worker.jpg'
import printingPhoto from '../assets/photos/gallery/printing-press.jpg'
import exportPackagingPhoto from '../assets/photos/gallery/export-packaging.jpg'
import pineapplePhoto from '../assets/photos/agro/pineapple.jpg'

const overviewIcons = [Package, Printer, Ship, Sprout]

const divisionPhotos: Record<string, string> = {
  'supply-procurement': warehousePhoto,
  'printing-packaging': printingPhoto,
  'export-trading': exportPackagingPhoto,
  agro: pineapplePhoto,
}

export default function Services() {
  return (
    <div>
      <PageHero
        eyebrow="Our Services"
        title="Supply, Printing, Export &amp; Agro"
        subtitle="Our activities span B2B supply and institutional procurement, commercial printing and packaging, global commodity export and local trading, and large-scale agro production."
      />

      {/* Overview timeline */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <SectionHeading eyebrow="Our Process" title="How ARISKA Delivers for You" center />
        <OfferTimeline
          items={whatWeDo.map((item, i) => ({
            icon: overviewIcons[i],
            title: item.title,
            description: item.description,
          }))}
        />
      </section>

      {/* Quick nav */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/90 backdrop-blur border-b border-teal-900/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex gap-6 overflow-x-auto py-4 text-sm font-medium">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="whitespace-nowrap text-teal-900/70 hover:text-amber-600 transition-colors"
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {services.map((service, idx) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`scroll-mt-32 ${idx % 2 === 1 ? 'bg-teal-700/[0.03]' : ''}`}
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
            <div className="grid lg:grid-cols-5 gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 lg:sticky lg:top-28"
              >
                <img
                  src={divisionPhotos[service.slug]}
                  alt={service.title}
                  className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl border border-teal-900/5 select-none"
                  draggable={false}
                />
              </motion.div>

              <div className="lg:col-span-3">
                <SectionHeading
                  eyebrow={`0${idx + 1} — ${service.title}`}
                  title={service.tagline}
                  subtitle={service.intro}
                  center={false}
                />

                {service.groups.map((group) => (
                  <div key={group.heading} className="mb-8 last:mb-0">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-3">
                      {group.heading}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {group.items.map((item) => (
                        <div
                          key={item.title}
                          className="flex items-start gap-2.5 rounded-xl bg-white border border-teal-900/10 p-3.5 shadow-sm"
                        >
                          <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-teal-950 leading-snug">{item.title}</p>
                            <p className="mt-0.5 text-xs text-teal-900/60 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {service.clientGroups && (
                  <div className="mt-8 pt-8 border-t border-teal-900/10">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-4">
                      Key Partners &amp; Enterprise Clients Served
                    </h4>
                    <div className="space-y-4">
                      {service.clientGroups.map((group) => (
                        <div key={group.category}>
                          <p className="text-xs font-medium text-teal-900/50 mb-2">{group.category}</p>
                          <div className="flex flex-wrap gap-2">
                            {group.names.map((name) => (
                              <span
                                key={name}
                                className="inline-flex items-center gap-1.5 rounded-full bg-teal-950 text-white text-xs font-medium px-3 py-1.5"
                              >
                                <Building2 size={12} className="text-amber-400" />
                                {name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="relative overflow-hidden bg-teal-700 text-white text-center py-16 md:py-20">
        <GridBackdrop />
        <p className="relative text-amber-400 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3">
          From Bangladesh to the World
        </p>
        <p className="relative max-w-2xl mx-auto px-5 text-white/70 leading-relaxed">
          Our export business is focused on reliable sourcing, professional communication,
          appropriate documentation, and long-term international relationships.
        </p>
        <Link
          to="/contact"
          className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-teal-950 font-semibold px-6 py-3 transition-colors"
        >
          Start a Conversation <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  )
}
