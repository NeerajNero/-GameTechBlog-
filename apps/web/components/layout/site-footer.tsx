import Link from "next/link";
import { siteConfig } from "@/lib/site/config";

const footerLinks = [
  { href: "/articles", label: "Articles" },
  { href: "/categories", label: "Categories" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/editorial-policy", label: "Editorial policy" },
  { href: "/affiliate-disclosure", label: "Affiliate disclosure" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
        <p className="font-semibold text-ink">{siteConfig.name}</p>
        <p>
          Practical gaming and tech notes for PC players, console owners, streamers,
          and hardware buyers.
        </p>
        <p className="text-xs text-slate-500">
          No ads, affiliate links, analytics, backend, accounts, or CMS are included in
          this MVP slice.
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 pt-2" aria-label="Footer links">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="font-semibold hover:text-circuit">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
