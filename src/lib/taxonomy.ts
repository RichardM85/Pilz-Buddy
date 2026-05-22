// Zentrale Taxonomie: Die 10 großen Pilzgruppen nach Fruchtschicht.
// Wird von Formen.tsx, Lexikon.tsx und Bestimmung.tsx geteilt.

export type TaxonomyId =
  | "Röhrlinge"
  | "Lamellenpilze"
  | "Leistenpilze"
  | "Schlauchpilze"
  | "Bauchpilze"
  | "Stachelpilze"
  | "Porlinge & Schichtpilze"
  | "Gallertpilze"
  | "Korallen & Keulen"
  | "Hörnlinge";

export type SafetyTone = "safe" | "warn" | "info" | "danger";

export type TaxonomyGroup = {
  id: TaxonomyId;
  subtitle: string;
  fruchtschicht: string;
  description: string;
  safetyFact: string;
  safetyTone: SafetyTone;
  indicators: string[];
  image: string;
};

export const TAXONOMY: TaxonomyGroup[] = [
  {
    id: "Röhrlinge",
    subtitle: "RÖHRENPILZE · BOLETALES",
    fruchtschicht: "Schwammartiges Röhrensystem unter dem Hut.",
    description: "Unter dem Hut befindet sich ein schwammartiges Röhrensystem. Keine tödlichen Arten in Mitteleuropa!",
    safetyFact:
      "In Mitteleuropa gibt es KEINE tödlich giftigen Arten unter den Röhrlingen – die ideale Einstiegsgruppe für Anfänger:innen.",
    safetyTone: "safe",
    indicators: ["Steinpilz", "Maronenröhrling", "Birkenpilz", "Flockenstieliger Hexenröhrling", "Gallenröhrling (bitter)"],
    image: "/01_roehrlinge.png",
  },
  {
    id: "Lamellenpilze",
    subtitle: "BLÄTTERPILZE · AGARICALES",
    fruchtschicht: "Strahlenförmige, blattartige Lamellen unter dem Hut.",
    description: "Strahlenförmige, blattartige Lamellen unter dem Hut. Die größte Gruppe mit tollen Speisepilzen und tödlichen Giftpilzen.",
    safetyFact:
      "Beheimatet die besten Speisepilze – aber auch die tödlichsten Killer wie den Grünen Knollenblätterpilz. Hier zählt jedes Merkmal.",
    safetyTone: "danger",
    indicators: ["Champignon", "Pfifferling-Doppelgänger Falscher Pfifferling", "Fliegenpilz", "Grüner Knollenblätterpilz (†)", "Parasol"],
    image: "/02_lamellenpilze.png",
  },
  {
    id: "Leistenpilze",
    subtitle: "CANTHARELLACEAE",
    fruchtschicht: "Aderige Falten / Leisten, fest mit dem Hutfleisch verwachsen.",
    description: "Feste, aderige Falten (Leisten), die fest mit dem Hutfleisch verwachsen sind.",
    safetyFact:
      "Kleine, überschaubare Gruppe. Verwechslungspartner gibt es wenige – aber der Falsche Pfifferling (Lamellenpilz!) bleibt der Klassiker.",
    safetyTone: "safe",
    indicators: ["Pfifferling", "Totentrompete", "Trompetenpfifferling", "Ohr-Leistling"],
    image: "/03_leistenpilze.png",
  },
  {
    id: "Schlauchpilze",
    subtitle: "ASCOMYCETEN",
    fruchtschicht: "Sporen reifen in winzigen Schläuchen (Asci).",
    description: "Sporen reifen in winzigen Schläuchen. Oft ohne klassischen Hut, wie Morcheln oder Trüffeln.",
    safetyFact:
      "Enthält Delikatessen (Morchel, Trüffel) UND tödlich giftige Arten (Frühjahrslorchel – Gyromitrin ist hitzeflüchtig, aber krebserregend).",
    safetyTone: "warn",
    indicators: ["Speisemorchel", "Sommertrüffel", "Frühjahrslorchel (†)", "Orangebecherling", "Bischofsmütze"],
    image: "/04_schlauchpilze.png",
  },
  {
    id: "Bauchpilze",
    subtitle: "GASTEROMYCETEN",
    fruchtschicht: "Geschlossene Fruchtkörper – Sporen reifen im Inneren.",
    description: "Geschlossene Fruchtkörper. Jung essbar, solange das Fleisch im Inneren rein weiß ist.",
    safetyFact:
      "Im jungen Zustand mit rein weißem Fleisch sind die meisten essbar. Innen schwarz, gelb oder marmoriert? Stehen lassen – Kartoffelbovist ist giftig.",
    safetyTone: "warn",
    indicators: ["Riesenbovist", "Flaschen-Stäubling", "Hasenbovist", "Erdstern", "Kartoffelbovist (giftig)"],
    image: "/05_bauchpilze.png",
  },
  {
    id: "Stachelpilze",
    subtitle: "HYDNACEAE & VERWANDTE",
    fruchtschicht: "Weiche, hängende Stacheln / Zähne unter dem Hut.",
    description: "Hängende, weiche Stacheln oder Zähne unter dem Hut anstelle von Röhren oder Lamellen.",
    safetyFact:
      "Sehr charakteristische Gruppe – kaum verwechselbar. Semmel-Stoppelpilz und Habichtspilz sind gute, nahrhafte Speisepilze.",
    safetyTone: "safe",
    indicators: ["Semmel-Stoppelpilz", "Habichtspilz", "Igel-Stachelbart", "Korallenstachelbart"],
    image: "/06_stachelpilze.png",
  },
  {
    id: "Porlinge & Schichtpilze",
    subtitle: "POLYPORALES · HOLZBEWOHNER",
    fruchtschicht: "Feinste Poren oder glatte Schicht auf zäher Konsole.",
    description: "Zähe, holzige oder lederartige Konsolen, die fest an Baumstämmen wachsen.",
    safetyFact:
      "Sehr wenige sind klassisch giftig, aber viele sind zäh und ungenießbar. Heilpilz-Forschung läuft auf Hochtouren (Reishi, Birkenporling).",
    safetyTone: "info",
    indicators: ["Zunderschwamm", "Schmetterlings-Tramete", "Schwefelporling", "Glänzender Lackporling (Reishi)", "Birkenporling"],
    image: "/07_porlinge.png",
  },
  {
    id: "Gallertpilze",
    subtitle: "HETEROBASIDIOMYCETEN",
    fruchtschicht: "Gelartig, elastisch, basidienartig im Wasser.",
    description: "Wackelig, elastisch oder geleeartig bei Feuchtigkeit; schrumpfen bei Trockenheit zusammen.",
    safetyFact:
      "Eine sehr sichere Gruppe. Judasohr und Goldgelber Zitterling sind seit Jahrtausenden Speise- und TCM-Pilze.",
    safetyTone: "safe",
    indicators: ["Judasohr", "Goldgelber Zitterling", "Eispilz", "Stoppeliger Drüsling"],
    image: "/08_gallertpilze.png",
  },
  {
    id: "Korallen & Keulen",
    subtitle: "CLAVARIACEAE",
    fruchtschicht: "Verzweigte Äste oder aufrechte Keulen – keine Hüte.",
    description: "Keine Hüte. Wachsen wie verzweigte Meereskorallen oder aufrecht stehende Keulen.",
    safetyFact:
      "Heikle Gruppe: Manche Korallen wirken stark abführend (Bauchwehkoralle). Nur klar bestimmte, hellgelbe oder weiße Arten in Maßen sammeln.",
    safetyTone: "warn",
    indicators: ["Goldgelbe Koralle (Ziegenbart)", "Bauchwehkoralle", "Herkuleskeule", "Rauchgraue Keule"],
    image: "/09_korallen_keulen.png",
  },
  {
    id: "Hörnlinge",
    subtitle: "DACRYMYCETALES",
    fruchtschicht: "Wachsartig-gallertig, intensiv gelb/orange auf Totholz.",
    description: "Kleine, gallertartige, intensiv gelbe oder orangefarbene Pilze auf Totholz.",
    safetyFact:
      "Kein kulinarisches Interesse, aber ein sicheres Bestimmungsmerkmal: leuchtendes Eigelb-Gelb + Wuchs auf Totholz = fast immer Hörnling.",
    safetyTone: "info",
    indicators: ["Klebriger Hörnling", "Zerfließende Gallertträne", "Pilziges Eigelb"],
    image: "/10_hoernlinge.png",
  },
];

export const TAXONOMY_IDS: TaxonomyId[] = TAXONOMY.map((t) => t.id);

export function taxonomyById(id: string | null | undefined): TaxonomyGroup | undefined {
  if (!id) return undefined;
  return TAXONOMY.find((t) => t.id === id);
}
