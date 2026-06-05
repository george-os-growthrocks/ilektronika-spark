#!/usr/bin/env python3
"""Import vapeandmore.gr WooCommerce CSV export → typed JSON data files.

Run with:  python3 scripts/import-products.py
Reads:     /mnt/user-uploads/wc-product-export-5-6-2026-1780661121789.csv
Writes:    src/data/products.generated.json
           src/data/categories.generated.json
           src/data/brands.generated.json
"""
import csv
import json
import os
import re
import sys
from collections import defaultdict

CSV_PATH = "/mnt/user-uploads/wc-product-export-5-6-2026-1780661121789.csv"
OUT_DIR = "src/data"

GREEK_TABLE = str.maketrans({
    "Α":"A","Β":"V","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"I","Θ":"TH","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"X","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"CH","Ψ":"PS","Ω":"O",
    "α":"a","β":"v","γ":"g","δ":"d","ε":"e","ζ":"z","η":"i","θ":"th","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"x","ο":"o","π":"p","ρ":"r","σ":"s","τ":"t","υ":"y","φ":"f","χ":"ch","ψ":"ps","ω":"o","ς":"s",
    "ά":"a","έ":"e","ή":"i","ί":"i","ό":"o","ύ":"y","ώ":"o","ϊ":"i","ϋ":"y","ΐ":"i","ΰ":"y",
    "Ά":"A","Έ":"E","Ή":"I","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"O","Ϊ":"I","Ϋ":"Y",
})

def slugify(s: str) -> str:
    if not s:
        return ""
    s = s.translate(GREEK_TABLE).lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s

