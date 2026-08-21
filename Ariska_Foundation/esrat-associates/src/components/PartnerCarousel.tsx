import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../data';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type Partner = { id?: number; name: string; initials: string; color: string; logo_url?: string };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function PartnerCarousel() {
  const [partners, setPartners] = useState<Partner[]>(PARTNERS);

  useEffect(() => {
    fetch(`${API_BASE}/api/content/partners`)
      .then((r) => r.json())
      .then((data: Partner[]) => { if (Array.isArray(data) && data.length > 0) setPartners(data); })
      .catch(() => {});
  }, []);

  // Duplicate for seamless infinite loop
  const items = [...partners, ...partners];

  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">
            Trusted Network
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A]">
            Our Valued Clients
          </h2>
          <div className="gold-divider mx-auto mt-4" />
        </motion.div>
      </div>

      {/* Marquee track */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {items.map((partner, i) => (
            <div key={i} className="flex-shrink-0 mx-3 group">
              <div className="w-[168px] flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#C9A84C]/40 group-hover:shadow-xl">
                {/* Logo — shows uploaded image or colored initials fallback */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: partner.logo_url ? '#f8f8f8' : partner.color }}
                >
                  {partner.logo_url ? (
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm tracking-wide leading-tight text-center px-1">
                      {partner.initials}
                    </span>
                  )}
                </div>

                {/* Name */}
                <span className="text-center text-xs font-semibold text-[#0D1B2A] leading-snug line-clamp-2">
                  {partner.name}
                </span>

                {/* Accent underline, appears on hover */}
                <span className="h-0.5 w-8 rounded-full bg-[#C9A84C]/0 transition-colors duration-300 group-hover:bg-[#C9A84C]/70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
