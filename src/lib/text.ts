/** Text normalisation for search: accent-insensitive, case-insensitive, Greek↔Latin tolerant. */

const GREEK_TO_LATIN: Record<string, string> = {
  α: "a",
  β: "v",
  γ: "g",
  δ: "d",
  ε: "e",
  ζ: "z",
  η: "i",
  θ: "th",
  ι: "i",
  κ: "k",
  λ: "l",
  μ: "m",
  ν: "n",
  ξ: "x",
  ο: "o",
  π: "p",
  ρ: "r",
  σ: "s",
  ς: "s",
  τ: "t",
  υ: "y",
  φ: "f",
  χ: "ch",
  ψ: "ps",
  ω: "o",
};

/** Lowercase, strip diacritics, transliterate Greek to Latin, collapse punctuation to spaces. */
export function normalizeText(input: string): string {
  const lower = input.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  let out = "";
  for (const ch of lower) out += GREEK_TO_LATIN[ch] ?? ch;
  return out.replace(/[^a-z0-9]+/g, " ").trim();
}

export function tokenize(input: string): string[] {
  return normalizeText(input)
    .split(" ")
    .filter((t) => t.length > 0);
}
