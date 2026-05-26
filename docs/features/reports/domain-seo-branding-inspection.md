# Domain SEO Branding Inspection

Date: 2026-05-26

## Scope

Inspected production-domain SEO and branding behavior for the expected final domain:

```text
https://gametechguides.com
```

Expected final brand:

```text
GameTechGuides
```

## Root Cause

The SEO URL/indexability helpers were already behaving correctly:

- `NEXT_PUBLIC_SITE_URL` has precedence over `VERCEL_URL`.
- Production indexability is enabled only when `VERCEL_ENV=production` and `NEXT_PUBLIC_SITE_URL` is set.
- Preview deployments remain `noindex,nofollow` even when `NEXT_PUBLIC_SITE_URL` is set.
- `robots.txt` allows crawling and points to the sitemap; it is not used as the noindex mechanism.

The confirmed code-related issue was stale branding. The shared site config and trust/policy copy still used `GameTechBlog`, which fed `application-name`, Open Graph `site_name`, header/footer display, and page text.

Live inspection confirmed the currently deployed domain still serves an older build/env state:

- `https://gametechguides.com/` redirects to `https://www.gametechguides.com/`.
- Live homepage and article source still include `noindex,nofollow`.
- Live canonical and `og:url` values still use `https://game-tech-blog-llnb0w26z-neeraj-shamas-projects.vercel.app`.
- Live `application-name` and `og:site_name` still use `GameTechBlog`.
- Live `robots.txt` points to the temporary Vercel sitemap URL.
- Live `sitemap.xml` contains temporary Vercel URLs.

Because local production builds with `NEXT_PUBLIC_SITE_URL=https://gametechguides.com` generate the correct source, the remaining live issue is environment/deployment state:

- `NEXT_PUBLIC_SITE_URL=https://gametechguides.com` is missing from Vercel Production, or
- Production was not redeployed after the env var changed, or
- `gametechguides.com` is pointing at an older Production deployment.

## Files Changed

- `apps/web/lib/site/config.ts`
- `apps/web/lib/seo/structured-data.ts`
- `apps/web/app/about/page.tsx`
- `apps/web/app/contact/page.tsx`
- `apps/web/app/privacy-policy/page.tsx`
- `apps/web/app/terms/page.tsx`
- `apps/web/app/editorial-policy/page.tsx`
- `apps/web/app/affiliate-disclosure/page.tsx`
- `apps/web/package.json`
- `package.json`
- `docs/deployment/env-vars.md`
- `docs/deployment/vercel-launch-checklist.md`
- `docs/context/current-status.md`
- `docs/context/project-map.md`
- `docs/features/reports/domain-seo-branding-inspection.md`

## Local Env Simulation Results

All requested build simulations passed after rerunning sequentially:

```bash
pnpm --dir apps/web build
VERCEL_ENV=production NEXT_PUBLIC_SITE_URL=https://gametechguides.com pnpm --dir apps/web build
VERCEL_ENV=preview NEXT_PUBLIC_SITE_URL=https://gametechguides.com pnpm --dir apps/web build
```

Observed behavior:

- No env: build passes; metadata path remains non-indexable because `VERCEL_ENV` is not `production`.
- Production with final domain: build passes; canonical, Open Graph URL, sitemap, robots sitemap URL, and JSON-LD URLs use `https://gametechguides.com`.
- Preview with final domain: build passes; generated page metadata remains `noindex,nofollow`.

Note: an initial attempt to run all three builds concurrently caused `.next` cache contention and was discarded. Sequential builds were used for the valid results.

## Verification Results

Passed:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
VERCEL_ENV=production NEXT_PUBLIC_SITE_URL=https://gametechguides.com pnpm --dir apps/web build
```

`pnpm --dir apps/web start` is not defined in `apps/web/package.json`, so the production server smoke used the equivalent command:

```bash
VERCEL_ENV=production NEXT_PUBLIC_SITE_URL=https://gametechguides.com pnpm --dir apps/web exec next start --hostname 127.0.0.1 --port 3000
```

Smoke routes returned HTTP 200:

- `/`
- `/articles`
- `/articles/total-overdose-underrated-ps2-masterpiece`
- `/categories`
- `/tags`
- `/tags/home-network`
- `/sitemap.xml`
- `/robots.txt`

## Source Inspection Results

### Live Domain Before Fix Deployment

Inspected with `curl -L`:

- `https://gametechguides.com/`
- `https://gametechguides.com/articles/total-overdose-underrated-ps2-masterpiece`
- `https://gametechguides.com/robots.txt`
- `https://gametechguides.com/sitemap.xml`

Observed live state:

- Apex redirects to `https://www.gametechguides.com/`.
- Page source is still `noindex,nofollow`.
- Canonical and `og:url` still use `https://game-tech-blog-llnb0w26z-neeraj-shamas-projects.vercel.app`.
- `application-name` and `og:site_name` still use `GameTechBlog`.
- `robots.txt` and `sitemap.xml` still reference the temporary Vercel URL.

### Local Production Build

Inspected:

- `/tags/home-network`
- `/articles/total-overdose-underrated-ps2-masterpiece`

Production source checks passed:

- No `noindex,nofollow` metadata in production with `NEXT_PUBLIC_SITE_URL`.
- Canonical URLs use `https://gametechguides.com`.
- `og:url` values use `https://gametechguides.com`.
- `application-name` is `GameTechGuides`.
- `og:site_name` is `GameTechGuides`.
- Header and footer display `GameTechGuides`.
- `sitemap.xml` contains `https://gametechguides.com` URLs.
- `robots.txt` references `https://gametechguides.com/sitemap.xml`.
- Article `BlogPosting` JSON-LD includes publisher `GameTechGuides`.
- Parsed JSON-LD contains no `undefined` or `null` values.
- No temporary Vercel URL appeared in the inspected production page sources.

Preview source check passed:

- `VERCEL_ENV=preview NEXT_PUBLIC_SITE_URL=https://gametechguides.com` generated `noindex,nofollow` metadata while still using the configured canonical domain.

## Final Vercel Setup Checklist

- Set `NEXT_PUBLIC_SITE_URL=https://gametechguides.com` in Vercel Production.
- Trigger a fresh Production redeploy after setting or changing the env var.
- Confirm `gametechguides.com` points to the latest Production deployment.
- Inspect live source on `https://gametechguides.com/tags/home-network` and one article page after redeploy.
- Submit `https://gametechguides.com/sitemap.xml` in Search Console after the final production source checks pass.
