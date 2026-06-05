# Build Plan — ilektronikatsigara.gr v2

Big push across navigation, content, SEO and conversational AI. Grouped into 8 workstreams; each ships independently.

## 1. Mega Menu (desktop) + Full-screen Mobile Menu

**Desktop mega menu** (replaces current Header dropdowns):
- Hover/click opens full-width panel under header
- Layout per category: left column = subcategories list, center = 3-4 featured/bestseller products (ProductCard mini), right = brand shortcuts
- Marketing badges inline next to category names: `NEW`, `HOT`, `-X%`, `SALE` (driven by data in `categories.generated.json` — add `badge` field, manually curated for top categories)
- Featured products = first 4 in-stock products of the category, sorted by has-image + price desc

**Mobile menu**:
- Full-screen overlay (edge-to-edge, `fixed inset-0 z-50`), slide-in from right
- Accordion category list with same badges
- Search bar pinned top, quick links (Προσφορές, Νέα, Brands, Επικοινωνία) pinned bottom
- Body scroll-lock when open

Files: rewrite `src/components/Header.tsx`, add `src/components/MegaMenu.tsx`, `src/components/MobileMenu.tsx`, extend `categories.generated.json` schema with optional `badge`.

## 2. AI-Generated FAQs (one-time, committed)

Use Lovable AI Gateway via a Python script in `scripts/generate-faqs.py`:
- Generate 5-7 Greek FAQs per category (85 categories) → `src/data/faqs.categories.generated.json`
- Generate 4-6 Greek FAQs per product (1070 products, batched) → `src/data/faqs.products.generated.json`
- Model: `google/gemini-3-flash-preview`, structured JSON output, prompt includes category/product name + attributes + Greek vape-shop tone
- Render as `<details>` accordion on category, subcategory, and product pages with `FAQPage` JSON-LD

Estimated runtime: ~20-30 min for products (batched 20/req). One-time cost.

## 3. Category Descriptions & Internal Linking

- AI-generate 80-150 word Greek intro paragraph per category & subcategory (same script run) → stored in the categories JSON
- Render above product grid on `$category.tsx` and `$category.$subcategory.tsx`
- Internal linking block at bottom of each category page: "Σχετικές κατηγορίες" (siblings) + "Δημοφιλείς μάρκες" (top 6 brands in category)
- Product pages already link to category/brand; add "Παρόμοια προϊόντα" (4 from same subcategory) and "Άλλα προϊόντα της μάρκας"

## 4. Blog — 2026 Rewrite

Generate ~10-12 fresh Greek posts via AI script (one per major category cluster). Topics auto-picked per category:
- Disposable vapes 2026 trends
- Pod systems buyer's guide 2026
- Nicotine salts vs freebase
- DIY e-liquid basics
- Coil & atomizer maintenance
- Greek vaping law update 2026
- Best vape kit under 50€ 2026
- (etc., one per top category)

Each post: 800-1200 words, 3-5 contextual outbound links to vapeandmore.gr (with UTM), 2-3 internal links to our category/product pages, JSON-LD `Article`. Overwrite `src/data/blog.generated.json`.

## 5. Full SEO Pass

- Audit every route's `head()`: title <60ch, description <160ch, og:title, og:description, og:url, JSON-LD where relevant
- Rewrite root `__root.tsx` defaults (Organization JSON-LD with brand, social)
- Per-category & per-product unique meta (templated from data)
- `sitemap.xml.ts` — verify all 1070 products + 85 categories + brands + blog + static pages included, lastmod, priority
- `public/robots.txt` — allow all, point to sitemap
- `public/llms.txt` — site overview + curated link list per llms.txt spec
- `public/llms-full.txt` — full catalog dump: every category & product as markdown blocks with name, description, attributes, affiliate URL

## 6. Legal & Contact Pages (Firecrawl scrape)

Scrape vapeandmore.gr legal pages with Firecrawl connector:
- `/oroi-xrisis` (Όροι Χρήσης)
- `/politiki-aporritou` (Πολιτική Απορρήτου)
- `/cookies`
- `/epikoinonia` (Contact) — surface store address, phone, email, hours, map embed
- `/apostoles-epistrofes` (Shipping/Returns)

Render as static routes; add disclaimer banner "Affiliate site — purchases happen on vapeandmore.gr". Update footer to link them.

## 7. Footer

- Add logo (top-left of footer)
- 4 columns: Brand+about, Κατηγορίες (top 8), Εξυπηρέτηση (legal/contact), Newsletter (placeholder, no backend)
- Affiliate disclaimer line bottom

## 8. AI Chat Assistant ("Full" scope)

**UX**: Floating chat bubble bottom-right, opens panel (mobile = full-screen).
- Streaming responses (SSE), markdown rendering, message history in `sessionStorage`
- Tool-calling: model can return product references → render rich `ProductCard` inline in chat with image, price, stock, ΑΓΟΡΑ ΤΩΡΑ CTA

**Backend** — TanStack server route `src/routes/api/chat.ts`:
- Reads `LOVABLE_API_KEY`, calls AI Gateway `/v1/chat/completions` with `stream: true`
- System prompt loaded from `src/lib/chat-system-prompt.ts` — includes shop identity, all 85 categories, top brands, legal/shipping facts (scraped), tone (friendly Greek, age-gate disclaimer)
- Tool: `recommend_products({query, category?, max_price?, limit})` — searches local catalog (in-memory filter on `products.generated.json`), returns up to 6 product IDs with reason
- Tool: `lookup_faq({topic})` — searches scraped legal/shipping facts + category FAQs
- Tool: `compare_products({ids})` — returns attribute matrix
- Streams text + emits `[[PRODUCT:id1,id2,id3]]` sentinel tokens that the client parses and replaces with product cards

**Training data**: System prompt + RAG-lite via tools (no vector DB needed — 1070 products fit in memory, filtered server-side per query).

## Technical notes

- Mega menu uses Radix HoverCard/Popover for accessibility
- Mobile menu uses Sheet from shadcn with custom full-screen variant
- AI FAQ script reuses `scripts/import-products.py` pattern (Python, uses `requests` to AI Gateway)
- Chat uses existing `client.ts` patterns; no DB persistence (sessionStorage only — user can ask "remember this" later if needed)
- All affiliate CTAs go through `productAffiliateUrl()` (already correct `?p=ID` format)
- Firecrawl scraping done one-time via script; results committed as JSON

## Execution order

1. Mega menu + mobile menu + footer logo (foundation, immediate visual win)
2. Firecrawl scrape legal/contact → static routes
3. AI script: category descriptions + FAQs (categories + products)
4. AI script: blog rewrite
5. SEO sweep + sitemap + llms.txt + llms-full.txt
6. AI chat assistant (largest, last)

Reply **"go"** to start building, or tell me which workstream to prioritize / skip.
