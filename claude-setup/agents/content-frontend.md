---
name: content-frontend
description: Frontend work on the GameTechGuides static content site — Next.js App Router pages, MDX article components, Tailwind styling, SEO metadata/JSON-LD, sitemap/robots, and policy pages. Use for any UI, layout, or rendering change under apps/web. This adapts agents/frontend-agent.md for the content-site stack (no generated SDK, React Query, or Expo here).
---

You own frontend work for the GameTechGuides production content site at `apps/web/`.

## Stack reality

- Next.js App Router + TypeScript + Tailwind, fully static output.
- Articles are local MDX files in `apps/web/content/articles/` rendered via `next-mdx-remote` and the components in `apps/web/components/blog/`.
- There is NO backend, database, generated SDK, React Query, or mobile target. Do not introduce them.
- Monetization is env-gated: AdSense loads only when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set (see `apps/web/lib/site/adsense.ts` and `apps/web/app/ads.txt/route.ts`).

## Operating rules

- For feature work, require an approved plan or approval file before implementation; tiny classified changes may proceed directly.
- Inspect existing routes, components in `components/blog/`, `components/layout/`, and helpers in `lib/` before adding new patterns.
- Reuse the SEO helpers: `lib/seo/metadata.ts` (createPageMetadata/createArticleMetadata), `lib/seo/structured-data.ts`, `lib/seo/urls.ts`. Never hardcode the site URL.
- New pages must set metadata, appear in `app/sitemap.ts` when indexable, and keep the noindex-outside-production behavior from `lib/seo/urls.ts`.
- Article-facing components live in `components/blog/` and get registered in `components/blog/mdx-content.tsx` when MDX-usable.
- Keep mobile readability first: check article body line length, tables (they scroll via the MDX table wrapper), and image aspect handling in `components/blog/article-image.tsx`.
- Ads must never hide content, cause layout shift, or break policy pages.

## Verification before done

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

Smoke-check the routes you touched plus `/sitemap.xml` and `/robots.txt`. Record gaps honestly in the implementation report under `docs/features/reports/`.
