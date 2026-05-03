import { motion } from "framer-motion";
import { PHOTOS } from "@/data/photos";

export function Ending() {
  const collage = PHOTOS.slice(0, 12);
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="mx-auto max-w-5xl text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-display mx-auto max-w-3xl text-3xl leading-snug text-balance italic md:text-5xl"
        >
          "Some friendships become a part of the <span className="text-gradient">soul</span>."
        </motion.blockquote>

        <div className="relative mx-auto mt-20 grid h-[400px] max-w-3xl grid-cols-6 gap-3">
          {collage.map((p, i) => (
            <motion.img
              key={i}
              src={p.src}
              alt={p.caption}
              loading="lazy"
              initial={{ opacity: 0, scale: 0.5, y: 100, rotate: (Math.random() - 0.5) * 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: (i % 5 - 2) * 3 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="shadow-card h-full w-full rounded-lg border border-white/10 object-cover"
            />
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="mt-24 text-6xl font-bold tracking-tight md:text-8xl"
          style={{ filter: "drop-shadow(0 0 40px oklch(0.75 0.22 350 / 0.6))" }}
        >
          <span className="text-gradient">Forever Friends</span>
          <span className="ml-3">❤️</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.5 }}
          className="mt-8 text-sm tracking-[0.4em] text-muted-foreground uppercase"
        >
          Made with love, for the ones who made college home.
        </motion.p>
      </div>
    </section>
  );
}
