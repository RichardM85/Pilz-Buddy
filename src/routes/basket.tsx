import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingBasket, Trash2, Plus, Minus, MapPin, Copy, ExternalLink,
  Check, ArrowLeft, AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useBasket } from "@/lib/basket";

export const Route = createFileRoute("/basket")({
  head: () => ({
    meta: [
      { title: "Sammelkorb · FungaStarter" },
      { name: "description", content: "Dein digitaler Pilz-Sammelkorb mit GPS-Fundorten — lokal & offline-fähig." },
      { property: "og:title", content: "Sammelkorb · FungaStarter" },
      { property: "og:description", content: "Dein digitaler Pilz-Sammelkorb mit GPS-Fundorten." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BasketPage,
});

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("de-DE", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch { return iso; }
}

function CoordsBlock({ lat, lon, accuracy }: { lat: number; lon: number; accuracy?: number }) {
  const [copied, setCopied] = useState(false);
  const text = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  return (
    <div className="space-y-2 rounded-xl border-2 border-[#9A7B56] bg-[#132219] p-3">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#BCA385]">
        <MapPin className="h-3.5 w-3.5 text-[#D97D3E]" /> Fundort-Koordinaten
      </p>
      <p className="font-mono text-sm font-bold text-[#EADECC]">{text}</p>
      {accuracy != null && (
        <p className="text-[11px] font-semibold text-[#BCA385]">Genauigkeit: ±{Math.round(accuracy)} m</p>
      )}
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={async () => {
            try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }
            catch { /* ignore */ }
          }}
          className="tactile inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-[#9A7B56] bg-[#1F3327] px-3 py-2 text-xs font-bold text-[#EADECC] hover:border-[#D97D3E]"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Kopiert" : "Kopieren"}
        </button>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="tactile inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#D97D3E] px-3 py-2 text-xs font-black text-white hover:bg-[#E9A15A]"
        >
          <ExternalLink className="h-3.5 w-3.5" /> In Karten öffnen
        </a>
      </div>
    </div>
  );
}

function BasketPage() {
  const { items, count, inc, dec, remove, clear } = useBasket();
  const basketItems = items ?? [];

  return (
    <AppShell>
      <section className="space-y-6 pb-10">
        <Link
          to="/"
          className="tactile inline-flex min-h-[44px] items-center gap-2 rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] px-4 py-2 text-sm font-bold text-[#EADECC] hover:border-[#D97D3E]"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>

        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#D97D3E] bg-[#132219] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#E9A15A]">
            <ShoppingBasket className="h-3.5 w-3.5" /> Sammelkorb
          </div>
          <h1 className="font-display text-3xl font-bold text-[#E9A15A] md:text-4xl">
            Dein digitaler Korb
          </h1>
          <p className="text-sm font-semibold text-[#BCA385]">
            {count === 0 ? "Noch leer." : `${count} Stück · ${basketItems.length} Art${basketItems.length === 1 ? "" : "en"}`} · offline-fähig.
          </p>
        </header>

        {basketItems.length === 0 ? (
          <div className="rounded-3xl border-2 border-[#9A7B56] bg-[#1F3327] p-10 text-center">
            <ShoppingBasket className="mx-auto h-12 w-12 text-[#BCA385]" />
            <p className="mt-3 font-display text-lg font-bold text-[#EADECC]">Dein Korb ist leer.</p>
            <p className="mt-1 text-sm font-semibold text-[#BCA385]">
              Öffne einen Pilz im Lexikon und tippe „In den Korb legen".
            </p>
            <Link
              to="/lexicon"
              className="tactile mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#D97D3E] px-5 py-3 text-sm font-black text-white hover:bg-[#E9A15A]"
            >
              Zum Lexikon
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#BCA385]">
                <AlertTriangle className="h-4 w-4 text-[#D97D3E]" />
                Sammle nur, was du sicher kennst.
              </div>
              <button
                type="button"
                onClick={() => { if (confirm("Korb komplett leeren?")) clear(); }}
                className="tactile inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-red-800 bg-red-950/40 px-3 py-2 text-xs font-bold text-red-200 hover:bg-red-900/60"
              >
                <Trash2 className="h-3.5 w-3.5" /> Alles leeren
              </button>
            </div>

            <ul className="space-y-4">
              {basketItems.map((it) => (
                <li key={it.id} className="space-y-3 rounded-3xl border-2 border-[#9A7B56] bg-[#1F3327] p-4 shadow-[var(--shadow-soft)]">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      {it.type && (
                        <span className="inline-block rounded-full border-2 border-[#9A7B56] bg-[#132219] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#BCA385]">
                          {it.type}
                        </span>
                      )}
                      <Link
                        to="/lexicon/$id"
                        params={{ id: it.id }}
                        className="mt-1 block font-display text-lg font-bold leading-tight text-[#EADECC] hover:text-[#E9A15A]"
                      >
                        {it.name_de}
                      </Link>
                      <p className="truncate text-xs italic text-[#BCA385]">{it.name_lat}</p>
                      <p className="mt-1 text-[11px] font-semibold text-[#9A7B56]">
                        Gefunden am {fmtDate(it.addedAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-full border-2 border-[#9A7B56] bg-[#132219] p-1">
                      <button
                        type="button"
                        aria-label="Weniger"
                        onClick={() => dec(it.id)}
                        className="tactile flex h-9 w-9 items-center justify-center rounded-full text-[#EADECC] hover:bg-[#1F3327]"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[2ch] text-center font-mono text-base font-black text-[#E9A15A]">
                        {it.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Mehr"
                        onClick={() => inc(it.id)}
                        className="tactile flex h-9 w-9 items-center justify-center rounded-full text-[#EADECC] hover:bg-[#1F3327]"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      aria-label={`${it.name_de} entfernen`}
                      onClick={() => remove(it.id)}
                      className="tactile flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-800 bg-red-950/40 text-red-200 hover:bg-red-900/60"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {it.coords ? (
                    <CoordsBlock lat={it.coords.lat} lon={it.coords.lon} accuracy={it.coords.accuracy} />
                  ) : (
                    <p className="rounded-xl border-2 border-dashed border-[#9A7B56] bg-[#132219]/60 px-3 py-2 text-xs font-semibold text-[#BCA385]">
                      Kein Fundort gespeichert. Beim nächsten Mal „Fundort merken (GPS)" aktivieren.
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </AppShell>
  );
}
