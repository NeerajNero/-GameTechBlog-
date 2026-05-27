# Article SEO Checklist

## Frontmatter

- [ ] `title`
- [ ] `slug`
- [ ] `description`
- [ ] `category`
- [ ] `tags`
- [ ] `author`
- [ ] `publishedAt`
- [ ] `updatedAt`
- [ ] `coverImage`
- [ ] `coverImageAlt`
- [ ] `coverImageCredit` if required
- [ ] `featured`
- [ ] `draft`
- [ ] `seoTitle`
- [ ] `seoDescription`

## Content

- [ ] Search intent is clear.
- [ ] Intro confirms the reader is in the right place.
- [ ] Headings are useful and scannable.
- [ ] Article uses `<ArticleQuickTake>` near the top when a short summary helps.
- [ ] Main value remains visible; the whole article is not hidden behind collapsible sections.
- [ ] `<ArticleReadMore>` is used only for deeper details, caveats, or optional context.
- [ ] `<ArticleHighlight>` is used sparingly for important short phrases.
- [ ] `<ArticlePullQuote>` is used at most once, only for a strong standout line.
- [ ] `<ArticleVerdict>` is used for reviews, opinions, and impressions when a final take is useful.
- [ ] Article includes practical advice, not generic filler.
- [ ] India-specific context is included where relevant.
- [ ] Internal links are included.
- [ ] Product claims are checked.
- [ ] Affiliate disclosure is included if needed.

## Images

- [ ] Cover image is either empty or a real Cloudinary/local public image URL.
- [ ] Inline screenshots/images use `<ArticleImage>` with a real URL, caption, and credit.
- [ ] No fake Cloudinary URL is used.
- [ ] Alt text describes the actual image.
- [ ] Credit is included when the license/source requires it.
- [ ] Image is not generic or misleading.
- [ ] Image usage is legal: owned, licensed, public-domain, or otherwise allowed.
- [ ] Cloudinary free-plan usage is reasonable for the expected traffic.

## Publish

- [ ] `draft: false` only when ready.
- [ ] Preview page checked locally.
- [ ] Commit includes article changes; Cloudinary assets are already uploaded manually if used.
- [ ] Push triggers Vercel deployment.
