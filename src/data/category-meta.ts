/**
 * Marketing badges + curated intros + SEO fields for categories.
 * Edit freely - used by mega menu, mobile menu, and category pages.
 */
export type BadgeKind = "HOT" | "NEW" | "SALE" | "TOP" | "DEAL";

export interface CategoryMeta {
  badge?: BadgeKind;
  tagline?: string;
  intro?: string;
  /** Greek SEO H1 override (falls back to catalog label) */
  h1?: string;
  /** Title tag without brand suffix */
  seoTitle?: string;
  /** Meta description ~150-160 chars */
  seoDescription?: string;
  secondaryKeywords?: string[];
  /** Related blog slugs for hub-spoke linking */
  relatedGuides?: string[];
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  "ygra-anaplirosis": {
    badge: "HOT",
    tagline: "Πάνω από 470 γεύσεις",
    h1: "Υγρά Αναπλήρωσης · E-liquids & Nic Salts",
    seoTitle: "Υγρά Αναπλήρωσης Ηλεκτρονικού Τσιγάρου | Τιμές Online",
    seoDescription:
      "Υγρά αναπλήρωσης (e-liquids) & nicotine salts από Vampire Vape, Dinner Lady, Nasty Juice. Freebase, shortfills, όλες οι γεύσεις. Αγορά μέσω Vape and More.",
    secondaryKeywords: ["e-liquids", "nicotine salts", "shortfills", "υγρά ατμίσματος"],
    relatedGuides: [
      "nicotine-salts-vs-freebase",
      "odigos-arxarion-vape-2026",
      "pos-na-gemiseis-pod",
    ],
    intro:
      "Η μεγαλύτερη συλλογή υγρών αναπλήρωσης (e-liquids) στην Ελλάδα - από κορυφαία brands όπως Vampire Vape, Halo, Dinner Lady και Nasty Juice. Freebase, nicotine salts και shortfills σε όλες τις γεύσεις: φρούτα, επιδόρπια, καπνά και μέντα.",
  },
  disposables: {
    badge: "HOT",
    tagline: "Έτοιμα προς χρήση",
    h1: "Ηλεκτρονικά Τσιγάρα Μιας Χρήσης (Disposables)",
    seoTitle: "Ηλεκτρονικά Τσιγάρα Μιας Χρήσης Disposables | Elf Bar & Lost Mary",
    seoDescription:
      "Disposable vapes μιας χρήσης από Elf Bar, Lost Mary, Geek Bar, IVG. Από 600 έως 10.000 puffs με nicotine salts. Τιμές & άμεση αποστολή από Vape and More.",
    secondaryKeywords: [
      "disposables",
      "elf bar",
      "lost mary",
      "ηλεκτρονικό τσιγάρο μιας χρήσης",
    ],
    relatedGuides: [
      "kalytera-disposables-2026",
      "elf-bar-vs-lost-mary",
      "odigos-arxarion-vape-2026",
    ],
    intro:
      "Disposable ηλεκτρονικά τσιγάρα μιας χρήσης από Elf Bar, Lost Mary, Geek Bar, IVG και άλλους κορυφαίους κατασκευαστές. Από 600 έως 10.000 puffs, με nicotine salts για ομαλή αίσθηση.",
  },
  "syskeyes-vape": {
    badge: "TOP",
    tagline: "Pod systems & box mods",
    h1: "Συσκευές Vape · Pod Systems & Mods",
    seoTitle: "Συσκευές Vape Pod Systems & Mods | Ηλεκτρονικά Τσιγάρα",
    seoDescription:
      "Pod systems, box mods και κιτ MTL/DTL από Vaporesso, Uwell, Voopoo, GeekVape, SMOK. Ιδανικά για αρχάριους και προχωρημένους. Τιμές online via Vape and More.",
    secondaryKeywords: ["pod system", "box mod", "vape kit", "ηλεκτρονικό τσιγάρο"],
    relatedGuides: [
      "odigos-arxarion-vape-2026",
      "mtl-vs-dtl-poio-stil-atmismatos",
      "geekvape-vs-vaporesso",
    ],
    intro:
      "Πλήρης σειρά συσκευών vape - pod systems για αρχάριους, box mods για προχωρημένους, και κιτ MTL/DTL για κάθε στυλ ατμίσματος. Vaporesso, Uwell, Voopoo, GeekVape, SMOK.",
  },
  antistaseis: {
    badge: "DEAL",
    tagline: "Όλες οι coil heads",
    h1: "Αντιστάσεις Vape (Coils) · Ανταλλακτικά",
    seoTitle: "Αντιστάσεις Vape Coils | Mesh & Classic",
    seoDescription:
      "Ανταλλακτικές αντιστάσεις (coils) για δημοφιλείς συσκευές vape. Mesh, ceramic και classic σε όλες τις ωμικές. Άμεση διαθεσιμότητα από Vape and More.",
    secondaryKeywords: ["coils", "mesh coil", "αντιστάσεις ατμοποιητή"],
    relatedGuides: ["pos-na-allakseis-antistasi", "odigos-arxarion-vape-2026"],
    intro:
      "Ανταλλακτικές αντιστάσεις (coils) για όλες τις δημοφιλείς συσκευές vape. Mesh, ceramic, και classic σε όλες τις ωμικές αντιστάσεις. Άμεση διαθεσιμότητα.",
  },
  atmopoiites: {
    tagline: "Tanks & atomizers",
    h1: "Ατμοποιητές · Tanks, RDA & RTA",
    seoTitle: "Ατμοποιητές Vape Tanks RDA RTA | Τιμές Online",
    seoDescription:
      "Ατμοποιητές, sub-ohm tanks, MTL tanks, RDA και RTA από κορυφαία brands. Βρείτε tank για το setup σας στο ilektronikatsigara.gr.",
    secondaryKeywords: ["tank", "rda", "rta", "sub-ohm"],
    relatedGuides: ["mtl-vs-dtl-poio-stil-atmismatos"],
    intro:
      "Ατμοποιητές, sub-ohm tanks, MTL tanks, RDA και RTA atomizers από τα πιο αναγνωρισμένα brands της αγοράς.",
  },
  nargiledes: {
    badge: "TOP",
    tagline: "Παραδοσιακοί & μοντέρνοι",
    h1: "Ναργιλέδες · Kits & Ολοκληρωμένα Σετ",
    seoTitle: "Ναργιλέδες Online | Kits Mig Steamulation Wookah",
    seoDescription:
      "Ναργιλέδες και kits από Mig, Steamulation, Wookah, Khalil Mamoon. Κλασικοί αιγυπτιακοί και designer μοντέλα. Αγορά μέσω Vape and More, Ρέθυμνο.",
    secondaryKeywords: ["ναργιλές", "hookah", "shisha"],
    relatedGuides: ["odigos-nargile-arxarion", "kalytera-kapna-nargile"],
    intro:
      "Πλήρη ναργιλέ kits για κάθε γούστο - από κλασικούς αιγυπτιακούς μέχρι μοντέρνα designer μοντέλα Mig, Steamulation, Wookah και Khalil Mamoon.",
  },
  "geyseis-kai-kapnoi-nargile": {
    tagline: "Καπνά & γεύσεις",
    h1: "Καπνά & Γεύσεις Ναργιλέ",
    seoTitle: "Καπνά Ναργιλέ Al Fakher Adalya Starbuzz | Τιμές",
    seoDescription:
      "Καπνοί ναργιλέ και γεύσεις από Al Fakher, Adalya, Starbuzz, Tangiers και Fumari. Φρούτα, μέντα, καπνικά και exotic combos.",
    secondaryKeywords: ["καπνός ναργιλέ", "al fakher", "adalya"],
    relatedGuides: ["kalytera-kapna-nargile", "odigos-nargile-arxarion"],
    intro:
      "Καπνοί ναργιλέ και γεύσεις από Al Fakher, Adalya, Starbuzz, Tangiers και Fumari. Φρούτα, μέντα, καπνικά και exotic combos.",
  },
  "axesoyar-nargile": {
    tagline: "Hose, bowls, foil",
    h1: "Αξεσουάρ Ναργιλέ",
    seoTitle: "Αξεσουάρ Ναργιλέ · Σωλήνες, Μπολ, Foil",
    seoDescription:
      "Σωλήνες (hose), μπολ, λαβίδες, αλουμινόχαρτο, screens και heat management για ναργιλέ. Πλήρης γκάμα αξεσουάρ.",
    secondaryKeywords: ["hose ναργιλέ", "heat management"],
    relatedGuides: ["odigos-nargile-arxarion"],
    intro:
      "Ολα τα αξεσουάρ που χρειάζεστε για τον ναργιλέ σας: σωλήνες (hose), μπολ, λαβίδες, αλουμινόχαρτο, screens και heat management.",
  },
  "mpol-kefales": {
    tagline: "Phunnel, vortex, classic",
    h1: "Μπολ & Κεφαλές Ναργιλέ",
    seoTitle: "Μπολ Ναργιλέ Phunnel Vortex Classic",
    seoDescription:
      "Κεφαλές και μπολ για ναργιλέ - phunnel, vortex, classic - από κεραμικό, πηλό και silicone.",
    secondaryKeywords: ["phunnel", "bowl ναργιλέ"],
    intro:
      "Κεφαλές και μπολ για ναργιλέ - phunnel, vortex, classic - από κεραμικό, πηλό και silicone.",
  },
  snus: {
    badge: "NEW",
    tagline: "Σκανδιναβικός snus",
    h1: "Snus & Νικοτινικά Pouches",
    seoTitle: "Snus & Nicotine Pouches Ελλάδα | Velo Zyn Pablo",
    seoDescription:
      "Νικοτινικά pouches και snus από Velo, Zyn, Pablo, Killa και Siberia. Χωρίς καπνό, χωρίς οσμή. Μόνο για ενήλικες 18+.",
    secondaryKeywords: ["nicotine pouches", "velo", "zyn"],
    relatedGuides: ["ti-einai-snus-nicotine-pouches"],
    intro:
      "Νικοτινικά pouches και παραδοσιακά snus από Velo, Zyn, Pablo, Killa και Siberia. Χωρίς καπνό, χωρίς οσμή.",
  },
  poyra: {
    tagline: "Cigars & cigarillos",
    h1: "Πούρα & Cigarillos",
    seoTitle: "Πούρα Online | Cuba Dominican Nicaragua",
    seoDescription:
      "Premium πούρα και cigarillos από Κούβα, Δομινικανή, Νικαράγουα και Ονδούρα. Αγορά μέσω Vape and More.",
    secondaryKeywords: ["πούρα", "cigars"],
    intro: "Premium πούρα και cigarillos από Κούβα, Δομινικανή, Νικαράγουα και Ονδούρα.",
  },
  "antallaktika-vape": {
    tagline: "Pods, glass, drip tips",
    h1: "Ανταλλακτικά Vape · Pods & Glass",
    seoTitle: "Ανταλλακτικά Vape Pods Glass Drip Tips",
    seoDescription:
      "Ανταλλακτικά pods, γυαλιά και drip tips για δημοφιλείς συσκευές ατμίσματος. Άμεση αποστολή.",
    secondaryKeywords: ["replacement pods", "drip tip"],
  },
  "axesoyar-vape": {
    tagline: "Cases, καλώδια, batteries",
    h1: "Αξεσουάρ Vape",
    seoTitle: "Αξεσουάρ Vape · Batteries Cases Καλώδια",
    seoDescription:
      "Θήκες, καλώδια φόρτισης και μπαταρίες για συσκευές vape. Συμπληρώστε το setup σας.",
    secondaryKeywords: ["μπαταρίες vape", "charger"],
  },
  "axesoyar-poyron": { tagline: "Humidors & cutters", h1: "Αξεσουάρ Πούρων" },
  "karvoynakia-nargile": {
    tagline: "Coconut & natural",
    h1: "Καρβουνάκια Ναργιλέ",
    seoTitle: "Καρβουνάκια Ναργιλέ Coconut & Natural",
    seoDescription: "Καρβουνάκια coconut και natural για ναργιλέ. Καθαρή καύση, μεγάλη διάρκεια.",
  },
  "ygrantires-poyron": { tagline: "Humidors", h1: "Υγραντήρες Πούρων" },
  "anaptires-poyron": { tagline: "Soft flame & torch", h1: "Αναπτήρες Πούρων" },
  cbd: {
    badge: "NEW",
    tagline: "CBD προϊόντα",
    h1: "CBD Προϊόντα",
    seoTitle: "CBD Προϊόντα Online Ελλάδα",
    seoDescription: "Προϊόντα CBD από αξιόπιστους προμηθευτές. Ενημερωθείτε και αγοράστε μέσω Vape and More.",
  },
  "ilektronika-tsigara": {
    tagline: "Heat-not-burn",
    h1: "Ηλεκτρονικά Τσιγάρα Heat-not-Burn",
    seoTitle: "Ηλεκτρονικά Τσιγάρα Heat-not-Burn | Τιμές Ελλάδα",
    seoDescription:
      "Συσκευές heat-not-burn και ηλεκτρονικά τσιγάρα νέας γενιάς. Συγκρίνετε τιμές και αγοράστε online.",
    secondaryKeywords: ["heat not burn", "ηλεκτρονικό τσιγάρο"],
    relatedGuides: ["odigos-arxarion-vape-2026", "nomos-18-aythentikotita"],
  },
  "protes-yles": {
    tagline: "DIY νικοτίνη & βάσεις",
    h1: "Πρώτες Ύλες DIY · Νικοτίνη & Βάσεις",
    seoTitle: "Πρώτες Ύλες DIY Vape · Nic Shots & Βάσεις",
    seoDescription:
      "Νικοτινικές βάσεις, nic shots και πρώτες ύλες για DIY υγρά αναπλήρωσης. Μόνο για ενήλικες 18+.",
    relatedGuides: ["nicotine-salts-vs-freebase"],
  },
};

export function categoryMeta(slug: string): CategoryMeta {
  return CATEGORY_META[slug] ?? {};
}

export function categoryH1(slug: string, fallbackLabel: string): string {
  return categoryMeta(slug).h1 || fallbackLabel;
}

export function categorySeoTitle(slug: string, fallbackLabel: string): string {
  return categoryMeta(slug).seoTitle || `${fallbackLabel} | Τιμές & Αγορά Online`;
}

export function categorySeoDescription(
  slug: string,
  fallbackLabel: string,
  productCount?: number,
): string {
  const meta = categoryMeta(slug);
  if (meta.seoDescription) return meta.seoDescription.slice(0, 160);
  const countBit =
    productCount != null ? ` ${productCount} προϊόντα.` : "";
  return `Βρείτε ${fallbackLabel.toLowerCase()} στο Vape and More.${countBit} Τιμές, διαθεσιμότητα & άμεση αποστολή 1-3 ημέρες.`.slice(
    0,
    160,
  );
}
