/**
 * Server-only catalog data layer.
 *
 * Imports the generated JSON (2+ MB). It must never be imported from a
 * `"use client"` file: client components receive already-projected data
 * (see `CardProduct`, `NavData`) as props instead.
 */
import productsData from "./products.generated.json";
import categoriesData from "./categories.generated.json";
import brandsData from "./brands.generated.json";
import type { Brand, CardProduct, Category, Product } from "./catalog-types";
import { effectivePrice } from "./catalog-types";
import { categoryMeta } from "./category-meta";
import type { NavData, NavPillar } from "./nav-types";
import { normalizeText, tokenize } from "@/lib/text";

if (typeof window !== "undefined") {
  throw new Error("src/data/catalog.ts is server-only and must not be bundled for the browser.");
}

export type { Brand, CardProduct, Category, CategoryNode, Product } from "./catalog-types";
export { effectivePrice, formatPrice, priceLabel, productImage } from "./catalog-types";

export const products: Product[] = productsData as Product[];
export const categories: Category[] = categoriesData as Category[];
export const brands: Brand[] = brandsData as Brand[];

// ---------- Lazy lookup maps ----------

let _bySlug: Map<string, Product> | null = null;
export function productBySlug(slug: string): Product | undefined {
  if (!_bySlug) {
    _bySlug = new Map();
    for (const p of products) _bySlug.set(p.slug, p);
  }
  return _bySlug.get(slug);
}

let _byCatAny: Map<string, Product[]> | null = null;
function ensureCatMaps() {
  if (_byCatAny) return;
  _byCatAny = new Map();
  for (const p of products) {
    const seen = new Set<string>();
    for (const path of p.categoryPaths) {
      for (const node of path) {
        if (seen.has(node.slug)) continue;
        seen.add(node.slug);
        if (!_byCatAny.has(node.slug)) _byCatAny.set(node.slug, []);
        _byCatAny.get(node.slug)!.push(p);
      }
    }
  }
}

export function productsInCategory(slug: string): Product[] {
  ensureCatMaps();
  return _byCatAny!.get(slug) ?? [];
}

let _byBrand: Map<string, Product[]> | null = null;
export function productsByBrand(slug: string): Product[] {
  if (!_byBrand) {
    _byBrand = new Map();
    for (const p of products) {
      if (!p.brandSlug) continue;
      if (!_byBrand.has(p.brandSlug)) _byBrand.set(p.brandSlug, []);
      _byBrand.get(p.brandSlug)!.push(p);
    }
  }
  return _byBrand.get(slug) ?? [];
}

let _catBySlug: Map<string, Category> | null = null;
export function categoryBySlug(slug: string): Category | undefined {
  if (!_catBySlug) {
    _catBySlug = new Map();
    for (const c of categories) _catBySlug.set(c.slug, c);
  }
  return _catBySlug.get(slug);
}

let _brandBySlug: Map<string, Brand> | null = null;
export function brandBySlug(slug: string): Brand | undefined {
  if (!_brandBySlug) {
    _brandBySlug = new Map();
    for (const b of brands) _brandBySlug.set(b.slug, b);
  }
  return _brandBySlug.get(slug);
}

export function topLevelCategories(): Category[] {
  return categories.filter((c) => c.depth === 0).sort((a, b) => b.count - a.count);
}

export function subcategoriesOf(parentSlug: string): Category[] {
  return categories.filter((c) => c.parentSlug === parentSlug).sort((a, b) => b.count - a.count);
}

/** Canonical path of a category page: `/top` or `/top/leaf` (deeper levels sit under their top ancestor). */
export function categoryUrl(cat: Category): string {
  if (cat.depth === 0 || cat.ancestors.length === 0) return `/${cat.slug}`;
  return `/${cat.ancestors[0].slug}/${cat.slug}`;
}

// ---------- Navigation pillars ----------

const PILLAR_SLUGS = [
  "ygra-anaplirosis",
  "disposables",
  "syskeyes-vape",
  "snus",
  "antistaseis",
  "nargiledes",
];

