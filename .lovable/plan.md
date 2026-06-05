## Goal

Turn the catalog into a Skroutz/Amazon-style affiliate front for vapeandmore.gr:
every product card and product page shows the live image, brand, price, stock,
a "Διαθέσιμο στο vapeandmore.gr" badge with the source logo, and an
"Αγορά τώρα" button that opens the real product page on vapeandmore.gr with a
UTM tag — so we route traffic and money to the user's real store.

## Data ingestion (one-time build script)

`scripts/import-products.ts` (Node, run with `bun`) consumes
`user-uploads://wc-product-export-5-6-2026-1780661121789.csv`:

1. Parse all 1,407 rows. Keep `simple` (1,000) and `variable` (75) — drop
   `variation` (332) so each product appears once.
2. For each row produce a `Product` record:
   - `id` = ID, `name`, `brand` (from "Μάρκες"; first if multiple)
   - `slug` = greeklish-slugified name, deduped with `-<id>` if collision
   - `categories[]` = parsed "Κατηγορίες" tree (e.g.
     `Υγρά αναπλήρωσης > Flavorshots > Flavorshots 60ml` → array of
     `{slug,label}` breadcrumbs) — also keep `primaryCategorySlug`
   - `images[]` = pipe-split "Εικόνες" (hotlinked from vapeandmore.gr CDN)
   - `price` = "Κανονική τιμή" (parse "9,9" → 9.90)
   - `salePrice` = "Τιμή προσφοράς" if present
   - `inStock` = "Σε απόθεμα;" === "1"
   - `shortDescription` = "Σύντομη περιγραφή" stripped of WP/Elementor HTML
   - `attributes` = "Όνομα ιδιότητας 1/2" + "Τιμή(ές) ιδιότητας 1/2"
     (e.g. Γεύση, Νικοτίνη)
   - `sku` from "Κωδικός προϊόντος"
3. Output a single `src/data/products.generated.ts` (~1075 products,
   ~1.5 MB string). Top-level `Product[]` plus
   `productsBySlug`, `productsByCategory`, `productsByBrand` lookup maps
   built lazily at runtime to keep imports cheap.
4. Categories: build `src/data/categories.generated.ts` from the unique
   category paths, with parent/child relations, product counts, and
   slugified URLs. Greek labels preserved.
5. Brands: build `src/data/brands.generated.ts` from "Μάρκες" with counts.

Run `bun scripts/import-products.ts` once; commit the generated files.
(The old `src/data/products.ts` + `src/data/categories.ts` are replaced.)

## Affiliate URL resolution (Firecrawl URL map)

Server function `src/lib/vapeandmore-urls.functions.ts`:

- Uses Firecrawl `map()` once against `https://vapeandmore.gr/product-sitemap.xml`
  (or `/product-category/`) to fetch every real product URL.
- Matches each CSV product to a real URL by slug → falls back to SKU lookup
  → falls back to derived `/product/<slug>/`.
- Caches the resulting `slug → vapeandmoreUrl` map in
  `src/data/vapeandmore-urls.generated.json`.
- Build helper `productAffiliateUrl(product)` returns
  `https://vapeandmore.gr/product/<slug>/?utm_source=ilektronikatsigara&utm_medium=referral&utm_campaign=catalog`.

This needs the **Firecrawl connector** linked (one click). If the user
declines, we fall back to derived `/product/<slug>/` URLs.

## Routes (rebuilt)

- `/` — home with featured/new arrivals from real catalog
- `/katigories` — full category tree
- `/$category` — top-level category page (e.g. `/ygra-anaplirosis`,
  `/disposables`, `/narghiledes`) with subcategory chips + product grid
  + filters (brand, in-stock, price range), 24 per page, pagination
- `/$category/$subcategory` — drill-down (e.g.
  `/ygra-anaplirosis/flavorshots/flavorshots-60ml`)
