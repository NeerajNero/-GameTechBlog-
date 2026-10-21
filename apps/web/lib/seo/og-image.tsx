import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site/config";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

function titleFontSize(title: string): number {
  if (title.length > 90) {
    return 44;
  }

  if (title.length > 60) {
    return 52;
  }

  if (title.length > 36) {
    return 60;
  }

  return 72;
}

/**
 * Renders a 1200x630 social card in the site palette: dark ink background,
 * circuit-teal eyebrow pill, wrapped title, and site name footer. Mirrors the
 * look of public/images/og-default.jpg so generated and static cards match.
 */
export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 0",
          background: "linear-gradient(180deg, #0f172a 0%, #111827 55%, #134e4a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              backgroundColor: "#0f766e",
              color: "#5eead4",
              borderRadius: 10,
              padding: "12px 20px",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase"
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              maxWidth: 1040,
              fontSize: titleFontSize(title),
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: -1
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: 40,
              fontSize: 30,
              fontWeight: 700,
              color: "#cbd5e1"
            }}
          >
            <span style={{ color: "#5eead4" }}>GameTech</span>
            <span>Guides</span>
            <span style={{ margin: "0 18px", color: "#475569" }}>·</span>
            <span style={{ fontWeight: 400 }}>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
          </div>
          <div style={{ display: "flex", height: 14, width: "100%" }}>
            <div style={{ width: "25%", backgroundColor: "#dc2626" }} />
            <div style={{ width: "75%", backgroundColor: "#0f766e" }} />
          </div>
        </div>
      </div>
    ),
    ogImageSize
  );
}
