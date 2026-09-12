import Link from "next/link";
import { storeUrl } from "@/lib/affiliate";
import { CookieSettingsButton } from "./Consent";
import { OutboundLink } from "./OutboundLink";

const LOGO_SRC = "/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border pt-16 mt-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <img
                src={LOGO_SRC}
                alt="Vape and More"
                width={102}
                height={48}
                className="h-12 w-auto"
              />
              <span className="flex flex-col leading-none border-l border-border pl-3">
                <span className="font-extrabold tracking-tight text-sm">ilektronikatsigara.gr</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-1">
                  κατάλογος by Vape and More
                </span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Ο ελληνικός κατάλογος για ηλεκτρονικό τσιγάρο, disposables, υγρά αναπλήρωσης, snus και
              ναργιλέδες. Οι παραγγελίες εκτελούνται από το{" "}
              <OutboundLink
                href={storeUrl("footer")}
                placement="footer"
                className="text-primary font-semibold hover:underline"
              >
                vapeandmore.gr
              </OutboundLink>{" "}
              με αυθεντικά προϊόντα και πανελλαδική αποστολή από το Ρέθυμνο.
            </p>
            <address className="not-italic text-xs text-muted-foreground mt-4 leading-relaxed">
              Vape and More · Αρκαδίου 82, 74100 Ρέθυμνο ·{" "}
              <a href="tel:+302831181046" className="hover:text-primary">
                2831 181 046
              </a>{" "}
              · Δευ–Σαβ 10:00–21:00
            </address>
            <div className="flex items-center gap-3 mt-6">
              <div className="px-3 py-1 bg-foreground text-background text-xs font-bold">18+</div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                ΑΥΣΤΗΡΑ ΓΙΑ ΕΝΗΛΙΚΕΣ
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground mb-1">
              ΚΑΤΑΣΤΗΜΑ
            </span>
            <Link href="/syskeyes-vape" className="hover:text-primary">
              Ηλεκτρονικό τσιγάρο & kits
            </Link>
            <Link href="/disposables" className="hover:text-primary">
              Disposables
            </Link>
            <Link href="/ygra-anaplirosis" className="hover:text-primary">
              Υγρά αναπλήρωσης
            </Link>
            <Link href="/snus" className="hover:text-primary">
              Snus & nicotine pouches
            </Link>
            <Link href="/antistaseis" className="hover:text-primary">
              Αντιστάσεις
            </Link>
            <Link href="/nargiledes" className="hover:text-primary">
              Ναργιλέδες
            </Link>
            <Link href="/katigories" className="hover:text-primary font-semibold">
              Όλες οι κατηγορίες →
            </Link>
          </div>
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground mb-1">
              ΠΛΗΡΟΦΟΡΙΕΣ
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
            <CookieSettingsButton />
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[11px] text-muted-foreground leading-relaxed max-w-2xl">
            <strong>Affiliate disclaimer:</strong> Το ilektronikatsigara.gr είναι ένας catalog
            ηλεκτρονικού τσιγάρου. Όλες οι αγορές διεκπεραιώνονται από το{" "}
            <OutboundLink
              href={storeUrl("footer_legal")}
              placement="footer_legal"
              className="text-primary hover:underline"
            >
              vapeandmore.gr
            </OutboundLink>
            . Ενδέχεται να λαμβάνουμε προμήθεια χωρίς επιπλέον κόστος για εσάς.
          </p>
          <p className="text-[10px] font-mono text-muted-foreground uppercase whitespace-nowrap">
            © 2024-2026 ilektronikatsigara.gr
          </p>
        </div>
      </div>

      <div className="bg-foreground text-background py-3 text-center px-6">
        <p className="text-xs md:text-sm font-bold tracking-tight uppercase">
          ⚠️ ΠΡΟΕΙΔΟΠΟΙΗΣΗ: ΠΕΡΙΕΧΕΙ ΝΙΚΟΤΙΝΗ - ΕΞΑΙΡΕΤΙΚΑ ΕΘΙΣΤΙΚΗ ΟΥΣΙΑ. ΟΧΙ ΓΙΑ ΑΝΗΛΙΚΟΥΣ & ΜΗ
          ΚΑΠΝΙΣΤΕΣ.
        </p>
      </div>
    </footer>
  );
}
