import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Package,
  Printer,
  Handshake,
  Ship,
  Sprout,
  Globe2,
  Award,
  PackageCheck,
  Layers,
  MapPin,
  Phone,
  CheckCircle2,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import StatCounter from '../components/StatCounter'
import PartnerMarquee from '../components/PartnerMarquee'
import OfferFlow from '../components/OfferFlow'
import HeroBackdrop from '../components/HeroBackdrop'
import ConnectionsDiagram from '../components/ConnectionsDiagram'
import { company, whatWeDo, whyAriska, mission } from '../data/content'
import handshakePhoto from '../assets/photos/handshake.jpg'
import wordmarkLight from '../assets/logo/ariska-wordmark-light.png'
import printingPhoto from '../assets/photos/gallery/printing-press.jpg'
import teamMeetingPhoto from '../assets/photos/gallery/team-meeting.jpg'
import juteFieldPhoto from '../assets/photos/gallery/jute-field.jpg'
import warehousePhoto from '../assets/photos/gallery/warehouse-worker.jpg'
import exportPackagingPhoto from '../assets/photos/gallery/export-packaging.jpg'
import pineapplePhoto from '../assets/photos/agro/pineapple.jpg'

const heroBackdropPhotos = [
  { src: juteFieldPhoto, alt: 'A jute field growing in Bangladesh' },
  { src: teamMeetingPhoto, alt: 'Business professionals in a team meeting' },
  { src: printingPhoto, alt: 'Printing press in operation, representing printing and packaging services' },
]

const offerIcons = [Package, Printer, Ship, Sprout]
const offerImages = [warehousePhoto, printingPhoto, exportPackagingPhoto, pineapplePhoto]

const featureColors = {
  amber: { badge: 'bg-amber-500/10 text-amber-600', bar: 'bg-amber-500' },
  sky: { badge: 'bg-sky-500/10 text-sky-600', bar: 'bg-sky-500' },
  emerald: { badge: 'bg-emerald-500/10 text-emerald-600', bar: 'bg-emerald-500' },
  violet: { badge: 'bg-violet-500/10 text-violet-600', bar: 'bg-violet-500' },
  rose: { badge: 'bg-rose-500/10 text-rose-600', bar: 'bg-rose-500' },
  orange: { badge: 'bg-orange-500/10 text-orange-600', bar: 'bg-orange-500' },
} as const

const featureAccents = [
  { icon: Award, color: 'amber' },
  { icon: Globe2, color: 'sky' },
  { icon: PackageCheck, color: 'emerald' },
  { icon: Layers, color: 'violet' },
  { icon: Handshake, color: 'rose' },
  { icon: MapPin, color: 'orange' },
] satisfies { icon: typeof Award; color: keyof typeof featureColors }[]