def strip_html(html: str) -> str:
    if not html:
        return ""
    # Remove WP/Elementor markup; keep visible text.
    text = re.sub(r"<style[^>]*>.*?</style>", "", html, flags=re.S | re.I)
    text = re.sub(r"<script[^>]*>.*?</script>", "", text, flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"&nbsp;", " ", text)
    text = re.sub(r"&amp;", "&", text)
    text = re.sub(r"&quot;", '"', text)
    text = re.sub(r"&#039;", "'", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def parse_price(raw: str):
    if not raw:
        return None
    raw = raw.strip().replace("€", "").replace(",", ".")
    try:
        return round(float(raw), 2)
    except ValueError:
        return None

def parse_categories(raw: str):
    """Return list of category paths, each a list of {label, slug}."""
    if not raw:
        return []
    paths = []
    for chunk in raw.split(","):
        chunk = chunk.strip()
        if not chunk:
            continue
        path = []
        for part in chunk.split(">"):
            label = part.strip()
            if label:
                path.append({"label": label, "slug": slugify(label)})
        if path:
            paths.append(path)
    return paths

def main():
    if not os.path.exists(CSV_PATH):
        print(f"ERROR: CSV not found at {CSV_PATH}", file=sys.stderr)
        sys.exit(1)

    products = []
    seen_slugs = {}
    categories_index = {}  # slug -> {slug, label, parent_slug, count, ancestors:[{slug,label}]}
    brands_index = {}      # slug -> {slug, label, count}

    with open(CSV_PATH, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            ptype = row.get("Τύπος", "").strip()
            published = row.get("Δημοσιευμένο", "").strip() == "1"
            if ptype == "variation" or not published:
                continue

            name = (row.get("Όνομα", "") or "").strip()
            if not name:
                continue

            pid = (row.get("ID", "") or "").strip()
            sku = (row.get("Κωδικός προϊόντος", "") or "").strip()

            # Deduplicated slug
            base_slug = slugify(name) or f"product-{pid}"
            slug = base_slug
            if slug in seen_slugs:
                slug = f"{base_slug}-{pid}"
            seen_slugs[slug] = True

            # Brand (first one if many)
            brands_raw = (row.get("Μάρκες", "") or "").strip()
            brand_label = ""
            brand_slug = ""
            if brands_raw:
                first = brands_raw.split(",")[0].strip()
                brand_label = first
                brand_slug = slugify(first)
                if brand_slug:
                    if brand_slug not in brands_index:
                        brands_index[brand_slug] = {"slug": brand_slug, "label": brand_label, "count": 0}
                    brands_index[brand_slug]["count"] += 1

            # Categories
            cat_paths = parse_categories(row.get("Κατηγορίες", ""))
            cat_slugs_for_product = []
            primary_top_slug = None
            primary_path = None
            for path in cat_paths:
                # Register every node in the index, build parent chain
                for i, node in enumerate(path):
                    s = node["slug"]
                    parent = path[i - 1]["slug"] if i > 0 else None
                    if s not in categories_index:
                        categories_index[s] = {
                            "slug": s,
                            "label": node["label"],
                            "parentSlug": parent,
                            "depth": i,
                            "count": 0,
                            "ancestors": [{"slug": n["slug"], "label": n["label"]} for n in path[:i]],
                        }
                    # Increment count once per (product, category-slug) pair (avoid double count)
                # Pick the deepest path with most depth as the primary
                deepest_slug = path[-1]["slug"]
                cat_slugs_for_product.append({
                    "path": [{"slug": n["slug"], "label": n["label"]} for n in path],
                    "leafSlug": deepest_slug,
                    "topSlug": path[0]["slug"],
                })
                if primary_path is None or len(path) > len(primary_path):
                    primary_path = path
                    primary_top_slug = path[0]["slug"]

            # Bump category counts uniquely per product
            unique_cat_slugs = set()
            for c in cat_slugs_for_product:
                for node in c["path"]:
                    unique_cat_slugs.add(node["slug"])
            for s in unique_cat_slugs:
                categories_index[s]["count"] += 1

            # Images
            images_raw = (row.get("Εικόνες", "") or "").strip()
            images = [u.strip() for u in re.split(r"[,|]", images_raw) if u.strip().startswith("http")]
            # de-dup while preserving order
            seen_img = set()
            images = [u for u in images if not (u in seen_img or seen_img.add(u))]

            price = parse_price(row.get("Κανονική τιμή", ""))
            sale_price = parse_price(row.get("Τιμή προσφοράς", ""))
            in_stock = (row.get("Σε απόθεμα;", "") or "").strip() == "1"

            short_desc = strip_html(row.get("Σύντομη περιγραφή", ""))
            long_desc = strip_html(row.get("Περιγραφή", ""))
            # Trim to reasonable size
            if len(short_desc) > 400:
                short_desc = short_desc[:400].rsplit(" ", 1)[0] + "…"
            if len(long_desc) > 1500:
                long_desc = long_desc[:1500].rsplit(" ", 1)[0] + "…"

            # Attributes (up to 2 in the export)
            attributes = []
            for n in (1, 2):
                a_name = (row.get(f"Όνομα ιδιότητας {n}", "") or "").strip()
                a_vals = (row.get(f"Τιμή(ές) ιδιότητας {n}", "") or "").strip()
                if a_name and a_vals:
                    values = [v.strip() for v in a_vals.split(",") if v.strip()]
                    if values and a_name.lower() != "διαθεσιμότητα":
                        attributes.append({"name": a_name, "values": values})

            primary_category_path = (
                [{"slug": n["slug"], "label": n["label"]} for n in primary_path]
                if primary_path else []
            )

            seo_title = (row.get("Meta: rank_math_title", "") or "").strip()
            seo_desc = (row.get("Meta: rank_math_description", "") or "").strip()
            desired_slug = (row.get("Meta: _wp_desired_post_slug", "") or "").strip()
            # The actual WooCommerce slug is unknown without scraping; fall back to derived.
            # WP slug usually matches our slugify of name. Keep `wpSlug` as best guess.
            wp_slug = desired_slug or base_slug

            products.append({
                "id": pid,
                "slug": slug,
                "wpSlug": wp_slug,
                "name": name,
                "sku": sku,
                "brand": brand_label or None,
                "brandSlug": brand_slug or None,
                "type": ptype,  # 'simple' or 'variable'
                "categoryPaths": [c["path"] for c in cat_slugs_for_product],
                "primaryCategoryPath": primary_category_path,
                "primaryTopSlug": primary_top_slug,
                "primaryLeafSlug": primary_category_path[-1]["slug"] if primary_category_path else None,
                "images": images,
                "price": price,
                "salePrice": sale_price if sale_price and price and sale_price < price else None,
                "inStock": in_stock,
                "shortDescription": short_desc,
                "description": long_desc,
                "attributes": attributes,
                "seoTitle": seo_title or None,
                "seoDescription": seo_desc or None,
            })

    # Sort: in stock first, then with images, then by ID desc
    products.sort(key=lambda p: (not p["inStock"], not p["images"], -int(p["id"]) if p["id"].isdigit() else 0))

    os.makedirs(OUT_DIR, exist_ok=True)
    with open(os.path.join(OUT_DIR, "products.generated.json"), "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, separators=(",", ":"))

    categories = sorted(categories_index.values(), key=lambda c: (c["depth"], -c["count"], c["label"]))
    with open(os.path.join(OUT_DIR, "categories.generated.json"), "w", encoding="utf-8") as f:
        json.dump(categories, f, ensure_ascii=False, separators=(",", ":"))

    brands = sorted(brands_index.values(), key=lambda b: -b["count"])
    with open(os.path.join(OUT_DIR, "brands.generated.json"), "w", encoding="utf-8") as f:
        json.dump(brands, f, ensure_ascii=False, separators=(",", ":"))

    # Quick report
    print(f"Products: {len(products)} ({sum(1 for p in products if p['type']=='simple')} simple, {sum(1 for p in products if p['type']=='variable')} variable)")
    print(f"In stock: {sum(1 for p in products if p['inStock'])}")
    print(f"Categories: {len(categories)}")
    print(f"Brands: {len(brands)}")
    print(f"Top-level categories ({sum(1 for c in categories if c['depth']==0)}):")
    for c in [c for c in categories if c["depth"] == 0]:
        print(f"  {c['count']:4}  {c['label']:35}  /{c['slug']}")

if __name__ == "__main__":
    main()
