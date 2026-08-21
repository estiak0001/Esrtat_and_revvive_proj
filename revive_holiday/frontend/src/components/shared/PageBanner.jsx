import { motion } from "framer-motion";

export default function PageBanner({ eyebrow, title, description, image }) {
  return (
    <section className="relative flex h-[46vh] min-h-[340px] items-center overflow-hidden bg-navy-900">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/70 to-navy-900/40" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {eyebrow && (
            <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">{title}</h1>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-navy-100">{description}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
