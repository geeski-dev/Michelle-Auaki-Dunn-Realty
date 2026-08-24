type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** 'light' text for use on dark section backgrounds; 'dark' (default) for light backgrounds. */
  tone?: 'light' | 'dark';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'dark',
}: SectionHeadingProps) {
  const titleColor = tone === 'light' ? 'text-white' : 'text-navy-900';
  const descriptionColor = tone === 'light' ? 'text-sand-100' : 'text-ink-700';

  return (
    <div className="max-w-prose">
      {eyebrow && (
        <p className="text-seaglass-400 mb-2 text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl sm:text-4xl ${titleColor}`}>{title}</h2>
      {description && <p className={`mt-3 text-lg ${descriptionColor}`}>{description}</p>}
    </div>
  );
}
