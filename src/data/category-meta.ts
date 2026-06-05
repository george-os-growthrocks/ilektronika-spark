/**
 * Marketing badges + curated intros for top categories.
 * Edit freely - used by mega menu, mobile menu, and category pages.
 */
export type BadgeKind = "HOT" | "NEW" | "SALE" | "TOP" | "DEAL";

export interface CategoryMeta {
  badge?: BadgeKind;
  tagline?: string;
  intro?: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  "ygra-anaplirosis": {
    badge: "HOT",
    tagline: "Πάνω από 470 γεύσεις",
    intro:
      "Η μεγαλύτερη συλλογή υγρών αναπλήρωσης (e-liquids) στην Ελλάδα - από κορυφαία brands όπως Vampire Vape, Halo, Dinner Lady και Nasty Juice. Freebase, nicotine salts και shortfills σε όλες τις γεύσεις: φρούτα, επιδόρπια, καπνά και μέντα.",
  },
  disposables: {
    badge: "HOT",
    tagline: "Έτοιμα προς χρήση",
    intro:
      "Disposable ηλεκτρονικά τσιγάρα μιας χρήσης από Elf Bar, Lost Mary, Geek Bar, IVG και άλλους κορυφαίους κατασκευαστές. Από 600 έως 10.000 puffs, με nicotine salts για ομαλή αίσθηση.",
  },
  "syskeyes-vape": {
    badge: "TOP",
    tagline: "Pod systems & box mods",
    intro:
      "Πλήρης σειρά συσκευών vape - pod systems για αρχάριους, box mods για προχωρημένους, και κιτ MTL/DTL για κάθε στυλ ατμίσματος. Vaporesso, Uwell, Voopoo, GeekVape, SMOK.",
  },
  antistaseis: {
    badge: "DEAL",
    tagline: "Όλες οι coil heads",
    intro:
      "Ανταλλακτικές αντιστάσεις (coils) για όλες τις δημοφιλείς συσκευές vape. Mesh, ceramic, και classic σε όλες τις ωμικές αντιστάσεις. Άμεση διαθεσιμότητα.",
  },
  atmopoiites: {
    tagline: "Tanks & atomizers",
    intro:
      "Ατμοποιητές, sub-ohm tanks, MTL tanks, RDA και RTA atomizers από τα πιο αναγνωρισμένα brands της αγοράς.",
  },
  nargiledes: {
    badge: "TOP",
    tagline: "Παραδοσιακοί & μοντέρνοι",
    intro:
      "Πλήρη ναργιλέ kits για κάθε γούστο - από κλασικούς αιγυπτιακούς μέχρι μοντέρνα designer μοντέλα Mig, Steamulation, Wookah και Khalil Mamoon.",
  },
  "geyseis-kai-kapnoi-nargile": {
    tagline: "Καπνά & γεύσεις",
    intro:
      "Καπνοί ναργιλέ και γεύσεις από Al Fakher, Adalya, Starbuzz, Tangiers και Fumari. Φρούτα, μέντα, καπνικά και exotic combos.",
  },
  "axesoyar-nargile": {
    tagline: "Hose, bowls, foil",
    intro:
      "Ολα τα αξεσουάρ που χρειάζεστε για τον ναργιλέ σας: σωλήνες (hose), μπολ, λαβίδες, αλουμινόχαρτο, screens και heat management.",
  },
  "mpol-kefales": {
    tagline: "Phunnel, vortex, classic",
    intro:
      "Κεφαλές και μπολ για ναργιλέ - phunnel, vortex, classic - από κεραμικό, πηλό και silicone.",
  },
  snus: {
    badge: "NEW",
    tagline: "Σκανδιναβικός snus",
    intro:
      "Νικοτινικά pouches και παραδοσιακά snus από Velo, Zyn, Pablo, Killa και Siberia. Χωρίς καπνό, χωρίς οσμή.",
  },
  poyra: {
    tagline: "Cigars & cigarillos",
    intro: "Premium πούρα και cigarillos από Κούβα, Δομινικανή, Νικαράγουα και Ονδούρα.",
  },
  "antallaktika-vape": { tagline: "Pods, glass, drip tips" },
  "axesoyar-vape": { tagline: "Cases, καλώδια, batteries" },
  "axesoyar-poyron": { tagline: "Humidors & cutters" },
  "karvoynakia-nargile": { tagline: "Coconut & natural" },
  "ygrantires-poyron": { tagline: "Humidors" },
  "anaptires-poyron": { tagline: "Soft flame & torch" },
  cbd: { badge: "NEW", tagline: "CBD προϊόντα" },
  "ilektronika-tsigara": { tagline: "Heat-not-burn" },
  "protes-yles": { tagline: "DIY νικοτίνη & βάσεις" },
};

export function categoryMeta(slug: string): CategoryMeta {
  return CATEGORY_META[slug] ?? {};
}
