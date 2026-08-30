import Link from "next/link";
import { getSocialLinks, siteConfig } from "@/lib/site/config";

function authorInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AuthorBio() {
  const socialLinks = getSocialLinks();

  return (
    <section
      aria-label="About the author"
      className="mt-12 rounded-xl border border-slate-200 bg-white p-6 shadow-soft"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-circuit/10 text-lg font-black text-circuit"
        >
          {authorInitials(siteConfig.author)}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Written by
          </p>
          <p className="text-lg font-black text-ink">{siteConfig.author}</p>
          <p className="text-sm leading-6 text-slate-600">{siteConfig.authorBio}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-sm font-bold">
            <Link href="/about" className="text-circuit transition hover:text-ink">
              More about this site
            </Link>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                rel="me noopener noreferrer"
                target="_blank"
                className="text-circuit transition hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
