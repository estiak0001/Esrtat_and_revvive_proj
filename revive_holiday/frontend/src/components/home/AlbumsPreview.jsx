import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LuArrowUpRight, LuImages, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import SectionHeading from "../shared/SectionHeading";
import { getAlbums } from "../../lib/api";

const CARD_WIDTH = 240;
const CARD_STEP = 130; // horizontal distance between consecutive card centers (overlap = CARD_WIDTH - CARD_STEP)

export default function AlbumsPreview() {
  const [albums, setAlbums] = useState([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    getAlbums().then(setAlbums).catch(() => {});
  }, []);

  const go = useCallback((idx) => {
    setCurrent((idx + albums.length) % albums.length);
  }, [albums.length]);

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  useEffect(() => {
    if (paused || albums.length < 2) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, paused, albums.length]);

  if (albums.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-navy-950 py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our Journeys"
          title="Travel Albums"
          description="A look back at the trips we've planned and the memories our travelers brought home."
          light
        />
      </div>

      {/* Fanned card row */}
      <div
        className="relative mt-14 h-[420px] w-full sm:h-[460px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="absolute left-1/2 top-[40px] sm:top-[50px]"
          animate={{ x: -current * CARD_STEP - CARD_WIDTH / 2 }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
        >
          {albums.map((album, i) => {
            const diff = i - current;
            const isActive = diff === 0;
            const rotate = Math.max(-14, Math.min(14, diff * -6));
            const translateY = isActive ? -22 : Math.min(Math.abs(diff), 3) * 10;
            const scale = isActive ? 1.06 : Math.max(0.86, 1 - Math.abs(diff) * 0.05);
            const zIndex = isActive ? 50 : 40 - Math.abs(diff);

            return (
              <motion.div
                key={album.id}
                className="absolute top-0 origin-bottom"
                style={{ left: i * CARD_STEP, width: CARD_WIDTH, zIndex }}
                animate={{ rotate, y: translateY, scale, opacity: Math.abs(diff) > 4 ? 0 : 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
              >
                <Link
                  to={`/albums/${album.id}`}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      go(i);
                    }
                  }}
                  className={`group relative block h-[340px] w-full overflow-hidden rounded-2xl border-4 shadow-2xl transition-colors duration-300 sm:h-[380px] ${
                    isActive ? "border-amber-400" : "border-white/10"
                  }`}
                >
                  {album.cover_image_url ? (
                    <img
                      src={album.cover_image_url}
                      alt={album.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-navy-800">
                      <LuImages className="text-navy-400" size={32} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />

                  <div className="relative flex h-full flex-col justify-end p-4 sm:p-5">
                    <span className="mb-1.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                      {album.photo_count} photo{album.photo_count !== 1 ? "s" : ""}
                    </span>
                    <h3 className="font-display text-base font-bold text-white sm:text-lg line-clamp-1">
                      {album.title}
                    </h3>
                    {isActive && (
                      <>
                        <p className="mt-1.5 text-xs leading-relaxed text-navy-100 line-clamp-2 sm:text-sm">
                          {album.short_note}
                        </p>
                        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 font-display text-xs font-semibold text-navy-950 shadow-lg transition-transform duration-300 group-hover:translate-x-1 sm:text-sm">
                          View Album <LuArrowUpRight size={14} />
                        </span>
                      </>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {albums.length > 1 && (
        <div className="relative mx-auto mt-8 flex max-w-7xl items-center justify-center gap-4 px-6">
          <button
            onClick={prev}
            aria-label="Previous album"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950 border border-white/15 text-white transition-all hover:bg-amber-400 hover:text-navy-950"
          >
            <LuChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next album"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950 border border-white/15 text-white transition-all hover:bg-amber-400 hover:text-navy-950"
          >
            <LuChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
