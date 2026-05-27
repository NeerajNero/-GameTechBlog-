# Image Handling

## Current Policy

- Site assets stay in the repository.
- Article/media assets use Cloudinary delivery URLs when real images are available.
- Uploads are manual through the Cloudinary dashboard.
- There is no upload admin, upload API, backend, CMS, signed upload flow, or Cloudinary SDK in the current production site.

## Cloudinary Folder Convention

Use predictable folders:

```text
gaming-tech-blog/articles/{article-slug}/...
gaming-tech-blog/site/...
```

Examples:

```text
gaming-tech-blog/articles/best-ssd-setup-large-gaming-libraries/cover.jpg
gaming-tech-blog/site/default-og.jpg
```

## Manual Article Image Workflow

1. Use an image you own, created, licensed, or are otherwise allowed to use.
2. Optimize/crop it before upload where practical.
3. Upload it in the Cloudinary dashboard.
4. Copy the secure delivery URL from Cloudinary.
5. Paste it into article frontmatter as `coverImage`.
6. Add descriptive `coverImageAlt`.
7. Add optional `coverImageCredit` when attribution is needed.
8. Commit the MDX change.

## Frontmatter Fields

```yaml
coverImage: ""
coverImageAlt: ""
coverImageCredit: ""
```

Rules:

- Leave fields empty until a real image exists.
- Do not add fake Cloudinary URLs.
- `coverImageAlt` is required when `coverImage` points to a real image.
- `coverImageCredit` is optional but should be used when attribution is required.

## Safe Usage

The app should render images only when the image is safe:

- Cloudinary delivery URL starts with `https://res.cloudinary.com/`.
- Local image path exists under `apps/web/public/`.
- Value is not empty, placeholder, or TODO text.

If the image is missing or unsafe, the UI should render a styled fallback block instead of a broken image.

## SEO Rules

- Use image metadata only when the image is safe.
- Do not emit broken Open Graph image URLs.
- Do not emit broken JSON-LD image URLs.
- Do not emit null or undefined image fields.
- Real article cover images remain a separate content asset pass.

## Copyright And Licensing

Do not upload images unless you have rights to use them.

Avoid:

- Random images from search results.
- Game screenshots with unclear usage rights for commercial pages.
- Product photos copied from stores without permission.
- Images that require attribution but have no credit.

Prefer:

- Original screenshots or photos when allowed.
- Manufacturer press assets when terms allow usage.
- Licensed stock or generated images with clear commercial rights.
- Proper attribution in `coverImageCredit` when required.

## Free Plan Monitoring

Cloudinary's free plan has limits. Monitor usage in the Cloudinary dashboard, especially:

- storage
- bandwidth
- transformations
- monthly quota

Do not build upload automation until the manual workflow proves useful.
