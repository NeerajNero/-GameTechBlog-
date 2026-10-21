# Environment Variables

## Required For Production

| Variable | Required | Example | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes in Production | `https://gametechguides.com` | Canonical URLs, sitemap URLs, metadataBase, robots sitemap URL, and JSON-LD URL values |

Rules:

- A preview Vercel deployment can build without `NEXT_PUBLIC_SITE_URL`.
- When `NEXT_PUBLIC_SITE_URL` is missing, the app uses `https://${VERCEL_URL}` on Vercel or `http://localhost:3000` locally.
- Missing `NEXT_PUBLIC_SITE_URL` keeps pages `noindex,nofollow`.
- Set `NEXT_PUBLIC_SITE_URL=https://gametechguides.com` in Vercel Production.
- Use the final HTTPS custom domain: `https://gametechguides.com`.
- Do not use a fake production domain.
- Do not include a trailing slash; the app normalizes trailing slashes if present.
- Production indexing is enabled only when `VERCEL_ENV=production` and `NEXT_PUBLIC_SITE_URL` is set.

## Admin Publishing (`/admin/new`)

Server-only variables for the mobile "new article" page, which commits an MDX file
through the GitHub Contents API. Never prefix these with `NEXT_PUBLIC_`.

| Variable | Required | Example | Purpose |
| --- | --- | --- | --- |
| `ADMIN_SECRET` | yes for publishing | long random string | Bearer secret the admin page sends to `POST /api/admin/articles` |
| `GITHUB_TOKEN` | yes for publishing | fine-grained PAT | Needs `Contents: read and write` on the repo |
| `GITHUB_REPO` | yes for publishing | `NeerajNero/-GameTechBlog-` | Target repository as `owner/name` |
| `GITHUB_BRANCH` | no | `main` | Branch to commit to; defaults to `main` |
| `ADMIN_AUTHOR_NAME` | no | `Neeraj Kumar Sharma` | Frontmatter `author`; defaults to the site author |

When any required variable is missing the API returns `503` and nothing can be
published. A local template lives at `apps/web/.env.example`.

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

## Preview Vercel URLs

The production domain is `https://gametechguides.com`. Vercel preview URLs are still acceptable for deployment testing.

Expected preview behavior:

- Build succeeds.
- Canonical, sitemap, robots, and JSON-LD URLs use the generated Vercel URL when available.
- Pages remain `noindex,nofollow`.
- Search Console and AdSense checks should focus on the production domain, not preview URLs.

## Not Currently Needed

Do not add these unless a future task explicitly implements the related feature:

- `CLOUDINARY_API_SECRET`
- Cloudinary upload preset variables
- Analytics IDs
- AdSense publisher IDs
- Affiliate network credentials
- Database URLs
