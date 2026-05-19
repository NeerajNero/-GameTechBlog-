# Feature Plan

## Status

- Status: implemented
- Feature slug: `seo-foundation`
- Source stories: `docs/features/seo-foundation.md`, `docs/seo-implementation-patterns.md`
- Classification: `docs/features/classifications/seo-foundation.classification.md`
- Lane: normal
- Created: 2026-05-19
- Last updated: 2026-05-19

## Summary

- User-visible outcome: The static blog has crawler-ready SEO foundations, trust/policy pages, canonical metadata, sitemap/robots, and article structured data.
- Business value: Improves launch readiness for search indexing, social previews, trust signals, and future Search Console/AdSense review without adding ads or monetization scripts.
- Surfaces: web, SEO, content, docs.

## Scope

In scope:

- `robots.ts`
- `sitemap.ts`
- canonical URL helpers
- metadata helper updates
- `metadataBase`
- production/non-production robots metadata behavior
- article `BlogPosting` or `Article` JSON-LD
- article `BreadcrumbList` JSON-LD
- static trust/policy pages:
  - `/about`
  - `/contact`
  - `/privacy-policy`
  - `/terms`
  - `/editorial-policy`
  - `/affiliate-disclosure`
- navigation/footer links to trust/policy pages where appropriate
- docs/context updates after implementation

Out of scope:

- RSS.
- Category pages.
- Tag pages.
- AdSense scripts.
- Analytics.
- Affiliate links.
- Backend.
- Database.
- Auth.
- CMS.
- Docker.
- Search Console setup.
- Real article cover image assets.
- Generated OG images.

## Current System Notes

- Existing app: `apps/web/`
- Existing routes:
  - `/`
  - `/articles`
  - `/articles/[slug]`
- Existing content source: `apps/web/content/articles/*.mdx`
- Existing SEO helper: `apps/web/lib/seo/metadata.ts`
- Existing site config: `apps/web/lib/site/config.ts`
- Existing article helpers: `apps/web/lib/content/articles.ts`
- Existing article page: `apps/web/app/articles/[slug]/page.tsx`

Patterns to follow:

- `docs/seo-implementation-patterns.md`
- `docs/features/seo-foundation.md`
- `docs/seo-checklist.md`

Constraints:

- Do not install packages.
- Do not add backend/database/CMS/auth/Docker.
- Do not hardcode a fake production domain.
- Do not emit broken image URLs in metadata or JSON-LD.
- Do not claim analytics, ads, affiliate partnerships, company facts, or team facts that are not true.

## Files To Create

App routes:

- `apps/web/app/robots.ts`
- `apps/web/app/sitemap.ts`
- `apps/web/app/about/page.tsx`
- `apps/web/app/contact/page.tsx`
- `apps/web/app/privacy-policy/page.tsx`
- `apps/web/app/terms/page.tsx`
- `apps/web/app/editorial-policy/page.tsx`
- `apps/web/app/affiliate-disclosure/page.tsx`

SEO components/helpers:

- `apps/web/components/seo/json-ld.tsx`
- `apps/web/lib/seo/structured-data.ts`
- `apps/web/lib/seo/urls.ts`

Optional shared page component if it keeps code simple:

- `apps/web/components/layout/static-page.tsx`

## Files To Modify

- `apps/web/app/layout.tsx`
- `apps/web/app/page.tsx`
- `apps/web/app/articles/page.tsx`
- `apps/web/app/articles/[slug]/page.tsx`
- `apps/web/lib/seo/metadata.ts`
- `apps/web/lib/site/config.ts`
- `apps/web/components/layout/site-header.tsx`
- `apps/web/components/layout/site-footer.tsx`
- `docs/context/current-status.md`
- `docs/context/project-map.md`
- `docs/command-map.md` if verification commands change

## Route/Page List

Existing public routes to keep:

