# Monetization Plan

## Strategy

Monetization should follow content quality and traffic, not lead production work. The current objective is a trustworthy content base with clear SEO structure and useful articles.

## Phase 1: Readiness

- Publish original, useful articles.
- Add About, Contact, Privacy Policy, and Affiliate Disclosure pages.
- Keep article layouts clean and readable.
- Avoid excessive ads or affiliate links early.
- Build internal links and category depth.

## Phase 2: Affiliate Links

Good affiliate candidates:

- SSDs.
- Gaming laptops.
- Controllers.
- Monitors.
- Routers.
- Cooling pads.
- Headsets, mics, webcams.
- Handhelds and console accessories.

Rules:

- Add clear affiliate disclosure before affiliate links go live.
- Prefer useful recommendations over link stuffing.
- Keep product tables updated.
- Mention Indian pricing and availability where relevant.
- Avoid claims that cannot be supported.

## Phase 3: AdSense

Readiness status (2026-08-18): policy pages exist, the privacy policy carries the
required Google/cookie disclosures, thin articles were expanded, `/ads.txt` and the
AdSense loader are wired env-gated behind `NEXT_PUBLIC_ADSENSE_CLIENT_ID`, and a
default OG image exists. Remaining lever before applying: more original articles.

AdSense should wait until:

- The site has enough original content (the main remaining item).
- Content is indexed.
- Pages are not thin or placeholder-heavy.

Activation and the full pre-application checklist live in the `adsense-compliance`
skill (`.claude/skills/adsense-compliance/SKILL.md`) and README "AdSense activation".

Future ad placements:

- In-article after intro or first major section.
- Mid-article between major sections.
- End-of-article before related posts.
- Sidebar only on desktop, if layout supports it.

Do not design the first version around ads. Reserve space carefully later to avoid layout shift.

## Phase 4: Personal Brand

- Add consistent author profile.
- Link to social channels.
- Reuse article insights as short posts, threads, reels, or carousels.
- Build topical authority around practical Indian gaming setups.

## Deferred

- Paid newsletter.
- Sponsored content workflow.
- Product database.
- Price tracking.
- User accounts or saved builds.
