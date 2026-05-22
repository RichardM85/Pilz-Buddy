import { useState } from "react";
import { GraduationCap, ChevronDown, Sprout, Network, Microscope, Leaf, Bug, Recycle, FlaskConical, Dna, Compass, BookMarked } from "lucide-react";

type Term = {
  id: string;
  term: string;
  short: string;
  long: string;
  level: "Basis" | "Aufbau" | "Fortgeschritten";
  icon: typeof Sprout;
};

const terms: Term[] = [
  { id: "myzel", term: "Myzel", short: "Das eigentliche Lebewesen – ein Netzwerk feinster Fäden im Boden oder Holz.", long: "Das Myzel ist das Pilz-Internet unter unseren Füßen. Was wir als „Pilz\" sammeln, ist nur der Fruchtkörper. Der echte Organismus durchzieht oft kubikmeterweise Substrat. Ein Hallimasch-Myzel in Oregon umspannt ~9 km² – das größte bekannte Lebewesen der Erde.", level: "Basis", icon: Network },
  { id: "hyphe", term: "Hyphen", short: "Die Bausteine des Myzels: mikroskopisch dünne, verzweigte Schläuche.", long: "Hyphen sind 2–10 µm dünne Fäden mit Zellwänden aus Chitin (wie Insektenpanzer!). Sie wachsen an der Spitze, verzweigen sich und verschmelzen zu Geflechten. In 1 g Waldboden können bis zu 1 km Hyphen stecken.", level: "Basis", icon: Sprout },
  { id: "fruchtkoerper", term: "Fruchtkörper", short: "Das, was du im Wald siehst – das Sexualorgan des Pilzes.", long: "Der Fruchtkörper (Hut+Stiel, Bovist, Becher…) bildet die Sporen und entlässt sie. Er ist nur ein winziger, kurzlebiger Teil des Pilzes – wie ein Apfel am Baum.", level: "Basis", icon: Leaf },
  { id: "sporen", term: "Sporen & Sporenbild", short: "Die mikroskopischen „Samen\" – ihre Farbe verrät den Pilz.", long: "Ein einzelner Champignon entlässt bis zu 16 Mrd. Sporen. Das Sporenpulver (man legt den Hut über Nacht auf weißes/schwarzes Papier) hat artspezifische Farben: weiß, rosa, ocker, braun, schwarz. Ein essentieller Bestimmungsschritt jenseits der Hutfarbe.", level: "Aufbau", icon: Microscope },
  { id: "mykorrhiza", term: "Mykorrhiza", short: "Pilz + Pflanze in Symbiose – das wichtigste Wirtschaftssystem des Waldes.", long: "~90 % aller Landpflanzen leben mit Mykorrhiza-Pilzen. Der Pilz liefert Wasser & Mineralien (besonders Phosphor), die Pflanze gibt Zucker. Steinpilz, Pfifferling, Birkenpilz – alle Symbionten. Eine Meta-Analyse zeigt: Mykorrhiza-Pilze beschleunigen die Zersetzung im Schnitt um +6,7 %.", level: "Aufbau", icon: Network },
  { id: "saprobiont", term: "Saprobiont", short: "Der Recycler: zerlegt totes organisches Material.", long: "Ohne Saprobionten (Parasol, Judasohr, Schopftintling, Krause Glucke) würde der Wald in seinem eigenen Laub ersticken. Sie sind die einzigen Organismen, die Lignin – den Holzstoff – effizient abbauen können.", level: "Aufbau", icon: Recycle },
  { id: "parasit", term: "Parasit", short: "Lebt auf Kosten anderer – manchmal als Killer.", long: "Echte Parasiten greifen lebende Organismen an. Der Hallimasch ist berüchtigt: er kann ganze Fichtenbestände töten. Schwächeparasiten (z.B. Austernseitling) attackieren nur kranke oder alte Bäume.", level: "Aufbau", icon: Bug },
  { id: "endophyt", term: "Endophyt", short: "Heimlicher Mitbewohner – lebt unauffällig IN der Pflanze.", long: "Endophyten leben symptomfrei in Pflanzengewebe. Spannend: Ein und derselbe Pilz kann je nach Wirt und Lebensphase Endophyt, Saprobiont ODER Pathogen sein. Die starre Einteilung „gut vs. böse\" bricht hier zusammen.", level: "Fortgeschritten", icon: Leaf },
  { id: "guilds", term: "Funktionelle Guilds", short: "Pilze nach ihrem ökologischen Job gruppiert.", long: "Statt nur taxonomisch (verwandt) zu sortieren, fasst man Pilze nach Funktion zusammen: Ektomykorrhiza, arbuskuläre Mykorrhiza, Weißfäule-Saprobionten, Braunfäule-Saprobionten, biotrophe Parasiten… Tools wie FUNGuild ordnen DNA-Daten automatisch zu.", level: "Fortgeschritten", icon: Compass },
  { id: "barcoding", term: "DNA-Barcoding (ITS)", short: "Die ITS-Sequenz ist der Personalausweis jedes Pilzes.", long: "Der Internal-Transcribed-Spacer (ITS) der ribosomalen DNA ist der offizielle Barcode für Pilze. Eine PCR aus winzigen Fruchtkörper-Krümeln + Sequenzierung + BLAST gegen UNITE/GenBank – schon hast du die Art. Unverzichtbar bei cryptic species.", level: "Fortgeschritten", icon: Dna },
  { id: "cryptic", term: "Cryptic Species", short: "Pilze, die identisch aussehen, aber verschiedene Arten sind.", long: "Was als „Echter Pfifferling\" galt, sind tatsächlich mehrere genetisch klar getrennte Arten. Nur DNA-Barcoding hat das aufgedeckt. Konsequenz: Selbst der „idiotensichere\" Pilz ist taxonomisch oft eine Artengruppe.", level: "Fortgeschritten", icon: Dna },
  { id: "labor", term: "Conservation Mycology", short: "Schutz von Pilzen – das vergessene Königreich im Naturschutz.", long: "Erst seit ~2018 nimmt die IUCN Pilze ernst in die Rote Liste auf. Schätzungen: 2–3 Mio. Pilzarten existieren weltweit, formal beschrieben sind erst ~150.000. Citizen-Science-Projekte (Pilze.de, iNaturalist) sind die wichtigste Datenquelle.", level: "Fortgeschritten", icon: FlaskConical },
];

