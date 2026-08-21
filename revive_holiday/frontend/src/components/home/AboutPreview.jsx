import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import Button from "../shared/Button";
import { images } from "../../data/site";
import { getSettings } from "../../lib/api";

export default function AboutPreview() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <img
              src={settings.about_mission_image || images.aboutMission}
              alt="A wooden boat gliding across a calm mountain lake"
              className="h-[420px] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 -right-6 hidden max-w-[240px] rounded-2xl bg-navy-900 p-6 shadow-soft sm:block">
            <p className="font-display text-lg font-semibold text-white">
              &ldquo;We don&rsquo;t just book trips—we create unforgettable memories.&rdquo;
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-teal-600">
            About Revive Holidays
          </span>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">
            Creating Memories Across the Globe
          </h2>
          <p className="mt-6 text-base leading-relaxed text-navy-600">
            Revive Holidays is a leading travel management company committed to providing
            world-class travel solutions for individuals, families, corporate travelers, and
            groups. Our experienced travel consultants work closely with every client to design
            customized itineraries that suit their preferences, budget, and expectations.
          </p>
          <p className="mt-4 text-base leading-relaxed text-navy-600">
            From the moment you plan your trip until you return home, our team remains
            dedicated to ensuring a smooth and enjoyable travel experience.
          </p>
          <div className="mt-8">
            <Button to="/about" variant="ghost">
              Learn More About Us <LuArrowRight size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
