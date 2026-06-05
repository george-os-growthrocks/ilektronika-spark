import Link from "next/link";

const LOGO_SRC = "/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border pt-16 mt-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center mb-4">
              <img src={LOGO_SRC} alt="ilektronikatsigara.gr" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Ο κορυφαίος ελληνικός catalog για ηλεκτρονικά τσιγάρα, disposables, υγρά αναπλήρωσης
              και ναργιλέδες. Συνεργαζόμαστε με το{" "}
              <a
                href="https://vapeandmore.gr?utm_source=ilektronikatsigara&utm_medium=referral&utm_campaign=footer"
                target="_blank"
                rel="noopener nofollow sponsored"
                className="text-primary font-semibold hover:underline"
              >
                vapeandmore.gr
              </a>{" "}
              για αυθεντικά προϊόντα, εξειδίκευση και πανελλαδική αποστολή από Ρέθυμνο.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="px-3 py-1 bg-foreground text-background text-xs font-bold">18+</div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Αυστηρά για ενήλικες
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground mb-1">
              Κατάστημα
            </span>
            <Link href="/disposables" className="hover:text-primary">
              Disposables
            </Link>
            <Link href="/syskeyes-vape" className="hover:text-primary">
              Συσκευές Vape
            </Link>
            <Link href="/ygra-anaplirosis" className="hover:text-primary">
              Υγρά αναπλήρωσης
            </Link>
            <Link href="/antistaseis" className="hover:text-primary">
              Αντιστάσεις
            </Link>
            <Link href="/nargiledes" className="hover:text-primary">
              Ναργιλέδες
            </Link>
            <Link href="/snus" className="hover:text-primary">
              Snus
            </Link>
            <Link href="/katigories" className="hover:text-primary font-semibold">
              Όλες οι κατηγορίες →
            </Link>
          </div>
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground mb-1">
              Πληροφορίες
            </span>
            <Link href="/sxetika" className="hover:text-primary">
              Σχετικά με εμάς
            </Link>
            <Link href="/epikoinonia" className="hover:text-primary">
              Επικοινωνία
            </Link>
            <Link href="/apostoles-epistrofes" className="hover:text-primary">
              Αποστολές & Επιστροφές
            </Link>
            <Link href="/syxnes-erotiseis" className="hover:text-primary">
              Συχνές Ερωτήσεις
            </Link>
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>
            <Link href="/oroi-xrisis" className="hover:text-primary">
              Όροι Χρήσης
            </Link>
            <Link href="/politiki-aporritou" className="hover:text-primary">
              Πολιτική Απορρήτου
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[11px] text-muted-foreground leading-relaxed max-w-2xl">
            <strong>Affiliate disclaimer:</strong> Το ilektronikatsigara.gr είναι ένας catalog
            ηλεκτρονικού τσιγάρου. Όλες οι αγορές διεκπεραιώνονται από το{" "}
            <a
              href="https://vapeandmore.gr?utm_source=ilektronikatsigara&utm_medium=referral&utm_campaign=footer-legal"
              target="_blank"
              rel="noopener nofollow sponsored"
              className="text-primary hover:underline"
            >
              vapeandmore.gr
            </a>
            . Ενδέχεται να λαμβάνουμε προμήθεια χωρίς επιπλέον κόστος για εσάς.
          </p>
          <p className="text-[10px] font-mono text-muted-foreground uppercase whitespace-nowrap">
            © 2024-2026 ilektronikatsigara.gr
          </p>
        </div>
      </div>

      <div className="bg-foreground text-background py-3 text-center px-6">
        <p className="text-xs md:text-sm font-bold tracking-tight uppercase">
          ⚠️ Προειδοποίηση: Περιέχει νικοτίνη — εξαιρετικά εθιστική ουσία. Όχι για ανηλίκους & μη
          καπνιστές.
        </p>
      </div>
    </footer>
  );
}
