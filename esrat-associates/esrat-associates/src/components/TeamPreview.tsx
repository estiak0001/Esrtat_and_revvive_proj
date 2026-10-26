import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, User, ArrowRight } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type Consultant = {
  id: number;
  name: string;
  title: string;
  photo_url: string | null;
  is_founder: boolean;
  active: boolean;
};

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('');
}

export default function TeamPreview() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/consultants`)
      .then((r) => r.json())
      .then((data: Consultant[]) => { if (Array.isArray(data)) setConsultants(data); })
      .catch(() => {});
  }, []);

  const founder = consultants.find((c) => c.is_founder);
  const others = consultants.filter((c) => !c.is_founder);

  if (consultants.length === 0) return null;

  // Duplicate for a seamless infinite loop
  const items = others.length > 0 ? [...others, ...others] : [];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Our Team</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A]">Meet the People Behind ESRAT</h2>
          <div className="gold-divider mx-auto mt-4" />
          <p className="text-slate-500 mt-5 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A dedicated team of legal, property, and corporate consultants working under the
            guidance of our founder to deliver reliable, professional service on every case.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[300px_1fr] gap-10 items-center">
          {/* Founder — static */}
          {founder && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto md:mx-0 group"
            >
              <Link
                to={`/consultant#consultant-${founder.id}`}
                className="relative block w-64 h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0D1B2A] to-[#1a2f45] shadow-xl flex flex-col items-center justify-center transition-transform duration-300 group-hover:-translate-y-1.5"
              >
                {founder.photo_url ? (
                  <img src={founder.photo_url} alt={founder.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#C9A84C]/15 border-2 border-[#C9A84C]/40 flex items-center justify-center">
                    <span className="font-display text-3xl font-bold text-[#C9A84C]">{initials(founder.name)}</span>
                  </div>
                )}
                {founder.photo_url && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="font-display font-bold text-white text-sm">{founder.name}</h3>
                    <p className="text-[#C9A84C] text-xs mt-0.5">{founder.title}</p>
                  </div>
                )}
              </Link>
              <div className="absolute -top-3 -right-3 bg-[#C9A84C] text-[#0D1B2A] rounded-full px-3 py-1 shadow-lg flex items-center gap-1.5 pointer-events-none">
                <Crown size={12} />
                <span className="text-[10px] font-bold uppercase tracking-wide">Founder</span>
              </div>
              {!founder.photo_url && (
                <Link to={`/consultant#consultant-${founder.id}`} className="mt-3 block text-center">
                  <h3 className="font-display font-bold text-[#0D1B2A] text-sm group-hover:text-[#C9A84C] transition-colors">{founder.name}</h3>
                  <p className="text-[#C9A84C] text-xs mt-0.5">{founder.title}</p>
                </Link>
              )}
            </motion.div>
          )}

          {/* Team — sliding marquee */}
          {items.length > 0 ? (
            <div className="relative w-full overflow-hidden select-none">
              <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

              <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {items.map((c, i) => (
                  <Link
                    key={i}
                    to={`/consultant#consultant-${c.id}`}
                    className="flex-shrink-0 mx-2 group"
                  >
                    <div className="w-[210px] flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white px-2.5 py-7 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#C9A84C]/40 group-hover:shadow-xl">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-[#0D1B2A] flex items-center justify-center ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
                        {c.photo_url ? (
                          <img src={c.photo_url} alt={c.name} className="w-full h-full object-cover object-top" />
                        ) : (
                          <User className="w-8 h-8 text-[#C9A84C]/70" />
                        )}
                      </div>
                      <span className="text-center text-sm font-semibold text-[#0D1B2A] leading-snug line-clamp-1 group-hover:text-[#C9A84C] transition-colors">
                        {c.name}
                      </span>
                      <span className="text-center text-xs text-[#C9A84C] font-medium leading-snug line-clamp-1">
                        {c.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center md:text-left text-slate-400 text-sm">
              More team profiles coming soon.
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/consultant"
            className="inline-flex items-center gap-2 text-[#0D1B2A] font-semibold text-sm hover:text-[#C9A84C] transition-colors"
          >
            Meet the Full Team <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
