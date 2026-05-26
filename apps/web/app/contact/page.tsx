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
      description="Use this page as the contact path for article corrections, topic ideas, and future collaboration queries.">
      <p>
        A public contact email has not been finalized yet. Add the preferred contact
        address or form link here before the public launch.
      </p>
      <p>
        Good reasons to get in touch include factual corrections, outdated product
        details, article suggestions, and practical gaming setup questions.
      </p>
      <p>
        Please include the article URL and a short explanation when reporting a
        correction.
      </p>
    </StaticPage>
  );
}
