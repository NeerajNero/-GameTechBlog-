# Domain Setup

## Steps

1. Deploy temporarily to the generated Vercel URL if the final domain has not been purchased.
2. Buy or choose the final domain.
3. Add the domain to the Vercel project.
4. Follow Vercel's DNS instructions for the domain registrar.
5. Wait for DNS propagation and Vercel SSL issuance.
6. Set `NEXT_PUBLIC_SITE_URL` in Vercel Production to the final HTTPS domain:

```text
NEXT_PUBLIC_SITE_URL=https://your-final-domain.com
```

7. Redeploy the production deployment after setting the environment variable.
8. Verify canonical URLs, sitemap, and robots output use the final domain.

## Before Domain Purchase

- `NEXT_PUBLIC_SITE_URL` can remain unset.
- Vercel should provide `VERCEL_URL`, which the app uses as a temporary canonical base.
- The temporary deployment remains `noindex,nofollow`.
- Do not submit the temporary URL to Search Console.
- Do not apply for AdSense from the temporary URL.

## DNS Notes

- Use Vercel's current DNS values from the project dashboard.
- Do not guess DNS records from old projects.
- Keep one canonical host, usually the apex domain or `www`, then redirect the other host to it.
- The `NEXT_PUBLIC_SITE_URL` value should match the canonical host exactly.

## Verification URLs

```text
https://your-final-domain.com/
https://your-final-domain.com/articles
https://your-final-domain.com/sitemap.xml
https://your-final-domain.com/robots.txt
```

## Search Console

After the domain is live:

1. Add the domain property in Google Search Console.
2. Complete ownership verification.
3. Submit `https://your-final-domain.com/sitemap.xml`.
4. Inspect one article URL after indexing is enabled.

## Deferred

- AdSense application is deferred until there is enough original content.
- Search Console is deferred until the custom domain is live.
- Analytics is deferred.
- Affiliate links and affiliate disclosures in articles are deferred until actual affiliate links are added.
