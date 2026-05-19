# Feature Plan

## Status

- Status: approved
- Feature slug: `taxonomy-design`
- Source stories: user request
- Classification: `docs/features/classifications/taxonomy-design.classification.md`
- Lane: normal
- Created: 2026-05-19
- Last updated: 2026-05-19

## Summary

- User-visible outcome: Readers can browse by category and tag, while the homepage, article listing, and article pages feel more complete and easier to scan.
- Business value: Better internal linking, clearer topical structure, stronger SEO crawl paths, and a more credible content-first blog experience.
- Surfaces: web routes, content helpers, SEO helpers, sitemap, layout navigation, blog UI components.

## Scope

In scope:

- `/categories`
- `/categories/[category]`
- `/tags`
- `/tags/[tag]`
- Taxonomy helpers derived from published MDX article frontmatter.
- Category descriptions.
- Draft exclusion everywhere in taxonomy output.
- Homepage polish.
- Article listing polish.
- Article detail polish.
- Header/footer navigation polish.
- Taxonomy metadata and canonical URLs.
- Sitemap updates for taxonomy routes.

Out of scope:

- Backend/database/auth/CMS/Docker.
- AdSense scripts.
- Analytics.
- Affiliate links.
- RSS.
- Comments.
- User accounts.
- Search or heavy client-side filtering.
- New structured data unless it is clearly accurate and minimal.

## Files To Create

Likely app files:

- `apps/web/app/categories/page.tsx`
- `apps/web/app/categories/[category]/page.tsx`
- `apps/web/app/tags/page.tsx`
- `apps/web/app/tags/[tag]/page.tsx`
- `apps/web/lib/content/taxonomy.ts`

Likely reusable components:

- `apps/web/components/blog/taxonomy-card.tsx`
- `apps/web/components/blog/taxonomy-list.tsx`
- `apps/web/components/blog/section-heading.tsx` if useful
- `apps/web/components/blog/related-articles.tsx` if simple

Required report after implementation:

- `docs/features/reports/taxonomy-design.implementation.md`

## Files To Modify

- `apps/web/app/page.tsx`
- `apps/web/app/articles/page.tsx`
- `apps/web/app/articles/[slug]/page.tsx`
- `apps/web/app/sitemap.ts`
- `apps/web/components/blog/article-card.tsx`
- `apps/web/components/blog/article-header.tsx`
- `apps/web/components/blog/article-list.tsx`
- `apps/web/components/blog/tag-list.tsx`
- `apps/web/components/layout/site-header.tsx`
- `apps/web/components/layout/site-footer.tsx`
- `apps/web/lib/seo/metadata.ts` if reusable taxonomy metadata helpers are needed
- `apps/web/lib/seo/urls.ts` only if route helpers are needed
- `docs/context/current-status.md`
- `docs/context/project-map.md`
- `docs/command-map.md` if verification notes change

## Route Structure

```text
/
/articles
/articles/[slug]
/categories
/categories/[category]
/tags
/tags/[tag]
```

The dynamic route param names should stay aligned with the requested route shape:

- `params.category` for `/categories/[category]`
- `params.tag` for `/tags/[tag]`

## Taxonomy Helper Design

Create `apps/web/lib/content/taxonomy.ts`.

Suggested exported types:

```ts
type TaxonomyTerm = {
  label: string;
  slug: string;
  count: number;
};

type CategoryTerm = TaxonomyTerm & {
  description: string;
};
```

Suggested exported functions:

- `getCategories()`
- `getCategoryBySlug(slug: string)`
- `getArticlesByCategorySlug(slug: string)`
- `getCategorySlugs()`
- `getTags()`
- `getTagBySlug(slug: string)`
- `getArticlesByTagSlug(slug: string)`
- `getTagSlugs()`

Implementation notes:

- Use `getPublishedArticles()` so drafts are excluded by default.
- Normalize labels for grouping with exact visible labels preserved.
- Sort categories by article count descending, then label.
- Sort tags by article count descending, then label.
- Keep helpers synchronous to match the current local-file content pipeline.

## Category Slug Strategy

- Use the existing `slugify` helper from `apps/web/lib/utils/slug.ts`.
- Slug source is the category label from MDX frontmatter.
- Preserve the original label for display.
- Detail route example:
  - Category label: `Gaming Hardware`
  - Slug: `gaming-hardware`
  - URL: `/categories/gaming-hardware`

Collision handling:

- Treat slug collisions as a content error during helper construction.
- If two distinct labels produce the same slug, throw a clear error so the content labels can be corrected before build.

Category descriptions:

- Maintain a small static map in `taxonomy.ts` for known category labels.
- Use a neutral fallback description for new categories.
- Existing sample categories should have specific descriptions:
  - `Gaming Guides`
  - `Game Streaming`
  - `Gaming Hardware`

## Tag Slug Strategy

