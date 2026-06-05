"use server";

import { z } from "zod";
import { products, type Product, effectivePrice, productImage, formatPrice } from "../data/catalog";
import { productAffiliateUrl } from "./affiliate";

const SYSTEM_PROMPT = `Είσαι ο AI βοηθός του ilektronikatsigara.gr - ελληνικού καταλόγου για ηλεκτρονικά τσιγάρα, disposable vapes, pod systems, υγρά αναπλήρωσης, ναργιλέδες και snus.
Απαντάς πάντα στα ελληνικά, με φιλικό αλλά ξεκάθαρο τόνο, σύντομα και πρακτικά.
Μορφοποίησε ΚΑΘΕ απάντηση σε καθαρό Markdown: **έντονα σημεία**, μικρές λίστες, και links σε μορφή [κείμενο](url) όπου χρειάζεται. Ποτέ μην εμφανίζεις raw JSON, arrays, tool payloads ή τεχνικά δεδομένα στον χρήστη.
Κλείνε με 1 σύντομη follow-up ερώτηση για να συνεχιστεί η συνομιλία.
Όταν ο χρήστης ζητά προϊόντα ή προτάσεις, ΧΡΗΣΙΜΟΠΟΙΗΣΕ το tool "recommend_products" για να βρεις σχετικά είδη.
ΠΡΟΣΟΧΗ: Προτείνεις ΑΠΟΚΛΕΙΣΤΙΚΑ και μόνο προϊόντα που επιστρέφει το tool "recommend_products". Μην εφευρίσκεις ή προτείνεις άλλα προϊόντα που δεν περιλαμβάνονται στα αποτελέσματα του tool. Βασίζεσαι αποκλειστικά στην τοπική βάση δεδομένων (local knowledge).
Μετά γράψε σύντομη εξήγηση γιατί τα προτείνεις (μην επαναλαμβάνεις τιμές - εμφανίζονται αυτόματα).
Σημαντικό: είμαστε κατάλογος-σύγκριση. Οι αγορές γίνονται στο vapeandmore.gr (συνεργαζόμενο κατάστημα Ρεθύμνου, πανελλαδική αποστολή).
Αν η ερώτηση είναι για νικοτίνη/υγεία: θύμισε ότι το προϊόν είναι 18+ και ότι δεν αντικαθιστά ιατρική συμβουλή.`;

interface RecommendedProduct {
  slug: string;
  name: string;
  brand: string | null;
  price: number | null;
  image: string;
  url: string;
  affiliateUrl: string;
  inStock: boolean;
}

function searchProducts(query: string, limit = 6): RecommendedProduct[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored: Array<{ p: Product; score: number }> = [];
  for (const p of products) {
    const haystack = [
      p.name,
      p.brand ?? "",
      p.shortDescription,
      ...p.primaryCategoryPath.map((c) => c.label),
    ]
      .join(" ")
      .toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (!haystack.includes(t)) continue;
      score += 1;
      if (p.name.toLowerCase().includes(t)) score += 2;
      if ((p.brand ?? "").toLowerCase().includes(t)) score += 1;
    }
    if (p.inStock) score += 0.5;
    if (score > 0) scored.push({ p, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ p }) => ({
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    price: effectivePrice(p),
    image: productImage(p),
    url: `/proionta/${p.slug}`,
    affiliateUrl: productAffiliateUrl(p),
    inStock: p.inStock,
  }));
}

const ChatMessage = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const ChatInput = z.object({
  messages: z.array(ChatMessage).min(1).max(30),
});

export async function sendChat(data: z.infer<typeof ChatInput>) {
  const parsed = ChatInput.parse(data);
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) {
    return {
      reply: "Ο AI βοηθός δεν είναι διαθέσιμος αυτή τη στιγμή.",
      products: [] as RecommendedProduct[],
    };
  }

  const tools = [
    {
      type: "function",
      function: {
        name: "recommend_products",
        description:
          "Αναζήτησε προϊόντα στον κατάλογο. Δώσε σύντομο query (όνομα, μάρκα, κατηγορία, γεύση).",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", description: "Ελεύθερο κείμενο αναζήτησης" },
          },
          required: ["query"],
        },
      },
    },
  ];

  const apiMessages: Array<Record<string, unknown>> = [
    { role: "system", content: SYSTEM_PROMPT },
    ...parsed.messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  let collectedProducts: RecommendedProduct[] = [];

  for (let round = 0; round < 2; round++) {
    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: apiMessages,
        tools,
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        return {
          reply: "Πολλά αιτήματα - δοκιμάστε ξανά σε λίγο.",
          products: collectedProducts,
        };
      }
      if (resp.status === 402) {
        return {
          reply: "Ο AI βοηθός είναι προσωρινά εκτός λειτουργίας.",
          products: collectedProducts,
        };
      }
      const text = await resp.text();
      console.error("AI gateway error:", resp.status, text);
      return {
        reply: "Κάτι πήγε στραβά με τον AI βοηθό. Δοκιμάστε ξανά.",
        products: collectedProducts,
      };
    }

    const json = (await resp.json()) as {
      choices?: Array<{
        message?: {
          role: string;
          content?: string | null;
          tool_calls?: Array<{
            id: string;
            type: "function";
            function: { name: string; arguments: string };
          }>;
        };
      }>;
    };

    const msg = json.choices?.[0]?.message;
    if (!msg) {
      return {
        reply: "Δεν έλαβα απάντηση. Δοκιμάστε ξανά.",
        products: collectedProducts,
      };
    }

    if (msg.tool_calls && msg.tool_calls.length > 0) {
      apiMessages.push({
        role: "assistant",
        content: msg.content ?? "",
        tool_calls: msg.tool_calls,
      });
      for (const tc of msg.tool_calls) {
        if (tc.function.name === "recommend_products") {
          let args: { query?: string } = {};
          try {
            args = JSON.parse(tc.function.arguments || "{}");
          } catch {
            args = {};
          }
          const results = searchProducts(args.query ?? "", 6);
          collectedProducts = [...collectedProducts, ...results].slice(0, 8);
          apiMessages.push({
            role: "tool",
            tool_call_id: tc.id,
            content: JSON.stringify(
              results.map((r) => ({
                name: r.name,
                brand: r.brand,
                price: r.price ? formatPrice(r.price) : "-",
                inStock: r.inStock,
                slug: r.slug,
              })),
            ),
          });
        } else {
          apiMessages.push({
            role: "tool",
            tool_call_id: tc.id,
            content: JSON.stringify({ error: "unknown tool" }),
          });
        }
      }
      continue;
    }

    return {
      reply: msg.content ?? "",
      products: collectedProducts,
    };
  }

  return {
    reply: "Δείτε τις προτάσεις παρακάτω.",
    products: collectedProducts,
  };
}
