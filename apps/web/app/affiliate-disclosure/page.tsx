import { StaticPage } from "@/components/layout/static-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Affiliate Disclosure",
  description:
    "GameTechGuides affiliate disclosure and current MVP monetization status.",
  path: "/affiliate-disclosure"
});

export default function AffiliateDisclosurePage() {
  return (
    <StaticPage
      eyebrow="Disclosure"
      title="Affiliate disclosure"
      description="The current MVP does not add affiliate links unless a specific article clearly says otherwise.">
      <p>
        GameTechGuides may add affiliate links in the future. If that happens, articles
        containing affiliate links should disclose them clearly.
      </p>
      <p>
        An affiliate link may earn a commission at no extra cost to the reader. Product
        recommendations should still be based on practical usefulness, fit, and clear
        tradeoffs.
      </p>
      <p>
        This MVP does not add ad scripts, analytics scripts, or affiliate tracking
        scripts.
      </p>
    </StaticPage>
  );
}
