# Article Frontmatter Template

Copy this into the top of each `content/articles/<slug>.mdx` file.

```yaml
---
title: ""
slug: ""
description: ""
category: ""
tags:
  - ""
author: "Neeraj Kumar Sharma"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
coverImage: ""
coverImageAlt: ""
coverImageCredit: ""
quickTake: ""
featured: false
draft: true
seoTitle: ""
seoDescription: ""
---
```

## Notes

- Use `draft: true` until the article is ready.
- Keep `slug` stable after publishing.
- Use `updatedAt` for meaningful content updates.
- Leave `coverImage` empty until a real image exists.
- For article/media images, upload manually to Cloudinary and paste the secure delivery URL, usually from `gaming-tech-blog/articles/<slug>/...`.
- Use `coverImageAlt` only to describe the actual image. Do not invent image details.
- Use `coverImageCredit` when the source or license requires credit.
- Keep permanent site assets in the repo; use Cloudinary for article/media assets.
- `quickTake` is optional. Use it for a one-sentence page-level summary only when the MDX body does not include an inline `<ArticleQuickTake>`.

## Recommended Article Body Pattern

Use the scan-friendly MDX components for most new articles:

```mdx
Short intro that confirms the reader is in the right place.

<ArticleQuickTake verdict="Bottom line: short practical takeaway.">

- Main thing the reader should know.
- Important caveat or context.
- What to do next.

</ArticleQuickTake>

Main visible argument or summary. Keep enough useful content visible before any collapsible sections.

<ArticleImage
  src="https://res.cloudinary.com/.../image.webp"
  alt="Honest description of the actual image"
  caption="Helpful caption."
  credit="Screenshot by site owner"
/>

<ArticleReadMore title="Deeper details">

Use this for optional context, longer testing notes, caveats, or secondary details.

</ArticleReadMore>

<ArticleVerdict title="Verdict">

Use for reviews, opinions, and impressions when a final recommendation or personal read is useful.

</ArticleVerdict>
```

Use `<ArticleHighlight>` only for short phrases inside a sentence. Use `<ArticlePullQuote>` at most once per article for one standout opinion line.
