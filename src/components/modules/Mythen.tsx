import { useState } from "react";
import { ShieldAlert, ChevronDown, X, Check, Beaker, Skull, Dna, Crown, Network, Recycle, FlaskConical } from "lucide-react";

type Myth = {
  id: string;
  icon: typeof Skull;
  myth: string;
  fact: string;
  detail: string;
  numbers?: { value: string; label: string }[];
  source: string;
};

const myths: Myth[] = [
  {
    id: "kontakt",
    icon: Skull,
    myth: "„Manche Pilze sind so giftig, dass du stirbst, wenn du sie nur anfasst.\"",
    fact: "Falsch. In ganz Europa gibt es keinen einzigen Pilz mit Kontaktgift.",
    detail:
      "Selbst der Grüne Knollenblätterpilz oder der tödliche Gifthäubling sind für deine Haut völlig harmlos. Die Amatoxine sind große Moleküle, die nicht durch die Haut wandern. Du darfst jeden Pilz schadlos in die Hand nehmen, drehen, von unten anschauen. Gefährlich wird's erst beim Verschlucken – Hände aber trotzdem waschen, bevor die Pizza kommt!",
    numbers: [{ value: "0", label: "Kontaktgifte in Europa" }, { value: "< 1 cm²", label: "verschluckt = meist harmlos" }],
    source: "Deutsche Gesellschaft für Mykologie (DGfM)",
  },
  {
    id: "tot",
    icon: Beaker,
    myth: "„Im Wald lauern hunderte Killer-Pilze überall.\"",
    fact: "In Europa sind nur 10–15 von ~6.000 Großpilzarten wirklich tödlich.",
    detail:
      "Ca. 200 Arten verursachen Magen-Darm-Probleme, aber wirklich lebensgefährlich ist nur eine Handvoll. Der absolute Spitzenreiter: der Grüne Knollenblätterpilz (Amanita phalloides) – er ist allein für rund 90% aller tödlichen Pilzvergiftungen in Europa verantwortlich. Lerne diesen einen Pilz richtig, und du hast die größte Gefahr schon abgehakt.",
    numbers: [
      { value: "~6.200", label: "Großpilzarten in DE" },
      { value: "10–15", label: "tödlich giftig" },
      { value: "~90 %", label: "Tode durch Knollenblätter" },
    ],
    source: "DGfM · Europäische Mykologie-Verbände",
  },
  {
    id: "fliege",
    icon: Crown,
    myth: "„Ein Biss vom Fliegenpilz – und du bist tot.\"",
    fact: "Nein. Der Fliegenpilz ist Popstar, aber selten Killer.",
    detail:
      "Er enthält kein Psilocybin, sondern Ibotensäure (frisch) und Muscimol (getrocknet). Wirkung: ein extremer, unberechenbarer Rauschzustand mit Wahrnehmungsstörungen und tiefem Koma-Schlaf. Todesfälle durch reinen Fliegenpilzkonsum sind historisch extrem selten – meist sind es Unfälle im Rauschzustand. Der echte Killer in der Familie ist der unscheinbare Pantherpilz! Trotzdem: nicht essen. Wirklich nicht.",
    source: "Toxikologische Zentren · Roth/Frank/Kormann: Giftpilze",
  },
  {
    id: "tier",
    icon: Dna,
    myth: "„Pilze sind so was Ähnliches wie Pflanzen.\"",
    fact: "Genetisch sind Pilze näher dran an dir als an einem Baum.",
    detail:
      "Pilze haben Chitin in den Zellwänden – genau wie Insektenpanzer. Sie können keine Photosynthese, müssen ihr Essen von außen aufnehmen, atmen Sauerstoff. Sie haben ein eigenes Königreich: die Funga. Und das größte bekannte Lebewesen der Erde ist ein Hallimasch-Myzel in Oregon: über 9 km² groß, geschätzt 2.400–8.500 Jahre alt. Ohne Pilze (Saprobionten) würde der Wald in seinem eigenen Laub ersticken.",
    numbers: [
      { value: "9 km²", label: "größter Pilz d. Welt" },
      { value: "~8.500 J.", label: "geschätztes Alter" },
    ],
    source: "Whittaker (1969) · Aktuelle Phylogenetik",
  },
  {
    id: "vielfalt",
    icon: FlaskConical,
    myth: "„Die Pilze der Welt sind doch längst alle bekannt.\"",
    fact: "Im Gegenteil: Wir kennen schätzungsweise nur 5–10 % aller Pilzarten.",
    detail:
      "Aktuelle Schätzungen gehen von 2–3 Millionen Pilzarten weltweit aus – beschrieben sind aber erst rund 150.000. In jedem Quadratmeter Waldboden stecken Hunderte Arten, viele davon noch namenlos. Pilze sind das am schlechtesten erforschte Königreich des Lebens. Citizen-Science-Plattformen wie iNaturalist und Pilze.de tragen heute mehr zur Kartierung bei als die meisten Universitäten.",
    numbers: [
      { value: "~2–3 Mio.", label: "geschätzte Arten weltweit" },
      { value: "~150.000", label: "formal beschrieben" },
    ],
    source: "Hawksworth & Lücking (2017) · IUCN Fungal Specialist Group",
  },
  {
    id: "mykorrhiza",
    icon: Network,
    myth: "„Pilze und Bäume haben nicht viel miteinander zu tun.\"",
    fact: "~90 % aller Landpflanzen leben in Mykorrhiza-Symbiose mit Pilzen.",
    detail:
      "Steinpilz, Pfifferling, Birkenpilz – sie alle tauschen mit „ihrem\" Baum Wasser und Phosphor gegen Zucker. Eine große Meta-Analyse zeigt: Mykorrhiza-Pilze beschleunigen die Zersetzung im Schnitt um +6,7 %. Im Boden existiert ein „Wood Wide Web\", in dem Bäume über Pilzfäden Nährstoffe und Warnsignale austauschen. Ohne Mykorrhiza gäbe es keinen Wald, wie wir ihn kennen.",
    numbers: [
      { value: "~90 %", label: "der Pflanzen mit Mykorrhiza" },
      { value: "+6,7 %", label: "schnellere Zersetzung" },
    ],
    source: "van der Heijden et al. · Cheeke et al. (2017) Meta-Analyse",
  },
  {
    id: "rollen",
    icon: Recycle,
    myth: "„Ein Pilz ist entweder gut, böse oder neutral – Punkt.\"",
    fact: "Falsch. Derselbe Pilz kann je nach Wirt und Phase die Rolle wechseln.",
    detail:
      "Moderne Mykologie kennt keine starren „guten\" und „bösen\" Pilze mehr. Ein Pilz kann als Endophyt symptomfrei in einer Pflanze leben, beim selben Wirt unter Stress zum Pathogen werden – und nach dessen Tod als Saprobiont das Holz zersetzen. Der Hallimasch ist der Schulbuch-Fall: tödlicher Parasit am lebenden Baum, dann jahrzehntelang Recycler am Totholz. Ökologische Rollen sind kontextabhängig.",
    source: "Selosse et al. · funktionelle Guilds (FUNGuild)",
  },
  {
    id: "barcoding",
    icon: Dna,
    myth: "„Wenn zwei Pilze gleich aussehen, sind sie auch dieselbe Art.\"",
    fact: "Nein – „Cryptic Species\" sind morphologisch identisch, aber genetisch klar getrennt.",
    detail:
      "DNA-Barcoding (besonders die ITS-Region) hat die Mykologie revolutioniert. Was als „der Echte Pfifferling\" galt, ist tatsächlich ein Komplex mehrerer Arten. Aus einem Krümel Fruchtkörper extrahiert man DNA, sequenziert die ITS-Region und vergleicht sie mit UNITE/GenBank. Konsequenz für die Praxis: Selbst der vermeintlich „idiotensichere\" Pilz kann taxonomisch eine ganze Artengruppe sein. Bestimmen heißt heute oft: mikroskopieren UND sequenzieren.",
    numbers: [
      { value: "ITS", label: "offizieller Pilz-Barcode" },
      { value: ">1 Mio.", label: "ITS-Sequenzen in UNITE" },
    ],
    source: "Schoch et al. (2012) PNAS · UNITE-Datenbank",
  },
];


