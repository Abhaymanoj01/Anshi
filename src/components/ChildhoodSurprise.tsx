import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ChildhoodSurprise() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative py-24 flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-8"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient">
          A Little Something Extra...
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto italic">
          Before we reach the end, I found something that reminds me of where your beautiful journey started.
        </p>
        
        <button
          onClick={() => setIsOpen(true)}
          className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500 overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 text-lg font-medium tracking-widest uppercase">
            Unlock the Memory ✨
          </span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 bg-white rounded-lg shadow-2xl transform hover:rotate-2 transition-transform duration-500">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-stone-100">
                  <img
                    src="/photos/child.png"
                    alt="Childhood Memory"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist yet
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&auto=format&fit=crop";
                    }}
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-3xl font-display text-stone-800 italic">
                    "kutti judee"
                  </h3>
                  <p className="mt-2 text-stone-400 text-sm tracking-widest uppercase">
                    ✨ Pure Innocence ✨
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors text-lg font-light tracking-widest"
              >
                CLOSE [X]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
