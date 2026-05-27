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
        Articles are provided for general information and personal decision support.
        They are not a guarantee of pricing, stock, compatibility, performance,
        availability, or results.
      </p>
      <p>
        Before buying hardware or changing system settings, verify compatibility with
        your device, region, warranty terms, and current software version.
      </p>
      <p>
        Gaming and tech recommendations may include opinion, hands-on impressions, and
        time-sensitive information. Details can change after publication, and readers
        are responsible for final purchase and setup decisions.
      </p>
      <p>
        GameTechGuides does not support piracy, cracked software, unauthorized
        downloads, or instructions for bypassing platform rules.
      </p>
    </StaticPage>
  );
}
