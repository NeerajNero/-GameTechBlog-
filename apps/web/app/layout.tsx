import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/lib/site/config";
import { getAdSenseClientId } from "@/lib/site/adsense";
import { getGaMeasurementId } from "@/lib/site/analytics";
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
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "1254x1254" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png"
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": "/feed.xml"
    }
  },
  robots: isProductionIndexable()
    ? { index: true, follow: true }
    : { index: false, follow: false }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const adSenseClientId = getAdSenseClientId();
  const gaMeasurementId = getGaMeasurementId();

  return (
    <html lang="en">
      <head>
        {gaMeasurementId ? (
          <>
            <Script
              id="ga-loader"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}
        {adSenseClientId ? (
          <Script
            id="adsense-loader"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
