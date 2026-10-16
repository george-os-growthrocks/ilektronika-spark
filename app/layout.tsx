import type { Metadata, Viewport } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { headers } from "next/headers";
import { DOMAIN, SITE_URL } from "@/config/site";
import "./globals.css";

const sans = Manrope({
  subsets: ["greek", "latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const serif = Source_Serif_4({
  subsets: ["greek", "latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: DOMAIN,
  authors: [{ name: DOMAIN }],
  creator: DOMAIN,
  category: "domain name",
  other: {
    "geo.region": "GR",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f0e6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const locale = headerList.get("x-locale") === "en" ? "en" : "el";

  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
