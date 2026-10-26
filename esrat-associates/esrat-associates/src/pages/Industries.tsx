import { motion } from 'framer-motion';
import { INDUSTRIES } from '../data';
import { Building2, Home, Briefcase, Landmark, Plane, ShoppingBag, HardHat, User, Globe } from 'lucide-react';

const icons = [Building2, Home, Briefcase, Landmark, Plane, ShoppingBag, HardHat, User, Globe];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: 'easeOut' as const },
  }),
};

export default function Industries() {
  return (
    <>
      <section className="bg-[#0D1B2A] pt-24 md:pt-36 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, #C9A84C 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">Who We Serve</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Industries We Serve</h1>
            <div className="gold-divider mt-4" />
            <p className="text-white/60 mt-5 max-w-xl text-base">
              ESRAT Associates supports clients across a wide range of industries with professional consultancy expertise.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry, i) => {
              const IconComp = icons[i % icons.length];
              return (
                <motion.div
                  key={industry}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                 
                  className="flex items-center gap-5 p-7 rounded-2xl border border-slate-100 hover:border-[#C9A84C]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#0D1B2A] flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C] transition-colors duration-300">
                    <IconComp size={24} className="text-[#C9A84C] group-hover:text-[#0D1B2A] transition-colors duration-300" />
                  </div>
                  <span className="font-semibold text-[#1E293B] text-sm leading-snug">{industry}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust statement */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0D1B2A] mb-5">
              Trusted by Leading Organizations
            </h2>
            <p className="text-slate-500 leading-relaxed text-base">
              ESRAT Associates is proud to have served a diverse range of clients, including individuals, entrepreneurs, corporate entities, and several respected organizations across Bangladesh. Our commitment to confidentiality, professionalism, and service excellence has helped us build strong and lasting client relationships.
            </p>
            <p className="mt-6 text-[#C9A84C] font-semibold italic">
              "Client satisfaction remains at the heart of everything we do."
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
