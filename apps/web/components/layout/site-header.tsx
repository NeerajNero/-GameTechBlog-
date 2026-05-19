import Link from "next/link";
import { siteConfig } from "@/lib/site/config";

const navItems = [
  { href: "/articles", label: "Articles" },
  { href: "/categories", label: "Categories" },
  { href: "/tags", label: "Tags" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-sm font-black text-white">
            GT
          </span>
          <span>
            <span className="block text-base font-black text-ink">{siteConfig.name}</span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">
              Gaming guides, hardware, and setup notes
            </span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
