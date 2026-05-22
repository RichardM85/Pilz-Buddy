// AUTO-GENERATED 300-question pool for the Pilz-Kumpel-Diplom.
// Edit the generator (not this file) if you need to regenerate.

export type QuizDifficulty = "beginner" | "intermediate" | "expert";

export interface QuizQuestion {
  id: number;
  difficulty?: QuizDifficulty;
  question: string;
  options: string[];
  correctAnswers: number[];
  explanation?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    "id": 1,
    "difficulty": "expert",
    "question": "Welche Merkmale unterscheiden den gemeinen Steinpilz (Boletus edulis) vom bitteren Gallenröhrling (Tylopilus felleus)?",
    "options": [
      "Der Gallenröhrling hat im Alter oft rosa anlaufende Röhren.",
      "Der Steinpilz hat ein dunkles Netz auf hellem Grund am Stiel.",
      "Der Gallenröhrling hat ein deutlich dunkles, grobmaschiges Netz auf hellerem Grund.",
      "Der Steinpilz hat eine weiße bis feine hellbraune Netzzeichnung, besonders im oberen Stielbereich."
    ],
    "correctAnswers": [
      0,
      2,
      3
    ]
  },
  {
    "id": 2,
    "question": "Welche der folgenden Pilze besitzen Lamellen auf der Hutunterseite?",
    "options": [
      "Pfifferling (Cantharellus cibarius)",
      "Grüner Knollenblätterpilz (Amanita phalloides)",
      "Maronenröhrling (Imleria badia)",
      "Fliegenpilz (Amanita muscaria)"
    ],
    "correctAnswers": [
      1,
      3
    ]
  },
  {
    "id": 3,
    "difficulty": "expert",
    "question": "Was trifft auf den Grünen Knollenblätterpilz (Amanita phalloides) zu?",
    "options": [
      "Er enthält tödliche Amatoxine, die das Lebergewebe zerstören.",
      "Das Gift wird durch gründliches Kochen oder Braten vollständig neutralisiert.",
      "Er besitzt eine deutlich sichtbare Scheide (Volva) an der Stielbasis.",
      "Er riecht im Alter oft süßlich, fast kunsthonigartig."
    ],
    "correctAnswers": [
      0,
      2,
      3
    ]
  },
  {
    "id": 4,
    "difficulty": "beginner",
    "question": "Der Pfifferling (Cantharellus cibarius) ist ein beliebter Speisepilz. Welche anatomische Struktur trägt seine Sporen?",
    "options": [
      "Echte Lamellen, die sich leicht vom Hutfleisch ablösen lassen.",
      "Leisten, die fest mit dem Hutfleisch verwachsen sind und am Stiel herablaufen.",
      "Feine Poren, die im Alter gelb werden.",
      "Stoppeln, die bei Berührung leicht abbrechen."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 5,
    "question": "Welche Verfärbungen können beim Maronenröhrling (Imleria badia) bei Druck oder im Anschnitt auftreten?",
    "options": [
      "Die Röhren laufen bei Druck intensiv blaugrün bis blau an.",
      "Das Fleisch im Hut kann sich im Anschnitt leicht bläulich verfärben.",
      "Der Pilz läuft an der Stielbasis sofort karminrot an.",
      "Es tritt eine weiße, scharfe Milch an den Bruchstellen aus."
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 6,
    "question": "Welche dieser Aussagen zur Ökologischen Häufigkeits-Skala sind korrekt?",
    "options": [
      "Ein Pilz mit dem Status 'Gemein' kommt flächendeckend und sehr häufig vor.",
      "Arten auf der Roten Liste dürfen für den Eigenbedarf in unbegrenzten Mengen gesammelt werden.",
      "Die Häufigkeit eines Pilzes hängt stark von seinen Mykorrhiza-Partnerbäumen ab.",
      "Pilze wachsen unabhängig von Bodenfeuchtigkeit und pH-Wert überall gleich häufig."
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 7,
    "question": "Welche der folgenden Pilze sind tödlich giftig?",
    "options": [
      "Nadelholzhäubling (Galerina marginata)",
      "Satansröhrling (Rubroboletus satanas)",
      "Frühlings-Knollenblätterpilz (Amanita verna)",
      "Spitzgebuckelter Raukopf (Cortinarius rubellus)"
    ],
    "correctAnswers": [
      0,
      2,
      3
    ]
  },
  {
    "id": 8,
    "difficulty": "expert",
    "question": "Der Parasol (Macrolepiota procera) ist ein geschätzter Speisepilz. Welche Merkmale sichern seine Bestimmung?",
    "options": [
      "Der Stiel ist deutlich natternartig braun gemustert.",
      "Der Ring am Stiel ist dick, wattiert und lässt sich frei verschieben.",
      "Das Fleisch läuft im Anschnitt sofort blutrot an.",
      "Die Lamellen stehen frei und erreichen den Stiel nicht direkt."
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 9,
    "question": "Welche Merkmale sind typisch für den Fliegenpilz (Amanita muscaria)?",
    "options": [
      "Roter Hut mit weißen Velumflocken",
      "Weiße, freie Lamellen",
      "Stiel mit Ring und knolliger Basis mit Gürtelresten",
      "Blauendes Fleisch im Anschnitt"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 10,
    "difficulty": "expert",
    "question": "Was unterscheidet den Wiesen-Champignon (Agaricus campestris) vom Karbol-Egerling (Agaricus xanthodermus)?",
    "options": [
      "Karbol-Egerling färbt die Stielbasis im Anschnitt chromgelb",
      "Wiesen-Champignon riecht angenehm pilzig-anisartig",
      "Karbol-Egerling riecht nach Karbol/Tinte",
      "Wiesen-Champignon hat grüne Lamellen"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 11,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Hallimasch (Armillaria spp.) sind korrekt?",
    "options": [
      "Wächst büschelig an lebendem und totem Holz",
      "Muss vor dem Verzehr gut durchgegart werden",
      "Roh verzehrt verursacht er Magen-Darm-Beschwerden",
      "Ist ein streng mykorrhizaler Symbiont der Fichte"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 12,
    "question": "Welche Pilze sind klassische Mykorrhiza-Bildner?",
    "options": [
      "Steinpilz",
      "Fliegenpilz",
      "Austernseitling",
      "Pfifferling"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 13,
    "question": "Welche Pilze sind primär Saprobionten (Holz-/Streuzersetzer)?",
    "options": [
      "Austernseitling (Pleurotus ostreatus)",
      "Schopftintling (Coprinus comatus)",
      "Steinpilz (Boletus edulis)",
      "Stockschwämmchen (Kuehneromyces mutabilis)"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 14,
    "difficulty": "expert",
    "question": "Welche Merkmale hat der Spitzgebuckelte Raukopf (Cortinarius rubellus)?",
    "options": [
      "Enthält Orellanin mit Latenzzeit bis zu 3 Wochen",
      "Schädigt vor allem die Nieren",
      "Wird mit Pfifferlingen verwechselt",
      "Wirkung tritt innerhalb von 15 Minuten ein"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 15,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Schopftintling (Coprinus comatus) sind richtig?",
    "options": [
      "Jung essbar, zerfließt im Alter zu schwarzer Tinte",
      "Mit Alkohol verzehrt unproblematisch",
      "Sollte rasch nach der Ernte verarbeitet werden",
      "Wächst gerne auf nährstoffreichen Wiesen und Wegrändern"
    ],
    "correctAnswers": [
      0,
      2,
      3
    ]
  },
  {
    "id": 16,
    "question": "Welche Pilze besitzen Stacheln/Stoppeln statt Lamellen?",
    "options": [
      "Habichtspilz (Sarcodon imbricatus)",
      "Semmelstoppelpilz (Hydnum repandum)",
      "Pfifferling",
      "Steinpilz"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 17,
    "question": "Welche Aussagen zum Frauen-Täubling (Russula cyanoxantha) sind korrekt?",
    "options": [
      "Lamellen fühlen sich biegsam und speckig an",
      "Mild im Geschmack",
      "Hutfarbe oft variabel, violett-grün-bläulich",
      "Hat eine deutliche Volva am Stielgrund"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 18,
    "question": "Welche Eigenschaft trifft auf den Birkenpilz (Leccinum scabrum) zu?",
    "options": [
      "Lebt in Symbiose mit Birken",
      "Stiel ist mit dunklen Schüppchen besetzt",
      "Fleisch ist weich und wird im Alter wässerig",
      "Enthält tödliche Amatoxine"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 19,
    "question": "Woran erkennt man den Rotfußröhrling (Xerocomellus chrysenteron)?",
    "options": [
      "Hut reißt im Alter felderig auf, rot in den Rissen",
      "Röhren bläuen bei Druck",
      "Stiel oft rötlich überlaufen",
      "Hat einen Ring am Stiel"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 20,
    "difficulty": "expert",
    "question": "Welche Pilze sind in Mitteleuropa geschützt oder unter Schonbedingungen sammelbar?",
    "options": [
      "Steinpilz (max. 2 kg/Tag, Eigenbedarf)",
      "Pfifferling (nur in geringen Mengen)",
      "Trüffel (oft streng geschützt)",
      "Hallimasch (unbeschränkt sammelbar in allen Mengen)"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 21,
    "question": "Welche Aussagen zur Speise-Morchel (Morchella esculenta) sind korrekt?",
    "options": [
      "Hut wabenartig mit echten Vertiefungen",
      "Stiel innen hohl",
      "Roh giftig, muss durchgegart werden",
      "Wächst hauptsächlich im Spätherbst"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 22,
    "difficulty": "expert",
    "question": "Wie unterscheidet sich die Speise-Morchel von der giftigen Frühjahrslorchel (Gyromitra esculenta)?",
    "options": [
      "Lorchel hat hirnartig gewundene Windungen statt Waben",
      "Lorchel enthält Gyromitrin, das zu MMH umgewandelt wird",
      "Morchel hat echte Hut-Waben",
      "Lorchel ist auch nach Trocknen völlig unbedenklich"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 23,
    "question": "Welche Pilze gehören zu den Röhrlingen?",
    "options": [
      "Steinpilz",
      "Maronenröhrling",
      "Pfifferling",
      "Birkenpilz"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 24,
    "question": "Welche Aussagen treffen auf den Perlpilz (Amanita rubescens) zu?",
    "options": [
      "Fleisch rötet im Anschnitt/an Madenfraßstellen",
      "Hat rötliche Velumflocken auf dem Hut",
      "Roh giftig, gegart essbar",
      "Enthält tödliche Amatoxine"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 25,
    "question": "Mit welchen giftigen Arten kann der Perlpilz verwechselt werden?",
    "options": [
      "Pantherpilz (Amanita pantherina)",
      "Grauer Wulstling – verträglich",
      "Königs-Fliegenpilz (Amanita regalis)",
      "Wiesenchampignon"
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 26,
    "question": "Welche Merkmale hat der Pantherpilz (Amanita pantherina)?",
    "options": [
      "Reinweiße Velumflocken auf braunem Hut",
      "Stielbasis mit deutlicher Bergsteigersocke (gerandete Knolle)",
      "Fleisch rötet im Anschnitt",
      "Enthält Ibotensäure und Muscimol"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 27,
    "question": "Welche Sporenpulverfarben sind typisch?",
    "options": [
      "Champignons: schokoladenbraun",
      "Knollenblätterpilze: weiß",
      "Risspilze: erdbraun",
      "Steinpilz: schwarz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 28,
    "question": "Welche Aussagen zum Sammeln und Lagern sind korrekt?",
    "options": [
      "Korb statt Plastiktüte verwenden",
      "Pilze möglichst kühl und luftig transportieren",
      "Am gleichen Tag verarbeiten",
      "Wochenlang ungekühlt aufbewahren"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 29,
    "question": "Welche Pilze sind typische Frühjahrsarten?",
    "options": [
      "Speise-Morchel",
      "Mai-Ritterling",
      "Spitzmorchel",
      "Steinpilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 30,
    "question": "Welche Pilze fruktifizieren typischerweise im Spätherbst bis Winter?",
    "options": [
      "Austernseitling",
      "Samtfußrübling (Flammulina velutipes)",
      "Judasohr (Auricularia auricula-judae)",
      "Speise-Morchel"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 31,
    "question": "Welche Aussagen zum Grünling (Tricholoma equestre) sind richtig?",
    "options": [
      "Früher als Speisepilz beliebt",
      "Heute wegen rhabdomyolytischer Wirkung gemieden",
      "Wächst in sandigen Kiefernwäldern",
      "Ist für Anfänger uneingeschränkt empfohlen"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 32,
    "question": "Welche Pilze sind klassische Doppelgänger des Pfifferlings?",
    "options": [
      "Falscher Pfifferling (Hygrophoropsis aurantiaca)",
      "Ölbaumpilz (Omphalotus olearius)",
      "Stockschwämmchen",
      "Habichtspilz"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 33,
    "question": "Welche Merkmale hat der Falsche Pfifferling (Hygrophoropsis aurantiaca)?",
    "options": [
      "Echte, gabelig geteilte Lamellen (nicht Leisten)",
      "Weiches Fleisch",
      "Wächst auf Nadelstreu/Totholz",
      "Fest verwachsene Leisten wie beim echten Pfifferling"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 34,
    "question": "Welche Speisepilze haben Röhren UND einen Ring am Stiel?",
    "options": [
      "Goldröhrling (Suillus grevillei)",
      "Butterpilz (Suillus luteus)",
      "Steinpilz",
      "Maronenröhrling"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 35,
    "question": "Welche Pilze enthalten Hämolysine, die durch Erhitzen zerstört werden?",
    "options": [
      "Perlpilz",
      "Hallimasch",
      "Morchel",
      "Knollenblätterpilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 36,
    "difficulty": "beginner",
    "question": "Wie lange dauert die Latenzphase typischerweise bei einer Knollenblätterpilz-Vergiftung?",
    "options": [
      "6 bis 24 Stunden",
      "Wenige Minuten",
      "Sofort nach Verzehr",
      "Mehrere Wochen"
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 37,
    "question": "Welche Symptome sind typisch für das Phalloides-Syndrom?",
    "options": [
      "Heftiges Erbrechen und Durchfall nach Latenzphase",
      "Trügerische Besserungsphase",
      "Leber- und Nierenversagen",
      "Sofortige Halluzinationen ohne Magenbeschwerden"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 38,
    "question": "Welche Pilze gelten als gute Anfänger-Speisepilze in Mitteleuropa?",
    "options": [
      "Maronenröhrling",
      "Pfifferling",
      "Steinpilz",
      "Spitzgebuckelter Raukopf"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 39,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Judasohr (Auricularia auricula-judae) sind korrekt?",
    "options": [
      "Wächst vor allem an totem Holunder",
      "Gelatinöse, ohrförmige Fruchtkörper",
      "Wird in der asiatischen Küche oft als Mu-Err verwendet",
      "Ist roh stark giftig und tödlich"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 40,
    "question": "Welche Merkmale treffen auf den Austernseitling (Pleurotus ostreatus) zu?",
    "options": [
      "Wächst büschelig an Laubholz",
      "Lamellen laufen weit am seitlichen Stiel herab",
      "Saprobiont auf Totholz, Schwächeparasit",
      "Mykorrhizapilz an Eiche"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 41,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Schwefelporling (Laetiporus sulphureus) sind richtig?",
    "options": [
      "Junges Fleisch ist gut essbar",
      "An alten Eichen sind die Fruchtkörper oft hart und ungenießbar",
      "Auf bestimmten Bäumen (z. B. Robinie, Eibe) kann er Unverträglichkeiten auslösen",
      "Wächst typischerweise unterirdisch wie Trüffel"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 42,
    "difficulty": "expert",
    "question": "Welche Aussagen zu Bovisten und Stäublingen treffen zu?",
    "options": [
      "Jung mit weißem, festem Fleisch essbar",
      "Innenfleisch darf nicht gelblich oder violett verfärbt sein",
      "Verwechslungsgefahr mit jungen Knollenblätterpilzen – immer längs aufschneiden",
      "Reife, sporenstaubige Fruchtkörper sind besonders schmackhaft"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 43,
    "question": "Welche Aussagen zum Karbol-Egerling (Agaricus xanthodermus) sind korrekt?",
    "options": [
      "Stielbasis verfärbt sich gelb auf Druck",
      "Geruch nach Tinte / Karbol / Apotheke",
      "Verursacht Magen-Darm-Beschwerden",
      "Ist ein hervorragender Speisepilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 44,
    "question": "Welche Pilze enthalten Muscarin in toxikologisch relevanter Menge?",
    "options": [
      "Ziegelroter Risspilz (Inocybe erubescens)",
      "Trichterlinge der Gattung Clitocybe",
      "Fliegenpilz – Hauptwirkstoff Muscarin",
      "Steinpilz"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 45,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Fliegenpilz (Amanita muscaria) sind toxikologisch korrekt?",
    "options": [
      "Hauptwirkstoffe sind Ibotensäure und Muscimol",
      "Wirkt psychoaktiv-delirant",
      "Muscarin ist nicht der Hauptwirkstoff",
      "Wirkt über Amatoxine wie der Knollenblätterpilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 46,
    "question": "Welche Pilze sind essbar, aber leicht mit tödlichen Arten verwechselbar?",
    "options": [
      "Stockschwämmchen (mit Gifthäubling)",
      "Wiesen-Champignon (mit Knollenblätterpilzen)",
      "Perlpilz (mit Pantherpilz)",
      "Pfifferling (mit Knollenblätterpilz)"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 47,
    "difficulty": "expert",
    "question": "Welche der folgenden Aussagen zur Pilzbestimmungs-App-Nutzung sind verantwortungsvoll?",
    "options": [
      "KI-Bestimmung ist nur Vorschlag, nie Verzehrfreigabe",
      "Unsichere Funde stehenlassen oder vom Sachverständigen prüfen lassen",
      "Im Zweifel an die Pilzberatungsstelle wenden",
      "Apps ersetzen die Pilzkontrolle vollständig"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 48,
    "question": "Welche Aussagen zu den Lamellen des Knollenblätterpilzes sind richtig?",
    "options": [
      "Lamellen sind weiß, auch im Alter",
      "Lamellen stehen frei vom Stiel",
      "Lamellen werden im Alter schokoladenbraun (wie Champignon)",
      "Lamellen sind dicht stehend"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 49,
    "difficulty": "expert",
    "question": "Welche Merkmale unterscheiden den Wiesenchampignon vom Knollenblätterpilz?",
    "options": [
      "Wiesenchampignon hat rosa bis braune Lamellen, nie weiß",
      "Knollenblätterpilz hat Volva am Stielgrund, Champignon nicht",
      "Knollenblätterpilz hat weiße Lamellen",
      "Beide haben eine knollige Stielbasis mit häutiger Volva"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 50,
    "question": "Welche Pilze gehören zur Gattung Russula (Täublinge)?",
    "options": [
      "Frauen-Täubling",
      "Speise-Täubling",
      "Pfifferling",
      "Fliegenpilz"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 51,
    "difficulty": "expert",
    "question": "Was ist beim Sammeln auf nährstoffbelasteten Standorten zu beachten?",
    "options": [
      "Champignons reichern Schwermetalle an",
      "Maronenröhrling kann Cäsium-137 anreichern",
      "Stark befahrene Straßenränder meiden",
      "Industrieparks sind ideale Sammelorte"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 52,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Ölbaumpilz (Omphalotus olearius) sind richtig?",
    "options": [
      "Wächst büschelig an Stümpfen, oft Eiche/Olive",
      "Hat echte, scharfkantige Lamellen (nicht Leisten)",
      "Wird mit Pfifferling verwechselt",
      "Ist ein hervorragender Speisepilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 53,
    "question": "Welche Pilze sind klassische Korallenpilze?",
    "options": [
      "Bauchwehkoralle (Ramaria mairei)",
      "Hahnenkamm/Korallenpilze (Ramaria spp.)",
      "Pfifferling",
      "Fliegenpilz"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 54,
    "question": "Welche Aussagen über Mykorrhiza sind richtig?",
    "options": [
      "Pilz liefert Wasser und Mineralien",
      "Baum liefert Zucker aus Photosynthese",
      "Mykorrhiza-Pilze lassen sich oft schlecht kultivieren",
      "Mykorrhiza ist eine Parasit-Beziehung"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 55,
    "question": "Welche dieser Pilze sind klassische Speisepilze auf Wiesen?",
    "options": [
      "Wiesen-Champignon",
      "Schopftintling",
      "Nelkenschwindling (Marasmius oreades)",
      "Fliegenpilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 56,
    "question": "Welche Aussagen treffen auf den Nelkenschwindling (Marasmius oreades) zu?",
    "options": [
      "Wächst in Hexenringen auf Wiesen",
      "Hat zähen Stiel, nur Hüte verwenden",
      "Aromatisch-süßlich riechend",
      "Tödlich giftig"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 57,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Maipilz/Mai-Ritterling (Calocybe gambosa) sind korrekt?",
    "options": [
      "Erscheint im Frühjahr (April–Juni)",
      "Riecht mehlartig-gurkenartig",
      "Wächst gerne in Hexenringen an Waldrändern",
      "Wächst nur tief unter der Erde wie Trüffel"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 58,
    "question": "Welche Aussagen treffen auf den Hexen-Röhrling (Neoboletus erythropus) zu?",
    "options": [
      "Roh giftig, gegart guter Speisepilz",
      "Röhren und Fleisch bläuen intensiv",
      "Stiel rot punktiert, ohne Netz",
      "Hat einen häutigen Ring am Stiel"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 59,
    "question": "Welche Aussagen zum Gallenröhrling (Tylopilus felleus) sind korrekt?",
    "options": [
      "Geschmack extrem bitter, schon kleine Mengen verderben ein Gericht",
      "Röhren werden im Alter rosa",
      "Netz auf dem Stiel ist grobmaschig und dunkel",
      "Tödlich giftig"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 60,
    "question": "Welche Aussagen zum Satansröhrling (Rubroboletus satanas) sind korrekt?",
    "options": [
      "Hut hell, fast kalkweiß",
      "Poren blutrot",
      "Stiel bauchig, rot genetzt",
      "Roh ungiftig und mild"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 61,
    "question": "Welche Pilze wachsen typischerweise auf/an Birken?",
    "options": [
      "Birkenpilz",
      "Birkenporling (Fomitopsis betulina)",
      "Fliegenpilz (oft unter Birke)",
      "Steinpilz (vor allem unter Birke und nirgendwo sonst)"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 62,
    "question": "Welche Aussagen zum Maronenröhrling und Strahlung sind korrekt?",
    "options": [
      "Reichert Cäsium-137 deutlich an",
      "In stark belasteten Gebieten Verzehr einschränken",
      "Belastung variiert regional stark",
      "Ist generell radioaktiv-frei"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 63,
    "difficulty": "expert",
    "question": "Welche dieser Aussagen über Pilzgifte stimmen?",
    "options": [
      "Amatoxine sind hitzestabil",
      "Gyromitrin wird teilweise beim Trocknen abgebaut, bleibt aber gefährlich",
      "Muscarin wirkt parasympathomimetisch",
      "Knollenblätterpilz-Gift wird durch Kochen zerstört"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 64,
    "question": "Welche Pilze kann man in der Regel nicht roh essen?",
    "options": [
      "Hallimasch",
      "Morchel",
      "Perlpilz",
      "Zuchtchampignon (besser gegart, aber roh in kleinen Mengen tolerabel)"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 65,
    "question": "Welche Aussagen zur Gattung Cortinarius (Schleierlinge) treffen zu?",
    "options": [
      "Sehr artenreich, schwer bestimmbar",
      "Enthält tödliche Arten wie Orellanus und rubellus",
      "Für Anfänger generell ungeeignet",
      "Eindeutig sicher essbar bei jeder Art"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 66,
    "question": "Welche dieser Speisepilze sind typische Mykorrhiza-Partner der Fichte?",
    "options": [
      "Steinpilz",
      "Maronenröhrling",
      "Fichtenreizker (Lactarius deterrimus)",
      "Austernseitling"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 67,
    "question": "Welche Aussagen zu Reizkern (Lactarius spp.) sind richtig?",
    "options": [
      "Edel-Reizker hat orangefarbene Milch",
      "Echte Reizker werden gerne in Suppen verwendet",
      "Milch verfärbt sich teils grün",
      "Alle Reizker sind tödlich giftig"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 68,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Röhrlinge?",
    "options": [
      "Kegelhütiger Knollenblätterpilz (Amanita virosa)",
      "Schopftintling (Coprinus comatus)",
      "Maronenröhrling (Imleria badia)",
      "Steinpilz (Boletus edulis)"
    ],
    "correctAnswers": [
      2,
      3
    ]
  },
  {
    "id": 69,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Lamellenpilze?",
    "options": [
      "Steinpilz (Boletus edulis)",
      "Frauen-Täubling (Russula cyanoxantha)",
      "Ziegelroter Risspilz (Inocybe erubescens)",
      "Maronenröhrling (Imleria badia)"
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 70,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Stoppelpilze?",
    "options": [
      "Semmelstoppelpilz (Hydnum repandum)",
      "Karbol-Egerling (Agaricus xanthodermus)",
      "Habichtspilz (Sarcodon imbricatus)",
      "Ölbaumpilz (Omphalotus olearius)"
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 71,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Leistenpilze?",
    "options": [
      "Spitzmorchel (Morchella conica)",
      "Trompetenpfifferling (Craterellus tubaeformis)",
      "Perlpilz (Amanita rubescens)",
      "Pfifferling (Cantharellus cibarius)"
    ],
    "correctAnswers": [
      1,
      3
    ]
  },
  {
    "id": 72,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Schlauchpilze?",
    "options": [
      "Grüner Knollenblätterpilz (Amanita phalloides)",
      "Speise-Morchel (Morchella esculenta)",
      "Gallenröhrling (Tylopilus felleus)",
      "Spitzmorchel (Morchella conica)"
    ],
    "correctAnswers": [
      1,
      3
    ]
  },
  {
    "id": 73,
    "difficulty": "beginner",
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Korallenpilze?",
    "options": [
      "Steinpilz (Boletus edulis)",
      "Grauer Wulstling (Amanita excelsa)",
      "Frühjahrslorchel (Gyromitra esculenta)",
      "Bauchwehkoralle (Ramaria mairei)"
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 74,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Porlinge?",
    "options": [
      "Grüner Knollenblätterpilz (Amanita phalloides)",
      "Birkenporling (Fomitopsis betulina)",
      "Schwefelporling (Laetiporus sulphureus)",
      "Wiesen-Champignon (Agaricus campestris)"
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 75,
    "difficulty": "beginner",
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Gallertpilze?",
    "options": [
      "Maronenröhrling (Imleria badia)",
      "Judasohr (Auricularia auricula-judae)",
      "Satansröhrling (Rubroboletus satanas)",
      "Goldröhrling (Suillus grevillei)"
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 76,
    "difficulty": "beginner",
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Bauchpilze?",
    "options": [
      "Riesenbovist (Calvatia gigantea)",
      "Frühlings-Knollenblätterpilz (Amanita verna)",
      "Steinpilz (Boletus edulis)",
      "Ölbaumpilz (Omphalotus olearius)"
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 77,
    "difficulty": "beginner",
    "question": "Welche Aussage(n) treffen auf den Steinpilz (Boletus edulis) zu?",
    "options": [
      "Steinpilz (Boletus edulis) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Steinpilz (Boletus edulis) ist tödlich giftig und enthält Amatoxine.",
      "Steinpilz (Boletus edulis) bildet seine Sporen in echten Stoppeln aus.",
      "Steinpilz (Boletus edulis) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 78,
    "question": "Welche Aussage(n) treffen auf den Maronenröhrling (Imleria badia) zu?",
    "options": [
      "Maronenröhrling (Imleria badia) bildet seine Sporen in echten Stoppeln aus.",
      "Maronenröhrling (Imleria badia) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Maronenröhrling (Imleria badia) ist roh oder gegart ein guter Speisepilz.",
      "Maronenröhrling (Imleria badia) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 79,
    "question": "Welche Aussage(n) treffen auf den Birkenpilz (Leccinum scabrum) zu?",
    "options": [
      "Birkenpilz (Leccinum scabrum) ist roh oder gegart ein guter Speisepilz.",
      "Birkenpilz (Leccinum scabrum) bildet seine Sporen in echten Stoppeln aus.",
      "Birkenpilz (Leccinum scabrum) ist tödlich giftig und enthält Amatoxine.",
      "Birkenpilz (Leccinum scabrum) hat eine deutliche Volva (Scheide) an der Stielbasis."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 80,
    "question": "Welche Aussage(n) treffen auf den Rotkappe (Leccinum aurantiacum) zu?",
    "options": [
      "Rotkappe (Leccinum aurantiacum) bildet seine Sporen in echten Stoppeln aus.",
      "Rotkappe (Leccinum aurantiacum) ist tödlich giftig und enthält Amatoxine.",
      "Rotkappe (Leccinum aurantiacum) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Rotkappe (Leccinum aurantiacum) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 81,
    "difficulty": "beginner",
    "question": "Welche Aussage(n) treffen auf den Butterpilz (Suillus luteus) zu?",
    "options": [
      "Butterpilz (Suillus luteus) ist tödlich giftig und enthält Amatoxine.",
      "Butterpilz (Suillus luteus) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Butterpilz (Suillus luteus) bildet seine Sporen in echten Stoppeln aus.",
      "Butterpilz (Suillus luteus) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 82,
    "question": "Welche Aussage(n) treffen auf den Goldröhrling (Suillus grevillei) zu?",
    "options": [
      "Goldröhrling (Suillus grevillei) bildet seine Sporen in echten Stoppeln aus.",
      "Goldröhrling (Suillus grevillei) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Goldröhrling (Suillus grevillei) ist roh oder gegart ein guter Speisepilz.",
      "Goldröhrling (Suillus grevillei) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 83,
    "question": "Welche Aussage(n) treffen auf den Hexen-Röhrling (Neoboletus erythropus) zu?",
    "options": [
      "Hexen-Röhrling (Neoboletus erythropus) ist roh besonders aromatisch und unbedenklich.",
      "Hexen-Röhrling (Neoboletus erythropus) enthält tödliche Amatoxine wie der Knollenblätterpilz.",
      "Hexen-Röhrling (Neoboletus erythropus) sollte niemals roh verzehrt werden.",
      "Hexen-Röhrling (Neoboletus erythropus) ist nur ausreichend erhitzt verträglich."
    ],
    "correctAnswers": [
      2,
      3
    ]
  },
  {
    "id": 84,
    "question": "Welche Aussage(n) treffen auf den Gallenröhrling (Tylopilus felleus) zu?",
    "options": [
      "Gallenröhrling (Tylopilus felleus) ist ein klassischer Anfänger-Speisepilz.",
      "Gallenröhrling (Tylopilus felleus) gilt nicht als verlässlicher Speisepilz.",
      "Gallenröhrling (Tylopilus felleus) wird industriell als Zuchtpilz angebaut.",
      "Gallenröhrling (Tylopilus felleus) wirkt antibakteriell und ist roh besonders wertvoll."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 85,
    "question": "Welche Aussage(n) treffen auf den Satansröhrling (Rubroboletus satanas) zu?",
    "options": [
      "Satansröhrling (Rubroboletus satanas) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Satansröhrling (Rubroboletus satanas) gilt nicht als verlässlicher Speisepilz.",
      "Satansröhrling (Rubroboletus satanas) ist ein klassischer Anfänger-Speisepilz.",
      "Satansröhrling (Rubroboletus satanas) wird industriell als Zuchtpilz angebaut."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 86,
    "question": "Welche Aussage(n) treffen auf den Pfifferling (Cantharellus cibarius) zu?",
    "options": [
      "Pfifferling (Cantharellus cibarius) ist tödlich giftig und enthält Amatoxine.",
      "Pfifferling (Cantharellus cibarius) bildet seine Sporen in echten Stoppeln aus.",
      "Pfifferling (Cantharellus cibarius) ist roh oder gegart ein guter Speisepilz.",
      "Pfifferling (Cantharellus cibarius) hat eine deutliche Volva (Scheide) an der Stielbasis."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 87,
    "question": "Welche Aussage(n) treffen auf den Trompetenpfifferling (Craterellus tubaeformis) zu?",
    "options": [
      "Trompetenpfifferling (Craterellus tubaeformis) ist tödlich giftig und enthält Amatoxine.",
      "Trompetenpfifferling (Craterellus tubaeformis) ist roh oder gegart ein guter Speisepilz.",
      "Trompetenpfifferling (Craterellus tubaeformis) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Trompetenpfifferling (Craterellus tubaeformis) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 88,
    "question": "Welche Aussage(n) treffen auf den Falscher Pfifferling (Hygrophoropsis aurantiaca) zu?",
    "options": [
      "Falscher Pfifferling (Hygrophoropsis aurantiaca) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Falscher Pfifferling (Hygrophoropsis aurantiaca) ist ein klassischer Anfänger-Speisepilz.",
      "Falscher Pfifferling (Hygrophoropsis aurantiaca) gilt nicht als verlässlicher Speisepilz.",
      "Falscher Pfifferling (Hygrophoropsis aurantiaca) wird industriell als Zuchtpilz angebaut."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 89,
    "question": "Welche Aussage(n) treffen auf den Grüner Knollenblätterpilz (Amanita phalloides) zu?",
    "options": [
      "Grüner Knollenblätterpilz (Amanita phalloides) wird in der Lebensmittelindustrie kultiviert.",
      "Grüner Knollenblätterpilz (Amanita phalloides) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Grüner Knollenblätterpilz (Amanita phalloides) verliert sein Gift beim Kochen vollständig.",
      "Grüner Knollenblätterpilz (Amanita phalloides) ist tödlich giftig und darf nicht verzehrt werden."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 90,
    "question": "Welche Aussage(n) treffen auf den Frühlings-Knollenblätterpilz (Amanita verna) zu?",
    "options": [
      "Frühlings-Knollenblätterpilz (Amanita verna) wird in der Lebensmittelindustrie kultiviert.",
      "Frühlings-Knollenblätterpilz (Amanita verna) ist tödlich giftig und darf nicht verzehrt werden.",
      "Frühlings-Knollenblätterpilz (Amanita verna) verliert sein Gift beim Kochen vollständig.",
      "Frühlings-Knollenblätterpilz (Amanita verna) gilt als ausgezeichneter Speisepilz für Anfänger."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 91,
    "question": "Welche Aussage(n) treffen auf den Kegelhütiger Knollenblätterpilz (Amanita virosa) zu?",
    "options": [
      "Kegelhütiger Knollenblätterpilz (Amanita virosa) verliert sein Gift beim Kochen vollständig.",
      "Kegelhütiger Knollenblätterpilz (Amanita virosa) ist tödlich giftig und darf nicht verzehrt werden.",
      "Kegelhütiger Knollenblätterpilz (Amanita virosa) wird in der Lebensmittelindustrie kultiviert.",
      "Kegelhütiger Knollenblätterpilz (Amanita virosa) gilt als ausgezeichneter Speisepilz für Anfänger."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 92,
    "question": "Welche Aussage(n) treffen auf den Fliegenpilz (Amanita muscaria) zu?",
    "options": [
      "Fliegenpilz (Amanita muscaria) ist ein klassischer Anfänger-Speisepilz.",
      "Fliegenpilz (Amanita muscaria) gilt nicht als verlässlicher Speisepilz.",
      "Fliegenpilz (Amanita muscaria) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Fliegenpilz (Amanita muscaria) wird industriell als Zuchtpilz angebaut."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 93,
    "question": "Welche Aussage(n) treffen auf den Pantherpilz (Amanita pantherina) zu?",
    "options": [
      "Pantherpilz (Amanita pantherina) ist ein klassischer Anfänger-Speisepilz.",
      "Pantherpilz (Amanita pantherina) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Pantherpilz (Amanita pantherina) wird industriell als Zuchtpilz angebaut.",
      "Pantherpilz (Amanita pantherina) gilt nicht als verlässlicher Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 94,
    "question": "Welche Aussage(n) treffen auf den Perlpilz (Amanita rubescens) zu?",
    "options": [
      "Perlpilz (Amanita rubescens) ist roh besonders aromatisch und unbedenklich.",
      "Perlpilz (Amanita rubescens) ist nur ausreichend erhitzt verträglich.",
      "Perlpilz (Amanita rubescens) sollte niemals roh verzehrt werden.",
      "Perlpilz (Amanita rubescens) enthält tödliche Amatoxine wie der Knollenblätterpilz."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 95,
    "question": "Welche Aussage(n) treffen auf den Grauer Wulstling (Amanita excelsa) zu?",
    "options": [
      "Grauer Wulstling (Amanita excelsa) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Grauer Wulstling (Amanita excelsa) ist roh oder gegart ein guter Speisepilz.",
      "Grauer Wulstling (Amanita excelsa) bildet seine Sporen in echten Stoppeln aus.",
      "Grauer Wulstling (Amanita excelsa) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 96,
    "question": "Welche Aussage(n) treffen auf den Wiesen-Champignon (Agaricus campestris) zu?",
    "options": [
      "Wiesen-Champignon (Agaricus campestris) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Wiesen-Champignon (Agaricus campestris) ist roh oder gegart ein guter Speisepilz.",
      "Wiesen-Champignon (Agaricus campestris) ist tödlich giftig und enthält Amatoxine.",
      "Wiesen-Champignon (Agaricus campestris) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 97,
    "question": "Welche Aussage(n) treffen auf den Karbol-Egerling (Agaricus xanthodermus) zu?",
    "options": [
      "Karbol-Egerling (Agaricus xanthodermus) ist ein klassischer Anfänger-Speisepilz.",
      "Karbol-Egerling (Agaricus xanthodermus) wird industriell als Zuchtpilz angebaut.",
      "Karbol-Egerling (Agaricus xanthodermus) gilt nicht als verlässlicher Speisepilz.",
      "Karbol-Egerling (Agaricus xanthodermus) wirkt antibakteriell und ist roh besonders wertvoll."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 98,
    "question": "Welche Aussage(n) treffen auf den Schopftintling (Coprinus comatus) zu?",
    "options": [
      "Schopftintling (Coprinus comatus) ist tödlich giftig und enthält Amatoxine.",
      "Schopftintling (Coprinus comatus) ist roh oder gegart ein guter Speisepilz.",
      "Schopftintling (Coprinus comatus) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Schopftintling (Coprinus comatus) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 99,
    "question": "Welche Aussage(n) treffen auf den Hallimasch (Armillaria mellea) zu?",
    "options": [
      "Hallimasch (Armillaria mellea) enthält tödliche Amatoxine wie der Knollenblätterpilz.",
      "Hallimasch (Armillaria mellea) ist nur ausreichend erhitzt verträglich.",
      "Hallimasch (Armillaria mellea) ist roh besonders aromatisch und unbedenklich.",
      "Hallimasch (Armillaria mellea) sollte niemals roh verzehrt werden."
    ],
    "correctAnswers": [
      1,
      3
    ]
  },
  {
    "id": 100,
    "question": "Welche Aussage(n) treffen auf den Stockschwämmchen (Kuehneromyces mutabilis) zu?",
    "options": [
      "Stockschwämmchen (Kuehneromyces mutabilis) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Stockschwämmchen (Kuehneromyces mutabilis) bildet seine Sporen in echten Stoppeln aus.",
      "Stockschwämmchen (Kuehneromyces mutabilis) ist roh oder gegart ein guter Speisepilz.",
      "Stockschwämmchen (Kuehneromyces mutabilis) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 101,
    "question": "Welche Aussage(n) treffen auf den Nadelholzhäubling (Galerina marginata) zu?",
    "options": [
      "Nadelholzhäubling (Galerina marginata) ist tödlich giftig und darf nicht verzehrt werden.",
      "Nadelholzhäubling (Galerina marginata) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Nadelholzhäubling (Galerina marginata) wird in der Lebensmittelindustrie kultiviert.",
      "Nadelholzhäubling (Galerina marginata) verliert sein Gift beim Kochen vollständig."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 102,
    "question": "Welche Aussage(n) treffen auf den Spitzgebuckelter Raukopf (Cortinarius rubellus) zu?",
    "options": [
      "Spitzgebuckelter Raukopf (Cortinarius rubellus) wird in der Lebensmittelindustrie kultiviert.",
      "Spitzgebuckelter Raukopf (Cortinarius rubellus) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Spitzgebuckelter Raukopf (Cortinarius rubellus) verliert sein Gift beim Kochen vollständig.",
      "Spitzgebuckelter Raukopf (Cortinarius rubellus) ist tödlich giftig und darf nicht verzehrt werden."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 103,
    "question": "Welche Aussage(n) treffen auf den Orangefuchsiger Raukopf (Cortinarius orellanus) zu?",
    "options": [
      "Orangefuchsiger Raukopf (Cortinarius orellanus) ist tödlich giftig und darf nicht verzehrt werden.",
      "Orangefuchsiger Raukopf (Cortinarius orellanus) verliert sein Gift beim Kochen vollständig.",
      "Orangefuchsiger Raukopf (Cortinarius orellanus) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Orangefuchsiger Raukopf (Cortinarius orellanus) wird in der Lebensmittelindustrie kultiviert."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 104,
    "question": "Welche Aussage(n) treffen auf den Ziegelroter Risspilz (Inocybe erubescens) zu?",
    "options": [
      "Ziegelroter Risspilz (Inocybe erubescens) wird in der Lebensmittelindustrie kultiviert.",
      "Ziegelroter Risspilz (Inocybe erubescens) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Ziegelroter Risspilz (Inocybe erubescens) verliert sein Gift beim Kochen vollständig.",
      "Ziegelroter Risspilz (Inocybe erubescens) ist tödlich giftig und darf nicht verzehrt werden."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 105,
    "question": "Welche Aussage(n) treffen auf den Speise-Morchel (Morchella esculenta) zu?",
    "options": [
      "Speise-Morchel (Morchella esculenta) enthält tödliche Amatoxine wie der Knollenblätterpilz.",
      "Speise-Morchel (Morchella esculenta) sollte niemals roh verzehrt werden.",
      "Speise-Morchel (Morchella esculenta) ist nur ausreichend erhitzt verträglich.",
      "Speise-Morchel (Morchella esculenta) ist roh besonders aromatisch und unbedenklich."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 106,
    "question": "Welche Aussage(n) treffen auf den Spitzmorchel (Morchella conica) zu?",
    "options": [
      "Spitzmorchel (Morchella conica) ist nur ausreichend erhitzt verträglich.",
      "Spitzmorchel (Morchella conica) ist roh besonders aromatisch und unbedenklich.",
      "Spitzmorchel (Morchella conica) sollte niemals roh verzehrt werden.",
      "Spitzmorchel (Morchella conica) enthält tödliche Amatoxine wie der Knollenblätterpilz."
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 107,
    "question": "Welche Aussage(n) treffen auf den Frühjahrslorchel (Gyromitra esculenta) zu?",
    "options": [
      "Frühjahrslorchel (Gyromitra esculenta) verliert sein Gift beim Kochen vollständig.",
      "Frühjahrslorchel (Gyromitra esculenta) wird in der Lebensmittelindustrie kultiviert.",
      "Frühjahrslorchel (Gyromitra esculenta) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Frühjahrslorchel (Gyromitra esculenta) ist tödlich giftig und darf nicht verzehrt werden."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 108,
    "question": "Welche Aussage(n) treffen auf den Austernseitling (Pleurotus ostreatus) zu?",
    "options": [
      "Austernseitling (Pleurotus ostreatus) ist tödlich giftig und enthält Amatoxine.",
      "Austernseitling (Pleurotus ostreatus) ist roh oder gegart ein guter Speisepilz.",
      "Austernseitling (Pleurotus ostreatus) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Austernseitling (Pleurotus ostreatus) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 109,
    "question": "Welche Aussage(n) treffen auf den Samtfußrübling (Flammulina velutipes) zu?",
    "options": [
      "Samtfußrübling (Flammulina velutipes) bildet seine Sporen in echten Stoppeln aus.",
      "Samtfußrübling (Flammulina velutipes) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Samtfußrübling (Flammulina velutipes) ist roh oder gegart ein guter Speisepilz.",
      "Samtfußrübling (Flammulina velutipes) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 110,
    "question": "Welche Aussage(n) treffen auf den Judasohr (Auricularia auricula-judae) zu?",
    "options": [
      "Judasohr (Auricularia auricula-judae) ist roh oder gegart ein guter Speisepilz.",
      "Judasohr (Auricularia auricula-judae) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Judasohr (Auricularia auricula-judae) ist tödlich giftig und enthält Amatoxine.",
      "Judasohr (Auricularia auricula-judae) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 111,
    "question": "Welche Aussage(n) treffen auf den Semmelstoppelpilz (Hydnum repandum) zu?",
    "options": [
      "Semmelstoppelpilz (Hydnum repandum) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Semmelstoppelpilz (Hydnum repandum) bildet seine Sporen in echten Stoppeln aus.",
      "Semmelstoppelpilz (Hydnum repandum) ist tödlich giftig und enthält Amatoxine.",
      "Semmelstoppelpilz (Hydnum repandum) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 112,
    "question": "Welche Aussage(n) treffen auf den Habichtspilz (Sarcodon imbricatus) zu?",
    "options": [
      "Habichtspilz (Sarcodon imbricatus) gilt nicht als verlässlicher Speisepilz.",
      "Habichtspilz (Sarcodon imbricatus) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Habichtspilz (Sarcodon imbricatus) wird industriell als Zuchtpilz angebaut.",
      "Habichtspilz (Sarcodon imbricatus) ist ein klassischer Anfänger-Speisepilz."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 113,
    "question": "Welche Aussage(n) treffen auf den Frauen-Täubling (Russula cyanoxantha) zu?",
    "options": [
      "Frauen-Täubling (Russula cyanoxantha) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Frauen-Täubling (Russula cyanoxantha) ist tödlich giftig und enthält Amatoxine.",
      "Frauen-Täubling (Russula cyanoxantha) ist roh oder gegart ein guter Speisepilz.",
      "Frauen-Täubling (Russula cyanoxantha) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 114,
    "question": "Welche Aussage(n) treffen auf den Speise-Täubling (Russula vesca) zu?",
    "options": [
      "Speise-Täubling (Russula vesca) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Speise-Täubling (Russula vesca) bildet seine Sporen in echten Stoppeln aus.",
      "Speise-Täubling (Russula vesca) ist tödlich giftig und enthält Amatoxine.",
      "Speise-Täubling (Russula vesca) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 115,
    "question": "Welche Aussage(n) treffen auf den Parasol (Macrolepiota procera) zu?",
    "options": [
      "Parasol (Macrolepiota procera) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Parasol (Macrolepiota procera) ist roh oder gegart ein guter Speisepilz.",
      "Parasol (Macrolepiota procera) bildet seine Sporen in echten Stoppeln aus.",
      "Parasol (Macrolepiota procera) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 116,
    "question": "Welche Aussage(n) treffen auf den Safran-Schirmling (Chlorophyllum rachodes) zu?",
    "options": [
      "Safran-Schirmling (Chlorophyllum rachodes) ist ein klassischer Anfänger-Speisepilz.",
      "Safran-Schirmling (Chlorophyllum rachodes) gilt nicht als verlässlicher Speisepilz.",
      "Safran-Schirmling (Chlorophyllum rachodes) wird industriell als Zuchtpilz angebaut.",
      "Safran-Schirmling (Chlorophyllum rachodes) wirkt antibakteriell und ist roh besonders wertvoll."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 117,
    "question": "Welche Aussage(n) treffen auf den Grünling (Tricholoma equestre) zu?",
    "options": [
      "Grünling (Tricholoma equestre) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Grünling (Tricholoma equestre) gilt nicht als verlässlicher Speisepilz.",
      "Grünling (Tricholoma equestre) wird industriell als Zuchtpilz angebaut.",
      "Grünling (Tricholoma equestre) ist ein klassischer Anfänger-Speisepilz."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 118,
    "question": "Welche Aussage(n) treffen auf den Nelkenschwindling (Marasmius oreades) zu?",
    "options": [
      "Nelkenschwindling (Marasmius oreades) ist roh oder gegart ein guter Speisepilz.",
      "Nelkenschwindling (Marasmius oreades) ist tödlich giftig und enthält Amatoxine.",
      "Nelkenschwindling (Marasmius oreades) bildet seine Sporen in echten Stoppeln aus.",
      "Nelkenschwindling (Marasmius oreades) hat eine deutliche Volva (Scheide) an der Stielbasis."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 119,
    "question": "Welche Aussage(n) treffen auf den Mai-Ritterling (Calocybe gambosa) zu?",
    "options": [
      "Mai-Ritterling (Calocybe gambosa) bildet seine Sporen in echten Stoppeln aus.",
      "Mai-Ritterling (Calocybe gambosa) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Mai-Ritterling (Calocybe gambosa) ist tödlich giftig und enthält Amatoxine.",
      "Mai-Ritterling (Calocybe gambosa) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 120,
    "question": "Welche Aussage(n) treffen auf den Edel-Reizker (Lactarius deliciosus) zu?",
    "options": [
      "Edel-Reizker (Lactarius deliciosus) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Edel-Reizker (Lactarius deliciosus) ist roh oder gegart ein guter Speisepilz.",
      "Edel-Reizker (Lactarius deliciosus) ist tödlich giftig und enthält Amatoxine.",
      "Edel-Reizker (Lactarius deliciosus) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 121,
    "question": "Welche Aussage(n) treffen auf den Fichtenreizker (Lactarius deterrimus) zu?",
    "options": [
      "Fichtenreizker (Lactarius deterrimus) ist tödlich giftig und enthält Amatoxine.",
      "Fichtenreizker (Lactarius deterrimus) bildet seine Sporen in echten Stoppeln aus.",
      "Fichtenreizker (Lactarius deterrimus) ist roh oder gegart ein guter Speisepilz.",
      "Fichtenreizker (Lactarius deterrimus) hat eine deutliche Volva (Scheide) an der Stielbasis."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 122,
    "question": "Welche Aussage(n) treffen auf den Schwefelporling (Laetiporus sulphureus) zu?",
    "options": [
      "Schwefelporling (Laetiporus sulphureus) wird industriell als Zuchtpilz angebaut.",
      "Schwefelporling (Laetiporus sulphureus) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Schwefelporling (Laetiporus sulphureus) gilt nicht als verlässlicher Speisepilz.",
      "Schwefelporling (Laetiporus sulphureus) ist ein klassischer Anfänger-Speisepilz."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 123,
    "question": "Welche Aussage(n) treffen auf den Birkenporling (Fomitopsis betulina) zu?",
    "options": [
      "Birkenporling (Fomitopsis betulina) wird industriell als Zuchtpilz angebaut.",
      "Birkenporling (Fomitopsis betulina) gilt nicht als verlässlicher Speisepilz.",
      "Birkenporling (Fomitopsis betulina) ist ein klassischer Anfänger-Speisepilz.",
      "Birkenporling (Fomitopsis betulina) wirkt antibakteriell und ist roh besonders wertvoll."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 124,
    "question": "Welche Aussage(n) treffen auf den Bauchwehkoralle (Ramaria mairei) zu?",
    "options": [
      "Bauchwehkoralle (Ramaria mairei) gilt nicht als verlässlicher Speisepilz.",
      "Bauchwehkoralle (Ramaria mairei) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Bauchwehkoralle (Ramaria mairei) wird industriell als Zuchtpilz angebaut.",
      "Bauchwehkoralle (Ramaria mairei) ist ein klassischer Anfänger-Speisepilz."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 125,
    "question": "Welche Aussage(n) treffen auf den Ölbaumpilz (Omphalotus olearius) zu?",
    "options": [
      "Ölbaumpilz (Omphalotus olearius) wird industriell als Zuchtpilz angebaut.",
      "Ölbaumpilz (Omphalotus olearius) gilt nicht als verlässlicher Speisepilz.",
      "Ölbaumpilz (Omphalotus olearius) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Ölbaumpilz (Omphalotus olearius) ist ein klassischer Anfänger-Speisepilz."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 126,
    "question": "Welche Aussage(n) treffen auf den Riesenbovist (Calvatia gigantea) zu?",
    "options": [
      "Riesenbovist (Calvatia gigantea) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Riesenbovist (Calvatia gigantea) ist ein klassischer Anfänger-Speisepilz.",
      "Riesenbovist (Calvatia gigantea) gilt nicht als verlässlicher Speisepilz.",
      "Riesenbovist (Calvatia gigantea) wird industriell als Zuchtpilz angebaut."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 127,
    "question": "Welche dieser Pilze sind klassische Mykorrhiza-Bildner (Symbiose mit Bäumen)?",
    "options": [
      "Steinpilz",
      "Hallimasch",
      "Birkenpilz",
      "Nelkenschwindling"
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 128,
    "question": "Welche dieser Pilze sind Saprobionten (Zersetzer von Holz, Streu, organischem Material)?",
    "options": [
      "Perlpilz",
      "Speise-Täubling",
      "Samtfußrübling",
      "Nadelholzhäubling"
    ],
    "correctAnswers": [
      2,
      3
    ]
  },
  {
    "id": 129,
    "question": "Was trifft auf das Verwechslungspaar Stockschwämmchen / Nadelholzhäubling zu?",
    "options": [
      "Beide wachsen büschelig an Totholz; der Häubling ist tödlich.",
      "Stockschwämmchen und Nadelholzhäubling werden in der Praxis miteinander verwechselt.",
      "Stockschwämmchen und Nadelholzhäubling kommen ausschließlich im Hochgebirge oberhalb 2000 m vor.",
      "Stockschwämmchen und Nadelholzhäubling sind taxonomisch identisch."
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 130,
    "question": "Was trifft auf das Verwechslungspaar Pfifferling / Falscher Pfifferling zu?",
    "options": [
      "Beide orange; nur der echte Pfifferling hat verwachsene Leisten.",
      "Pfifferling und Falscher Pfifferling sind beide ohne Risiko roh essbar.",
      "Pfifferling und Falscher Pfifferling werden in der Praxis miteinander verwechselt.",
      "Pfifferling und Falscher Pfifferling sind taxonomisch identisch."
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 131,
    "question": "Was trifft auf das Verwechslungspaar Pfifferling / Ölbaumpilz zu?",
    "options": [
      "Pfifferling und Ölbaumpilz sind beide ohne Risiko roh essbar.",
      "Pfifferling und Ölbaumpilz werden in der Praxis miteinander verwechselt.",
      "Der Ölbaumpilz wächst büschelig und hat echte Lamellen.",
      "Pfifferling und Ölbaumpilz sind taxonomisch identisch."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 132,
    "question": "Was trifft auf das Verwechslungspaar Wiesen-Champignon / Grüner Knollenblätterpilz zu?",
    "options": [
      "Die beiden Arten unterscheiden sich nur durch ihre Größe.",
      "Wiesen-Champignon und Grüner Knollenblätterpilz werden in der Praxis miteinander verwechselt.",
      "Wiesen-Champignon und Grüner Knollenblätterpilz kommen ausschließlich im Hochgebirge oberhalb 2000 m vor.",
      "Champignon hat rosa/braune Lamellen, Knolli weiß und Volva."
    ],
    "correctAnswers": [
      1,
      3
    ]
  },
  {
    "id": 133,
    "question": "Was trifft auf das Verwechslungspaar Wiesen-Champignon / Karbol-Egerling zu?",
    "options": [
      "Karbol-Egerling färbt sich gelb und stinkt nach Tinte.",
      "Wiesen-Champignon und Karbol-Egerling werden in der Praxis miteinander verwechselt.",
      "Die beiden Arten unterscheiden sich nur durch ihre Größe.",
      "Wiesen-Champignon und Karbol-Egerling kommen ausschließlich im Hochgebirge oberhalb 2000 m vor."
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 134,
    "question": "Was trifft auf das Verwechslungspaar Steinpilz / Gallenröhrling zu?",
    "options": [
      "Steinpilz und Gallenröhrling sind beide ohne Risiko roh essbar.",
      "Steinpilz und Gallenröhrling werden in der Praxis miteinander verwechselt.",
      "Gallenröhrling bitter, rosa Röhren, dunkles grobes Netz.",
      "Die beiden Arten unterscheiden sich nur durch ihre Größe."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 135,
    "question": "Was trifft auf das Verwechslungspaar Steinpilz / Satansröhrling zu?",
    "options": [
      "Satansröhrling: rote Poren, dicker Stiel, blauendes Fleisch.",
      "Steinpilz und Satansröhrling sind beide ohne Risiko roh essbar.",
      "Steinpilz und Satansröhrling sind taxonomisch identisch.",
      "Steinpilz und Satansröhrling werden in der Praxis miteinander verwechselt."
    ],
    "correctAnswers": [
      0,
      3
    ]
  },
  {
    "id": 136,
    "question": "Was trifft auf das Verwechslungspaar Perlpilz / Pantherpilz zu?",
    "options": [
      "Pantherpilz: weiße Flocken, gerandete Knolle, kein Röten.",
      "Perlpilz und Pantherpilz werden in der Praxis miteinander verwechselt.",
      "Perlpilz und Pantherpilz kommen ausschließlich im Hochgebirge oberhalb 2000 m vor.",
      "Die beiden Arten unterscheiden sich nur durch ihre Größe."
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 137,
    "question": "Was trifft auf das Verwechslungspaar Speise-Morchel / Frühjahrslorchel zu?",
    "options": [
      "Die beiden Arten unterscheiden sich nur durch ihre Größe.",
      "Speise-Morchel und Frühjahrslorchel werden in der Praxis miteinander verwechselt.",
      "Lorchel hat hirnartige Windungen, kein Wabenmuster.",
      "Speise-Morchel und Frühjahrslorchel sind taxonomisch identisch."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 138,
    "question": "Was trifft auf das Verwechslungspaar Maronenröhrling / Gallenröhrling zu?",
    "options": [
      "Maronenröhrling und Gallenröhrling sind taxonomisch identisch.",
      "Maronenröhrling und Gallenröhrling werden in der Praxis miteinander verwechselt.",
      "Gallenröhrling rosa Röhren, dunkles Netz, bitter.",
      "Die beiden Arten unterscheiden sich nur durch ihre Größe."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 139,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Speise-Morchel?",
    "options": [
      "Speise-Morchel hat seine Hauptsaison ganzjährig, v. a. Herbst/Winter.",
      "Speise-Morchel hat seine Hauptsaison Juli – Oktober.",
      "Speise-Morchel hat seine Hauptsaison März – Mai.",
      "Hauptsaison des Speise-Morchel: April – Mai."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 140,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Spitzmorchel?",
    "options": [
      "Hauptsaison des Spitzmorchel: März – Mai.",
      "Spitzmorchel hat seine Hauptsaison ganzjährig, v. a. Herbst/Winter.",
      "Spitzmorchel hat seine Hauptsaison November – März.",
      "Spitzmorchel hat seine Hauptsaison September – November."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 141,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Mai-Ritterling?",
    "options": [
      "Mai-Ritterling hat seine Hauptsaison September – November.",
      "Mai-Ritterling hat seine Hauptsaison März – Mai.",
      "Mai-Ritterling hat seine Hauptsaison Oktober – Februar.",
      "Hauptsaison des Mai-Ritterling: Mai – Juni."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 142,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Pfifferling?",
    "options": [
      "Hauptsaison des Pfifferling: Juni – Oktober.",
      "Pfifferling hat seine Hauptsaison Oktober – Februar.",
      "Pfifferling hat seine Hauptsaison April – Mai.",
      "Pfifferling hat seine Hauptsaison August – November."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 143,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Steinpilz?",
    "options": [
      "Steinpilz hat seine Hauptsaison August – November.",
      "Steinpilz hat seine Hauptsaison März – Mai.",
      "Steinpilz hat seine Hauptsaison September – November.",
      "Hauptsaison des Steinpilz: August – Oktober."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 144,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Maronenröhrling?",
    "options": [
      "Maronenröhrling hat seine Hauptsaison August – November.",
      "Maronenröhrling hat seine Hauptsaison April – Mai.",
      "Maronenröhrling hat seine Hauptsaison März – Mai.",
      "Hauptsaison des Maronenröhrling: August – November."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 145,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Hallimasch?",
    "options": [
      "Hauptsaison des Hallimasch: September – November.",
      "Hallimasch hat seine Hauptsaison ganzjährig, v. a. Herbst/Winter.",
      "Hallimasch hat seine Hauptsaison Mai – November.",
      "Hallimasch hat seine Hauptsaison August – November."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 146,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Austernseitling?",
    "options": [
      "Austernseitling hat seine Hauptsaison Juni – Oktober.",
      "Austernseitling hat seine Hauptsaison März – Mai.",
      "Hauptsaison des Austernseitling: Oktober – Februar.",
      "Austernseitling hat seine Hauptsaison Mai – Juni."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 147,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Samtfußrübling?",
    "options": [
      "Samtfußrübling hat seine Hauptsaison Mai – Juni.",
      "Hauptsaison des Samtfußrübling: November – März.",
      "Samtfußrübling hat seine Hauptsaison August – Oktober.",
      "Samtfußrübling hat seine Hauptsaison September – November."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 148,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Judasohr?",
    "options": [
      "Judasohr hat seine Hauptsaison April – Mai.",
      "Judasohr hat seine Hauptsaison August – Oktober.",
      "Hauptsaison des Judasohr: ganzjährig, v. a. Herbst/Winter.",
      "Judasohr hat seine Hauptsaison November – März."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 149,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Parasol?",
    "options": [
      "Parasol hat seine Hauptsaison April – Mai.",
      "Parasol hat seine Hauptsaison März – Mai.",
      "Hauptsaison des Parasol: Juli – Oktober.",
      "Parasol hat seine Hauptsaison August – November."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 150,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Schopftintling?",
    "options": [
      "Schopftintling hat seine Hauptsaison August – Oktober.",
      "Hauptsaison des Schopftintling: August – November.",
      "Schopftintling hat seine Hauptsaison Oktober – Februar.",
      "Schopftintling hat seine Hauptsaison Mai – Juni."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 151,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Nelkenschwindling?",
    "options": [
      "Nelkenschwindling hat seine Hauptsaison Juli – Oktober.",
      "Nelkenschwindling hat seine Hauptsaison Oktober – Februar.",
      "Hauptsaison des Nelkenschwindling: Mai – November.",
      "Nelkenschwindling hat seine Hauptsaison August – November."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 152,
    "question": "Welche Aussagen zu Amatoxinen treffen zu?",
    "options": [
      "Hitzestabil – Kochen schützt nicht",
      "Zerstören Leberzellen",
      "Wirken meist erst nach 6–24 h Latenz",
      "Werden bei magensaftiger pH-Lage sofort zerstört"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 153,
    "difficulty": "expert",
    "question": "Welche Aussagen zu Gyromitrin (Lorchel) treffen zu?",
    "options": [
      "Wird im Körper zu Monomethylhydrazin (MMH) umgewandelt",
      "Wirkt leber-, nieren- und nervenschädigend",
      "Auch nach Trocknen nicht vollständig sicher",
      "Wird durch kurzes Anbraten vollständig zerstört"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 154,
    "question": "Welche Aussagen zu Orellanin (Cortinarius-Vergiftung) sind korrekt?",
    "options": [
      "Latenzzeit oft 3 Tage bis 3 Wochen",
      "Schädigt vor allem die Nieren",
      "Wird durch Kochen nicht zerstört",
      "Symptome treten innerhalb von Minuten auf"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 155,
    "question": "Welche Aussagen zu Ibotensäure/Muscimol (Fliegenpilz) sind korrekt?",
    "options": [
      "Wirken psychoaktiv-delirant",
      "Ibotensäure wird teilweise zu Muscimol decarboxyliert",
      "Hauptwirkstoffe des Fliegenpilzes",
      "Sind Amatoxine"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 156,
    "question": "Welche Aussagen zu Muscarin sind korrekt?",
    "options": [
      "Wirkt parasympathomimetisch",
      "Hauptwirkstoff in vielen Risspilzen (Inocybe)",
      "Symptome: Speichelfluss, Tränenfluss, Schwitzen, Bradykardie",
      "Hauptwirkstoff im Fliegenpilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 157,
    "question": "Welche Aussagen zu Hämolysinen sind korrekt?",
    "options": [
      "Vorkommen u. a. in Morcheln, Hallimasch, Perlpilz",
      "Zerstört durch ausreichendes Erhitzen",
      "Macht diese Pilze nur in rohem Zustand riskant",
      "Sind tödlich auch in gegartem Zustand"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 158,
    "difficulty": "expert",
    "question": "Welche Merkmale unterscheiden den gemeinen Steinpilz (Boletus edulis) vom bitteren Gallenröhrling (Tylopilus felleus)? (Variante 1)",
    "options": [
      "Der Gallenröhrling hat im Alter oft rosa anlaufende Röhren.",
      "Der Steinpilz hat ein dunkles Netz auf hellem Grund am Stiel.",
      "Der Gallenröhrling hat ein deutlich dunkles, grobmaschiges Netz auf hellerem Grund.",
      "Der Steinpilz hat eine weiße bis feine hellbraune Netzzeichnung, besonders im oberen Stielbereich."
    ],
    "correctAnswers": [
      0,
      2,
      3
    ]
  },
  {
    "id": 159,
    "question": "Welche der folgenden Pilze besitzen Lamellen auf der Hutunterseite? (Variante 1)",
    "options": [
      "Pfifferling (Cantharellus cibarius)",
      "Grüner Knollenblätterpilz (Amanita phalloides)",
      "Maronenröhrling (Imleria badia)",
      "Fliegenpilz (Amanita muscaria)"
    ],
    "correctAnswers": [
      1,
      3
    ]
  },
  {
    "id": 160,
    "difficulty": "expert",
    "question": "Was trifft auf den Grünen Knollenblätterpilz (Amanita phalloides) zu? (Variante 1)",
    "options": [
      "Er enthält tödliche Amatoxine, die das Lebergewebe zerstören.",
      "Das Gift wird durch gründliches Kochen oder Braten vollständig neutralisiert.",
      "Er besitzt eine deutlich sichtbare Scheide (Volva) an der Stielbasis.",
      "Er riecht im Alter oft süßlich, fast kunsthonigartig."
    ],
    "correctAnswers": [
      0,
      2,
      3
    ]
  },
  {
    "id": 161,
    "difficulty": "beginner",
    "question": "Der Pfifferling (Cantharellus cibarius) ist ein beliebter Speisepilz. Welche anatomische Struktur trägt seine Sporen? (Variante 1)",
    "options": [
      "Echte Lamellen, die sich leicht vom Hutfleisch ablösen lassen.",
      "Leisten, die fest mit dem Hutfleisch verwachsen sind und am Stiel herablaufen.",
      "Feine Poren, die im Alter gelb werden.",
      "Stoppeln, die bei Berührung leicht abbrechen."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 162,
    "question": "Welche Verfärbungen können beim Maronenröhrling (Imleria badia) bei Druck oder im Anschnitt auftreten? (Variante 1)",
    "options": [
      "Die Röhren laufen bei Druck intensiv blaugrün bis blau an.",
      "Das Fleisch im Hut kann sich im Anschnitt leicht bläulich verfärben.",
      "Der Pilz läuft an der Stielbasis sofort karminrot an.",
      "Es tritt eine weiße, scharfe Milch an den Bruchstellen aus."
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 163,
    "question": "Welche dieser Aussagen zur Ökologischen Häufigkeits-Skala sind korrekt? (Variante 1)",
    "options": [
      "Ein Pilz mit dem Status 'Gemein' kommt flächendeckend und sehr häufig vor.",
      "Arten auf der Roten Liste dürfen für den Eigenbedarf in unbegrenzten Mengen gesammelt werden.",
      "Die Häufigkeit eines Pilzes hängt stark von seinen Mykorrhiza-Partnerbäumen ab.",
      "Pilze wachsen unabhängig von Bodenfeuchtigkeit und pH-Wert überall gleich häufig."
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 164,
    "difficulty": "expert",
    "question": "Welche der folgenden Pilze sind tödlich giftig? (Variante 1)",
    "options": [
      "Nadelholzhäubling (Galerina marginata)",
      "Satansröhrling (Rubroboletus satanas)",
      "Frühlings-Knollenblätterpilz (Amanita verna)",
      "Spitzgebuckelter Raukopf (Cortinarius rubellus)"
    ],
    "correctAnswers": [
      0,
      2,
      3
    ]
  },
  {
    "id": 165,
    "difficulty": "expert",
    "question": "Der Parasol (Macrolepiota procera) ist ein geschätzter Speisepilz. Welche Merkmale sichern seine Bestimmung? (Variante 1)",
    "options": [
      "Der Stiel ist deutlich natternartig braun gemustert.",
      "Der Ring am Stiel ist dick, wattiert und lässt sich frei verschieben.",
      "Das Fleisch läuft im Anschnitt sofort blutrot an.",
      "Die Lamellen stehen frei und erreichen den Stiel nicht direkt."
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 166,
    "question": "Welche Merkmale sind typisch für den Fliegenpilz (Amanita muscaria)? (Variante 1)",
    "options": [
      "Roter Hut mit weißen Velumflocken",
      "Weiße, freie Lamellen",
      "Stiel mit Ring und knolliger Basis mit Gürtelresten",
      "Blauendes Fleisch im Anschnitt"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 167,
    "difficulty": "expert",
    "question": "Was unterscheidet den Wiesen-Champignon (Agaricus campestris) vom Karbol-Egerling (Agaricus xanthodermus)? (Variante 1)",
    "options": [
      "Karbol-Egerling färbt die Stielbasis im Anschnitt chromgelb",
      "Wiesen-Champignon riecht angenehm pilzig-anisartig",
      "Karbol-Egerling riecht nach Karbol/Tinte",
      "Wiesen-Champignon hat grüne Lamellen"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 168,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Hallimasch (Armillaria spp.) sind korrekt? (Variante 1)",
    "options": [
      "Wächst büschelig an lebendem und totem Holz",
      "Muss vor dem Verzehr gut durchgegart werden",
      "Roh verzehrt verursacht er Magen-Darm-Beschwerden",
      "Ist ein streng mykorrhizaler Symbiont der Fichte"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 169,
    "question": "Welche Pilze sind klassische Mykorrhiza-Bildner? (Variante 1)",
    "options": [
      "Steinpilz",
      "Fliegenpilz",
      "Austernseitling",
      "Pfifferling"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 170,
    "question": "Welche Pilze sind primär Saprobionten (Holz-/Streuzersetzer)? (Variante 1)",
    "options": [
      "Austernseitling (Pleurotus ostreatus)",
      "Schopftintling (Coprinus comatus)",
      "Steinpilz (Boletus edulis)",
      "Stockschwämmchen (Kuehneromyces mutabilis)"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 171,
    "difficulty": "expert",
    "question": "Welche Merkmale hat der Spitzgebuckelte Raukopf (Cortinarius rubellus)? (Variante 1)",
    "options": [
      "Enthält Orellanin mit Latenzzeit bis zu 3 Wochen",
      "Schädigt vor allem die Nieren",
      "Wird mit Pfifferlingen verwechselt",
      "Wirkung tritt innerhalb von 15 Minuten ein"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 172,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Schopftintling (Coprinus comatus) sind richtig? (Variante 1)",
    "options": [
      "Jung essbar, zerfließt im Alter zu schwarzer Tinte",
      "Mit Alkohol verzehrt unproblematisch",
      "Sollte rasch nach der Ernte verarbeitet werden",
      "Wächst gerne auf nährstoffreichen Wiesen und Wegrändern"
    ],
    "correctAnswers": [
      0,
      2,
      3
    ]
  },
  {
    "id": 173,
    "question": "Welche Pilze besitzen Stacheln/Stoppeln statt Lamellen? (Variante 1)",
    "options": [
      "Habichtspilz (Sarcodon imbricatus)",
      "Semmelstoppelpilz (Hydnum repandum)",
      "Pfifferling",
      "Steinpilz"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 174,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Frauen-Täubling (Russula cyanoxantha) sind korrekt? (Variante 1)",
    "options": [
      "Lamellen fühlen sich biegsam und speckig an",
      "Mild im Geschmack",
      "Hutfarbe oft variabel, violett-grün-bläulich",
      "Hat eine deutliche Volva am Stielgrund"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 175,
    "question": "Welche Eigenschaft trifft auf den Birkenpilz (Leccinum scabrum) zu? (Variante 1)",
    "options": [
      "Lebt in Symbiose mit Birken",
      "Stiel ist mit dunklen Schüppchen besetzt",
      "Fleisch ist weich und wird im Alter wässerig",
      "Enthält tödliche Amatoxine"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 176,
    "question": "Woran erkennt man den Rotfußröhrling (Xerocomellus chrysenteron)? (Variante 1)",
    "options": [
      "Hut reißt im Alter felderig auf, rot in den Rissen",
      "Röhren bläuen bei Druck",
      "Stiel oft rötlich überlaufen",
      "Hat einen Ring am Stiel"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 177,
    "difficulty": "expert",
    "question": "Welche Pilze sind in Mitteleuropa geschützt oder unter Schonbedingungen sammelbar? (Variante 1)",
    "options": [
      "Steinpilz (max. 2 kg/Tag, Eigenbedarf)",
      "Pfifferling (nur in geringen Mengen)",
      "Trüffel (oft streng geschützt)",
      "Hallimasch (unbeschränkt sammelbar in allen Mengen)"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 178,
    "question": "Welche Aussagen zur Speise-Morchel (Morchella esculenta) sind korrekt? (Variante 1)",
    "options": [
      "Hut wabenartig mit echten Vertiefungen",
      "Stiel innen hohl",
      "Roh giftig, muss durchgegart werden",
      "Wächst hauptsächlich im Spätherbst"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 179,
    "difficulty": "expert",
    "question": "Wie unterscheidet sich die Speise-Morchel von der giftigen Frühjahrslorchel (Gyromitra esculenta)? (Variante 1)",
    "options": [
      "Lorchel hat hirnartig gewundene Windungen statt Waben",
      "Lorchel enthält Gyromitrin, das zu MMH umgewandelt wird",
      "Morchel hat echte Hut-Waben",
      "Lorchel ist auch nach Trocknen völlig unbedenklich"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 180,
    "question": "Welche Pilze gehören zu den Röhrlingen? (Variante 1)",
    "options": [
      "Steinpilz",
      "Maronenröhrling",
      "Pfifferling",
      "Birkenpilz"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 181,
    "question": "Welche Aussagen treffen auf den Perlpilz (Amanita rubescens) zu? (Variante 1)",
    "options": [
      "Fleisch rötet im Anschnitt/an Madenfraßstellen",
      "Hat rötliche Velumflocken auf dem Hut",
      "Roh giftig, gegart essbar",
      "Enthält tödliche Amatoxine"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 182,
    "question": "Mit welchen giftigen Arten kann der Perlpilz verwechselt werden? (Variante 1)",
    "options": [
      "Pantherpilz (Amanita pantherina)",
      "Grauer Wulstling – verträglich",
      "Königs-Fliegenpilz (Amanita regalis)",
      "Wiesenchampignon"
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 183,
    "difficulty": "expert",
    "question": "Welche Merkmale hat der Pantherpilz (Amanita pantherina)? (Variante 1)",
    "options": [
      "Reinweiße Velumflocken auf braunem Hut",
      "Stielbasis mit deutlicher Bergsteigersocke (gerandete Knolle)",
      "Fleisch rötet im Anschnitt",
      "Enthält Ibotensäure und Muscimol"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 184,
    "question": "Welche Sporenpulverfarben sind typisch? (Variante 1)",
    "options": [
      "Champignons: schokoladenbraun",
      "Knollenblätterpilze: weiß",
      "Risspilze: erdbraun",
      "Steinpilz: schwarz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 185,
    "question": "Welche Aussagen zum Sammeln und Lagern sind korrekt? (Variante 1)",
    "options": [
      "Korb statt Plastiktüte verwenden",
      "Pilze möglichst kühl und luftig transportieren",
      "Am gleichen Tag verarbeiten",
      "Wochenlang ungekühlt aufbewahren"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 186,
    "question": "Welche Pilze sind typische Frühjahrsarten? (Variante 1)",
    "options": [
      "Speise-Morchel",
      "Mai-Ritterling",
      "Spitzmorchel",
      "Steinpilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 187,
    "question": "Welche Pilze fruktifizieren typischerweise im Spätherbst bis Winter? (Variante 1)",
    "options": [
      "Austernseitling",
      "Samtfußrübling (Flammulina velutipes)",
      "Judasohr (Auricularia auricula-judae)",
      "Speise-Morchel"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 188,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Grünling (Tricholoma equestre) sind richtig? (Variante 1)",
    "options": [
      "Früher als Speisepilz beliebt",
      "Heute wegen rhabdomyolytischer Wirkung gemieden",
      "Wächst in sandigen Kiefernwäldern",
      "Ist für Anfänger uneingeschränkt empfohlen"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 189,
    "question": "Welche Pilze sind klassische Doppelgänger des Pfifferlings? (Variante 1)",
    "options": [
      "Falscher Pfifferling (Hygrophoropsis aurantiaca)",
      "Ölbaumpilz (Omphalotus olearius)",
      "Stockschwämmchen",
      "Habichtspilz"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 190,
    "difficulty": "expert",
    "question": "Welche Merkmale hat der Falsche Pfifferling (Hygrophoropsis aurantiaca)? (Variante 1)",
    "options": [
      "Echte, gabelig geteilte Lamellen (nicht Leisten)",
      "Weiches Fleisch",
      "Wächst auf Nadelstreu/Totholz",
      "Fest verwachsene Leisten wie beim echten Pfifferling"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 191,
    "question": "Welche Speisepilze haben Röhren UND einen Ring am Stiel? (Variante 1)",
    "options": [
      "Goldröhrling (Suillus grevillei)",
      "Butterpilz (Suillus luteus)",
      "Steinpilz",
      "Maronenröhrling"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 192,
    "question": "Welche Pilze enthalten Hämolysine, die durch Erhitzen zerstört werden? (Variante 1)",
    "options": [
      "Perlpilz",
      "Hallimasch",
      "Morchel",
      "Knollenblätterpilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 193,
    "difficulty": "beginner",
    "question": "Wie lange dauert die Latenzphase typischerweise bei einer Knollenblätterpilz-Vergiftung? (Variante 1)",
    "options": [
      "6 bis 24 Stunden",
      "Wenige Minuten",
      "Sofort nach Verzehr",
      "Mehrere Wochen"
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 194,
    "question": "Welche Symptome sind typisch für das Phalloides-Syndrom? (Variante 1)",
    "options": [
      "Heftiges Erbrechen und Durchfall nach Latenzphase",
      "Trügerische Besserungsphase",
      "Leber- und Nierenversagen",
      "Sofortige Halluzinationen ohne Magenbeschwerden"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 195,
    "question": "Welche Pilze gelten als gute Anfänger-Speisepilze in Mitteleuropa? (Variante 1)",
    "options": [
      "Maronenröhrling",
      "Pfifferling",
      "Steinpilz",
      "Spitzgebuckelter Raukopf"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 196,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Judasohr (Auricularia auricula-judae) sind korrekt? (Variante 1)",
    "options": [
      "Wächst vor allem an totem Holunder",
      "Gelatinöse, ohrförmige Fruchtkörper",
      "Wird in der asiatischen Küche oft als Mu-Err verwendet",
      "Ist roh stark giftig und tödlich"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 197,
    "difficulty": "expert",
    "question": "Welche Merkmale treffen auf den Austernseitling (Pleurotus ostreatus) zu? (Variante 1)",
    "options": [
      "Wächst büschelig an Laubholz",
      "Lamellen laufen weit am seitlichen Stiel herab",
      "Saprobiont auf Totholz, Schwächeparasit",
      "Mykorrhizapilz an Eiche"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 198,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Schwefelporling (Laetiporus sulphureus) sind richtig? (Variante 1)",
    "options": [
      "Junges Fleisch ist gut essbar",
      "An alten Eichen sind die Fruchtkörper oft hart und ungenießbar",
      "Auf bestimmten Bäumen (z. B. Robinie, Eibe) kann er Unverträglichkeiten auslösen",
      "Wächst typischerweise unterirdisch wie Trüffel"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 199,
    "difficulty": "expert",
    "question": "Welche Aussagen zu Bovisten und Stäublingen treffen zu? (Variante 1)",
    "options": [
      "Jung mit weißem, festem Fleisch essbar",
      "Innenfleisch darf nicht gelblich oder violett verfärbt sein",
      "Verwechslungsgefahr mit jungen Knollenblätterpilzen – immer längs aufschneiden",
      "Reife, sporenstaubige Fruchtkörper sind besonders schmackhaft"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 200,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Karbol-Egerling (Agaricus xanthodermus) sind korrekt? (Variante 1)",
    "options": [
      "Stielbasis verfärbt sich gelb auf Druck",
      "Geruch nach Tinte / Karbol / Apotheke",
      "Verursacht Magen-Darm-Beschwerden",
      "Ist ein hervorragender Speisepilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 201,
    "question": "Welche Pilze enthalten Muscarin in toxikologisch relevanter Menge? (Variante 1)",
    "options": [
      "Ziegelroter Risspilz (Inocybe erubescens)",
      "Trichterlinge der Gattung Clitocybe",
      "Fliegenpilz – Hauptwirkstoff Muscarin",
      "Steinpilz"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 202,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Fliegenpilz (Amanita muscaria) sind toxikologisch korrekt? (Variante 1)",
    "options": [
      "Hauptwirkstoffe sind Ibotensäure und Muscimol",
      "Wirkt psychoaktiv-delirant",
      "Muscarin ist nicht der Hauptwirkstoff",
      "Wirkt über Amatoxine wie der Knollenblätterpilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 203,
    "difficulty": "expert",
    "question": "Welche Pilze sind essbar, aber leicht mit tödlichen Arten verwechselbar? (Variante 1)",
    "options": [
      "Stockschwämmchen (mit Gifthäubling)",
      "Wiesen-Champignon (mit Knollenblätterpilzen)",
      "Perlpilz (mit Pantherpilz)",
      "Pfifferling (mit Knollenblätterpilz)"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 204,
    "difficulty": "expert",
    "question": "Welche der folgenden Aussagen zur Pilzbestimmungs-App-Nutzung sind verantwortungsvoll? (Variante 1)",
    "options": [
      "KI-Bestimmung ist nur Vorschlag, nie Verzehrfreigabe",
      "Unsichere Funde stehenlassen oder vom Sachverständigen prüfen lassen",
      "Im Zweifel an die Pilzberatungsstelle wenden",
      "Apps ersetzen die Pilzkontrolle vollständig"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 205,
    "difficulty": "expert",
    "question": "Welche Aussagen zu den Lamellen des Knollenblätterpilzes sind richtig? (Variante 1)",
    "options": [
      "Lamellen sind weiß, auch im Alter",
      "Lamellen stehen frei vom Stiel",
      "Lamellen werden im Alter schokoladenbraun (wie Champignon)",
      "Lamellen sind dicht stehend"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ]
  },
  {
    "id": 206,
    "difficulty": "expert",
    "question": "Welche Merkmale unterscheiden den Wiesenchampignon vom Knollenblätterpilz? (Variante 1)",
    "options": [
      "Wiesenchampignon hat rosa bis braune Lamellen, nie weiß",
      "Knollenblätterpilz hat Volva am Stielgrund, Champignon nicht",
      "Knollenblätterpilz hat weiße Lamellen",
      "Beide haben eine knollige Stielbasis mit häutiger Volva"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 207,
    "question": "Welche Pilze gehören zur Gattung Russula (Täublinge)? (Variante 1)",
    "options": [
      "Frauen-Täubling",
      "Speise-Täubling",
      "Pfifferling",
      "Fliegenpilz"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 208,
    "difficulty": "expert",
    "question": "Was ist beim Sammeln auf nährstoffbelasteten Standorten zu beachten? (Variante 1)",
    "options": [
      "Champignons reichern Schwermetalle an",
      "Maronenröhrling kann Cäsium-137 anreichern",
      "Stark befahrene Straßenränder meiden",
      "Industrieparks sind ideale Sammelorte"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 209,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Ölbaumpilz (Omphalotus olearius) sind richtig? (Variante 1)",
    "options": [
      "Wächst büschelig an Stümpfen, oft Eiche/Olive",
      "Hat echte, scharfkantige Lamellen (nicht Leisten)",
      "Wird mit Pfifferling verwechselt",
      "Ist ein hervorragender Speisepilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 210,
    "question": "Welche Pilze sind klassische Korallenpilze? (Variante 1)",
    "options": [
      "Bauchwehkoralle (Ramaria mairei)",
      "Hahnenkamm/Korallenpilze (Ramaria spp.)",
      "Pfifferling",
      "Fliegenpilz"
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 211,
    "question": "Welche Aussagen über Mykorrhiza sind richtig? (Variante 1)",
    "options": [
      "Pilz liefert Wasser und Mineralien",
      "Baum liefert Zucker aus Photosynthese",
      "Mykorrhiza-Pilze lassen sich oft schlecht kultivieren",
      "Mykorrhiza ist eine Parasit-Beziehung"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 212,
    "question": "Welche dieser Pilze sind klassische Speisepilze auf Wiesen? (Variante 1)",
    "options": [
      "Wiesen-Champignon",
      "Schopftintling",
      "Nelkenschwindling (Marasmius oreades)",
      "Fliegenpilz"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 213,
    "question": "Welche Aussagen treffen auf den Nelkenschwindling (Marasmius oreades) zu? (Variante 1)",
    "options": [
      "Wächst in Hexenringen auf Wiesen",
      "Hat zähen Stiel, nur Hüte verwenden",
      "Aromatisch-süßlich riechend",
      "Tödlich giftig"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 214,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Maipilz/Mai-Ritterling (Calocybe gambosa) sind korrekt? (Variante 1)",
    "options": [
      "Erscheint im Frühjahr (April–Juni)",
      "Riecht mehlartig-gurkenartig",
      "Wächst gerne in Hexenringen an Waldrändern",
      "Wächst nur tief unter der Erde wie Trüffel"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 215,
    "question": "Welche Aussagen treffen auf den Hexen-Röhrling (Neoboletus erythropus) zu? (Variante 1)",
    "options": [
      "Roh giftig, gegart guter Speisepilz",
      "Röhren und Fleisch bläuen intensiv",
      "Stiel rot punktiert, ohne Netz",
      "Hat einen häutigen Ring am Stiel"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 216,
    "difficulty": "expert",
    "question": "Welche Aussagen zum Gallenröhrling (Tylopilus felleus) sind korrekt? (Variante 1)",
    "options": [
      "Geschmack extrem bitter, schon kleine Mengen verderben ein Gericht",
      "Röhren werden im Alter rosa",
      "Netz auf dem Stiel ist grobmaschig und dunkel",
      "Tödlich giftig"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 217,
    "question": "Welche Aussagen zum Satansröhrling (Rubroboletus satanas) sind korrekt? (Variante 1)",
    "options": [
      "Hut hell, fast kalkweiß",
      "Poren blutrot",
      "Stiel bauchig, rot genetzt",
      "Roh ungiftig und mild"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 218,
    "question": "Welche Pilze wachsen typischerweise auf/an Birken? (Variante 1)",
    "options": [
      "Birkenpilz",
      "Birkenporling (Fomitopsis betulina)",
      "Fliegenpilz (oft unter Birke)",
      "Steinpilz (vor allem unter Birke und nirgendwo sonst)"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 219,
    "question": "Welche Aussagen zum Maronenröhrling und Strahlung sind korrekt? (Variante 1)",
    "options": [
      "Reichert Cäsium-137 deutlich an",
      "In stark belasteten Gebieten Verzehr einschränken",
      "Belastung variiert regional stark",
      "Ist generell radioaktiv-frei"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 220,
    "difficulty": "expert",
    "question": "Welche dieser Aussagen über Pilzgifte stimmen? (Variante 1)",
    "options": [
      "Amatoxine sind hitzestabil",
      "Gyromitrin wird teilweise beim Trocknen abgebaut, bleibt aber gefährlich",
      "Muscarin wirkt parasympathomimetisch",
      "Knollenblätterpilz-Gift wird durch Kochen zerstört"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 221,
    "question": "Welche Pilze kann man in der Regel nicht roh essen? (Variante 1)",
    "options": [
      "Hallimasch",
      "Morchel",
      "Perlpilz",
      "Zuchtchampignon (besser gegart, aber roh in kleinen Mengen tolerabel)"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 222,
    "difficulty": "expert",
    "question": "Welche Aussagen zur Gattung Cortinarius (Schleierlinge) treffen zu? (Variante 1)",
    "options": [
      "Sehr artenreich, schwer bestimmbar",
      "Enthält tödliche Arten wie Orellanus und rubellus",
      "Für Anfänger generell ungeeignet",
      "Eindeutig sicher essbar bei jeder Art"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 223,
    "question": "Welche dieser Speisepilze sind typische Mykorrhiza-Partner der Fichte? (Variante 1)",
    "options": [
      "Steinpilz",
      "Maronenröhrling",
      "Fichtenreizker (Lactarius deterrimus)",
      "Austernseitling"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 224,
    "question": "Welche Aussagen zu Reizkern (Lactarius spp.) sind richtig? (Variante 1)",
    "options": [
      "Edel-Reizker hat orangefarbene Milch",
      "Echte Reizker werden gerne in Suppen verwendet",
      "Milch verfärbt sich teils grün",
      "Alle Reizker sind tödlich giftig"
    ],
    "correctAnswers": [
      0,
      1,
      2
    ]
  },
  {
    "id": 225,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Röhrlinge? (Variante 1)",
    "options": [
      "Kegelhütiger Knollenblätterpilz (Amanita virosa)",
      "Schopftintling (Coprinus comatus)",
      "Maronenröhrling (Imleria badia)",
      "Steinpilz (Boletus edulis)"
    ],
    "correctAnswers": [
      2,
      3
    ]
  },
  {
    "id": 226,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Lamellenpilze? (Variante 1)",
    "options": [
      "Steinpilz (Boletus edulis)",
      "Frauen-Täubling (Russula cyanoxantha)",
      "Ziegelroter Risspilz (Inocybe erubescens)",
      "Maronenröhrling (Imleria badia)"
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 227,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Stoppelpilze? (Variante 1)",
    "options": [
      "Semmelstoppelpilz (Hydnum repandum)",
      "Karbol-Egerling (Agaricus xanthodermus)",
      "Habichtspilz (Sarcodon imbricatus)",
      "Ölbaumpilz (Omphalotus olearius)"
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 228,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Leistenpilze? (Variante 1)",
    "options": [
      "Spitzmorchel (Morchella conica)",
      "Trompetenpfifferling (Craterellus tubaeformis)",
      "Perlpilz (Amanita rubescens)",
      "Pfifferling (Cantharellus cibarius)"
    ],
    "correctAnswers": [
      1,
      3
    ]
  },
  {
    "id": 229,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Schlauchpilze? (Variante 1)",
    "options": [
      "Grüner Knollenblätterpilz (Amanita phalloides)",
      "Speise-Morchel (Morchella esculenta)",
      "Gallenröhrling (Tylopilus felleus)",
      "Spitzmorchel (Morchella conica)"
    ],
    "correctAnswers": [
      1,
      3
    ]
  },
  {
    "id": 230,
    "difficulty": "beginner",
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Korallenpilze? (Variante 1)",
    "options": [
      "Steinpilz (Boletus edulis)",
      "Grauer Wulstling (Amanita excelsa)",
      "Frühjahrslorchel (Gyromitra esculenta)",
      "Bauchwehkoralle (Ramaria mairei)"
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 231,
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Porlinge? (Variante 1)",
    "options": [
      "Grüner Knollenblätterpilz (Amanita phalloides)",
      "Birkenporling (Fomitopsis betulina)",
      "Schwefelporling (Laetiporus sulphureus)",
      "Wiesen-Champignon (Agaricus campestris)"
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 232,
    "difficulty": "beginner",
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Gallertpilze? (Variante 1)",
    "options": [
      "Maronenröhrling (Imleria badia)",
      "Judasohr (Auricularia auricula-judae)",
      "Satansröhrling (Rubroboletus satanas)",
      "Goldröhrling (Suillus grevillei)"
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 233,
    "difficulty": "beginner",
    "question": "Welche der folgenden Pilze gehören zur Gruppe der Bauchpilze? (Variante 1)",
    "options": [
      "Riesenbovist (Calvatia gigantea)",
      "Frühlings-Knollenblätterpilz (Amanita verna)",
      "Steinpilz (Boletus edulis)",
      "Ölbaumpilz (Omphalotus olearius)"
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 234,
    "question": "Welche Aussage(n) treffen auf den Steinpilz (Boletus edulis) zu? (Variante 1)",
    "options": [
      "Steinpilz (Boletus edulis) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Steinpilz (Boletus edulis) ist tödlich giftig und enthält Amatoxine.",
      "Steinpilz (Boletus edulis) bildet seine Sporen in echten Stoppeln aus.",
      "Steinpilz (Boletus edulis) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 235,
    "question": "Welche Aussage(n) treffen auf den Maronenröhrling (Imleria badia) zu? (Variante 1)",
    "options": [
      "Maronenröhrling (Imleria badia) bildet seine Sporen in echten Stoppeln aus.",
      "Maronenröhrling (Imleria badia) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Maronenröhrling (Imleria badia) ist roh oder gegart ein guter Speisepilz.",
      "Maronenröhrling (Imleria badia) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 236,
    "question": "Welche Aussage(n) treffen auf den Birkenpilz (Leccinum scabrum) zu? (Variante 1)",
    "options": [
      "Birkenpilz (Leccinum scabrum) ist roh oder gegart ein guter Speisepilz.",
      "Birkenpilz (Leccinum scabrum) bildet seine Sporen in echten Stoppeln aus.",
      "Birkenpilz (Leccinum scabrum) ist tödlich giftig und enthält Amatoxine.",
      "Birkenpilz (Leccinum scabrum) hat eine deutliche Volva (Scheide) an der Stielbasis."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 237,
    "question": "Welche Aussage(n) treffen auf den Rotkappe (Leccinum aurantiacum) zu? (Variante 1)",
    "options": [
      "Rotkappe (Leccinum aurantiacum) bildet seine Sporen in echten Stoppeln aus.",
      "Rotkappe (Leccinum aurantiacum) ist tödlich giftig und enthält Amatoxine.",
      "Rotkappe (Leccinum aurantiacum) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Rotkappe (Leccinum aurantiacum) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 238,
    "question": "Welche Aussage(n) treffen auf den Butterpilz (Suillus luteus) zu? (Variante 1)",
    "options": [
      "Butterpilz (Suillus luteus) ist tödlich giftig und enthält Amatoxine.",
      "Butterpilz (Suillus luteus) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Butterpilz (Suillus luteus) bildet seine Sporen in echten Stoppeln aus.",
      "Butterpilz (Suillus luteus) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 239,
    "question": "Welche Aussage(n) treffen auf den Goldröhrling (Suillus grevillei) zu? (Variante 1)",
    "options": [
      "Goldröhrling (Suillus grevillei) bildet seine Sporen in echten Stoppeln aus.",
      "Goldröhrling (Suillus grevillei) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Goldröhrling (Suillus grevillei) ist roh oder gegart ein guter Speisepilz.",
      "Goldröhrling (Suillus grevillei) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 240,
    "question": "Welche Aussage(n) treffen auf den Hexen-Röhrling (Neoboletus erythropus) zu? (Variante 1)",
    "options": [
      "Hexen-Röhrling (Neoboletus erythropus) ist roh besonders aromatisch und unbedenklich.",
      "Hexen-Röhrling (Neoboletus erythropus) enthält tödliche Amatoxine wie der Knollenblätterpilz.",
      "Hexen-Röhrling (Neoboletus erythropus) sollte niemals roh verzehrt werden.",
      "Hexen-Röhrling (Neoboletus erythropus) ist nur ausreichend erhitzt verträglich."
    ],
    "correctAnswers": [
      2,
      3
    ]
  },
  {
    "id": 241,
    "question": "Welche Aussage(n) treffen auf den Gallenröhrling (Tylopilus felleus) zu? (Variante 1)",
    "options": [
      "Gallenröhrling (Tylopilus felleus) ist ein klassischer Anfänger-Speisepilz.",
      "Gallenröhrling (Tylopilus felleus) gilt nicht als verlässlicher Speisepilz.",
      "Gallenröhrling (Tylopilus felleus) wird industriell als Zuchtpilz angebaut.",
      "Gallenröhrling (Tylopilus felleus) wirkt antibakteriell und ist roh besonders wertvoll."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 242,
    "question": "Welche Aussage(n) treffen auf den Satansröhrling (Rubroboletus satanas) zu? (Variante 1)",
    "options": [
      "Satansröhrling (Rubroboletus satanas) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Satansröhrling (Rubroboletus satanas) gilt nicht als verlässlicher Speisepilz.",
      "Satansröhrling (Rubroboletus satanas) ist ein klassischer Anfänger-Speisepilz.",
      "Satansröhrling (Rubroboletus satanas) wird industriell als Zuchtpilz angebaut."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 243,
    "question": "Welche Aussage(n) treffen auf den Pfifferling (Cantharellus cibarius) zu? (Variante 1)",
    "options": [
      "Pfifferling (Cantharellus cibarius) ist tödlich giftig und enthält Amatoxine.",
      "Pfifferling (Cantharellus cibarius) bildet seine Sporen in echten Stoppeln aus.",
      "Pfifferling (Cantharellus cibarius) ist roh oder gegart ein guter Speisepilz.",
      "Pfifferling (Cantharellus cibarius) hat eine deutliche Volva (Scheide) an der Stielbasis."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 244,
    "question": "Welche Aussage(n) treffen auf den Trompetenpfifferling (Craterellus tubaeformis) zu? (Variante 1)",
    "options": [
      "Trompetenpfifferling (Craterellus tubaeformis) ist tödlich giftig und enthält Amatoxine.",
      "Trompetenpfifferling (Craterellus tubaeformis) ist roh oder gegart ein guter Speisepilz.",
      "Trompetenpfifferling (Craterellus tubaeformis) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Trompetenpfifferling (Craterellus tubaeformis) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 245,
    "question": "Welche Aussage(n) treffen auf den Falscher Pfifferling (Hygrophoropsis aurantiaca) zu? (Variante 1)",
    "options": [
      "Falscher Pfifferling (Hygrophoropsis aurantiaca) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Falscher Pfifferling (Hygrophoropsis aurantiaca) ist ein klassischer Anfänger-Speisepilz.",
      "Falscher Pfifferling (Hygrophoropsis aurantiaca) gilt nicht als verlässlicher Speisepilz.",
      "Falscher Pfifferling (Hygrophoropsis aurantiaca) wird industriell als Zuchtpilz angebaut."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 246,
    "question": "Welche Aussage(n) treffen auf den Grüner Knollenblätterpilz (Amanita phalloides) zu? (Variante 1)",
    "options": [
      "Grüner Knollenblätterpilz (Amanita phalloides) wird in der Lebensmittelindustrie kultiviert.",
      "Grüner Knollenblätterpilz (Amanita phalloides) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Grüner Knollenblätterpilz (Amanita phalloides) verliert sein Gift beim Kochen vollständig.",
      "Grüner Knollenblätterpilz (Amanita phalloides) ist tödlich giftig und darf nicht verzehrt werden."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 247,
    "question": "Welche Aussage(n) treffen auf den Frühlings-Knollenblätterpilz (Amanita verna) zu? (Variante 1)",
    "options": [
      "Frühlings-Knollenblätterpilz (Amanita verna) wird in der Lebensmittelindustrie kultiviert.",
      "Frühlings-Knollenblätterpilz (Amanita verna) ist tödlich giftig und darf nicht verzehrt werden.",
      "Frühlings-Knollenblätterpilz (Amanita verna) verliert sein Gift beim Kochen vollständig.",
      "Frühlings-Knollenblätterpilz (Amanita verna) gilt als ausgezeichneter Speisepilz für Anfänger."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 248,
    "question": "Welche Aussage(n) treffen auf den Kegelhütiger Knollenblätterpilz (Amanita virosa) zu? (Variante 1)",
    "options": [
      "Kegelhütiger Knollenblätterpilz (Amanita virosa) verliert sein Gift beim Kochen vollständig.",
      "Kegelhütiger Knollenblätterpilz (Amanita virosa) ist tödlich giftig und darf nicht verzehrt werden.",
      "Kegelhütiger Knollenblätterpilz (Amanita virosa) wird in der Lebensmittelindustrie kultiviert.",
      "Kegelhütiger Knollenblätterpilz (Amanita virosa) gilt als ausgezeichneter Speisepilz für Anfänger."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 249,
    "question": "Welche Aussage(n) treffen auf den Fliegenpilz (Amanita muscaria) zu? (Variante 1)",
    "options": [
      "Fliegenpilz (Amanita muscaria) ist ein klassischer Anfänger-Speisepilz.",
      "Fliegenpilz (Amanita muscaria) gilt nicht als verlässlicher Speisepilz.",
      "Fliegenpilz (Amanita muscaria) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Fliegenpilz (Amanita muscaria) wird industriell als Zuchtpilz angebaut."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 250,
    "question": "Welche Aussage(n) treffen auf den Pantherpilz (Amanita pantherina) zu? (Variante 1)",
    "options": [
      "Pantherpilz (Amanita pantherina) ist ein klassischer Anfänger-Speisepilz.",
      "Pantherpilz (Amanita pantherina) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Pantherpilz (Amanita pantherina) wird industriell als Zuchtpilz angebaut.",
      "Pantherpilz (Amanita pantherina) gilt nicht als verlässlicher Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 251,
    "question": "Welche Aussage(n) treffen auf den Perlpilz (Amanita rubescens) zu? (Variante 1)",
    "options": [
      "Perlpilz (Amanita rubescens) ist roh besonders aromatisch und unbedenklich.",
      "Perlpilz (Amanita rubescens) ist nur ausreichend erhitzt verträglich.",
      "Perlpilz (Amanita rubescens) sollte niemals roh verzehrt werden.",
      "Perlpilz (Amanita rubescens) enthält tödliche Amatoxine wie der Knollenblätterpilz."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 252,
    "question": "Welche Aussage(n) treffen auf den Grauer Wulstling (Amanita excelsa) zu? (Variante 1)",
    "options": [
      "Grauer Wulstling (Amanita excelsa) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Grauer Wulstling (Amanita excelsa) ist roh oder gegart ein guter Speisepilz.",
      "Grauer Wulstling (Amanita excelsa) bildet seine Sporen in echten Stoppeln aus.",
      "Grauer Wulstling (Amanita excelsa) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 253,
    "question": "Welche Aussage(n) treffen auf den Wiesen-Champignon (Agaricus campestris) zu? (Variante 1)",
    "options": [
      "Wiesen-Champignon (Agaricus campestris) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Wiesen-Champignon (Agaricus campestris) ist roh oder gegart ein guter Speisepilz.",
      "Wiesen-Champignon (Agaricus campestris) ist tödlich giftig und enthält Amatoxine.",
      "Wiesen-Champignon (Agaricus campestris) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 254,
    "question": "Welche Aussage(n) treffen auf den Karbol-Egerling (Agaricus xanthodermus) zu? (Variante 1)",
    "options": [
      "Karbol-Egerling (Agaricus xanthodermus) ist ein klassischer Anfänger-Speisepilz.",
      "Karbol-Egerling (Agaricus xanthodermus) wird industriell als Zuchtpilz angebaut.",
      "Karbol-Egerling (Agaricus xanthodermus) gilt nicht als verlässlicher Speisepilz.",
      "Karbol-Egerling (Agaricus xanthodermus) wirkt antibakteriell und ist roh besonders wertvoll."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 255,
    "question": "Welche Aussage(n) treffen auf den Schopftintling (Coprinus comatus) zu? (Variante 1)",
    "options": [
      "Schopftintling (Coprinus comatus) ist tödlich giftig und enthält Amatoxine.",
      "Schopftintling (Coprinus comatus) ist roh oder gegart ein guter Speisepilz.",
      "Schopftintling (Coprinus comatus) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Schopftintling (Coprinus comatus) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 256,
    "question": "Welche Aussage(n) treffen auf den Hallimasch (Armillaria mellea) zu? (Variante 1)",
    "options": [
      "Hallimasch (Armillaria mellea) enthält tödliche Amatoxine wie der Knollenblätterpilz.",
      "Hallimasch (Armillaria mellea) ist nur ausreichend erhitzt verträglich.",
      "Hallimasch (Armillaria mellea) ist roh besonders aromatisch und unbedenklich.",
      "Hallimasch (Armillaria mellea) sollte niemals roh verzehrt werden."
    ],
    "correctAnswers": [
      1,
      3
    ]
  },
  {
    "id": 257,
    "question": "Welche Aussage(n) treffen auf den Stockschwämmchen (Kuehneromyces mutabilis) zu? (Variante 1)",
    "options": [
      "Stockschwämmchen (Kuehneromyces mutabilis) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Stockschwämmchen (Kuehneromyces mutabilis) bildet seine Sporen in echten Stoppeln aus.",
      "Stockschwämmchen (Kuehneromyces mutabilis) ist roh oder gegart ein guter Speisepilz.",
      "Stockschwämmchen (Kuehneromyces mutabilis) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 258,
    "question": "Welche Aussage(n) treffen auf den Nadelholzhäubling (Galerina marginata) zu? (Variante 1)",
    "options": [
      "Nadelholzhäubling (Galerina marginata) ist tödlich giftig und darf nicht verzehrt werden.",
      "Nadelholzhäubling (Galerina marginata) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Nadelholzhäubling (Galerina marginata) wird in der Lebensmittelindustrie kultiviert.",
      "Nadelholzhäubling (Galerina marginata) verliert sein Gift beim Kochen vollständig."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 259,
    "question": "Welche Aussage(n) treffen auf den Spitzgebuckelter Raukopf (Cortinarius rubellus) zu? (Variante 1)",
    "options": [
      "Spitzgebuckelter Raukopf (Cortinarius rubellus) wird in der Lebensmittelindustrie kultiviert.",
      "Spitzgebuckelter Raukopf (Cortinarius rubellus) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Spitzgebuckelter Raukopf (Cortinarius rubellus) verliert sein Gift beim Kochen vollständig.",
      "Spitzgebuckelter Raukopf (Cortinarius rubellus) ist tödlich giftig und darf nicht verzehrt werden."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 260,
    "question": "Welche Aussage(n) treffen auf den Orangefuchsiger Raukopf (Cortinarius orellanus) zu? (Variante 1)",
    "options": [
      "Orangefuchsiger Raukopf (Cortinarius orellanus) ist tödlich giftig und darf nicht verzehrt werden.",
      "Orangefuchsiger Raukopf (Cortinarius orellanus) verliert sein Gift beim Kochen vollständig.",
      "Orangefuchsiger Raukopf (Cortinarius orellanus) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Orangefuchsiger Raukopf (Cortinarius orellanus) wird in der Lebensmittelindustrie kultiviert."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 261,
    "question": "Welche Aussage(n) treffen auf den Ziegelroter Risspilz (Inocybe erubescens) zu? (Variante 1)",
    "options": [
      "Ziegelroter Risspilz (Inocybe erubescens) wird in der Lebensmittelindustrie kultiviert.",
      "Ziegelroter Risspilz (Inocybe erubescens) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Ziegelroter Risspilz (Inocybe erubescens) verliert sein Gift beim Kochen vollständig.",
      "Ziegelroter Risspilz (Inocybe erubescens) ist tödlich giftig und darf nicht verzehrt werden."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 262,
    "question": "Welche Aussage(n) treffen auf den Speise-Morchel (Morchella esculenta) zu? (Variante 1)",
    "options": [
      "Speise-Morchel (Morchella esculenta) enthält tödliche Amatoxine wie der Knollenblätterpilz.",
      "Speise-Morchel (Morchella esculenta) sollte niemals roh verzehrt werden.",
      "Speise-Morchel (Morchella esculenta) ist nur ausreichend erhitzt verträglich.",
      "Speise-Morchel (Morchella esculenta) ist roh besonders aromatisch und unbedenklich."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 263,
    "question": "Welche Aussage(n) treffen auf den Spitzmorchel (Morchella conica) zu? (Variante 1)",
    "options": [
      "Spitzmorchel (Morchella conica) ist nur ausreichend erhitzt verträglich.",
      "Spitzmorchel (Morchella conica) ist roh besonders aromatisch und unbedenklich.",
      "Spitzmorchel (Morchella conica) sollte niemals roh verzehrt werden.",
      "Spitzmorchel (Morchella conica) enthält tödliche Amatoxine wie der Knollenblätterpilz."
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 264,
    "question": "Welche Aussage(n) treffen auf den Frühjahrslorchel (Gyromitra esculenta) zu? (Variante 1)",
    "options": [
      "Frühjahrslorchel (Gyromitra esculenta) verliert sein Gift beim Kochen vollständig.",
      "Frühjahrslorchel (Gyromitra esculenta) wird in der Lebensmittelindustrie kultiviert.",
      "Frühjahrslorchel (Gyromitra esculenta) gilt als ausgezeichneter Speisepilz für Anfänger.",
      "Frühjahrslorchel (Gyromitra esculenta) ist tödlich giftig und darf nicht verzehrt werden."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 265,
    "question": "Welche Aussage(n) treffen auf den Austernseitling (Pleurotus ostreatus) zu? (Variante 1)",
    "options": [
      "Austernseitling (Pleurotus ostreatus) ist tödlich giftig und enthält Amatoxine.",
      "Austernseitling (Pleurotus ostreatus) ist roh oder gegart ein guter Speisepilz.",
      "Austernseitling (Pleurotus ostreatus) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Austernseitling (Pleurotus ostreatus) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 266,
    "question": "Welche Aussage(n) treffen auf den Samtfußrübling (Flammulina velutipes) zu? (Variante 1)",
    "options": [
      "Samtfußrübling (Flammulina velutipes) bildet seine Sporen in echten Stoppeln aus.",
      "Samtfußrübling (Flammulina velutipes) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Samtfußrübling (Flammulina velutipes) ist roh oder gegart ein guter Speisepilz.",
      "Samtfußrübling (Flammulina velutipes) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 267,
    "question": "Welche Aussage(n) treffen auf den Judasohr (Auricularia auricula-judae) zu? (Variante 1)",
    "options": [
      "Judasohr (Auricularia auricula-judae) ist roh oder gegart ein guter Speisepilz.",
      "Judasohr (Auricularia auricula-judae) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Judasohr (Auricularia auricula-judae) ist tödlich giftig und enthält Amatoxine.",
      "Judasohr (Auricularia auricula-judae) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 268,
    "question": "Welche Aussage(n) treffen auf den Semmelstoppelpilz (Hydnum repandum) zu? (Variante 1)",
    "options": [
      "Semmelstoppelpilz (Hydnum repandum) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Semmelstoppelpilz (Hydnum repandum) bildet seine Sporen in echten Stoppeln aus.",
      "Semmelstoppelpilz (Hydnum repandum) ist tödlich giftig und enthält Amatoxine.",
      "Semmelstoppelpilz (Hydnum repandum) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 269,
    "question": "Welche Aussage(n) treffen auf den Habichtspilz (Sarcodon imbricatus) zu? (Variante 1)",
    "options": [
      "Habichtspilz (Sarcodon imbricatus) gilt nicht als verlässlicher Speisepilz.",
      "Habichtspilz (Sarcodon imbricatus) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Habichtspilz (Sarcodon imbricatus) wird industriell als Zuchtpilz angebaut.",
      "Habichtspilz (Sarcodon imbricatus) ist ein klassischer Anfänger-Speisepilz."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 270,
    "question": "Welche Aussage(n) treffen auf den Frauen-Täubling (Russula cyanoxantha) zu? (Variante 1)",
    "options": [
      "Frauen-Täubling (Russula cyanoxantha) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Frauen-Täubling (Russula cyanoxantha) ist tödlich giftig und enthält Amatoxine.",
      "Frauen-Täubling (Russula cyanoxantha) ist roh oder gegart ein guter Speisepilz.",
      "Frauen-Täubling (Russula cyanoxantha) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 271,
    "question": "Welche Aussage(n) treffen auf den Speise-Täubling (Russula vesca) zu? (Variante 1)",
    "options": [
      "Speise-Täubling (Russula vesca) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Speise-Täubling (Russula vesca) bildet seine Sporen in echten Stoppeln aus.",
      "Speise-Täubling (Russula vesca) ist tödlich giftig und enthält Amatoxine.",
      "Speise-Täubling (Russula vesca) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 272,
    "question": "Welche Aussage(n) treffen auf den Parasol (Macrolepiota procera) zu? (Variante 1)",
    "options": [
      "Parasol (Macrolepiota procera) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Parasol (Macrolepiota procera) ist roh oder gegart ein guter Speisepilz.",
      "Parasol (Macrolepiota procera) bildet seine Sporen in echten Stoppeln aus.",
      "Parasol (Macrolepiota procera) ist tödlich giftig und enthält Amatoxine."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 273,
    "question": "Welche Aussage(n) treffen auf den Safran-Schirmling (Chlorophyllum rachodes) zu? (Variante 1)",
    "options": [
      "Safran-Schirmling (Chlorophyllum rachodes) ist ein klassischer Anfänger-Speisepilz.",
      "Safran-Schirmling (Chlorophyllum rachodes) gilt nicht als verlässlicher Speisepilz.",
      "Safran-Schirmling (Chlorophyllum rachodes) wird industriell als Zuchtpilz angebaut.",
      "Safran-Schirmling (Chlorophyllum rachodes) wirkt antibakteriell und ist roh besonders wertvoll."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 274,
    "question": "Welche Aussage(n) treffen auf den Grünling (Tricholoma equestre) zu? (Variante 1)",
    "options": [
      "Grünling (Tricholoma equestre) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Grünling (Tricholoma equestre) gilt nicht als verlässlicher Speisepilz.",
      "Grünling (Tricholoma equestre) wird industriell als Zuchtpilz angebaut.",
      "Grünling (Tricholoma equestre) ist ein klassischer Anfänger-Speisepilz."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 275,
    "question": "Welche Aussage(n) treffen auf den Nelkenschwindling (Marasmius oreades) zu? (Variante 1)",
    "options": [
      "Nelkenschwindling (Marasmius oreades) ist roh oder gegart ein guter Speisepilz.",
      "Nelkenschwindling (Marasmius oreades) ist tödlich giftig und enthält Amatoxine.",
      "Nelkenschwindling (Marasmius oreades) bildet seine Sporen in echten Stoppeln aus.",
      "Nelkenschwindling (Marasmius oreades) hat eine deutliche Volva (Scheide) an der Stielbasis."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 276,
    "question": "Welche Aussage(n) treffen auf den Mai-Ritterling (Calocybe gambosa) zu? (Variante 1)",
    "options": [
      "Mai-Ritterling (Calocybe gambosa) bildet seine Sporen in echten Stoppeln aus.",
      "Mai-Ritterling (Calocybe gambosa) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Mai-Ritterling (Calocybe gambosa) ist tödlich giftig und enthält Amatoxine.",
      "Mai-Ritterling (Calocybe gambosa) ist roh oder gegart ein guter Speisepilz."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 277,
    "question": "Welche Aussage(n) treffen auf den Edel-Reizker (Lactarius deliciosus) zu? (Variante 1)",
    "options": [
      "Edel-Reizker (Lactarius deliciosus) hat eine deutliche Volva (Scheide) an der Stielbasis.",
      "Edel-Reizker (Lactarius deliciosus) ist roh oder gegart ein guter Speisepilz.",
      "Edel-Reizker (Lactarius deliciosus) ist tödlich giftig und enthält Amatoxine.",
      "Edel-Reizker (Lactarius deliciosus) bildet seine Sporen in echten Stoppeln aus."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 278,
    "question": "Welche Aussage(n) treffen auf den Fichtenreizker (Lactarius deterrimus) zu? (Variante 1)",
    "options": [
      "Fichtenreizker (Lactarius deterrimus) ist tödlich giftig und enthält Amatoxine.",
      "Fichtenreizker (Lactarius deterrimus) bildet seine Sporen in echten Stoppeln aus.",
      "Fichtenreizker (Lactarius deterrimus) ist roh oder gegart ein guter Speisepilz.",
      "Fichtenreizker (Lactarius deterrimus) hat eine deutliche Volva (Scheide) an der Stielbasis."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 279,
    "question": "Welche Aussage(n) treffen auf den Schwefelporling (Laetiporus sulphureus) zu? (Variante 1)",
    "options": [
      "Schwefelporling (Laetiporus sulphureus) wird industriell als Zuchtpilz angebaut.",
      "Schwefelporling (Laetiporus sulphureus) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Schwefelporling (Laetiporus sulphureus) gilt nicht als verlässlicher Speisepilz.",
      "Schwefelporling (Laetiporus sulphureus) ist ein klassischer Anfänger-Speisepilz."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 280,
    "question": "Welche Aussage(n) treffen auf den Birkenporling (Fomitopsis betulina) zu? (Variante 1)",
    "options": [
      "Birkenporling (Fomitopsis betulina) wird industriell als Zuchtpilz angebaut.",
      "Birkenporling (Fomitopsis betulina) gilt nicht als verlässlicher Speisepilz.",
      "Birkenporling (Fomitopsis betulina) ist ein klassischer Anfänger-Speisepilz.",
      "Birkenporling (Fomitopsis betulina) wirkt antibakteriell und ist roh besonders wertvoll."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 281,
    "question": "Welche Aussage(n) treffen auf den Bauchwehkoralle (Ramaria mairei) zu? (Variante 1)",
    "options": [
      "Bauchwehkoralle (Ramaria mairei) gilt nicht als verlässlicher Speisepilz.",
      "Bauchwehkoralle (Ramaria mairei) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Bauchwehkoralle (Ramaria mairei) wird industriell als Zuchtpilz angebaut.",
      "Bauchwehkoralle (Ramaria mairei) ist ein klassischer Anfänger-Speisepilz."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 282,
    "question": "Welche Aussage(n) treffen auf den Ölbaumpilz (Omphalotus olearius) zu? (Variante 1)",
    "options": [
      "Ölbaumpilz (Omphalotus olearius) wird industriell als Zuchtpilz angebaut.",
      "Ölbaumpilz (Omphalotus olearius) gilt nicht als verlässlicher Speisepilz.",
      "Ölbaumpilz (Omphalotus olearius) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Ölbaumpilz (Omphalotus olearius) ist ein klassischer Anfänger-Speisepilz."
    ],
    "correctAnswers": [
      1
    ]
  },
  {
    "id": 283,
    "question": "Welche Aussage(n) treffen auf den Riesenbovist (Calvatia gigantea) zu? (Variante 1)",
    "options": [
      "Riesenbovist (Calvatia gigantea) wirkt antibakteriell und ist roh besonders wertvoll.",
      "Riesenbovist (Calvatia gigantea) ist ein klassischer Anfänger-Speisepilz.",
      "Riesenbovist (Calvatia gigantea) gilt nicht als verlässlicher Speisepilz.",
      "Riesenbovist (Calvatia gigantea) wird industriell als Zuchtpilz angebaut."
    ],
    "correctAnswers": [
      2
    ]
  },
  {
    "id": 284,
    "question": "Welche dieser Pilze sind klassische Mykorrhiza-Bildner (Symbiose mit Bäumen)? (Variante 1)",
    "options": [
      "Steinpilz",
      "Hallimasch",
      "Birkenpilz",
      "Nelkenschwindling"
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 285,
    "question": "Welche dieser Pilze sind Saprobionten (Zersetzer von Holz, Streu, organischem Material)? (Variante 1)",
    "options": [
      "Perlpilz",
      "Speise-Täubling",
      "Samtfußrübling",
      "Nadelholzhäubling"
    ],
    "correctAnswers": [
      2,
      3
    ]
  },
  {
    "id": 286,
    "question": "Was trifft auf das Verwechslungspaar Stockschwämmchen / Nadelholzhäubling zu? (Variante 1)",
    "options": [
      "Beide wachsen büschelig an Totholz; der Häubling ist tödlich.",
      "Stockschwämmchen und Nadelholzhäubling werden in der Praxis miteinander verwechselt.",
      "Stockschwämmchen und Nadelholzhäubling kommen ausschließlich im Hochgebirge oberhalb 2000 m vor.",
      "Stockschwämmchen und Nadelholzhäubling sind taxonomisch identisch."
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 287,
    "question": "Was trifft auf das Verwechslungspaar Pfifferling / Falscher Pfifferling zu? (Variante 1)",
    "options": [
      "Beide orange; nur der echte Pfifferling hat verwachsene Leisten.",
      "Pfifferling und Falscher Pfifferling sind beide ohne Risiko roh essbar.",
      "Pfifferling und Falscher Pfifferling werden in der Praxis miteinander verwechselt.",
      "Pfifferling und Falscher Pfifferling sind taxonomisch identisch."
    ],
    "correctAnswers": [
      0,
      2
    ]
  },
  {
    "id": 288,
    "question": "Was trifft auf das Verwechslungspaar Pfifferling / Ölbaumpilz zu? (Variante 1)",
    "options": [
      "Pfifferling und Ölbaumpilz sind beide ohne Risiko roh essbar.",
      "Pfifferling und Ölbaumpilz werden in der Praxis miteinander verwechselt.",
      "Der Ölbaumpilz wächst büschelig und hat echte Lamellen.",
      "Pfifferling und Ölbaumpilz sind taxonomisch identisch."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 289,
    "question": "Was trifft auf das Verwechslungspaar Wiesen-Champignon / Grüner Knollenblätterpilz zu? (Variante 1)",
    "options": [
      "Die beiden Arten unterscheiden sich nur durch ihre Größe.",
      "Wiesen-Champignon und Grüner Knollenblätterpilz werden in der Praxis miteinander verwechselt.",
      "Wiesen-Champignon und Grüner Knollenblätterpilz kommen ausschließlich im Hochgebirge oberhalb 2000 m vor.",
      "Champignon hat rosa/braune Lamellen, Knolli weiß und Volva."
    ],
    "correctAnswers": [
      1,
      3
    ]
  },
  {
    "id": 290,
    "question": "Was trifft auf das Verwechslungspaar Wiesen-Champignon / Karbol-Egerling zu? (Variante 1)",
    "options": [
      "Karbol-Egerling färbt sich gelb und stinkt nach Tinte.",
      "Wiesen-Champignon und Karbol-Egerling werden in der Praxis miteinander verwechselt.",
      "Die beiden Arten unterscheiden sich nur durch ihre Größe.",
      "Wiesen-Champignon und Karbol-Egerling kommen ausschließlich im Hochgebirge oberhalb 2000 m vor."
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 291,
    "question": "Was trifft auf das Verwechslungspaar Steinpilz / Gallenröhrling zu? (Variante 1)",
    "options": [
      "Steinpilz und Gallenröhrling sind beide ohne Risiko roh essbar.",
      "Steinpilz und Gallenröhrling werden in der Praxis miteinander verwechselt.",
      "Gallenröhrling bitter, rosa Röhren, dunkles grobes Netz.",
      "Die beiden Arten unterscheiden sich nur durch ihre Größe."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 292,
    "question": "Was trifft auf das Verwechslungspaar Steinpilz / Satansröhrling zu? (Variante 1)",
    "options": [
      "Satansröhrling: rote Poren, dicker Stiel, blauendes Fleisch.",
      "Steinpilz und Satansröhrling sind beide ohne Risiko roh essbar.",
      "Steinpilz und Satansröhrling sind taxonomisch identisch.",
      "Steinpilz und Satansröhrling werden in der Praxis miteinander verwechselt."
    ],
    "correctAnswers": [
      0,
      3
    ]
  },
  {
    "id": 293,
    "question": "Was trifft auf das Verwechslungspaar Perlpilz / Pantherpilz zu? (Variante 1)",
    "options": [
      "Pantherpilz: weiße Flocken, gerandete Knolle, kein Röten.",
      "Perlpilz und Pantherpilz werden in der Praxis miteinander verwechselt.",
      "Perlpilz und Pantherpilz kommen ausschließlich im Hochgebirge oberhalb 2000 m vor.",
      "Die beiden Arten unterscheiden sich nur durch ihre Größe."
    ],
    "correctAnswers": [
      0,
      1
    ]
  },
  {
    "id": 294,
    "question": "Was trifft auf das Verwechslungspaar Speise-Morchel / Frühjahrslorchel zu? (Variante 1)",
    "options": [
      "Die beiden Arten unterscheiden sich nur durch ihre Größe.",
      "Speise-Morchel und Frühjahrslorchel werden in der Praxis miteinander verwechselt.",
      "Lorchel hat hirnartige Windungen, kein Wabenmuster.",
      "Speise-Morchel und Frühjahrslorchel sind taxonomisch identisch."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 295,
    "question": "Was trifft auf das Verwechslungspaar Maronenröhrling / Gallenröhrling zu? (Variante 1)",
    "options": [
      "Maronenröhrling und Gallenröhrling sind taxonomisch identisch.",
      "Maronenröhrling und Gallenröhrling werden in der Praxis miteinander verwechselt.",
      "Gallenröhrling rosa Röhren, dunkles Netz, bitter.",
      "Die beiden Arten unterscheiden sich nur durch ihre Größe."
    ],
    "correctAnswers": [
      1,
      2
    ]
  },
  {
    "id": 296,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Speise-Morchel? (Variante 1)",
    "options": [
      "Speise-Morchel hat seine Hauptsaison ganzjährig, v. a. Herbst/Winter.",
      "Speise-Morchel hat seine Hauptsaison Juli – Oktober.",
      "Speise-Morchel hat seine Hauptsaison März – Mai.",
      "Hauptsaison des Speise-Morchel: April – Mai."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 297,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Spitzmorchel? (Variante 1)",
    "options": [
      "Hauptsaison des Spitzmorchel: März – Mai.",
      "Spitzmorchel hat seine Hauptsaison ganzjährig, v. a. Herbst/Winter.",
      "Spitzmorchel hat seine Hauptsaison November – März.",
      "Spitzmorchel hat seine Hauptsaison September – November."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 298,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Mai-Ritterling? (Variante 1)",
    "options": [
      "Mai-Ritterling hat seine Hauptsaison September – November.",
      "Mai-Ritterling hat seine Hauptsaison März – Mai.",
      "Mai-Ritterling hat seine Hauptsaison Oktober – Februar.",
      "Hauptsaison des Mai-Ritterling: Mai – Juni."
    ],
    "correctAnswers": [
      3
    ]
  },
  {
    "id": 299,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Pfifferling? (Variante 1)",
    "options": [
      "Hauptsaison des Pfifferling: Juni – Oktober.",
      "Pfifferling hat seine Hauptsaison Oktober – Februar.",
      "Pfifferling hat seine Hauptsaison April – Mai.",
      "Pfifferling hat seine Hauptsaison August – November."
    ],
    "correctAnswers": [
      0
    ]
  },
  {
    "id": 300,
    "difficulty": "beginner",
    "question": "In welcher Zeit ist die Hauptsaison des Steinpilz? (Variante 1)",
    "options": [
      "Steinpilz hat seine Hauptsaison August – November.",
      "Steinpilz hat seine Hauptsaison März – Mai.",
      "Steinpilz hat seine Hauptsaison September – November.",
      "Hauptsaison des Steinpilz: August – Oktober."
    ],
    "correctAnswers": [
      3
    ]
  },
  // ============================================================
  // ANFÄNGER (beginner) – Überleben & Grundregeln
  // ============================================================
  {
    id: 1001,
    difficulty: "beginner",
    question: "Welche goldene Regel schützt Anfänger vor den gefährlichsten Vergiftungen?",
    options: [
      "Lamellenpilze mit weißen Lamellen, Ring und Knolle konsequent stehen lassen.",
      "Nur Pilze sammeln, die von Tieren angefressen wurden.",
      "Jeden Pilz vor dem Verzehr mindestens 2 Minuten kochen.",
      "Sich zu Beginn auf Röhrlinge (Pilze mit Schwamm) konzentrieren und Lamellen meiden."
    ],
    correctAnswers: [0, 3],
    explanation: "Die meisten tödlichen Pilze haben Lamellen. Röhrlinge sind für Anfänger deutlich sicherer."
  },
  {
    id: 1002,
    difficulty: "beginner",
    question: "Woran erkennt man einen Steinpilz auf den ersten Blick?",
    options: [
      "Er hat immer einen leuchtend roten Hut.",
      "Er hat ein feines, helles Netz am Stiel (besonders oben).",
      "Er hat Röhren (Schwamm) auf der Unterseite, keine Lamellen.",
      "Er bläut sofort extrem stark, wenn man ihn anschneidet."
    ],
    correctAnswers: [1, 2],
    explanation: "Steinpilze haben Röhren und eine helle Netzzeichnung, sie bläuen nie."
  },
  {
    id: 1003,
    difficulty: "beginner",
    question: "Welche Farbe hat ein klassischer Fliegenpilz (Amanita muscaria)?",
    options: [
      "Roter Hut mit weißen Flocken.",
      "Brauner Hut mit gelben Streifen.",
      "Komplett weißer Hut ohne Muster.",
      "Grüner Hut mit roter Knolle."
    ],
    correctAnswers: [0],
    explanation: "Der Fliegenpilz hat charakteristisch roten Hut mit weißen Velum-Flocken."
  },
  {
    id: 1004,
    difficulty: "beginner",
    question: "Was solltest du tun, wenn du dir bei der Bestimmung nicht zu 100 % sicher bist?",
    options: [
      "Den Pilz auf jeden Fall essen und abwarten, ob er bitter schmeckt.",
      "Den Pilz stehen lassen oder zu einem geprüften Pilzsachverständigen (DGfM) bringen.",
      "Ein Foto in einer Social-Media-Gruppe hochladen und blind den Kommentaren vertrauen.",
      "Den Pilz gründlich kochen – Hitze zerstört ja jedes Gift."
    ],
    correctAnswers: [1],
    explanation: "Im Zweifel: stehen lassen. Amatoxine sind hitzestabil und werden durch Kochen nicht zerstört."
  },
  {
    id: 1005,
    difficulty: "beginner",
    question: "Wie transportierst du frisch gesammelte Pilze richtig?",
    options: [
      "In einem luftigen Korb.",
      "Luftdicht in einer Plastiktüte.",
      "In einem feuchten Eimer mit Wasser.",
      "Eingewickelt in Frischhaltefolie."
    ],
    correctAnswers: [0],
    explanation: "Plastik staut Feuchtigkeit – Pilze verderben in Minuten. Immer luftig im Korb tragen."
  },
  // ============================================================
  // FORTGESCHRITTEN (intermediate) – Details & Doppelgänger
  // ============================================================
  {
    id: 1101,
    difficulty: "intermediate",
    question: "Wie unterscheidet man den Parasol (Macrolepiota procera) von giftigen Riesenschirmlingen?",
    options: [
      "Der Ring des Parasols ist doppelt, wattiert und am Stiel verschiebbar.",
      "Der Stiel des Parasols ist deutlich braun genattert.",
      "Der Parasol hat einen glatten, rein weißen Stiel.",
      "Das Fleisch des Parasols läuft im Anschnitt sofort blutrot an."
    ],
    correctAnswers: [0, 1],
    explanation: "Verschiebbarer Ring und genatterter Stiel sind die Hauptmerkmale des Parasols."
  },
  {
    id: 1102,
    difficulty: "intermediate",
    question: "Welche Merkmale deuten auf den Perlpilz (Amanita rubescens) hin und grenzen ihn vom Pantherpilz ab?",
    options: [
      "Das Fleisch rötet bei Madenfraß oder Verletzung (weinrot).",
      "Der Ring ist deutlich gerieft (Längsrillen).",
      "Der Stiel hat eine 'Bergsteigerschühchen'-Knolle.",
      "Die Manschette ist komplett glatt und ungerieft."
    ],
    correctAnswers: [0, 1],
    explanation: "Rötendes Fleisch und geriefter Ring sind sicher für den Perlpilz."
  },
  {
    id: 1103,
    difficulty: "intermediate",
    question: "Welche Verfärbungen können beim Maronenröhrling (Imleria badia) auftreten?",
    options: [
      "Die Röhren laufen bei Druck intensiv blaugrün bis blau an.",
      "Das Fleisch im Hut verfärbt sich im Anschnitt leicht bläulich.",
      "Der Pilz läuft an der Stielbasis sofort karminrot an.",
      "Es tritt eine weiße, scharfe Milch an den Bruchstellen aus."
    ],
    correctAnswers: [0, 1],
    explanation: "Maronen bläuen typisch an den Röhren – ein harmloser, aber diagnostisch wichtiger Reflex."
  },
  // ============================================================
  // PROFI (expert) – Toxikologie, Ökologie & Latein
  // ============================================================
  {
    id: 1201,
    difficulty: "expert",
    question: "Welches Gift ist für die tödliche Wirkung des Grünen Knollenblätterpilzes (Amanita phalloides) verantwortlich?",
    options: [
      "Muscarin",
      "Amatoxine (speziell alpha-Amanitin)",
      "Orellanin",
      "Coprin"
    ],
    correctAnswers: [1],
    explanation: "Amatoxine zerstören Leberzellen durch Blockade der RNA-Polymerase II."
  },
  {
    id: 1202,
    difficulty: "expert",
    question: "Welche Pilzart ist ein strenger Mykorrhiza-Partner der Lärche (Larix)?",
    options: [
      "Suillus grevillei (Goldröhrling)",
      "Boletus edulis (Fichtensteinpilz)",
      "Lactarius deterrimus (Fichtenreizker)",
      "Gomphidius maculatus (Fleckender Gelbfuß)"
    ],
    correctAnswers: [0, 3],
    explanation: "Goldröhrling und Fleckender Gelbfuß wachsen ausschließlich bei Lärchen."
  },
  {
    id: 1203,
    difficulty: "expert",
    question: "Welche Gattungen enthalten Arten mit tödlichen Amatoxinen?",
    options: [
      "Amanita (z. B. A. phalloides, A. virosa)",
      "Galerina (z. B. G. marginata)",
      "Lepiota (kleine Schirmlinge, z. B. L. brunneoincarnata)",
      "Cantharellus"
    ],
    correctAnswers: [0, 1, 2],
    explanation: "Amatoxine kommen in Amanita, Galerina und kleinen Lepiota-Arten vor – nie in Cantharellus."
  },
  {
    id: 1204,
    difficulty: "expert",
    question: "Welche Aussagen zu Cortinarius rubellus / orellanus (Orellanus-Syndrom) sind korrekt?",
    options: [
      "Symptome treten erst nach 3–14 Tagen Latenz auf.",
      "Hauptzielorgan des Gifts Orellanin sind die Nieren.",
      "Das Gift wird durch Kochen vollständig zerstört.",
      "Verwechslungsgefahr besteht v. a. mit Pfifferling und Reizker."
    ],
    correctAnswers: [0, 1, 3],
    explanation: "Orellanin ist nephrotoxisch, hitzestabil und führt durch lange Latenz oft zu zu später Diagnose."
  },
  {
    id: 1205,
    difficulty: "expert",
    question: "Was beschreibt eine ektomykorrhizale Lebensweise korrekt?",
    options: [
      "Symbiose zwischen Pilzhyphen und Baumfeinwurzeln, Hyphenmantel ohne Zellpenetration.",
      "Parasitäre Zersetzung lebenden Holzes.",
      "Saprobe Zersetzung von Laubstreu.",
      "Typisch u. a. für Boletus, Amanita, Cantharellus, Lactarius."
    ],
    correctAnswers: [0, 3],
    explanation: "Ektomykorrhiza bildet einen Hartig-Netz-Mantel um Wurzeln, ohne in Zellen einzudringen."
  }
];

