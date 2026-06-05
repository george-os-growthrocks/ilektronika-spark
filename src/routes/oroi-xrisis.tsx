import { createFileRoute } from "@tanstack/react-router";

function LegalPage({ title, body }: { title: string; body: { h?: string; p?: string }[] }) {
  return (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-8">{title}</h1>
      <div className="space-y-5 text-foreground leading-relaxed">
        {body.map((b, i) =>
          b.h ? (
            <h2 key={i} className="text-2xl font-extrabold tracking-tighter mt-8">{b.h}</h2>
          ) : (
            <p key={i}>{b.p}</p>
          ),
        )}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/oroi-xrisis")({
  head: () => ({
    meta: [
      { title: "Όροι Χρήσης | ilektronikatsigara.gr" },
      { name: "description", content: "Οι όροι χρήσης του ilektronikatsigara.gr — δικαιώματα και υποχρεώσεις." },
      { property: "og:url", content: "/oroi-xrisis" },
    ],
    links: [{ rel: "canonical", href: "/oroi-xrisis" }],
  }),
  component: () => (
    <LegalPage
      title="Όροι Χρήσης"
      body={[
        { p: "Καλωσορίσατε στο ilektronikatsigara.gr. Η χρήση της ιστοσελίδας μας συνεπάγεται την ανεπιφύλακτη αποδοχή των παρακάτω όρων." },
        { h: "1. Ηλικιακό όριο" },
        { p: "Η ιστοσελίδα και τα προϊόντα που παρουσιάζει απευθύνονται αποκλειστικά σε ενήλικες άνω των 18 ετών. Η χρήση από ανηλίκους απαγορεύεται αυστηρά." },
        { h: "2. Περιεχόμενο" },
        { p: "Όλο το περιεχόμενο (κείμενα, εικόνες, λογότυπα) είναι ιδιοκτησία του ilektronikatsigara.gr ή των αντίστοιχων κατόχων δικαιωμάτων. Απαγορεύεται η αναπαραγωγή χωρίς γραπτή άδεια." },
        { h: "3. Προϊόντα" },
        { p: "Τα προϊόντα που παρουσιάζονται είναι ενδεικτικά. Διαθεσιμότητα και τιμές μπορεί να μεταβληθούν χωρίς προειδοποίηση." },
        { h: "4. Ευθύνη" },
        { p: "Η εταιρεία δεν φέρει ευθύνη για οποιαδήποτε άμεση ή έμμεση ζημιά από τη χρήση των προϊόντων. Συμβουλευτείτε ιατρό αν έχετε ζητήματα υγείας." },
        { h: "5. Νομοθεσία" },
        { p: "Οι όροι διέπονται από το ελληνικό δίκαιο. Αρμόδια δικαστήρια ορίζονται τα δικαστήρια Αθηνών." },
        { p: "Τελευταία ενημέρωση: Ιούνιος 2026. Συμβουλευτείτε νομικό σύμβουλο πριν τη χρήση σε πραγματικό περιβάλλον — το κείμενο είναι ενδεικτικό template." },
      ]}
    />
  ),
});
