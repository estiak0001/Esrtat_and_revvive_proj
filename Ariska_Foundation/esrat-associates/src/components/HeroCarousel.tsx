import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { useCompanySettings } from '../hooks/useCompanySettings';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type ApiSlide = {
  id: number; order: number; badge: string; heading: string;
  highlight: string; sub: string; description: string;
  cta_label: string; cta_href: string; image_url?: string; active: boolean;
};

type Slide = {
  id: number; image: string; badge: string; heading: string; highlight: string; sub: string;
  description: string; cta: { label: string; href: string };
};

function mapApiSlide(s: ApiSlide): Slide {
  return {
    id: s.id,
    image: s.image_url || '',
    badge: s.badge, heading: s.heading, highlight: s.highlight, sub: s.sub,
    description: s.description, cta: { label: s.cta_label, href: s.cta_href },
  };
}

/* Stack position for a card, by its distance behind the front card.
   Cards nearly fill the whole image half, so offsets stay small. */
function cardStyle(offset: number) {
  switch (offset) {
    case 0: return { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 30, opacity: 1 };
    case 1: return { x: 16, y: 12, rotate: -3, scale: 0.97, zIndex: 20, opacity: 1 };
    case 2: return { x: 30, y: 22, rotate: 3, scale: 0.94, zIndex: 10, opacity: 0.95 };
    default: return { x: 40, y: 30, rotate: 5, scale: 0.9, zIndex: 0, opacity: 0 };
  }
}

export default function HeroCarousel() {
  const company = useCompanySettings();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/slides`)
      .then(r => r.json())
      .then((data: ApiSlide[]) => {
        if (Array.isArray(data)) setSlides(data.map(mapApiSlide));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const go = useCallback((idx: number) => {
    setCurrent((idx + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next, paused, slides.length]);

  const slide = slides[current];

  if (!loaded || !slide) {
    return (
      <section className="relative bg-[#0D1B2A] flex-1 min-h-[50vh]">
        <div id="hero-sentinel" aria-hidden="true" />
      </section>
    );
  }

  return (
    <section
      className="relative bg-[#0D1B2A] overflow-hidden flex flex-col md:flex-row flex-1 min-h-[50vh] pt-20 md:pt-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* â”€â”€ Text content (second on mobile, left half on desktop) â”€â”€ */}
      <div className="relative order-2 md:order-1 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-8 sm:py-10 pt-6 md:pt-24 text-center md:text-left">
        {/* Subtle dot-grid background, matches the rest of the site */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, #C9A84C 1px, transparent 0)', backgroundSize: '50px 50px' }}
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: 'easeOut' as const }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#C9A84C]/15 border border-[#C9A84C]/40 rounded-full px-4 py-1.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse flex-shrink-0" />
                <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">
                  {slide.badge}
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-display font-bold text-white leading-tight text-3xl sm:text-4xl lg:text-5xl">
                {slide.heading}{' '}
                <span className="text-[#C9A84C]">{slide.highlight}</span>
                {slide.sub && <span className="block text-white/90 mt-1">{slide.sub}</span>}
              </h1>

              {/* Divider */}
              <div className="mx-auto md:mx-0 my-4 h-0.5 w-14 bg-[#C9A84C]/60 rounded-full" />

              {/* Description */}
              <p className="text-white/70 text-base leading-relaxed mx-auto md:mx-0 max-w-lg">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="mt-7 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3">
                <Link to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] text-[#0D1B2A] font-bold px-7 py-3 rounded-full text-sm transition-colors duration-200 shadow-lg shadow-[#C9A84C]/20">
                  Get Free Consultation
                </Link>
                <Link to={slide.cta.href}
                  className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-[#C9A84C] text-white hover:text-[#C9A84C] font-medium px-7 py-3 rounded-full text-sm transition-all duration-200">
                  {slide.cta.label}
                </Link>
              </div>

              {/* Phone */}
              <a href={`tel:${company.phone}`}
                className="mt-5 inline-flex items-center gap-2 text-white/50 hover:text-[#C9A84C] text-sm transition-colors">
                <Phone size={13} />
                {company.phoneDisplay}
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Arrows + dots */}
          <div className="flex items-center gap-4 mt-9 justify-center md:justify-start">
            <button onClick={prev} aria-label="Previous slide"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/15 hover:bg-[#C9A84C] hover:border-[#C9A84C] text-white flex items-center justify-center transition-all duration-200">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button key={s.id} onClick={() => go(i)} aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-7 h-2 bg-[#C9A84C]' : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                  }`} />
              ))}
            </div>
            <button onClick={next} aria-label="Next slide"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/15 hover:bg-[#C9A84C] hover:border-[#C9A84C] text-white flex items-center justify-center transition-all duration-200">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* â”€â”€ Shuffling image (first + full-width on mobile, right half on desktop) â”€â”€ */}
      <div className="relative order-1 md:order-2 flex-1 overflow-hidden min-h-[240px] sm:min-h-[300px] md:min-h-0">
        {slides.map((s, i) => {
          const offset = (i - current + slides.length) % slides.length;
          const style = cardStyle(offset);
          return (
            <motion.div
              key={s.id}
              animate={{ x: style.x, y: style.y, rotate: style.rotate, scale: style.scale, opacity: style.opacity }}
              transition={{ type: 'spring', stiffness: 130, damping: 20 }}
              className="absolute inset-0 sm:inset-6 md:inset-8 lg:inset-10 overflow-hidden rounded-none sm:rounded-3xl border-0 sm:border-4 border-white/90 shadow-2xl bg-[#13263b]"
              style={{
                zIndex: style.zIndex,
                backgroundImage: s.image ? `url(${s.image})` : undefined,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              aria-hidden={offset !== 0}
            />
          );
        })}
      </div>
      <div id="hero-sentinel" aria-hidden="true" />
    </section>
  );
}
