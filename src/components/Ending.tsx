import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { PHOTOS } from "@/data/photos";
import { HeartParticles, Fireflies } from "./Atmosphere";

function Typewriter({ text, delay = 0, onComplete }: { text: string, delay?: number, onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const onCompleteRef = useRef(onComplete);

  // Keep ref up to date to avoid effect dependency on the callback
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    // Reset text
    setDisplayedText("");

    timeout = setTimeout(() => {
      let i = 0;
      const chars = Array.from(text || "");

      interval = setInterval(() => {
        if (i < chars.length) {
          const char = chars[i]; // capture character by value to avoid lazy evaluation of i in updater
          setDisplayedText(prev => prev + char);
          i++;
        } else {
          clearInterval(interval);
          if (onCompleteRef.current) onCompleteRef.current();
        }
      }, 35);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{displayedText}</span>;
}

const LETTER_PARAGRAPHS = [
  "Dear Anshiiiii,",
  "I just wanted to remind you how much you mean to me. These three years gave me countless memories, but the best part of all of them was having you by my side. From random laughs to the hardest days, you were always there, and honestly, I can’t imagine these years without you.",
  "As this beautiful chapter of our college life comes to an end, I just want to wish you happiness, success, and beautiful moments in everything that lies ahead for you. No matter where life takes us, please remember that I’ll always be there for you whenever you need me — just one call away.",
  "Thank you for being one of the most special parts of my life, Anshiiii❤️..i love youu always..!!",
  "Eppazhum Parayane Pole..Enthenkilum pattiyaa oodi ing poruu..."
];

export function Ending() {
  const collage = PHOTOS.slice(0, 12);
  const [showLetter, setShowLetter] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Reset state when opening the letter
  useEffect(() => {
    if (showLetter) {
      setCurrentParagraph(0);
      setShowButton(false);
    }
  }, [showLetter]);

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
          Through Thick And Thin, We Built Memories I’ll Carry Forever.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16"
        >
          <button
            onClick={() => setShowLetter(true)}
            className="text-sm tracking-widest text-primary/70 hover:text-primary transition-colors uppercase underline underline-offset-8"
          >
            One last thing...
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-6"
          >
            <HeartParticles count={10} />
            <Fireflies count={20} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 w-full max-w-lg rounded-2xl bg-white/90 p-6 md:p-8 shadow-2xl border border-white/20"
              style={{
                boxShadow: "0 0 60px oklch(0.75 0.22 350 / 0.3)",
              }}
            >
              <div className="font-display text-base md:text-lg text-foreground leading-relaxed italic max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {LETTER_PARAGRAPHS.map((text, i) => {
                  if (i > currentParagraph) return null;
                  return (
                    <p key={i} className="mb-4 last:mb-0">
                      {i === currentParagraph ? (
                        <>
                          <Typewriter
                            text={text}
                            onComplete={() => {
                              if (i < LETTER_PARAGRAPHS.length - 1) {
                                setTimeout(() => setCurrentParagraph(i + 1), 600);
                              } else {
                                setTimeout(() => setShowButton(true), 800);
                              }
                            }}
                          />
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
                          />
                        </>
                      ) : (
                        text
                      )}
                    </p>
                  );
                })}
              </div>

              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 text-center pt-4 border-t border-black/5"
                >
                  <button
                    onClick={() => setShowLetter(false)}
                    className="px-6 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium text-sm"
                  >
                    Close Letter
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
