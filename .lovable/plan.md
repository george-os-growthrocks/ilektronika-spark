
# ilektronikatsigara.gr — Content Hub & Catalog (Phase 1)

A Greek-language, fully responsive, SEO-optimized content site for ηλεκτρονικά τσιγάρα, disposables, υγρά αναπλήρωσης, pods, ναργιλέδες & αξεσουάρ. Catalog browsing only in Phase 1; checkout added later once suppliers are in place.

## Important constraints (read first)

- **No copying from vapeandmore.gr.** Product copy, images, logos, and brand assets are their IP. All content on this site will be original Greek copy I write, plus AI-generated imagery in your own brand style.
- **No canonical tags pointing to vapeandmore.gr.** That would tell Google to de-index your site and credit them. Canonicals will be self-referential (point to your own URLs), which is the only correct SEO behavior. If you want a referral relationship later, that's an affiliate link in the page body — not a canonical.
- **Greek legal note (not legal advice):** Greek law (Ν. 4419/2016 transposing TPD) prohibits cross-border distance sales of vape products to consumers and requires age verification. The site will include an 18+ age gate and disclaimers; you should consult a lawyer before launching sales.

## Phase 1 scope

### 1. Brand & design
- Site name: **ilektronikatsigara.gr** (custom wordmark, no third-party logo).
- 3 rendered design directions (full HTML previews) — you pick one. Locked palette/type/layout across all three; they vary in composition and density.
- Tailwind v4 design tokens in `src/styles.css` (oklch). Mobile-first, fully responsive.
- AI-generated hero/category/product imagery in `src/assets/`.

### 2. Information architecture (routes)
```
/                       Αρχική — hero, κατηγορίες, top guides, featured FAQs
/disposables            Κατηγορία: ηλεκτρονικά τσιγάρα μιας χρήσης
/pods                   Κατηγορία: pod systems
/ygra                   Κατηγορία: υγρά αναπλήρωσης (e-liquids)
/atmistikes             Κατηγορία: ατμοποιητές / mods
/narghiledes            Κατηγορία: ναργιλέδες & αξεσουάρ
/proionta/$slug         Σελίδα προϊόντος (catalog, no cart)
/blog                   Index άρθρων
/blog/$slug             Άρθρο
/odigos-arxarion        Pillar guide: «Οδηγός για αρχάριους»
/syxnes-erotiseis       FAQ / PAA hub (FAQPage schema)
/sxetika                Σχετικά με εμάς
/epikoinonia            Φόρμα επικοινωνίας
/oroi-xrisis            Όροι Χρήσης
/politiki-aporritou     Πολιτική Απορρήτου
/cookies                Πολιτική Cookies
/apostoles-epistrofes   Αποστολές & Επιστροφές
/sitemap.xml            Dynamic sitemap (server route)
/robots.txt             Allow all + sitemap reference
```

### 3. Content (original, Greek, SEO-driven)
Keyword research targets (indicative, expanded during build):
- Head: ηλεκτρονικό τσιγάρο, disposable vape, υγρά αναπλήρωσης, pod system, ναργιλές, ατμιστικές
- Long-tail: «καλύτερο ηλεκτρονικό τσιγάρο για αρχάριους», «disposable vape χωρίς νικοτίνη», «πώς να καθαρίσω τον ναργιλέ μου», «διαφορά pod και mod»

Deliverables:
- 6 category landing pages with intro copy, buying guide, FAQ block
- 8 blog/guide posts (~800–1200 λέξεις, original) — pillar + cluster structure
- 12 demo products per main category with original Greek descriptions
- FAQ hub + per-page FAQ blocks (FAQPage JSON-LD on FAQ pages, per-product FAQ blocks)
- People-Also-Ask style Q&A blocks embedded in category pages

### 4. SEO / AEO / GEO
- Per-route `head()` with unique title, description, og:title, og:description, og:image
- Self-referential canonicals on every leaf route
- JSON-LD: `WebSite` + `Organization` (root), `Product` (product pages), `Article` (blog), `FAQPage` (FAQ + category FAQs), `BreadcrumbList` (deep routes)
- Dynamic `/sitemap.xml` server route generated from route list + content
- `/robots.txt` with sitemap reference
- Greek `lang="el"`, geo meta (`geo.region=GR`), `hreflang=el`
- AEO/GEO: clear Q&A formatting, short answer paragraphs, semantic HTML, alt text

### 5. Compliance / UX
- **18+ age gate modal** on first visit (localStorage flag), blocks all routes until accepted
- Nicotine/health warning banner in footer of every page
- Cookie consent banner (basic — no third-party analytics in Phase 1)
- Σχετικά / Επικοινωνία / Όροι Χρήσης / Απορρήτου / Cookies / Αποστολές & Επιστροφές — full Greek copy (template, you review with lawyer)

### 6. Tech / quality bar
- TanStack Start (current template), Tailwind v4, shadcn UI
- TanStack Query for data, file-based routing, per-route metadata
- Lighthouse targets: Perf ≥ 90 mobile, SEO 100, A11y ≥ 95
- All images lazy-loaded with width/height, alt in Greek
- Error boundaries + 404 page in Greek

## Out of scope for Phase 1 (Phase 2 add-ons)
- Real checkout (Shopify or Stripe)
- Real inventory / supplier feed import
- User accounts, wishlist, reviews
- Email capture → newsletter automation
- Analytics (GA4/Plausible) + Search Console verification

## Build order
1. Design directions (3 rendered previews → you pick)
2. Brand tokens, layout shell, header/footer, age gate
3. Routes scaffold + per-route metadata + sitemap + robots
4. Home + 6 category pages with original copy + generated imagery
5. Product detail template + 12 demo products per category
6. Blog index + 8 articles, FAQ hub
7. Legal pages (Greek)
8. SEO QA pass + responsive QA pass

## Technical notes
- `src/styles.css` only — no `tailwind.config.js`
- All routes in `src/routes/` (flat dot-notation), `__root.tsx` for shell
- Canonicals on leaf routes only (TanStack dedup caveat)
- `og:image` on leaf routes only
- Greek fonts via `@fontsource` (e.g. Manrope + Cormorant or similar, chosen during design step)

---

Approve this plan and I'll generate the 3 design directions next.
