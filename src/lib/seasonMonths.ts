/**
 * Parse a German season string (e.g. "Juli – Oktober", "Mai bis November",
 * "Ganzjährig", "Herbst") into a set of month indices (0 = Jan, 11 = Dec).
 *
 * Heuristic but deterministic — covers the patterns found in the mushrooms
 * table. Unknown / empty strings → empty set (renders nothing for that pilz).
 */
const MONTH_NAMES: Record<string, number> = {
  jan: 0, januar: 0,
  feb: 1, februar: 1,
  mar: 2, mär: 2, maerz: 2, märz: 2,
  apr: 3, april: 3,
  mai: 4,
  jun: 5, juni: 5,
  jul: 6, juli: 6,
  aug: 7, august: 7,
  sep: 8, sept: 8, september: 8,
  okt: 9, oktober: 9,
  nov: 10, november: 10,
  dez: 11, dezember: 11,
};

// Seasonal keywords → month ranges
const SEASON_KEYWORDS: Array<{ re: RegExp; months: number[] }> = [
  { re: /ganzjährig|ganzjaehrig|jahreszeitenunabhängig/i, months: [0,1,2,3,4,5,6,7,8,9,10,11] },
  { re: /frühling|fruehling/i, months: [2, 3, 4] },
  { re: /frühsommer|fruehsommer/i, months: [4, 5] },
  { re: /spätsommer|spaetsommer/i, months: [7, 8] },
  { re: /sommer/i, months: [5, 6, 7] },
  { re: /frühherbst|fruehherbst/i, months: [8] },
  { re: /spätherbst|spaetherbst/i, months: [10] },
  { re: /herbst/i, months: [8, 9, 10] },
  { re: /winter/i, months: [11, 0, 1] },
];

function tokenToMonth(tok: string): number | null {
  const k = tok.toLowerCase().replace(/[^a-zäöü]/g, "");
  if (!k) return null;
  // exact first
  if (k in MONTH_NAMES) return MONTH_NAMES[k];
  // prefix match (e.g. "septe")
  for (const key of Object.keys(MONTH_NAMES)) {
    if (key.length >= 3 && k.startsWith(key)) return MONTH_NAMES[key];
  }
  return null;
}

function range(a: number, b: number): number[] {
  // wrap around December → January if needed
  const out: number[] = [];
  let i = a;
  for (let s = 0; s < 12; s++) {
    out.push(i);
    if (i === b) break;
    i = (i + 1) % 12;
  }
  return out;
}

export function seasonMonths(season: string | null | undefined): Set<number> {
  if (!season) return new Set();
  const text = season.trim();
  if (!text) return new Set();

  const months = new Set<number>();

  // 1) seasonal keywords
  for (const { re, months: mm } of SEASON_KEYWORDS) {
    if (re.test(text)) mm.forEach((m) => months.add(m));
  }

  // 2) explicit ranges: "Juli – Oktober", "Mai bis Nov.", "Sep-Nov"
  const rangeRe = /([A-Za-zäöüÄÖÜ]{3,12})\s*(?:-|–|—|bis|to)\s*([A-Za-zäöüÄÖÜ]{3,12})/gi;
  let m: RegExpExecArray | null;
  while ((m = rangeRe.exec(text)) !== null) {
    const a = tokenToMonth(m[1]);
    const b = tokenToMonth(m[2]);
    if (a !== null && b !== null) range(a, b).forEach((x) => months.add(x));
  }

  // 3) individual month tokens (catches "Mai, Juni, September")
  const tokenRe = /[A-Za-zäöüÄÖÜ]{3,12}/g;
  while ((m = tokenRe.exec(text)) !== null) {
    const t = tokenToMonth(m[0]);
    if (t !== null) months.add(t);
  }

  return months;
}

/** True if the pilz is in season for the given month (default = current). */
export function isInSeason(season: string | null | undefined, month = new Date().getMonth()): boolean {
  return seasonMonths(season).has(month);
}

/** "Hochsaison" = month is roughly in the middle of the season window. */
export function isPeakSeason(season: string | null | undefined, month = new Date().getMonth()): boolean {
  const set = seasonMonths(season);
  if (!set.has(month) || set.size === 0 || set.size === 12) return false;
  // Peak = current month AND both neighbours in season → core of the window
  const prev = (month + 11) % 12;
  const next = (month + 1) % 12;
  return set.has(prev) && set.has(next);
}

/** Sorted number[] of season months (0=Jan..11=Dec) — derived view of the DB string. */
export function seasonMonthsArray(season: string | null | undefined): number[] {
  return Array.from(seasonMonths(season)).sort((a, b) => a - b);
}

/** Peak months = months whose both neighbours are also in season (core window). */
export function peakMonthsArray(season: string | null | undefined): number[] {
  const set = seasonMonths(season);
  if (set.size === 0 || set.size === 12) return [];
  const peaks: number[] = [];
  for (const m of set) {
    const prev = (m + 11) % 12;
    const next = (m + 1) % 12;
    if (set.has(prev) && set.has(next)) peaks.push(m);
  }
  return peaks.sort((a, b) => a - b);
}

export const MONTH_LABELS_DE = [
  "Januar","Februar","März","April","Mai","Juni",
  "Juli","August","September","Oktober","November","Dezember",
];

export const MONTH_SHORT_DE = [
  "Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",
];
