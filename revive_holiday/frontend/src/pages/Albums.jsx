import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LuArrowUpRight, LuImages } from "react-icons/lu";
import PageBanner from "../components/shared/PageBanner";
import SectionHeading from "../components/shared/SectionHeading";
import CallToAction from "../components/shared/CallToAction";
import { getAlbums } from "../lib/api";

export default function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAlbums().then(setAlbums).catch(() => {});
  }, []);

  return (
    <>
      <PageBanner
        eyebrow="Our Journeys"
        title="Travel Albums"
        description="Browse photo albums from the trips we've planned — real moments from real travelers."
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80&auto=format&fit=crop"
      />

      <section className="bg-sand-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Gallery"
            title="Every Trip Tells a Story"
            description="Pick an album to see the full set of photos from that journey."
          />

          {albums.length === 0 ? (
            <p className="mt-14 text-center text-navy-400">No albums to show yet.</p>
          ) : (
            <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album, i) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: "easeOut" }}
                >
                  <Link
                    to={`/albums/${album.id}`}
                    className="group relative block h-72 overflow-hidden rounded-2xl shadow-card"
                  >
                    {album.cover_image_url ? (
                      <img
                        src={album.cover_image_url}
                        alt={album.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-navy-100">
                        <LuImages className="text-navy-300" size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                    <div className="relative flex h-full flex-col justify-end p-6">
                      <span className="mb-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        {album.photo_count} photo{album.photo_count !== 1 ? "s" : ""}
                      </span>
                      <h3 className="font-display text-xl font-bold text-white">{album.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-navy-100 line-clamp-2">
                        {album.short_note}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View Album <LuArrowUpRight size={15} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CallToAction
        title="Ready to Start Your Own Story?"
        description="Tell us where you want to go and our travel consultants will handle the rest."
      />
    </>
  );
}
