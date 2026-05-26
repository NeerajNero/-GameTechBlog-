import { StaticPage } from "@/components/layout/static-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Terms",
  description:
    "Basic terms for reading and using GameTechGuides gaming and tech guide content.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <StaticPage
      eyebrow="Terms"
      title="Terms of use"
      description="GameTechGuides content is informational and should be checked against your own hardware, software, budget, and availability.">
      <p>
        Articles are provided for general information. They are not a guarantee of
        pricing, stock, compatibility, performance, or results.
      </p>
      <p>
        Before buying hardware or changing system settings, verify compatibility with
        your device, region, warranty terms, and current software version.
      </p>
      <p>
        Game and platform details can change over time. Articles may be updated when
        meaningful corrections or new information are available.
      </p>
    </StaticPage>
  );
}
