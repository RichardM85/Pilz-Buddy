import { Handshake, Recycle, Skull, TreePine } from "lucide-react";

const styles = [
  {
    icon: Handshake,
    title: "Die Symbionten",
    sub: "Mykorrhiza · Die Teamplayer",
    analogy: "Beste Freunde fürs Leben",
    body: "Tauschen Zucker gegen Wasser & Mineralien mit Bäumen. Ohne sie würden 90% aller Pflanzen sterben.",
    example: "🌲 Steinpilz + Fichte = BFF",
  },
  {
    icon: Recycle,
    title: "Die Saprobionten",
    sub: "Die Recycling-Crew",
    analogy: "Müllabfuhr des Waldes",
    body: "Fressen totes Holz, Laub und Reste. Ohne sie läge der Wald metertief unter altem Geäst.",
    example: "🍂 Austernpilz auf totem Buchenstamm",
  },
  {
    icon: Skull,
    title: "Die Parasiten",
    sub: "Die Piraten",
    analogy: "Freeloader & Schmarotzer",
    body: "Nehmen, ohne zu fragen. Saugen lebende Bäume aus – bis sie umfallen. Drama im Wald.",
    example: "🏴‍☠️ Hallimasch greift lebende Bäume an",
  },
];

export function Lebensstile() {
  return (
    <section className="space-y-8">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
          <TreePine className="h-3.5 w-3.5" /> Modul 2
        </div>
        <h2 className="mt-3 text-4xl font-bold text-primary md:text-5xl">Die Drei Lebensstile</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Pilze sind soziale Wesen – manche nett, manche... weniger. Hier ist, wie sie leben.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {styles.map((s) => {
          const Icon = s.icon;
          return (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-3xl bg-[#1F3327] p-7 shadow-[var(--shadow-soft)] ring-2 ring-[#9A7B56]/40 transition hover:-translate-y-2 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#132219] ring-1 ring-[#9A7B56]/30 shadow-sm">
                <Icon className="h-7 w-7 text-[#D97D3E]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#BCA385]">{s.sub}</p>
              <h3 className="mt-1 text-2xl font-bold text-[#E9A15A]">{s.title}</h3>
              <p className="mt-1 text-sm font-semibold italic text-[#BCA385]">„{s.analogy}"</p>
              <p className="mt-4 text-sm leading-relaxed text-[#EADECC]">{s.body}</p>
              <div className="mt-5 rounded-xl border border-[#9A7B56]/40 bg-[#132219]/70 px-3 py-2 text-sm font-semibold text-[#EADECC] backdrop-blur">
                {s.example}
              </div>
            </article>
          );
        })}
      </div>

      <div className="rounded-3xl bg-primary/10 p-6 text-center">
        <p className="text-sm text-foreground/80">
          <strong className="text-primary">Fun-gi Fact:</strong> Bäume tauschen über das Myzel-Netzwerk Nachrichten und Nährstoffe aus.
          Wissenschaftler nennen es liebevoll das <em>„Wood Wide Web"</em>.
        </p>
      </div>
    </section>
  );
}