| Route | SEO Work |
| --- | --- |
| `/` | metadataBase, canonical metadata, optional WebSite/Person JSON-LD |
| `/articles` | canonical metadata |
| `/articles/[slug]` | article metadata, BlogPosting/Article JSON-LD, BreadcrumbList JSON-LD |

New trust/policy routes:

| Route | Content Purpose |
| --- | --- |
| `/about` | Explain site purpose, author identity, niche, and editorial focus |
| `/contact` | Give a practical contact path for corrections, collaborations, and questions |
| `/privacy-policy` | Explain current privacy posture without claiming analytics/ad scripts that do not exist |
| `/terms` | Basic site usage terms and content disclaimer |
| `/editorial-policy` | Explain how guides are written, updated, corrected, and separated from monetization |
| `/affiliate-disclosure` | State that affiliate links may be used later and will be disclosed when present |

## URL Helper Design

Create `apps/web/lib/seo/urls.ts`.

Responsibilities:

- Normalize `NEXT_PUBLIC_SITE_URL` by trimming trailing slashes.
- Use `http://localhost:3000` as local fallback.
- Fail clearly in production if `NEXT_PUBLIC_SITE_URL` is missing.
- Export `siteUrl`.
- Export `absoluteUrl(path = "/")`.
- Use the `URL` constructor.

Rules:

- Do not hardcode a fake production domain.
- Production Vercel must set `NEXT_PUBLIC_SITE_URL` before launch.
- Canonical, sitemap, robots, metadataBase, OG, and JSON-LD should all use this helper.

## Metadata Helper Design

Modify `apps/web/lib/seo/metadata.ts`.

Requirements:

- Use `metadataBase` from normalized `siteUrl`.
- Add shared robots behavior:
  - production: `index: true`, `follow: true`
  - non-production: `index: false`, `follow: false`
- Build canonical URLs with `absoluteUrl`.
- Support page metadata and article metadata.
- Avoid OG/Twitter image metadata unless the image is valid and non-placeholder.

Page metadata helper:

- Input: `title`, `description`, `path`
- Output: Next.js `Metadata`
- Include canonical URL, Open Graph, Twitter, and robots behavior.

Article metadata helper:

- Input: article object.
- Use `seoTitle`, `seoDescription`, `slug`, `publishedAt`, `updatedAt`, `author`, `tags`.
- Open Graph type should be `article`.
- Only include image metadata when the article image or fallback image exists.

## Sitemap Behavior

Create `apps/web/app/sitemap.ts`.

Include:

