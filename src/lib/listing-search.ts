export type ListingSort = "relevance" | "price-asc" | "price-desc" | "newest";

export interface ListingSearchParams {
  page: number;
  brand: string[];
  instock?: "1" | "0";
  sort: ListingSort;
}

export function parseListingSearch(
  searchParams: Record<string, string | string[] | undefined>,
): ListingSearchParams {
  const pageRaw = searchParams.page;
  const page = Math.max(
    1,
    parseInt(Array.isArray(pageRaw) ? (pageRaw[0] ?? "1") : (pageRaw ?? "1"), 10) || 1,
  );

  const brandRaw = searchParams.brand;
  let brand: string[] = [];
  if (brandRaw) {
    brand = Array.isArray(brandRaw) ? brandRaw : [brandRaw];
  }

  const instockRaw = searchParams.instock;
  const instock =
    instockRaw === "1" || instockRaw === "0"
      ? instockRaw
      : Array.isArray(instockRaw) && (instockRaw[0] === "1" || instockRaw[0] === "0")
        ? instockRaw[0]
        : undefined;

  const sortRaw = searchParams.sort;
  const sortVal = Array.isArray(sortRaw) ? sortRaw[0] : sortRaw;
  const sort: ListingSort =
    sortVal === "price-asc" || sortVal === "price-desc" || sortVal === "newest"
      ? sortVal
      : "relevance";

  return { page, brand, instock, sort };
}

export function buildListingQuery(
  current: ListingSearchParams,
  updates: Partial<ListingSearchParams>,
): string {
  const next = { ...current, ...updates };
  const params = new URLSearchParams();

  if (next.page > 1) params.set("page", String(next.page));
  if (next.instock === "1") params.set("instock", "1");
  if (next.sort !== "relevance") params.set("sort", next.sort);
  for (const b of next.brand) params.append("brand", b);

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
