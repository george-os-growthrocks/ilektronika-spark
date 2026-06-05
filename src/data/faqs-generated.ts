import {
  categoryBySlug,
  productsInCategory,
  brandsInProducts,
  type Product,
  type Category,
} from "./catalog";
import { categoryMeta } from "./category-meta";

export interface FAQItem {
  q: string;
  a: string;
}

/** Generic FAQs that apply to every category - affiliate / shipping / safety. */
const GENERIC_FAQS: FAQItem[] = [
  {
    q: "Πώς αγοράζω από το ilektronikatsigara.gr;",
    a: "Το ilektronikatsigara.gr είναι ένας ελληνικός catalog. Όλες οι αγορές διεκπεραιώνονται από τον συνεργάτη μας vapeandmore.gr (Ρέθυμνο). Κάθε προϊόν διαθέτει κουμπί «Αγορά τώρα» που σας μεταφέρει απευθείας στο αντίστοιχο προϊόν με ασφαλή checkout, αυθεντικά είδη και πανελλαδική αποστολή.",
  },
  {
    q: "Πόσο γρήγορα γίνεται η αποστολή;",
    a: "Παράδοση σε 1-3 εργάσιμες σε όλη την Ελλάδα μέσω courier. Για παραγγελίες πριν τις 14:00 αποστολή την ίδια ημέρα. Δωρεάν μεταφορικά για παραγγελίες άνω των 30€ από vapeandmore.gr.",
  },
  {
    q: "Είναι αυθεντικά τα προϊόντα;",
    a: "Ναι. Όλα τα προϊόντα προέρχονται από επίσημους διανομείς και κατασκευαστές, με κωδικό αυθεντικότητας scratch QR όπου παρέχεται. Εγγυώμαστε 100% αυθεντικά είδη - όχι clones, όχι παράλληλες εισαγωγές αμφιβόλου προέλευσης.",
  },
  {
    q: "Επιτρέπεται η αγορά σε ανηλίκους;",
    a: "Όχι. Σύμφωνα με τον Ν. 4633/2019, η πώληση προϊόντων νικοτίνης απαγορεύεται αυστηρά σε άτομα κάτω των 18 ετών. Κατά την παράδοση ενδέχεται να ζητηθεί έλεγχος ταυτότητας.",
  },
];

