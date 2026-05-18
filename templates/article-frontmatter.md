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
coverImage: "/images/articles/<slug>.jpg"
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
- Put article images under `public/images/articles/` after the app is scaffolded.
