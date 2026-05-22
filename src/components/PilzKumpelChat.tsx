import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { chatWithPilzKumpel } from "@/lib/chat.functions";
import { useMushrooms } from "@/lib/useMushrooms";

type Msg = { role: "user" | "assistant"; content: string };

const LS_KEY = "fk:chat:v1";
const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hey, ich bin der Pilz-Kumpel 🍄 — frag mich alles zu Arten, Verwechslungen, Lebensräumen oder Sammeltipps. Aber merk dir: ich gebe NIE eine Verzehrfreigabe. Im Zweifel: Pilzsachverständige(r) der DGfM!",
};

export function PilzKumpelChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(() => {
    if (typeof window === "undefined") return [WELCOME];
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? (JSON.parse(raw) as Msg[]) : [WELCOME];
    } catch {
      return [WELCOME];
    }
  });
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: mushrooms = [] } = useMushrooms();
  const chat = useServerFn(chatWithPilzKumpel);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(msgs.slice(-30)));
    } catch {
      /* ignore */
    }
  }, [msgs]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setError(null);
    const userMsg: Msg = { role: "user", content: text };
    const next = [...msgs, userMsg];
    setMsgs(next);
    setInput("");
    setSending(true);
    try {
      // Send only last 12 turns to keep prompt small
      const history = next.slice(-12);
      const ctx = mushrooms.slice(0, 50).map((m) => ({
        name_de: m.name_de,
        name_lat: m.name_lat,
        type: m.type,
        difficulty: m.difficulty,
        verwechslung: m.verwechslung,
      }));
      const res = await chat({ data: { messages: history, context: ctx } });
      setMsgs((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unbekannter Fehler.";
      setError(msg);
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: `Hoppla — ${msg} Versuch's gleich nochmal.` },
      ]);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setMsgs([WELCOME]);
    setError(null);
  };

  return (
    <>
      {/* Floating button — above bottom nav on mobile */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Pilz-Kumpel Chat öffnen"
        className="tactile fixed right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#1F3327] bg-[#D97D3E] text-white shadow-[0_10px_30px_-6px_rgba(62,39,35,0.4)] transition active:scale-95 md:right-6"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 96px)" }}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Sheet */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
          <div
            className="absolute inset-0 bg-[#1F3327]/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative flex h-[88vh] w-full flex-col rounded-t-3xl border-2 border-[#9A7B56] bg-[#132219] md:h-[80vh] md:max-w-2xl md:rounded-3xl"
            role="dialog"
            aria-label="Pilz-Kumpel Chat"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b-2 border-[#9A7B56] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D97D3E] text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#EADECC]">Pilz-Kumpel</p>
                  <p className="text-[11px] font-semibold text-[#BCA385]">
                    KI-Begleiter · keine Verzehrfreigabe
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  className="rounded-full px-3 py-1 text-[11px] font-bold text-[#BCA385] hover:bg-[#9A7B56]/60"
                >
                  Neu
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Schließen"
                  className="rounded-full p-2 text-[#EADECC] hover:bg-[#9A7B56]/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
            >
              <ul className="space-y-3">
                {msgs.map((m, i) => (
                  <li
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-pre-wrap rounded-2xl border-2 px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "border-[#D97D3E] bg-[#D97D3E] text-white font-semibold"
                          : "border-[#9A7B56] bg-[#1F3327] text-[#EADECC] font-medium"
                      }`}
                    >
                      {m.content}
                    </div>
                  </li>
                ))}
                {sending && (
                  <li className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] px-4 py-2.5 text-sm font-semibold text-[#BCA385]">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Pilz-Kumpel denkt nach…
                    </div>
                  </li>
                )}
              </ul>
            </div>

            {error && (
              <div className="mx-4 mb-2 flex items-start gap-2 rounded-xl border-2 border-orange-700 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-950">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex items-end gap-2 border-t-2 border-[#9A7B56] bg-[#1F3327] p-3"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                rows={1}
                placeholder="Frag mich z. B.: Steinpilz vs. Gallenröhrling?"
                className="min-h-[48px] max-h-32 flex-1 resize-none rounded-2xl border-2 border-[#D97D3E] bg-[#1F3327] px-4 py-3 text-sm font-semibold text-[#EADECC] placeholder:text-[#BCA385] outline-none focus:border-[#1F3327]"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Senden"
                className="tactile flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D97D3E] text-white shadow-[var(--shadow-glow)] transition disabled:opacity-40"
              >
                {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