/** Build category-specific FAQs from the catalog data. */
function buildCategoryFaqs(category: Category, products: Product[]): FAQItem[] {
  const meta = categoryMeta(category.slug);
  const brandList = brandsInProducts(products).slice(0, 5);
  const brandNames = brandList.map((b) => b.label).join(", ");
  const inStock = products.filter((p) => p.inStock).length;
  const prices = products
    .map((p) => p.salePrice ?? p.price)
    .filter((x): x is number => x != null && x > 0);
  const minPrice = prices.length ? Math.min(...prices) : null;
  const maxPrice = prices.length ? Math.max(...prices) : null;
  const label = category.label;
  const labelLower = label.toLowerCase();

  const items: FAQItem[] = [];

  items.push({
    q: `Πόσα προϊόντα ${labelLower} διαθέτετε;`,
    a: `Στην κατηγορία «${label}» θα βρείτε ${products.length} προϊόντα - από αυτά, ${inStock} είναι άμεσα διαθέσιμα. Ο catalog ανανεώνεται καθημερινά με νέες κυκλοφορίες και προσφορές.`,
  });

  if (brandNames) {
    items.push({
      q: `Ποιες μάρκες ${labelLower} έχετε;`,
      a: `Συνεργαζόμαστε με τα κορυφαία brands της κατηγορίας ${label}: ${brandNames}${brandList.length > 5 ? " και πολλά άλλα" : ""}. Όλες οι μάρκες είναι επίσημα εισαγόμενες με πλήρη εγγύηση κατασκευαστή.`,
    });
  }

  if (minPrice != null && maxPrice != null && minPrice !== maxPrice) {
    items.push({
      q: `Σε ποιο εύρος τιμών κινούνται τα ${labelLower};`,
      a: `Οι τιμές στην κατηγορία ${label} ξεκινούν από ${minPrice.toFixed(2).replace(".", ",")}€ έως ${maxPrice.toFixed(2).replace(".", ",")}€, ανάλογα με το brand, την παραλλαγή και τα χαρακτηριστικά. Δωρεάν αποστολή για αγορές άνω των 30€.`,
    });
  }

  // Category-cluster specific Q
  const slug = category.slug;
  if (slug.includes("ygra")) {
    items.push({
      q: "Πώς επιλέγω τη σωστή νικοτίνη στα υγρά;",
      a: "Βαρείς καπνιστές (>20 τσιγάρα/ημέρα): 18-20mg/ml. Μέτριοι (10-20): 10-12mg/ml. Ελαφρείς ή όσοι κόβουν: 3-6mg/ml. Για pod systems προτιμήστε nicotine salts σε 10-20mg για ομαλότερη αίσθηση και ταχύτερη απορρόφηση.",
    });
    items.push({
      q: "Τι διαφορά έχουν τα shortfills από τα έτοιμα υγρά;",
      a: "Τα shortfills είναι μπουκάλια μεγαλύτερου όγκου (50-100ml) χωρίς νικοτίνη, με χώρο για να προσθέσετε νικοτινική βάση (nic shot) μόνοι σας. Οικονομικότερη λύση για όσους ατμίζουν πολύ.",
    });
  } else if (slug.includes("disposable")) {
    items.push({
      q: "Πόσο διαρκεί ένα disposable vape;",
      a: "Ένα disposable των 600 puffs αντιστοιχεί σε ~1-2 πακέτα τσιγάρων. Τα μοντέλα 2000+ puffs μπορούν να διαρκέσουν μέχρι μία εβδομάδα σε μέτριο χρήστη. Νέα μοντέλα 10.000 puffs υπάρχουν με επαναφορτιζόμενη μπαταρία.",
    });
    items.push({
      q: "Είναι νόμιμα τα disposables στην Ελλάδα;",
      a: "Ναι, όσα είναι TPD-compliant (ΕΕ-εγκεκριμένα) με μέγιστη χωρητικότητα 2ml και νικοτίνη έως 20mg/ml. Όλα τα disposables που διαθέτουμε πληρούν τις προδιαγραφές.",
    });
  } else if (slug.includes("antistasei") || slug.includes("coil")) {
    items.push({
      q: "Πόσο διαρκεί μια αντίσταση (coil);",
      a: "Μια προκατασκευασμένη αντίσταση διαρκεί 1-3 εβδομάδες ανάλογα με τη χρήση και το είδος υγρού (γλυκά υγρά τη φθείρουν γρηγορότερα). Σημάδια για αλλαγή: καμένη γεύση, μειωμένη παραγωγή ατμού, διαρροή.",
    });
  } else if (slug.includes("syskey") || slug.includes("atmopo")) {
    items.push({
      q: "Pod system ή box mod για αρχάριους;",
      a: "Για αρχάριους συνιστούμε pod system (Vaporesso XROS 4, Uwell Caliburn G3, Voopoo Drag X2 PnP) - εύκολο στη χρήση, καλή γεύση, μεγάλη αυτονομία. Τα box mods είναι για όσους θέλουν πειραματισμό με ισχύ και sub-ohm setups.",
    });
  } else if (slug.includes("nargil")) {
    items.push({
      q: "Πώς καθαρίζω σωστά τον ναργιλέ μου;",
      a: "Μετά από κάθε σύνοδο αδειάστε τη βάση και ξεπλύνετε με ζεστό νερό. Κάθε 7-10 ημέρες βαθύς καθαρισμός με 50/50 ζεστό νερό + λευκό ξύδι + 2 κουταλιές μαγειρική σόδα. Χρησιμοποιείτε εύκαμπτη βούρτσα για stem και βάση.",
    });
  } else if (slug.includes("snus")) {
    items.push({
      q: "Τι είναι το snus / nicotine pouch;",
      a: "Πρόκειται για μικρά σακουλάκια με νικοτίνη που τοποθετούνται κάτω από το άνω χείλος. Δεν περιέχουν καπνό (στα σύγχρονα nicotine pouches), δεν παράγουν ατμό ή οσμή, και προσφέρουν διακριτική νικοτινική αίσθηση 30-60 λεπτά.",
    });
  }

  // Always add the meta-tagline as a "what is..." Q if intro exists
  if (meta.intro) {
    items.push({
      q: `Τι είναι η κατηγορία ${label};`,
      a: meta.intro,
    });
  }

  return items;
}

