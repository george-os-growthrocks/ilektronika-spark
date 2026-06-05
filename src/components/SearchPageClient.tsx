"use client";

import Link from "next/link";
import { useState } from "react";
import { applyFilters, products } from "@/data/catalog";
import { ProductCard } from "./ProductCard";

export function SearchPageClient() {
  const [q, setQ] = useState("");
  const matches = q ? applyFilters(products, { search: q }).slice(0, 60) : [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Αναζήτηση</h1>
      <p className="text-muted-foreground mb-6">Βρείτε προϊόν με όνομα, μάρκα ή κωδικό.</p>
      <input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="π.χ. Elf Bar, Vaporesso, ναργιλές…"
        className="w-full border border-border rounded-lg px-4 py-3 bg-background text-base focus:border-primary focus:outline-none"
      />
      {q && (
        <p className="text-sm text-muted-foreground mt-3">
          {matches.length === 0 ? "Δεν βρέθηκαν αποτελέσματα." : `${matches.length} αποτελέσματα`}
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {matches.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {!q && (
        <p className="mt-12 text-center">
          <Link href="/" className="text-primary font-bold underline">
            Επιστροφή στην αρχική
          </Link>
        </p>
      )}
    </div>
  );
}
