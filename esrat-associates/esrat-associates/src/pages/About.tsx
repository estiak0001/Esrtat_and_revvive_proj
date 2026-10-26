import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CORE_VALUES, STATS } from '../data';
import Icon from '../components/Icon';
import { Mail, Phone as PhoneIcon } from 'lucide-react';
import { useCompanySettings } from '../hooks/useCompanySettings';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type Consultant = {
  id: number; order: number; name: string; title: string;
  bio: string | null; photo_url: string | null;
  expertise: string[]; education: string[];
  phone: string | null; email: string | null;
  is_founder: boolean; active: boolean;
};

type Stat = { id?: number; order: number; value: number; suffix: string; label: string };

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const TIMELINE = [
  { year: '2013', title: 'Professional Journey Begins', desc: 'Started providing legal and property consultancy services, building a strong foundation of expertise and client trust.' },
  { year: '2018', title: 'Expanding Our Reach', desc: 'Grew our portfolio to include corporate advisory, foreign POA services, and bank loan documentation support.' },
  { year: '2021', title: 'Officially Registered', desc: 'Formally registered as ESRAT Associates, formalizing our commitment to professional, compliant consultancy services.' },
  { year: 'Today', title: 'Trusted by Many', desc: 'Serving individuals, businesses, and several renowned companies across Bangladesh with professionalism and integrity.' },
];

