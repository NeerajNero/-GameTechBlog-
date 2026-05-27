import type { ReactNode } from "react";

export function ArticleReadMore({
  title,
  children,
  defaultOpen = false
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group my-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-slate-50 px-5 py-4 text-base font-black text-ink transition hover:bg-slate-100 [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-lg leading-none text-circuit transition group-open:rotate-45"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <div className="article-read-more-content border-t border-slate-200 px-5 py-5 text-slate-700">
        {children}
      </div>
    </details>
  );
}
