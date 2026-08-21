import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
/* NOTE: WHY_CHOOSE/SERVICES/Mission&Vision/Testimonials/CTA sections below animate on
   mount (`animate=`) rather than on scroll (`whileInView=`) — scroll-triggered reveals
   depend on IntersectionObserver firing, which is unreliable for full-page screenshot
   tools and can leave content stuck at opacity:0. Mount-triggered animation guarantees
   the content is always fully visible regardless of how the page is viewed/captured. */
import { Link } from 'react-router-dom';
import { ChevronRight, Phone } from 'lucide-react';
import { STATS, WHY_CHOOSE, SERVICES, TESTIMONIALS } from '../data';
import { useCompanySettings } from '../hooks/useCompanySettings';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
type ApiTestimonial = { id: number; order: number; name: string; title: string; service: string; service_icon: string; review: string; rating: number; active: boolean; };
import { useCounter } from '../hooks/useCounter';
import Icon from '../components/Icon';
import HeroCarousel from '../components/HeroCarousel';
import PartnerCarousel from '../components/PartnerCarousel';
import TeamPreview from '../components/TeamPreview';

/* ── fade-up animation preset ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' as const },
  }),
};

/* ── Animated stat counter (starts on mount — not scroll-gated, see note above) ── */
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const count = useCounter(value, 2000, true);

  return (
    <div className="text-center px-1">
      <div className="text-2xl sm:text-3xl lg:text-5xl font-bold font-display text-[#C9A84C] whitespace-nowrap">
        {count}
        {suffix}
      </div>
      <div className="text-white/70 text-xs sm:text-sm mt-2 uppercase tracking-wider">{label}</div>
    </div>
  );
}

type Stat = { id?: number; order: number; value: number; suffix: string; label: string };

export default function Home() {
  const company = useCompanySettings();

  const [stats, setStats] = useState<Stat[]>(STATS.map((s, i) => ({ ...s, id: i, order: i } as Stat)));
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>(TESTIMONIALS.slice(0, 3) as unknown as ApiTestimonial[]);

  useEffect(() => {
    // Fetch stats from API
    fetch(`${API_BASE}/api/content/stats`)
      .then(r => r.json())
      .then((data: Stat[]) => {
        if (Array.isArray(data) && data.length > 0) setStats(data);
      })
      .catch(() => setStats(STATS.map((s, i) => ({ ...s, id: i, order: i } as Stat)))); // Fall back to static data if API fails

    // Fetch testimonials from API
    fetch(`${API_BASE}/api/content/testimonials`)
      .then(r => r.json())
      .then((data: ApiTestimonial[]) => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ── HERO + STATS fill exactly one screen; next section only appears after scrolling ── */}
      <div className="flex flex-col min-h-screen">
        <HeroCarousel />

        {/* ── STATS ── */}
        <section className="bg-[#162840] py-6 sm:py-8 md:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">
              Our Advantage
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A]">
              Why Choose ESRAT Associates
            </h2>
            <div className="gold-divider mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-100 hover:border-[#C9A84C]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                  <Icon name={item.icon} size={22} className="text-[#C9A84C]" />
                </div>
                <p className="text-sm font-medium text-[#1E293B] leading-snug">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">
              What We Offer
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A]">
              Our Services
            </h2>
            <div className="gold-divider mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.slug}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-[#C9A84C]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center mb-5 group-hover:bg-[#C9A84C] transition-colors duration-300">
                  <Icon name={svc.icon} size={24} className="text-[#C9A84C] group-hover:text-[#0D1B2A] transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#0D1B2A] mb-2">{svc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{svc.description}</p>
                <ul className="space-y-1.5 mb-6">
                  {svc.items.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <ChevronRight size={14} className="text-[#C9A84C] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services#${svc.slug}`}
                  className="text-[#C9A84C] text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Learn More <ChevronRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-[#0D1B2A] hover:bg-[#162840] text-white font-semibold px-8 py-4 rounded-full text-sm transition-colors duration-200"
            >
              View All Services <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Who We Are</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A]">Our Mission &amp; Vision</h2>
            <div className="gold-divider mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                label: 'Our Mission',
                text: "To provide professional, reliable, and result-oriented consultancy services while maintaining the highest standards of integrity, quality, and excellence. We are committed to delivering practical solutions that protect our clients' interests, create long-term value, and contribute to their continued success.",
              },
              {
                label: 'Our Vision',
                text: "To become one of the most trusted and respected consultancy firms in Bangladesh, recognized for professionalism, expertise, and an unwavering commitment to client satisfaction. We aspire to be the preferred consultancy partner for individuals, businesses, and organizations seeking dependable legal, property, and corporate solutions.",
              },
            ].map((block, i) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="bg-[#0D1B2A] rounded-3xl p-10"
              >
                <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-4">
                  {block.label}
                </p>
                <p className="text-white/80 text-base leading-relaxed">{block.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM PREVIEW ── */}
      <TeamPreview />

      {/* ── PARTNER CAROUSEL ── */}
      <PartnerCarousel />

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Client Feedback</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A]">What Our Clients Say</h2>
            <div className="gold-divider mx-auto mt-4" />
            <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm">
              Trusted by individuals, businesses, and Non-Resident Bangladeshis across the country and abroad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-slate-50 border border-slate-100 rounded-2xl p-7 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-[#C9A84C] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-slate-600 text-sm leading-relaxed flex-1">&ldquo;{t.review}&rdquo;</p>

                {/* Divider */}
                <div className="my-5 h-px bg-slate-200" />

                {/* Author */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#0D1B2A] text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{t.title}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-full px-3 py-1">
                    <Icon name={t.service_icon} size={12} className="text-[#C9A84C] shrink-0" />
                    <span className="text-[#C9A84C] text-[10px] font-semibold whitespace-nowrap">{t.service}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-[#C9A84C] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-4"
          >
            Ready to Discuss Your Requirements?
          </motion.h2>
          <p className="text-[#0D1B2A]/70 text-lg mb-10">
            Our team of experienced consultants is here to help you navigate complex legal, property, and corporate matters.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0D1B2A] text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-[#162840] transition-colors"
            >
              Get in Touch <ChevronRight size={16} />
            </Link>
            <a
              href={`tel:${company.phone}`}
              className="inline-flex items-center gap-2 border-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold px-8 py-4 rounded-full text-sm hover:bg-[#0D1B2A] hover:text-white transition-colors"
            >
              <Phone size={16} /> {company.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
