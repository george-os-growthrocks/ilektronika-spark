import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold tracking-tighter text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-bold">Η σελίδα δεν βρέθηκε</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
          >
            Επιστροφή στην αρχική
          </Link>
        </div>
      </div>
    </div>
  );
}
