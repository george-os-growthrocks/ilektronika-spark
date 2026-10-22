/**
 * The only metrics the page may state. Every figure here was re-checked on
 * 22 Oct 2026: search volumes in Ahrefs Keywords Explorer (Greece), clicks and
 * impressions in Google Search Console for https://ilektronikatsigara.gr/.
 */
export const SOURCE_EL = "Πηγή: Ahrefs (Ελλάδα, Οκτώβριος 2026) και Google Search Console.";
export const SOURCE_EN = "Source: Ahrefs (Greece, October 2026) and Google Search Console.";

export const HEAD_TERM = "ηλεκτρονικό τσιγάρο";
export const HEAD_VOLUME = 7700;
export const HEAD_KD = 0;

export const GREEKLISH_TERM = "ilektroniko tsigaro";
export const GREEKLISH_VOLUME = 450;

export const PLURAL_TERM = "ηλεκτρονικά τσιγάρα";
export const PLURAL_VOLUME = 800;

/** Search Console totals, 1 Jun 2026 to 19 Oct 2026, from the previous site on the domain. */
export const GSC_CLICKS = 143;
export const GSC_IMPRESSIONS = 7272;
export const GSC_FROM = "2026-06-01";
export const GSC_TO = "2026-10-19";

export const KEYWORDS = [
  { term: "ηλεκτρονικό τσιγάρο", volume: 7700 },
  { term: "vape", volume: 14000 },
  { term: "vape shop", volume: 900 },
  { term: "ηλεκτρονικά τσιγάρα", volume: 800 },
  { term: "nicotine pouches", volume: 700 },
  { term: "ilektroniko tsigaro", volume: 450 },
  { term: "ηλεκτρονικο τσιγαρο μιας χρησης", volume: 300 },
  { term: "υγρα για ηλεκτρονικο τσιγαρο", volume: 200 },
] as const;
