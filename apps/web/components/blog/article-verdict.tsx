import type { ReactNode } from "react";

export function ArticleVerdict({
  title = "Verdict",
  children
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-10 overflow-hidden rounded-xl border border-ink/10 bg-ink text-white shadow-soft">
      <div className="border-b border-white/10 bg-white/5 px-5 py-3">
        <p className="text-xs font-black uppercase tracking-wide text-circuit">{title}</p>
      </div>
      <div className="article-verdict-content px-5 py-5 text-lg font-semibold leading-8 text-white/90">
        {children}
      </div>
    </aside>
  );
}
