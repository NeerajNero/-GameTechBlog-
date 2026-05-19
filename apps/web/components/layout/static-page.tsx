import type { ReactNode } from "react";

export function StaticPage({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-slate-200 pb-8">
        <p className="text-sm font-black uppercase tracking-wide text-circuit">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-ink">{title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
      </header>
      <div className="article-body pt-8">{children}</div>
    </article>
  );
}
