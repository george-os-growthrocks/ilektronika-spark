import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border pt-20 mt-20">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <span className="font-extrabold tracking-tighter text-xl block mb-4">ilektronikatsigara.gr</span>
            <p className="text-sm text-muted-foreground max-w-sm">
              Ο κορυφαίος ελληνικός προορισμός για ηλεκτρονικά τσιγάρα, disposables, υγρά αναπλήρωσης
              και ναργιλέδες. Αυθεντικά προϊόντα, εξειδίκευση, αξιοπιστία.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground mb-1">Κατάστημα</span>
            <Link to="/disposables">Disposables</Link>
            <Link to="/pods">Pod Systems</Link>
            <Link to="/ygra">Υγρά</Link>
            <Link to="/atmistikes">Ατμιστικές</Link>
            <Link to="/narghiledes">Ναργιλέδες</Link>
            <Link to="/aksesouar">Αξεσουάρ</Link>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground mb-1">Πληροφορίες</span>
            <Link to="/sxetika">Σχετικά με εμάς</Link>
            <Link to="/epikoinonia">Επικοινωνία</Link>
            <Link to="/apostoles-epistrofes">Αποστολές & Επιστροφές</Link>
            <Link to="/syxnes-erotiseis">Συχνές Ερωτήσεις</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/oroi-xrisis">Όροι Χρήσης</Link>
            <Link to="/politiki-aporritou">Πολιτική Απορρήτου</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-foreground text-background text-xs font-bold">18+</div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Αυστηρά για ενήλικες
            </p>
          </div>
          <p className="text-[10px] font-mono text-muted-foreground uppercase">
            © 2024-2026 ilektronikatsigara.gr — All rights reserved
          </p>
        </div>
      </div>

      <div className="bg-foreground text-background py-4 text-center px-6">
        <p className="text-sm font-bold tracking-tight uppercase">
          Προειδοποίηση: Το προϊόν αυτό περιέχει νικοτίνη, μια εξαιρετικά εθιστική ουσία.
          Δεν συνιστάται για μη καπνιστές και ανηλίκους κάτω των 18 ετών.
        </p>
      </div>
    </footer>
  );
}
