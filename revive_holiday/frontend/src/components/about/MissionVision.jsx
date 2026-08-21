import { motion } from "framer-motion";
import { LuTarget, LuEye } from "react-icons/lu";

const cards = [
  {
    icon: LuTarget,
    title: "Our Mission",
    text: "To provide exceptional travel experiences through innovative solutions, personalized services, and unwavering commitment to customer satisfaction.",
  },
  {
    icon: LuEye,
    title: "Our Vision",
    text: "To become one of the most trusted and respected travel brands globally by delivering world-class travel experiences and building lasting relationships with our clients.",
  },
];

export default function MissionVision() {
  return (
    <section className="bg-sand-50 py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        {cards.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
            className="rounded-3xl border border-navy-100 bg-white p-10 shadow-card"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-600 text-white">
              <Icon size={26} />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-navy-900">{title}</h3>
            <p className="mt-4 text-base leading-relaxed text-navy-600">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
