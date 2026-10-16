import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Every retired shop path 301s to the homepage.
 * The English sale page, the offer API, and the SEO files stay.
 */
const EXACT = new Set([
  "/",
  "/en",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/icon",
  "/apple-icon",
  "/favicon.ico",
]);

function barePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function isAllowed(pathname: string): boolean {
  const path = barePath(pathname);
  if (EXACT.has(path)) return true;
  if (path.startsWith("/api/")) return true;
  if (path.startsWith("/_next/")) return true;
  if (path.startsWith("/__next")) return true;
  if (path.startsWith("/opengraph-image")) return true;
  if (path.startsWith("/twitter-image")) return true;
  return false;
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = barePath(url.pathname);

  if (path === "/" && url.searchParams.get("lang") === "en") {
    url.pathname = "/en";
    url.searchParams.delete("lang");
    return NextResponse.redirect(url, 301);
  }

  if (!isAllowed(url.pathname)) {
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", path === "/en" ? "en" : "el");
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("x-locale", path === "/en" ? "en" : "el");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?)$).*)"],
};
