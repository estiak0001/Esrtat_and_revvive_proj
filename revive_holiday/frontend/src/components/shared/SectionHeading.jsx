import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col gap-3 ${alignment} max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
    >
      {eyebrow && (
        <span
          className={`font-display text-xs font-semibold uppercase tracking-[0.25em] ${
            light ? "text-amber-300" : "text-teal-600"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl font-bold sm:text-4xl ${light ? "text-white" : "text-navy-900"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed ${light ? "text-navy-100" : "text-navy-600"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
