# Environment Variables

## Required Before Final Public Launch

| Variable | Required | Example | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes before final domain launch | `https://your-final-domain.com` | Canonical URLs, sitemap URLs, metadataBase, robots sitemap URL, and JSON-LD URL values |

Rules:

- A temporary Vercel deployment can build without `NEXT_PUBLIC_SITE_URL`.
- When `NEXT_PUBLIC_SITE_URL` is missing, the app uses `https://${VERCEL_URL}` on Vercel or `http://localhost:3000` locally.
- Missing `NEXT_PUBLIC_SITE_URL` keeps pages `noindex,nofollow`.
- Set `NEXT_PUBLIC_SITE_URL` in Vercel Production before the final public/domain launch.
- Use the final HTTPS custom domain.
- Do not use a fake production domain.
- Do not include a trailing slash; the app normalizes trailing slashes if present.
- Production indexing is enabled only when `VERCEL_ENV=production` and `NEXT_PUBLIC_SITE_URL` is set.

## Local Development

The app falls back to:

```text
http://localhost:3000
```

Optional local override:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Preview Deployments

- Preview deployments should remain noindex through metadata robots behavior.
- Preview deployments remain noindex even if `NEXT_PUBLIC_SITE_URL` is present.
- `robots.txt` still allows crawling and points to the sitemap; noindex belongs in page metadata, not robots.txt.

## Temporary Vercel URL

No custom domain has been purchased yet. It is acceptable to deploy to the generated Vercel URL first for testing.

Expected temporary behavior:

- Build succeeds.
- Canonical, sitemap, robots, and JSON-LD URLs use the generated Vercel URL when available.
- Pages remain `noindex,nofollow`.
- Search Console and AdSense stay deferred.

## Not Needed In MVP

Do not add these for the current static blog MVP:

- `CLOUDINARY_API_SECRET`
- Cloudinary upload preset variables
- Analytics IDs
- AdSense publisher IDs
- Affiliate network credentials
- Database URLs
- Auth secrets
- CMS tokens
