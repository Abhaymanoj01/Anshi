import { useEffect, useMemo } from "react";

export function HeartParticles({ count = 24 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        dur: 10 + Math.random() * 14,
        size: 10 + Math.random() * 22,
        hue: [350, 320, 290, 240, 50][i % 5],
        opacity: 0.4 + Math.random() * 0.5,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((p, i) => (
        <svg
          key={i}
          className="animate-float absolute"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.dur}s`,
            filter: `drop-shadow(0 0 8px oklch(0.75 0.22 ${p.hue}))`,
            opacity: p.opacity,
          }}
          viewBox="0 0 24 24"
          fill={`oklch(0.75 0.22 ${p.hue})`}
        >
          <path d="M12 21s-7-4.35-9.5-8.5C.8 9.4 2.6 5 6.5 5c2.1 0 3.6 1.2 4.5 2.6C11.9 6.2 13.4 5 15.5 5 19.4 5 21.2 9.4 19.5 12.5 17 16.65 12 21 12 21z" />
        </svg>
      ))}
    </div>
  );
}

export function Fireflies({ count = 40 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 4,
        size: 2 + Math.random() * 4,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {items.map((p, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: "oklch(0.95 0.15 85)",
            boxShadow: "0 0 12px oklch(0.9 0.18 85), 0 0 24px oklch(0.85 0.2 60)",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Blobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="animate-drift absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.25 320), transparent 70%)" }}
      />
      <div
        className="animate-drift absolute top-1/3 -right-32 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.6 0.22 270), transparent 70%)", animationDelay: "-4s" }}
      />
      <div
        className="animate-drift absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.18 240), transparent 70%)", animationDelay: "-8s" }}
      />
    </div>
  );
}

export function useLenis() {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true }) as never;
      const tick = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    })();
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
}
