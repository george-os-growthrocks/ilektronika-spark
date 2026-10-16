const LINKS: Record<string, string> = {
  "Escrow.com": "https://www.escrow.com",
  Sedo: "https://sedo.com",
};

export function LinkedText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(Escrow\.com|Sedo)/g);
  return (
    <>
      {parts.map((part, index) => {
        const href = LINKS[part];
        if (!href) return <span key={index}>{part}</span>;
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              className ??
              "font-semibold text-primary underline decoration-primary/30 underline-offset-4"
            }
          >
            {part}
          </a>
        );
      })}
    </>
  );
}
