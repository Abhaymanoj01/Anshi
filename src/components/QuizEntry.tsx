import { useState } from "react";
import { motion } from "framer-motion";

export function QuizEntry({ onPass }: { onPass: () => void }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  // The secret answer (case-insensitive)
  const correctAnswer = "chunditha shirin p";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === correctAnswer) {
      setError(false);
      onPass();
    } else {
      setError(true);
      setAnswer("");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 z-50 overflow-hidden bg-background/50">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/20 blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] mix-blend-screen pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass max-w-md w-full p-10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 backdrop-blur-xl text-center space-y-8 relative z-10"
      >
        <div className="space-y-3">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-16 h-16 mx-auto bg-gradient-to-tr from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg mb-6"
          >
            <span className="text-2xl">✨</span>
          </motion.div>
          <h1 className="text-4xl font-display text-gradient font-bold tracking-tight">Only For You</h1>
          <p className="text-muted-foreground/80 text-sm tracking-wide">
            Before we walk down memory lane, prove it's really you.
          </p>
        </div>

        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-inner">
          <p className="text-xl font-medium text-foreground mb-8 leading-relaxed font-display">
            What is your name on my phone?
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <input
                type="text"
                value={answer}
                onChange={(e) => { setAnswer(e.target.value); setError(false); }}
                placeholder="Type your answer..."
                className="w-full bg-black/5 border border-white/20 rounded-2xl px-6 py-4 text-center text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all backdrop-blur-sm text-lg font-medium"
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-3 absolute -bottom-6 w-full text-center font-medium"
                >
                  Nope! That's not it. Try again! 🥺
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 group relative overflow-hidden rounded-2xl px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 text-lg font-medium">
                Let's Gooo
              </span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
