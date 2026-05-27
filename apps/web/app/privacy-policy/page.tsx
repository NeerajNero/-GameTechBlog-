import { StaticPage } from "@/components/layout/static-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Read the privacy policy for GameTechGuides, including basic site logs, image delivery, and future feature notes.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <StaticPage
      eyebrow="Privacy"
      title="Privacy policy"
      description="GameTechGuides is a public content site. This policy explains the current privacy posture and what may change if future features are added.">
      <p>
        GameTechGuides currently publishes public gaming and tech articles. The site
        does not currently provide user accounts, comments, newsletter signup, payment
        flows, analytics scripts, ad scripts, or affiliate tracking scripts.
      </p>
      <p>
        The hosting platform or CDN may process standard request logs such as IP
        address, user agent, requested URL, and timestamp to operate and secure the
        website.
      </p>
      <p>
        Article images may be delivered through Cloudinary or local site assets. Your
        browser may request those image files when you view an article.
      </p>
      <p>
        Embedded YouTube videos, social posts, analytics, ads, affiliate tools, forms,
        newsletter capture, or accounts may be added in the future. If those features
        are added, this policy should be updated to explain what is used and why.
      </p>
    </StaticPage>
  );
}