- `/`
- `/articles`
- all published article pages from `getPublishedArticles()`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms`
- `/editorial-policy`
- `/affiliate-disclosure`

Exclude:

- draft articles
- not-found route
- future preview/admin/private routes
- RSS
- category/tag pages for this slice

Recommended values:

| Page Type | changeFrequency | priority |
| --- | --- | --- |
| Homepage | weekly | 1 |
| Articles index | weekly | 0.8 |
| Featured article | weekly | 0.8 |
| Normal article | weekly | 0.7 |
| Trust/policy page | monthly | 0.3 |

Use `updatedAt` for article `lastModified`.

## Robots Behavior

Create `apps/web/app/robots.ts`.

Production behavior:

- Allow `/`.
- Disallow `/drafts`, `/preview`, `/admin`, `/api`.
- Reference sitemap at `${siteUrl}/sitemap.xml`.

Rules:

- Do not use `robots.txt` for noindex.
- Non-production noindex belongs in metadata robots rules.
- `robots.txt` should allow normal crawling and point to sitemap in production.

## Trust/Policy Page Content Plan

Keep copy plain and truthful.

`/about`:

- Describe the blog as a practical gaming and tech guide site.
- Mention focus areas: PC gaming, console gaming, streaming, routers, SSDs, laptops, cooling, accessories, Indian gamer use cases.
- Do not claim company/team status.

`/contact`:

- Invite corrections, article suggestions, collaboration queries.
- Use a placeholder contact instruction only if no email is approved, such as "Use the contact channel the site owner publishes."
- Do not invent an email address.

`/privacy-policy`:

- State that the current MVP does not add analytics, ads, user accounts, payments, comments, or newsletter capture.
- Explain that hosting/CDN providers may process standard request logs.
- Note the policy should be updated before analytics, ads, affiliate tools, forms, or newsletter tools are added.

`/terms`:

- State content is informational.
- No guarantee of pricing, availability, performance, or compatibility.
- Readers should verify hardware/software compatibility before buying or changing settings.

`/editorial-policy`:

- Explain that articles aim for practical guidance.
- State updates use `updatedAt`.
- State corrections should be made when errors are found.
- State sponsored/affiliate relationships must be disclosed if added later.

`/affiliate-disclosure`:

- State there are no affiliate links in the current MVP unless an article explicitly says so.
- State future affiliate links may earn commission at no extra cost to readers.
- State recommendations should remain based on practical usefulness.

## JSON-LD Design

Create `apps/web/lib/seo/structured-data.ts`.

Helpers:

- `createWebsiteJsonLd()`
- `createPersonJsonLd()`
- `createArticleJsonLd(article)`
- `createBreadcrumbJsonLd(items)`
- `removeEmptyJsonLdValues(value)`

Create `apps/web/components/seo/json-ld.tsx`.

Responsibilities:

- Render `<script type="application/ld+json">`.
- Serialize sanitized JSON-LD.
- Avoid rendering when data is empty.

Article pages:

- Render `BlogPosting` or `Article`.
- Render `BreadcrumbList`.
- Do not include undefined/null/fake values.
- Use article cover image only if valid and non-placeholder.
- Avoid broken image URLs.

Do not add:

- fake ratings
- fake reviews
- fake prices
- fake organization facts
- FAQ schema without visible FAQ content

## Production vs Non-Production Indexing

Metadata robots behavior:

- Production: index and follow.
- Non-production: noindex and nofollow.

Robots file behavior:

- Do not use robots file as the noindex mechanism.
- Production `robots.ts` should allow normal crawling and point to sitemap.

Implementation detail:

- Use `process.env.NODE_ENV === "production"` for build environment behavior.
- Keep `NEXT_PUBLIC_SITE_URL` required for production canonical URLs.

## Environment Variable Behavior

Variable:

```text
NEXT_PUBLIC_SITE_URL
```

Rules:

- Required before production launch on Vercel.
- Should be the canonical custom domain, for example the final live domain when known.
- Must not include a trailing slash.
- Helper should normalize trailing slashes anyway.
- Local fallback is `http://localhost:3000`.
- Do not hardcode a fake production domain in source code.

## Data And Migration Plan

- Schema changes: none.
- Migration name: not applicable.
- Seed data: none.
- Rollback considerations: remove SEO route/helper/page files if abandoned before release.

## Backend Plan

- Routes: none.
- DTOs: none.
- Services: none.
- Repositories/DB services: none.
- Auth/permissions: none.
- Swagger/OpenAPI: none.
- Background jobs: none.
- SQL functions/triggers/materialized views: none.
- Observability: none.
- External providers: none.

## SDK Plan

- OpenAPI impact: none.
- SDK output path: not applicable.
- Generated models expected: none.
- Compatibility concerns: none.

## Web Frontend Plan

Routes/pages:

- Create SEO and trust/policy routes listed above.
- Update article detail route to render JSON-LD.
- Keep article listing and homepage metadata using central helper.

Components:

- Add `JsonLd`.
- Add optional shared static page layout component if it reduces duplication.

Hooks/query keys:

- None.

Loading/empty/error states:

- Not applicable beyond existing not-found handling.

## Mobile Frontend Plan

- App target: none.
- Screens/routes: none.
- Shared packages: none.
- Native config: none.
- Permissions/plugins: none.
- Device verification: not applicable.

## Implementation Sequence

