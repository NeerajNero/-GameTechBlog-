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

- Cover image is empty until a real image exists, or points to a real Cloudinary/local public image.
- No fake Cloudinary URLs are used.
- Cloudinary article images use the manual folder pattern `gaming-tech-blog/articles/{article-slug}/...`.
- Site-level assets stay in the repo unless they are content/media assets.
- Image filename or Cloudinary public ID is descriptive.
- Alt text describes the actual image and context.
- `coverImageAlt` is present when a real cover image is used.
- `coverImageCredit` is present when the image license or source requires it.
- Images are compressed before upload or commit when possible.
- Use article `coverImage` in OG/JSON-LD only if the Cloudinary URL is valid or the local public file exists.
- Avoid broken OG or JSON-LD image URLs.
- Use a site-level fallback OG image only when an actual fallback image file exists.
- Confirm image rights before publishing: owned, licensed, public-domain, or otherwise allowed.
- Monitor Cloudinary free-plan bandwidth and transformations after launch.
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
- Follow `docs/image-handling.md` when adding Cloudinary article images or site assets.