export default function About() {
  const company = useCompanySettings();
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [stats, setStats] = useState<Stat[]>(STATS.map((s, i) => ({ ...s, order: i })));

  useEffect(() => {
    fetch(`${API_BASE}/api/content/consultants`)
      .then(r => r.json())
      .then((data: Consultant[]) => { if (Array.isArray(data)) setConsultants(data); })
      .catch(() => {});

    // Same stats admin edits from Dashboard -> Stats also apply here, so this
    // section always matches the homepage instead of drifting out of sync.
    fetch(`${API_BASE}/api/content/stats`)
      .then(r => r.json())
      .then((data: Stat[]) => { if (Array.isArray(data) && data.length > 0) setStats(data); })
      .catch(() => {});
  }, []);
  return (
    <>
      {/* Page Header */}
      <section className="bg-[#0D1B2A] pt-24 md:pt-36 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, #C9A84C 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">Who We Are</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">About Us</h1>
            <div className="gold-divider mt-4" />
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-6">
                Built on Experience, Professionalism & Trust
              </h2>
              <div className="gold-divider mb-6" />
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  ESRAT Associates is a consultancy firm built on experience, professionalism, and trust. Although officially established under the name ESRAT Associates in {company.foundedRegistered}, our consultancy activities and professional expertise date back to {company.foundedPractice}.
                </p>
                <p>
                  Over the years, we have successfully assisted numerous clients by providing reliable consultancy services and strategic guidance in legal, property, and corporate matters. We are proud to serve several renowned companies in Bangladesh while maintaining our commitment to professionalism, confidentiality, and excellence.
                </p>
                <p>
                  Our consultants combine practical industry knowledge with a client-focused approach, ensuring that every engagement receives the highest level of attention and care.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-[#0D1B2A] rounded-2xl p-8 text-center">
                  <div className="font-display text-4xl font-bold text-[#C9A84C] mb-2">{s.value}{s.suffix}</div>
                  <div className="text-white/70 text-sm uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Our Journey</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A]">Company Timeline</h2>
            <div className="gold-divider mx-auto mt-4" />
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#C9A84C]/20 hidden md:block" />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                 
                  className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                    <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:border-[#C9A84C]/30 transition-colors">
                      <h3 className="font-display text-xl font-bold text-[#0D1B2A] mb-2">{item.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#0D1B2A] border-4 border-[#C9A84C] flex items-center justify-center z-10 relative">
                      <span className="text-[#C9A84C] font-bold text-sm">{item.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">What We Stand For</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A]">Our Core Values</h2>
            <div className="gold-divider mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {CORE_VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
               
                className="text-center p-8 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C9A84C] transition-colors duration-300">
                  <Icon name={val.icon} size={26} className="text-[#C9A84C] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#0D1B2A] mb-3">{val.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      {consultants.length > 0 && (
        <section className="py-24 bg-[#0D1B2A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
             
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">The People Behind the Work</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Meet Our Team</h2>
              <div className="gold-divider mx-auto mt-4" />
              <p className="text-white/60 mt-4 max-w-xl mx-auto text-sm">
                Experienced professionals committed to delivering reliable, transparent, and result-oriented consultancy services.
              </p>
            </motion.div>

            {/* Founder — full width card */}
            {consultants.filter(c => c.is_founder).map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
               
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="mb-10 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {c.photo_url ? (
                    <img src={c.photo_url} alt={c.name} className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-2 border-[#C9A84C]/40" />
                  ) : (
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center">
                      <Icon name="User" size={48} className="text-[#C9A84C]/60" />
                    </div>
                  )}
                  <div className="mt-3 inline-flex items-center gap-1.5 bg-[#C9A84C] rounded-full px-3 py-1">
                    <Icon name="Star" size={11} className="text-[#0D1B2A]" />
                    <span className="text-[#0D1B2A] text-[10px] font-bold uppercase tracking-wider">Founder</span>
                  </div>
                </div>
                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-white">{c.name}</h3>
                  <p className="text-[#C9A84C] text-sm font-semibold mt-1">{c.title}</p>
                  {c.bio && <p className="text-white/65 text-sm leading-relaxed mt-4 max-w-3xl">{c.bio}</p>}
                  <div className="mt-5 flex flex-col sm:flex-row gap-6">
                    {c.expertise.length > 0 && (
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Expertise</p>
                        <ul className="space-y-1.5">
                          {c.expertise.map((e, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-white/75 text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />{e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {c.education.length > 0 && (
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Education</p>
                        <ul className="space-y-1.5">
                          {c.education.map((e, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-white/75 text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/50 flex-shrink-0" />{e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {c.phone && (
                      <a href={`tel:${c.phone}`} className="inline-flex items-center gap-2 text-white/60 hover:text-[#C9A84C] text-sm transition-colors">
                        <PhoneIcon size={13} />{c.phone}
                      </a>
                    )}
                    {c.email && (
                      <a href={`mailto:${c.email}`} className="inline-flex items-center gap-2 text-white/60 hover:text-[#C9A84C] text-sm transition-colors">
                        <Mail size={13} />{c.email}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Other consultants — grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants.filter(c => !c.is_founder).map((c, i) => (
                <motion.div
                  key={c.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                 
                  className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#C9A84C]/30 hover:bg-white/8 transition-all duration-300"
                >
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-5">
                    {c.photo_url ? (
                      <img src={c.photo_url} alt={c.name} className="w-16 h-16 rounded-xl object-cover border border-[#C9A84C]/30" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={28} className="text-[#C9A84C]/60" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-display font-bold text-white text-base">{c.name}</h3>
                      <p className="text-[#C9A84C] text-xs font-semibold mt-0.5">{c.title}</p>
                    </div>
                  </div>
                  {c.bio && <p className="text-white/55 text-sm leading-relaxed mb-5 line-clamp-3">{c.bio}</p>}
                  {c.expertise.length > 0 && (
                    <div>
                      <p className="text-white/35 text-[10px] uppercase tracking-widest mb-2">Expertise</p>
                      <ul className="space-y-1">
                        {c.expertise.slice(0, 3).map((e, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-white/65 text-xs">
                            <span className="w-1 h-1 rounded-full bg-[#C9A84C] flex-shrink-0" />{e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {c.email && (
                    <a href={`mailto:${c.email}`} className="mt-4 inline-flex items-center gap-1.5 text-white/40 hover:text-[#C9A84C] text-xs transition-colors">
                      <Mail size={11} />{c.email}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
