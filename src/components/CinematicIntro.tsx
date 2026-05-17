import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { HeartParticles, Fireflies } from "./Atmosphere";

export function CinematicIntro({ onReady, messages }: { onReady: () => void, messages: string[] }) {
  const [phase, setPhase] = useState<"black" | "message" | "button">("black");

  useEffect(() => {
    // Calculate total duration based on all lines
    const totalChars = messages.join("").length;
    const typingDuration = totalChars * 70; // approximate duration

    const timer1 = setTimeout(() => setPhase("message"), 1500);
    const timer2 = setTimeout(() => setPhase("button"), 1500 + typingDuration + 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [messages]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, backgroundColor: phase === "black" ? "#000000" : "var(--background)" }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {phase !== "black" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <HeartParticles count={15} />
            <Fireflies count={30} />
          </motion.div>
        )}

        <div className="relative z-10 px-6 text-center max-w-3xl">
          {phase !== "black" && (
            <motion.div
              className="font-display text-2xl md:text-4xl text-foreground text-glow flex flex-col gap-6"
              style={{ filter: "drop-shadow(0 0 20px oklch(0.75 0.22 350 / 0.5))" }}
            >
              {messages.map((line, lineIndex) => (
                <div key={lineIndex}>
                  {line.split("").map((char, charIndex) => {
                    // Calculate delay based on previous lines
                    const prevLinesLength = messages.slice(0, lineIndex).join("").length;
                    return (
                      <motion.span
                        key={`${lineIndex}-${charIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: (prevLinesLength + charIndex) * 0.07 }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                  {lineIndex === messages.length - 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
                    />
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {phase === "button" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-12"
            >
              <button
                onClick={onReady}
                className="shine glass px-8 py-4 rounded-full text-lg font-medium text-primary hover:scale-105 transition-transform"
                style={{
                  boxShadow: "0 0 40px oklch(0.75 0.22 350 / 0.3)",
                  border: "1px solid oklch(0.75 0.22 350 / 0.5)"
                }}
              >
                I'm ready ❤️
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
