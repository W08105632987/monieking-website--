import { createFileRoute } from "@tanstack/react-router";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatBody = { messages?: unknown };

const SYSTEM_PROMPT = `You are the MonieKing support guide. Be warm, concise, practical, and Nigerian-context aware.
MonieKing is a digital Adashi/Ajo/Esusu contribution savings platform. Customers can use Food Cards (fixed ₦1,000/day, locked until the end of the cycle) and flexible Regular Contribution Cards. A trusted Zone Officer can collect contributions in person; each payment is recorded immediately and remains visible in the app. Customers can also contribute digitally, use a wallet and virtual account, withdraw to a linked account, buy airtime/data, pay electricity/cable bills, purchase education PINs, and request identity services. Identity tiers: Not verified, Basic (BVN or NIN), Full (both). Security includes biometrics where supported and a separate withdrawal password. MonieKing is fully licensed and regulated.
Never invent transaction details, customer records, license numbers, regulator names, fees, guarantees, or dates. Do not claim access to a visitor's account. For account-specific issues, disputes, failed payments, unknown policies, or anything outside this knowledge, explicitly say a team member should help and offer WhatsApp +234 803 899 5252 or joinmonieking@gmail.com.`;

// Google's Gemini API exposes an OpenAI-compatible endpoint, so the same
// @ai-sdk/openai-compatible client that used to point at Lovable's AI Gateway
// works here -- just a different base URL, auth header, and model name.
// Get a free key at https://aistudio.google.com/app/apikey and set it as
// GEMINI_API_KEY in your .env (see .env.example).
function createGeminiProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "gemini",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as ChatBody;
          if (!Array.isArray(body.messages))
            return new Response("Messages are required", { status: 400 });
          const key = process.env["GEMINI_API_KEY"];
          if (!key) return new Response("Support assistant is not configured", { status: 500 });
          const gemini = createGeminiProvider(key);
          const result = streamText({
            model: gemini("gemini-2.5-flash"),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(body.messages as UIMessage[]),
          });
          return result.toUIMessageStreamResponse({
            originalMessages: body.messages as UIMessage[],
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Support assistant request failed";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
