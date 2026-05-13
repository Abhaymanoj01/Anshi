import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PHOTOS } from "@/data/photos";

export function Gallery({ burst, onBurst, showPhotos = true }: { burst: boolean; onBurst: () => void; showPhotos?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledPhotos, setShuffledPhotos] = useState(PHOTOS);

  useEffect(() => {
    setShuffledPhotos([...PHOTOS].sort(() => Math.random() - 0.5));
  }, []);

  // Auto-play the slideshow
  useEffect(() => {
    if (!showPhotos || shuffledPhotos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= shuffledPhotos.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 3500); // Change photo every 3.5 seconds

    return () => clearInterval(interval);
  }, [showPhotos, shuffledPhotos.length]);

  // Scroll to typing message when the last photo is reached
  useEffect(() => {
    if (showPhotos && shuffledPhotos.length > 0 && currentIndex === shuffledPhotos.length - 1) {
      const timer = setTimeout(() => {
        document.getElementById("typing-message")?.scrollIntoView({ behavior: "smooth" });
      }, 2500); // Wait 2.5 seconds before scrolling to let them look at the final photo
      return () => clearTimeout(timer);
    }
  }, [currentIndex, showPhotos, shuffledPhotos.length]);

  if (!showPhotos) {
    // Render an empty section with the ID so scroll-into-view still works
    return <section id="gallery" className="min-h-screen" />;
  }

  const currentPhoto = shuffledPhotos[currentIndex] || PHOTOS[0];

  return (
    <section id="gallery" className="relative px-6 py-24 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="mx-auto max-w-5xl w-full flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-sm tracking-[0.4em] text-gold uppercase">The Memory Vault</p>
          <h2 className="text-4xl font-bold md:text-5xl">
            <span className="text-gradient"> The Moments </span> I’ll Carry Forever
          </h2>
          <p className="mt-3 text-muted-foreground">Reliving our journey, one beautiful moment at a time.</p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-video flex items-center justify-center mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Polaroid-style frame */}
              <div className="relative w-[90%] sm:w-[80%] max-w-3xl aspect-[4/3] bg-white rounded-xl shadow-card border border-black/5 p-4 pb-16 sm:p-6 sm:pb-20 rotate-[-1deg] transition-transform hover:rotate-0 duration-500">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.caption}
                  className="w-full h-full object-cover rounded-lg bg-black/5"
                />
                <div className="absolute bottom-5 sm:bottom-6 left-0 right-0 text-center px-6">
                  <p className="font-display text-xl sm:text-2xl text-foreground font-medium">
                    {currentPhoto.caption}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">
                    Memory {currentIndex + 1} of {PHOTOS.length}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex items-center gap-6"
        >
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-6 py-2 rounded-full border border-border/50 bg-white/50 backdrop-blur-md hover:bg-black/5 hover:border-black/10 transition-all text-foreground text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => Math.min(shuffledPhotos.length - 1, prev + 1))}
            disabled={currentIndex === shuffledPhotos.length - 1}
            className="px-6 py-2 rounded-full border border-border/50 bg-white/50 backdrop-blur-md hover:bg-black/5 hover:border-black/10 transition-all text-foreground text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </motion.div>

      </div>
    </section>
  );
}
