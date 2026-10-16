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
