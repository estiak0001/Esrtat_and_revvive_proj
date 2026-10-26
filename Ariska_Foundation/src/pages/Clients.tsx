import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useApi, assetUrl } from '../lib/api'
import { groupClientsWithLogos } from '../lib/utils'
import type { Client } from '../lib/types'
import beveragePhoto from '../assets/photos/clients/beverage.jpg'
import marblePhoto from '../assets/photos/clients/marble.jpg'
import residentialPhoto from '../assets/photos/products/residential.jpg'

const categoryPhotos: Record<string, string> = {
  'Beverage & Pharmaceuticals': beveragePhoto,
  'Real Estate & Building Materials': marblePhoto,
  'Institutional Projects': residentialPhoto,
}
const fallbackPhoto = marblePhoto

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }),
}

export default function Clients() {
  const { data: clients } = useApi<Client[]>('/api/content/clients', [])
  const clientGroups = groupClientsWithLogos(clients)

  return (
    <div>
      <PageHero
        eyebrow="Our Clients"
        title="Our Valuable Clients"
        subtitle="We value the trust and confidence placed in us by every organization we serve. We believe every client relationship is an opportunity to build trust and create long-term value."
      />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <p className="text-center text-teal-900/70 max-w-2xl mx-auto mb-14 leading-relaxed">
          Our business experience includes supplying established organizations such as:
        </p>

        <div className="space-y-16">
          {clientGroups.map((group) => (
            <div key={group.category} className="grid lg:grid-cols-5 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <img
                  src={categoryPhotos[group.category] ?? fallbackPhoto}
                  alt={group.category}
                  className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl border border-teal-900/5 select-none"
                  draggable={false}
                />
              </motion.div>

              <div className="lg:col-span-3">
                <h3 className="font-display text-lg font-semibold text-teal-950 mb-5">
                  {group.category}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {group.items.map((client, i) => (
                    <motion.div
                      key={client.name}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.4 }}
                      custom={i}
                      className="flex items-center gap-3 rounded-2xl border border-teal-900/10 bg-white p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      <div className="h-9 w-9 shrink-0 rounded-lg bg-teal-50 border border-teal-900/[0.06] flex items-center justify-center overflow-hidden">
                        {client.logo_url ? (
                          <img
                            src={assetUrl(client.logo_url)}
                            alt={client.name}
                            className="h-full w-full object-contain p-0.5"
                            draggable={false}
                          />
                        ) : (
                          <div className="h-full w-full bg-teal-700 flex items-center justify-center">
                            <Building2 size={16} className="text-amber-400" />
                          </div>
                        )}
                      </div>
                      <p className="font-display text-sm font-bold text-teal-950 leading-snug">{client.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-xs text-teal-900/50 max-w-xl mx-auto leading-relaxed">
          Client names and logos are displayed on this website with appropriate authorization.
        </p>
      </section>
    </div>
  )
}
