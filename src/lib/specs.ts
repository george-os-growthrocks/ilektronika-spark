/** Pull a compact spec table out of free-text product descriptions ("Μπαταρία : 1500mAh"). */

const SKIP_KEYS =
  /^(περιγραφή|χαρακτηριστικά|περιεχόμενα συσκευασίας|σημείωση|προσοχή|description|features)$/i;

export interface SpecRow {
  key: string;
  value: string;
}

export function extractSpecs(description: string | null | undefined, max = 10): SpecRow[] {
  if (!description) return [];
  const rows: SpecRow[] = [];
  const seen = new Set<string>();
  for (const raw of description.split(/\n+/)) {
    const line = raw.trim();
    const m = line.match(/^([^:：]{2,40}?)\s*[:：]\s*(.{1,90})$/);
    if (!m) continue;
    const key = m[1].replace(/^[-•*]\s*/, "").trim();
    const value = m[2].trim();
    if (SKIP_KEYS.test(key) || /https?:\/\//i.test(value)) continue;
    if (/^\d+\s*x\s/i.test(key)) continue; // "1 x Συσκευή" package contents
    const k = key.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    rows.push({ key, value });
    if (rows.length >= max) break;
  }
  return rows;
}
