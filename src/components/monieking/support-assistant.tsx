import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Bot, Mail, MessageCircle, Send, Sparkles, X } from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";

const STORAGE_KEY = "monieking-support-conversation";
const suggestions = [
  "How do contribution cards work?",
  "Can a Zone Officer collect cash?",
  "How do I verify my identity?",
];

function loadMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function SupportAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, setMessages, status, stop, error } = useChat({ transport });

  useEffect(() => {
    setMessages(loadMessages());
  }, [setMessages]);
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const submit = (text = input) => {
    const clean = text.trim();
    if (!clean || status === "submitted" || status === "streaming") return;
    void sendMessage({ text: clean });
    setInput("");
  };

  return (
    <>
      {open && (
        <section
          className="fixed bottom-5 right-3 z-[80] flex h-[min(680px,calc(100vh-2rem))] w-[calc(100vw-1.5rem)] max-w-[400px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#09120d] shadow-2xl sm:bottom-24 sm:right-6"
          aria-label="MonieKing support assistant"
        >
          <header className="flex items-center gap-3 border-b border-white/10 p-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-app-ink">
              <Bot className="size-5" />
            </span>
            <div>
              <h2 className="text-sm font-extrabold text-app-cream">Ask MonieKing</h2>
              <p className="flex items-center gap-1 text-[11px] text-app-mint">
                <span className="size-1.5 rounded-full bg-app-green" /> Digital support guide
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto rounded-full p-2 text-app-mint hover:bg-white/10"
              aria-label="Close support"
            >
              <X className="size-4" />
            </button>
          </header>
          <Conversation className="min-h-0 flex-1">
            <ConversationContent className="gap-4 p-4">
              {messages.length === 0 ? (
                <ConversationEmptyState
                  icon={<Sparkles className="size-6 text-primary" />}
                  title="How can we help?"
                  description="Ask about contribution cards, wallets, bills, verification, or Zone Officers."
                >
                  <div className="mt-4 grid gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => submit(s)}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-app-cream transition hover:border-primary/50 hover:bg-white/10"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </ConversationEmptyState>
              ) : (
                messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent
                      className={
                        message.role === "user"
                          ? "bg-primary text-app-ink"
                          : "bg-white/7 text-app-cream"
                      }
                    >
                      {message.parts.map((part, index) =>
                        part.type === "text" ? (
                          <MessageResponse key={`${message.id}-${index}`}>
                            {part.text}
                          </MessageResponse>
                        ) : null,
                      )}
                    </MessageContent>
                  </Message>
                ))
              )}
              {error && (
                <p className="rounded-xl bg-red-400/10 p-3 text-xs text-red-200">
                  The assistant is temporarily unavailable. Please use the contact options below.
                </p>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
          <div className="border-t border-white/10 p-3">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submit();
              }}
              className="flex items-end gap-2 rounded-2xl bg-white/7 p-2"
            >
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submit();
                  }
                }}
                rows={1}
                placeholder="Ask about MonieKing…"
                className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-app-cream outline-none placeholder:text-app-mint/40"
              />
              <button
                type={status === "streaming" ? "button" : "submit"}
                onClick={status === "streaming" ? stop : undefined}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-app-ink disabled:opacity-40"
                disabled={!input.trim() && status !== "streaming"}
                aria-label={status === "streaming" ? "Stop response" : "Send message"}
              >
                {status === "streaming" ? <X className="size-4" /> : <Send className="size-4" />}
              </button>
            </form>
            <div className="mt-2 flex items-center justify-center gap-4 text-[10px] text-app-mint/60">
              <a
                href="https://wa.me/2348038995252"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-primary"
              >
                <MessageCircle className="size-3" /> WhatsApp staff
              </a>
              <a
                href="mailto:joinmonieking@gmail.com"
                className="flex items-center gap-1 hover:text-primary"
              >
                <Mail className="size-3" /> Email staff
              </a>
            </div>
          </div>
        </section>
      )}
      <button
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 right-4 z-[70] flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-xs font-extrabold text-app-ink shadow-[0_20px_60px_rgba(241,150,29,.35)] transition hover:-translate-y-1 sm:bottom-6 sm:right-6"
        aria-expanded={open}
        aria-label="Open MonieKing support"
      >
        <MessageCircle className="size-5" />
        <span>Ask MonieKing</span>
      </button>
    </>
  );
}
