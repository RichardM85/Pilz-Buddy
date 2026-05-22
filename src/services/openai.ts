/**
 * OpenAI Service Helper (Client-Side Facade)
 * ------------------------------------------
 * Isolated wrapper around the secure server-function edge layer.
 * The actual OpenAI API key never touches the browser — all calls
 * are proxied through TanStack Server Functions in `src/lib/*.functions.ts`,
 * which read `OPENAI_API_KEY` from the server runtime.
 *
 * This file intentionally contains NO `fetch("https://api.openai.com")`
 * calls. If you ever need a new model/endpoint, add it as a server fn
 * first, then expose it from here.
 */

import { identifyMushroom, type BestimmungResult } from "@/lib/bestimmung.functions";
import { chatWithPilzKumpel } from "@/lib/chat.functions";

// ─── Types ──────────────────────────────────────────────────────────────────

export type MushroomTraits = {
  hutform?: string;
  hutfarbe?: string;
  fruchtschicht?: string; // Lamellen / Röhren / Stacheln
  stiel?: string;
  ring?: string;
  knolle?: string;
  geruch?: string;
  habitat?: string;
  baumpartner?: string;
  jahreszeit?: string;
  [key: string]: string | undefined;
};

export type TraitPrediction = {
  probableScientificName: string;
  germanName: string;
  confidencePercentage: number;
  criticalWarning: string;
  offline?: boolean;
};

export type VisionAnalysis = {
  probableScientificName: string;
  confidencePercentage: number;
  criticalWarning: string;
  offline?: boolean;
};

// ─── Offline / Forest Mode ──────────────────────────────────────────────────

const CACHE_KEY = "fungastarter:lastAIResult";

const isOffline = (): boolean =>
  typeof navigator !== "undefined" && navigator.onLine === false;

function readCache<T>(): T | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeCache<T>(value: T): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(value));
  } catch {
    /* quota — silent */
  }
}

function offlineFallback<T extends object>(label: string, shape: T): T {
  const cached = readCache<T>();
  return {
    ...(cached ?? shape),
    offline: true,
    criticalWarning:
      "🌲 Waldmodus: Du bist offline. Ergebnis aus dem letzten Cache. " +
      "Niemals einen Pilz essen, ohne einen Pilzsachverständigen zu konsultieren!",
    _label: label,
  } as unknown as T;
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Structures the user's dropdown filter selections into a clean JSON payload
 * and asks the LLM (via Pilz-Kumpel chat fn) for a most-probable species.
 */
export async function predictMushroomFromTraits(
  traits: MushroomTraits,
): Promise<TraitPrediction> {
  const fallback: TraitPrediction = {
    probableScientificName: "Unbekannt",
    germanName: "Unbekannt",
    confidencePercentage: 0,
    criticalWarning:
      "Bestimmung anhand reiner Merkmale ist nie eindeutig — bitte zusätzlich Fotos prüfen.",
  };

  if (isOffline()) return offlineFallback("traits", fallback);

  const cleaned = Object.fromEntries(
    Object.entries(traits).filter(([, v]) => v && String(v).trim().length > 0),
  );

  const prompt = [
    "Ich habe folgende Merkmale beobachtet (JSON):",
    "```json",
    JSON.stringify(cleaned, null, 2),
    "```",
    "Antworte AUSSCHLIESSLICH als JSON-Objekt mit den Feldern:",
    '{ "probableScientificName": string, "germanName": string, "confidencePercentage": number (0-100), "criticalWarning": string }',
    "Keine Verzehrfreigabe. Bei Giftverdacht klar warnen.",
  ].join("\n");

  try {
    const answer = await chatWithPilzKumpel({ data: { message: prompt, history: [] } });
    const jsonMatch = answer.reply.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Keine JSON-Antwort erhalten.");
    const parsed = JSON.parse(jsonMatch[0]) as Partial<TraitPrediction>;
    const result: TraitPrediction = {
      probableScientificName: parsed.probableScientificName ?? "Unbekannt",
      germanName: parsed.germanName ?? "Unbekannt",
      confidencePercentage: Math.max(0, Math.min(100, Number(parsed.confidencePercentage ?? 0))),
      criticalWarning:
        parsed.criticalWarning ??
        "Niemals ohne Pilzsachverständigen verzehren.",
    };
    writeCache(result);
    return result;
  } catch (err) {
    console.warn("[openai.predictMushroomFromTraits] failed:", err);
    return offlineFallback("traits", fallback);
  }
}

/**
 * Sends a base64 image to GPT-4o Vision (via secure server fn) and returns
 * a structured vision analysis result.
 *
 * @param base64Image  Full data-URL (e.g. "data:image/jpeg;base64,...") OR raw base64.
 */
export async function analyzeMushroomImage(
  base64Image: string,
): Promise<VisionAnalysis> {
  const fallback: VisionAnalysis = {
    probableScientificName: "Unbekannt",
    confidencePercentage: 0,
    criticalWarning:
      "Bilderkennung unsicher — niemals anhand eines einzelnen Fotos essen!",
  };

  if (isOffline()) return offlineFallback("vision", fallback);

  // Normalize to data URL.
  const dataUrl = base64Image.startsWith("data:")
    ? base64Image
    : `data:image/jpeg;base64,${base64Image}`;

  try {
    const res: BestimmungResult = await identifyMushroom({
      data: {
        photos: [{ slot: "hut", dataUrl }],
        // Minimal candidate list — the server fn requires ≥1; in this lean
        // helper we let the model freely answer with scientific name.
        candidates: [
          {
            id: "freeform",
            name_de: "Freie Bestimmung",
            name_lat: "Freeform",
            type: null,
            difficulty: null,
            merkmale: [],
          },
        ],
      },
    });

    const result: VisionAnalysis = {
      probableScientificName:
        res.rationale?.match(/[A-Z][a-z]+ [a-z]+/)?.[0] ?? "Unbekannt",
      confidencePercentage: res.confidence,
      criticalWarning:
        res.reasoning?.warnung ??
        "Niemals ohne Pilzsachverständigen verzehren.",
    };
    writeCache(result);
    return result;
  } catch (err) {
    console.warn("[openai.analyzeMushroomImage] failed:", err);
    return offlineFallback("vision", fallback);
  }
}

// ─── Edge-Function Wrapper Skeleton ────────────────────────────────────────
//
// In this stack, server-side OpenAI calls live in TanStack Server Functions
// (see `src/lib/openai.server.ts` + `src/lib/bestimmung.functions.ts`).
// Should you ever need a raw HTTP edge endpoint (e.g. for a webhook or
// external caller), drop a route file at `src/routes/api/public/openai.ts`
// using the pattern below. Do NOT call OpenAI from the client directly.
//
// ── src/routes/api/public/openai.ts ────────────────────────────────────────
// import { createFileRoute } from "@tanstack/react-router";
//
// export const Route = createFileRoute("/api/public/openai")({
//   server: {
//     handlers: {
//       POST: async ({ request }) => {
//         // 1. Verify caller (signature / shared secret).
//         // 2. Read process.env.OPENAI_API_KEY (NEVER import.meta.env).
//         // 3. Forward to OpenAI, return JSON response.
//         return Response.json({ ok: true });
//       },
//     },
//   },
// });
// ───────────────────────────────────────────────────────────────────────────
