# Pre-Launch Review Report

## Scope

Reviewed the current static blog app and workflow docs before deployment. No deployment was performed.

Reviewed areas:

- README and context docs.
- Command map.
- Web package and Next.js config.
- Site config, SEO URL helpers, metadata helpers, structured data helpers.
- Root layout, sitemap, robots.
- Trust and policy pages.
- Homepage, article index, article detail, category pages, tag pages.
- MDX frontmatter for all current articles.

## Issues Found

| Severity | Issue | Status |
| --- | --- | --- |
| Blocker | `/contact` still uses a placeholder because no public contact email/channel is finalized. | Must be updated before public launch. |
| Blocker | Vercel project, production domain, and production `NEXT_PUBLIC_SITE_URL` are not configured yet. | Must be completed before public launch. |
| Blocker | Search Console is not configured because the production domain is not live yet. | Do after domain launch. |
| Warning | Site-level default OG image path is configured, but no real local fallback file exists. | App safely suppresses missing local image metadata; optional asset pass can add a real fallback later. |
| Warning | Production-indexing detection could treat a non-Vercel production build with a configured site URL as indexable. | Kept for non-Vercel production support, but changed Vercel behavior so preview deployments stay noindex when `VERCEL_ENV` is present. |
| Warning | Some workflow docs still referenced old repo-local article image paths. | Fixed to reflect manual Cloudinary delivery workflow. |

## Fixes Made

- Updated README current status and publishing flow.
- Updated command map with the Cloudinary content workflow and pre-launch smoke URLs.
- Updated architecture/content workflow docs to remove stale RSS and repo-local article image assumptions.
- Added deployment docs for Vercel launch, domain setup, and environment variables.
- Updated current status and project map with launch blockers and deployment docs.
- Tightened `isProductionSite` so Vercel preview deployments remain non-indexable even if a site URL is configured outside Production.

## Scope Guard

No app features were added. No packages were installed. No backend, database, auth, CMS, Docker, ads, analytics, affiliate links, RSS, comments, or user accounts were added.

## Verification

Command results:

```bash
pnpm --dir apps/web lint       # passed
pnpm --dir apps/web typecheck  # passed
pnpm --dir apps/web build      # passed
```

Smoke checks on `http://127.0.0.1:3002`:

```text
/                                                     200
/articles                                             200
/articles/elden-ring-beginner-tips-first-time-souls-players 200
/categories                                           200
/categories/gaming-guides                             200
/tags                                                 200
/tags/elden-ring                                      200
/about                                                200
/contact                                              200
/privacy-policy                                       200
/sitemap.xml                                          200
/robots.txt                                           200
```

Invalid taxonomy smoke checks:

```text
/categories/not-real-category                         404
/tags/not-real-tag                                    404
```

## SEO Inspection

- Article page rendered `BlogPosting` JSON-LD.
- Article page rendered `BreadcrumbList` JSON-LD.
- JSON-LD payloads did not include `undefined` or `null` fake values.
- Article canonical rendered as `http://localhost:3000/articles/elden-ring-beginner-tips-first-time-souls-players` in local development.
- Local/non-production robots metadata rendered `noindex, nofollow`.
- Article Open Graph/Twitter image metadata used the valid Cloudinary cover image.
- Sitemap includes article, category, and tag routes.
- Robots output allows crawling and points to `/sitemap.xml`.

## Remaining Launch Blockers

- Replace `/contact` placeholder with the final public contact email or contact channel.
- Create/configure Vercel project.
- Connect custom domain.
- Set Vercel Production `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
- Redeploy production and verify canonical/sitemap/robots output on the final domain.
- Configure Google Search Console and submit the sitemap after launch.
