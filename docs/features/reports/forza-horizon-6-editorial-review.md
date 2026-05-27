# Forza Horizon 6 Editorial Review

## Scope

Reviewed and lightly polished:

- `apps/web/content/articles/forza-horizon-6-after-10-hours-racing-heaven.mdx`

The article remains a draft. No publishing flag was changed.

## Editorial Changes

- Tightened the introduction so the 8.6-hour early-impressions framing is clear from the first sentence.
- Reduced repeated language around "visuals," "mind-blowing," "heaven," and "feels."
- Made the personal voice more natural by strengthening the FH3 fan context and after-work driving angle.
- Smoothed transitions between Japan atmosphere, visuals, controller driving, cars, and standout race sections.
- Kept Chaser Zero as a natural owner-experience mention without turning it into an unsupported factual claim.
- Strengthened the final verdict while keeping it clearly short of a final scored review.
- Preserved all image URLs, captions, credits, and draft frontmatter.

## Fact And Safety Review

- The article separates official facts from owner impressions.
- Official claims are limited to Japan setting, Xbox/PC availability, Game Pass availability, and over-550-car wording.
- No unsupported FPS, resolution, ray tracing, PC settings, or performance claims were added.
- No piracy, torrent, crack, ROM, or download links were added.
- Tone remains AdSense-friendly.

## Image Review

- Cover image remains a Cloudinary URL with optimization transformations.
- Inline screenshots remain owner-captured Cloudinary URLs using `ArticleImage`.
- Captions are descriptive, personal, and do not overclaim.
- Credits remain `Screenshot by site owner`.

## Publishing Notes

Before publishing:

- Confirm the article should remain `featured: true` once `draft` is switched off.
- Re-check official platform and Game Pass wording if publishing on a later date.
- Preview the page visually after publishing or in a local draft preview flow if one is added.

## Verification

Run after editorial edits:

- `pnpm --dir apps/web lint`
- `pnpm --dir apps/web typecheck`
- `pnpm --dir apps/web build`

Expected result:

- All commands pass.
- Article remains excluded from public article routes, sitemap, category pages, and tag pages while `draft: true`.
