# Forza Horizon 6 Publish Report

## Published File

- `apps/web/content/articles/forza-horizon-6-after-10-hours-racing-heaven.mdx`

## Publish Status

- `draft: false`
- Cover image URL unchanged.
- Inline screenshot URLs unchanged.
- Facts remain cautious and framed as early hands-on impressions.

## Verification Commands

Passed:

- `pnpm --dir apps/web lint`
- `pnpm --dir apps/web typecheck`
- `pnpm --dir apps/web build`
- `NEXT_PUBLIC_SITE_URL=https://gametechguides.com VERCEL_ENV=production pnpm --dir apps/web build`

## Smoke Checks

Production build generated:

- `/articles`
- `/articles/forza-horizon-6-after-10-hours-racing-heaven`
- `/categories`
- `/categories/gaming-reviews`
- `/tags`
- `/tags/forza-horizon-6`
- `/tags/game-pass`
- `/tags/open-world`
- `/tags/pc-gaming`
- `/tags/racing-games`
- `/tags/xbox`
- `/tags/japan`
- `/sitemap.xml`

## Listing And Sitemap Inspection

- Article appears on `/articles`.
- Article appears under `/categories/gaming-reviews`.
- Article appears on relevant tag pages, including `/tags/forza-horizon-6` and `/tags/game-pass`.
- Sitemap includes:
  - `https://gametechguides.com/articles/forza-horizon-6-after-10-hours-racing-heaven`
  - `https://gametechguides.com/categories/gaming-reviews`
  - relevant tag URLs.

## Image Inspection

All Cloudinary image URLs returned `HTTP 200`:

- Cover image: `https://res.cloudinary.com/dmnkwzic2/image/upload/f_auto,q_auto,c_limit,w_1600/v1779851430/cover-image_rrkum8.png`
- Supra screenshot: `https://res.cloudinary.com/dmnkwzic2/image/upload/f_auto,q_auto,c_limit,w_1400/v1779851026/supra_qb8l9e.jpg`
- RAM screenshot: `https://res.cloudinary.com/dmnkwzic2/image/upload/f_auto,q_auto,c_limit,w_1400/v1779851026/ram_eduvua.jpg`
- Taycan screenshot: `https://res.cloudinary.com/dmnkwzic2/image/upload/f_auto,q_auto,c_limit,w_1400/v1779851026/taycan_nrtifu.jpg`

The built article HTML contains the cover image and all inline screenshot images.

## SEO And JSON-LD Inspection

- Canonical URL uses `https://gametechguides.com/articles/forza-horizon-6-after-10-hours-racing-heaven`.
- Open Graph URL uses `https://gametechguides.com/articles/forza-horizon-6-after-10-hours-racing-heaven`.
- Open Graph image uses the Cloudinary cover image.
- BlogPosting JSON-LD includes the cover image.
- BlogPosting JSON-LD and BreadcrumbList JSON-LD contain no `null` or `undefined` values.
- Production build emits `index, follow`.

## Issues And Deviations

- During preview, the tag label was changed from `PC Gaming` to `PC gaming` to match the existing taxonomy and avoid a duplicate `pc-gaming` slug.
- No app code changes were made during this publish pass.
- No packages were added.
- No unsupported technical/performance claims, piracy links, ads, analytics, backend, database, auth, CMS, affiliate links, or RSS changes were added.

## Result

The article is ready for deployment/publish through the normal site deployment flow.
