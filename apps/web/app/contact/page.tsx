import { StaticPage } from "@/components/layout/static-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact GameTechGuides for corrections, article suggestions, and collaboration queries.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <StaticPage
      eyebrow="Contact"
      title="Corrections, ideas, and collaboration"
      description="Use this page for article corrections, topic ideas, and collaboration queries.">
      <p>
        For corrections, article suggestions, and collaboration queries, email{" "}
        <a className="font-bold text-circuit" href="mailto:gametechguides@gmail.com">
          gametechguides@gmail.com
        </a>
        .
      </p>
      <p>
        Good reasons to get in touch include factual corrections, outdated product
        details, article suggestions, collaboration queries, and practical gaming setup
        questions that could become future guides.
      </p>
      <p>
        Please include the article URL and a short explanation when reporting a
        correction.
      </p>
    </StaticPage>
  );
}
