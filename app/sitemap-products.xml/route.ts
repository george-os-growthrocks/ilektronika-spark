import { products } from "@/data/catalog";
import { isProductIndexable } from "@/lib/indexing";
import { SITE_URL } from "@/lib/seo";
import { urlsetXml, xmlResponse } from "@/lib/sitemap";

export const dynamic = "force-static";

export async function GET() {
  const entries = products.filter(isProductIndexable).map((p) => ({
    loc: `${SITE_URL}/proionta/${p.slug}`,
    lastmod: p.updatedAt ?? undefined,
    changefreq: "weekly" as const,
    priority: p.inStock ? "0.7" : "0.4",
    images: p.images.slice(0, 3),
  }));
  return xmlResponse(urlsetXml(entries));
}
