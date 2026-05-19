import { StaticPage } from "@/components/layout/static-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Read the current privacy posture for GameTechBlog, including what is not collected in the MVP.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <StaticPage
      eyebrow="Privacy"
      title="Privacy policy"
      description="This MVP keeps the site simple and does not add user accounts, analytics, ads, comments, or payment features.">
      <p>
        GameTechBlog currently publishes static content and does not include user
        accounts, comments, newsletter signup, payment flows, analytics scripts, ad
        scripts, or affiliate tracking scripts.
      </p>
      <p>
        The hosting platform or CDN may process standard request logs such as IP
        address, user agent, requested URL, and timestamp to operate and secure the
        website.
      </p>
      <p>
        This policy should be updated before adding analytics, advertising, affiliate
        tools, forms, newsletter capture, accounts, or any other feature that collects
        additional reader data.
      </p>
    </StaticPage>
  );
}
