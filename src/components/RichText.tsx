interface Props {
  text?: string | null;
  className?: string;
}

/** Renders multi-line text as paragraphs, splitting on blank lines. */
export function RichText({ text, className = "" }: Props) {
  if (!text) return null;
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return null;
  return (
    <div className={`space-y-4 text-foreground leading-relaxed ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">
          {p}
        </p>
      ))}
    </div>
  );
}
