import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { openaiChat } from "./openai.server";

const PhotoSchema = z.object({
  slot: z.enum(["hut", "unten", "schnitt"]),
  dataUrl: z.string().min(20).max(8_000_000), // ~6MB base64 limit
});

const CandidateSchema = z.object({
  id: z.string(),
  name_de: z.string(),
  name_lat: z.string(),
  type: z.string().nullable().optional(),
  difficulty: z.string().nullable().optional(),
  merkmale: z.array(z.string()).optional(),
});

const InputSchema = z.object({
  photos: z.array(PhotoSchema).min(1).max(3),
  candidates: z.array(CandidateSchema).min(1).max(400),
  notes: z.string().max(500).optional(),
});

export type BestimmungResult = {
  id: string | null;
  confidence: number;
  reasoning: { fruchtschicht: string; gruppe: string; merkmale: string; warnung: string };
  rationale: string;
};

export const identifyMushroom = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<BestimmungResult> => {
    // Compact candidate list to keep prompt small.
    const catalog = data.candidates
      .slice(0, 300)
      .map(
        (c) =>
          `${c.id}|${c.name_de} (${c.name_lat})|${c.type ?? "?"}|${c.difficulty ?? "?"}|${(c.merkmale ?? []).slice(0, 3).join("; ")}`,
      )
      .join("\n");

    const system = [
      "Du bist 'Pilz-Kumpel', ein humorvoll-präziser deutscher Mykologie-Assistent.",
      "Aufgabe: Analysiere 1-3 Fotos eines Pilzes (Hut, Unterseite, Schnitt) und finde die ähnlichste Art aus dem Katalog.",
      "Format jedes Katalog-Eintrags: id|name_de (name_lat)|gruppe|schwierigkeit|merkmale",
      "Antworte NUR als JSON-Objekt mit Feldern:",
      '  "id": exakte id aus dem Katalog ODER null wenn unsicher,',
      '  "confidence": Zahl 0-100,',
      '  "reasoning": { "fruchtschicht": "...", "gruppe": "...", "merkmale": "...", "warnung": "..." },',
      '  "rationale": "1-2 Sätze, locker-deutscher Pilz-Kumpel-Ton".',
      "WICHTIG: Niemals Verzehrfreigabe geben. Bei Giftverdacht klar warnen.",
    ].join("\n");

    const userContent: Array<
      | { type: "text"; text: string }
      | { type: "image_url"; image_url: { url: string; detail: "low" | "high" } }
    > = [
      {
        type: "text",
        text: `Katalog (${data.candidates.length} Arten):\n${catalog}\n\n${data.notes ? `Notizen: ${data.notes}\n\n` : ""}Bestimme den Pilz.`,
      },
      ...data.photos.map((p) => ({
        type: "image_url" as const,
        image_url: { url: p.dataUrl, detail: "low" as const },
      })),
    ];

    const raw = await openaiChat({
      model: "gpt-4o",
      temperature: 0.2,
      response_format: { type: "json_object" },
      max_tokens: 600,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userContent },
      ],
    });

    let parsed: BestimmungResult;
    try {
      const obj = JSON.parse(raw) as Partial<BestimmungResult>;
      parsed = {
        id: typeof obj.id === "string" ? obj.id : null,
        confidence: Math.max(0, Math.min(100, Number(obj.confidence ?? 0))),
        reasoning: {
          fruchtschicht: obj.reasoning?.fruchtschicht ?? "—",
          gruppe: obj.reasoning?.gruppe ?? "—",
          merkmale: obj.reasoning?.merkmale ?? "—",
          warnung: obj.reasoning?.warnung ?? "Niemals ohne Pilzsachverständigen verzehren.",
        },
        rationale: obj.rationale ?? "",
      };
    } catch {
      throw new Error("Konnte KI-Antwort nicht parsen.");
    }

    // Validate id exists in candidates
    if (parsed.id && !data.candidates.some((c) => c.id === parsed.id)) {
      parsed.id = null;
      parsed.confidence = Math.min(parsed.confidence, 30);
    }

    return parsed;
  });
