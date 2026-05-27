# Article Scan-Friendly Components

Date: 2026-05-27

## Scope

Added reusable scan-friendly article components for GameTechGuides MDX articles and updated the Forza Horizon 6 hands-on article as the first example. The work focused on readability and article presentation only.

## Files Changed

- `apps/web/components/blog/article-quick-take.tsx`
- `apps/web/components/blog/article-highlight.tsx`
- `apps/web/components/blog/article-pull-quote.tsx`
- `apps/web/components/blog/article-read-more.tsx`
- `apps/web/components/blog/article-verdict.tsx`
- `apps/web/components/blog/mdx-content.tsx`
- `apps/web/app/articles/[slug]/page.tsx`
- `apps/web/app/globals.css`
- `apps/web/content/articles/forza-horizon-6-after-10-hours-racing-heaven.mdx`
- `docs/context/current-status.md`
- `docs/context/project-map.md`

## Components

- `ArticleQuickTake` supports the existing automatic article-summary mode and explicit MDX usage. It accepts `title`, `items`, `verdict`, and MDX children. MDX children are the preferred authoring style when markdown lists are easier to maintain.
- `ArticleReadMore` uses native HTML `details` and `summary` so deeper sections can expand without client JavaScript while keeping the content in the HTML.
- `ArticleVerdict` provides a stronger styled final-opinion block for impressions and review-style articles.
- `ArticleHighlight` provides subtle inline emphasis for short phrases without breaking paragraph flow.
- `ArticlePullQuote` provides a lightweight magazine-style standout quote block with an optional citation.

## MDX Wiring

The MDX renderer now exposes:

- `ArticleQuickTake`
- `ArticleHighlight`
- `ArticlePullQuote`
- `ArticleReadMore`
- `ArticleVerdict`
- Existing `ArticleImage`
- Existing `ArticleCallout`

The article page skips the automatic top quick-take when an article includes an inline `<ArticleQuickTake>` to avoid duplicate summaries.

## Forza Article Update

Updated `apps/web/content/articles/forza-horizon-6-after-10-hours-racing-heaven.mdx` with:

- An inline quick-take summary near the opening.
- Expandable detail sections for controller feel and remaining review checks.
- A styled final verdict block near the end.

No factual claims, images, draft status, SEO metadata, or owner voice were intentionally changed.

## Verification

- `pnpm --dir apps/web lint` passed.
- `pnpm --dir apps/web typecheck` passed.
- `pnpm --dir apps/web build` passed.

## Smoke Check

Checked generated build output for:

- `/articles/forza-horizon-6-after-10-hours-racing-heaven`
- `/articles/total-overdose-underrated-ps2-masterpiece`
- `/articles`

Confirmed:

- Forza quick take renders.
- Forza read-more sections render as native `<details>` and `<summary>` elements.
- Forza verdict block renders.
- Forza inline `ArticleImage` screenshots remain in the built HTML.
- Article listing still includes the Forza article.
- BlogPosting and BreadcrumbList JSON-LD scripts parse without `undefined` or `null` values in checked article pages.
- Cloudinary image URLs remain present in generated article HTML.

## Notes

- The requested `items: string[]` prop remains supported by `ArticleQuickTake`, but the Forza article uses MDX children for the quick-take list because it produced the most reliable static HTML output in the current MDX pipeline.
- No packages, backend, analytics, ads, affiliate links, CMS, Docker, or RSS work was added.
