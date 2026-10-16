/** Parses a euro amount typed with either 1500, 1.500, or 1,500. */
export function parseAmount(raw: string): number | null {
  const trimmed = raw.trim().replace(/\s/g, "");
  if (!trimmed) return null;

  if (/^\d{1,3}(\.\d{3})+$/.test(trimmed)) {
    return Number(trimmed.replace(/\./g, ""));
  }

  if (/^\d{1,3}(,\d{3})+$/.test(trimmed)) {
    return Number(trimmed.replace(/,/g, ""));
  }

  const normalized = trimmed.replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;

  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}
