import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Timeline } from "@/components/Timeline";
import { Ending } from "@/components/Ending";
import { Blobs, HeartParticles, useLenis } from "@/components/Atmosphere";
import { HeartBurst } from "@/components/HeartBurst";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "4 Years • Countless Memories — A Friendship Tribute" },
      {
        name: "description",
        content:
          "A cinematic tribute to four years of college friendship — 40+ memories, glowing love tree, and a journey through laughter, late-nights and forever bonds.",
      },
    ],
  }),
});

function Index() {
  useLenis();
  const [burst, setBurst] = useState(false);
  const [exploding, setExploding] = useState(false);

  const openMemories = () => {
    setExploding(true);
    setTimeout(() => setExploding(false), 1700);
    setTimeout(() => {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  const replay = () => {
    setBurst(true);
    setExploding(true);
    setTimeout(() => setExploding(false), 1700);
    setTimeout(() => setBurst(false), 1500);
  };

  return (
    <main className="relative min-h-screen text-foreground">
      <Blobs />
      <HeartParticles count={26} />
      <HeartBurst active={exploding} />

      <Hero onOpen={openMemories} />
      <Gallery burst={burst} onBurst={replay} />
      <Timeline />
      <Ending />

      <footer className="relative z-10 px-6 pt-10 pb-16 text-center text-xs tracking-[0.3em] text-muted-foreground uppercase">
        ✦ The End is Just Another Beginning ✦
      </footer>
    </main>
  );
}
