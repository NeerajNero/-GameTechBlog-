import { StaticPage } from "@/components/layout/static-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Affiliate Disclosure",
  description:
    "GameTechGuides affiliate disclosure and current monetization status.",
  path: "/affiliate-disclosure"
});

export default function AffiliateDisclosurePage() {
  return (
    <StaticPage
      eyebrow="Disclosure"
      title="Affiliate disclosure"
      description="GameTechGuides may use affiliate links in the future. If affiliate links are added, they will be disclosed clearly.">
      <p>
        GameTechGuides does not currently claim active affiliate partnerships or active
        affiliate tracking on the site.
      </p>
      <p>
        GameTechGuides may use affiliate links in the future. If affiliate links are
        added, articles containing them should disclose that clearly near the relevant
        recommendations.
      </p>
      <p>
        An affiliate link may earn a commission at no extra cost to the reader. Product
        recommendations should still be based on practical usefulness, fit, and clear
        tradeoffs.
      </p>
    </StaticPage>
  );
}
