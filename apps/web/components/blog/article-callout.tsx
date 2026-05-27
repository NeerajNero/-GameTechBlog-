import type { ReactNode } from "react";

export function ArticleCallout({
  title = "Note",
  children
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-8 rounded-xl border border-circuit/20 bg-circuit/5 p-5">
      <p className="text-xs font-black uppercase tracking-wide text-circuit">{title}</p>
      <div className="mt-3 text-base leading-7 text-slate-700">{children}</div>
    </aside>
  );
}