/** Public API: get the FAQ set for a category slug. */
export function faqsForCategory(slug: string): FAQItem[] {
  const cat = categoryBySlug(slug);
  if (!cat) return GENERIC_FAQS;
  const products = productsInCategory(slug);
  return [...buildCategoryFaqs(cat, products), ...GENERIC_FAQS];
}

/** Public API: get FAQs for a single product (derived from its attributes + category FAQs). */
export function faqsForProduct(product: Product): FAQItem[] {
  const items: FAQItem[] = [];

  items.push({
    q: `Είναι αυθεντικό το ${product.name};`,
    a: `Ναι. Το ${product.name} προέρχεται απευθείας από τον επίσημο διανομέα ${product.brand ?? "του κατασκευαστή"} με πλήρη εγγύηση. Ελέγξτε τον κωδικό αυθεντικότητας (scratch QR) στην επίσημη σελίδα του κατασκευαστή.`,
  });

  items.push({
    q: `Πόσο γρήγορα μπορώ να παραλάβω το ${product.name};`,
    a: `Παράδοση 1-3 εργάσιμες σε όλη την Ελλάδα μέσω vapeandmore.gr. ${product.inStock ? "Το προϊόν είναι άμεσα διαθέσιμο." : "Αυτή τη στιγμή είναι σε αναμονή - επικοινωνήστε με το κατάστημα για ETA."}`,
  });

  if (product.attributes.length > 0) {
    const attrLines = product.attributes
      .map((a) => `${a.name}: ${a.values.slice(0, 6).join(", ")}`)
      .join(" · ");
    items.push({
      q: `Ποιες παραλλαγές διατίθενται;`,
      a: `Διαθέσιμες παραλλαγές: ${attrLines}. Η επιλογή γίνεται στο κατάστημα κατά την παραγγελία.`,
    });
  }

  if (product.brand) {
    items.push({
      q: `Έχετε και άλλα προϊόντα ${product.brand};`,
      a: `Ναι, δείτε όλη τη συλλογή ${product.brand} στη σελίδα του brand. Συνεργαζόμαστε επίσημα με τη μάρκα και διαθέτουμε όλη τη γκάμα.`,
    });
  }

  // Pull 2 relevant general FAQs based on category
  if (product.primaryTopSlug) {
    const catFaqs = faqsForCategory(product.primaryTopSlug);
    // Take 2 that aren't about counts
    const extras = catFaqs
      .filter((f) => !f.q.includes("Πόσα") && !f.q.includes("Σε ποιο εύρος"))
      .slice(0, 2);
    items.push(...extras);
  } else {
    items.push(...GENERIC_FAQS.slice(0, 2));
  }

  return items;
}

/** Build a longer category description (for category page hero / SEO). */
export function categoryDescription(slug: string): string {
  const cat = categoryBySlug(slug);
  if (!cat) return "";
  const meta = categoryMeta(slug);
  const products = productsInCategory(slug);
  const inStock = products.filter((p) => p.inStock).length;
  const brandList = brandsInProducts(products).slice(0, 4);
  const brandStr = brandList.length
    ? ` Συνεργαζόμαστε με κορυφαία brands όπως ${brandList.map((b) => b.label).join(", ")}.`
    : "";
  const base =
    meta.intro ??
    `Πλήρης συλλογή ${cat.label.toLowerCase()} στο ilektronikatsigara.gr - αυθεντικά προϊόντα, ανταγωνιστικές τιμές και πανελλαδική αποστολή μέσω vapeandmore.gr.`;
  return `${base} Διαθέτουμε ${products.length} προϊόντα${inStock < products.length ? ` (${inStock} άμεσα διαθέσιμα)` : ""}.${brandStr}`;
}
