import { ASKING_PRICE_EUR, CONTACT_EMAIL, DOMAIN } from "@/config/site";
import {
  BACKLINKS,
  BRANDED_VOLUME,
  CLUSTERS,
  COMPETITOR_DR,
  HEAD_KD,
  HEAD_TERM,
  HEAD_VOLUME,
  NON_BRAND_VOLUME,
  REFERRING_DOMAINS,
  TRAFFIC_VALUE_USD,
  type ClusterId,
} from "@/content/facts";
import type { Locale } from "@/content/locale";
import { formatEur, formatInt, formatUsd } from "@/lib/format";

export type Copy = ReturnType<typeof getCopy>;

export function getCopy(locale: Locale) {
  const el = locale === "el";
  const n = (value: number) => formatInt(locale, value);
  const price = formatEur(locale, ASKING_PRICE_EUR);
  const usd = formatUsd(locale, TRAFFIC_VALUE_USD, true);
  const head = `«${HEAD_TERM}»`;

  const clusterLabels: Record<ClusterId, string> = el
    ? {
        heated: "Θερμαινόμενος καπνός",
        generic: "Γενικοί όροι e-cig / vape",
        devices: "Μάρκες συσκευών",
        pouches: "Nicotine pouches",
      }
    : {
        heated: "Heated tobacco",
        generic: "Generic e-cig / vape",
        devices: "Device brands",
        pouches: "Nicotine pouches",
      };

  const inShort = el
    ? `Ναι. Το ${DOMAIN} πωλείται στα ${price}. Η αγορά περιλαμβάνει το domain και ένα έτοιμο προς εκκίνηση e-shop σε Next.js, με προσαρμοσμένο SEO και πληρωμές ήδη ρυθμισμένες. Υπάρχει και επιλογή μίσθωσης ή μίσθωσης με εξαγορά. Η μεταβίβαση .gr απαιτεί αγοραστή με έδρα στην ΕΕ.`
    : `Yes. ${DOMAIN} is for sale at ${price}. The purchase includes the domain and a ready-to-launch Next.js e-shop with a custom SEO setup and payments already configured. Lease and lease-to-own are also available. A .gr transfer requires an EU-based buyer.`;

  const faq = [
    {
      q: el
        ? `Πωλείται το ${DOMAIN} και πόσο κοστίζει;`
        : `Is ${DOMAIN} for sale, and what is the price?`,
      a: inShort,
    },
    {
      q: el ? "Γιατί μετράει το exact match;" : "Why does the exact match matter?",
      a: el
        ? `Το ${head} έχει περίπου ${n(HEAD_VOLUME)} αναζητήσεις τον μήνα στην Ελλάδα και keyword difficulty ${HEAD_KD}. Το domain ταιριάζει ακριβώς σε αυτόν τον όρο. Κοντινές μορφές: «ilektroniko tsigaro» με ${n(450)} και «ηλεκτρονικά τσιγάρα» με ${n(800)} αναζητήσεις τον μήνα.`
        : `${head} has about ${n(HEAD_VOLUME)} monthly searches in Greece and keyword difficulty ${HEAD_KD}. The domain matches that query exactly. Nearby forms: “ilektroniko tsigaro” at ${n(450)} and “ηλεκτρονικά τσιγάρα” at ${n(800)} monthly searches.`,
    },
    {
      q: el
        ? "Γιατί δεν αγοράζεται αυτή η κίνηση με διαφήμιση;"
        : "Why can’t this traffic be bought with ads?",
      a: el
        ? "Η ελληνική νομοθεσία απαγορεύει τη διαφήμιση ηλεκτρονικού τσιγάρου. Η οργανική αναζήτηση είναι το κύριο κανάλι απόκτησης, οπότε αυτή η κίνηση δεν αγοράζεται με paid ads."
        : "Greek law bans paid e-cigarette advertising. Organic search is the main acquisition channel, so this traffic cannot be bought with ads.",
    },
    {
      q: el
        ? `Πώς συγκρίνεται η τιμή των ${price} με την αξία της κίνησης;`
        : `How does ${price} compare with the traffic value?`,
      a: el
        ? `Μια συντηρητική εκτίμηση για οργανική αξία σε θέση top 3 είναι ${usd} τον χρόνο. Η ζητούμενη τιμή των ${price} είναι ένα κλάσμα αυτής της ετήσιας αξίας.`
        : `A conservative estimate of organic value at a top-3 ranking is ${usd} per year. The ${price} asking price is a fraction of that yearly value.`,
    },
    {
      q: el ? "Πώς γίνεται η μεταβίβαση;" : "How does the transfer work?",
      a: el
        ? "Συμφωνείται η τιμή, η πληρωμή μπαίνει σε escrow (για παράδειγμα Escrow.com ή Sedo) και το domain μεταβιβάζεται μέσω του μητρώου .gr αφού ολοκληρωθεί η συναλλαγή."
        : "You agree the price, payment is placed in escrow (for example Escrow.com or Sedo), and the domain is transferred through the .gr registry after the transaction completes.",
    },
    {
      q: el ? "Πόσο διαρκεί μια τυπική μεταβίβαση;" : "How long does a typical transfer take?",
      a: el
        ? "Με escrow, μια τυπική μεταβίβαση κλείνει σε λίγες εργάσιμες ημέρες έως περίπου δύο εβδομάδες. Ο χρόνος εξαρτάται από τον καταχωρητή και την ταυτοποίηση των δύο πλευρών."
        : "With escrow, a typical transfer closes in a few business days to about two weeks. Timing depends on the registrar and on verifying both parties.",
    },
    {
      q: el ? "Μπορώ να το μισθώσω αντί να το αγοράσω;" : "Can I lease it instead of buying it?",
      a: el
        ? `Ναι. Εκτός από την εξαγορά στα ${price}, το domain διατίθεται και με μίσθωση ή μίσθωση με εξαγορά. Οι όροι συμφωνούνται χωριστά.`
        : `Yes. Besides an outright purchase at ${price}, the domain is available on a lease or lease-to-own. Those terms are agreed separately.`,
    },
    {
      q: el ? "Τι άλλο περιλαμβάνει η πώληση;" : "What else is included?",
      a: el
        ? "Έτοιμο προς εκκίνηση e-shop σε Next.js, με προσαρμοσμένο SEO και πληρωμές ήδη ρυθμισμένες, μαζί με το ίδιο το domain."
        : "A ready-to-launch Next.js e-shop, with a custom SEO setup and payments already configured, together with the domain itself.",
    },
    {
      q: el ? "Εγγυάται η αγορά μια θέση στην κορυφή;" : "Does buying it guarantee a top ranking?",
      a: el
        ? `Όχι. Τα στοιχεία δείχνουν ζήτηση, όχι υπόσχεση κατάταξης. Το τρέχον #1 για τον κύριο όρο είναι κατάστημα με DR ${COMPETITOR_DR}, άρα μια υψηλή θέση είναι ρεαλιστικός στόχος.`
        : `No. The figures describe demand, not a ranking promise. The current #1 for the head term is a DR ${COMPETITOR_DR} shop, so a top ranking is a realistic goal.`,
    },
    {
      q: el ? "Ποιος μπορεί να παραλάβει ένα .gr;" : "Who can take a .gr domain?",
      a: el
        ? "Η μεταβίβαση .gr απαιτεί αγοραστή με έδρα στην Ευρωπαϊκή Ένωση."
        : "A .gr transfer requires a buyer based in the European Union.",
    },
    {
      q: el ? "Πώς στέλνω προσφορά;" : "How do I send an offer?",
      a: el
        ? `Μέσω της φόρμας σε αυτή τη σελίδα ή με email στο ${CONTACT_EMAIL}. Η πρώτη επικοινωνία δεν δημιουργεί υποχρέωση αγοράς.`
        : `Use the form on this page or email ${CONTACT_EMAIL}. The first message does not obligate you to buy.`,
    },
  ];

  return {
    meta: {
      title: el ? `Το domain ${DOMAIN} πωλείται — ${price}` : `${DOMAIN} is for sale — ${price}`,
      description: el
        ? `Το ${DOMAIN} πωλείται στα ${price}. Exact match για ${head}: περίπου ${n(HEAD_VOLUME)} αναζητήσεις/μήνα στην Ελλάδα, keyword difficulty ${HEAD_KD}.`
        : `${DOMAIN} is for sale at ${price}. Exact match for ${head}: about ${n(HEAD_VOLUME)} monthly searches in Greece, keyword difficulty ${HEAD_KD}.`,
      ogAlt: el ? `${DOMAIN} πωλείται, ${price}` : `${DOMAIN} is for sale, ${price}`,
    },
    skip: el ? "Μετάβαση στο περιεχόμενο" : "Skip to content",
    langLabel: el ? "Γλώσσα" : "Language",
    nav: {
      why: el ? "Γιατί" : "Why",
      keywords: el ? "Λέξεις" : "Keywords",
      included: el ? "Πακέτο" : "Included",
      faq: el ? "Ερωτήσεις" : "FAQ",
      contact: el ? "Επικοινωνία" : "Contact",
    },
    hero: {
      eyebrow: el ? "Πώληση domain · .gr" : "Domain for sale · .gr",
      titleLead: el ? "Το domain" : "",
      titleTail: el ? "πωλείται" : "is for sale",
      sub: el
        ? `Exact match για το ${head}: περίπου ${n(HEAD_VOLUME)} αναζητήσεις τον μήνα στην Ελλάδα, keyword difficulty ${HEAD_KD}.`
        : `Exact match for ${head}: about ${n(HEAD_VOLUME)} monthly searches in Greece, keyword difficulty ${HEAD_KD}.`,
      answerLabel: el ? "Σύντομη απάντηση" : "In short",
      answer: inShort,
      asking: el ? "Ζητούμενη τιμή" : "Asking price",
      fraction: el
        ? `Ένα κλάσμα της συντηρητικής αξίας top 3 (${usd}/χρόνο).`
        : `A fraction of the conservative top-3 value (${usd}/year).`,
      buy: el ? "Αγορά τώρα" : "Buy now",
      offer: el ? "Κάντε προσφορά" : "Make an offer",
      offerShort: el ? "Προσφορά" : "Offer",
      lease: el ? "Ή μίσθωση / μίσθωση με εξαγορά" : "Or lease / lease-to-own",
      eu: el
        ? "Η μεταβίβαση .gr απαιτεί αγοραστή με έδρα στην ΕΕ."
        : "A .gr transfer requires an EU-based buyer.",
      trust: el
        ? ["Δημοσιευμένη τιμή", "Πληρωμή μέσω escrow", "Χωρίς δέσμευση στην πρώτη επαφή"]
        : ["Published price", "Payment through escrow", "No obligation on the first message"],
    },
    statsTitle: el ? "Τα στοιχεία" : "The figures",
    statsIntro: el
      ? "Μηνιαία αναζήτηση στην Ελλάδα, εκτός αν σημειώνεται διαφορετικά."
      : "Monthly searches in Greece, unless noted otherwise.",
    stats: {
      exact: {
        label: el ? "Exact match τον μήνα" : "Exact-match searches / month",
        note: head,
      },
      kd: {
        label: "Keyword difficulty",
        note: head,
      },
      category: {
        label: el ? "Non-brand κατηγορία / μήνα" : "Non-brand category / month",
        note: el ? "Όροι κατηγορίας, χωρίς brands" : "Category terms, without brands",
      },
      brands: {
        label: el ? "Μαζί με brands / μήνα" : "Including brands / month",
        note: el ? "Ευρύτερη ζήτηση της αγοράς" : "Wider market demand",
      },
      links: {
        label: "Referring domains",
        note: el ? `και ${n(BACKLINKS)}+ backlinks` : `and ${n(BACKLINKS)}+ backlinks`,
      },
      value: {
        label: el ? "Αξία top 3 / χρόνο" : "Top-3 value / year",
        note: el ? "Συντηρητική εκτίμηση" : "Conservative estimate",
      },
    },
    why: {
      title: el ? `Γιατί να αγοράσετε το ${DOMAIN}` : `Why buy ${DOMAIN}`,
      intro: el
        ? "Σύντομο .gr, exact match στον κύριο όρο, και ζήτηση που δεν αγοράζεται με διαφήμιση."
        : "A short .gr, an exact match on the head term, and demand that cannot be bought with ads.",
      points: [
        {
          title: el ? "Exact match με δυσκολία 0" : "Exact match, difficulty 0",
          body: el
            ? `Το ${head} έχει ${n(HEAD_VOLUME)} αναζητήσεις τον μήνα στην Ελλάδα και keyword difficulty ${HEAD_KD}. Οι μορφές «ilektroniko tsigaro» (${n(450)}) και «ηλεκτρονικά τσιγάρα» (${n(800)}) κάθονται δίπλα στον ίδιο όρο.`
            : `${head} has ${n(HEAD_VOLUME)} monthly searches in Greece and keyword difficulty ${HEAD_KD}. The forms “ilektroniko tsigaro” (${n(450)}) and “ηλεκτρονικά τσιγάρα” (${n(800)}) sit beside the same query.`,
        },
        {
          title: el ? "Ζήτηση κατηγορίας, όχι μία λέξη" : "Category demand, not one keyword",
          body: el
            ? `Οι non-brand αναζητήσεις κατηγορίας είναι ${n(NON_BRAND_VOLUME)} τον μήνα. Μαζί με brands, ο ευρύτερος όγκος είναι ${n(BRANDED_VOLUME)}+ τον μήνα.`
            : `Non-brand category searches are ${n(NON_BRAND_VOLUME)} per month. Including brands, the wider volume is ${n(BRANDED_VOLUME)}+ per month.`,
        },
        {
          title: el ? "Η κίνηση δεν αγοράζεται" : "This traffic cannot be bought",
          body: el
            ? `Η ελληνική νομοθεσία απαγορεύει τη διαφήμιση ηλεκτρονικού τσιγάρου, οπότε η οργανική αναζήτηση είναι το κύριο κανάλι απόκτησης. Συντηρητική αξία στο top 3: ${usd} τον χρόνο.`
            : `Greek law bans paid e-cigarette advertising, so organic search is the main acquisition channel. Conservative top-3 value: ${usd} per year.`,
        },
        {
          title: el ? `${price}, ένα κλάσμα του έτους` : `${price}, a fraction of one year`,
          body: el
            ? `Η ζητούμενη τιμή είναι ένα κλάσμα της συντηρητικής ετήσιας αξίας οργανικής επισκεψιμότητας (${usd} για θέση στο top 3).`
            : `The asking price is a fraction of the conservative yearly organic traffic value (${usd} at a top-3 ranking).`,
        },
        {
          title: el
            ? "Σύντομο .gr με υπάρχοντες συνδέσμους"
            : "Short .gr with links already in place",
          body: el
            ? `Περισσότερα από ${n(REFERRING_DOMAINS)} referring domains και ${n(BACKLINKS)} backlinks δείχνουν ήδη προς το όνομα. Είναι σύντομο premium .gr, εύκολο να το θυμάται κανείς, και ταιριάζει σε λιανική ηλεκτρονικού τσιγάρου, θερμαινόμενου καπνού ή νικοτίνης.`
            : `More than ${n(REFERRING_DOMAINS)} referring domains and ${n(BACKLINKS)} backlinks already point at the name. It is a short, memorable premium .gr, and it fits a retailer of e-cigarettes, heated tobacco, or nicotine.`,
        },
        {
          title: el ? "Ρεαλιστική προοπτική κατάταξης" : "A realistic shot at the top",
          body: el
            ? `Το τρέχον #1 για τον κύριο όρο είναι κατάστημα με DR ${COMPETITOR_DR}. Μια θέση στην κορυφή είναι ρεαλιστικός στόχος, όχι εγγύηση.`
            : `The current #1 for the head term is a DR ${COMPETITOR_DR} shop. A top ranking is a realistic goal, not a guarantee.`,
        },
      ],
    },
    clustersTitle: el
      ? `Μέσα στις ${n(BRANDED_VOLUME)}+ (μαζί με brands)`
      : `Inside the ${n(BRANDED_VOLUME)}+ (including brands)`,
    clusterLabels,
    clusters: CLUSTERS,
    keywords: {
      title: el ? "Ευκαιρία λέξεων-κλειδιών" : "Keyword opportunity",
      intro: el
        ? "Μηνιαίος όγκος αναζήτησης στην Ελλάδα για όρους που σχετίζονται με το domain."
        : "Monthly search volume in Greece for queries tied to the domain.",
      keyword: el ? "Λέξη-κλειδί" : "Keyword",
      volume: el ? "Αναζητήσεις / μήνα" : "Searches / month",
      caption: el
        ? "Μηνιαίες αναζητήσεις στην Ελλάδα. Η δυσκολία 0 αφορά μόνο τον κύριο όρο."
        : "Monthly searches in Greece. Difficulty 0 applies only to the head term.",
    },
    included: {
      title: el ? "Τι περιλαμβάνει η πώληση" : "What the sale includes",
      intro: el
        ? "Δεν παραδίδεται μόνο το όνομα. Το πακέτο είναι έτοιμο να ξεκινήσει."
        : "The name is not the whole parcel. The package is ready to launch.",
      items: [
        {
          title: el ? "Το domain" : "The domain",
          body: el
            ? `${DOMAIN}, σύντομο premium .gr και exact match για ${head}.`
            : `${DOMAIN}, a short premium .gr and an exact match for ${head}.`,
        },
        {
          title: el ? "E-shop σε Next.js" : "Next.js e-shop",
          body: el
            ? "Έτοιμο προς εκκίνηση κατάστημα, χτισμένο σε Next.js."
            : "A ready-to-launch store, built on Next.js.",
        },
        {
          title: el ? "Προσαρμοσμένο SEO" : "Custom SEO setup",
          body: el
            ? "Το SEO είναι ήδη στημένο πάνω στο e-shop."
            : "SEO is already set up on the e-shop.",
        },
        {
          title: el ? "Πληρωμές" : "Payments",
          body: el
            ? "Η ενσωμάτωση πληρωμών είναι ήδη ρυθμισμένη."
            : "Payments integration is already configured.",
        },
      ],
    },
    options: {
      title: el ? "Αγορά ή μίσθωση" : "Buy or lease",
      buyTitle: el ? `Εξαγορά στα ${price}` : `Buy outright for ${price}`,
      buyBody: el
        ? "Η ζητούμενη τιμή είναι δημοσιευμένη. Η πληρωμή μπορεί να κλείσει μέσω escrow, για παράδειγμα Escrow.com ή Sedo, και το domain μεταβιβάζεται μετά."
        : "The asking price is published. Payment can close through escrow, for example Escrow.com or Sedo, and the domain transfers after that.",
      leaseTitle: el ? "Μίσθωση ή μίσθωση με εξαγορά" : "Lease or lease-to-own",
      leaseBody: el
        ? "Αν δεν θέλετε εξαγορά άμεσα, στείλτε πρόταση μίσθωσης. Οι όροι συμφωνούνται χωριστά και δεν υπάρχει δημοσιευμένο μίσθωμα."
        : "If you do not want to buy outright yet, send a lease proposal. Terms are agreed separately, and no lease price is published.",
    },
    faq: {
      title: el ? "Συχνές ερωτήσεις" : "Questions, answered",
      items: faq,
    },
    form: {
      title: el ? "Αγορά ή προσφορά" : "Buy or make an offer",
      intro: el
        ? `Στείλτε τα στοιχεία σας. Απαντάμε στο email που θα δηλώσετε, ή γράψτε απευθείας στο ${CONTACT_EMAIL}.`
        : `Send your details. We reply to the email you enter, or write directly to ${CONTACT_EMAIL}.`,
      name: el ? "Ονοματεπώνυμο" : "Name",
      email: "Email",
      company: el ? "Εταιρεία" : "Company",
      optional: el ? "προαιρετικό" : "optional",
      amount: el ? "Ποσό προσφοράς (€)" : "Offer amount (€)",
      deal: el ? "Τύπος συμφωνίας" : "Deal type",
      buy: el ? "Αγορά" : "Buy",
      lease: el ? "Μίσθωση" : "Lease",
      message: el ? "Μήνυμα" : "Message",
      submit: el ? "Αποστολή προσφοράς" : "Send offer",
      submitBuy: el ? `Επιβεβαίωση αγοράς στα ${price}` : `Confirm purchase at ${price}`,
      sending: el ? "Αποστολή…" : "Sending…",
      success: el
        ? "Η προσφορά στάλθηκε. Θα απαντήσουμε στο email σας."
        : "The offer was sent. We will reply to your email.",
      mailto: el
        ? "Αν δεν ανοίξει η εφαρμογή email, χρησιμοποιήστε τον σύνδεσμο ή γράψτε απευθείας."
        : "If your email app does not open, use the link or write directly.",
      openEmail: el ? "Άνοιγμα email" : "Open email",
      invalid: el ? "Ελέγξτε τα πεδία και δοκιμάστε ξανά." : "Check the fields and try again.",
      privacy: el
        ? "Τα στοιχεία χρησιμοποιούνται μόνο για να απαντήσουμε σε αυτή την προσφορά."
        : "These details are used only to reply to this offer.",
      nameRequired: el ? "Συμπληρώστε το όνομά σας." : "Enter your name.",
      emailInvalid: el ? "Συμπληρώστε έγκυρο email." : "Enter a valid email.",
      amountInvalid: el ? "Συμπληρώστε ποσό σε ευρώ." : "Enter an amount in euros.",
      buyBanner: el
        ? `Αίτημα αγοράς στην τιμή των ${price}. Μπορείτε να αλλάξετε το ποσό αν θέλετε να κάνετε διαφορετική προσφορά.`
        : `Purchase request at ${price}. You can change the amount if you want to make a different offer.`,
      leaseHint: el
        ? "Προτεινόμενο ποσό σε ευρώ. Στη σημείωση διευκρινίστε αν είναι μηνιαίο ή συνολικό."
        : "Proposed amount in euros. In the note, say whether it is monthly or total.",
      offerHint: el ? "Το ποσό που προτείνετε, σε ευρώ." : "The amount you propose, in euros.",
      required: el ? "υποχρεωτικό" : "required",
    },
    footer: {
      disclaimer: el
        ? "Αυτή η σελίδα αφορά μόνο την πώληση του domain name. Δεν διαφημίζει και δεν πωλεί προϊόντα νικοτίνης."
        : "This page is only a domain-name sale. It does not advertise or sell nicotine products.",
      rights: `© ${new Date().getFullYear()} ${DOMAIN}`,
    },
  };
}
