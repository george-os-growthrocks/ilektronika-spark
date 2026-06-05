import { useState, useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, X, Send, Loader2, ExternalLink, RotateCcw } from "lucide-react";
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
    "Γεια! 👋 Είμαι ο AI βοηθός του ilektronikatsigara.gr. Πες μου τι ψάχνεις — disposable, pod, υγρό, ναργιλέ — και θα σου προτείνω αυθεντικές επιλογές με άμεση διαθεσιμότητα στο vapeandmore.gr.",
};

const PRESETS = [
  "Πρότεινέ μου ένα disposable",
  "Τι pod system για αρχάριο;",
  "Ψάχνω υγρό με μέντα",
  "Φτηνός ναργιλές για αρχή",
];

const FOLLOW_UPS = ["Θέλω πιο οικονομικό", "Δείξε μου διαθέσιμα", "Σύγκρινε τις επιλογές"];

function ChatMarkdown({ content }: { content: string }) {
  return (
    <div className="chat-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="font-bold underline decoration-primary/40 underline-offset-2 hover:text-primary"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-extrabold text-foreground">{children}</strong>,
          ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-4">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-4">{children}</ol>,
          p: ({ children }) => <p className="my-1 first:mt-0 last:mb-0">{children}</p>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

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
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const submitText = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setLoading(true);
    try {
      const result = await send({
        data: { messages: next.map((m) => ({ role: m.role, content: m.content })) },
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.reply, products: result.products },
      ]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Σφάλμα επικοινωνίας. Δοκίμασε ξανά σε λίγο." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([WELCOME]);
    setInput("");
  };

  const showPresets = messages.length === 1 && !loading;

  return (
    <>
      {/* Floating bubble — hidden while chat is open */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="AI βοηθός"
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 transition-transform grid place-items-center"
        >
          <Sparkles className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 bg-background sm:w-[420px] sm:h-[640px] sm:max-h-[calc(100vh-2rem)] sm:rounded-2xl sm:border sm:border-border sm:shadow-2xl flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="AI Βοηθός"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-primary/10 to-transparent shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-sm leading-tight">AI Βοηθός</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  ilektronikatsigara.gr
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={reset}
                aria-label="Νέα συνομιλία"
                title="Νέα συνομιλία"
                className="p-2 rounded hover:bg-surface text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Κλείσιμο"
                className="p-2 rounded hover:bg-surface"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i}>
                <div
                  className={`text-[15px] sm:text-sm leading-relaxed rounded-2xl px-4 py-2.5 max-w-[90%] ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto rounded-br-sm"
                      : "bg-surface text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.role === "assistant" ? <ChatMarkdown content={m.content} /> : m.content}
                </div>
                {m.products && m.products.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {m.products.map((p) => (
                      <div
                        key={p.slug}
                        className="border border-border rounded-xl p-2 flex gap-3 bg-background hover:border-primary transition-colors"
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
                            className="h-20 w-20 object-contain bg-surface rounded-lg"
                            loading="lazy"
                          />
                        </Link>
                        <div className="flex-1 min-w-0 flex flex-col">
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
                          <div className="flex items-center justify-between mt-auto pt-1">
                            <span className="text-sm font-extrabold text-primary">
                              {formatPrice(p.price)}
                            </span>
                            <a
                              href={p.affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="text-[10px] font-extrabold uppercase tracking-widest bg-primary text-primary-foreground px-2.5 py-1 rounded inline-flex items-center gap-1 hover:opacity-90"
                            >
                              Αγορά <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {m.role === "assistant" && i === messages.length - 1 && !showPresets && !loading && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {FOLLOW_UPS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => void submitText(prompt)}
                        className="text-[11px] border border-border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary transition-colors bg-background"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {showPresets && (
              <div className="pt-2 space-y-1.5">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-1">
                  Δοκίμασε
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p}
                      onClick={() => void submitText(p)}
                      className="text-xs border border-border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary transition-colors bg-background"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Σκέφτομαι…
              </div>
            )}
          </div>

          {/* Input + disclaimer */}
          <div className="border-t border-border bg-background shrink-0 pb-[env(safe-area-inset-bottom)]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void submitText(input);
              }}
              className="p-2 sm:p-3 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ρώτησέ με οτιδήποτε…"
                disabled={loading}
                className="flex-1 bg-surface border border-border rounded-full px-4 h-12 sm:h-11 text-base sm:text-sm focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-primary text-primary-foreground rounded-full h-12 w-12 sm:h-11 sm:w-11 grid place-items-center disabled:opacity-50 hover:opacity-90 shrink-0"
                aria-label="Αποστολή"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <div className="text-[10px] text-muted-foreground text-center px-3 pb-2 leading-tight">
              AI βοηθός — μπορεί να κάνει λάθη. <span className="font-bold">18+</span>. Αγορές στο{" "}
              <a
                href="https://vapeandmore.gr"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="underline hover:text-primary"
              >
                vapeandmore.gr
              </a>
              .
            </div>
          </div>
        </div>
      )}
    </>
  );
}
