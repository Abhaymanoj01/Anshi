import { motion } from "framer-motion";

const events = [
  { year: "Year 1", title: "First Day of College", text: "Strangers walking into a hall, no idea we'd become each other's home." },
  { year: "Year 1", title: "Hostel Mischief", text: "Midnight Maggi, secret handshakes, and that one corridor that knew everything." },
  { year: "Year 2", title: "The Road Trip", text: "Window down, songs loud, the world outside felt like ours." },
  { year: "Year 2", title: "Festival Lights", text: "Diwali on the rooftop, Holi in the courtyard — every color tasted like joy." },
  { year: "Year 3", title: "Late-Night Talks", text: "Three a.m. confessions, dreams whispered, fears surrendered." },
  { year: "Year 3", title: "Funny Disasters", text: "The presentation that crashed. The chai that spilled. The laughter that healed." },
  { year: "Year 4", title: "Last Lectures", text: "We sat in the back row knowing we'd miss this very moment." },
  { year: "Year 4", title: "Farewell", text: "Caps in the air, eyes full of rain — but the friendship, infinite." },
];

export function Timeline() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="mb-3 text-sm tracking-[0.4em] text-gold uppercase">Our Timeline</p>
          <h2 className="text-5xl font-bold md:text-6xl">
            Four Years, <span className="text-gradient">One Story</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className="absolute top-0 bottom-0 left-4 w-px md:left-1/2"
            style={{ background: "linear-gradient(180deg, transparent, oklch(0.75 0.22 350 / 0.6), oklch(0.65 0.25 305 / 0.6), transparent)" }}
          />

          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative mb-12 flex items-center md:mb-20 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <motion.div
                whileInView={{ boxShadow: ["0 0 0 oklch(0.75 0.22 350 / 0)", "0 0 30px oklch(0.75 0.22 350 / 0.8)"] }}
                viewport={{ once: false, amount: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute left-4 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full md:left-1/2"
                style={{ background: "var(--gradient-heart)" }}
              />
              <div className={`ml-12 w-full md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="glass shadow-card rounded-2xl p-6">
                  <p className="text-xs tracking-[0.3em] text-gold uppercase">{e.year}</p>
                  <h3 className="font-display mt-2 text-2xl text-foreground">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
