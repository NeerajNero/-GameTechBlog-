import { StaticPage } from "@/components/layout/static-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Editorial Policy",
  description:
    "How GameTechBlog approaches practical gaming and tech guides, updates, and corrections.",
  path: "/editorial-policy"
});

export default function EditorialPolicyPage() {
  return (
    <StaticPage
      eyebrow="Editorial"
      title="Editorial policy"
      description="The site aims to publish practical gaming and tech guidance with clear tradeoffs and honest limitations.">
      <p>
        Articles should explain who the advice is for, what problem it solves, and what
        tradeoffs readers should consider.
      </p>
      <p>
        Buying and setup guides should avoid hype, mention drawbacks where relevant,
        and include India-specific context when it affects the recommendation.
      </p>
      <p>
        Meaningful updates should change the article&apos;s updated date. Corrections
        should be made when factual errors, outdated steps, or misleading claims are
        found.
      </p>
      <p>
        Sponsored or affiliate relationships must be disclosed clearly if they are
        added in the future.
      </p>
    </StaticPage>
  );
}
