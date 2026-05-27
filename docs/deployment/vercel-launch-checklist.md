# Vercel Production Checklist

Use this checklist before production deployments of GameTechGuides.

## Production Requirements

- GitHub repository exists and contains the latest committed work.
- `pnpm-lock.yaml` is committed.
- Local checks pass:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

- Public contact email `gametechguides@gmail.com` is listed on `/contact`.
- Production domain is `https://gametechguides.com`.
- `NEXT_PUBLIC_SITE_URL=https://gametechguides.com` is set in Vercel Production.
- After setting or changing `NEXT_PUBLIC_SITE_URL`, trigger a fresh Production redeploy.
- Policy pages have been reviewed for current contact/domain details.

## Recommended Vercel Settings

Use this setup first:

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Root Directory | `apps/web` |
| Install Command | `pnpm install` |
| Build Command | `pnpm build` |
| Output Directory | Leave default / `.next` |
| Environment Variable | Set `NEXT_PUBLIC_SITE_URL=https://gametechguides.com` in Production; leave unset only for preview URL testing |

Because this repo is a pnpm workspace with the lockfile at the repository root, use this fallback if Vercel has workspace or lockfile detection issues:

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Root Directory | repository root |
| Install Command | `pnpm install` |
| Build Command | `pnpm --dir apps/web build` |
| Output Directory | `apps/web/.next` |
| Environment Variable | Set `NEXT_PUBLIC_SITE_URL=https://gametechguides.com` in Production; leave unset only for preview URL testing |

Do not set fake production domains. Use `https://gametechguides.com` for the final production domain.

## Environment Behavior

- Local development falls back to `http://localhost:3000`.
- Preview Vercel deployments use `https://${VERCEL_URL}` when `NEXT_PUBLIC_SITE_URL` is missing.
- Preview Vercel deployments should build successfully and remain `noindex,nofollow`.
- Preview deployments should remain noindex through metadata robots behavior.
- Production deployments should be indexable when `NEXT_PUBLIC_SITE_URL=https://gametechguides.com` is set in Production and the app is deployed.
- `NEXT_PUBLIC_SITE_URL` must win over `VERCEL_URL` for canonical, Open Graph, sitemap, robots sitemap URL, and JSON-LD URLs.
- `robots.txt` should allow crawling and point to the sitemap in production.
- Do not use `robots.txt` to noindex preview or non-production pages.

## Deployment Flow

```text
local verification -> GitHub push -> Vercel production deployment -> https://gametechguides.com -> Search Console
```

## Post-Deploy Checks

Check these URLs on the production domain:

```text
/
/articles
/articles/elden-ring-beginner-tips-first-time-souls-players
/categories
/categories/gaming-guides
/tags
/tags/elden-ring
/about
/contact
/privacy-policy
/sitemap.xml
/robots.txt
```

Also inspect one article page source:

- Temporary deployment canonical URLs use the generated Vercel URL and pages remain noindex.
- Final launch canonical URLs use `https://gametechguides.com`.
- Article JSON-LD exists and has no `undefined` or `null` fake values.
- Breadcrumb JSON-LD exists.
- Open Graph/Twitter image values use valid Cloudinary images where article covers exist.
- Preview deployment pages include noindex metadata.
- Production pages do not include noindex metadata after `NEXT_PUBLIC_SITE_URL` is set.

## Ongoing Production SEO

- Confirm the production domain property in Google Search Console.
- Submit `https://gametechguides.com/sitemap.xml`.
- Validate a sample article with Google Rich Results Test.
- Defer AdSense until the site has enough original, useful content and policy pages are final.
