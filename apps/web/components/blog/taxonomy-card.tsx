import Link from "next/link";

export function TaxonomyCard({
  href,
  label,
  count,
  description,
  type
}: {
  href: string;
  label: string;
  count: number;
  description?: string;
  type: "category" | "tag";
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-circuit/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-wide text-circuit">
            {type}
          </p>
          <h2 className="text-xl font-black text-ink group-hover:text-circuit">{label}</h2>
        </div>
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
          {count} {count === 1 ? "article" : "articles"}
        </span>
      </div>
      {description ? (
        <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
      ) : null}
    </Link>
  );
}
