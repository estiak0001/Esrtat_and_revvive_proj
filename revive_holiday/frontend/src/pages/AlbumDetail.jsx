import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowLeft, LuX, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { getAlbum } from "../lib/api";

export default function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    setAlbum(null);
    setNotFound(false);
    getAlbum(id)
      .then(setAlbum)
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="text-2xl font-bold text-navy-900">Album Not Found</h1>
        <p className="mt-3 text-navy-600">
          This album may have been removed or is no longer available.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-teal-700"
        >
          <LuArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  if (!album) {
    return <div className="py-32 text-center text-navy-400">Loading…</div>;
  }

  const photos = album.photos;

  const showPrev = () => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
  const showNext = () => setLightboxIndex((i) => (i + 1) % photos.length);

  return (
    <>
      <section className="relative flex min-h-[42vh] items-end overflow-hidden bg-navy-900 pt-28 pb-12">
        {album.cover_image_url && (
          <>
            <img
              src={album.cover_image_url}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/70 to-navy-900/40" />
          </>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6"
        >
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-navy-100 hover:text-white"
          >
            <LuArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{album.title}</h1>
          <p className="mt-3 max-w-2xl text-navy-100">{album.short_note}</p>
        </motion.div>
      </section>

      <section className="bg-sand-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          {photos.length === 0 ? (
            <p className="text-center text-navy-400">No photos in this album yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {photos.map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: (i % 8) * 0.05, ease: "easeOut" }}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-square overflow-hidden rounded-xl shadow-card"
                >
                  <img
                    src={p.image_url}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <LuX size={20} />
            </button>
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
              >
                <LuChevronLeft size={20} />
              </button>
            )}
            <motion.img
              key={photos[lightboxIndex].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={photos[lightboxIndex].image_url}
              alt=""
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
              >
                <LuChevronRight size={20} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
