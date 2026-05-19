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
- For a temporary pre-domain deployment, no custom domain is required.
- For final public launch, final production domain is chosen.
- For final public launch, `NEXT_PUBLIC_SITE_URL` is ready to set to the final HTTPS domain.
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
| Environment Variable | Leave `NEXT_PUBLIC_SITE_URL` unset for temporary Vercel URL testing, then set it before final domain launch |

Because this repo is a pnpm workspace with the lockfile at the repository root, use this fallback if Vercel has workspace or lockfile detection issues:

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Root Directory | repository root |
| Install Command | `pnpm install` |
| Build Command | `pnpm --dir apps/web build` |
| Output Directory | `apps/web/.next` |
| Environment Variable | Leave `NEXT_PUBLIC_SITE_URL` unset for temporary Vercel URL testing, then set it before final domain launch |

Do not set fake production domains. Use the final custom domain once selected.

## Environment Behavior

- Local development falls back to `http://localhost:3000`.
- Temporary Vercel deployments use `https://${VERCEL_URL}` when `NEXT_PUBLIC_SITE_URL` is missing.
- Temporary Vercel deployments should build successfully and remain `noindex,nofollow`.
- Preview deployments should remain noindex through metadata robots behavior.
- Production deployments should be indexable only after `NEXT_PUBLIC_SITE_URL` is set to the final production domain.
- `robots.txt` should allow crawling and point to the sitemap in production.
- Do not use `robots.txt` to noindex preview or non-production pages.

## Deployment Flow

```text
local verification -> GitHub push -> Vercel production deployment -> custom domain -> Search Console -> AdSense later
```

The first Vercel deployment can use the generated Vercel URL. Treat it as a testing deployment, not the final public launch.

## Post-Deploy Checks

For temporary deployment, check these URLs on the generated Vercel URL. For final launch, check them on the production domain:

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
- Final launch canonical URLs use the final production domain.
- Article JSON-LD exists and has no `undefined` or `null` fake values.
- Breadcrumb JSON-LD exists.
- Open Graph/Twitter image values use valid Cloudinary images where article covers exist.
- Temporary deployment pages include noindex metadata.
- Final launch pages do not include noindex metadata after `NEXT_PUBLIC_SITE_URL` is set.

## After Launch

- After buying and connecting the domain, set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain and redeploy.
- Add the production domain property in Google Search Console.
- Submit `https://your-final-domain.com/sitemap.xml`.
- Validate a sample article with Google Rich Results Test.
- Defer AdSense until the site has enough original, useful content and policy pages are final.
