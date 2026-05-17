import { motion } from "framer-motion";
import { Fireflies } from "./Atmosphere";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.img
        src="/photos/hero.jpeg"
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
          className="text-5xl leading-[1.05] font-bold text-balance md:text-7xl lg:text-8xl font-display text-transparent bg-clip-text bg-gradient-to-r from-[#5d101d] to-[#2b050a]"
          style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.1))" }}
        >
          Hey Jude....
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mx-auto mt-8 max-w-xl text-lg text-stone-900 font-medium italic md:text-xl leading-relaxed font-body drop-shadow-sm"
        >
          “1.5 years & forever to go..Thank you for staying.”
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
