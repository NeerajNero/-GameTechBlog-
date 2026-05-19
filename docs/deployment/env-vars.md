# Environment Variables

## Required For Production

| Variable | Required | Example | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | `https://your-final-domain.com` | Canonical URLs, sitemap URLs, metadataBase, robots sitemap URL, and JSON-LD URL values |

Rules:

- Set `NEXT_PUBLIC_SITE_URL` in Vercel Production before launch.
- Use the final HTTPS custom domain.
- Do not use a fake production domain.
- Do not include a trailing slash; the app normalizes trailing slashes if present.
- Production builds fail clearly when Vercel production is detected and this value is missing.

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
- `robots.txt` still allows crawling and points to the sitemap; noindex belongs in page metadata, not robots.txt.

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
