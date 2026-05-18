# 0003: Vercel, GitHub, Domain, Search Console Flow

- Date: 2026-05-19
- Status: accepted

## Context

The site should be simple to deploy, easy to preview, and ready for SEO tooling.

## Decision

Use this deployment flow:

```text
local development -> GitHub -> Vercel -> custom domain -> Search Console -> AdSense later
```

## Consequences

- GitHub becomes the source of truth for code and content.
- Vercel handles preview and production deployments.
- Search Console setup waits until the custom domain is connected.
- AdSense waits until policy pages and enough original content exist.

## Deferred

- Custom server hosting.
- Docker deployment.
- CI beyond Vercel's build checks.
