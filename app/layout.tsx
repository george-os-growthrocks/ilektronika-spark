import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { ChatWidget } from "@/components/ChatWidget";
import { Consent } from "@/components/Consent";
import { JsonLd } from "@/components/JsonLd";
import { buildNavData } from "@/data/catalog";
import { OG_IMAGE_META } from "@/lib/seo";

const GA_ID = "G-GDY2BQN6MZ";

const inter = Inter({
  subsets: ["greek", "latin"],
  variable: "--font-inter",
  weight: ["400", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["greek", "latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ilektronikatsigara.gr"),
  title: {
    default: "ilektronikatsigara.gr | Ηλεκτρονικό Τσιγάρο, Disposables, Υγρά, Snus, Ναργιλέδες",
    template: "%s | ilektronikatsigara.gr",
  },
  description:
    "Ο ελληνικός κατάλογος για ηλεκτρονικό τσιγάρο: pod kits, disposable vapes, υγρά αναπλήρωσης, snus και ναργιλέδες με τιμές. Αγορά μέσω Vape and More, Ρέθυμνο.",
  authors: [{ name: "ilektronikatsigara.gr" }],
  verification: {
    google: "v9zhe62cagLZ0K9p_cw_9d8aQGQQzYDEG9MHkgKQ4I4",
  },
  openGraph: {
    type: "website",
    siteName: "ilektronikatsigara.gr",
    locale: "el_GR",
    images: [OG_IMAGE_META],
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "geo.region": "GR",
    "geo.country": "Greece",
  },
};

/**
 * Runs before first paint:
 *  - Google Consent Mode v2 defaults (denied) and restore of a stored choice.
 *  - Marks returning, age-verified visitors so the age gate never flashes.
 */
const PRE_PAINT_SCRIPT = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{var m=document.cookie.match(/(?:^|; )its_consent=(granted|denied)/);if(m&&m[1]==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}
try{if(localStorage.getItem('ageVerified-v1')==='yes'){document.documentElement.classList.add('age-ok');}}catch(e){}
`;

const GA_CONFIG_SCRIPT = `
gtag('js', new Date());
gtag('config', '${GA_ID}', { linker: { domains: ['ilektronikatsigara.gr', 'vapeandmore.gr'] } });
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = buildNavData();

  return (
    <html
      lang="el"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {GA_CONFIG_SCRIPT}
        </Script>
      </head>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://ilektronikatsigara.gr/#website",
                url: "https://ilektronikatsigara.gr",
                name: "ilektronikatsigara.gr",
                description:
                  "Ηλεκτρονικό τσιγάρο, disposable vapes, υγρά αναπλήρωσης, snus και ναργιλέδες στην Ελλάδα.",
                publisher: { "@id": "https://ilektronikatsigara.gr/#organization" },
                inLanguage: "el",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://ilektronikatsigara.gr/anazitisi?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "Organization",
                "@id": "https://ilektronikatsigara.gr/#organization",
                name: "ilektronikatsigara.gr",
                alternateName: "ilektronikatsigara.gr by Vape and More",
                url: "https://ilektronikatsigara.gr",
                logo: {
                  "@type": "ImageObject",
                  url: "https://ilektronikatsigara.gr/logo.png",
                  width: 540,
                  height: 255,
                },
                sameAs: [
                  "https://vapeandmore.gr",
                  "https://www.fagi.gr/rethymno/eshops/vapeandmore/",
                  "https://www.bestprice.gr/m/15927/vapeandmore.html",
                ],
                parentOrganization: { "@id": "https://vapeandmore.gr/#localbusiness" },
              },
              {
                "@type": ["LocalBusiness", "Store"],
                "@id": "https://vapeandmore.gr/#localbusiness",
                name: "Vape and More",
                image: "https://vapeandmore.gr/wp-content/uploads/2025/02/remove-bg_3.png",
                telephone: "+302831181046",
                email: "info@vapeandmore.gr",
                url: "https://vapeandmore.gr",
                sameAs: [
                  "https://ilektronikatsigara.gr",
                  "https://www.fagi.gr/rethymno/eshops/vapeandmore/",
                  "https://www.bestprice.gr/m/15927/vapeandmore.html",
                ],
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Αρκαδίου 82",
                  addressLocality: "Ρέθυμνο",
                  postalCode: "74100",
                  addressCountry: "GR",
                },
                geo: { "@type": "GeoCoordinates", latitude: 35.3694084, longitude: 24.475459 },
                openingHoursSpecification: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "10:00",
                  closes: "21:00",
                },
                priceRange: "€€",
                areaServed: { "@type": "Country", name: "Greece" },
              },
            ],
          }}
        />
        <Header nav={nav} />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <Footer />
        <AgeGate />
        <Consent />
        <ChatWidget />
      </body>
    </html>
  );
}
