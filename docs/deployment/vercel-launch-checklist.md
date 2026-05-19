# Vercel Launch Checklist

Use this checklist before the first public deployment of the gaming-tech blog.

## Pre-Launch Requirements

- GitHub repository exists and contains the latest committed work.
- `pnpm-lock.yaml` is committed.
- Local checks pass:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

- Final public contact email or contact channel is added to `/contact`.
- Final production domain is chosen.
- `NEXT_PUBLIC_SITE_URL` is ready to set to the final HTTPS domain.
- Policy pages have been reviewed for the final contact/domain details.

## Recommended Vercel Settings

Use this setup first:

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Root Directory | `apps/web` |
| Install Command | `pnpm install` |
| Build Command | `pnpm build` |
| Output Directory | Leave default / `.next` |
| Environment Variable | `NEXT_PUBLIC_SITE_URL=https://your-final-domain.com` |

Because this repo is a pnpm workspace with the lockfile at the repository root, use this fallback if Vercel has workspace or lockfile detection issues:

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Root Directory | repository root |
| Install Command | `pnpm install` |
| Build Command | `pnpm --dir apps/web build` |
| Output Directory | `apps/web/.next` |
| Environment Variable | `NEXT_PUBLIC_SITE_URL=https://your-final-domain.com` |

Do not set fake production domains. Use the final custom domain once selected.

## Environment Behavior

- Local development falls back to `http://localhost:3000`.
- Preview deployments should remain noindex through metadata robots behavior.
- Production deployments should be indexable only after `NEXT_PUBLIC_SITE_URL` is set to the final production domain.
- `robots.txt` should allow crawling and point to the sitemap in production.
- Do not use `robots.txt` to noindex preview or non-production pages.

## Deployment Flow

```text
local verification -> GitHub push -> Vercel production deployment -> custom domain -> Search Console -> AdSense later
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

- Canonical URL uses the final production domain.
- Article JSON-LD exists and has no `undefined` or `null` fake values.
- Breadcrumb JSON-LD exists.
- Open Graph/Twitter image values use valid Cloudinary images where article covers exist.
- Production pages do not include noindex metadata.

## After Launch

- Add the production domain property in Google Search Console.
- Submit `https://your-final-domain.com/sitemap.xml`.
- Validate a sample article with Google Rich Results Test.
- Defer AdSense until the site has enough original, useful content and policy pages are final.
