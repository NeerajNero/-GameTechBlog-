---
name: publish-article
description: End-to-end workflow for creating and publishing a GameTechGuides article — MDX file, frontmatter, scan-friendly structure, Cloudinary images, SEO checks, and build verification. Use when asked to write, draft, publish, or expand a blog article for this site.
---

# Publish Article

Use this skill whenever a new article is created or an existing one is meaningfully expanded.

## Workflow

1. **Brief first.** For a new article, fill `templates/article-brief.md` mentally or on disk: who it is for, the problem it solves, and the practical angle. Check `docs/content-strategy.md` for fit.
2. **Create the MDX file** at `apps/web/content/articles/<slug>.mdx`. The `slug` frontmatter field MUST equal the filename (build fails otherwise).
3. **Frontmatter contract** — all required by `apps/web/lib/content/validation.ts`:
   - `title`, `slug`, `description`, `category`, `tags[]`, `author`, `publishedAt`, `updatedAt`, `featured`, `draft`, `seoTitle`, `seoDescription`
   - Optional: `coverImage`, `coverImageAlt` (required if coverImage is a real image), `coverImageCredit`, `quickTake`
   - Reuse categories/tags from existing articles (`apps/web/lib/content/taxonomy.ts`); a new category needs a description added there.
4. **Structure** (scan-friendly pattern from `docs/content-site-patterns.md`):
   - Strong 2–3 sentence intro, no throat-clearing.
   - `<ArticleQuickTake items={[...]} />` near the top for guides/reviews.
   - H2 sections that each deliver one decision or answer; tables for comparisons.
   - `<ArticleImage src alt caption credit />` for media, `<ArticleReadMore title>` for optional depth, `<ArticleVerdict>` to close reviews/opinions.
   - 900+ substantive words for guides. Thin content risks AdSense "low value content" flags.
5. **Images**: upload to Cloudinary manually, paste the `https://res.cloudinary.com/...` secure URL, honest alt/caption/credit. Local site assets only under `apps/web/public/`. See `docs/image-handling.md`.
6. **Voice rules**: practical and hype-free; India-specific context where pricing/thermals/availability matter; opinions labeled; no invented personal experience; no piracy/ROM/bypass content; disclose affiliate links in-article if ever present.
7. **Verify**:
   ```bash
   pnpm --dir apps/web lint
   pnpm --dir apps/web typecheck
   pnpm --dir apps/web build
   ```
   Build runs frontmatter validation. Then smoke-check `/articles/<slug>`, `/articles`, the category page, and `/sitemap.xml`.
8. **SEO pass**: run `templates/article-seo-checklist.md` — unique seoTitle (≤60 chars ideal), seoDescription (~150 chars), internal links to 1–3 related articles, honest description.
9. **Record**: bump `updatedAt` on meaningful edits; note the publish in `docs/context/current-status.md` when the change is durable.

## Done means

Build passes, the article renders with correct hero/quick-take/verdict, it appears in listings and sitemap, and no placeholder text or images remain.