const heroStats = [
  { value: '15+ Years', label: 'Business Experience' },
  { value: '2024', label: 'Founded' },
  { value: '3+ Markets', label: 'International Reach' },
]

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  company.businessAddress,
)}&output=embed`

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }),
}

export default function Home() {
  return (
    <div>
      {/* Hero / Banner */}
      <section className="relative overflow-hidden min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)] flex items-center">
        <HeroBackdrop photos={heroBackdropPhotos} />

        <div className="relative w-full max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20 md:py-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-amber-400 uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[11px] sm:text-sm font-semibold mb-3 sm:mb-4 px-2"
          >
            Supply &middot; Printing &amp; Packaging &middot; Export &amp; Trading &middot; Agro
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-sm"
          >
            Creating Connections,
            <br className="hidden sm:block" /> Building Success
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-4 sm:mt-5 text-white/85 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-1"
          >
            {company.name} provides professional supply &amp; procurement, printing &amp;
            packaging, export &amp; trading, and agro solutions &mdash; connecting businesses
            across Bangladesh and international markets.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-teal-950 font-semibold text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 transition-colors"
            >
              Explore Our Services <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 hover:border-white text-white font-semibold text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <StatCounter
                  value={stat.value}
                  className="block font-display text-lg sm:text-2xl font-extrabold text-amber-400"
                />
                <span className="text-[10px] sm:text-xs text-white/70 leading-tight">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="text-amber-600 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-4">
              Who We Are
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-teal-950 leading-snug">
              A Complete Trading &amp; Export Solution from Bangladesh
            </h2>
            <p className="mt-5 text-teal-900/70 leading-relaxed">
              {company.name} is a Bangladesh-based trading, supply, sourcing, and export company
              connecting businesses with reliable products, suppliers, and international markets.
              Although we began our journey under the {company.name} name in 2024, our team
              brings more than 15 years of experience in business, trading, sourcing, and supply.
            </p>
            <p className="mt-4 text-teal-900/70 leading-relaxed">
              Today, we are building an expanding international network with business connections
              in Indonesia, China, and Sri Lanka &mdash; with plans to expand into additional
              markets in the future.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {company.pillars.map((pillar) => (
                <span
                  key={pillar}
                  className="px-4 py-1.5 rounded-full bg-teal-700/5 border border-teal-900/10 text-xs font-semibold text-teal-900/80 uppercase tracking-wide"
                >
                  {pillar}
                </span>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-3 transition-colors"
            >
              Learn More About Us <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mx-auto w-full max-w-sm aspect-square flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/40 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-teal-900/10" />
            <div className="h-44 w-44 sm:h-52 sm:w-52 rounded-full bg-teal-700 shadow-2xl flex items-center justify-center">
              <img src={wordmarkLight} alt="ARISKA" className="w-28 sm:w-36 h-auto" draggable={false} />
            </div>

            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-2 rounded-xl bg-white shadow-lg border border-teal-900/5 px-4 py-2.5">
              <Globe2 size={18} className="text-amber-500" />
              <span className="text-xs font-semibold text-teal-950">3+ Countries</span>
            </div>
            <div className="absolute bottom-4 left-0 sm:bottom-6 sm:-left-4 flex items-center gap-2 rounded-xl bg-white shadow-lg border border-teal-900/5 px-4 py-2.5">
              <Award size={18} className="text-amber-500" />
              <span className="text-xs font-semibold text-teal-950">15+ Yrs Experience</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="relative overflow-hidden bg-teal-700/[0.03] py-16 md:py-20">
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading eyebrow="Why Ariska" title="Why Work With Us?" />
          <div className="grid lg:grid-cols-5 gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative lg:col-span-2 rounded-3xl overflow-hidden shadow-xl min-h-[280px] lg:min-h-0"
            >
              <img
                src={teamMeetingPhoto}
                alt="ARISKA team members collaborating in a business meeting"
                className="absolute inset-0 w-full h-full object-cover select-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/30 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-7">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-500 text-teal-950 text-[11px] font-bold px-3 py-1 mb-3">
                  <Award size={13} strokeWidth={2.5} /> 15+ Years Experience
                </span>
                <h3 className="font-display text-xl font-bold text-white leading-snug">
                  A Team Built on Trust &amp; Experience
                </h3>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  The people behind every shipment, every sourcing call, every partnership.
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
              {whyAriska.map((item, i) => {
                const { icon: Icon, color } = featureAccents[i]
                const accent = featureColors[color]
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={i}
                    className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border-2 border-dotted border-teal-950 hover:shadow-xl hover:-translate-y-1 hover:border-solid transition-all duration-300"
                  >
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-4 ${accent.badge}`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display font-semibold text-base text-teal-950">{item.title}</h3>
                    <p className="mt-2 text-sm text-teal-900/70 leading-relaxed">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us - collage + checklist */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1 max-w-md mx-auto lg:mx-0"
          >
            <img
              src={handshakePhoto}
              alt="Two business partners shaking hands, representing ARISKA's reliable trading partnerships"
              className="w-full aspect-[4/5] sm:aspect-square object-cover rounded-3xl shadow-xl border border-teal-900/5 select-none"
              draggable={false}
            />
            <div className="absolute top-2 left-2 sm:-top-4 sm:-left-6 flex items-center gap-2 rounded-xl bg-white shadow-lg border border-teal-900/5 px-3 sm:px-4 py-2 sm:py-2.5">
              <Handshake size={16} className="text-amber-500 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-teal-950 whitespace-nowrap">Trusted Partnerships</span>
            </div>
            <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-6 flex items-center gap-2 rounded-xl bg-white shadow-lg border border-teal-900/5 px-3 sm:px-4 py-2 sm:py-2.5">
              <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-teal-950 whitespace-nowrap">Reliable Solutions</span>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <p className="text-amber-600 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-4">
              Why Choose Us
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-teal-950 leading-snug">
              {mission.heading}
            </h2>
            <p className="mt-5 text-teal-900/70 leading-relaxed">{mission.intro}</p>
            <div className="mt-7 space-y-3 max-w-lg mx-auto lg:mx-0">
              {mission.points.map((point) => (
                <div key={point} className="flex items-start gap-3 text-left">
                  <CheckCircle2 size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-teal-900/80 leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-teal-700/[0.03] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="What We Offer"
            title="From essential goods to international export"
            subtitle="From supplying essential commodities to established organizations, to connecting international buyers with Bangladeshi products, we focus on creating reliable business relationships and delivering practical solutions."
          />
          <OfferFlow
            items={whatWeDo.map((item, i) => ({
              icon: offerIcons[i],
              image: offerImages[i],
              title: item.title,
              description: item.description,
            }))}
          />
        </div>
      </section>

      {/* International connections */}
      <section className="relative overflow-hidden bg-teal-700 text-white">
        <div className="absolute inset-0 bg-grid-squares [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_75%)]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_20%,#E8A33D_0,transparent_45%),radial-gradient(circle_at_10%_80%,#3D3D3D_0,transparent_45%)]" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-10 md:py-12 text-center">
          <p className="text-amber-400 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-2">
            Our International Connections
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-bold max-w-xl mx-auto mb-4">
            Building a growing network across borders
          </h2>
          <ConnectionsDiagram />
          <p className="mt-4 text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
            We continue to develop our international network and explore opportunities in new
            markets.
          </p>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center mb-12">
          <p className="text-amber-600 uppercase tracking-[0.2em] text-xs font-semibold mb-3">
            Trusted By
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-teal-950">
            Organizations We&apos;ve Worked With
          </h2>
        </div>
        <PartnerMarquee />
      </section>

      {/* Contact */}
      <section className="bg-teal-700/[0.03] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeading
            eyebrow="Contact Us"
            title="Let's Create Opportunities Together"
            subtitle="Looking for a reliable business partner in Bangladesh? Reach out and our team will get back to you."
          />

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="flex items-center gap-3 rounded-xl bg-white border border-teal-900/5 shadow-sm p-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-teal-700 flex items-center justify-center">
                <MapPin size={18} className="text-amber-400" />
              </div>
              <div className="min-w-0 text-left">
                <h3 className="font-display font-semibold text-teal-950 text-xs uppercase tracking-wide">
                  Business Address
                </h3>
                <p className="mt-0.5 text-sm text-teal-900/70 leading-snug truncate">
                  {company.businessAddress}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white border border-teal-900/5 shadow-sm p-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-teal-700 flex items-center justify-center">
                <Phone size={18} className="text-amber-400" />
              </div>
              <div className="min-w-0 text-left">
                <h3 className="font-display font-semibold text-teal-950 text-xs uppercase tracking-wide">Phone</h3>
                <a
                  href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}
                  className="mt-0.5 block text-sm text-teal-900/70 hover:text-amber-600 leading-snug"
                >
                  {company.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white border border-teal-900/5 shadow-sm p-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-teal-700 flex items-center justify-center">
                <Globe2 size={18} className="text-amber-400" />
              </div>
              <div className="min-w-0 text-left">
                <h3 className="font-display font-semibold text-teal-950 text-xs uppercase tracking-wide">Website</h3>
                <p className="mt-0.5 text-sm text-teal-900/70 leading-snug truncate">{company.website}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[320px] sm:h-[420px]">
          <iframe
            title="ARISKA business address map"
            src={mapSrc}
            loading="lazy"
            className="absolute inset-0 w-full h-full grayscale-[15%]"
          />
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-teal-700/[0.08] to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-teal-950 font-semibold px-6 py-3 transition-colors"
            >
              Send Us a Message <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
