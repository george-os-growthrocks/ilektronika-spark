import type { Locale } from "@/content/locale";

function tag(locale: Locale): string {
  return locale === "el" ? "el-GR" : "en-US";
}

export function formatInt(locale: Locale, value: number): string {
  return new Intl.NumberFormat(tag(locale)).format(value);
}

export function formatEur(locale: Locale, value: number): string {
  return new Intl.NumberFormat(tag(locale), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatUsd(locale: Locale, value: number, approximate = false): string {
  const formatted = new Intl.NumberFormat(tag(locale), {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
  return approximate ? `~${formatted}` : formatted;
}
