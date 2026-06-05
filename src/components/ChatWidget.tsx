import { useState, useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { MessageCircle, X, Send, Loader2, ExternalLink } from "lucide-react";
import { sendChat } from "../lib/chat.functions";
import { formatPrice } from "../data/catalog";

interface Msg {
  role: "user" | "assistant";
  content: string;
  products?: Array<{
    slug: string;
    name: string;
    brand: string | null;
    price: number | null;
    image: string;
    url: string;
    affiliateUrl: string;
    inStock: boolean;
  }>;
}

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Γεια! Είμαι ο AI βοηθός του ilektronikatsigara.gr. Πες μου τι ψάχνεις — disposable, pod, υγρό, ναργιλέ — και θα σου προτείνω επιλογές.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const send = useServerFn(sendChat);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const submit = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const result = await send({
        data: {
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        },
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.reply, products: result.products },
      ]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Σφάλμα επικοινωνίας. Δοκιμάστε ξανά." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="AI βοηθός"
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 transition-transform grid place-items-center"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed inset-x-2 bottom-20 sm:right-4 sm:left-auto sm:w-[400px] z-50 bg-background border border-border rounded-lg shadow-2xl flex flex-col max-h-[80vh] sm:max-h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div>
              <div className="font-extrabold text-sm">AI Βοηθός</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                ilektronikatsigara.gr
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Κλείσιμο"
              className="p-1 hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i}>
                <div
                  className={`text-sm leading-relaxed whitespace-pre-wrap rounded-lg px-3 py-2 max-w-[90%] ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-surface text-foreground"
                  }`}
                >
                  {m.content}
                </div>
                {m.products && m.products.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {m.products.map((p) => (
                      <div
                        key={p.slug}
                        className="border border-border rounded-lg p-2 flex gap-2 bg-background hover:border-primary transition-colors"
                      >
                        <Link
                          to="/proionta/$slug"
                          params={{ slug: p.slug }}
                          onClick={() => setOpen(false)}
                          className="shrink-0"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-16 w-16 object-contain bg-surface rounded"
                            loading="lazy"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            to="/proionta/$slug"
                            params={{ slug: p.slug }}
                            onClick={() => setOpen(false)}
                            className="block text-xs font-bold leading-tight line-clamp-2 hover:text-primary"
                          >
                            {p.name}
                          </Link>
                          {p.brand && (
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                              {p.brand}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm font-extrabold text-primary">
                              {formatPrice(p.price)}
                            </span>
                            <a
                              href={p.affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="text-[10px] font-extrabold uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1 rounded inline-flex items-center gap-1 hover:opacity-90"
                            >
                              Αγορά <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                Σκέφτομαι…
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
            className="border-t border-border p-2 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ρώτησέ με οτιδήποτε…"
              disabled={loading}
              className="flex-1 bg-surface border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-primary text-primary-foreground rounded p-2 disabled:opacity-50 hover:opacity-90"
              aria-label="Αποστολή"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
