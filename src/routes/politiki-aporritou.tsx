import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politiki-aporritou")({
  head: () => ({
    meta: [
      { title: "Πολιτική Απορρήτου | ilektronikatsigara.gr" },
      { name: "description", content: "Πολιτική απορρήτου και προστασία προσωπικών δεδομένων κατά GDPR." },
      { property: "og:url", content: "/politiki-aporritou" },
    ],
    links: [{ rel: "canonical", href: "/politiki-aporritou" }],
  }),
  component: () => (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-8">Πολιτική Απορρήτου</h1>
      <div className="space-y-5 text-foreground leading-relaxed">
        <p>Σεβόμαστε την ιδιωτικότητα σας και τηρούμε τις απαιτήσεις του Γενικού Κανονισμού Προστασίας Δεδομένων (GDPR — Κανονισμός (ΕΕ) 2016/679).</p>
        <h2 className="text-2xl font-extrabold tracking-tighter mt-6">Δεδομένα που συλλέγουμε</h2>
        <p>Συλλέγουμε μόνο τα απολύτως απαραίτητα δεδομένα για τη λειτουργία του site: στοιχεία επικοινωνίας όταν συμπληρώνετε φόρμα, και τεχνικά cookies για τη λειτουργία της εφαρμογής.</p>
        <h2 className="text-2xl font-extrabold tracking-tighter mt-6">Δικαιώματά σας</h2>
        <p>Έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής και περιορισμού επεξεργασίας των δεδομένων σας. Για κάθε αίτημα: info@ilektronikatsigara.gr</p>
        <h2 className="text-2xl font-extrabold tracking-tighter mt-6">Διατήρηση</h2>
        <p>Διατηρούμε τα δεδομένα σας για όσο χρόνο είναι απαραίτητο για τους σκοπούς για τους οποίους συλλέχθηκαν, και όχι περισσότερο από όσο επιτρέπει η νομοθεσία.</p>
        <p className="text-sm text-muted-foreground">Ενδεικτικό κείμενο template — συμβουλευτείτε νομικό σύμβουλο πριν την πραγματική χρήση.</p>
      </div>
    </section>
  ),
});
