import { motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function DestinationCard({ name, description, image, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
      className="group relative h-[420px] overflow-hidden rounded-3xl shadow-card"
    >
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-7">
        <h3 className="font-display text-2xl font-bold text-white">{name}</h3>
        <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-navy-100 opacity-0 transition-all duration-500 ease-out group-hover:max-h-24 group-hover:opacity-100">
          {description}
        </p>
        <Link
          to={`/contact?destination=${encodeURIComponent(name)}`}
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 font-display text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-amber-400 hover:text-navy-950"
        >
          Enquire Now <LuArrowUpRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
