import productsData from "./products.generated.json";
import categoriesData from "./categories.generated.json";
import brandsData from "./brands.generated.json";

export interface CategoryNode {
  slug: string;
  label: string;
}

export interface Product {
  id: string;
  slug: string;
  wpSlug: string;
  name: string;
  sku: string;
  brand: string | null;
  brandSlug: string | null;
  type: "simple" | "variable";
  categoryPaths: CategoryNode[][];
  primaryCategoryPath: CategoryNode[];
  primaryTopSlug: string | null;
  primaryLeafSlug: string | null;
  images: string[];
  price: number | null;
  salePrice: number | null;
  inStock: boolean;
  shortDescription: string;
  description: string;
  attributes: { name: string; values: string[] }[];
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface Category {
  slug: string;
  label: string;
  parentSlug: string | null;
  depth: number;
  count: number;
  ancestors: CategoryNode[];
}

export interface Brand {
  slug: string;
  label: string;
  count: number;
}

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

let _byCatLeaf: Map<string, Product[]> | null = null;
let _byCatAny: Map<string, Product[]> | null = null;
function ensureCatMaps() {
  if (_byCatLeaf && _byCatAny) return;
  _byCatLeaf = new Map();
  _byCatAny = new Map();
  for (const p of products) {
    const seen = new Set<string>();
    for (const path of p.categoryPaths) {
      const leaf = path[path.length - 1]?.slug;
      if (leaf) {
        if (!_byCatLeaf.has(leaf)) _byCatLeaf.set(leaf, []);
        _byCatLeaf.get(leaf)!.push(p);
      }
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

export function topLevelCategories(): Category[] {
  return categories.filter((c) => c.depth === 0).sort((a, b) => b.count - a.count);
}

const PILLAR_SLUGS = [
  "ygra-anaplirosis",
  "disposables",
  "syskeyes-vape",
  "antistaseis",
  "atmopoiites",
  "nargiledes",
  "poyra",
];

const PILLAR_RELATED: Record<string, string[]> = {
  "syskeyes-vape": [
    "antallaktika-vape",
    "axesoyar-vape",
    "ilektronika-tsigara",
    "cbd",
    "protes-yles",
  ],
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

export function subcategoriesOf(parentSlug: string): Category[] {
  return categories.filter((c) => c.parentSlug === parentSlug).sort((a, b) => b.count - a.count);
}

let _brandBySlug: Map<string, Brand> | null = null;
export function brandBySlug(slug: string): Brand | undefined {
  if (!_brandBySlug) {
    _brandBySlug = new Map();
    for (const b of brands) _brandBySlug.set(b.slug, b);
  }
  return _brandBySlug.get(slug);
}

// ---------- Display helpers ----------

export function formatPrice(n: number | null | undefined): string {
  if (n == null) return "-";
  return `${n.toFixed(2).replace(".", ",")}€`;
}

export function effectivePrice(p: Product): number | null {
  return p.salePrice ?? p.price;
}

export function productImage(p: Product, idx = 0): string {
  return p.images[idx] ?? "";
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
    const q = f.search.toLowerCase();
    out = out.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.brand ?? "").toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q),
    );
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
