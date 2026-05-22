import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { openaiChat } from "./openai.server";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const ContextMushroomSchema = z.object({
  name_de: z.string(),
  name_lat: z.string(),
  difficulty: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  verwechslung: z.string().nullable().optional(),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
  context: z.array(ContextMushroomSchema).max(50).optional(),
});

export type ChatReply = { reply: string };

export const chatWithPilzKumpel = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<ChatReply> => {
    const ctx = (data.context ?? [])
      .slice(0, 50)
      .map(
        (m) =>
          `- ${m.name_de} (${m.name_lat}) · ${m.type ?? "?"} · ${m.difficulty ?? "?"}${m.verwechslung ? ` · Verwechslung: ${m.verwechslung.slice(0, 120)}` : ""}`,
      )
      .join("\n");

    const system = [
      "Du bist 'Pilz-Kumpel', der humorvoll-locker-präzise deutsche Mykologie-Begleiter dieser App (FungaStarter).",
      "Sprich Du, kurze Sätze, gerne ein bisschen Wortwitz mit Pilzen, aber bei Sicherheit immer ernst.",
      "Gib niemals eine Verzehrfreigabe. Bei Giftverdacht immer auf einen Pilzsachverständigen (DGfM) verweisen.",
      "Nutze diese Pilz-Datenbank als Faktenbasis, wenn passend:",
      ctx || "(keine Datenbank-Auszüge geladen)",
      "Antworte auf Deutsch. Wenn du etwas nicht weißt, sag es ehrlich.",
    ].join("\n");

    const reply = await openaiChat({
      model: "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 500,
      messages: [
        { role: "system", content: system },
        ...data.messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    return { reply };
  });
