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
  velo: {
    seoTitle: "Velo Nicotine Pouches Ελλάδα | Γεύσεις, mg & Τιμές",
    seoDescription:
      "Velo nicotine pouches (Mint, Royal Purple, Blushy Berry) σε 6-8mg. Τιμές, διαθεσιμότητα και αγορά μέσω Vape and More. Μόνο για ενήλικες 18+.",
    intro:
      "Τα Velo είναι τα πιο διαδεδομένα nicotine pouches χωρίς καπνό στην Ευρώπη: λευκά, διακριτικά σακουλάκια σε mini και slim μέγεθος, με εντάσεις που ξεκινούν από 4–6mg ανά pouch. Ιδανική πρώτη επιλογή για όσους δοκιμάζουν snus για πρώτη φορά, γιατί η νικοτίνη απελευθερώνεται ομαλά και οι γεύσεις (μέντα, μούρα, τροπικά) είναι ήπιες. Στον κατάλογο βλέπετε κάθε γεύση με την ένταση σε mg ανά pouch, ώστε να συγκρίνετε σωστά με άλλες μάρκες όπως Zyn ή Killa.",
    relatedGuides: ["ti-einai-snus-nicotine-pouches", "snus-posa-mg-na-dialexo"],
  },
  zyn: {
    seoTitle: "Zyn Nicotine Pouches Ελλάδα | Mini & Slim, 3-11mg",
    seoDescription:
      "Zyn nicotine pouches (Cool Mint, Spearmint, Espressino, Icy Blackcurrant) σε mini και slim. Ένταση σε mg ανά pouch, τιμές και αγορά μέσω Vape and More. 18+.",
    intro:
      "Η Zyn, από τη Swedish Match, είναι η μάρκα που έκανε τα nicotine pouches mainstream. Τα σακουλάκια είναι εντελώς λευκά και στεγνά (χωρίς καπνό, χωρίς λεκέδες), σε δύο μεγέθη: mini για διακριτική χρήση και slim για πιο έντονη απελευθέρωση. Οι εντάσεις κυμαίνονται από περίπου 3mg έως 11mg ανά pouch. Ο κατάλογος δείχνει την ένταση όπως την αναγράφει ο κατασκευαστής (mg/pouch ή mg/g), ώστε να μη μπερδεύεστε ανάμεσα σε Medium, Strong και Extra Strong.",
    relatedGuides: ["snus-posa-mg-na-dialexo", "ti-einai-snus-nicotine-pouches"],
  },
  pablo: {
    seoTitle: "Pablo Nicotine Pouches | Extra Strong 30-50mg/g",
    seoDescription:
      "Pablo nicotine pouches (Ice Cold, Exclusive Lemonade, Passion Fruit) για έμπειρους χρήστες. 30-50mg/g, τιμές και διαθεσιμότητα μέσω Vape and More. 18+.",
    intro:
      "Τα Pablo είναι από τα πιο δυνατά nicotine pouches της αγοράς: 30–50mg νικοτίνης ανά γραμμάριο, δηλαδή περίπου 20–30mg ανά pouch. Απευθύνονται αποκλειστικά σε έμπειρους χρήστες snus ή βαρείς καπνιστές· δεν είναι προϊόν εκκίνησης. Αν ξεκινάτε τώρα, δείτε πρώτα τον οδηγό μας για το πόσα mg να διαλέξετε και προτιμήστε Velo ή Zyn σε 6mg.",
    relatedGuides: ["snus-posa-mg-na-dialexo", "einai-nomimo-to-snus-stin-ellada"],
  },
  killa: {
    seoTitle: "Killa Nicotine Pouches | Extra Strong 16mg/g",
    seoDescription:
      "Killa nicotine pouches (Cola, Blueberry, Energy, Mint) slim extra strong 16mg/g. Τιμές και αγορά μέσω Vape and More. Μόνο 18+.",
    intro:
      "Η Killa (N.G.P. Empire) φτιάχνει slim nicotine pouches με 16mg/g και έντονες, «candy» γεύσεις: Cola, Blueberry, Energy, Watermelon. Είναι το ενδιάμεσο σκαλί ανάμεσα στα ήπια Velo/Zyn και στα πολύ δυνατά Pablo. Καλή επιλογή για καπνιστές που θέλουν σαφές hit χωρίς καπνό και χωρίς ατμό.",
    relatedGuides: ["snus-posa-mg-na-dialexo", "ti-einai-snus-nicotine-pouches"],
  },
  oxva: {
    seoTitle: "Oxva Xlim Pod Kits Ελλάδα | Τιμές & Διαθεσιμότητα",
    seoDescription:
      "Oxva Xlim Pro, Xlim Go 2, NeXlim: τα δημοφιλή MTL pod kits με τιμές από 16,90€. Αγορά μέσω Vape and More με αποστολή σε όλη την Ελλάδα.",
    intro:
      "Η Oxva έγινε γνωστή με τη σειρά Xlim, το pod kit που πολλοί Έλληνες ατμιστές θεωρούν σημείο αναφοράς για MTL γεύση. Στον κατάλογο θα βρείτε το Xlim Pro (ρυθμιζόμενη ισχύς), το οικονομικό Xlim Go 2 και το NeXlim, μαζί με τα συμβατά pods. Όλα με άμεση διαθεσιμότητα και τιμή στο vapeandmore.gr.",
    relatedGuides: ["kalytero-pod-system-arxarion", "odigos-arxarion-vape-2026"],
  },
};

export function brandMeta(slug: string): BrandMeta {
  return BRAND_META[slug] ?? {};
}
