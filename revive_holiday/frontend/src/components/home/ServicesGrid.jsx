import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import { getServices } from "../../lib/api";
import { getIcon } from "../../lib/icons";

export default function ServicesGrid() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then(setServices).catch(() => {});
  }, []);

  return (
    <section className="bg-sand-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything Your Journey Needs"
          description="From the first flight search to the ride home from the airport, we handle every detail of your trip."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon, title, description }, i) => {
            const Icon = getIcon(icon);
            return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-soft"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-teal-50 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-navy-900 text-amber-400 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-navy-950">
                <Icon size={26} />
              </span>
              <h3 className="relative mt-5 font-display text-lg font-semibold text-navy-900">
                {title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-navy-600">{description}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
