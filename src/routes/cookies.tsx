import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Πολιτική Cookies | ilektronikatsigara.gr" },
      { name: "description", content: "Πληροφορίες για τα cookies που χρησιμοποιεί το ilektronikatsigara.gr." },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-8">Πολιτική Cookies</h1>
      <div className="space-y-5 text-foreground leading-relaxed">
        <p>Τα cookies είναι μικρά αρχεία που αποθηκεύονται στον browser σας για την ορθή λειτουργία της ιστοσελίδας.</p>
        <h2 className="text-2xl font-extrabold tracking-tighter mt-6">Τύποι Cookies</h2>
        <p><strong>Λειτουργικά:</strong> απαραίτητα για τη λειτουργία (π.χ. αποθήκευση επιβεβαίωσης ηλικίας 18+).</p>
        <p><strong>Στατιστικά:</strong> για ανώνυμη ανάλυση επισκεψιμότητας (προαιρετικά).</p>
        <h2 className="text-2xl font-extrabold tracking-tighter mt-6">Διαχείριση</h2>
        <p>Μπορείτε να διαχειριστείτε ή να διαγράψετε τα cookies από τις ρυθμίσεις του browser σας ανά πάσα στιγμή.</p>
      </div>
    </section>
  ),
});
