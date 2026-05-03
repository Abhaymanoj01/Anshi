import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PHOTOS } from "@/data/photos";
import { Lightbox } from "./Lightbox";

function PhotoCard({ index, src, caption, onClick }: { index: number; src: string; caption: string; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = (index % 5 - 2) * 1.5;
  const heights = ["h-72", "h-96", "h-80", "h-[28rem]", "h-72", "h-96"];
  const h = heights[index % heights.length];
  return (
    <motion.div
      ref={ref}
      style={{ y, rotate }}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mb-6 break-inside-avoid"
    >
      <button
        onClick={onClick}
        className="shadow-card relative block w-full overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:rotate-0 hover:shadow-[0_0_50px_oklch(0.75_0.22_350/0.5)]"
      >
        <img
          src={src}
          alt={caption}
          loading="lazy"
          className={`w-full ${h} object-cover transition-transform duration-700 group-hover:scale-110`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute right-0 bottom-0 left-0 translate-y-4 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-display text-lg text-foreground">{caption}</p>
          <p className="mt-1 text-xs tracking-widest text-gold uppercase">Memory #{String(index + 1).padStart(2, "0")}</p>
        </div>
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 40px oklch(0.75 0.22 350 / 0.4)" }}
        />
      </button>
    </motion.div>
  );
}

export function Gallery({ burst, onBurst }: { burst: boolean; onBurst: () => void }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm tracking-[0.4em] text-gold uppercase">The Memory Vault</p>
          <h2 className="text-5xl font-bold md:text-7xl">
            <span className="text-gradient">Forty-Two</span> Forever Frames
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Scroll slowly. Each photograph is a chapter of laughter, late-nights, and everything in between.
          </p>
          <button
            onClick={onBurst}
            className="shine glass mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary/40 px-6 py-3 text-sm font-medium transition-all hover:scale-105 hover:border-primary"
          >
            <span className="text-primary">✦</span> Replay Our Journey
          </button>
        </motion.div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
          {PHOTOS.map((p, i) => (
            <motion.div
              key={i}
              animate={
                burst
                  ? {
                      x: [Math.random() * 800 - 400, 0],
                      y: [Math.random() * 600 - 300, 0],
                      rotate: [Math.random() * 60 - 30, 0],
                      scale: [0.3, 1],
                      opacity: [0, 1],
                    }
                  : {}
              }
              transition={{ duration: 1.2, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <PhotoCard index={i} {...p} onClick={() => setActive(i)} />
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        index={active}
        photos={PHOTOS}
        onClose={() => setActive(null)}
        onChange={(i) => setActive(i)}
      />
    </section>
  );
}
