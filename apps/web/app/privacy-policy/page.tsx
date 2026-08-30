import { StaticPage } from "@/components/layout/static-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How GameTechGuides handles server logs, cookies, advertising (including Google AdSense), embedded media, and your privacy choices.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <StaticPage
      eyebrow="Privacy"
      title="Privacy policy"
      description="This policy explains what data is processed when you read GameTechGuides, how cookies and advertising work on the site, and the choices you have.">
      <p>
        <strong>Last updated: August 30, 2026.</strong> GameTechGuides
        (gametechguides.com) is a public gaming and tech publication. The site does
        not require accounts, does not offer comments, and does not ask you to submit
        personal information to read articles.
      </p>

      <h2>Information collected automatically</h2>
      <p>
        Like almost every website, the hosting platform and CDN that serve
        GameTechGuides process standard request logs to operate and secure the site.
        These logs can include your IP address, browser user agent, device type,
        requested URL, referring page, and timestamp. This information is used for
        security, abuse prevention, and keeping the site online, not for building
        reader profiles.
      </p>

      <h2>Cookies</h2>
      <p>
        Cookies are small files stored by your browser. GameTechGuides itself does not
        set cookies for accounts or tracking, but third-party services used on the
        site, such as advertising partners and content delivery networks, may set
        cookies as described below. You can block or delete cookies at any time in
        your browser settings; the site remains fully readable without them.
      </p>

      <h2>Advertising and Google AdSense</h2>
      <p>
        GameTechGuides uses, or may use, Google AdSense to display advertising. The
        following disclosures apply when ads are served:
      </p>
      <p>
        Third-party vendors, including Google, use cookies to serve ads based on your
        prior visits to this website or other websites. Google&apos;s use of
        advertising cookies (such as the DoubleClick cookie) enables it and its
        partners to serve ads to you based on your visits to this site and/or other
        sites on the internet.
      </p>
      <p>
        You may opt out of personalized advertising by visiting{" "}
        <a className="font-bold text-circuit" href="https://www.google.com/settings/ads" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        . You can also opt out of some third-party vendors&apos; use of cookies for
        personalized advertising at{" "}
        <a className="font-bold text-circuit" href="https://www.aboutads.info/choices" rel="noopener noreferrer">
          www.aboutads.info/choices
        </a>
        . More detail about how Google uses information from sites that use its
        services is available at{" "}
        <a
          className="font-bold text-circuit"
          href="https://policies.google.com/technologies/partner-sites"
          rel="noopener noreferrer">
          policies.google.com/technologies/partner-sites
        </a>
        .
      </p>
      <p>
        Visitors in the European Economic Area, the United Kingdom, and Switzerland
        are shown a consent message before any personalized advertising cookies are
        used, and can choose non-personalized ads instead.
      </p>

      <h2>Images and embedded content</h2>
      <p>
        Article images may be delivered through Cloudinary or served from this
        site&apos;s own assets. When an article embeds third-party content in the
        future (for example a YouTube video or a social post), that provider may
        collect data as if you had visited its site directly, including via cookies.
        Embeds are only used where they add value to the article.
      </p>

      <h2>Analytics</h2>
      <p>
        GameTechGuides uses Google Analytics 4 to understand aggregate traffic:
        which articles are read, roughly where visitors come from, and how the site
        is discovered. Google Analytics uses cookies and similar identifiers to
        distinguish visits; it does not log full IP addresses, and the reports this
        site sees are aggregate statistics, not individual reader profiles.
      </p>
      <p>
        You can opt out of Google Analytics across all websites with the{" "}
        <a
          className="font-bold text-circuit"
          href="https://tools.google.com/dlpage/gaoptout"
          rel="noopener noreferrer">
          Google Analytics opt-out browser add-on
        </a>
        , or block its cookies in your browser settings; the site remains fully
        readable either way. How Google processes this data is described at{" "}
        <a
          className="font-bold text-circuit"
          href="https://policies.google.com/technologies/partner-sites"
          rel="noopener noreferrer">
          policies.google.com/technologies/partner-sites
        </a>
        .
      </p>

      <h2>Your rights and choices</h2>
      <p>
        Depending on where you live, including under the EU/UK GDPR and India&apos;s
        Digital Personal Data Protection Act, you may have rights to access, correct,
        or request deletion of personal data. Because GameTechGuides does not maintain
        reader accounts or its own databases of personal information, most requests
        will relate to data held by third-party services named above, but you can
        always contact the site with questions and we will help where we can.
      </p>

      <h2>Children</h2>
      <p>
        GameTechGuides publishes general-audience gaming and tech content and does not
        knowingly collect personal information from children.
      </p>

      <h2>Changes and contact</h2>
      <p>
        This policy is updated when site features change, and the date at the top
        reflects the latest revision. Questions about privacy on GameTechGuides can be
        sent to{" "}
        <a className="font-bold text-circuit" href="mailto:gametechguides@gmail.com">
          gametechguides@gmail.com
        </a>
        .
      </p>
    </StaticPage>
  );
}
