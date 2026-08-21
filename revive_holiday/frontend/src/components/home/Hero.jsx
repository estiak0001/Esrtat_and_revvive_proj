import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuArrowRight, LuShieldCheck, LuHeadset, LuGlobe } from "react-icons/lu";
import Button from "../shared/Button";
import { images } from "../../data/site";
import { getSettings } from "../../lib/api";

const badges = [
  { icon: LuGlobe, label: "Worldwide Network" },
  { icon: LuHeadset, label: "24/7 Assistance" },
  { icon: LuShieldCheck, label: "Trusted & Transparent" },
];

export default function Hero() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  const headline = settings.hero_headline || "Explore the World with Confidence";
  const headlineWords = headline.trim().split(" ");
  const headlineLast = headlineWords.pop();
  const headlineRest = headlineWords.join(" ");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-navy-950">
      <img
        src={settings.hero_home_image || images.heroHome}
        alt="Airplane window view over a sunset horizon"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />

      {/* decorative glow */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 backdrop-blur">
            {settings.tagline || "Your Journey, Our Passion"}
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {headlineRest && `${headlineRest} `}
            <span className="text-amber-400">{headlineLast}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
            {settings.hero_subtext ||
              "Whether you’re dreaming of a tropical escape, a luxury vacation, a family holiday, a business trip, or a spiritual pilgrimage, we turn your travel aspirations into unforgettable experiences."}
          </p>

          <p className="mt-4 font-display text-base font-semibold italic text-white/80">
            {settings.strength || "Skill Is Our Strength."}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="/destinations" variant="primary">
              Plan Your Journey <LuArrowRight size={18} />
            </Button>
            <Button to="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-16 flex flex-wrap gap-4"
        >
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md"
            >
              <Icon className="text-amber-400" size={20} />
              <span className="font-display text-sm font-medium text-white">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
