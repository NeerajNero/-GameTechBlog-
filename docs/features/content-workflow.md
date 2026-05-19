# Content Workflow

## Article Lifecycle

```text
idea -> brief -> draft MDX -> edit -> SEO check -> image check -> publish -> update
```

## Publishing Steps

```text
create MDX file -> add frontmatter -> add image -> commit -> push -> Vercel deploys
```

## File Location

Articles:

```text
apps/web/content/articles/<article-slug>.mdx
```

Images:

```text
Cloudinary manual upload:
gaming-tech-blog/articles/<article-slug>/cover.webp
```

## Frontmatter

Use `templates/article-frontmatter.md`.

Required fields:

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

## Naming Rules

- Use lowercase slugs.
- Use hyphens between words.
- Keep filenames aligned with slugs.
- Keep Cloudinary image filenames descriptive.

## Review Before Publish

- Run the article through `templates/article-seo-checklist.md`.
- Confirm all claims are current and practical.
- Add internal links where relevant.
- Add affiliate disclosure if affiliate links are present.
- Confirm the article is not thin or generic.
- Confirm article images are original, licensed, or otherwise safe to use.
- Confirm `coverImage`, `coverImageAlt`, and `coverImageCredit` are honest and non-placeholder values when an image is present.

## Updating Old Articles

Update `updatedAt` when meaningful content changes:

- Product recommendations change.
- Pricing or availability context changes.
- Technical instructions change.
- Screenshots or hardware details change.

Do not update `updatedAt` for typo-only fixes unless the application later distinguishes minor edits.
