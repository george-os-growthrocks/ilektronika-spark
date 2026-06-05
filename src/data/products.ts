export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: string; // category slug
  price: number;
  shortDescription: string;
  description: string;
  specs: { label: string; value: string }[];
  features: string[];
  metaDescription: string;
}

// Demo product catalog — original Greek copy, not copied from any third-party site.
// Brand and product names are real (e.g., Elf Bar, Vaporesso) because they are
// generic vape industry brands; descriptions and specs are original editorial copy.

export const products: Product[] = [
  // DISPOSABLES
  {
    slug: "elf-bar-600-watermelon",
    name: "Elf Bar 600 Watermelon",
    brand: "Elf Bar",
    category: "disposables",
    price: 8.9,
    shortDescription: "600 εισπνοές με δροσερή γεύση καρπούζι και 20mg/ml νικοτινικά άλατα.",
    description:
      "Το Elf Bar 600 σε γεύση καρπούζι είναι ένα από τα πιο δημοφιλή disposable vapes στην Ελλάδα. Προσφέρει σταθερή απόδοση από την πρώτη έως την τελευταία εισπνοή, με ομαλή απελευθέρωση νικοτίνης χάρη στα nicotine salts. Ιδανικό για περιστασιακή χρήση ή ως εφεδρική επιλογή.",
    specs: [
      { label: "Εισπνοές", value: "≈600" },
      { label: "Νικοτίνη", value: "20mg/ml (salts)" },
      { label: "Χωρητικότητα", value: "2ml" },
      { label: "Μπαταρία", value: "550mAh, ενσωματωμένη" },
    ],
    features: ["Έτοιμο για χρήση", "Συμβατό με TPD", "Δροσιστική γεύση καρπούζι"],
    metaDescription: "Elf Bar 600 Watermelon — disposable vape 20mg, 600 εισπνοές, νικοτινικά άλατα. Αυθεντικό προϊόν.",
  },
  {
    slug: "lost-mary-bm600-blue-razz-ice",
    name: "Lost Mary BM600 Blue Razz Ice",
    brand: "Lost Mary",
    category: "disposables",
    price: 9.5,
    shortDescription: "Blue raspberry με παγωμένη επίγευση. 600 εισπνοές.",
    description:
      "Το Lost Mary BM600 σε Blue Razz Ice συνδυάζει τη γλυκόξινη γεύση μπλε σμέουρου με μια δροσιστική παγωμένη επίγευση. Με εργονομικό σχεδιασμό και μηχανισμό auto-draw, ταιριάζει τέλεια σε όσους θέλουν ευκολία χωρίς συμβιβασμό στη γεύση.",
    specs: [
      { label: "Εισπνοές", value: "≈600" },
      { label: "Νικοτίνη", value: "20mg/ml" },
      { label: "Χωρητικότητα", value: "2ml" },
      { label: "Μπαταρία", value: "500mAh" },
    ],
    features: ["Mesh coil για καλύτερη γεύση", "Auto-draw", "Εργονομικός σχεδιασμός"],
    metaDescription: "Lost Mary BM600 Blue Razz Ice — disposable με γεύση μπλε σμέουρο και παγωμένη επίγευση.",
  },
  {
    slug: "elf-bar-bc5000-strawberry",
    name: "Elf Bar BC5000 Strawberry Kiwi",
    brand: "Elf Bar",
    category: "disposables",
    price: 17.9,
    shortDescription: "5000 εισπνοές, επαναφορτιζόμενο, γεύση φράουλα-ακτινίδιο.",
    description:
      "Η μεγαλύτερη έκδοση της σειράς BC, με 5000 εισπνοές και επαναφορτιζόμενη μπαταρία USB-C. Συνδυάζει τη γλυκύτητα της φράουλας με την οξύτητα του ακτινιδίου για μια ισορροπημένη, τροπική εμπειρία. Σημ.: διαθέσιμο σε χώρες εκτός ΕΕ — εντός ΕΕ σε έκδοση 600 puffs λόγω TPD.",
    specs: [
      { label: "Εισπνοές", value: "≈5000" },
      { label: "Νικοτίνη", value: "20mg/ml" },
      { label: "Φόρτιση", value: "USB-C" },
      { label: "Χωρητικότητα", value: "13ml" },
    ],
    features: ["Επαναφορτιζόμενο", "Dual mesh coil", "Τροπική γεύση"],
    metaDescription: "Elf Bar BC5000 Strawberry Kiwi — 5000 puffs, επαναφορτιζόμενο disposable.",
  },
  {
    slug: "ivg-2400-fizzy-cherry",
    name: "IVG 2400 Fizzy Cherry",
    brand: "IVG",
    category: "disposables",
    price: 14.9,
    shortDescription: "4 γεύσεις σε ένα disposable με 2400 puffs.",
    description:
      "Το IVG 2400 διαθέτει 4 αλληλεπιλεγόμενες γεύσεις σε ένα μόνο disposable. Ξεκινάει με fizzy cherry και αλλάζει σε άλλες φρουτώδεις παραλλαγές με το πάτημα ενός κουμπιού. Επαναφορτιζόμενη μπαταρία USB-C.",
    specs: [
      { label: "Εισπνοές", value: "≈2400" },
      { label: "Γεύσεις", value: "4 σε 1" },
      { label: "Νικοτίνη", value: "20mg/ml" },
      { label: "Φόρτιση", value: "USB-C" },
    ],
    features: ["4-in-1 flavor", "Επαναφορτιζόμενο", "Mesh coil"],
    metaDescription: "IVG 2400 Fizzy Cherry — disposable με 4 γεύσεις σε ένα, 2400 puffs.",
  },
  {
    slug: "rand-m-tornado-9000-mint",
    name: "R&M Tornado 9000 Mint",
    brand: "R&M",
    category: "disposables",
    price: 19.9,
    shortDescription: "9000 εισπνοές με δροσερή γεύση μέντα και RGB lighting.",
    description:
      "Το R&M Tornado 9000 ξεχωρίζει για τη μεγάλη αυτονομία του και το χαρακτηριστικό RGB φωτισμό κάτω από το διάφανο σώμα. Η γεύση μέντας είναι έντονη και καθαρή, ιδανική για όσους αναζητούν δροσιά. Επαναφορτιζόμενο USB-C.",
    specs: [
      { label: "Εισπνοές", value: "≈9000" },
      { label: "Νικοτίνη", value: "20mg/ml" },
      { label: "Μπαταρία", value: "850mAh" },
      { label: "Φόρτιση", value: "USB-C" },
    ],
    features: ["RGB lighting", "Mesh coil", "Επαναφορτιζόμενο"],
    metaDescription: "R&M Tornado 9000 Mint — disposable με 9000 puffs και RGB φωτισμό.",
  },
  {
    slug: "geek-bar-pulse-mango-ice",
    name: "Geek Bar Pulse Mango Ice",
    brand: "Geek Bar",
    category: "disposables",
    price: 18.5,
    shortDescription: "Dual mode (regular/pulse), 15000 puffs, γεύση μάνγκο.",
    description:
      "Το Geek Bar Pulse προσφέρει δύο modes ατμίσματος (regular και pulse mode για μεγαλύτερη παραγωγή ατμού), οθόνη που δείχνει υπολειπόμενη μπαταρία και υγρό, και γνωστή ως μία από τις καλύτερες mango γεύσεις της αγοράς. Επαναφορτιζόμενο.",
    specs: [
      { label: "Εισπνοές", value: "≈15000" },
      { label: "Νικοτίνη", value: "20mg/ml" },
      { label: "Modes", value: "Regular / Pulse" },
      { label: "Οθόνη", value: "LED display" },
    ],
    features: ["Dual mode", "LED display", "Pulse mode για μεγαλύτερο hit"],
    metaDescription: "Geek Bar Pulse Mango Ice — 15000 puffs, dual mode, LED display.",
  },

  // PODS
  {
    slug: "vaporesso-xros-3",
    name: "Vaporesso XROS 3",
    brand: "Vaporesso",
    category: "pods",
    price: 28.9,
    shortDescription: "Pod kit 1000mAh με ρύθμιση ροής αέρα.",
    description:
      "Το XROS 3 είναι η τρίτη γενιά του best-seller pod kit της Vaporesso. Με 1000mAh μπαταρία, ρύθμιση ροής αέρα στη βάση, και συμβατότητα με δύο τύπους pods (mesh 0.6Ω και 1.0Ω), είναι ιδανικό για MTL και ελαφρύ RDL. Φόρτιση USB-C 1A.",
    specs: [
      { label: "Μπαταρία", value: "1000mAh" },
      { label: "Ισχύς", value: "Έως 18W" },
      { label: "Pod", value: "2ml" },
      { label: "Φόρτιση", value: "USB-C 1A" },
    ],
    features: ["Adjustable airflow", "Mesh coils", "Top-fill σύστημα"],
    metaDescription: "Vaporesso XROS 3 — pod kit 1000mAh, USB-C, mesh coils.",
  },
  {
    slug: "uwell-caliburn-a3s",
    name: "Uwell Caliburn A3S",
    brand: "Uwell",
    category: "pods",
    price: 22.5,
    shortDescription: "Πιστοποιημένη γεύση Pro-FOCS, 520mAh, draw-activated.",
    description:
      "Το Caliburn A3S χρησιμοποιεί την τεχνολογία Pro-FOCS της Uwell που επικεντρώνεται σε καθαρή απόδοση γεύσης. Πολύ ελαφρύ (16g), draw-activated, με 520mAh μπαταρία και 2ml pods 1.0Ω. Ιδανικό για MTL.",
    specs: [
      { label: "Μπαταρία", value: "520mAh" },
      { label: "Ισχύς", value: "Έως 15W" },
      { label: "Pod", value: "2ml, 1.0Ω" },
      { label: "Ενεργοποίηση", value: "Draw-activated" },
    ],
    features: ["Pro-FOCS technology", "Ultra-light", "Καθαρή γεύση"],
    metaDescription: "Uwell Caliburn A3S — pod kit με Pro-FOCS γεύση, ιδανικό για MTL.",
  },
  {
    slug: "voopoo-argus-p1",
    name: "Voopoo Argus P1",
    brand: "Voopoo",
    category: "pods",
    price: 26.0,
    shortDescription: "800mAh, 20W, μεταλλικό σώμα με leather inlay.",
    description:
      "Το Argus P1 συνδυάζει επιδόσεις με premium αισθητική. Δέρμα στη ράχη, μεταλλικό σώμα, 800mAh, και υποστηρίζει pods Argus PNP. Με Smart Power Management που προσαρμόζει αυτόματα την ισχύ ανάλογα με την αντίσταση.",
    specs: [
      { label: "Μπαταρία", value: "800mAh" },
      { label: "Ισχύς", value: "Έως 20W" },
      { label: "Pod", value: "2ml, PNP coils" },
      { label: "Υλικό", value: "Zinc alloy + leather" },
    ],
    features: ["Smart Power Management", "Premium υλικά", "PNP coil compatibility"],
    metaDescription: "Voopoo Argus P1 — pod kit 800mAh με premium κατασκευή.",
  },
  {
    slug: "smok-novo-4-mini",
    name: "Smok Novo 4 Mini",
    brand: "Smok",
    category: "pods",
    price: 24.9,
    shortDescription: "900mAh, οθόνη OLED, ρύθμιση ισχύος.",
    description:
      "Το Novo 4 Mini φέρνει την κλασική σειρά Novo σε πιο compact μέγεθος, με 900mAh μπαταρία και OLED οθόνη για ένδειξη ισχύος, αντίστασης και puffs. Δέχεται όλα τα Novo 4 pods.",
    specs: [
      { label: "Μπαταρία", value: "900mAh" },
      { label: "Ισχύς", value: "5-25W" },
      { label: "Οθόνη", value: "OLED" },
      { label: "Pod", value: "2ml" },
    ],
    features: ["OLED display", "Variable wattage", "USB-C φόρτιση"],
    metaDescription: "Smok Novo 4 Mini — pod kit με OLED οθόνη και ρύθμιση ισχύος.",
  },
  {
    slug: "geekvape-aegis-q",
    name: "Geekvape Aegis Q",
    brand: "Geekvape",
    category: "pods",
    price: 31.0,
    shortDescription: "Αδιάβροχο IP68, ανθεκτικό σε κραδασμούς, 1000mAh.",
    description:
      "Το Aegis Q κρατάει τη φιλοσοφία της σειράς Aegis (αδιάβροχο IP68, ανθεκτικό σε πτώσεις) σε pod μορφή. Ιδανικό για outdoors, ταξίδια ή απλά για όσους θέλουν τη μέγιστη ανθεκτικότητα.",
    specs: [
      { label: "Μπαταρία", value: "1000mAh" },
      { label: "Πιστοποίηση", value: "IP68" },
      { label: "Ισχύς", value: "Έως 20W" },
      { label: "Pod", value: "2ml, B-coils" },
    ],
    features: ["IP68 αδιάβροχο", "Shock-resistant", "Anti-dust"],
    metaDescription: "Geekvape Aegis Q — αδιάβροχο pod kit IP68 με 1000mAh μπαταρία.",
  },
  {
    slug: "innokin-endura-s1",
    name: "Innokin Endura S1",
    brand: "Innokin",
    category: "pods",
    price: 19.5,
    shortDescription: "950mAh, ιδανικό για αρχάριους.",
    description:
      "Το Endura S1 είναι σχεδιασμένο για όσους ξεκινούν το άτμισμα: απλή λειτουργία draw-activated, χαμηλή ισχύς για ομαλή MTL εμπειρία, μεγάλη μπαταρία 950mAh. Δέχεται πολλούς τύπους pod της σειράς Endura.",
    specs: [
      { label: "Μπαταρία", value: "950mAh" },
      { label: "Ισχύς", value: "Έως 15W" },
      { label: "Pod", value: "2ml" },
      { label: "Ενεργοποίηση", value: "Auto-draw" },
    ],
    features: ["Beginner-friendly", "Μεγάλη μπαταρία", "USB-C"],
    metaDescription: "Innokin Endura S1 — pod kit για αρχάριους με 950mAh μπαταρία.",
  },

  // ΥΓΡΑ
  {
    slug: "dinner-lady-lemon-tart-60ml",
    name: "Dinner Lady Lemon Tart Shortfill 60ml",
    brand: "Dinner Lady",
    category: "ygra",
    price: 19.9,
    shortDescription: "Κλασικό lemon tart με μαρέγκα. 50ml + space για nic shot.",
    description:
      "Το θρυλικό Lemon Tart της Dinner Lady σε shortfill μορφή 50ml/60ml. Συνδυάζει την οξύτητα του λεμονιού με τη γλυκύτητα της μαρέγκας πάνω σε τραγανή ζύμη. 70VG/30PG, ιδανικό για sub-ohm tanks.",
    specs: [
      { label: "Όγκος", value: "50ml (σε 60ml μπουκάλι)" },
      { label: "PG/VG", value: "30/70" },
      { label: "Νικοτίνη", value: "0mg (shortfill)" },
      { label: "Συμβατότητα", value: "Sub-ohm" },
    ],
    features: ["UK premium e-liquid", "Award-winning flavor", "Shortfill"],
    metaDescription: "Dinner Lady Lemon Tart 50ml shortfill — κλασικό dessert e-liquid από UK.",
  },
  {
    slug: "elf-liq-watermelon-10ml",
    name: "Elf Liq Watermelon 10ml — Nicotine Salts",
    brand: "Elf Liq",
    category: "ygra",
    price: 6.9,
    shortDescription: "Δροσερό καρπούζι σε nicotine salts μορφή.",
    description:
      "Η Elf Bar φέρνει τις δημοφιλείς γεύσεις των disposables σε nicotine salts μορφή 10ml — ιδανικό για pod systems. Το Watermelon είναι γλυκό και δροσερό, με την κλασική Elf γεύση.",
    specs: [
      { label: "Όγκος", value: "10ml" },
      { label: "PG/VG", value: "50/50" },
      { label: "Νικοτίνη", value: "20mg/ml salts" },
      { label: "Συμβατότητα", value: "Pod systems / MTL" },
    ],
    features: ["Nicotine salts", "Childproof cap", "TPD compliant"],
    metaDescription: "Elf Liq Watermelon 10ml nicotine salts — για pod systems.",
  },
  {
    slug: "nasty-juice-cush-man-60ml",
    name: "Nasty Juice Cush Man Shortfill 60ml",
    brand: "Nasty Juice",
    category: "ygra",
    price: 18.5,
    shortDescription: "Ώριμο μάνγκο με ίχνη μέντας. Μαλαισιανή ποιότητα.",
    description:
      "Το Cush Man της Nasty Juice αναπαριστά τη γεύση πλήρως ώριμου μάνγκο, με διακριτικές νότες παγωμένης μέντας στο τέλος. Δημιουργία από τη Μαλαισία, με 70VG για άφθονο ατμό.",
    specs: [
      { label: "Όγκος", value: "50ml" },
      { label: "PG/VG", value: "30/70" },
      { label: "Νικοτίνη", value: "0mg" },
      { label: "Συμβατότητα", value: "Sub-ohm" },
    ],
    features: ["Malaysian premium", "Tropical profile", "Shortfill"],
    metaDescription: "Nasty Juice Cush Man 50ml — μάνγκο με μέντα από Μαλαισία.",
  },
  {
    slug: "ivg-strawberry-watermelon-10ml",
    name: "IVG Strawberry Watermelon 10ml",
    brand: "IVG",
    category: "ygra",
    price: 5.9,
    shortDescription: "Φράουλα-καρπούζι σε freebase 10ml.",
    description:
      "Κλασικός συνδυασμός φράουλας και καρπουζιού από την IVG. Διαθέσιμο σε 0mg, 6mg, 12mg και 18mg freebase νικοτίνη. Ιδανικό για MTL συσκευές.",
    specs: [
      { label: "Όγκος", value: "10ml" },
      { label: "PG/VG", value: "50/50" },
      { label: "Νικοτίνη", value: "0-18mg freebase" },
      { label: "Συμβατότητα", value: "MTL" },
    ],
    features: ["UK manufactured", "Multiple nic strengths", "Childproof"],
    metaDescription: "IVG Strawberry Watermelon 10ml — fruity e-liquid σε πολλαπλές δόσεις νικοτίνης.",
  },
  {
    slug: "pod-salt-blueberry-ice-10ml",
    name: "Pod Salt Blueberry Ice 10ml",
    brand: "Pod Salt",
    category: "ygra",
    price: 6.5,
    shortDescription: "Μύρτιλλο με παγωμένη επίγευση. 20mg nic salts.",
    description:
      "Η Pod Salt είναι ένας από τους πιο γνωστούς UK κατασκευαστές nicotine salts. Το Blueberry Ice συνδυάζει ώριμα μύρτιλλα με δροσιστική παγωμένη επίγευση. Ομαλή στο λαιμό, ιδανικό για όλη την ημέρα.",
    specs: [
      { label: "Όγκος", value: "10ml" },
      { label: "PG/VG", value: "50/50" },
      { label: "Νικοτίνη", value: "20mg/ml salts" },
      { label: "Origin", value: "United Kingdom" },
    ],
    features: ["Pure nicotine salts", "Smooth throat hit", "TPD compliant"],
    metaDescription: "Pod Salt Blueberry Ice 10ml — UK nicotine salts με μύρτιλλο και πάγο.",
  },
  {
    slug: "twelve-monkeys-mangabeys-60ml",
    name: "Twelve Monkeys Mangabeys 60ml",
    brand: "Twelve Monkeys",
    category: "ygra",
    price: 21.0,
    shortDescription: "Mango γιαούρτι με ίχνη ροδάκινου.",
    description:
      "Το Mangabeys της Twelve Monkeys είναι μια εκλεπτυσμένη σύνθεση από κρεμώδες mango γιαούρτι με νότες ροδάκινου και passion fruit. Καναδικής δημιουργίας, υψηλής ποιότητας ingredients.",
    specs: [
      { label: "Όγκος", value: "50ml" },
      { label: "PG/VG", value: "20/80" },
      { label: "Νικοτίνη", value: "0mg" },
      { label: "Origin", value: "Canada" },
    ],
    features: ["Canadian premium", "Complex profile", "High VG"],
    metaDescription: "Twelve Monkeys Mangabeys 50ml — premium mango γιαούρτι e-liquid.",
  },

  // ΑΤΜΙΣΤΙΚΕΣ / MODS
  {
    slug: "geekvape-aegis-legend-3",
    name: "Geekvape Aegis Legend 3",
    brand: "Geekvape",
    category: "atmistikes",
    price: 79.9,
    shortDescription: "200W dual battery mod, IP68, leather finish.",
    description:
      "Το Aegis Legend 3 (L200) είναι το flagship του Geekvape: dual 18650 batteries (δεν περιλαμβάνονται), 200W ισχύς, IP68 αδιάβροχο, ανθεκτικό σε πτώσεις, με 1.08\" TFT οθόνη και AS Chipset 3.0. Premium κατασκευή με γνήσιο δέρμα.",
    specs: [
      { label: "Ισχύς", value: "Έως 200W" },
      { label: "Μπαταρίες", value: "2x 18650 (δεν περιλαμβάνονται)" },
      { label: "Πιστοποίηση", value: "IP68" },
      { label: "Οθόνη", value: "1.08\" TFT" },
    ],
    features: ["IP68 αδιάβροχο", "Shock-resistant", "AS Chip 3.0"],
    metaDescription: "Geekvape Aegis Legend 3 L200 — flagship dual battery mod 200W με IP68.",
  },
  {
    slug: "vaporesso-gen-200",
    name: "Vaporesso GEN 200",
    brand: "Vaporesso",
    category: "atmistikes",
    price: 69.5,
    shortDescription: "200W AXON chip, ergonomic design, dual 18650.",
    description:
      "Το GEN 200 είναι η εξέλιξη του εμβληματικού GEN της Vaporesso. Με το νέο AXON chip προσφέρει pulse mode, smart mode, και μέγιστη ισχύ 200W. Ζυγίζει μόλις 113g χάρη στην κατασκευή από PA66+CF.",
    specs: [
      { label: "Ισχύς", value: "Έως 200W" },
      { label: "Μπαταρίες", value: "2x 18650" },
      { label: "Chip", value: "AXON" },
      { label: "Βάρος", value: "113g" },
    ],
    features: ["Pulse mode", "Smart mode", "Ελαφρύ design"],
    metaDescription: "Vaporesso GEN 200 — 200W mod με AXON chip και pulse mode.",
  },
  {
    slug: "voopoo-drag-x2",
    name: "Voopoo Drag X2",
    brand: "Voopoo",
    category: "atmistikes",
    price: 49.9,
    shortDescription: "Single 18650, 80W, GENE.TT chip.",
    description:
      "Το Drag X2 είναι η συνέχεια της επιτυχημένης σειράς Drag. Single 18650, μέγιστα 80W, με το νέο GENE.TT chip που υποστηρίζει SMART και RBA modes. Ιδανικό για ενδιάμεσους χρήστες που θέλουν portable αλλά ισχυρό setup.",
    specs: [
      { label: "Ισχύς", value: "Έως 80W" },
      { label: "Μπαταρία", value: "1x 18650" },
      { label: "Chip", value: "GENE.TT" },
      { label: "Modes", value: "SMART, RBA, TC" },
    ],
    features: ["Single battery portability", "GENE.TT chip", "Premium feel"],
    metaDescription: "Voopoo Drag X2 — single battery mod 80W με GENE.TT chip.",
  },
  {
    slug: "smok-rpm-100",
    name: "Smok RPM 100",
    brand: "Smok",
    category: "atmistikes",
    price: 54.0,
    shortDescription: "100W pod mod, IPX67, dual mode pod/tank.",
    description:
      "Το RPM 100 συνδυάζει pod-mod ευελιξία με ισχυρά specs: 100W, IPX67 αδιάβροχο, και δυνατότητα χρήσης τόσο RPM pods όσο και 510 tanks. Single 18650 battery (δεν περιλαμβάνεται).",
    specs: [
      { label: "Ισχύς", value: "Έως 100W" },
      { label: "Μπαταρία", value: "1x 18650" },
      { label: "Πιστοποίηση", value: "IPX67" },
      { label: "Συμβατότητα", value: "RPM pods + 510 tanks" },
    ],
    features: ["Pod + tank versatility", "Waterproof", "100W"],
    metaDescription: "Smok RPM 100 — versatile pod mod 100W με IPX67.",
  },
  {
    slug: "lost-vape-thelema-quest",
    name: "Lost Vape Thelema Quest 200W",
    brand: "Lost Vape",
    category: "atmistikes",
    price: 89.0,
    shortDescription: "200W, Quest chip, premium leather panels.",
    description:
      "Το Thelema Quest είναι το πιο εκλεπτυσμένο mod της Lost Vape. Με το νέο Quest chipset, αυτονομία 200W από dual 18650, και επιλογές με panels από γνήσιο δέρμα ή carbon fiber. High-end κατασκευή με εξαιρετική ταχύτητα απόκρισης (0.001s).",
    specs: [
      { label: "Ισχύς", value: "Έως 200W" },
      { label: "Μπαταρίες", value: "2x 18650" },
      { label: "Chip", value: "Quest" },
      { label: "Response time", value: "0.001s" },
    ],
    features: ["Genuine leather options", "Ultra-fast response", "Premium build"],
    metaDescription: "Lost Vape Thelema Quest 200W — premium dual battery mod με leather panels.",
  },
  {
    slug: "geekvape-z-max",
    name: "Geekvape Z Max Sub-Ohm Tank",
    brand: "Geekvape",
    category: "atmistikes",
    price: 32.0,
    shortDescription: "4ml sub-ohm tank, mesh coils, top airflow.",
    description:
      "Το Z Max είναι ένα δοκιμασμένο sub-ohm tank χωρητικότητας 4ml (ή 2ml με TPD pyrex), με top airflow για μηδενικές διαρροές και mesh coils Z-series για άριστη γεύση. Συμβατό με όλα τα box mods 510.",
    specs: [
      { label: "Χωρητικότητα", value: "4ml (2ml TPD)" },
      { label: "Coils", value: "Z-series mesh" },
      { label: "Airflow", value: "Top airflow" },
      { label: "Σύνδεση", value: "510" },
    ],
    features: ["Leak-proof top airflow", "Mesh coils", "Easy top-fill"],
    metaDescription: "Geekvape Z Max — 4ml sub-ohm tank με Z-series mesh coils.",
  },

  // ΝΑΡΓΙΛΕΔΕΣ
  {
    slug: "khalil-mamoon-classic",
    name: "Khalil Mamoon Classic Egyptian 76cm",
    brand: "Khalil Mamoon",
    category: "narghiledes",
    price: 89.0,
    shortDescription: "Παραδοσιακός χειροποίητος ναργιλές από Αίγυπτο.",
    description:
      "Ο Khalil Mamoon είναι συνώνυμο με τον αυθεντικό αιγυπτιακό ναργιλέ. Χειροποίητος, με ορειχάλκινο stem και βάση από soda-lime γυαλί. 76cm ύψος, ιδανικός για 1-3 χρήστες. Συμπεριλαμβάνεται σωλήνας, λαβίδα και πλάκα.",
    specs: [
      { label: "Ύψος", value: "76cm" },
      { label: "Υλικό stem", value: "Ορείχαλκος" },
      { label: "Βάση", value: "Γυαλί soda-lime" },
      { label: "Προέλευση", value: "Αίγυπτος, χειροποίητος" },
    ],
    features: ["Αυθεντικός Egyptian", "Χειροποίητος", "Σετ πλήρες"],
    metaDescription: "Khalil Mamoon Classic 76cm — αυθεντικός αιγυπτιακός ναργιλές χειροποίητος.",
  },
  {
    slug: "steamulation-pro-x-mini",
    name: "Steamulation Pro X Mini",
    brand: "Steamulation",
    category: "narghiledes",
    price: 320.0,
    shortDescription: "German engineering, ανοξείδωτος χάλυβας, click system.",
    description:
      "Η Steamulation είναι ο γερμανικός premium κατασκευαστής που επανακαθόρισε τον σύγχρονο ναργιλέ. Το Pro X Mini είναι 49cm, ανοξείδωτος χάλυβας 316L, με patented click connector για άμεση συναρμολόγηση χωρίς εξάρτημα στεγανοποίησης.",
    specs: [
      { label: "Ύψος", value: "49cm" },
      { label: "Υλικό", value: "Stainless steel 316L" },
      { label: "Σύστημα", value: "Click connector" },
      { label: "Origin", value: "Germany" },
    ],
    features: ["German engineering", "Click system", "Premium materials"],
    metaDescription: "Steamulation Pro X Mini — premium γερμανικός ναργιλές 49cm με click system.",
  },
  {
    slug: "starbuzz-blue-mist-250g",
    name: "Starbuzz Blue Mist 250g",
    brand: "Starbuzz",
    category: "narghiledes",
    price: 24.5,
    shortDescription: "Mixed berries με νότες μέντας. American classic.",
    description:
      "Το Blue Mist της Starbuzz είναι ένα από τα πιο αναγνωρίσιμα προφίλ καπνού ναργιλέ παγκοσμίως. Συνδυάζει mixed berries με δροσερές νότες μέντας. Συσκευασία 250g σε αεροστεγές βαζάκι.",
    specs: [
      { label: "Βάρος", value: "250g" },
      { label: "Νικοτίνη", value: "0.05%" },
      { label: "Origin", value: "USA" },
      { label: "Συσκευασία", value: "Αεροστεγές βαζάκι" },
    ],
    features: ["Classic flavor profile", "Long-lasting", "Premium tobacco"],
    metaDescription: "Starbuzz Blue Mist 250g — κλασικός αμερικάνικος καπνός ναργιλέ με berries και μέντα.",
  },
  {
    slug: "al-fakher-double-apple-1kg",
    name: "Al Fakher Double Apple 1kg",
    brand: "Al Fakher",
    category: "narghiledes",
    price: 39.9,
    shortDescription: "Διπλό μήλο με γλυκόριζα. Ο πιο κλασικός καπνός shisha.",
    description:
      "Το Double Apple της Al Fakher είναι ο πιο κλασικός καπνός shisha στον κόσμο — συνδυασμός κόκκινου και πράσινου μήλου με ίχνη γλυκόριζας. 1kg συσκευασία για επαγγελματική χρήση ή για όσους κάνουν συχνά συνόδους.",
    specs: [
      { label: "Βάρος", value: "1kg" },
      { label: "Νικοτίνη", value: "0.05%" },
      { label: "Origin", value: "UAE" },
      { label: "Cut", value: "Medium" },
    ],
    features: ["World's most popular", "Authentic Al Fakher", "Bulk size"],
    metaDescription: "Al Fakher Double Apple 1kg — ο πιο γνωστός καπνός shisha παγκοσμίως.",
  },
  {
    slug: "cocobrico-coconut-coals-1kg",
    name: "CocoBrico Κάρβουνα Καρύδας 1kg",
    brand: "CocoBrico",
    category: "narghiledes",
    price: 9.9,
    shortDescription: "Premium coconut coals, καθαρά, διάρκεια 60-90 λεπτά.",
    description:
      "Τα CocoBrico είναι από τα κορυφαία κάρβουνα καρύδας στην ευρωπαϊκή αγορά. 1kg συσκευασία με κύβους 26x26mm, καίγονται καθαρά χωρίς οσμές, παράγουν λιγότερη τέφρα και διαρκούν 60-90 λεπτά ανά κύβο.",
    specs: [
      { label: "Βάρος", value: "1kg" },
      { label: "Μέγεθος κύβου", value: "26x26mm" },
      { label: "Διάρκεια καύσης", value: "60-90 λεπτά" },
      { label: "Σύσταση", value: "100% κέλυφος καρύδας" },
    ],
    features: ["100% natural", "Low ash", "Καθαρή καύση"],
    metaDescription: "CocoBrico Κάρβουνα Καρύδας 1kg — premium coconut coals για ναργιλέ.",
  },
  {
    slug: "kaloud-lotus-1-plus",
    name: "Kaloud Lotus 1+",
    brand: "Kaloud",
    category: "narghiledes",
    price: 49.0,
    shortDescription: "Heat management device — καλύτερη γεύση, λιγότερο κάρβουνο.",
    description:
      "Το Kaloud Lotus 1+ είναι το πιο γνωστό heat management device (HMD). Αντικαθιστά το αλουμινόχαρτο, διανέμει ομοιόμορφα τη θερμότητα και επιτρέπει στον καπνό να αναπτύξει πλήρως τη γεύση του χωρίς να καεί. Anodized aluminum κατασκευή.",
    specs: [
      { label: "Υλικό", value: "Anodized aluminum" },
      { label: "Συμβατότητα", value: "Phunnel & vortex bowls" },
      { label: "Διάμετρος", value: "≈80mm" },
    ],
    features: ["Καλύτερη γεύση", "Λιγότερο κάρβουνο", "Επαναχρησιμοποιήσιμο"],
    metaDescription: "Kaloud Lotus 1+ — premium heat management device για ναργιλέ.",
  },

  // ΑΞΕΣΟΥΑΡ
  {
    slug: "molicel-p26a-18650",
    name: "Molicel P26A 18650 — 2600mAh 35A",
    brand: "Molicel",
    category: "aksesouar",
    price: 8.9,
    shortDescription: "Αυθεντική Molicel 2600mAh, 35A continuous.",
    description:
      "Η Molicel P26A είναι μία από τις πιο αξιόπιστες μπαταρίες 18650 για vape mods. 2600mAh χωρητικότητα, 35A continuous discharge, ιδανική για single ή dual battery mods έως 200W. Αυθεντική με Molicel hologram.",
    specs: [
      { label: "Τύπος", value: "18650" },
      { label: "Χωρητικότητα", value: "2600mAh" },
      { label: "Discharge", value: "35A continuous" },
      { label: "Origin", value: "Taiwan" },
    ],
    features: ["Authentic Molicel", "Hologram protection", "High discharge"],
    metaDescription: "Molicel P26A 18650 — αυθεντική μπαταρία 2600mAh 35A για vape mods.",
  },
  {
    slug: "nitecore-i2-charger",
    name: "Nitecore Intellicharger i2",
    brand: "Nitecore",
    category: "aksesouar",
    price: 22.0,
    shortDescription: "Intelligent dual charger για 18650/21700.",
    description:
      "Ο Nitecore i2 είναι ένας από τους πιο αξιόπιστους chargers για vapers. Φορτίζει αυτόματα δύο μπαταρίες ταυτόχρονα με 500mA ανά slot, με πλήρεις προστασίες (υπερφόρτιση, υπερθέρμανση, βραχυκύκλωμα). Συμβατός με Li-ion, NiMH, NiCd.",
    specs: [
      { label: "Slots", value: "2" },
      { label: "Φόρτιση", value: "500mA/slot" },
      { label: "Συμβατότητα", value: "Li-ion, NiMH, NiCd" },
      { label: "Προστασίες", value: "Πλήρεις" },
    ],
    features: ["Auto-detect chemistry", "Multiple protections", "LED indicators"],
    metaDescription: "Nitecore i2 charger — intelligent dual charger για 18650 μπαταρίες vape.",
  },
  {
    slug: "vaporesso-gtx-mesh-coils",
    name: "Vaporesso GTX Mesh Coils 0.3Ω (5τμχ)",
    brand: "Vaporesso",
    category: "aksesouar",
    price: 12.5,
    shortDescription: "Πακέτο 5 αυθεντικών GTX mesh coils 0.3Ω.",
    description:
      "Πακέτο 5 αυθεντικών GTX mesh coils 0.3Ω, συμβατές με όλα τα GTX tanks και pods της Vaporesso (XROS, Target PM80, GTX 22 κλπ). Mesh design για άριστη απόδοση γεύσης. Power range 32-45W.",
    specs: [
      { label: "Αντίσταση", value: "0.3Ω" },
      { label: "Τύπος", value: "Mesh" },
      { label: "Συσκευασία", value: "5 τεμάχια" },
      { label: "Συμβατότητα", value: "GTX series" },
    ],
    features: ["Authentic Vaporesso", "Mesh design", "32-45W range"],
    metaDescription: "Vaporesso GTX Mesh Coils 0.3Ω — πακέτο 5 αυθεντικών αντιστάσεων.",
  },
  {
    slug: "geekvape-z-coils",
    name: "Geekvape Z-Series Coils (5τμχ)",
    brand: "Geekvape",
    category: "aksesouar",
    price: 13.0,
    shortDescription: "Πακέτο 5 Z-series mesh coils για Zeus tanks.",
    description:
      "Πακέτο 5 αυθεντικών Z-series mesh coils. Συμβατές με όλα τα Zeus sub-ohm tanks (Zeus, Zeus X Mesh, Z Max). Διαθέσιμες σε 0.15Ω, 0.2Ω και 0.4Ω. Premium mesh κατασκευή για διάρκεια και γεύση.",
    specs: [
      { label: "Τύπος", value: "Mesh" },
      { label: "Επιλογές", value: "0.15Ω / 0.2Ω / 0.4Ω" },
      { label: "Συσκευασία", value: "5 τεμάχια" },
      { label: "Συμβατότητα", value: "Zeus series" },
    ],
    features: ["Authentic Geekvape", "Long lifespan", "Pure flavor"],
    metaDescription: "Geekvape Z-Series Coils — πακέτο 5 αυθεντικών mesh αντιστάσεων.",
  },
  {
    slug: "cotton-bacon-prime",
    name: "Cotton Bacon Prime Vape Cotton",
    brand: "Wick 'n' Vape",
    category: "aksesouar",
    price: 4.9,
    shortDescription: "Premium οργανικό βαμβάκι για RDA/RTA.",
    description:
      "Το Cotton Bacon Prime είναι από τα πιο γνωστά premium vape cottons. 100% οργανικό βαμβάκι, χωρίς λευκαντικά, με ιδανική απορρόφηση υγρού και ουδέτερη γεύση. Συσκευασία 10 strips.",
    specs: [
      { label: "Υλικό", value: "100% organic cotton" },
      { label: "Συσκευασία", value: "10 strips" },
      { label: "Επεξεργασία", value: "Χωρίς λευκαντικά" },
      { label: "Origin", value: "USA" },
    ],
    features: ["Organic cotton", "No bleach", "Tasteless"],
    metaDescription: "Cotton Bacon Prime — premium οργανικό βαμβάκι για ξανατυλιγμένες αντιστάσεις.",
  },
  {
    slug: "delrin-drip-tip-810",
    name: "Delrin Drip Tip 810 — Black",
    brand: "Generic",
    category: "aksesouar",
    price: 3.5,
    shortDescription: "Wide bore drip tip 810, υλικό Delrin (heat-resistant).",
    description:
      "Universal 810 drip tip από Delrin (POM), heat-resistant υλικό που δεν θερμαίνεται. Wide bore για περισσότερο ατμό σε sub-ohm tanks και RDAs. Μαύρο ματ φινίρισμα.",
    specs: [
      { label: "Σύνδεση", value: "810" },
      { label: "Υλικό", value: "Delrin (POM)" },
      { label: "Τύπος", value: "Wide bore" },
      { label: "Χρώμα", value: "Black matte" },
    ],
    features: ["Heat-resistant", "Wide bore", "Universal 810"],
    metaDescription: "Delrin Drip Tip 810 Black — wide bore drip tip για sub-ohm tanks και RDAs.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCategory = (categorySlug: string) =>
  products.filter((p) => p.category === categorySlug);
