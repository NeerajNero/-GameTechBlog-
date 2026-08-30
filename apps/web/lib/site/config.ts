import { siteUrl } from "@/lib/seo/urls";

export const siteConfig = {
  name: "GameTechGuides",
  description:
    "Practical gaming and tech guides for PC, console, streaming, and hardware decisions.",
  url: siteUrl,
  author: "Neeraj Kumar Sharma",
  authorType: "Person",
  authorBio:
    "Software engineer and lifelong gamer writing hands-on guides from real setups: PC, PS5, Xbox, and a stubbornly alive PS Vita. Everything on this site comes from gear I actually own and games I actually play.",
  // Add or update profile URLs here; empty strings are ignored everywhere they are used.
  socials: {
    github: "https://github.com/NeerajNero",
    twitter: "",
    youtube: "",
    instagram: ""
  },
  logoWide: "/brand/logo-wide.png",
  logoIcon: "/brand/logo-icon.png",
  defaultOgImage: "/images/og-default.jpg"
};

export function getSocialLinks(): Array<{ label: string; href: string }> {
  return Object.entries(siteConfig.socials)
    .filter(([, href]) => href.length > 0)
    .map(([key, href]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      href
    }));
}
