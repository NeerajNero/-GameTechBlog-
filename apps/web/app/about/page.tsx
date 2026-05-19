import { StaticPage } from "@/components/layout/static-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn what GameTechBlog covers: practical gaming guides, hardware setup advice, and tech notes for everyday players.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <StaticPage
      eyebrow="About"
      title="Practical gaming and tech guidance"
      description="GameTechBlog is a content-first site for players who want useful setup advice without hype.">
      <p>
        GameTechBlog focuses on PC gaming, console gaming, streaming setups, routers,
        SSDs, controllers, monitors, gaming laptops, cooling, and practical hardware
        choices.
      </p>
      <p>
        The site is written for readers who want clear tradeoffs, setup notes, and
        buying context before changing settings or choosing gear.
      </p>
      <p>
        Indian gamer use cases are a core focus, including thermals, dust, internet
        quality, pricing, availability, and space constraints.
      </p>
    </StaticPage>
  );
}