- `/proionta/$slug` — product detail page (see below)
- `/marka/$brand` — brand landing page
- `/anazitisi` — search by name/SKU/brand (client-side filter over the
  generated JSON)

`__root.tsx`, blog, FAQ, legal pages stay as-is.

## Product detail page (`/proionta/$slug`)

Skroutz-style layout:

```text
┌────────────────────────────────────────────────────────────┐
│ breadcrumbs  Αρχική › Υγρά › Flavorshots › <name>           │
├──────────────────────────┬─────────────────────────────────┤
│  [main image]            │  Brand chip                      │
│  [thumbnails]            │  <H1 product name>               │
│                          │  ★ rating (placeholder)          │
│                          │  €9,90  ~~€12,90~~ (if sale)     │
│                          │                                  │
│                          │  ✓ Σε απόθεμα / ✗ Εξαντλημένο    │
│                          │                                  │
│                          │  ┌─ Διαθέσιμο σε κατάστημα ───┐  │
│                          │  │ [vapeandmore.gr logo]      │  │
│                          │  │ Vape and More              │  │
│                          │  │ Ρέθυμνο · Πανελλαδική      │  │
│                          │  │ €9,90  [ ΑΓΟΡΑ ΤΩΡΑ → ]   │  │
│                          │  └────────────────────────────┘  │
│                          │                                  │
│                          │  Γεύση: Tobacco · Νικοτίνη: 20mg│
└──────────────────────────┴─────────────────────────────────┘
│  Περιγραφή · Χαρακτηριστικά · Σχετικά προϊόντα · FAQ        │
```

- "ΑΓΟΡΑ ΤΩΡΑ" button = primary CTA, opens `vapeandmoreUrl` in new tab
  with `rel="noopener nofollow sponsored"` and a small `↗` icon.
- "Διαθέσιμο σε κατάστημα" merchant card mimics Skroutz: vapeandmore.gr
  logo (already on CDN as `src/assets/logo.webp.asset.json`), shop name,
  shipping note, mirrored price, second smaller "Αγορά τώρα" link.
- Out-of-stock products keep the card but show `Εξαντλημένο` and a
  secondary "Δες παρόμοια προϊόντα" button.
- JSON-LD `Product` schema (name, image, brand, offers, availability,
  url=vapeandmore.gr URL) + `BreadcrumbList`.
- `<link rel="canonical">` points to the vapeandmore.gr URL — explicitly
  prevents duplicate-content cannibalization (per your earlier directive).
- Related: 4 products from same primary category, excluding current.

## Category & listing pages

Product card:
- 4:5 image (lazy)
- Brand label (small caps)
- Product name (2-line clamp)
- Price line: bold sale price + strikethrough regular if discounted
- Stock pill: `Διαθέσιμο` (teal) / `Εξαντλημένο` (muted)
- Hover reveals a small "Αγορά τώρα" pill linking direct to vapeandmore.gr
- Whole card links to `/proionta/$slug` (internal detail page)

Filters (URL-synced via search params):
- brand (multi)
- in-stock toggle (default on per your "show out-of-stock too" answer,
  but sorted to bottom)
- price min/max
- sort: relevance / price asc / price desc / newest

Pagination: 24 per page, prev/next + numeric.

## Live stock refresh (Firecrawl nightly)

Server route `src/routes/api/public/refresh-stock.ts`:
- Cron-friendly endpoint, signed with `REFRESH_STOCK_SECRET`.
- Uses Firecrawl `batchScrape` over `vapeandmoreUrl` list in chunks
  (50 at a time) extracting `availability` + `price` via JSON schema.
- Writes results to `src/data/stock-snapshot.generated.json`
  (`{ slug: { inStock, price, salePrice, checkedAt } }`).
- Product pages prefer snapshot data when it's <24h old, else fall back
  to CSV.
- A scheduling option: free Cloudflare cron (set in a follow-up) or
  cron-job.org hitting the stable preview URL. Out of scope for this
  build — the endpoint is shipped, scheduling step is documented in the
  closing message.

