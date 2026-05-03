import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type Photo = { src: string; caption: string };

export function Lightbox({
  index,
  photos,
  onClose,
  onChange,
}: {
  index: number | null;
  photos: Photo[];
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onChange, onClose, photos.length]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl"
          style={{ background: "oklch(0.05 0.04 290 / 0.85)" }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + photos.length) % photos.length);
            }}
            className="glass absolute left-6 z-10 grid h-12 w-12 place-items-center rounded-full text-foreground transition hover:scale-110"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % photos.length);
            }}
            className="glass absolute right-6 z-10 grid h-12 w-12 place-items-center rounded-full text-foreground transition hover:scale-110"
            aria-label="Next"
          >
            ›
          </button>
          <button
            onClick={onClose}
            className="glass absolute top-6 right-6 z-10 grid h-10 w-10 place-items-center rounded-full"
            aria-label="Close"
          >
            ✕
          </button>

          <motion.div
            key={index}
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] max-w-5xl"
          >
            <img
              src={photos[index].src}
              alt={photos[index].caption}
              className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-[0_0_80px_oklch(0.75_0.22_350/0.4)]"
            />
            <div className="mt-5 text-center">
              <p className="font-display text-2xl text-foreground">{photos[index].caption}</p>
              <p className="mt-1 text-xs tracking-[0.3em] text-gold uppercase">
                Memory {String(index + 1).padStart(2, "0")} / {photos.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
