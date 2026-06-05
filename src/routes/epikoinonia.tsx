import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/epikoinonia")({
  head: () => ({
    meta: [
      { title: "Επικοινωνία | ilektronikatsigara.gr" },
      { name: "description", content: "Επικοινωνήστε με το ilektronikatsigara.gr — email, τηλέφωνο, φόρμα επικοινωνίας." },
      { property: "og:url", content: "/epikoinonia" },
    ],
    links: [{ rel: "canonical", href: "/epikoinonia" }],
  }),
  component: () => (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">Επικοινωνία</h1>
      <p className="text-lg text-muted-foreground mb-12">Είμαστε στη διάθεσή σας για κάθε ερώτηση, παραγγελία ή υποστήριξη.</p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="border border-border p-6">
          <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-2">Email</span>
          <p className="font-bold">info@ilektronikatsigara.gr</p>
        </div>
        <div className="border border-border p-6">
          <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-2">Τηλέφωνο</span>
          <p className="font-bold">+30 210 000 0000</p>
          <p className="text-sm text-muted-foreground mt-1">Δευ-Παρ 10:00-18:00</p>
        </div>
      </div>

      <form className="space-y-4 border border-border p-8">
        <h2 className="text-2xl font-extrabold tracking-tighter mb-4">Στείλτε μας μήνυμα</h2>
        <div>
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1">Όνομα</label>
          <input type="text" className="w-full border border-border p-3 bg-background" />
        </div>
        <div>
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1">Email</label>
          <input type="email" className="w-full border border-border p-3 bg-background" />
        </div>
        <div>
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1">Μήνυμα</label>
          <textarea rows={5} className="w-full border border-border p-3 bg-background" />
        </div>
        <button type="button" className="bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-widest text-sm">
          Αποστολή
        </button>
        <p className="text-xs text-muted-foreground">Η φόρμα είναι ενδεικτική — η αποστολή θα ενεργοποιηθεί σύντομα.</p>
      </form>
    </section>
  ),
});
