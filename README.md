# GameTechGuides

GameTechGuides is a live gaming and tech content site focused on practical guides,
setup notes, hardware explainers, game streaming, retro gaming, and player-focused
hands-on impressions.

Live site: https://gametechguides.com

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- MDX articles stored in the repository
- Vercel deployment
- Cloudinary delivery URLs for article/media images

## Repository Shape

```text
apps/web/
  app/                  Next.js routes, sitemap, robots, static pages
  components/           Layout, blog, MDX, and SEO components
  content/articles/     Local MDX article files
  lib/                  Content loading, taxonomy, SEO, and site config
  public/               Stable site assets

docs/                   Project, content, SEO, deployment, and feature docs
templates/              Article and workflow templates
```

## Local Development

Install dependencies from the repository root:

```bash
pnpm install
```

Run the web app:

```bash
pnpm --dir apps/web dev
```

Verify the web app:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

For production SEO checks, build with the live site URL:

```bash
NEXT_PUBLIC_SITE_URL=https://gametechguides.com VERCEL_ENV=production pnpm --dir apps/web build
```

## Content Workflow

Articles live in:

```text
apps/web/content/articles/
```

Typical publishing flow:

```text
Create MDX article
-> add frontmatter from templates/article-frontmatter.md
-> use the scan-friendly article pattern
-> upload safe article images to Cloudinary when needed
-> paste real image URLs with honest alt text, captions, and credit
-> run lint, typecheck, and build
-> commit and deploy through Vercel
```

Future articles should generally use:

- `ArticleQuickTake` near the top
- `ArticleImage` for screenshots/media
- `ArticleReadMore` for optional deeper sections
- `ArticleVerdict` for reviews, opinions, and impressions
- `ArticleHighlight` and `ArticlePullQuote` sparingly

## Production Notes

- Production domain: `https://gametechguides.com`
- Production env var: `NEXT_PUBLIC_SITE_URL=https://gametechguides.com`
- Sitemap: `https://gametechguides.com/sitemap.xml`
- Robots: `https://gametechguides.com/robots.txt`
- Public contact: `gametechguides@gmail.com`

## Project Boundaries

GameTechGuides is currently a static production content site. Do not add these
unless a future task explicitly changes the product scope:

- Backend
- Database
- Auth
- CMS/admin
- Docker infrastructure
- Ads or analytics
- Affiliate links
- RSS
- User accounts or comments

## Useful Docs

- [Project brief](docs/project-brief.md)
- [Architecture](docs/architecture.md)
- [Project map](docs/context/project-map.md)
- [Content site patterns](docs/content-site-patterns.md)
- [SEO checklist](docs/seo-checklist.md)
- [Command map](docs/command-map.md)
- [Image handling](docs/image-handling.md)
- [Deployment checklist](docs/deployment/vercel-launch-checklist.md)
