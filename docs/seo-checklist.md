# SEO Checklist

Use this before publishing or updating an article.

## Search Intent

- Primary keyword or topic is clear.
- Article answers one main search intent.
- Audience is specific enough.
- The introduction quickly confirms the article matches the query.

## Metadata

- `title` is clear and human-readable.
- `seoTitle` is unique and within a practical search-result length.
- `description` summarizes the article for cards and listings.
- `seoDescription` is written for search results.
- `slug` is short, lowercase, and descriptive.
- `publishedAt` and `updatedAt` are accurate.
- `draft` is false only when ready to publish.

## Structure

- One H1 through the page title.
- H2 sections match major reader questions.
- H3 sections are used only when they improve scanability.
- Add comparison tables where readers need side-by-side decisions.
- Add FAQ sections only when they answer real follow-up questions.

## Internal Links

- Link to related guides.
- Link from category pages.
- Link from older relevant articles after publishing.
- Use descriptive anchor text.

## Images

- Cover image exists.
- Image filename is descriptive.
- Alt text describes the actual image and context.
- Images are compressed before commit when possible.
- Use article `coverImage` in OG/JSON-LD only if the file exists and is not a placeholder.
- Avoid broken OG or JSON-LD image URLs.
- Use a site-level fallback OG image only when an actual fallback image file exists.
- Real article cover images remain deferred to the asset pass.

## Technical SEO

Implement during the SEO foundation slice:

- Canonical URLs.
- Metadata API.
- Open Graph and Twitter card images.
- `sitemap.ts`.
- `robots.ts`.
- Article structured data.
- Breadcrumb structured data for article pages.
- Central absolute URL helper.
- Production-only indexing rules.
- Draft exclusion from sitemap and static params.
- Middleware exclusions for `robots.txt`, `sitemap.xml`, static images, and `.well-known` if middleware is added.
- Static trust/policy pages: `/about`, `/contact`, `/privacy-policy`, `/terms`, `/editorial-policy`, `/affiliate-disclosure`.
- `metadataBase` from the normalized site URL.

Deferred:

- RSS feed, until the article workflow is stable.
- Category/tag pages, until the taxonomy/design slice.

## Static Page Metadata

Each trust/policy page should have:

- title
- description
- canonical URL
- production/non-production robots behavior

## Site URL

- Use `NEXT_PUBLIC_SITE_URL` as the production canonical source.
- Normalize trailing slashes.
- Use `http://localhost:3000` as the local fallback.
- Do not hardcode a fake production domain.
- Production Vercel must set `NEXT_PUBLIC_SITE_URL` before launch.

## JSON-LD

- Article pages should render `BlogPosting` or `Article` JSON-LD.
- Article pages should render `BreadcrumbList` JSON-LD.
- JSON-LD must not include undefined, null, or fake values.
- Validate deployed pages with Google Rich Results Test later.

## Noindex

- Do not use `robots.txt` to noindex pages.
- Use metadata robots/noindex behavior for non-production deployments.
- Production `robots.txt` should allow crawling and point to sitemap.

## Post-Publish

- Inspect the live Vercel page.
- Submit sitemap in Google Search Console after domain setup.
- Check indexing status for important articles.
- Update content when pricing, availability, or recommendations change.

## SEO Implementation Docs

- Follow `docs/seo-implementation-patterns.md` when adding sitemap, robots, JSON-LD, canonical URL, or social preview behavior.