1. Create URL helper and update site config.
2. Update metadata helper with `metadataBase`, canonical URL, robots rules, and safe image behavior.
3. Add static trust/policy pages with metadata.
4. Add sitemap route using published articles and static pages.
5. Add robots route pointing to sitemap.
6. Add JSON-LD helpers and `JsonLd` component.
7. Render article JSON-LD and breadcrumb JSON-LD on article pages.
8. Add homepage site/person JSON-LD only if the data is truthful and non-fake.
9. Update header/footer links if needed for trust/policy discovery.
10. Run verification and write implementation report.

## Acceptance Criteria

- `/robots.txt` exists and references sitemap.
- `/sitemap.xml` exists.
- Sitemap includes homepage, article listing, published article pages, and trust/policy pages.
- Sitemap excludes draft articles.
- Static trust/policy pages exist and have metadata.
- Root metadata uses `metadataBase` from normalized site URL.
- Canonicals use one URL helper.
- Non-production metadata uses noindex/nofollow.
- Article pages render `BlogPosting` or `Article` JSON-LD.
- Article pages render `BreadcrumbList` JSON-LD.
- JSON-LD has no undefined, null, or fake values.
- No RSS, category/tag pages, analytics, ads, affiliate links, backend, database, auth, CMS, or Docker are added.

## Verification Plan

Commands:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
pnpm --dir apps/web dev --hostname 127.0.0.1
```

Smoke check URLs:

```text
http://127.0.0.1:3000/
http://127.0.0.1:3000/articles
http://127.0.0.1:3000/articles/elden-ring-beginner-tips-first-time-souls-players
http://127.0.0.1:3000/robots.txt
http://127.0.0.1:3000/sitemap.xml
http://127.0.0.1:3000/about
http://127.0.0.1:3000/contact
http://127.0.0.1:3000/privacy-policy
http://127.0.0.1:3000/terms
http://127.0.0.1:3000/editorial-policy
http://127.0.0.1:3000/affiliate-disclosure
```

Manual checks:

- View page source for one article and confirm JSON-LD scripts exist.
- Confirm article JSON-LD is valid JSON.
- Confirm breadcrumb JSON-LD is valid JSON.
- Confirm JSON-LD has no undefined, null, or fake values.
- Confirm non-production metadata includes noindex/nofollow.
- Confirm production launch notes mention `NEXT_PUBLIC_SITE_URL`.

Later deployment checks:

- Validate deployed article page with Google Rich Results Test.
- Submit sitemap in Search Console after custom domain setup.

## Test Plan

- Unit: not required unless helpers become complex.
- API integration: not applicable.
- Contract: not applicable.
- E2E: not required for this slice.
- Manual: smoke checks listed above.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Missing `NEXT_PUBLIC_SITE_URL` in production | Canonical/sitemap may use localhost or fail | Require env before launch and fail clearly in production |
| Broken image URLs in metadata/JSON-LD | Invalid previews or structured data | Only include image metadata for known real files |
| Non-production indexing | Preview deployments may appear in search | Central metadata robots noindex/nofollow outside production |
| Robots misuse | Pages may not be deindexed as expected | Do not use `robots.txt` for noindex |
| Trust page copy overclaims | Legal/trust risk | Keep copy factual and minimal |
| Scope creep | Delays SEO foundation | Keep RSS and taxonomy pages deferred |

## Open Questions

| ID | Question | Blocking |
| --- | --- | --- |
| Q-001 | What custom domain will be used for `NEXT_PUBLIC_SITE_URL` in production? | no |
| Q-002 | What contact email or public contact channel should `/contact` list? | no |
| Q-003 | Should homepage render `Person` JSON-LD now or wait until the About page has final author copy? | no |

## Approval

- Approved: yes
- Approval file: `docs/features/approvals/seo-foundation.approval.md`
- Conditions:
  - Implement only the approved frontend/static SEO scope.
  - Do not add RSS, category/tag pages, ads, analytics, affiliate links, backend, database, auth, CMS, or Docker.
  - Keep trust/policy page copy truthful and non-committal where business details are not finalized.
