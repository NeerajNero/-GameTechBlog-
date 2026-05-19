# Vercel Pre-Domain Deployment Fix

## Root Cause

`apps/web/lib/seo/urls.ts` hard-threw when `VERCEL_ENV=production` and `NEXT_PUBLIC_SITE_URL` was missing. That blocked temporary Vercel deployments before a custom domain existed and caused page-data generation to fail for `/robots.txt`.

## Fix

- Replaced the hard build-time error with safe launch-state helpers.
- Added fallback URL resolution:
  - `NEXT_PUBLIC_SITE_URL` when configured.
  - `https://${VERCEL_URL}` when Vercel provides a temporary deployment URL.
  - `http://localhost:3000` locally.
- Kept metadata `noindex,nofollow` unless both are true:
  - `VERCEL_ENV=production`
  - `NEXT_PUBLIC_SITE_URL` is set
- Kept preview deployments `noindex,nofollow` even if a site URL exists.
- Left robots and sitemap generation safe through the existing absolute URL helper.

## Behavior Before

- Vercel production build without `NEXT_PUBLIC_SITE_URL` failed.
- `/robots.txt` page-data generation could fail because URL resolution threw.
- Temporary deployment before domain purchase was blocked.

## Behavior After

- Temporary Vercel deployments build without `NEXT_PUBLIC_SITE_URL`.
- Temporary Vercel deployments use `VERCEL_URL` when available.
- Temporary and preview deployments remain `noindex,nofollow`.
- Final production/domain launch becomes indexable only after `NEXT_PUBLIC_SITE_URL` is set.
- No fake production domain is required.

## Verification

Command results:

```bash
pnpm --dir apps/web lint                                      # passed
pnpm --dir apps/web typecheck                                 # passed
pnpm --dir apps/web build                                     # passed
VERCEL_ENV=production pnpm --dir apps/web build               # passed
VERCEL_ENV=preview pnpm --dir apps/web build                  # passed
NEXT_PUBLIC_SITE_URL=http://localhost:3000 pnpm --dir apps/web build # passed
VERCEL_ENV=production NEXT_PUBLIC_SITE_URL=http://localhost:3000 pnpm --dir apps/web build # passed
```

Helper inspection:

- `VERCEL_ENV=production` with `VERCEL_URL` and no `NEXT_PUBLIC_SITE_URL` resolves to the temporary Vercel URL and remains non-indexable.
- `VERCEL_ENV=production` with `NEXT_PUBLIC_SITE_URL` resolves to the configured URL and becomes indexable.
- `VERCEL_ENV=preview` remains non-indexable even when `NEXT_PUBLIC_SITE_URL` exists.
- Sitemap and robots URL generation no longer throws when `NEXT_PUBLIC_SITE_URL` is missing.

## Remaining Launch Blockers

- Final public contact email or contact channel.
- Custom domain purchase and Vercel domain connection.
- Production `NEXT_PUBLIC_SITE_URL` set to the final HTTPS domain.
- Search Console setup after custom domain launch.
- AdSense deferred until enough original content exists.
