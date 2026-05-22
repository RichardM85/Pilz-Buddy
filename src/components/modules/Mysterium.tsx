import { useState } from "react";
import { Sparkles, Leaf, PawPrint, ChevronRight } from "lucide-react";
import { MyceliumIcon, CuteMushroom } from "../MushroomIcons";
import pilzFruchtkoerper from "@/assets/pilz-fruchtkoerper.png";
import pilzMyzel from "@/assets/pilz-myzel.png";

const cards = [
  {
    title: "Näher an dir als an einem Baum",
    body: "Genetisch stehen Pilze dem **Tierreich** näher als den Pflanzen. Ihre Zellwände bestehen aus **Chitin** – derselbe Stoff wie in Insektenpanzern. Photosynthese? Können sie nicht.",
  },
  {
    title: "Was du im Wald siehst, ist nur die Spitze",
    body: "Der Pilz, den du pflückst, ist nur die **Frucht** – wie ein Apfel am Baum. Der eigentliche Pilz lebt unsichtbar als feines Geflecht im Boden: das **Myzel**.",
  },
  {
    title: "Das größte Lebewesen der Welt? Ein Pilz!",
    body: "Ein Hallimasch-Myzel in Oregon erstreckt sich über **9 km²** und ist geschätzt **2.400–8.500 Jahre alt**. Älter als die Pyramiden. Spore-tacular, was?",
  },
];

const stats = [
  { value: "~6.200", label: "Großpilzarten in Deutschland" },
  { value: "10–15", label: "wirklich tödliche Arten in Europa" },
  { value: "0", label: "Pilze mit Kontaktgift" },
];

export function Mysterium() {
  const [showFruit, setShowFruit] = useState(true);

  return (
    <section className="space-y-8">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground">
          <Sparkles className="h-3.5 w-3.5" /> Modul 1
        </div>
        <h2 className="mt-3 text-4xl font-bold text-primary md:text-5xl">Das Funga-Mysterium</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Keine Panik, wir beißen nicht. Wir klären zuerst die wichtigste Frage: Was IST eigentlich ein Pilz?
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border-2 border-border bg-card p-6 text-center shadow-[var(--shadow-soft)]">
          <Leaf className="mx-auto h-10 w-10 text-moss" />
          <h3 className="mt-3 text-lg font-bold">Flora</h3>
          <p className="text-sm text-muted-foreground">Pflanzen machen ihr Essen selbst (Photosynthese).</p>
          <div className="mt-2 text-2xl">🌿</div>
        </div>
        <div className="rounded-3xl border-2 border-accent bg-gradient-to-br from-accent/20 to-card p-6 text-center shadow-[var(--shadow-glow)] ring-2 ring-accent/40">
          <CuteMushroom className="mx-auto h-16 w-16" color="chanterelle" />
          <h3 className="mt-1 text-lg font-bold text-primary">Funga</h3>
          <p className="text-sm text-foreground/80">Das geheime dritte Reich. Pilze sind ihre eigene Liga.</p>
          <div className="mt-2 text-2xl">🍄</div>
        </div>
        <div className="rounded-3xl border-2 border-border bg-card p-6 text-center shadow-[var(--shadow-soft)]">
          <PawPrint className="mx-auto h-10 w-10 text-bark" />
          <h3 className="mt-3 text-lg font-bold">Fauna</h3>
          <p className="text-sm text-muted-foreground">Tiere müssen ihr Essen suchen und verdauen.</p>
          <div className="mt-2 text-2xl">🦊</div>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-border bg-card p-6 shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold">Pilz oder Myzel? Tippe & entdecke!</h3>
            <p className="text-sm text-muted-foreground">Was du siehst, ist nur ein winziger Teil der Geschichte.</p>
          </div>
          <button
            onClick={() => setShowFruit((s) => !s)}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:scale-105 hover:bg-primary/90"
          >
            {showFruit ? "Zeig mir das Myzel" : "Zurück zur Frucht"}
          </button>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] p-4">
          {showFruit ? (
            <div className="animate-pop-in flex flex-col items-center">
              <img
                src={pilzFruchtkoerper}
                alt="Fliegenpilz-Fruchtkörper im Moos"
                className="h-auto w-full rounded-xl object-contain"
                loading="lazy"
              />
              <p className="mt-3 text-xs font-semibold text-[#EADECC]">↑ Fruchtkörper (das siehst du)</p>
            </div>
          ) : (
            <div className="animate-pop-in flex flex-col items-center">
              <img
                src={pilzMyzel}
                alt="Pilz mit Myzelgeflecht unter der Erdoberfläche"
                className="h-auto w-full rounded-xl object-contain"
                loading="lazy"
              />
              <p className="mt-3 text-xs font-semibold text-[#EADECC]">↑ Myzel (der eigentliche Pilz, kilometerweit!)</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-4 text-center">
            <div className="text-3xl font-bold text-primary">{s.value}</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <article key={i} className="group rounded-3xl bg-gradient-to-br from-card to-secondary/40 p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">{i + 1}</div>
            <h4 className="text-lg font-bold text-primary">{c.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80" dangerouslySetInnerHTML={{ __html: c.body.replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary">$1</strong>') }} />
            <ChevronRight className="mt-3 h-4 w-4 text-accent transition group-hover:translate-x-1" />
          </article>
        ))}
      </div>
    </section>
  );
}
