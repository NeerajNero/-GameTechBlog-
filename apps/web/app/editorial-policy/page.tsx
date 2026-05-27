import { StaticPage } from "@/components/layout/static-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Editorial Policy",
  description:
    "How GameTechGuides approaches practical gaming and tech guides, updates, and corrections.",
  path: "/editorial-policy"
});

export default function EditorialPolicyPage() {
  return (
    <StaticPage
      eyebrow="Editorial"
      title="Editorial policy"
      description="The site aims to publish practical gaming and tech guidance with clear tradeoffs and honest limitations.">
      <p>
        GameTechGuides articles should explain who the advice is for, what problem it
        solves, and what tradeoffs readers should consider.
      </p>
      <p>
        Buying guides, setup notes, and hardware explainers should avoid hype, mention
        drawbacks where relevant, and include India-specific context when pricing,
        availability, thermals, dust, or internet quality affect the recommendation.
      </p>
      <p>
        Hands-on impressions and personal opinion articles should be labeled clearly.
        Speculation, rumors, or unconfirmed details should be marked as such and kept
        separate from confirmed facts.
      </p>
      <p>
        Some drafting, editing, formatting, or research organization may be AI-assisted,
        but content should be reviewed before publishing for clarity, usefulness, and
        factual caution.
      </p>
      <p>
        Meaningful updates should change the article&apos;s updated date. Corrections
        should be made when factual errors, outdated steps, or misleading claims are
        found. Sponsored or affiliate relationships must be disclosed clearly if they
        are added in the future.
      </p>
    </StaticPage>
  );
}
