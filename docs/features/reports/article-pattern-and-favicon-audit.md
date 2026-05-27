# Article Pattern And Favicon Audit

Date: 2026-05-27

## Scope

Finalized future article pattern documentation for the scan-friendly GameTechGuides article format and audited/fixed favicon compatibility for Google Search visibility. No article content, routes, ads, analytics, affiliate links, backend, database, auth, CMS, Docker, or RSS work was added.

## Article Pattern Docs Updated

- `templates/article-frontmatter.md`
- `templates/article-seo-checklist.md`
- `templates/article-brief.md`
- `docs/content-site-patterns.md`
- `docs/seo-content-patterns.md`
- `docs/seo-checklist.md`
- `docs/command-map.md`
- `docs/architecture.md`
- `docs/context/current-status.md`
- `docs/context/project-map.md`

Future articles should generally follow this structure:

1. Title and frontmatter.
2. Short intro.
3. `ArticleQuickTake`.
4. Main visible summary, argument, or recommendation.
5. `ArticleImage` for screenshots/media when relevant.
6. `ArticleReadMore` for deeper optional details.
7. `ArticleVerdict` for reviews, opinions, or impressions.
8. Related/internal links where natural.

Guidance added:

- Use `ArticleQuickTake` near the top for most articles.
- Use `ArticleHighlight` sparingly for important short phrases.
- Use `ArticlePullQuote` at most once per article.
- Use `ArticleImage` for screenshots with caption and credit.
- Use `ArticleReadMore` only for deeper details, caveats, or optional context.
- Use `ArticleVerdict` for reviews, opinions, and impressions.
- Do not hide the entire article behind collapsible sections.
- Keep enough useful content visible.
- Avoid overusing highlights, pull quotes, or collapsibles.
- Keep articles human, helpful, and not thin.

## Favicon Current State

Before this audit:

- `apps/web/app/icon.png` existed and was square: 1254 x 1254 PNG.
- `apps/web/public/brand/logo-icon.png` existed and was square: 1254 x 1254 PNG.
- `apps/web/app/apple-icon.png` was missing.
- `apps/web/public/favicon.ico` was missing.
- Metadata pointed shortcut/icon links at `/icon.png`.

## Favicon Changes Made

- Created `apps/web/public/favicon.ico` from the existing logo icon.
- Created `apps/web/app/apple-icon.png` as a 180 x 180 PNG from the existing logo icon.
- Updated `apps/web/app/layout.tsx` metadata icons:
  - `icon`: `/favicon.ico` and `/icon.png`
  - `shortcut`: `/favicon.ico`
  - `apple`: `/apple-icon.png`

Stable icon paths now available:

- `/favicon.ico`
- `/icon.png`
- `/apple-icon.png`

## Verification

- `pnpm --dir apps/web lint` passed.
- `pnpm --dir apps/web typecheck` passed.
- `NEXT_PUBLIC_SITE_URL=https://gametechguides.com VERCEL_ENV=production pnpm --dir apps/web build` passed.
- `pnpm --dir apps/web build` passed.

Smoke checks:

- Local production server returned `200` for `/`.
- Local production server returned `200` for `/icon.png`.
- Local production server returned `200` for `/favicon.ico`.
- Local production server returned `200` for `/articles/forza-horizon-6-after-10-hours-racing-heaven`.
- Homepage source includes `/favicon.ico`, `/icon.png`, and `/apple-icon.png`.
- Robots output allows `/` and does not block icon/favicon paths.
- Header still uses the GameTechGuides logo icon.
- Article pattern components still build.
- Forza article build output still includes quick take, native read-more sections, verdict block, and ArticleImage screenshots.
- Article JSON-LD parses with no `undefined` or `null` values.
- Production-environment build output uses `https://gametechguides.com` for canonical/OG URLs and JSON-LD URLs.

## Google Favicon Notes

- Google may take several days to several weeks to update a favicon in Search after deployment.
- Favicon display in Google Search is not guaranteed, even with a valid favicon.
- After deployment, request indexing for the homepage in Google Search Console.
- Keep `/favicon.ico` stable and avoid changing the icon URL repeatedly while Google recrawls.

## Remaining Manual Steps

1. Deploy the favicon and metadata changes to production.
2. Confirm live source on `https://gametechguides.com/` includes `/favicon.ico`, `/icon.png`, and `/apple-icon.png`.
3. Open `https://gametechguides.com/favicon.ico` and confirm it returns `200`.
4. Request indexing for the homepage in Google Search Console.
5. Wait for Google to recrawl and refresh the Search result favicon.
