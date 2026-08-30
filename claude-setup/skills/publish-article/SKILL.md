---
name: publish-article
description: End-to-end workflow for creating and publishing a GameTechGuides article — MDX file, frontmatter, scan-friendly structure, internal links, Cloudinary images, SEO checks, and build verification. Use when asked to write, draft, publish, or expand a blog article for this site.
---

# Publish Article

Use this skill whenever a new article is created or an existing one is meaningfully expanded.

## Workflow

1. **Brief first.** For a new article, fill `templates/article-brief.md` mentally or on disk: who it is for, the problem it solves, and the practical angle. Check `docs/content-strategy.md` for fit.
2. **Create the MDX file** at `apps/web/content/articles/<slug>.mdx`. The `slug` frontmatter field MUST equal the filename (build fails otherwise).
3. **Frontmatter contract** — all required by `apps/web/lib/content/validation.ts`:
   - `title`, `slug`, `description`, `category`, `tags[]`, `author`, `publishedAt`, `updatedAt`, `featured`, `draft`, `seoTitle`, `seoDescription`
   - Optional: `coverImage`, `coverImageAlt` (required if coverImage is a real image), `coverImageCredit`, `quickTake`
   - Reuse categories/tags from existing articles (`apps/web/lib/content/taxonomy.ts`); a new category needs a description added to `categoryDescriptions` there.
4. **Structure** (scan-friendly pattern from `docs/content-site-patterns.md`):
   - Strong 2–3 sentence intro, no throat-clearing.
   - `<ArticleQuickTake items={[...]} />` near the top for guides/reviews.
   - H2 sections that each deliver one decision or answer; tables for comparisons.
   - H2/H3 text becomes the sidebar table of contents and heading anchor ids (`lib/content/toc.ts` + `components/blog/mdx-content.tsx`), so headings must be descriptive standalone phrases; avoid duplicate heading text within one article.
   - `<ArticleImage src alt caption credit />` for media, `<ArticleReadMore title>` for optional depth, `<ArticleVerdict>` to close reviews/opinions.
   - 1,000+ substantive words for guides. Thin content risks AdSense "low value content" flags.
   - The author bio box renders automatically after the body (`components/blog/author-bio.tsx`) — never add a manual bio section.
5. **Internal links (required)**: weave 2–3 contextual in-body links to existing articles where they genuinely help the reader (`[anchor text](/articles/<slug>)` in MDX). Then update 1–2 older related articles to link back to the new one, bumping their `updatedAt`. The related-articles cards at the bottom do not count; in-body links are the requirement.
6. **Images**: upload to Cloudinary manually, paste the `https://res.cloudinary.com/...` secure URL, honest alt/caption/credit. Prefer real photos of owned hardware, setups, and games over AI-generated graphics — real photos are a core E-E-A-T signal for AdSense and search quality review. Local site assets only under `apps/web/public/`. See `docs/image-handling.md`.
7. **Voice rules**: practical and hype-free; India-specific context where pricing/thermals/availability matter; opinions labeled; no invented personal experience; no piracy/ROM/bypass content; disclose affiliate links in-article if ever present.
8. **Verify**:
   ```bash
   pnpm --dir apps/web lint
   pnpm --dir apps/web typecheck
   pnpm --dir apps/web build
   ```
   Build runs frontmatter validation. Then smoke-check `/articles/<slug>`, `/articles`, the category page, `/sitemap.xml`, and `/feed.xml` (the RSS feed includes every published article automatically).
9. **SEO pass**: run `templates/article-seo-checklist.md` — unique seoTitle (≤60 chars ideal), seoDescription (~150 chars), in-body internal links present in both directions, honest description.
10. **Record**: bump `updatedAt` on meaningful edits (it feeds the sitemap and the visible "Updated" date); note the publish in `docs/context/current-status.md` when the change is durable.

## Done means

Build passes, the article renders with correct hero/quick-take/verdict/table of contents/author bio, it appears in listings, sitemap, and `/feed.xml`, in-body internal links exist in both directions, and no placeholder text or images remain.
