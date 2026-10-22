import { ASKING_PRICE_EUR, CONTACT_EMAIL, DOMAIN } from "@/config/site";
import {
  GREEKLISH_TERM,
  GREEKLISH_VOLUME,
  GSC_CLICKS,
  GSC_IMPRESSIONS,
  HEAD_KD,
  HEAD_TERM,
  HEAD_VOLUME,
  PLURAL_TERM,
  PLURAL_VOLUME,
  SOURCE_EL,
  SOURCE_EN,
} from "@/content/facts";
import type { Locale } from "@/content/locale";
import { formatEur, formatInt } from "@/lib/format";

export type Copy = ReturnType<typeof getCopy>;

export function getCopy(locale: Locale) {
  const el = locale === "el";
  const n = (value: number) => formatInt(locale, value);
  const price = formatEur(locale, ASKING_PRICE_EUR);
  const head = `«${HEAD_TERM}»`;
  const gscPeriod = el ? "1 Ιουνίου έως 19 Οκτωβρίου 2026" : "1 June to 19 October 2026";

  const transferNote = el
    ? "Η μεταβίβαση γίνεται μέσω του μητρώου .gr της ΕΕΤΤ. Ένα .gr μπορεί να εκχωρηθεί σε οποιοδήποτε φυσικό ή νομικό πρόσωπο, ελληνικό ή αλλοδαπό."
    : "The transfer runs through the EETT .gr registry. A .gr name can be assigned to any natural or legal person, Greek or foreign.";

  const inShort = el
    ? `Ναι. Το ${DOMAIN} πωλείται στα ${price}, ως όνομα τομέα. Ταυτίζεται λέξη προς λέξη με την αναζήτηση ${head} και διατίθεται για άμεση εξαγορά.`
    : `Yes. ${DOMAIN} is for sale at ${price}, as a domain name. It matches the search ${head} word for word and is available to buy outright.`;

  const faq = [
    {
      q: el
        ? `Πωλείται το ${DOMAIN} και πόσο κοστίζει;`
        : `Is ${DOMAIN} for sale, and what is the price?`,
      a: inShort,
    },
    {
      q: el ? "Τι ακριβώς αγοράζω;" : "What exactly am I buying?",
      a: el
        ? `Το όνομα τομέα ${DOMAIN}. Το περιεχόμενο και η πλατφόρμα του καταστήματος που θα στήσετε είναι δική σας επιλογή.`
        : `The domain name ${DOMAIN}. The shop you build on it, and the platform you use, are your choice.`,
    },
    {
      q: el
        ? "Γιατί έχει αξία η ακριβής αντιστοιχία με την αναζήτηση;"
        : "Why does the exact match matter?",
      a: el
        ? `Το ${head} έχει περίπου ${n(HEAD_VOLUME)} μηνιαίες αναζητήσεις στην Ελλάδα και δείκτη δυσκολίας ${HEAD_KD} στα 100. Το όνομα είναι ακριβώς αυτό που πληκτρολογεί ο χρήστης. Συγγενικές αναζητήσεις: «${GREEKLISH_TERM}» με ${n(GREEKLISH_VOLUME)} και «${PLURAL_TERM}» με ${n(PLURAL_VOLUME)} αναζητήσεις τον μήνα.`
        : `${head} has about ${n(HEAD_VOLUME)} monthly searches in Greece and keyword difficulty ${HEAD_KD} out of 100. The domain matches that query exactly. Related searches: “${GREEKLISH_TERM}” at ${n(GREEKLISH_VOLUME)} and “${PLURAL_TERM}” at ${n(PLURAL_VOLUME)} per month.`,
    },
    {
      q: el ? "Έχει ήδη ιστορικό στη Google;" : "Does it already have a history in Google?",
      a: el
        ? `Ναι. Από ${gscPeriod}, το Google Search Console κατέγραψε ${n(GSC_CLICKS)} κλικ και ${n(GSC_IMPRESSIONS)} εμφανίσεις για τον προηγούμενο ιστότοπο του ονόματος.`
        : `Yes. From ${gscPeriod}, Google Search Console recorded ${n(GSC_CLICKS)} clicks and ${n(GSC_IMPRESSIONS)} impressions for the previous site on the domain.`,
    },
    {
      q: el
        ? "Γιατί η οργανική αναζήτηση μετράει τόσο σε αυτή την αγορά;"
        : "Why does organic search matter so much in this market?",
      a: el
        ? "Η ελληνική νομοθεσία δεν επιτρέπει τη διαφήμιση του ηλεκτρονικού τσιγάρου στο διαδίκτυο. Γι’ αυτό η αναζήτηση στη Google είναι από τους λίγους δρόμους για να σας βρει ο πελάτης."
        : "Greek law does not allow e-cigarette advertising online. That makes Google search one of the few ways customers can find a shop.",
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
      q: el ? "Τι γίνεται μετά την πληρωμή;" : "What happens after payment?",
      a: el
        ? "Η πληρωμή κρατείται σε μεσεγγύηση, ξεκινά η μεταβίβαση στο μητρώο .gr και τα χρήματα αποδεσμεύονται μόλις το όνομα περάσει σε εσάς. Δυνατότητα έκδοσης τιμολογίου."
        : "Payment is held in escrow, the .gr registry transfer starts, and the funds are released once the name is yours. Invoice available.",
    },
    {
      q: el ? "Εγγυάται η αγορά πρώτη θέση στη Google;" : "Does buying it guarantee a top ranking?",
      a: el
        ? "Όχι. Τα στοιχεία δείχνουν τη ζήτηση, δεν υπόσχονται κατάταξη. Η θέση στη Google εξαρτάται από το κατάστημα και το περιεχόμενο που θα χτίσετε."
        : "No. The figures describe demand, not a ranking promise. Rankings depend on the shop and content you build.",
    },
    {
      q: el ? "Ποιος μπορεί να αποκτήσει ένα .gr;" : "Who can hold a .gr domain?",
      a: transferNote,
    },
    {
      q: el ? "Πώς στέλνω προσφορά;" : "How do I send an offer?",
      a: el
        ? `Μέσω της φόρμας σε αυτή τη σελίδα ή με email στο ${CONTACT_EMAIL}. Η πρώτη επικοινωνία δεν σας δεσμεύει σε τίποτα.`
        : `Use the form on this page or email ${CONTACT_EMAIL}. The first message does not obligate you to buy.`,
    },
  ];

  return {
    source: el ? SOURCE_EL : SOURCE_EN,
    meta: {
      title: el
        ? `Πωλείται το ${DOMAIN} · Domain για ηλεκτρονικό τσιγάρο`
        : `${DOMAIN} for sale · Exact-match Greek e-cigarette domain`,
      description: el
        ? `Το ${DOMAIN} πωλείται: σύντομο .gr που ταυτίζεται με την αναζήτηση ${head}. Άμεση εξαγορά με ασφαλή μεσεγγύηση.`
        : `${DOMAIN} is for sale: a short .gr that matches the Greek search ${head} exactly. Buy it outright through secure escrow.`,
      ogAlt: el ? `Πωλείται το ${DOMAIN}` : `${DOMAIN} is for sale`,
    },
    skip: el ? "Μετάβαση στο περιεχόμενο" : "Skip to content",
    langLabel: el ? "Γλώσσα" : "Language",
    nav: {
      why: el ? "Γιατί αξίζει" : "Why",
      keywords: el ? "Αναζητήσεις" : "Keywords",
      included: el ? "Τι περιλαμβάνει" : "Included",
      faq: el ? "Ερωτήσεις" : "FAQ",
      contact: el ? "Επικοινωνία" : "Contact",
    },
    hero: {
      eyebrow: el ? "Όνομα τομέα προς πώληση · .gr" : "Domain for sale · .gr",
      titleLead: el ? "Πωλείται το" : "",
      titleTail: el ? "η διεύθυνση που ψάχνει η αγορά" : "is for sale",
      sub: el
        ? `Είναι ακριβώς η φράση που πληκτρολογούν περίπου ${n(HEAD_VOLUME)} φορές τον μήνα στην Ελλάδα, ${head}, με δείκτη δυσκολίας ${HEAD_KD}/100.`
        : `Exact match for ${head}: about ${n(HEAD_VOLUME)} monthly searches in Greece, keyword difficulty ${HEAD_KD}/100.`,
      answerLabel: el ? "Με δυο λόγια" : "In short",
      answer: inShort,
      asking: el ? "Ζητούμενη τιμή" : "Asking price",
      fraction: el
        ? "Σταθερή τιμή για το όνομα. Δεκτές και προτάσεις."
        : "A fixed price for the name. Offers are welcome.",
      buy: el ? "Αγορά τώρα" : "Buy now",
      offer: el ? "Κάντε πρόταση" : "Make an offer",
      offerShort: el ? "Προσφορά" : "Offer",
      invoice: el ? "Δυνατότητα έκδοσης τιμολογίου" : "Invoice available",
      eu: transferNote,
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
            "Επιβεβαιώνουμε τα στοιχεία του νέου δικαιούχου για τη δήλωση στο μητρώο .gr.",
            "Η μεταβίβαση ξεκινά μέσα σε λίγες εργάσιμες ημέρες.",
          ]
        : [
            "We confirm the new holder’s details for the .gr registry declaration.",
            "The transfer starts within a few business days.",
          ],
    },
    statsTitle: el ? "Τα νούμερα" : "The figures",
    statsIntro: el
      ? "Μηνιαίες αναζητήσεις στην Ελλάδα, και το ιστορικό του ονόματος στη Google."
      : "Monthly searches in Greece, plus the domain’s history in Google.",
    stats: {
      exact: {
        label: el ? "Αναζητήσεις τον μήνα" : "Searches / month",
        note: head,
      },
      kd: {
        label: el ? "Δυσκολία κατάταξης (0-100)" : "Keyword difficulty (0-100)",
        note: head,
      },
      plural: {
        label: el ? "Αναζητήσεις τον μήνα" : "Searches / month",
        note: `«${PLURAL_TERM}»`,
      },
      greeklish: {
        label: el ? "Αναζητήσεις τον μήνα" : "Searches / month",
        note: `«${GREEKLISH_TERM}»`,
      },
      clicks: {
        label: el ? "Κλικ από τη Google" : "Clicks from Google",
        note: el ? `Search Console, ${gscPeriod}` : `Search Console, ${gscPeriod}`,
      },
      impressions: {
        label: el ? "Εμφανίσεις στη Google" : "Impressions in Google",
        note: el ? `Search Console, ${gscPeriod}` : `Search Console, ${gscPeriod}`,
      },
    },
    why: {
      title: el ? `Γιατί το ${DOMAIN} είναι ευκαιρία` : `Why buy ${DOMAIN}`,
      intro: el
        ? "Σύντομο .gr, ακριβώς η φράση που ψάχνει ο κόσμος, σε μια αγορά όπου η διαφήμιση στο διαδίκτυο δεν επιτρέπεται."
        : "A short .gr, an exact match on the head term, in a market where online advertising is not allowed.",
      points: [
        {
          title: el ? "Η φράση που ψάχνουν, λέξη προς λέξη" : "Exact match, difficulty 0",
          body: el
            ? `Το ${head} συγκεντρώνει περίπου ${n(HEAD_VOLUME)} αναζητήσεις τον μήνα στην Ελλάδα, με δείκτη δυσκολίας ${HEAD_KD}. Οι παραλλαγές «${PLURAL_TERM}» (${n(PLURAL_VOLUME)}) και «${GREEKLISH_TERM}» (${n(GREEKLISH_VOLUME)}) δείχνουν την ίδια πρόθεση.`
            : `${head} has about ${n(HEAD_VOLUME)} monthly searches in Greece and keyword difficulty ${HEAD_KD}. The forms “${PLURAL_TERM}” (${n(PLURAL_VOLUME)}) and “${GREEKLISH_TERM}” (${n(GREEKLISH_VOLUME)}) share the same intent.`,
        },
        {
          title: el ? "Η Google το γνωρίζει ήδη" : "Already known to Google",
          body: el
            ? `Το όνομα δεν ξεκινά από το μηδέν: από ${gscPeriod} κατέγραψε ${n(GSC_CLICKS)} κλικ και ${n(GSC_IMPRESSIONS)} εμφανίσεις στο Google Search Console.`
            : `The name does not start from zero: from ${gscPeriod} it recorded ${n(GSC_CLICKS)} clicks and ${n(GSC_IMPRESSIONS)} impressions in Google Search Console.`,
        },
        {
          title: el ? "Η αναζήτηση είναι ο βασικός δρόμος" : "Search is the main channel",
          body: el
            ? "Η διαφήμιση του ηλεκτρονικού τσιγάρου στο διαδίκτυο δεν επιτρέπεται στην Ελλάδα. Ένα όνομα που ταυτίζεται με την αναζήτηση βοηθά τον πελάτη να σας θυμηθεί και να σας εμπιστευτεί."
            : "Online e-cigarette advertising is not allowed in Greece. A name that matches the search helps customers remember and trust a shop.",
        },
        {
          title: el ? "Σύντομο, καθαρό, ελληνικό" : "Short, clean, Greek",
          body: el
            ? "Εύκολο στη μνήμη και στην πληκτρολόγηση. Ταιριάζει σε κατάστημα ηλεκτρονικού τσιγάρου, υγρών αναπλήρωσης ή αξεσουάρ."
            : "Easy to remember and type. It fits a retailer of e-cigarettes, e-liquids, or accessories.",
        },
      ],
    },
    keywords: {
      title: el ? "Τι ψάχνει ο κόσμος" : "Keyword opportunity",
      intro: el
        ? "Μηνιαίες αναζητήσεις στην Ελλάδα για όρους που σχετίζονται άμεσα με το όνομα."
        : "Monthly search volume in Greece for queries tied to the domain.",
      keyword: el ? "Λέξη-κλειδί" : "Keyword",
      volume: el ? "Αναζητήσεις / μήνα" : "Searches / month",
      caption: el
        ? "Μηνιαίες αναζητήσεις στην Ελλάδα. Ο δείκτης δυσκολίας αφορά τον κύριο όρο."
        : "Monthly searches in Greece. Difficulty applies to the head term.",
    },
    included: {
      title: el ? "Τι περιλαμβάνει η πώληση" : "What the sale includes",
      intro: el
        ? "Μια καθαρή, ασφαλής συναλλαγή για ένα όνομα που αντέχει στον χρόνο."
        : "A clean, secure transaction for a name that lasts.",
      items: [
        {
          title: el ? "Το όνομα" : "The domain",
          body: el
            ? `Το ${DOMAIN}, σύντομο .gr που ταυτίζεται με την αναζήτηση ${head}.`
            : `${DOMAIN}, a short .gr and an exact match for ${head}.`,
        },
        {
          title: el ? "Μεσεγγύηση" : "Escrow",
          body: el
            ? "Η πληρωμή περνά από υπηρεσία μεσεγγύησης και αποδεσμεύεται μόνο όταν ολοκληρωθεί η μεταβίβαση."
            : "Payment is held in escrow and released only once the transfer is complete.",
        },
        {
          title: el ? "Μεταβίβαση στο μητρώο" : "Registry transfer",
          body: el
            ? "Το όνομα περνά στο όνομά σας μέσω του μητρώου .gr, με καταχωρητή της επιλογής σας."
            : "The name moves to you through the .gr registry, with a registrar of your choice.",
        },
        {
          title: el ? "Καθαρή εξαγορά" : "Clean sale",
          body: el
            ? "Μία πληρωμή, πλήρης μεταβίβαση. Το όνομα γίνεται δικό σας οριστικά."
            : "One payment, full transfer. The name is yours for good.",
        },
      ],
    },
    options: {
      title: el ? "Αγορά ή πρόταση" : "Buy or make an offer",
      buyTitle: el ? `Εξαγορά στα ${price}` : `Buy outright for ${price}`,
      buyBody: el
        ? "Η τιμή είναι σταθερή και δημοσιευμένη. Η πληρωμή γίνεται με ασφάλεια μέσω μεσεγγύησης (π.χ. Escrow.com ή Sedo) και ακολουθεί η μεταβίβαση."
        : "The asking price is published. Payment can close through escrow, for example Escrow.com or Sedo, and the domain transfers after that.",
      offerTitle: el ? "Έχετε άλλο ποσό κατά νου;" : "Have a different figure in mind?",
      offerBody: el
        ? "Στείλτε την πρότασή σας μέσω της φόρμας. Κάθε σοβαρή προσφορά εξετάζεται."
        : "Send your offer through the form. Every serious offer is considered.",
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
