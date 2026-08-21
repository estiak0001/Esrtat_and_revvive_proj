import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../data';
import Icon from '../components/Icon';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function Services() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#0D1B2A] pt-24 md:pt-36 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, #C9A84C 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">What We Offer</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Our Services</h1>
            <div className="gold-divider mt-4" />
            <p className="text-white/60 mt-5 max-w-xl text-base">
              Comprehensive consultancy solutions tailored to your legal, property, corporate, and documentation needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      <div className="bg-white">
        {SERVICES.map((svc, i) => (
          <section
            key={svc.slug}
            id={svc.slug}
            className={`py-20 scroll-mt-24 ${i % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                {/* Icon panel */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                 
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0 w-full max-w-xs"
                >
                  <div className="bg-[#0D1B2A] rounded-3xl p-12 flex flex-col items-center text-center shadow-2xl">
                    <div className="w-20 h-20 rounded-2xl bg-[#C9A84C]/20 flex items-center justify-center mb-5">
                      <Icon name={svc.icon} size={36} className="text-[#C9A84C]" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">{svc.title}</h3>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                   
                    variants={fadeUp}
                  >
                    <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">
                      Service {String(i + 1).padStart(2, '0')}
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-4">
                      {svc.title}
                    </h2>
                    <div className="gold-divider mb-6" />
                    <p className="text-slate-500 leading-relaxed mb-8">{svc.description}</p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {svc.items.map((item, j) => (
                        <motion.div
                          key={item}
                          custom={j}
                          variants={fadeUp}
                          initial="hidden"
                          animate="visible"
                         
                          className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-100 hover:border-[#C9A84C]/40 transition-colors shadow-sm"
                        >
                          <CheckCircle2 size={18} className="text-[#C9A84C] shrink-0" />
                          <span className="text-sm text-slate-700 font-medium">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
