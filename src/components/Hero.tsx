import { motion } from "framer-motion";
import { Fireflies } from "./Atmosphere";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.img
        src="/photos/her.png"
        alt="Hero Background"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover object-top pointer-events-none"
      />
      <div className="absolute inset-0 bg-background/40 pointer-events-none" />

      <Fireflies count={60} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-5xl leading-[1.05] font-bold text-balance md:text-7xl lg:text-8xl text-foreground font-display"
        >
          3 Years<br />
          A Thousand Memories<br />
          One Soul That Became My Home🏡
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mx-auto mt-8 max-w-xl text-lg text-stone-900 font-medium italic md:text-xl leading-relaxed font-body drop-shadow-sm"
        >
          “Thank you for staying through every version of me.”
        </motion.p>

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