const path = [
  { n: 1, label: "Morphologie", desc: "Hut, Stiel, Lamellen, Ring, Volva – was siehst du?" },
  { n: 2, label: "Habitat", desc: "Welcher Baum? Welcher Boden? Welche Höhe?" },
  { n: 3, label: "Sporenbild", desc: "Über Nacht aufs Papier – welche Farbe?" },
  { n: 4, label: "Ökologie", desc: "Symbiont, Saprobiont oder Parasit? Passt es zum Habitat?" },
  { n: 5, label: "Doppelgänger", desc: "Wer sieht ähnlich aus – und wer davon ist gefährlich?" },
];

const levelStyle: Record<Term["level"], string> = {
  Basis: "bg-moss/15 text-moss border-moss/30",
  Aufbau: "bg-accent/20 text-bark border-accent/40",
  Fortgeschritten: "bg-primary/10 text-primary border-primary/30",
};

function TermCard({ t }: { t: Term }) {
  const [open, setOpen] = useState(false);
  const Icon = t.icon;
  return (
    <article className="overflow-hidden rounded-3xl border-2 border-border bg-card shadow-[var(--shadow-soft)] transition hover:border-accent">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-4 p-5 text-left">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-chanterelle-soft text-accent-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-primary">{t.term}</h3>
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${levelStyle[t.level]}`}>
              {t.level}
            </span>
          </div>
          <p className="mt-1 text-sm text-foreground/80">{t.short}</p>
        </div>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t-2 border-dashed border-border bg-secondary/30 px-5 py-4 animate-[fade-in_.25s_ease-out]">
          <p className="text-sm leading-relaxed text-foreground/85">{t.long}</p>
        </div>
      )}
    </article>
  );
}

export function Grundlagen() {
  const [filter, setFilter] = useState<"Alle" | Term["level"]>("Alle");
  const filtered = filter === "Alle" ? terms : terms.filter((t) => t.level === filter);

  return (
    <section className="space-y-8">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="h-3.5 w-3.5" /> Modul 0 · Grundlagen
        </div>
        <h2 className="mt-3 text-4xl font-bold text-primary md:text-5xl">Das Pilz-Vokabular</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Bevor du Pilze bestimmst, lerne die Sprache. Vom Myzel bis zum DNA-Barcoding – sauber sortiert nach Level.
        </p>
      </header>

      {/* Lernpfad */}
      <div className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10 p-6">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
          <BookMarked className="h-4 w-4" /> Der Bestimmungspfad – immer in dieser Reihenfolge
        </h3>
        <ol className="mt-5 grid gap-3 md:grid-cols-5">
          {path.map((p) => (
            <li key={p.n} className="relative rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {p.n}
              </div>
              <p className="mt-3 text-sm font-bold text-primary">{p.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs italic text-muted-foreground">
          💡 Wer mit Schritt 5 anfängt („sieht aus wie…\"), liegt am häufigsten falsch.
        </p>
      </div>

      {/* Level-Filter */}
      <div className="flex flex-wrap gap-2">
        {(["Alle", "Basis", "Aufbau", "Fortgeschritten"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setFilter(l)}
            className={`rounded-full border-2 px-4 py-1.5 text-xs font-semibold transition ${
              filter === l
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-accent"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Begriffe */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((t) => <TermCard key={t.id} t={t} />)}
      </div>
    </section>
  );
}
