import { motion } from "framer-motion";
import { LuCheck } from "react-icons/lu";
import Button from "./Button";

export default function FeatureListSection({
  eyebrow,
  title,
  intro,
  listTitle,
  items,
  image,
  imageAlt,
  ctaLabel = "Get in Touch",
  ctaTo = "/contact",
  reverse = false,
}) {
  return (
    <section className="bg-white py-24">
      <div
        className={`mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-teal-600">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">{title}</h2>
          <p className="mt-6 text-base leading-relaxed text-navy-600">{intro}</p>

          {listTitle && (
            <h3 className="mt-8 font-display text-sm font-semibold uppercase tracking-wide text-navy-900">
              {listTitle}
            </h3>
          )}
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl bg-sand-50 px-4 py-3 text-sm font-medium text-navy-800"
              >
                <LuCheck className="mt-0.5 shrink-0 text-teal-600" size={18} strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Button to={ctaTo} variant="primary">
              {ctaLabel}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-3xl shadow-soft"
        >
          <img src={image} alt={imageAlt} className="h-[480px] w-full object-cover" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}
