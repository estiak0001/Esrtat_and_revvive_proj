import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import Button from "./Button";

export default function CallToAction({
  title = "Ready to Start Your Journey?",
  description = "Tell us where you want to go and our travel consultants will handle the rest.",
  primaryLabel = "Plan Your Journey",
  primaryTo = "/contact",
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-navy-800 py-20">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center"
      >
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="max-w-xl text-base leading-relaxed text-teal-50">{description}</p>
        <Button to={primaryTo} variant="primary" className="mt-2">
          {primaryLabel} <LuArrowRight size={18} />
        </Button>
      </motion.div>
    </section>
  );
}
