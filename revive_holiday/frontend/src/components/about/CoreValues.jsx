import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../shared/SectionHeading";
import { getCoreValues } from "../../lib/api";
import { getIcon } from "../../lib/icons";

export default function CoreValues() {
  const [coreValues, setCoreValues] = useState([]);

  useEffect(() => {
    getCoreValues().then(setCoreValues).catch(() => {});
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="What Drives Us" title="Our Core Values" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {coreValues.map(({ icon, title, description }, i) => {
            const Icon = getIcon(icon);
            return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-navy-100 p-6 text-center transition-colors hover:border-amber-300 hover:bg-sand-50"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-amber-400">
                <Icon size={24} />
              </span>
              <h3 className="font-display text-base font-semibold text-navy-900">{title}</h3>
              <p className="text-sm leading-relaxed text-navy-600">{description}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
