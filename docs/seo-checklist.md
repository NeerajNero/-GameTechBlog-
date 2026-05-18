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

## Technical SEO

Implement during app scaffold:

- Canonical URLs.
- Metadata API.
- Open Graph and Twitter card images.
- `sitemap.ts`.
- `robots.ts`.
- RSS feed if practical.
- Article structured data.
- Breadcrumb structured data for article pages.

## Post-Publish

- Inspect the live Vercel page.
- Submit sitemap in Google Search Console after domain setup.
- Check indexing status for important articles.
- Update content when pricing, availability, or recommendations change.
