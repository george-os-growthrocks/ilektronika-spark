import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-5xl font-semibold tracking-tight">404</h1>
        <p className="mt-3 text-muted-foreground">Αυτή η διεύθυνση δεν υπάρχει.</p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          ilektronikatsigara.gr
        </Link>
      </div>
    </div>
  );
}
