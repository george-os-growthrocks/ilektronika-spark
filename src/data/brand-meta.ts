/**
 * Curated SEO intros for high-value brand hub pages.
 */
export interface BrandMeta {
  seoTitle?: string;
  seoDescription?: string;
  intro?: string;
  relatedGuides?: string[];
}

export const BRAND_META: Record<string, BrandMeta> = {
  "elf-bar": {
    seoTitle: "Elf Bar Ελλάδα | Disposables & Pod Kits",
    seoDescription:
      "Όλα τα Elf Bar disposable vapes και pod kits στην Ελλάδα. Γεύσεις, puffs και τιμές. Αγορά μέσω Vape and More με άμεση αποστολή. 18+.",
    intro:
      "Η Elf Bar είναι από τις πιο αναγνωρίσιμες μάρκες disposable vapes παγκοσμίως. Στο ilektronikatsigara.gr συγκεντρώνουμε τις διαθέσιμες σειρές Elf Bar (600, 600V2 και άλλες) με ελληνικές περιγραφές, τιμές και ασφαλή αγορά μέσω του Vape and More στο Ρέθυμνο. Ιδανικά για ενήλικες που θέλουν έτοιμη προς χρήση συσκευή χωρίς συντήρηση.",
    relatedGuides: ["elf-bar-vs-lost-mary", "kalytera-disposables-2026"],
  },
  "lost-mary": {
    seoTitle: "Lost Mary Ελλάδα | Disposable Vapes",
    seoDescription:
      "Lost Mary disposables: γεύσεις, puffs και τιμές online. Αγοράστε αυθεντικά προϊόντα μέσω Vape and More. Μόνο 18+.",
    intro:
      "Η Lost Mary ξεχωρίζει για έντονες φρουτώδεις γεύσεις και συμπαγή design στα disposable vapes. Δείτε τη διαθέσιμη γκάμα, συγκρίνετε τιμές και ολοκληρώστε την αγορά με πανελλαδική αποστολή από το συνεργαζόμενο κατάστημα Vape and More.",
    relatedGuides: ["elf-bar-vs-lost-mary", "kalytera-disposables-2026"],
  },
  vaporesso: {
    seoTitle: "Vaporesso Pod Systems & Kits Ελλάδα",
    seoDescription:
      "Συσκευές Vaporesso (XROS και άλλα kits) με τιμές και διαθεσιμότητα. Αγορά online μέσω Vape and More.",
    intro:
      "Η Vaporesso κατασκευάζει από τα πιο αξιόπιστα pod systems για αρχάριους και μέσους ατμιστές. Εδώ θα βρείτε kits, ανταλλακτικά pods και σχετικά προϊόντα με σαφή χαρακτηριστικά και σύνδεση αγοράς στο vapeandmore.gr.",
    relatedGuides: ["geekvape-vs-vaporesso", "odigos-arxarion-vape-2026"],
  },
  geekvape: {
    seoTitle: "GeekVape Συσκευές & Coils Ελλάδα",
    seoDescription:
      "GeekVape pods, mods και αντιστάσεις. Δείτε τιμές και αγοράστε online μέσω Vape and More.",
    intro:
      "Η GeekVape είναι γνωστή για ανθεκτικά pods και mods (Wenax, Aegis και άλλες σειρές). Συγκρίνετε μοντέλα, coils και kits στον κατάλογό μας και ολοκληρώστε την παραγγελία με αυθεντικά προϊόντα από επίσημους διανομείς.",
    relatedGuides: ["geekvape-vs-vaporesso", "pos-na-allakseis-antistasi"],
  },
  voopoo: {
    seoTitle: "Voopoo Argus & Drag Kits Ελλάδα",
    seoDescription:
      "Voopoo pod kits και mods με τιμές online. Αγορά μέσω Vape and More, αποστολή σε όλη την Ελλάδα.",
    intro:
      "Η Voopoo (Argus, Drag κ.ά.) προσφέρει εύχρηστα pods και ισχυρά mods. Βρείτε διαθέσιμα μοντέλα, χαρακτηριστικά και τιμές στον ελληνικό κατάλογο ilektronikatsigara.gr.",
    relatedGuides: ["odigos-arxarion-vape-2026", "mtl-vs-dtl-poio-stil-atmismatos"],
  },
  "vampire-vape": {
    seoTitle: "Vampire Vape Υγρά Αναπλήρωσης Ελλάδα",
    seoDescription:
      "Υγρά Vampire Vape: γεύσεις, shortfills και τιμές. Αγορά online μέσω Vape and More.",
    intro:
      "Τα υγρά Vampire Vape είναι από τα πιο δημοφιλή e-liquids στην Ευρώπη. Δείτε διαθέσιμες γεύσεις και συσκευασίες στον κατάλογο και αγοράστε με ασφαλή checkout από το Vape and More.",
    relatedGuides: ["nicotine-salts-vs-freebase"],
  },
  uwell: {
    seoTitle: "Uwell Caliburn Pod Systems Ελλάδα",
    seoDescription:
      "Uwell Caliburn και άλλα pod kits. Τιμές, χαρακτηριστικά και αγορά μέσω Vape and More.",
    intro:
      "Η Uwell (σειρά Caliburn) είναι σταθερή επιλογή για MTL άτμισμα και αρχάριους. Συγκρίνετε διαθέσιμα kits και ανταλλακτικά στο ilektronikatsigara.gr.",
    relatedGuides: ["odigos-arxarion-vape-2026", "mtl-vs-dtl-poio-stil-atmismatos"],
  },
};

export function brandMeta(slug: string): BrandMeta {
  return BRAND_META[slug] ?? {};
}
