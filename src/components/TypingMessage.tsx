import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const MESSAGES = [
  "From our very first awkward conversation...",
  "To the countless memories we've built together...",
  "Every moment has been nothing short of magical."
];

export function TypingMessage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isInView) return;

    if (currentLine < MESSAGES.length) {
      let i = 0;
      const text = MESSAGES[currentLine];
      setDisplayedText(""); // Reset text for the new line

      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          // Wait 1.5 seconds before starting the next line
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1);
          }, 1500);
        }
      }, 60);

      return () => clearInterval(typingInterval);
    }
  }, [isInView, currentLine]);

  return (
    <section id="typing-message" className="relative overflow-hidden px-6 py-40">
      <div ref={ref} className="mx-auto max-w-4xl text-center flex flex-col items-center justify-center min-h-[150px]">
        {MESSAGES.map((msg, index) => {
          // If the line has finished typing, show it completely
          if (index < currentLine) {
            return (
              <p
                key={index}
                className="font-display text-2xl md:text-4xl text-foreground/80 leading-relaxed mb-6"
              >
                {msg}
              </p>
            );
          }
          
          // If it's the current line being typed
          if (index === currentLine) {
            return (
              <p key={index} className="font-display text-2xl md:text-4xl text-foreground leading-relaxed mb-6">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-[2px] h-[0.9em] bg-primary ml-1 align-middle"
                />
              </p>
            );
          }

          // Future lines are hidden
          return null;
        })}
      </div>
    </section>
  );
}
