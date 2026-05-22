import { useState } from "react";
import { CheckCircle2, Circle, BookOpen, ShoppingBasket, Eye, Scissors, MapPin, Camera } from "lucide-react";

const rules = [
  { icon: Eye, title: "Sammle nur, was du 100% kennst", body: "Im Zweifel: stehen lassen. Ein Pilz ist kein Quiz – ein Fehler kann tödlich sein. Lieber doppelt sicher als einmal mutig." },
  { icon: ShoppingBasket, title: "Korb statt Plastiktüte", body: "Pilze brauchen Luft! In der Tüte werden sie matschig und die Sporen können nicht herausrieseln (das hilft dem Wald)." },
  { icon: Scissors, title: "Drehen oder schneiden? Beides okay", body: "Wichtig ist nur: das Myzel im Boden nicht zerstören. Loch danach mit Erde oder Laub abdecken." },
  { icon: MapPin, title: "Maßvoll sammeln", body: "Maximal 1–2 kg pro Person für den Eigenbedarf. Naturschutzgebiete: tabu. Junge winzige Pilze: stehen lassen." },
  { icon: Camera, title: "Erst foto-grafieren, dann ernten", body: "Hut von oben UND von unten fotografieren. Bei Unsicherheit kann ein Experte (oder eine Pilz-App) helfen." },
  { icon: BookOpen, title: "Geh mit einem Profi raus", body: "Pilzwanderungen mit ausgebildeten Pilzberatern sind Gold wert. Spore-tacular und sicher!" },
];

export function Guide() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const progress = (checked.size / rules.length) * 100;

  return (
    <section className="space-y-8">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="h-3.5 w-3.5" /> Modul 4
        </div>
        <h2 className="mt-3 text-4xl font-bold text-primary md:text-5xl">Der Idiotensichere Einstiegs-Guide</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Die goldenen Regeln für deine erste Pilztour. Hak sie ab – wie eine Checkliste vor dem Abenteuer.
        </p>
      </header>

      <div className="rounded-full bg-secondary p-1">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-moss to-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="-mt-4 text-center text-sm text-muted-foreground">
        {checked.size}/{rules.length} Regeln verinnerlicht {checked.size === rules.length && "🎉 Du bist bereit!"}
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        {rules.map((r, i) => {
          const Icon = r.icon;
          const isChecked = checked.has(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`group flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition ${
                isChecked
                  ? "border-moss bg-moss/10"
                  : "border-border bg-card hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-soft)]"
              }`}
            >
              <div className="shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="h-7 w-7 text-moss" />
                ) : (
                  <Circle className="h-7 w-7 text-muted-foreground/40 transition group-hover:text-accent" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-accent" />
                  <h3 className={`font-bold ${isChecked ? "text-moss line-through decoration-2" : "text-primary"}`}>{r.title}</h3>
                </div>
                <p className="mt-1.5 text-sm text-foreground/75">{r.body}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-accent/40 bg-accent/10 p-5">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🤚</div>
          <div>
            <h3 className="font-bold text-primary">Mythos-Buster: Anfassen ist erlaubt!</h3>
            <p className="mt-1 text-sm text-foreground/80">
              In Europa gibt es <strong>keinen einzigen Pilz mit Kontaktgift</strong>. Selbst der Knollenblätterpilz darf in die Hand. Die Toxine wirken erst beim Verschlucken. Trotzdem: <strong>Hände waschen vor dem Snack.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
