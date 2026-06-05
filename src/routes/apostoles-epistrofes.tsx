import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/apostoles-epistrofes")({
  head: () => ({
    meta: [
      { title: "Αποστολές & Επιστροφές | ilektronikatsigara.gr" },
      { name: "description", content: "Πληροφορίες για αποστολές, χρόνους παράδοσης, μεταφορικά και πολιτική επιστροφών." },
      { property: "og:url", content: "/apostoles-epistrofes" },
    ],
    links: [{ rel: "canonical", href: "/apostoles-epistrofes" }],
  }),
  component: () => (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-8">Αποστολές & Επιστροφές</h1>
      <div className="space-y-5 text-foreground leading-relaxed">
        <h2 className="text-2xl font-extrabold tracking-tighter">Αποστολές</h2>
        <p>Παράδοση 1-3 εργάσιμες ημέρες σε όλη την ηπειρωτική Ελλάδα. Νησιά: 2-5 εργάσιμες.</p>
        <p><strong>Μεταφορικά:</strong> 3,90€ για παραγγελίες κάτω των 30€. Δωρεάν για παραγγελίες άνω των 30€.</p>
        <p>Παραγγελίες μέχρι τις 14:00 αποστέλλονται την ίδια ημέρα.</p>
        <h2 className="text-2xl font-extrabold tracking-tighter mt-8">Επιστροφές</h2>
        <p>Δικαίωμα υπαναχώρησης εντός 14 ημερών από την παραλαβή, σύμφωνα με την ελληνική και ευρωπαϊκή νομοθεσία.</p>
        <p>Σημαντικό: τα ανοιγμένα προϊόντα ατμίσματος (κάψουλες, υγρά, disposables) δεν επιστρέφονται για λόγους υγιεινής, σύμφωνα με το άρθρο 3ιβ του Ν. 2251/1994.</p>
        <p>Για ελαττωματικά προϊόντα ισχύει η εγγύηση του κατασκευαστή (6-12 μήνες).</p>
      </div>
    </section>
  ),
});
