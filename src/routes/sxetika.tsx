import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sxetika")({
  head: () => ({
    meta: [
      { title: "Σχετικά με εμάς | ilektronikatsigara.gr" },
      { name: "description", content: "Γνωρίστε την ομάδα του ilektronikatsigara.gr — Έλληνες ειδικοί στο άτμισμα." },
      { property: "og:url", content: "/sxetika" },
    ],
    links: [{ rel: "canonical", href: "/sxetika" }],
  }),
  component: () => (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">Σχετικά με εμάς</h1>
      <div className="space-y-5 text-foreground leading-relaxed">
        <p>Το ilektronikatsigara.gr ξεκίνησε με έναν στόχο: να προσφέρει στους Έλληνες ατμιστές αξιόπιστη πληροφορία και αυθεντικά προϊόντα.</p>
        <p>Επιλέγουμε προσεκτικά κάθε προϊόν στον κατάλογό μας — από κορυφαίους κατασκευαστές της Ευρώπης και του εξωτερικού, με πλήρη συμμόρφωση στην οδηγία TPD.</p>
        <p>Πιστεύουμε ότι το άτμισμα μπορεί να είναι σημαντικό εργαλείο μείωσης βλάβης για ενήλικες καπνιστές, και ότι κάθε καταναλωτής αξίζει σαφείς, μη παραπλανητικές πληροφορίες.</p>
        <h2 className="text-2xl font-extrabold tracking-tighter mt-8">Η δέσμευσή μας</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>100% αυθεντικά προϊόντα με εγγύηση κατασκευαστή</li>
          <li>Εξειδικευμένη υποστήριξη στα ελληνικά</li>
          <li>Αυστηρή τήρηση της ηλικιακής επαλήθευσης (18+)</li>
          <li>Διαφανής, μη παραπλανητική επικοινωνία</li>
        </ul>
      </div>
    </section>
  ),
});
