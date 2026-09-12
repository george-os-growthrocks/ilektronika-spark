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
    secondaryKeywords: ["disposables", "elf bar", "lost mary", "ηλεκτρονικό τσιγάρο μιας χρήσης"],
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
    tagline: "Nicotine pouches χωρίς καπνό",
    h1: "Snus & Nicotine Pouches: Velo, Zyn, Pablo, Killa",
    seoTitle: "Snus & Nicotine Pouches Ελλάδα | Velo, Zyn, Pablo, Killa",
    seoDescription:
      "Snus και nicotine pouches χωρίς καπνό: Velo, Zyn, Pablo, Killa, Siberia από 6mg έως extra strong. Τιμές, ένταση ανά pouch και αγορά μέσω Vape and More. 18+.",
    secondaryKeywords: ["nicotine pouches", "σνους", "velo", "zyn", "snus greece"],
    relatedGuides: [
      "ti-einai-snus-nicotine-pouches",
      "snus-posa-mg-na-dialexo",
      "einai-nomimo-to-snus-stin-ellada",
    ],
    intro:
      "Τα nicotine pouches (συχνά αποκαλούνται «snus») είναι μικρά λευκά σακουλάκια νικοτίνης χωρίς καπνό που τοποθετούνται κάτω από το άνω χείλος για 20–45 λεπτά. Δεν παράγουν καπνό ή ατμό, δεν μυρίζουν και μπορούν να χρησιμοποιηθούν εκεί που το άτμισμα απαγορεύεται. Στον κατάλογο θα βρείτε Velo και Zyn (ήπια, 3–8mg ανά pouch, ιδανικά για αρχή), Killa (extra strong 16mg/g) και Pablo, Cuba, Siberia (30–66mg/g, μόνο για έμπειρους χρήστες). Κάθε προϊόν αναγράφει την ένταση σε mg ανά pouch ή ανά γραμμάριο, ώστε να συγκρίνετε σωστά. Μόνο για ενήλικες 18+.",
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
    seoDescription:
      "Προϊόντα CBD από αξιόπιστους προμηθευτές. Ενημερωθείτε και αγοράστε μέσω Vape and More.",
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

  // ---------- Subcategories (written copy replaces the generated fallback) ----------

  flavorshots: {
    h1: "Flavorshots: Συμπυκνωμένα Αρώματα για Υγρά Αναπλήρωσης",
    seoTitle: "Flavorshots 30ml, 60ml & 120ml | Τιμές & Γεύσεις",
    seoDescription:
      "459 flavorshots από Drifter, Just Juice, Bombo, Stream City, Steam Train, VnV. Συμπυκνωμένο άρωμα σε φιάλη 60ml ή 120ml που γεμίζετε με βάση. Τιμές & αγορά online.",
    secondaryKeywords: ["flavor shots", "flavorshot", "συμπυκνωμένο άρωμα"],
    relatedGuides: ["nicotine-salts-vs-freebase", "pos-na-gemiseis-pod"],
    intro:
      "Το flavorshot είναι συμπυκνωμένο άρωμα (συνήθως 20–24ml) μέσα σε μεγαλύτερη φιάλη 60ml ή 120ml. Εσείς προσθέτετε βάση (VG/PG) και, αν θέλετε, nic shot, και σε 24–48 ώρες έχετε 60 ή 120ml έτοιμο υγρό στη νικοτίνη που διαλέξατε. Είναι ο πιο οικονομικός τρόπος να ατμίζετε καθημερινά: το κόστος ανά ml πέφτει στο ένα τρίτο σε σχέση με τα έτοιμα 10ml. Στον κατάλογο θα βρείτε φρούτα, επιδόρπια, καπνά και μέντα από Drifter, Just Juice, Bombo, Stream City, Steam Train και VnV, με το μέγεθος φιάλης και τη διαθεσιμότητα σε κάθε προϊόν.",
  },
  "flavorshots-60ml": {
    h1: "Flavorshots 60ml",
    seoTitle: "Flavorshots 60ml | Αρώματα 20ml σε Φιάλη 60ml",
    seoDescription:
      "329 flavorshots 60ml: συμπυκνωμένο άρωμα 20ml που συμπληρώνετε με 40ml βάση. Drifter, Just Juice, Bombo, Stream City. Τιμές & αγορά μέσω Vape and More.",
    relatedGuides: ["nicotine-salts-vs-freebase"],
    intro:
      "Η φιάλη 60ml είναι το πιο δημοφιλές μέγεθος flavorshot στην Ελλάδα: 20ml άρωμα + 40ml βάση της επιλογής σας. Ιδανική για να δοκιμάζετε γεύσεις χωρίς μεγάλη δέσμευση, ενώ με δύο nic shots των 10ml φτάνετε εύκολα σε 3mg νικοτίνη. Εδώ συγκεντρώνουμε όλες τις γεύσεις 60ml με μάρκα, διαθεσιμότητα και τιμή.",
  },
  "flavorshots-120ml": {
    h1: "Flavorshots 120ml",
    seoTitle: "Flavorshots 120ml | Μεγάλη Φιάλη, Χαμηλότερο Κόστος/ml",
    seoDescription:
      "99 flavorshots 120ml για όσους ατμίζουν πολύ: 24-30ml άρωμα σε φιάλη 120ml. Το χαμηλότερο κόστος ανά ml. Τιμές & αγορά μέσω Vape and More.",
    relatedGuides: ["nicotine-salts-vs-freebase"],
    intro:
      "Το 120ml flavorshot απευθύνεται σε όσους έχουν βρει τη γεύση τους και ατμίζουν καθημερινά σε DTL ή ανοιχτό MTL. Με 24–30ml άρωμα και 90ml+ βάση, το κόστος ανά ml είναι το χαμηλότερο της κατηγορίας. Προσοχή στη νικοτίνη: για 3mg σε 120ml χρειάζεστε τρία nic shots 20mg.",
  },
  "flavorshots-30ml": {
    h1: "Flavorshots 30ml",
    seoTitle: "Flavorshots 30ml | Μικρή Φιάλη για Δοκιμή Γεύσης",
    seoDescription:
      "Flavorshots 30ml: 10ml άρωμα σε φιάλη 30ml, το ιδανικό μέγεθος για να δοκιμάσετε νέα γεύση. Τιμές & αγορά μέσω Vape and More.",
    intro:
      "Το 30ml είναι το μέγεθος δοκιμής: 10ml άρωμα, 20ml βάση, ένα nic shot και έχετε 30ml έτοιμο υγρό σε δύο ημέρες. Αν σας αρέσει, προχωράτε στο 60ml ή 120ml της ίδιας γεύσης.",
  },
  "dexamenes-pod": {
    h1: "Δεξαμενές & Pods Αντικατάστασης",
    seoTitle: "Ανταλλακτικά Pods & Δεξαμενές | Xros, Xlim, Caliburn, Argus",
    seoDescription:
      "71 ανταλλακτικά pods και δεξαμενές για Vaporesso Xros, Oxva Xlim, Uwell Caliburn, Voopoo Argus & Drag. Βρείτε το σωστό pod για τη συσκευή σας.",
    relatedGuides: ["pos-na-allakseis-antistasi", "pos-na-gemiseis-pod"],
    intro:
      "Το pod είναι το αναλώσιμο μέρος του pod system: περιέχει τη δεξαμενή υγρού και, στα περισσότερα μοντέλα, ενσωματωμένη αντίσταση. Αλλάζεται κάθε 1–3 εβδομάδες ή όταν η γεύση «καεί». Εδώ θα βρείτε pods ανά συσκευή (Vaporesso Xros, Oxva Xlim, Uwell Caliburn, Voopoo Argus/Drag, Vaporesso Armour) και ανά ωμική τιμή, ώστε να πάρετε ακριβώς αυτό που ταιριάζει στο kit σας. Ελέγξτε το μοντέλο και την ωμική (π.χ. 0.6Ω για MTL, 0.4Ω για πιο ανοιχτό άτμισμα) πριν παραγγείλετε.",
  },
  "ergostasiakes-antistaseis": {
    h1: "Εργοστασιακές Αντιστάσεις (Coil Heads)",
    seoTitle: "Εργοστασιακές Αντιστάσεις Vape | Mesh & Classic Coils",
    seoDescription:
      "57 έτοιμες αντιστάσεις (coil heads) για tanks και pod kits: mesh, ceramic, classic σε όλες τις ωμικές. Άμεση διαθεσιμότητα μέσω Vape and More.",
    relatedGuides: ["pos-na-allakseis-antistasi", "mtl-vs-dtl-poio-stil-atmismatos"],
    intro:
      "Οι εργοστασιακές αντιστάσεις είναι έτοιμες κεφαλές που βιδώνουν ή κουμπώνουν στον ατμοποιητή σας. Mesh για γρήγορη θέρμανση και πλούσια γεύση, classic σύρμα για κλασικό MTL, ceramic για μεγαλύτερη διάρκεια. Η ωμική τιμή καθορίζει το στυλ: πάνω από 0.8Ω για MTL (σαν τσιγάρο), κάτω από 0.5Ω για DTL με περισσότερο ατμό. Μια αντίσταση κρατά 1–3 εβδομάδες ανάλογα με το υγρό (τα γλυκά την «καίνε» γρηγορότερα).",
  },
  "mias-chrisis": {
    h1: "Ηλεκτρονικά Τσιγάρα Μιας Χρήσης",
    seoTitle: "Vape Μιας Χρήσης 600 Puffs | Cookies, Elf Bar, Titan",
    seoDescription:
      "37 vapes μιας χρήσης έτοιμα προς χρήση: Cookies Wand 600 puffs (8€), Elf Bar 600V2 (7€), Titan 8x2ml. Nicotine salts 20mg. Αγορά μέσω Vape and More. 18+.",
    relatedGuides: ["kalytera-disposables-2026", "elf-bar-vs-lost-mary"],
    intro:
      "Η κλασική μορφή disposable: συσκευή με προγεμισμένο υγρό 2ml (όριο TPD) και μπαταρία που φτάνει για περίπου 600 εισπνοές, όσο ενάμισι με δύο πακέτα τσιγάρα. Δεν φορτίζει, δεν γεμίζει, δεν χρειάζεται καμία ρύθμιση. Τιμές από 7€ (Elf Bar EB 600V2) και 8€ (Cookies Wand) έως τις οικονομικές πολυσυσκευασίες Titan 8×2ml στα 19,90€. Όλα με nicotine salts 20mg/ml για ομαλή αίσθηση.",
  },
  "progemismenes-kapsoyles": {
    h1: "Προγεμισμένες Κάψουλες (Prefilled Pods)",
    seoTitle: "Προγεμισμένα Pods | Lost Mary Tappo, Geek Bar Elite, Vozol",
    seoDescription:
      "32 προγεμισμένες κάψουλες 2ml 20mg για επαναχρησιμοποιήσιμες μπαταρίες: Lost Mary Tappo (8€), Geek Bar Elite 2τμχ (7€), Vozol Vista. Αγορά μέσω Vape and More.",
    relatedGuides: ["kalytera-disposables-2026", "elf-bar-vs-lost-mary"],
    intro:
      "Το ενδιάμεσο ανάμεσα σε disposable και pod system: μια μικρή επαναφορτιζόμενη μπαταρία και προγεμισμένες κάψουλες 2ml που απλώς κουμπώνετε. Ίδια ευκολία με το μιας χρήσης, αλλά λιγότερα απόβλητα και χαμηλότερο κόστος ανά ml. Lost Mary Tappo (8€ το pod), Geek Bar Elite σε συσκευασία δύο τεμαχίων (7€) και Vozol Vista με kit + 10ml υγρό.",
  },
  "progemismena-pods": {
    h1: "Προγεμισμένα Pods & Kits",
    seoTitle: "Προγεμισμένα Pod Kits | Μπαταρία + Κάψουλες",
    seoDescription:
      "Kits με επαναφορτιζόμενη μπαταρία και προγεμισμένα pods 20mg: το πρώτο βήμα μετά τα disposables. Τιμές & αγορά μέσω Vape and More.",
    relatedGuides: ["kalytera-disposables-2026", "odigos-arxarion-vape-2026"],
    intro:
      "Το starter kit της κατηγορίας prefilled: περιλαμβάνει τη μπαταρία (συνήθως 500–650mAh, φόρτιση USB-C) και ένα ή δύο προγεμισμένα pods. Μετά αγοράζετε μόνο τις κάψουλες. Ιδανικό για όσους θέλουν να φύγουν από τα disposables χωρίς να ασχοληθούν με υγρά και αντιστάσεις.",
  },
  "ilektronika-tsigara-pods": {
    h1: "Ηλεκτρονικά Τσιγάρα Pod Systems",
    seoTitle: "Pod Systems | Vaporesso, Oxva, Voopoo, Uwell από 16,90€",
    seoDescription:
      "20 pod systems για αρχάριους και MTL ατμιστές: Oxva Xlim Go 2 (16,90€), NeXlim Go (19,90€), Xlim Pro 3, Voopoo Argus G2, Vaporesso Armour. Αγορά μέσω Vape and More.",
    relatedGuides: [
      "kalytero-pod-system-arxarion",
      "odigos-arxarion-vape-2026",
      "pos-na-gemiseis-pod",
    ],
    intro:
      "Το pod system είναι το ηλεκτρονικό τσιγάρο που προτείνουμε σε όποιον θέλει να κόψει το κάπνισμα: μικρή επαναφορτιζόμενη συσκευή, pod που γεμίζετε με το υγρό της επιλογής σας και αντίσταση που αλλάζει κάθε 1–3 εβδομάδες. Κόστος 17–40€ για τη συσκευή και 25–40€ τον μήνα σε αναλώσιμα, δηλαδή ένα κλάσμα του κόστους των τσιγάρων. Στον κατάλογο: Oxva Xlim Go 2 και NeXlim Go για ξεκίνημα, Xlim Pro 3 και Voopoo Argus G2 για ρυθμιζόμενη ισχύ, Vaporesso Armour για μεγαλύτερη αυτονομία.",
  },
  "ilektronika-tsigara-kit": {
    h1: "Ηλεκτρονικά Τσιγάρα Kit (Mod + Ατμοποιητής)",
    seoTitle: "Vape Kits | Box Mod & Tank Σετ για Προχωρημένους",
    seoDescription:
      "Πλήρη kits με box mod και ατμοποιητή για DTL και προχωρημένους ατμιστές. Τιμές & διαθεσιμότητα μέσω Vape and More.",
    relatedGuides: ["mtl-vs-dtl-poio-stil-atmismatos", "geekvape-vs-vaporesso"],
    intro:
      "Τα kits συνδυάζουν box mod με ρυθμιζόμενη ισχύ και sub-ohm ή MTL ατμοποιητή. Απευθύνονται σε όσους έχουν ήδη εμπειρία, θέλουν περισσότερο ατμό, μεγαλύτερη μπαταρία ή αντικαταστάσιμες 18650/21700. Αν ξεκινάτε τώρα, ένα pod system είναι πιο απλή αρχή.",
  },
  "nargiledes-naya": {
    h1: "Ναργιλέδες Naya",
    seoTitle: "Ναργιλέδες Naya | Ρωσικοί Ναργιλέδες Ανοξείδωτου",
    seoDescription:
      "20 ναργιλέδες Naya: ρωσικής σχεδίασης, ανοξείδωτο ατσάλι, σταθερό τράβηγμα και εύκολος καθαρισμός. Τιμές & αγορά μέσω Vape and More.",
    relatedGuides: ["odigos-nargile-arxarion", "kalytera-kapna-nargile"],
    intro:
      "Η Naya είναι από τις πιο αναγνωρίσιμες μάρκες μοντέρνων ναργιλέδων: ανοξείδωτο ατσάλι, αποσπώμενα μέρη για καθαρισμό, ρυθμιζόμενος καταπέλτης και σταθερό, αθόρυβο τράβηγμα. Στον κατάλογο θα βρείτε τα μοντέλα σε διάφορα ύψη και χρώματα, τα περισσότερα ως πλήρη σετ με βάση και σωλήνα.",
  },
  "diy-vaseis-nikotines": {
    h1: "DIY Βάσεις & Νικοτίνη (Nic Shots)",
    seoTitle: "Βάσεις VG/PG & Nic Shots 20mg | DIY Υγρά Αναπλήρωσης",
    seoDescription:
      "Βάσεις 50/50 και 70/30, nic shots 20mg 10ml και έτοιμες βάσεις με νικοτίνη για flavorshots. Τιμές & αγορά μέσω Vape and More. Μόνο 18+.",
    relatedGuides: ["nicotine-salts-vs-freebase"],
    intro:
      "Ό,τι χρειάζεστε για να ολοκληρώσετε ένα flavorshot: ουδέτερη βάση VG/PG (50/50 για MTL, 70/30 για DTL) και nic shots των 10ml στα 20mg. Ο κανόνας: ένα nic shot 20mg σε 60ml δίνει περίπου 3mg, δύο δίνουν 6mg. Οι βάσεις με έτοιμη νικοτίνη γλιτώνουν το μέτρημα.",
  },
  "episkeyasimoi-atmopoiites": {
    h1: "Επισκευάσιμοι Ατμοποιητές (RTA, RDA, RDTA)",
    seoTitle: "Επισκευάσιμοι Ατμοποιητές RTA RDA | Rebuildable Vape",
    seoDescription:
      "RTA, RDA και RDTA ατμοποιητές για όσους τυλίγουν τις δικές τους αντιστάσεις. Έτοιμα σύρματα και βαμβάκι. Τιμές μέσω Vape and More.",
    relatedGuides: ["mtl-vs-dtl-poio-stil-atmismatos", "pos-na-allakseis-antistasi"],
    intro:
      "Rebuildable σημαίνει ότι τυλίγετε ή τοποθετείτε μόνοι σας το σύρμα και το βαμβάκι. Το κόστος ανά αντίσταση πέφτει σε λίγα λεπτά και η γεύση, σωστά στημένη, ξεπερνά τις εργοστασιακές κεφαλές. Απαιτεί βασικές γνώσεις ωμικής και ασφάλειας μπαταρίας· δεν προτείνεται για αρχάριους.",
  },
  "syrmata-etoimes-antistaseis": {
    h1: "Σύρματα & Έτοιμες Αντιστάσεις για RTA/RDA",
    seoTitle: "Έτοιμες Αντιστάσεις & Σύρματα Vape | Clapton, Mesh, Ni80",
    seoDescription:
      "Προτυλιγμένες αντιστάσεις (clapton, alien, mesh strips) και σύρματα Ni80, Kanthal για επισκευάσιμους ατμοποιητές. Αγορά μέσω Vape and More.",
    intro:
      "Έτοιμα τυλιγμένα coils και σύρματα σε ρολό για RTA και RDA. Τα clapton και alien δίνουν έντονη γεύση σε DTL, τα απλά round wire ταιριάζουν σε MTL builds, ενώ τα mesh strips θερμαίνονται πιο ομοιόμορφα. Πάντα με βαμβάκι κατάλληλο για άτμισμα.",
  },
  "fog-lab": {
    h1: "Καπνοί Ναργιλέ Fog Lab",
    seoTitle: "Fog Lab Καπνός Ναργιλέ | Γεύσεις & Τιμές",
    seoDescription:
      "37 γεύσεις καπνού ναργιλέ Fog Lab: φρούτα, μέντα, επιδόρπια. Ελληνική εταιρεία, συσκευασίες 50g & 200g. Αγορά μέσω Vape and More.",
    relatedGuides: ["kalytera-kapna-nargile", "odigos-nargile-arxarion"],
    intro:
      "Η Fog Lab είναι ελληνική εταιρεία καπνών ναργιλέ με σύγχρονα, «juicy» προφίλ: φρουτώδεις συνδυασμοί, παγωμένες μέντες και επιδόρπια. Μεσαία ένταση, εύκολη διαχείριση θερμότητας, καλή συμβατότητα με phunnel μπολ. Διαθέσιμα σε 50g για δοκιμή και 200g για τακτική χρήση.",
  },
  taboo: {
    h1: "Καπνοί Ναργιλέ Taboo",
    seoTitle: "Taboo Καπνός Ναργιλέ | Έντονες Γεύσεις 50g & 200g",
    seoDescription:
      "35 γεύσεις καπνού ναργιλέ Taboo. Σκούρος, δυνατός καπνός με έντονα αρώματα. Τιμές και αγορά μέσω Vape and More.",
    relatedGuides: ["kalytera-kapna-nargile"],
    intro:
      "Ο Taboo είναι σκούρος καπνός (dark leaf) με πιο δυνατό χαρακτήρα και πλούσιο, πυκνό καπνό. Απευθύνεται σε όσους θέλουν έντονη γεύση και μεγάλη διάρκεια στη σύνοδο. Συνδυάζεται καλά με phunnel και heat management συσκευή για σταθερή θερμοκρασία.",
  },
  "o-s-tobacco": {
    h1: "Καπνοί Ναργιλέ O's Tobacco",
    seoTitle: "O's Tobacco Καπνός Ναργιλέ | Γερμανικές Γεύσεις 200g",
    seoDescription:
      "Καπνοί ναργιλέ O's Tobacco από τη Φρανκφούρτη: Queen of the Desert, African King και άλλες εξωτικές γεύσεις σε 200g. Αγορά μέσω Vape and More.",
    relatedGuides: ["kalytera-kapna-nargile"],
    intro:
      "Η O's Tobacco είναι γερμανική μάρκα με χαρακτηριστικά, πολυεπίπεδα αρώματα (κάκτος-καρύδα, τροπικά, γλυκά μπαχαρικά) και υγρή, καλά μαριναρισμένη κοπή. Νέα άφιξη στην ελληνική αγορά, διαθέσιμη σε συσκευασίες 200g.",
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
  const countBit = productCount != null ? ` ${productCount} προϊόντα.` : "";
  return `Βρείτε ${fallbackLabel.toLowerCase()} στο Vape and More.${countBit} Τιμές, διαθεσιμότητα & άμεση αποστολή 1-3 ημέρες.`.slice(
    0,
    160,
  );
}