const PILLAR_RELATED: Record<string, string[]> = {
  "syskeyes-vape": [
    "atmopoiites",
    "antallaktika-vape",
    "axesoyar-vape",
    "ilektronika-tsigara",
    "cbd",
    "protes-yles",
  ],
  antistaseis: ["atmopoiites"],
  nargiledes: [
    "geyseis-kai-kapnoi-nargile",
    "axesoyar-nargile",
    "mpol-kefales",
    "karvoynakia-nargile",
  ],
  poyra: ["axesoyar-poyron", "ygrantires-poyron", "anaptires-poyron"],
};

export function pillarCategories(): Category[] {
  return PILLAR_SLUGS.map((slug) => categoryBySlug(slug)).filter((c): c is Category => Boolean(c));
}

export function relatedCategoriesForPillar(pillarSlug: string): Category[] {
  return (PILLAR_RELATED[pillarSlug] ?? [])
    .map((slug) => categoryBySlug(slug))
    .filter((c): c is Category => Boolean(c));
}

// ---------- Projections ----------

export function toCard(p: Product): CardProduct {
  const top = p.primaryCategoryPath[0] ?? null;
  return {
    id: p.id,
    slug: p.slug,
    wpSlug: p.wpSlug,
    name: p.name,
    brand: p.brand,
    brandSlug: p.brandSlug,
    image: p.images[0] ?? "",
    price: p.price,
    salePrice: p.salePrice,
    minPrice: p.minPrice ?? null,
    inStock: p.inStock,
    categorySlug: top?.slug ?? p.primaryTopSlug,
    categoryLabel: top?.label ?? null,
  };
}

function isSellable(p: Product): boolean {
  return p.inStock && p.images.length > 0 && effectivePrice(p) != null;
}

/**
 * Products worth featuring for a category: in stock, imaged, priced, and from
 * the brands that are best represented in that category (a proxy for demand
 * until real sales data is wired in).
 */
export function featuredForCategory(slug: string, n = 4): Product[] {
  const list = productsInCategory(slug).filter(isSellable);
  const brandCount = new Map<string, number>();
  for (const p of list)
    if (p.brandSlug) brandCount.set(p.brandSlug, (brandCount.get(p.brandSlug) ?? 0) + 1);
  const seenBrand = new Set<string>();
  const ranked = [...list].sort((a, b) => {
    const bc = (brandCount.get(b.brandSlug ?? "") ?? 0) - (brandCount.get(a.brandSlug ?? "") ?? 0);
    if (bc !== 0) return bc;
    return Number(b.id) - Number(a.id);
  });
  const out: Product[] = [];
  for (const p of ranked) {
    if (p.brandSlug && seenBrand.has(p.brandSlug)) continue;
    if (p.brandSlug) seenBrand.add(p.brandSlug);
    out.push(p);
    if (out.length >= n) break;
  }
  if (out.length < n)
    for (const p of ranked)
      if (!out.includes(p)) {
        out.push(p);
        if (out.length >= n) break;
      }
  return out;
}

/** Home page "best sellers": two products from each key pillar, rotating so the row is varied. */
export function bestSellers(n = 8): Product[] {
  const pillars = [
    "disposables",
    "syskeyes-vape",
    "ygra-anaplirosis",
    "snus",
    "nargiledes",
    "antistaseis",
  ];
  const picks = pillars.map((s) => featuredForCategory(s, 2));
  const out: Product[] = [];
  for (let i = 0; i < 2 && out.length < n; i++) {
    for (const list of picks) {
      const p = list[i];
      if (p && !out.includes(p)) out.push(p);
      if (out.length >= n) break;
    }
  }
  return out;
}

/** First in-stock product image for a category card. */
export function categoryHeroImage(slug: string): string | null {
  const p =
    featuredForCategory(slug, 1)[0] ?? productsInCategory(slug).find((x) => x.images.length > 0);
  return p?.images[0] ?? null;
}

