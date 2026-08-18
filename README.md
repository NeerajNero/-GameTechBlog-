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

### AdSense activation

Ad code is env-gated and inert until a publisher ID is configured:

- Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX` in Vercel and redeploy.
- This injects the AdSense loader script on every page (used by Google for site
  verification/review) and makes `/ads.txt` serve the matching Google entry.
- After approval, enable Auto ads in the AdSense dashboard (no code change), and
  turn on Google's GDPR consent message in AdSense Privacy & messaging for EEA/UK
  visitors before serving personalized ads there.
- See `apps/web/lib/site/adsense.ts` for details.

## Project Boundaries

GameTechGuides is currently a static production content site. Do not add these
unless a future task explicitly changes the product scope:

- Backend
- Database
- Auth
- CMS/admin
- Docker infrastructure
- Analytics
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
