import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data';
import logoSvg from '../assets/logo.jpeg';
import { useCompanyLogo } from '../hooks/useCompanyLogo';
import { useCompanySettings } from '../hooks/useCompanySettings';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const logo = useCompanyLogo(logoSvg);
  const company = useCompanySettings();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[9999] bg-[#0D1B2A] shadow-[0_2px_24px_rgba(0,0,0,0.5)] border-b border-white/8"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, willChange: 'transform', transform: 'translate3d(0,0,0)', WebkitTransform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative flex-shrink-0 p-1.5">
                <div className="absolute inset-0 rounded-xl border border-[#C9A84C]/30 group-hover:border-[#C9A84C]/60 transition-all duration-300" />
                <div
                  className="absolute inset-0 rounded-xl opacity-20"
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 6px)' }}
                />
                <div
                  className="relative w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden flex items-center justify-center"
                  style={{ background: '#0D1B2A', isolation: 'isolate' }}
                >
                  <img src={logo} alt={company.name} className="w-full h-full object-cover" style={{ filter: 'invert(1)', mixBlendMode: 'screen' }} />
                </div>
              </div>
              <div className="flex flex-col leading-none gap-[3px]">
                <span className="font-display font-bold text-white text-[15px] md:text-[18px] tracking-widest leading-none">ESRAT</span>
                <div className="flex items-center gap-1">
                  <span className="h-px w-3 bg-[#C9A84C]/70" />
                  <span className="text-[#C9A84C] text-[7px] md:text-[8px] tracking-[0.25em] font-semibold uppercase">Associates</span>
                  <span className="h-px w-3 bg-[#C9A84C]/70" />
                </div>
                {company.tagline && (
                  <span className="mt-1 text-white/50 text-[8px] md:text-[9px] font-medium tracking-wide">
                    {company.tagline}
                  </span>
                )}
              </div>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-[#C9A84C] ${
                      location.pathname === link.href ? 'text-[#C9A84C]' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <a
              href={`tel:${company.phone}`}
              className="hidden md:inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] text-[#0D1B2A] text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
            >
              <Phone size={14} />
              Call Us
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="md:hidden relative w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white transition-colors hover:bg-white/15"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[10001] w-[80vw] max-w-[320px] bg-[#0D1B2A] border-l border-white/10 flex flex-col md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
                <div className="flex flex-col leading-none gap-[3px]">
                  <span className="font-display font-bold text-white text-[17px] tracking-widest">ESRAT</span>
                  <div className="flex items-center gap-1">
                    <span className="h-px w-3 bg-[#C9A84C]/70" />
                    <span className="text-[#C9A84C] text-[7px] tracking-[0.25em] font-semibold uppercase">Associates</span>
                    <span className="h-px w-3 bg-[#C9A84C]/70" />
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i, duration: 0.28 }}
                    >
                      <Link
                        to={link.href}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                          location.pathname === link.href
                            ? 'bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/25'
                            : 'text-white/80 hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                      >
                        {link.label}
                        <ChevronRight size={15} className="opacity-40" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="my-6 border-t border-white/8" />

                <div className="space-y-3">
                  <a
                    href={`tel:${company.phone}`}
                    className="flex items-center gap-3 bg-[#C9A84C] hover:bg-[#b8963e] text-[#0D1B2A] font-bold px-4 py-3.5 rounded-xl text-sm transition-colors"
                  >
                    <Phone size={15} />
                    {company.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/75 px-4 py-3.5 rounded-xl text-sm transition-colors"
                  >
                    <Mail size={15} className="text-[#C9A84C]" />
                    {company.email}
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}