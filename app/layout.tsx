import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { ChatWidget } from "@/components/ChatWidget";
import { JsonLd } from "@/components/JsonLd";

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
    default: "ilektronikatsigara.gr | Ηλεκτρονικά Τσιγάρα, Disposables, Υγρά, Ναργιλέδες",
    template: "%s | ilektronikatsigara.gr",
  },
  description:
    "Κορυφαίος ελληνικός κατάλογος για ηλεκτρονικά τσιγάρα, disposable vapes, pod systems, υγρά αναπλήρωσης και ναργιλέδες. Δείτε τιμές και αγοράστε online.",
  authors: [{ name: "ilektronikatsigara.gr" }],
  verification: {
    google: "v9zhe62cagLZ0K9p_cw_9d8aQGQQzYDEG9MHkgKQ4I4",
  },
  openGraph: {
    type: "website",
    siteName: "ilektronikatsigara.gr",
    locale: "el_GR",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    languages: {
      el: "https://ilektronikatsigara.gr",
    },
  },
  other: {
    "geo.region": "GR",
    "geo.country": "Greece",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GDY2BQN6MZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GDY2BQN6MZ');
          `}
        </Script>
      </head>
      <body>
        {/* Global Schema Graph */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://ilektronikatsigara.gr/#website",
                "url": "https://ilektronikatsigara.gr",
                "name": "ilektronikatsigara.gr",
                "description": "Ηλεκτρονικά τσιγάρα, disposable vapes, υγρά αναπλήρωσης και ναργιλέδες στην Ελλάδα.",
                "publisher": {
                  "@id": "https://ilektronikatsigara.gr/#organization"
                },
                "inLanguage": "el",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://ilektronikatsigara.gr/anazitisi?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://ilektronikatsigara.gr/#organization",
                "name": "ilektronikatsigara.gr",
                "url": "https://ilektronikatsigara.gr",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://ilektronikatsigara.gr/logo.png"
                },
                "sameAs": [
                  "https://vapeandmore.gr",
                  "https://www.fagi.gr/rethymno/eshops/vapeandmore/",
                  "https://www.bestprice.gr/m/15927/vapeandmore.html"
                ],
                "parentOrganization": {
                  "@id": "https://vapeandmore.gr/#localbusiness"
                }
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://vapeandmore.gr/#localbusiness",
                "name": "Vape and More",
                "image": "https://vapeandmore.gr/wp-content/uploads/2025/02/remove-bg_3.png",
                "telephone": "+302831181046",
                "email": "info@vapeandmore.gr",
                "url": "https://vapeandmore.gr",
                "sameAs": [
                  "https://ilektronikatsigara.gr",
                  "https://www.fagi.gr/rethymno/eshops/vapeandmore/",
                  "https://www.bestprice.gr/m/15927/vapeandmore.html"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Αρκαδίου 82",
                  "addressLocality": "Ρέθυμνο",
                  "postalCode": "74100",
                  "addressCountry": "GR"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 35.3694084,
                  "longitude": 24.475459
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ],
                  "opens": "10:00",
                  "closes": "21:00"
                },
                "priceRange": "€€",
                "areaServed": {
                  "@type": "Country",
                  "name": "Greece"
                }
              }
            ]
          }}
        />
        <Header />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <Footer />
        <AgeGate />
        <ChatWidget />
      </body>
    </html>
  );
}
