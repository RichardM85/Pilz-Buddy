/**
 * Direct OpenAI API helper. Server-only — uses OPENAI_API_KEY.
 * Surfaces 401/429/quota errors with friendly messages.
 */
type ChatMessage =
  | { role: "system" | "assistant"; content: string }
  | { role: "user"; content: string | Array<TextPart | ImagePart> };

type TextPart = { type: "text"; text: string };
type ImagePart = { type: "image_url"; image_url: { url: string; detail?: "low" | "high" | "auto" } };

export type OpenAIChatOpts = {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  response_format?: { type: "json_object" };
  max_tokens?: number;
};

export async function openaiChat(opts: OpenAIChatOpts): Promise<string> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY ist nicht konfiguriert.");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(opts),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 401) throw new Error("OpenAI-Key ungültig oder abgelaufen.");
    if (res.status === 429) throw new Error("OpenAI Rate-Limit oder Kontingent aufgebraucht.");
    throw new Error(`OpenAI Fehler ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI lieferte keine Antwort.");
  return content;
}
