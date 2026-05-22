/**
 * Canonical Mushroom Schema
 * --------------------------
 * Strict, English-named, enum-typed view of the Supabase `mushrooms` row.
 * Used as the unified payload shape for:
 *   • OpenAI prompts (Vision + Trait analysis)
 *   • Search/synonym index
 *   • Lookalike safety checks
 *
 * The database keeps its German column names for the existing UI; this
 * adapter is the single bridge between the two worlds. Whenever the
 * Supabase schema changes, update ONLY this file.
 */

import type { Tables } from "@/integrations/supabase/types";

// ─── Enums ──────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "roehrlinge",
  "lamellen",
  "leisten",
  "schlauch",
  "bauch",
  "stachel",
  "porlinge",
  "gallert",
  "korallen",
  "hoernlinge",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const EDIBILITIES = [
  "choice_edible", // Speisepilz / Vorzüglich
  "edible",        // Essbar / mit Sorgfalt essbar
  "inedible",      // Ungenießbar
  "poisonous",     // Giftig
  "deadly",        // Tödlich Giftig
] as const;
export type Edibility = (typeof EDIBILITIES)[number];

export type CapSurface = "slimy" | "dry" | "velvety" | "scaly";
export type HymeniumType = "gills" | "tubes" | "ridges" | "spines";

export interface MushroomTraits {
  capSurface?: CapSurface;
  hymeniumType?: HymeniumType;
  sporePrintColor?: string;
}

// ─── Canonical interface (1:1 with the strict spec) ─────────────────────────

export interface CanonicalMushroom {
  id: string;                  // URL-safe slug, e.g. "maronen-roehrling"
  name: string;                // Common German name
  scientificName: string;      // Latin name, e.g. "Imleria badia"
  synonyms: string[];
  category: Category;
  edibility: Edibility;
  lookAlikes: string[];        // IDs or names that can be confused with this one
  traits?: MushroomTraits;

  // Non-strict descriptive fields, useful for AI context but optional:
  habitat?: string;
  season?: string;
  ecology?: string;
  features?: string[];
  funFact?: string;
}

// ─── Adapter: Supabase row → CanonicalMushroom ──────────────────────────────

type Row = Tables<"mushrooms"> & { traits?: unknown };

/** Map the German `type` column to a canonical category slug. */
function mapCategory(type: string | null | undefined): Category {
  const t = (type ?? "").toLowerCase();
  if (t.includes("röhr") || t.includes("roehr")) return "roehrlinge";
  if (t.includes("lamell")) return "lamellen";
  if (t.includes("leist") || t.includes("pfiff")) return "leisten";
  if (t.includes("schlauch") || t.includes("ascom")) return "schlauch";
  if (t.includes("bauch") || t.includes("stäub") || t.includes("staeub")) return "bauch";
  if (t.includes("stachel") || t.includes("igel")) return "stachel";
  if (t.includes("porling")) return "porlinge";
  if (t.includes("gallert") || t.includes("zitter")) return "gallert";
  if (t.includes("korall")) return "korallen";
  if (t.includes("hörn") || t.includes("hoern")) return "hoernlinge";
  return "lamellen"; // safe default — Lamellen is the largest group
}

/** Map the German `sicherheitsstufe` column to a canonical edibility enum. */
function mapEdibility(level: string | null | undefined): Edibility {
  const s = (level ?? "").toLowerCase();
  if (s.includes("tödlich") || s.includes("toedlich")) return "deadly";
  if (s.includes("giftig")) return "poisonous";
  if (s.includes("ungenieß") || s.includes("ungeniess")) return "inedible";
  if (s.includes("vorzüglich") || s.includes("vorzueglich") || s.includes("speise")) {
    return "choice_edible";
  }
  return "edible";
}

/** Convert a free-text `verwechslung` blob into a clean string[] of lookalikes. */
function parseLookAlikes(verwechslung: string | null | undefined): string[] {
  if (!verwechslung) return [];
  return verwechslung
    .split(/[,;·•\n]+|\bund\b|\boder\b/i)
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length < 80);
}

/** Safely coerce the jsonb `traits` column to a typed object. */
function parseTraits(raw: unknown): MushroomTraits | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const t = raw as Record<string, unknown>;
  const out: MushroomTraits = {};
  if (typeof t.capSurface === "string") out.capSurface = t.capSurface as CapSurface;
  if (typeof t.hymeniumType === "string") out.hymeniumType = t.hymeniumType as HymeniumType;
  if (typeof t.sporePrintColor === "string") out.sporePrintColor = t.sporePrintColor;
  return Object.keys(out).length ? out : undefined;
}

export function toCanonicalMushroom(row: Row): CanonicalMushroom {
  return {
    id: row.id,
    name: row.name_de,
    scientificName: row.name_lat,
    synonyms: Array.isArray(row.synonyms) ? row.synonyms : [],
    category: mapCategory(row.type),
    edibility: mapEdibility(row.sicherheitsstufe),
    lookAlikes: parseLookAlikes(row.verwechslung),
    traits: parseTraits(row.traits),
    habitat: row.habitat ?? undefined,
    season: row.season ?? undefined,
    ecology: row.oekologie ?? undefined,
    features: Array.isArray(row.merkmale) ? row.merkmale : [],
    funFact: row.fun_fact ?? undefined,
  };
}

/** Compact projection for OpenAI prompts — strips verbose prose to save tokens. */
export function toOpenAIPayload(m: CanonicalMushroom) {
  return {
    id: m.id,
    name: m.name,
    scientificName: m.scientificName,
    synonyms: m.synonyms,
    category: m.category,
    edibility: m.edibility,
    lookAlikes: m.lookAlikes,
    traits: m.traits ?? {},
  };
}