export function buildNavData(): NavData {
  const pillars: NavPillar[] = pillarCategories().map((c) => {
    const meta = categoryMeta(c.slug);
    const subs = [...subcategoriesOf(c.slug), ...relatedCategoriesForPillar(c.slug)].map((s) => ({
      slug: s.slug,
      label: s.label,
      count: s.count,
      href: categoryUrl(s),
    }));
    return {
      slug: c.slug,
      label: c.label,
      count: c.count,
      href: `/${c.slug}`,
      badge: meta.badge,
      tagline: meta.tagline,
      intro: meta.intro ? meta.intro.slice(0, 160) : undefined,
      subs: subs.slice(0, 24),
      featured: featuredForCategory(c.slug, 4).map(toCard),
    };
  });
  return {
    pillars,
    quick: [
      { href: "/disposables", label: "🔥 Disposables", tone: "hot" },
      { href: "/syskeyes-vape", label: "⭐ Pod kits", tone: "top" },
      { href: "/snus", label: "✨ Snus", tone: "new" },
    ],
  };
}

// ---------- Search & filter ----------

export interface CatalogFilters {
  brand?: string[];
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: "relevance" | "price-asc" | "price-desc" | "newest";
}

export function applyFilters(list: Product[], f: CatalogFilters): Product[] {
  let out = list;
  if (f.brand && f.brand.length) {
    const set = new Set(f.brand);
    out = out.filter((p) => p.brandSlug && set.has(p.brandSlug));
  }
  if (f.inStockOnly) {
    out = out.filter((p) => p.inStock);
  }
  if (f.minPrice != null) {
    out = out.filter((p) => (effectivePrice(p) ?? 0) >= f.minPrice!);
  }
  if (f.maxPrice != null) {
    out = out.filter((p) => (effectivePrice(p) ?? Infinity) <= f.maxPrice!);
  }
  if (f.search) {
    out = searchProducts(f.search, Infinity, out);
  }
  switch (f.sort) {
    case "price-asc":
      out = [...out].sort(
        (a, b) => (effectivePrice(a) ?? Infinity) - (effectivePrice(b) ?? Infinity),
      );
      break;
    case "price-desc":
      out = [...out].sort(
        (a, b) => (effectivePrice(b) ?? -Infinity) - (effectivePrice(a) ?? -Infinity),
      );
      break;
    case "newest":
      out = [...out].sort((a, b) => Number(b.id) - Number(a.id));
      break;
    default:
      // keep in-stock-first ordering from generation
      break;
  }
  return out;
}

let _searchIndex: { p: Product; name: string; hay: string }[] | null = null;
function ensureSearchIndex() {
  if (_searchIndex) return _searchIndex;
  _searchIndex = products.map((p) => ({
    p,
    name: normalizeText(p.name),
    hay: normalizeText(
      [p.name, p.brand ?? "", p.sku, ...p.primaryCategoryPath.map((c) => c.label)].join(" "),
    ),
  }));
  return _searchIndex;
}

/** Accent/case/transliteration-insensitive search. Every query token must match. */
export function searchProducts(query: string, limit = 48, within?: Product[]): Product[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const index = ensureSearchIndex();
  const allow = within ? new Set(within) : null;
  const scored: { p: Product; score: number }[] = [];
  for (const entry of index) {
    if (allow && !allow.has(entry.p)) continue;
    let score = 0;
    let ok = true;
    for (const t of tokens) {
      if (entry.hay.includes(t)) {
        score += entry.name.includes(t) ? 3 : 1;
        if (entry.name.startsWith(t)) score += 2;
      } else {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    if (entry.p.inStock) score += 1;
    if (entry.p.images.length) score += 0.5;
    scored.push({ p: entry.p, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}

export function brandsInProducts(
  list: Product[],
): { slug: string; label: string; count: number }[] {
  const counts = new Map<string, { slug: string; label: string; count: number }>();
  for (const p of list) {
    if (!p.brandSlug || !p.brand) continue;
    const existing = counts.get(p.brandSlug);
    if (existing) existing.count += 1;
    else counts.set(p.brandSlug, { slug: p.brandSlug, label: p.brand, count: 1 });
  }
  return [...counts.values()].sort((a, b) => b.count - a.count);
}

export const PER_PAGE = 24;

export function paginate<T>(list: T[], page: number, perPage = PER_PAGE) {
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    items: list.slice((current - 1) * perPage, current * perPage),
    page: current,
    totalPages,
    total,
  };
}
