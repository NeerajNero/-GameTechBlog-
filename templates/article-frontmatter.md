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
