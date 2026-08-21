import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Award, BookOpen, Briefcase, CheckCircle, GraduationCap, Mail, Phone, Star, User, Crown } from 'lucide-react';
import { useCompanySettings } from '../hooks/useCompanySettings';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type EducationEntry = string | { degree?: string; institution?: string; year?: string };

type Consultant = {
  id: number;
  order: number;
  name: string;
  title: string;
  bio: string;
  photo_url: string;
  expertise: string[];
  education: EducationEntry[];
  phone: string;
  email: string;
  is_founder: boolean;
  active: boolean;
};

function parseEducation(entry: EducationEntry): { degree: string; institution: string; year: string } {
  if (typeof entry === 'object' && entry !== null) {
    return { degree: entry.degree || '', institution: entry.institution || '', year: entry.year || '' };
  }
  const str = String(entry);
  const dashParts = str.split('–').map(s => s.trim());
  if (dashParts.length >= 2) {
    const commaParts = dashParts[1].split(',').map(s => s.trim());
    return { degree: dashParts[0], institution: commaParts[0] || dashParts[1], year: commaParts[1] || '' };
  }
  return { degree: str, institution: '', year: '' };
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function Consultant() {
  const company = useCompanySettings();
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/api/consultants`)
      .then(res => setConsultants(res.data))
      .catch(() => setConsultants([]))
      .finally(() => setLoading(false));
  }, []);

  const founder = consultants.find(c => c.is_founder);
  const others = consultants.filter(c => !c.is_founder);

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#0D1B2A] pt-24 md:pt-36 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, #C9A84C 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">Our Team</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Our Consultants</h1>
            <div className="gold-divider mt-4" />
          </motion.div>
        </div>
      </section>

      {loading && (
        <section className="py-24 bg-white text-center text-slate-400 text-sm">Loading consultants…</section>
      )}

      {!loading && consultants.length === 0 && (
        <section className="py-24 bg-white text-center text-slate-400 text-sm">
          No consultant profiles available yet.
        </section>
      )}

      {/* Founder Section */}
      {!loading && founder && (
        <section id={`consultant-${founder.id}`} className="py-24 bg-white scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Photo Card */}
              <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
                className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl border border-[#C9A84C]/20" />
                  <div className="absolute -inset-8 rounded-3xl border border-[#C9A84C]/10" />
                  <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0D1B2A] to-[#1a2f45] flex flex-col items-center justify-center shadow-2xl">
                    {founder.photo_url ? (
                      <img src={founder.photo_url} alt={founder.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <>
                        <div className="w-32 h-32 rounded-full bg-[#C9A84C]/15 border-2 border-[#C9A84C]/40 flex items-center justify-center mb-6">
                          <span className="font-display text-5xl font-bold text-[#C9A84C]">
                            {founder.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-white text-center px-6">{founder.name}</h3>
                        <p className="text-[#C9A84C] text-sm text-center mt-2 px-6">{founder.title}</p>
                        <div className="mt-4 flex items-center gap-2 px-6">
                          <span className="h-px w-8 bg-[#C9A84C]/50" />
                          <span className="text-white/50 text-xs uppercase tracking-widest">ESRAT Associates</span>
                          <span className="h-px w-8 bg-[#C9A84C]/50" />
                        </div>
                      </>
                    )}
                    {founder.photo_url && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl p-5">
                        <h3 className="font-display font-bold text-white">{founder.name}</h3>
                        <p className="text-[#C9A84C] text-sm mt-0.5">{founder.title}</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute -top-4 -right-4 bg-[#C9A84C] text-[#0D1B2A] rounded-full px-4 py-1.5 shadow-lg flex items-center gap-1.5">
                    <Crown size={14} />
                    <span className="text-xs font-bold uppercase tracking-wide">Founder</span>
                  </div>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Founder & Principal</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-2">{founder.name}</h2>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-4">{founder.title}</p>
                <div className="gold-divider mb-6" />
                {founder.bio && (
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    {founder.bio.split('\n').filter(Boolean).map((para: string, i: number) => <p key={i}>{para}</p>)}
                  </div>
                )}
                <div className="flex flex-wrap gap-3 mt-8">
                  <a href={`tel:${founder.phone || company.phone}`}
                    className="inline-flex items-center gap-2 bg-[#0D1B2A] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#1a2f45] transition-colors">
                    <Phone className="w-4 h-4 text-[#C9A84C]" />
                    {founder.phone || company.phoneDisplay}
                  </a>
                  <a href={`mailto:${founder.email || company.email}`}
                    className="inline-flex items-center gap-2 border border-[#C9A84C] text-[#C9A84C] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#C9A84C] hover:text-[#0D1B2A] transition-colors">
                    <Mail className="w-4 h-4" />
                    {founder.email || company.email}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Founder Expertise & Education */}
            {(founder.expertise.length > 0 || founder.education.length > 0) && (
              <div className="grid md:grid-cols-2 gap-16 mt-20">
                {founder.expertise.length > 0 && (
                  <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <div className="flex items-center gap-3 mb-6">
                      <Briefcase className="w-6 h-6 text-[#C9A84C]" />
                      <h3 className="font-display text-2xl font-bold text-[#0D1B2A]">Areas of Expertise</h3>
                    </div>
                    <div className="gold-divider mb-8" />
                    <ul className="space-y-3">
                      {founder.expertise.map((item: string, i: number) => (
                        <motion.li key={i} custom={i} initial="hidden" animate="visible" variants={fadeUp}
                          className="flex items-center gap-3 text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-[#C9A84C] flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {founder.education.length > 0 && (
                  <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap className="w-6 h-6 text-[#C9A84C]" />
                      <h3 className="font-display text-2xl font-bold text-[#0D1B2A]">Education</h3>
                    </div>
                    <div className="gold-divider mb-8" />
                    <div className="space-y-4">
                      {founder.education.map((edu: EducationEntry, i: number) => {
                        const { degree, institution, year } = parseEducation(edu);
                        return (
                          <motion.div key={i} custom={i} initial="hidden" animate="visible" variants={fadeUp}
                            className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-[#0D1B2A] flex items-center justify-center flex-shrink-0">
                                <BookOpen className="w-5 h-5 text-[#C9A84C]" />
                              </div>
                              <div>
                                <div className="font-display font-bold text-[#0D1B2A]">{degree}</div>
                                {institution && <div className="text-slate-500 text-sm mt-0.5">{institution}</div>}
                                {year && <div className="text-[#C9A84C] text-xs font-semibold mt-1">{year}</div>}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Other Consultants Grid */}
      {!loading && others.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
              <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">The Team</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A]">Meet Our Consultants</h2>
              <div className="gold-divider mx-auto mt-4" />
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {others.map((c, i) => (
                <motion.div key={c.id} id={`consultant-${c.id}`} custom={i} initial="hidden" animate="visible" variants={fadeUp}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow scroll-mt-24">
                  <div className="aspect-[4/5] bg-gradient-to-br from-[#0D1B2A] to-[#1a2f45] flex items-center justify-center relative overflow-hidden">
                    {c.photo_url ? (
                      <img src={c.photo_url} alt={c.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-[#C9A84C]/15 border-2 border-[#C9A84C]/40 flex items-center justify-center">
                        <User className="w-10 h-10 text-[#C9A84C]" />
                      </div>
                    )}
                    {c.photo_url && <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-[#0D1B2A]">{c.name}</h3>
                    <p className="text-[#C9A84C] text-sm font-medium mt-1">{c.title}</p>
                    {c.expertise.length > 0 && (
                      <ul className="mt-4 space-y-1.5">
                        {c.expertise.slice(0, 4).map((e: string, j: number) => (
                          <li key={j} className="flex items-center gap-2 text-slate-600 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />{e}
                          </li>
                        ))}
                        {c.expertise.length > 4 && <li className="text-slate-400 text-xs pl-3.5">+{c.expertise.length - 4} more</li>}
                      </ul>
                    )}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-1.5">
                      {c.phone && (
                        <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#C9A84C] transition-colors">
                          <Phone size={12} /> {c.phone}
                        </a>
                      )}
                      {c.email && (
                        <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#C9A84C] transition-colors">
                          <Mail size={12} /> {c.email}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats bar */}
      {!loading && consultants.length > 0 && (
        <section className="py-16 bg-[#0D1B2A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Star, label: '500+ Clients Served', sub: 'Individuals & Corporates' },
                { icon: Briefcase, label: '10+ Corporate Clients', sub: 'Trusted Companies' },
                { icon: Award, label: '13+ Years Experience', sub: 'Legal & Property' },
                { icon: CheckCircle, label: '100% Client Focus', sub: 'Transparent Practice' },
              ].map((item, i) => (
                <motion.div key={i} custom={i} initial="hidden" animate="visible" variants={fadeUp} className="text-center p-6">
                  <item.icon className="w-8 h-8 text-[#C9A84C] mx-auto mb-3" />
                  <div className="font-display text-base font-bold text-white mb-1">{item.label}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">{item.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Get in Touch</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-4">Ready to Work With Us?</h2>
            <div className="gold-divider mx-auto mb-6" />
            <p className="text-slate-500 mb-8 leading-relaxed">
              Reach out for expert consultancy on legal, property, corporate, or documentation matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] text-[#0D1B2A] font-semibold px-8 py-3.5 rounded-full transition-colors">
                Book a Consultation
              </a>
              <a href={`tel:${company.phone}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#0D1B2A] text-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-white font-semibold px-8 py-3.5 rounded-full transition-colors">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
