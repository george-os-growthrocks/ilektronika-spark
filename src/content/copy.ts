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
        generic: "Γενικοί όροι (ηλεκτρονικό τσιγάρο, άτμισμα)",
        devices: "Μάρκες συσκευών",
        pouches: "Φακελάκια νικοτίνης",
      }
    : {
        heated: "Heated tobacco",
        generic: "Generic e-cig / vape",
        devices: "Device brands",
        pouches: "Nicotine pouches",
      };

  const inShort = el
    ? `Ναι. Το ${DOMAIN} πωλείται στα ${price}. Η αγορά περιλαμβάνει το domain και ένα πλήρες ηλεκτρονικό κατάστημα, έτοιμο να λειτουργήσει, με στημένη βελτιστοποίηση για μηχανές αναζήτησης και ενεργές πληρωμές. Υπάρχει και επιλογή μίσθωσης ή μίσθωσης με εξαγορά. Η μεταβίβαση .gr απαιτεί αγοραστή με έδρα στην ΕΕ.`
    : `Yes. ${DOMAIN} is for sale at ${price}. The purchase includes the domain and a ready-to-launch Next.js e-shop with a custom SEO setup and payments already configured. Lease and lease-to-own are also available. A .gr transfer requires an EU-based buyer.`;

  const faq = [
    {
      q: el
        ? `Πωλείται το ${DOMAIN} και πόσο κοστίζει;`
        : `Is ${DOMAIN} for sale, and what is the price?`,
      a: inShort,
    },
    {
      q: el
        ? "Γιατί έχει αξία η ακριβής αντιστοιχία με την αναζήτηση;"
        : "Why does the exact match matter?",
      a: el
        ? `Το ${head} έχει περίπου ${n(HEAD_VOLUME)} μηνιαίες αναζητήσεις στην Ελλάδα και δείκτη δυσκολίας ${HEAD_KD} στα 100. Το όνομα είναι ακριβώς αυτό που πληκτρολογεί ο χρήστης. Συγγενικές αναζητήσεις: «ilektroniko tsigaro» με ${n(450)} και «ηλεκτρονικά τσιγάρα» με ${n(800)} αναζητήσεις τον μήνα.`
        : `${head} has about ${n(HEAD_VOLUME)} monthly searches in Greece and keyword difficulty ${HEAD_KD}. The domain matches that query exactly. Nearby forms: “ilektroniko tsigaro” at ${n(450)} and “ηλεκτρονικά τσιγάρα” at ${n(800)} monthly searches.`,
    },
    {
      q: el
        ? "Γιατί αυτή η επισκεψιμότητα δεν αγοράζεται με διαφήμιση;"
        : "Why can’t this traffic be bought with ads?",
      a: el
        ? "Η ελληνική νομοθεσία απαγορεύει τη διαφήμιση του ηλεκτρονικού τσιγάρου. Οι πελάτες έρχονται κυρίως από την αναζήτηση στη Google, και αυτή την επισκεψιμότητα δεν μπορεί κανείς να την αγοράσει."
        : "Greek law bans paid e-cigarette advertising. Organic search is the main acquisition channel, so this traffic cannot be bought with ads.",
    },
    {
      q: el
        ? `Πώς συγκρίνεται η τιμή των ${price} με την αξία της κίνησης;`
        : `How does ${price} compare with the traffic value?`,
      a: el
        ? `Με συντηρητική εκτίμηση, η οργανική επισκεψιμότητα από μια θέση στην πρώτη τριάδα αξίζει ${usd} τον χρόνο. Η τιμή των ${price} αντιστοιχεί σε μικρό μέρος αυτής της ετήσιας αξίας.`
        : `A conservative estimate of organic value at a top-3 ranking is ${usd} per year. The ${price} asking price is a fraction of that yearly value.`,
    },
    {
      q: el ? "Πώς γίνεται η μεταβίβαση;" : "How does the transfer work?",
      a: el
        ? "Συμφωνείται η τιμή, το ποσό κατατίθεται σε υπηρεσία μεσεγγύησης (π.χ. Escrow.com ή Sedo) και, με την ολοκλήρωση της συναλλαγής, το όνομα μεταβιβάζεται μέσω του μητρώου .gr."
        : "You agree the price, payment is placed in escrow (for example Escrow.com or Sedo), and the domain is transferred through the .gr registry after the transaction completes.",
    },
    {
      q: el ? "Πόσο διαρκεί μια τυπική μεταβίβαση;" : "How long does a typical transfer take?",
      a: el
        ? "Με μεσεγγύηση, η μεταβίβαση ολοκληρώνεται συνήθως από λίγες εργάσιμες έως περίπου δύο εβδομάδες. Ο χρόνος εξαρτάται από τον καταχωρητή και την ταυτοποίηση των δύο πλευρών."
        : "With escrow, a typical transfer closes in a few business days to about two weeks. Timing depends on the registrar and on verifying both parties.",
    },
    {
      q: el ? "Μπορώ να το μισθώσω αντί να το αγοράσω;" : "Can I lease it instead of buying it?",
      a: el
        ? `Ναι. Εκτός από την εξαγορά στα ${price}, το όνομα διατίθεται και με μίσθωση ή μίσθωση με εξαγορά. Οι όροι συμφωνούνται χωριστά.`
        : `Yes. Besides an outright purchase at ${price}, the domain is available on a lease or lease-to-own. Those terms are agreed separately.`,
    },
    {
      q: el ? "Τι άλλο περιλαμβάνει η πώληση;" : "What else is included?",
      a: el
        ? "Μαζί με το όνομα παραλαμβάνετε πλήρες ηλεκτρονικό κατάστημα, έτοιμο να λειτουργήσει, με στημένη βελτιστοποίηση για τη Google και ενεργές πληρωμές."
        : "A ready-to-launch Next.js e-shop, with a custom SEO setup and payments already configured, together with the domain itself.",
    },
    {
      q: el ? "Εγγυάται η αγορά πρώτη θέση στη Google;" : "Does buying it guarantee a top ranking?",
      a: el
        ? `Όχι. Τα στοιχεία δείχνουν τη ζήτηση, δεν υπόσχονται κατάταξη. Σήμερα πρώτο για τον κύριο όρο είναι κατάστημα με ισχύ τομέα (DR) ${COMPETITOR_DR}, οπότε μια κορυφαία θέση είναι ρεαλιστικός στόχος.`
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
        ? `Μέσω της φόρμας σε αυτή τη σελίδα ή με email στο ${CONTACT_EMAIL}. Η πρώτη επικοινωνία δεν σας δεσμεύει σε τίποτα.`
        : `Use the form on this page or email ${CONTACT_EMAIL}. The first message does not obligate you to buy.`,
    },
  ];

  return {
    meta: {
      title: el ? `Πωλείται το ${DOMAIN} | ${price}` : `${DOMAIN} is for sale — ${price}`,
      description: el
        ? `Πωλείται το ${DOMAIN} στα ${price}: ακριβώς ό,τι αναζητούν ${n(HEAD_VOLUME)} χρήστες τον μήνα στην Ελλάδα για ${head}, με σχεδόν μηδενικό ανταγωνισμό.`
        : `${DOMAIN} is for sale at ${price}. Exact match for ${head}: about ${n(HEAD_VOLUME)} monthly searches in Greece, keyword difficulty ${HEAD_KD}.`,
      ogAlt: el ? `${DOMAIN} πωλείται, ${price}` : `${DOMAIN} is for sale, ${price}`,
    },
    skip: el ? "Μετάβαση στο περιεχόμενο" : "Skip to content",
    langLabel: el ? "Γλώσσα" : "Language",
    nav: {
      why: el ? "Γιατί αξίζει" : "Why",
      keywords: el ? "Αναζητήσεις" : "Keywords",
      included: el ? "Πακέτο" : "Included",
      faq: el ? "Ερωτήσεις" : "FAQ",
      contact: el ? "Επικοινωνία" : "Contact",
    },
    hero: {
      eyebrow: el ? "Όνομα τομέα προς πώληση · .gr" : "Domain for sale · .gr",
      titleLead: el ? "Πωλείται το" : "",
      titleTail: el ? "η πιο καθαρή διεύθυνση της αγοράς" : "is for sale",
      sub: el
        ? `Είναι ακριβώς η λέξη που πληκτρολογούν ${n(HEAD_VOLUME)} άνθρωποι κάθε μήνα στην Ελλάδα, ${head}, με δείκτη δυσκολίας μόλις ${HEAD_KD}/100.`
        : `Exact match for ${head}: about ${n(HEAD_VOLUME)} monthly searches in Greece, keyword difficulty ${HEAD_KD}.`,
      answerLabel: el ? "Με δυο λόγια" : "In short",
      answer: inShort,
      asking: el ? "Ζητούμενη τιμή" : "Asking price",
      fraction: el
        ? `Μικρό μέρος της ετήσιας αξίας μιας θέσης στην πρώτη τριάδα (${usd} τον χρόνο, συντηρητικά).`
        : `A fraction of the conservative top-3 value (${usd}/year).`,
      buy: el ? "Αγορά τώρα" : "Buy now",
      offer: el ? "Κάντε πρόταση" : "Make an offer",
      offerShort: el ? "Προσφορά" : "Offer",
      lease: el ? "Ή μίσθωση, και με δικαίωμα εξαγοράς" : "Or lease / lease-to-own",
      eu: el
        ? "Η μεταβίβαση .gr απαιτεί αγοραστή με έδρα στην ΕΕ."
        : "A .gr transfer requires an EU-based buyer.",
      trust: el
        ? [
            "Σταθερή, δημοσιευμένη τιμή",
            "Ασφαλής πληρωμή με μεσεγγύηση",
            "Καμία δέσμευση στην πρώτη επαφή",
          ]
        : ["Published price", "Payment through escrow", "No obligation on the first message"],
    },
    thanks: {
      title: el ? "Ευχαριστούμε" : "Thank you",
      lead: el
        ? "Η πληρωμή σας καταχωρήθηκε. Δείτε παρακάτω τα επόμενα βήματα της μεταβίβασης."
        : "If checkout completed, the transfer follows the steps below.",
      steps: el
        ? [
            "Ελέγχουμε ότι ο αγοραστής έχει έδρα στην Ευρωπαϊκή Ένωση. Η μεταβίβαση .gr το απαιτεί.",
            "Η μεταβίβαση ξεκινά μέσα σε λίγες εργάσιμες ημέρες.",
          ]
        : [
            "We check that the buyer is based in the European Union. A .gr transfer requires it.",
            "The transfer starts within a few business days.",
          ],
    },
    statsTitle: el ? "Τα νούμερα" : "The figures",
    statsIntro: el
      ? "Μηνιαία αναζήτηση στην Ελλάδα, εκτός αν σημειώνεται διαφορετικά."
      : "Monthly searches in Greece, unless noted otherwise.",
    stats: {
      exact: {
        label: el ? "Ακριβείς αναζητήσεις τον μήνα" : "Exact-match searches / month",
        note: head,
      },
      kd: {
        label: el ? "Δυσκολία κατάταξης (0-100)" : "Keyword difficulty",
        note: head,
      },
      category: {
        label: el ? "Γενικές αναζητήσεις κατηγορίας / μήνα" : "Non-brand category / month",
        note: el ? "Χωρίς ονόματα εταιρειών" : "Category terms, without brands",
      },
      brands: {
        label: el ? "Μαζί με επώνυμες αναζητήσεις / μήνα" : "Including brands / month",
        note: el ? "Ευρύτερη ζήτηση της αγοράς" : "Wider market demand",
      },
      links: {
        label: el ? "Ιστότοποι με συνδέσμους προς το όνομα" : "Referring domains",
        note: el
          ? `και πάνω από ${n(BACKLINKS)} εισερχόμενοι σύνδεσμοι`
          : `and ${n(BACKLINKS)}+ backlinks`,
      },
      value: {
        label: el ? "Αξία θέσης στην πρώτη τριάδα / χρόνο" : "Top-3 value / year",
        note: el ? "Συντηρητική εκτίμηση" : "Conservative estimate",
      },
    },
    why: {
      title: el ? `Γιατί το ${DOMAIN} είναι ευκαιρία` : `Why buy ${DOMAIN}`,
      intro: el
        ? "Σύντομο .gr, ακριβώς η λέξη που ψάχνει ο κόσμος, σε μια αγορά όπου η διαφήμιση απαγορεύεται."
        : "A short .gr, an exact match on the head term, and demand that cannot be bought with ads.",
      points: [
        {
          title: el ? "Η λέξη που ψάχνουν, χωρίς ανταγωνισμό" : "Exact match, difficulty 0",
          body: el
            ? `Το ${head} συγκεντρώνει ${n(HEAD_VOLUME)} αναζητήσεις τον μήνα στην Ελλάδα με δυσκολία κατάταξης ${HEAD_KD}. Οι παραλλαγές «ilektroniko tsigaro» (${n(450)}) και «ηλεκτρονικά τσιγάρα» (${n(800)}) ενισχύουν την ίδια πρόθεση.`
            : `${head} has ${n(HEAD_VOLUME)} monthly searches in Greece and keyword difficulty ${HEAD_KD}. The forms “ilektroniko tsigaro” (${n(450)}) and “ηλεκτρονικά τσιγάρα” (${n(800)}) sit beside the same query.`,
        },
        {
          title: el ? "Ολόκληρη κατηγορία, όχι μία λέξη" : "Category demand, not one keyword",
          body: el
            ? `Οι γενικές αναζητήσεις της κατηγορίας φτάνουν τις ${n(NON_BRAND_VOLUME)} τον μήνα. Μαζί με τις επώνυμες, ξεπερνούν τις ${n(BRANDED_VOLUME)}.`
            : `Non-brand category searches are ${n(NON_BRAND_VOLUME)} per month. Including brands, the wider volume is ${n(BRANDED_VOLUME)}+ per month.`,
        },
        {
          title: el ? "Επισκεψιμότητα που δεν αγοράζεται" : "This traffic cannot be bought",
          body: el
            ? `Η διαφήμιση ηλεκτρονικού τσιγάρου απαγορεύεται στην Ελλάδα, άρα οι πελάτες έρχονται από τη Google. Συντηρητική αξία μιας θέσης στην πρώτη τριάδα: ${usd} τον χρόνο.`
            : `Greek law bans paid e-cigarette advertising, so organic search is the main acquisition channel. Conservative top-3 value: ${usd} per year.`,
        },
        {
          title: el
            ? `${price}: λιγότερο από την αξία ενός έτους`
            : `${price}, a fraction of one year`,
          body: el
            ? `Η τιμή είναι μικρό μέρος της ετήσιας αξίας που αποφέρει η οργανική επισκεψιμότητα (${usd} για θέση στην πρώτη τριάδα).`
            : `The asking price is a fraction of the conservative yearly organic traffic value (${usd} at a top-3 ranking).`,
        },
        {
          title: el ? "Σύντομο .gr με έτοιμο κύρος" : "Short .gr with links already in place",
          body: el
            ? `Ήδη πάνω από ${n(REFERRING_DOMAINS)} ιστότοποι και ${n(BACKLINKS)} σύνδεσμοι δείχνουν προς το όνομα. Σύντομο, εύκολο στη μνήμη, ιδανικό για κατάστημα ηλεκτρονικού τσιγάρου, θερμαινόμενου καπνού ή νικοτίνης.`
            : `More than ${n(REFERRING_DOMAINS)} referring domains and ${n(BACKLINKS)} backlinks already point at the name. It is a short, memorable premium .gr, and it fits a retailer of e-cigarettes, heated tobacco, or nicotine.`,
        },
        {
          title: el ? "Η κορυφή είναι ρεαλιστική" : "A realistic shot at the top",
          body: el
            ? `Πρώτο σήμερα για τον κύριο όρο είναι κατάστημα με ισχύ τομέα ${COMPETITOR_DR}. Η πρώτη θέση είναι ρεαλιστικός στόχος, όχι εγγύηση.`
            : `The current #1 for the head term is a DR ${COMPETITOR_DR} shop. A top ranking is a realistic goal, not a guarantee.`,
        },
      ],
    },
    clustersTitle: el
      ? `Πώς μοιράζονται οι ${n(BRANDED_VOLUME)}+ αναζητήσεις`
      : `Inside the ${n(BRANDED_VOLUME)}+ (including brands)`,
    clusterLabels,
    clusters: CLUSTERS,
    keywords: {
      title: el ? "Τι ψάχνει ο κόσμος" : "Keyword opportunity",
      intro: el
        ? "Μηνιαίες αναζητήσεις στην Ελλάδα για όρους που σχετίζονται άμεσα με το όνομα."
        : "Monthly search volume in Greece for queries tied to the domain.",
      keyword: el ? "Λέξη-κλειδί" : "Keyword",
      volume: el ? "Αναζητήσεις / μήνα" : "Searches / month",
      caption: el
        ? "Μηνιαίες αναζητήσεις στην Ελλάδα. Ο δείκτης δυσκολίας αφορά μόνο τον κύριο όρο."
        : "Monthly searches in Greece. Difficulty 0 applies only to the head term.",
    },
    included: {
      title: el ? "Τι περιλαμβάνει η πώληση" : "What the sale includes",
      intro: el
        ? "Δεν παίρνετε μόνο ένα όνομα. Παίρνετε μια επιχείρηση έτοιμη να ανοίξει."
        : "The name is not the whole parcel. The package is ready to launch.",
      items: [
        {
          title: el ? "Το όνομα" : "The domain",
          body: el
            ? `Το ${DOMAIN}, σύντομο .gr που ταυτίζεται με την αναζήτηση ${head}.`
            : `${DOMAIN}, a short premium .gr and an exact match for ${head}.`,
        },
        {
          title: el ? "Ηλεκτρονικό κατάστημα" : "Next.js e-shop",
          body: el
            ? "Σύγχρονο, γρήγορο κατάστημα, έτοιμο να δεχτεί παραγγελίες."
            : "A ready-to-launch store, built on Next.js.",
        },
        {
          title: el ? "Βελτιστοποίηση για τη Google" : "Custom SEO setup",
          body: el
            ? "Δομή, τίτλοι και περιγραφές είναι ήδη στημένα για καλή κατάταξη."
            : "SEO is already set up on the e-shop.",
        },
        {
          title: el ? "Πληρωμές" : "Payments",
          body: el
            ? "Οι πληρωμές με κάρτα είναι ήδη ενεργές."
            : "Payments integration is already configured.",
        },
      ],
    },
    options: {
      title: el ? "Αγορά ή μίσθωση" : "Buy or lease",
      buyTitle: el ? `Εξαγορά στα ${price}` : `Buy outright for ${price}`,
      buyBody: el
        ? "Η τιμή είναι σταθερή και δημοσιευμένη. Η πληρωμή γίνεται με ασφάλεια μέσω μεσεγγύησης (π.χ. Escrow.com ή Sedo) και ακολουθεί η μεταβίβαση."
        : "The asking price is published. Payment can close through escrow, for example Escrow.com or Sedo, and the domain transfers after that.",
      leaseTitle: el ? "Μίσθωση, και με δικαίωμα εξαγοράς" : "Lease or lease-to-own",
      leaseBody: el
        ? "Αν δεν θέλετε να αγοράσετε αμέσως, στείλτε πρόταση μίσθωσης. Οι όροι συμφωνούνται κατά περίπτωση."
        : "If you do not want to buy outright yet, send a lease proposal. Terms are agreed separately, and no lease price is published.",
    },
    faq: {
      title: el ? "Συχνές ερωτήσεις" : "Questions, answered",
      items: faq,
    },
    form: {
      title: el ? "Αγορά ή πρόταση" : "Buy or make an offer",
      intro: el
        ? `Αφήστε τα στοιχεία σας και θα σας απαντήσουμε άμεσα. Μπορείτε επίσης να γράψετε στο ${CONTACT_EMAIL}.`
        : `Send your details. We reply to the email you enter, or write directly to ${CONTACT_EMAIL}.`,
      name: el ? "Ονοματεπώνυμο" : "Name",
      email: "Email",
      company: el ? "Εταιρεία" : "Company",
      optional: el ? "προαιρετικό" : "optional",
      amount: el ? "Ποσό πρότασης (€)" : "Offer amount (€)",
      deal: el ? "Τύπος συμφωνίας" : "Deal type",
      buy: el ? "Αγορά" : "Buy",
      lease: el ? "Μίσθωση" : "Lease",
      message: el ? "Μήνυμα" : "Message",
      submit: el ? "Αποστολή πρότασης" : "Send offer",
      submitBuy: el ? `Επιβεβαίωση αγοράς στα ${price}` : `Confirm purchase at ${price}`,
      sending: el ? "Αποστολή…" : "Sending…",
      success: el
        ? "Η πρότασή σας στάλθηκε. Θα σας απαντήσουμε σύντομα."
        : "The offer was sent. We will reply to your email.",
      mailto: el
        ? "Αν δεν ανοίξει η εφαρμογή email, χρησιμοποιήστε τον σύνδεσμο ή γράψτε απευθείας."
        : "If your email app does not open, use the link or write directly.",
      openEmail: el ? "Άνοιγμα email" : "Open email",
      invalid: el ? "Ελέγξτε τα πεδία και δοκιμάστε ξανά." : "Check the fields and try again.",
      privacy: el
        ? "Τα στοιχεία σας χρησιμοποιούνται μόνο για την απάντηση στην πρότασή σας."
        : "These details are used only to reply to this offer.",
      nameRequired: el ? "Συμπληρώστε το όνομά σας." : "Enter your name.",
      emailInvalid: el ? "Συμπληρώστε έγκυρο email." : "Enter a valid email.",
      amountInvalid: el ? "Συμπληρώστε ποσό σε ευρώ." : "Enter an amount in euros.",
      buyBanner: el
        ? `Αίτημα αγοράς στην τιμή των ${price}. Αν θέλετε, αλλάξτε το ποσό για να κάνετε διαφορετική πρόταση.`
        : `Purchase request at ${price}. You can change the amount if you want to make a different offer.`,
      leaseHint: el
        ? "Προτεινόμενο ποσό σε ευρώ. Στη σημείωση διευκρινίστε αν είναι μηνιαίο ή συνολικό."
        : "Proposed amount in euros. In the note, say whether it is monthly or total.",
      offerHint: el ? "Το ποσό που προτείνετε, σε ευρώ." : "The amount you propose, in euros.",
      required: el ? "υποχρεωτικό" : "required",
    },
    footer: {
      disclaimer: el
        ? "Η σελίδα αφορά αποκλειστικά την πώληση του ονόματος τομέα. Δεν διαφημίζει ούτε πωλεί προϊόντα νικοτίνης."
        : "This page is only a domain-name sale. It does not advertise or sell nicotine products.",
      rights: `© ${new Date().getFullYear()} ${DOMAIN}`,
    },
  };
}
