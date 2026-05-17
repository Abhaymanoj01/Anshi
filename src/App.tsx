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
import { ChildhoodSurprise } from "@/components/ChildhoodSurprise";

export default function App() {
  useLenis();
  const [hasPassedQuiz, setHasPassedQuiz] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [showingIntro, setShowingIntro] = useState<"initial" | "memories" | null>(null);
  const [showPhotos, setShowPhotos] = useState(false);
  const [burst, setBurst] = useState(false);
  const [exploding, setExploding] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const openMemories = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }

    setExploding(true);
    setTimeout(() => {
      setExploding(false);
      setShowingIntro("memories");
    }, 1700);
  };

  const onIntroReady = () => {
    if (showingIntro === "initial") {
      setIntroFinished(true);
    } else if (showingIntro === "memories") {
      setShowPhotos(true);
      setTimeout(() => {
        document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    setShowingIntro(null);
  };

  const replay = () => {
    setShowPhotos(true);
    setBurst(true);
    setExploding(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => { });
    }
    setTimeout(() => setExploding(false), 1700);
    setTimeout(() => setBurst(false), 1500);
  };

  // Start initial intro after quiz
  if (hasPassedQuiz && !introFinished && showingIntro === null) {
    setShowingIntro("initial");
  }

  if (!hasPassedQuiz) {
    return (
      <main className="relative min-h-screen text-foreground">
        <HeartParticles count={15} />
        <QuizEntry onPass={() => setHasPassedQuiz(true)} />
      </main>
    );
  }

  if (showingIntro === "initial") {
    return (
      <main className="relative min-h-screen text-foreground bg-black">
        <CinematicIntro
          onReady={onIntroReady}
          messages={[
            "I didn't know one conversation could change my entire college life.",
            "But somehow… you did."
          ]}
        />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen text-foreground">
      {showingIntro === "memories" && (
        <CinematicIntro
          onReady={onIntroReady}
          messages={[
            "hey judee...",
            "this is something special...",

          ]}
        />
      )}

      <audio ref={audioRef} src="/song.mpeg" loop />
      <HeartParticles count={26} />
      <HeartBurst active={exploding} />

      <Hero />
      <Timeline onOpen={openMemories} />
      <Gallery burst={burst} onBurst={replay} showPhotos={showPhotos} />
      <ChildhoodSurprise />
      <TypingMessage />
      <Ending />

      <footer className="relative z-10 px-6 pt-10 pb-16 text-center text-xs tracking-[0.3em] text-muted-foreground uppercase">
        ✦ The End is Just Another Beginning ✦
      </footer>
    </main>
  );
}
