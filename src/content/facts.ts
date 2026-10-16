/** Search figures below are the only metrics the page is allowed to state. */
export const SOURCE = "Source: Ahrefs, Greece, Oct 2026";

export const HEAD_TERM = "ηλεκτρονικο τσιγαρο";
export const HEAD_VOLUME = 5900;
export const HEAD_KD = 0;

export const NON_BRAND_VOLUME = 24450;
export const BRANDED_VOLUME = 142000;

export const CLUSTERS = [
  { id: "heated", volume: 92700 },
  { id: "generic", volume: 22170 },
  { id: "devices", volume: 13740 },
  { id: "pouches", volume: 11370 },
] as const;

export type ClusterId = (typeof CLUSTERS)[number]["id"];

export const REFERRING_DOMAINS = 550;
export const BACKLINKS = 640;
export const COMPETITOR_DR = 20;
export const TRAFFIC_VALUE_USD = 9200;

export const KEYWORDS = [
  { term: "ηλεκτρονικο τσιγαρο", volume: 5900 },
  { term: "vape", volume: 14000 },
  { term: "vape shop", volume: 900 },
  { term: "ηλεκτρονικά τσιγάρα", volume: 800 },
  { term: "ilektroniko tsigaro", volume: 450 },
  { term: "nicotine pouches", volume: 700 },
  { term: "ηλεκτρονικο τσιγαρο μιας χρησης", volume: 300 },
  { term: "υγρα για ηλεκτρονικο τσιγαρο", volume: 200 },
] as const;
