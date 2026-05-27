import type { ReactNode } from "react";

export function ArticlePullQuote({
  children,
  cite
}: {
  children: ReactNode;
  cite?: string;
}) {
  return (
    <aside className="my-10 border-y border-slate-200 py-6">
      <p className="max-w-2xl text-2xl font-black leading-snug text-ink sm:text-3xl">
        {children}
      </p>
      {cite ? (
        <p className="mt-3 text-sm font-bold uppercase tracking-wide text-slate-500">
          {cite}
        </p>
      ) : null}
    </aside>
  );
}
