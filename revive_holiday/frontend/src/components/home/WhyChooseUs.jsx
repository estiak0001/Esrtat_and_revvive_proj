import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuCheck } from "react-icons/lu";
import SectionHeading from "../shared/SectionHeading";
import { getWhyChoose } from "../../lib/api";

export default function WhyChooseUs() {
  const [whyChooseUs, setWhyChooseUs] = useState([]);

  useEffect(() => {
    getWhyChoose().then((data) => setWhyChooseUs(data.map((d) => d.text))).catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-navy-900 py-24">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Excellence in Every Journey"
          light
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: (i % 5) * 0.06, ease: "easeOut" }}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm transition-colors hover:border-amber-400/40 hover:bg-white/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400/90 text-navy-950">
                <LuCheck size={18} strokeWidth={3} />
              </span>
              <span className="font-display text-base font-medium text-white">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
