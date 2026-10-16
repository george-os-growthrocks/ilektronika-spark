export type Intent = "buy" | "offer" | "lease";

export function parseIntent(value: string | string[] | undefined): Intent | null {
  const raw = Array.isArray(value) ? value[0] : value;
  switch (raw) {
    case "buy":
    case "offer":
    case "lease":
      return raw;
    default:
      return null;
  }
}

export function hrefFor(locale: "el" | "en", intent?: Intent, hash?: string): string {
  const path = locale === "en" ? "/en" : "/";
  const params = new URLSearchParams();
  if (intent) params.set("intent", intent);
  const query = params.toString();
  return `${path}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}

export function buyHref(locale: "el" | "en"): string {
  return `/api/checkout?locale=${locale}`;
}

export function parsePaid(value: string | string[] | undefined): boolean {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "1";
}

export function withPaid(href: string, paid: boolean): string {
  if (!paid) return href;
  const hashAt = href.indexOf("#");
  const hash = hashAt === -1 ? "" : href.slice(hashAt);
  const base = hashAt === -1 ? href : href.slice(0, hashAt);
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}paid=1${hash}`;
}
