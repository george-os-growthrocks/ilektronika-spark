import type { Metadata } from "next";
import { SearchPageClient } from "@/components/SearchPageClient";

export const metadata: Metadata = {
  title: "Αναζήτηση προϊόντων",
  description:
    "Αναζητήστε ηλεκτρονικά τσιγάρα, υγρά, disposable vapes, ναργιλέδες και αξεσουάρ από τη συλλογή της Vape and More.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <SearchPageClient />;
}
