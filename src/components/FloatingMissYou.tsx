import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function FloatingMissYou() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="shine glass px-4 py-3 rounded-full shadow-card flex items-center gap-2 hover:scale-105 transition-transform bg-white/50 backdrop-blur-md border border-rose/30"
          style={{ boxShadow: "0 10px 30px -10px oklch(0.75 0.22 350 / 0.4)" }}
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-primary text-lg"
          >
            ❤️
          </motion.span>
          <span className="text-sm font-medium text-foreground">Click when you miss me</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-72 p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-rose/20 shadow-2xl"
            style={{ boxShadow: "0 20px 60px -15px oklch(0.75 0.22 350 / 0.4)" }}
          >
            <div className="relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-xs transition-colors"
              >
                ✕
              </button>
              <h3 className="font-display text-lg text-primary font-bold mb-2 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  ✨
                </motion.span>
                Hey there...
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Whenever you're feeling down or missing the good old days, just remember: I'm always thinking of you too. You're never alone!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
