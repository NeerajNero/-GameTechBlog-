# Architecture

## MVP Architecture

This project is a content-first static blog.

```text
Next.js App Router
  -> local MDX files in content/articles/
  -> frontmatter metadata
  -> static routes, metadata, sitemap, rss, robots
  -> deployed on Vercel
```

There is no backend, database, generated SDK, auth, queue, or Docker infrastructure in the MVP.

## Target Stack

- Framework: Next.js App Router.
- Language: TypeScript.
- Styling: Tailwind CSS.
- Content: MDX files stored in the repository.
- UI: Tailwind primitives first, shadcn/ui later.
- Hosting: Vercel.
- Source control: GitHub.

## Planned Repository Shape

The app has not been scaffolded yet. The expected shape after scaffold is:

```text
app/
  (site)/
    page.tsx
    articles/
      page.tsx
      [slug]/
        page.tsx
    category/
      [slug]/
        page.tsx
    tags/
      [slug]/
        page.tsx
  layout.tsx
  sitemap.ts
  robots.ts

components/
  layout/
  article/
  seo/
  ui/

content/
  articles/
    <article-slug>.mdx

lib/
  content/
  seo/
  site/

public/
  images/
    articles/

docs/
templates/
```

Folder names can change during scaffold, but the content rule should stay stable: article source files live under `content/articles/`.

## Boundaries

- `content/articles/` owns article body content and frontmatter.
- `public/images/articles/` owns article cover and inline images.
- `lib/content/` should own file loading, frontmatter parsing, slug lookup, sorting, draft filtering, and reading-time helpers.
- `lib/seo/` should own metadata, canonical URLs, sitemap/rss helpers, and structured data builders.
- `components/article/` should own article cards, article headers, table of contents, related articles, and content rendering wrappers.
- Pages should compose content helpers and components; avoid parsing frontmatter directly inside page components.

## Content Routing

Initial routes should be simple and SEO-friendly:

| Route | Purpose |
| --- | --- |
| `/` | Homepage with featured posts, recent posts, and primary categories |
| `/articles` | Article index |
| `/articles/[slug]` | Article detail |
| `/category/[slug]` | Category landing page |
| `/tags/[slug]` | Tag landing page |
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
- `featured`
- `draft`
- `seoTitle`
- `seoDescription`

Use `templates/article-frontmatter.md` as the source of truth until application validation exists.

## Draft Handling

- `draft: true` articles must not be included in production lists, sitemap, rss, or internal related links.
- Draft behavior should be handled in the content helper layer, not repeated across pages.

## Deployment Flow

```text
local development -> GitHub -> Vercel -> custom domain -> Search Console -> AdSense later
```

## Deferred Architecture

These are intentionally out of scope for the MVP:

- Backend API.
- Database.
- CMS/admin panel.
- Auth.
- User comments.
- Payments.
- User accounts.
- Dockerized local infrastructure.
- Generated API SDK.

Revisit only after content velocity, indexing, and monetization needs justify the added operational cost.