## SEO

- Canonical on every product/category → vapeandmore.gr equivalent (avoids
  duplicate-content penalty; we act as an affiliate, not a competitor).
- Sitemap regenerated to include all category, subcategory, brand, and
  product URLs from the generated data.
- Robots stays open. Every product page emits Product JSON-LD + Breadcrumb.
- Category pages emit ItemList JSON-LD with top 24 products.
- Greek `lang="el"` already in place.

## Palette / branding

No changes — sticking with the Classy palette you locked in
(`#168781` primary, `#2b4878` secondary, `#6079ad` accent,
`#95b1ae` muted, `#334b49` foreground). Header logo unchanged.

## File-level changes

```text
NEW   scripts/import-products.ts                # one-shot CSV → TS
NEW   src/data/products.generated.ts            # ~1075 products
NEW   src/data/categories.generated.ts          # category tree
NEW   src/data/brands.generated.ts              # brand index
NEW   src/data/vapeandmore-urls.generated.json  # slug → real URL
NEW   src/lib/affiliate.ts                      # productAffiliateUrl(...)
NEW   src/lib/vapeandmore-urls.functions.ts     # Firecrawl URL mapper
NEW   src/lib/catalog.ts                        # search/filter/sort helpers
NEW   src/components/ProductCard.tsx
NEW   src/components/MerchantCard.tsx           # "Διαθέσιμο σε κατάστημα"
NEW   src/components/CategoryNav.tsx
NEW   src/components/FilterSidebar.tsx
NEW   src/routes/katigories.tsx
NEW   src/routes/$category.$subcategory.tsx
NEW   src/routes/marka.$brand.tsx
NEW   src/routes/anazitisi.tsx
NEW   src/routes/api/public/refresh-stock.ts
EDIT  src/routes/$category.tsx                  # use real data + filters
EDIT  src/routes/proionta.$slug.tsx             # Skroutz-style layout
EDIT  src/routes/index.tsx                      # real featured products
EDIT  src/routes/sitemap[.]xml.ts               # all routes
EDIT  src/components/Header.tsx                 # real category mega-menu
DROP  src/data/products.ts (demo)               # superseded
DROP  src/data/categories.ts (demo)             # superseded
```

## Connector & secret asks (during build)

- Link the **Firecrawl** connector (for URL map + nightly stock refresh).
- Add `REFRESH_STOCK_SECRET` (random 32-char string) so the cron endpoint
  is not callable by random visitors.

## What's out of scope (v1)

- Real checkout / cart on ilektronikatsigara.gr (by design — every buy
  action goes to vapeandmore.gr).
- User accounts, reviews submission.
- Actually scheduling the nightly cron (endpoint shipped, scheduler is
  one extra step after publish).
- Migrating blog/FAQ content (already in place from earlier work).

## Build order

1. Write `scripts/import-products.ts` and run it → generate the three
   data files.
2. Link Firecrawl, build `vapeandmore-urls.functions.ts`, run once,
   commit the URL map JSON.
3. New shared components (ProductCard, MerchantCard, FilterSidebar,
   CategoryNav).
4. Rewrite `proionta.$slug.tsx` with Skroutz-style layout + JSON-LD +
   canonical to vapeandmore.gr.
5. Rewrite `$category.tsx`, add `$category.$subcategory.tsx`,
   `katigories.tsx`, `marka.$brand.tsx`, `anazitisi.tsx`.
6. Refresh `index.tsx` and `Header.tsx` with real categories/featured.
7. Update sitemap to enumerate all generated routes.
8. Ship `api/public/refresh-stock.ts` + add `REFRESH_STOCK_SECRET`.
9. QA: spot-check 5 products, verify "Αγορά τώρα" hits a real
   vapeandmore.gr URL with UTM, verify canonical, verify Lighthouse
   isn't tanked by the 1k-product data import (lazy maps + per-route
   slicing).
