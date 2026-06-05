import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toGreekUppercase(str: string): string {
  if (!str) return "";
  const upper = str.toLocaleUpperCase("el");
  const accentMap: Record<string, string> = {
    "Ά": "Α",
    "Έ": "Ε",
    "Ή": "Η",
    "Ί": "Ι",
    "Ό": "Ο",
    "Ύ": "Υ",
    "Ώ": "Ω",
  };
  return upper.split("").map((char) => accentMap[char] || char).join("");
}

