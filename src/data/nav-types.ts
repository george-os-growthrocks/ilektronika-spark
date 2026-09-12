import type { CardProduct } from "./catalog-types";
import type { BadgeKind } from "./category-meta";

/** Small, serialisable navigation model computed on the server and passed to the header. */
export interface NavCategory {
  slug: string;
  label: string;
  count: number;
  href: string;
}

export interface NavPillar extends NavCategory {
  badge?: BadgeKind;
  tagline?: string;
  intro?: string;
  subs: NavCategory[];
  featured: CardProduct[];
}

export interface NavQuickLink {
  href: string;
  label: string;
  tone: "hot" | "top" | "new";
}

export interface NavData {
  pillars: NavPillar[];
  quick: NavQuickLink[];
}
