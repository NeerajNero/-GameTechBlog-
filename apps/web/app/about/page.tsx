import { StaticPage } from "@/components/layout/static-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn what GameTechGuides covers: practical gaming guides, hardware setup advice, and tech notes for everyday players.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <StaticPage
      eyebrow="About"
      title="Practical gaming and tech guidance"
      description="GameTechGuides is a live gaming and tech publication for players who want useful setup advice, honest impressions, and clear upgrade context without hype.">
      <p>
        GameTechGuides covers gaming guides, gaming tech, hardware and setup notes,
        game streaming, retro and nostalgia pieces, and player-focused opinion articles.
        The goal is to help readers make better decisions before changing settings,
        buying gear, or spending time on a new game.
      </p>
      <p>
        The site is written for PC players, console owners, streamers, handheld users,
        and everyday gamers who want clear tradeoffs instead of vague recommendations.
        Topics include routers, SSDs, controllers, monitors, gaming laptops, cooling,
        cloud and remote play, and practical game setup choices.
      </p>
      <p>
        Hands-on impressions and opinion pieces are based on personal experience where
        applicable. Buying and setup advice may also consider Indian gamer realities
        such as thermals, dust, internet quality, pricing, availability, and space
        constraints.
      </p>
    </StaticPage>
  );
}
