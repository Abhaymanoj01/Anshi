import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Timeline } from "@/components/Timeline";
import { Ending } from "@/components/Ending";
import { HeartParticles, useLenis } from "@/components/Atmosphere";
import { HeartBurst } from "@/components/HeartBurst";
import { QuizEntry } from "@/components/QuizEntry";
import { CinematicIntro } from "@/components/CinematicIntro";
import { TypingMessage } from "@/components/TypingMessage";

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
  const [hasPassedQuiz, setHasPassedQuiz] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showCinematicIntro, setShowCinematicIntro] = useState(false);
  const [burst, setBurst] = useState(false);
  const [exploding, setExploding] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const openMemories = () => {
    // Start playing music immediately on user click to bypass browser restrictions
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
    
    setExploding(true);
    setTimeout(() => {
      setExploding(false);
      setShowCinematicIntro(true);
    }, 1700);
  };

  const onIntroReady = () => {
    setShowCinematicIntro(false);
    setShowPhotos(true);
    setTimeout(() => {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };


  const replay = () => {
    setShowPhotos(true);
    setBurst(true);
    setExploding(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => setExploding(false), 1700);
    setTimeout(() => setBurst(false), 1500);
  };

  if (!hasPassedQuiz) {
    return (
      <main className="relative min-h-screen text-foreground">
        <HeartParticles count={15} />
        <QuizEntry onPass={() => setHasPassedQuiz(true)} />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen text-foreground">
      {showCinematicIntro && <CinematicIntro onReady={onIntroReady} />}
      
      <audio ref={audioRef} src="/song.mpeg" loop />
      <HeartParticles count={26} />
      <HeartBurst active={exploding} />

      <Hero />
      <Timeline onOpen={openMemories} />
      <Gallery burst={burst} onBurst={replay} showPhotos={showPhotos} />
      <TypingMessage />
      <Ending />

      <footer className="relative z-10 px-6 pt-10 pb-16 text-center text-xs tracking-[0.3em] text-muted-foreground uppercase">
        ✦ The End is Just Another Beginning ✦
      </footer>
    </main>
  );
}