function MythCard({ m }: { m: Myth }) {
  const [open, setOpen] = useState(false);
  const Icon = m.icon;
  return (
    <article className="overflow-hidden rounded-3xl border-2 border-border bg-card shadow-[var(--shadow-soft)] transition hover:border-accent">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-4 p-5 text-left"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-destructive">
            <X className="h-3 w-3" /> Mythos
          </div>
          <p className="mt-1 text-base font-semibold italic text-foreground/80">{m.myth}</p>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-moss">
            <Check className="h-3 w-3" /> Fakt
          </div>
          <p className="mt-1 text-lg font-bold leading-snug text-primary">{m.fact}</p>
        </div>
        <ChevronDown className={`mt-2 h-5 w-5 shrink-0 text-accent transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="space-y-4 border-t border-border bg-secondary/30 px-5 py-5 animate-fade-in">
          <p className="text-sm leading-relaxed text-foreground/85">{m.detail}</p>

          {m.numbers && (
            <div className="grid gap-2 sm:grid-cols-3">
              {m.numbers.map((n) => (
                <div key={n.label} className="rounded-xl bg-card p-3 text-center">
                  <div className="text-xl font-bold text-accent">{n.value}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{n.label}</div>
                </div>
              ))}
            </div>
          )}

          <p className="text-[11px] italic text-muted-foreground">Quelle: {m.source}</p>
        </div>
      )}
    </article>
  );
}

export function Mythen() {
  return (
    <section className="space-y-6">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
          <ShieldAlert className="h-3.5 w-3.5" /> Realitäts-Check
        </div>
        <h2 className="mt-3 text-4xl font-bold text-primary md:text-5xl">Mythos vs. Wissenschaft</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Vier Pilz-Mythen, die deine Oma dir erzählt hat – und was die Mykologie heute wirklich weiß. Tipp drauf für die ganze Story.
        </p>
      </header>

      <div className="grid gap-4">
        {myths.map((m) => <MythCard key={m.id} m={m} />)}
      </div>

      <div className="rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-accent/15 to-chanterelle-soft/15 p-5 text-center">
        <p className="text-sm font-semibold text-foreground/85">
          🍄 <strong>Bottom Line:</strong> Der Wald ist sicherer als sein Ruf. Aber lerne den Knollenblätterpilz – das ist deine wichtigste Hausaufgabe.
        </p>
      </div>
    </section>
  );
}
