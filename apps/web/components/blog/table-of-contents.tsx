import type { TocHeading } from "@/lib/content/toc";

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className="mt-4">
      <ul className="space-y-2 text-sm leading-6">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : undefined}>
            <a
              href={`#${heading.id}`}
              className="block text-slate-600 transition hover:text-circuit"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
