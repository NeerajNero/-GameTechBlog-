# Architecture

## Production Architecture

This project is a production content-first static blog at
`https://gametechguides.com`.

```text
Next.js App Router
  -> local MDX files in apps/web/content/articles/
  -> frontmatter metadata
  -> static routes, metadata, sitemap, robots
  -> deployed on Vercel
```

There is no backend, database, generated SDK, auth, queue, or Docker infrastructure
in the current production architecture.

## Target Stack

- Framework: Next.js App Router.
- Language: TypeScript.
- Styling: Tailwind CSS.
- Content: MDX files stored in the repository.
- UI: Tailwind primitives first, shadcn/ui later.
- Hosting: Vercel.
- Source control: GitHub.

## Current Repository Shape

The app is scaffolded under `apps/web/`:

```text
apps/web/
  app/
    page.tsx
    articles/
      page.tsx
      [slug]/
        page.tsx
    categories/
      page.tsx
      [category]/
        page.tsx
    tags/
      page.tsx
      [tag]/
        page.tsx
    terms/
    editorial-policy/
    affiliate-disclosure/
    sitemap.ts
    robots.ts
  components/
    layout/
    blog/
    seo/
  content/
    articles/
      <article-slug>.mdx
  lib/
    content/
    seo/
    site/
  public/
    images/
      site/

docs/
templates/
```

The content rule should stay stable: article source files live under `apps/web/content/articles/`.

## Boundaries

- `apps/web/content/articles/` owns article body content and frontmatter.
- `apps/web/public/` owns repo-managed site assets.
- Cloudinary owns manually uploaded article/media delivery assets.
- `lib/content/` should own file loading, frontmatter parsing, slug lookup, sorting, draft filtering, and reading-time helpers.
- `lib/seo/` should own metadata, canonical URLs, sitemap helpers, and structured data builders.
- `components/blog/` should own article cards, article headers, related articles, and content rendering wrappers.
- Pages should compose content helpers and components; avoid parsing frontmatter directly inside page components.

## Content Routing

Initial routes should be simple and SEO-friendly:

| Route | Purpose |
| --- | --- |
| `/` | Homepage with featured posts, recent posts, and primary categories |
| `/articles` | Article index |
| `/articles/[slug]` | Article detail |
| `/categories/[category]` | Category landing page |
| `/tags/[tag]` | Tag landing page |
| `/about` | Personal brand and site purpose |
| `/contact` | Contact and collaboration path |
| `/privacy-policy` | Required for analytics/ads readiness |
| `/affiliate-disclosure` | Required before affiliate monetization |

## Article Frontmatter Contract

Every published article should include:

- `title`
- `slug`
- `description`
- `category`
- `tags`
- `author`
- `publishedAt`
- `updatedAt`
- `coverImage`
- `coverImageAlt`
- `coverImageCredit`
- `quickTake` (optional)
- `featured`
- `draft`
- `seoTitle`
- `seoDescription`

Use `templates/article-frontmatter.md` as the source of truth until application validation exists.

Future articles should follow the scan-friendly MDX body pattern documented in
`docs/content-site-patterns.md`: short intro, `ArticleQuickTake`, visible main
value, `ArticleImage` when relevant, optional `ArticleReadMore` sections, and
`ArticleVerdict` for reviews/opinions/impressions.

## Draft Handling

- `draft: true` articles must not be included in production lists, sitemap, taxonomy pages, or internal related links.
- Draft behavior should be handled in the content helper layer, not repeated across pages.

## Deployment Flow

```text
local development -> GitHub -> Vercel -> custom domain -> Search Console -> AdSense later
```

## Deferred Architecture

These are intentionally deferred until content velocity, indexing, or monetization
needs justify the added operational cost:

- Backend API.
- Database.
- CMS/admin panel.
- Auth.
- User comments.
- Payments.
- User accounts.
- Dockerized local infrastructure.
- Generated API SDK.

Revisit only with an explicit implementation request.
