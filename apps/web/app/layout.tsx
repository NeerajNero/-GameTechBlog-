import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/lib/site/config";
import { isProductionIndexable, siteUrl } from "@/lib/seo/urls";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: siteConfig.logoIcon
  },
  alternates: {
    canonical: siteUrl
  },
  robots: isProductionIndexable()
    ? { index: true, follow: true }
    : { index: false, follow: false }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
