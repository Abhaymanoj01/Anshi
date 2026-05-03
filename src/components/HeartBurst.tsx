import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

export function HeartBurst({ active }: { active: boolean }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 30 }, () => ({
        x: (Math.random() - 0.5) * window.innerWidth,
        y: (Math.random() - 0.5) * window.innerHeight,
        rot: Math.random() * 360,
        scale: 0.5 + Math.random() * 1.5,
        hue: [350, 320, 290, 240, 50][Math.floor(Math.random() * 5)],
      })),
    [active],
  );

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center"
        >
          {hearts.map((h, i) => (
            <motion.svg
              key={i}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
              animate={{ x: h.x, y: h.y, scale: h.scale, opacity: 0, rotate: h.rot }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              viewBox="0 0 24 24"
              className="absolute h-10 w-10"
              fill={`oklch(0.78 0.22 ${h.hue})`}
              style={{ filter: `drop-shadow(0 0 20px oklch(0.75 0.22 ${h.hue}))` }}
            >
              <path d="M12 21s-7-4.35-9.5-8.5C.8 9.4 2.6 5 6.5 5c2.1 0 3.6 1.2 4.5 2.6C11.9 6.2 13.4 5 15.5 5 19.4 5 21.2 9.4 19.5 12.5 17 16.65 12 21 12 21z" />
            </motion.svg>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
