import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import GridBackdrop from '../components/GridBackdrop'
import { internationalMarkets } from '../data/content'
import indonesiaPhoto from '../assets/photos/global/indonesia.jpg'
import chinaPhoto from '../assets/photos/global/china.jpg'
import sriLankaPhoto from '../assets/photos/global/srilanka.jpg'
import flagId from 'flag-icons/flags/1x1/id.svg'
import flagCn from 'flag-icons/flags/1x1/cn.svg'
import flagLk from 'flag-icons/flags/1x1/lk.svg'

const marketMedia: Record<string, { photo: string; flag: string }> = {
  Indonesia: { photo: indonesiaPhoto, flag: flagId },
  China: { photo: chinaPhoto, flag: flagCn },
  'Sri Lanka': { photo: sriLankaPhoto, flag: flagLk },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
}

export default function Global() {
  return (
    <div>
      <PageHero
        eyebrow="International Business"
        title="Building Connections Across Borders"
        subtitle="ARISKA is developing an international network to connect businesses across different markets."
      />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="grid sm:grid-cols-3 gap-6">
          {internationalMarkets.map((market, i) => {
            const media = marketMedia[market.country]
            return (
              <motion.div
                key={market.country}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={i}
                className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-[4/5]"
              >
                <img
                  src={media.photo}
                  alt={`${market.country} skyline`}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-950/30 to-transparent" />
                <div className="absolute top-4 right-4 h-10 w-10 rounded-full overflow-hidden border-2 border-dotted border-white shadow-lg">
                  <img src={media.flag} alt={`${market.country} flag`} className="h-full w-full object-cover" draggable={false} />
                </div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="font-display text-xl font-bold text-white">{market.country}</h3>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">{market.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-teal-700 text-white">
        <GridBackdrop />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-20 md:py-24 text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-bold">Looking Ahead</h3>
          <p className="mt-5 text-white/70 leading-relaxed">
            Our international network continues to grow. We are exploring opportunities to
            establish business relationships in additional countries and expand our presence
            across international markets.
          </p>
          <p className="mt-10 text-amber-400 font-display text-xl sm:text-2xl font-semibold">
            Create Connections.
          </p>
          <p className="mt-2 text-amber-400 font-display text-xl sm:text-2xl font-semibold">
            Discover Opportunities.
          </p>
          <p className="mt-2 text-amber-400 font-display text-xl sm:text-2xl font-semibold">
            Build Long-Term Success.
          </p>
        </div>
      </section>
    </div>
  )
}
