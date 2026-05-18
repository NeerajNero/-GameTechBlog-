# 0002: MDX Over Database

- Date: 2026-05-19
- Status: accepted

## Context

The MVP needs articles, metadata, images, SEO fields, and a repeatable publishing workflow. It does not need runtime editing, user-generated content, or complex workflows.

## Decision

Store articles as local `.mdx` files under:

```text
content/articles/
```

Each article uses frontmatter metadata.

## Consequences

- Content is versioned in Git.
- Vercel can deploy content changes on push.
- No database or CMS is needed.
- Article metadata can drive lists, category pages, tags, SEO metadata, sitemap, RSS, and social cards.

## Deferred

- CMS/admin editor.
- Database-backed content.
- Collaborative editorial workflow.
- Scheduled publishing.