- Use the existing `slugify` helper from `apps/web/lib/utils/slug.ts`.
- Slug source is the tag label from MDX frontmatter.
- Preserve the original label for display.
- Detail route example:
  - Tag label: `PC gaming`
  - Slug: `pc-gaming`
  - URL: `/tags/pc-gaming`

Collision handling:

- Treat slug collisions as a content error if two distinct tag labels map to the same slug.
- Keep tag labels concise in frontmatter to avoid messy URLs.

## Metadata Strategy

Use existing `createPageMetadata` where possible.

Required metadata:

- `/categories`
  - Title: `Categories`
  - Description: explain browsing gaming-tech topics by category.
  - Canonical: `/categories`
- `/categories/[category]`
  - Title: `{Category Label} Articles`
  - Description: category description plus article count if useful.
  - Canonical: `/categories/{categorySlug}`
- `/tags`
  - Title: `Tags`
  - Description: explain browsing articles by detailed topic tags.
  - Canonical: `/tags`
- `/tags/[tag]`
  - Title: `{Tag Label} Articles`
  - Description: practical article collection for the tag.
  - Canonical: `/tags/{tagSlug}`

Rules:

- Keep `metadataBase` and robots behavior through existing helper patterns.
- Use `notFound()` and minimal fallback metadata when a category/tag slug does not exist.
- Do not add fake structured data for taxonomy pages.

## Sitemap Update Plan

Modify `apps/web/app/sitemap.ts`.

Include:

- `/categories`
- `/tags`
- All category detail pages generated from published articles.
- All tag detail pages generated from published articles.

Rules:

- Exclude draft articles because taxonomy helpers use `getPublishedArticles()`.
- Use `absoluteUrl()` for all entries.
- Use conservative priorities:
  - `/categories`: `0.7`
  - `/tags`: `0.6`
  - category detail: `0.6`
  - tag detail: `0.5`
- Use `weekly` change frequency for taxonomy routes.
- Use current date for taxonomy index/detail `lastModified`, unless a simple latest-article updated date helper is added without overengineering.

## Design Component Plan

Homepage polish:

- Keep the first screen content-focused, not marketing-only.
- Improve hero layout with clear gaming-tech positioning.
- Add sections:
  - hero section
  - featured articles
  - latest articles
  - category highlights
  - guides/reviews/buying-guide callout
- Link category highlights to `/categories/[category]`.
- Keep visual style aligned with existing dark ink, circuit teal, and pulse red palette.

Article listing polish:

- Improve article cards without making them client-heavy.
- Keep category and tag chips visible.
- Keep descriptions and date metadata.
- Use server-side sorted published articles from existing helpers.
- Add links to categories/tags from chips if component changes remain simple.

Article detail polish:

- Improve reading layout and metadata block.
- Keep category and tag chips linked where useful.
- Add back links:
  - back to `/articles`
  - category link
- Add related articles if simple:
  - same category first
  - otherwise overlapping tags
  - exclude current article
  - limit to 3
- Do not add a client-side table of contents in this slice unless it is trivial and static.

Navigation polish:

- Header should include main sections only:
  - Home
  - Articles
  - Categories
  - Tags
- Footer should keep trust/policy links.
- Footer can also include Articles, Categories, and Tags if spacing remains clean.
- Avoid cluttering the header with policy links.

## Verification Commands

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
pnpm --dir apps/web dev --hostname 127.0.0.1
```

## Smoke Check URLs

Use actual generated slugs after implementation. Based on current sample content, expected checks include:

```text
/
/articles
/articles/elden-ring-beginner-tips-first-time-souls-players
/categories
/categories/gaming-guides
/categories/game-streaming
/categories/gaming-hardware
/tags
/tags/elden-ring
/tags/pc-gaming
/sitemap.xml
```

Inspect:

- Category index shows all published categories with counts.
- Category detail pages list only published articles for that category.
- Tag index shows all published tags with counts.
- Tag detail pages list only published articles for that tag.
- Unknown category/tag slugs return not found.
- Sitemap includes taxonomy routes and excludes drafts.
- Category/tag metadata includes canonical URLs.

## Risks And Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Slug collisions from labels | Wrong pages or ambiguous URLs | Throw a build-time content error for duplicate taxonomy slugs |
| Draft leakage | Unpublished content visible or indexed | Build taxonomy only from `getPublishedArticles()` |
| Overdesigned client UI | More complexity and hydration than needed | Keep taxonomy pages server-rendered and static |
| Weak category descriptions | Thin SEO pages | Add concise, practical descriptions for known categories |
| Sitemap drift | Search engines miss taxonomy routes | Update `sitemap.ts` using taxonomy helpers |
| Header clutter | Navigation feels noisy | Keep header to main content sections only |

## Approval

- Approved: yes
- Approval file: `docs/features/approvals/taxonomy-design.approval.md`
- Conditions:
  - No backend/database/auth/CMS/Docker.
  - No ads, analytics, or affiliate links.
  - No RSS.
  - No packages unless implementation proves a strict need.
