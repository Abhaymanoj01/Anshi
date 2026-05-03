import { motion } from "framer-motion";
import loveTree from "@/assets/love-tree.jpg";
import { Fireflies } from "./Atmosphere";

export function Hero({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* tree backdrop */}
      <motion.img
        src={loveTree}
        alt="Glowing love tree of memories"
        width={1536}
        height={1536}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      <Fireflies count={60} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mb-6 text-sm font-medium uppercase tracking-[0.4em] text-gold"
        >
          ✦ A Friendship Tribute ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-5xl leading-[1.05] font-bold text-balance md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient">4 Years</span>
          <span className="mx-3 text-foreground/60">•</span>
          <span className="text-foreground">Countless Memories</span>
          <br />
          <span className="text-foreground/90">One </span>
          <span className="text-gradient">Unbreakable</span>
          <span className="text-foreground"> Friendship</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground italic md:text-xl"
        >
          Every photo tells a story, every memory lives forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8, type: "spring" }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={onOpen}
            className="shine animate-pulse-glow group relative overflow-hidden rounded-full px-10 py-5 text-base font-semibold text-primary-foreground transition-transform hover:scale-105"
            style={{ background: "var(--gradient-heart)" }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 21s-7-4.35-9.5-8.5C.8 9.4 2.6 5 6.5 5c2.1 0 3.6 1.2 4.5 2.6C11.9 6.2 13.4 5 15.5 5 19.4 5 21.2 9.4 19.5 12.5 17 16.65 12 21 12 21z" />
              </svg>
              Open Our Memories
            </span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="absolute right-0 -bottom-32 left-0 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase">
            <span>Scroll to relive</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="h-8 w-[2px] rounded-full bg-gradient-to-b from-primary to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
