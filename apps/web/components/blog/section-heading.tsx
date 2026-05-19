import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  level = 2
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl space-y-2">
        {eyebrow ? (
          <p className="text-sm font-black uppercase tracking-wide text-pulse">
            {eyebrow}
          </p>
        ) : null}
        <Heading className="text-2xl font-black text-ink sm:text-3xl">{title}</Heading>
        {description ? <p className="leading-7 text-slate-600">{description}</p> : null}
      </div>
      {href && linkLabel ? (
        <Link href={href} className="text-sm font-bold text-circuit hover:text-ink">
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
