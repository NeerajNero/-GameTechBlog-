import Link from "next/link";

export function TagList({
  tags,
  getHref
}: {
  tags: string[];
  getHref?: (tag: string) => string;
}) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Article tags">
      {tags.map((tag) => {
        const href = getHref?.(tag);
        const className =
          "rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600";

        return (
          <li key={tag}>
            {href ? (
              <Link href={href} className={`${className} hover:border-circuit/40 hover:text-circuit`}>
                {tag}
              </Link>
            ) : (
              <span className={className}>{tag}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
