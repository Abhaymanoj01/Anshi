import { motion } from "framer-motion";

const events = [
  { title: "Where it all began", text: "DATA STRUCTURE - LINKED LIST", photo: { src: "/photos/Timeline/tc1.jpeg" }, photoCaption: "Unexpected yellow Matching" },
  { title: "KISA 2.0", text: "Standing together on stage, speaking scripted dialogues,but somewhere between those scripted conversations, we were becoming each other’s safe place.", photo: { src: "/photos/Timeline/tc7.png" } },
  { title: "The Realization", text: "What started as friendship quietly turned into a bond neither of us could imagine losing.", photo: { src: "/photos/Timeline/tc6.jpeg" } },
  { title: "The Late-Night Comfort", text: "Some nights weren’t about talking… just knowing someone was there.", photo: { src: "/photos/Timeline/tc3.jpeg" } },
  { title: "The ultimate chambal", text: "Story idaann Paranj Pachyakk Chaambilledi", photo: { src: "/photos/Timeline/tc2.jpeg" } },
  { title: "Wheelchair Ride", text: "The Unexpected Hospital Sceneario", photo: { src: "/photos/Timeline/tc8.jpeg" } },
  { title: "My Favorite Picture", text: "Every time I look at this picture, I remember how lucky I was to have someone like you beside me during these beautiful years.", photo: { src: "/photos/Timeline/tc4.jpeg" } },
  { title: "My Favorite Memory", text: "KALAASH Campfire was really special , The hug felt so safe and special", photo: { src: "/photos/Timeline/tc5.jpeg" } },
  { title: "And Through It All… There Was You", text: "3 years later, after all the chaos, memories, laughter and hard days ,you’re still one of the most important parts of my life ", photo: { src: "/photos/Timeline/tc9.jpeg" } },

];

export function Timeline({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="timeline" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="mb-3 text-sm tracking-[0.4em] text-gold uppercase">Happiest Memories</p>
          <h2 className="text-5xl font-bold md:text-6xl text-foreground font-display">
            A Journey Through <span className="text-gradient">Time</span>
          </h2>
        </motion.div>

        <div className="relative flex flex-col gap-24">
          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16"
            >
              <div className="w-full md:w-1/2">
                <div className="glass shadow-card rounded-2xl p-8">
                  <h3 className="font-display text-3xl text-foreground font-bold">{e.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{e.text}</p>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className={`relative w-[80%] ${i === 0 ? 'max-w-md' : 'max-w-sm'} aspect-[4/3] bg-white rounded-xl shadow-card border border-black/5 p-4 pb-16 transition-transform hover:rotate-0 duration-500 ${i % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}>
                  <img
                    src={e.photo.src}
                    alt={e.title}
                    className="w-full h-full object-cover rounded-lg bg-black/5"
                  />
                  <div className="absolute bottom-5 left-0 right-0 text-center px-4">
                    <p className="font-display text-xl text-foreground font-medium">
                      {e.photoCaption || e.title}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className="mt-32 flex justify-center"
        >
          <button
            onClick={onOpen}
            className="shine animate-pulse-glow group relative overflow-hidden rounded-full px-10 py-5 text-base font-semibold text-primary-foreground transition-transform hover:scale-105"
            style={{ background: "var(--gradient-heart)" }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 21s-7-4.35-9.5-8.5C.8 9.4 2.6 5 6.5 5c2.1 0 3.6 1.2 4.5 2.6C11.9 6.2 13.4 5 15.5 5 19.4 5 21.2 9.4 19.5 12.5 17 16.65 12 21 12 21z" />
              </svg>
              Open Our Little World
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
