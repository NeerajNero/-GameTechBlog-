# Image Asset Checklist

Use this before adding real Cloudinary image URLs to article frontmatter.

## Before Upload

- [ ] Image is owned, created, licensed, public-domain, or otherwise allowed.
- [ ] Image is not copied from random search results.
- [ ] Game screenshot was captured by the site owner, or official media usage rights are documented.
- [ ] Product/setup photo was created by the site owner, or official media usage rights are documented.
- [ ] No private data is visible.
- [ ] No account names, serial numbers, addresses, Wi-Fi SSIDs, personal files, or private screens are visible.
- [ ] Image matches the article topic.
- [ ] Image is not misleading or overly generic.
- [ ] If no safe image exists, keep the article fallback UI.

## Compression And Format

- [ ] Cover image uses a landscape crop, ideally 16:9.
- [ ] Cover image subject remains clear at card size.
- [ ] Preferred format is `.webp`.
- [ ] Suggested dimensions are 1600 x 900 or 1200 x 675.
- [ ] File is compressed before upload where practical.
- [ ] Original high-resolution/private source file is not committed to the repo.

## Naming

- [ ] Cloudinary folder follows:

```text
gaming-tech-blog/articles/{article-slug}/
```

- [ ] Cover filename is:

```text
cover.webp
```

- [ ] Supporting image filenames are lowercase and descriptive.
- [ ] Filenames use hyphens, not spaces.
- [ ] Filename is not generic, such as `image1.jpg` or `screenshot.png`.

## Cloudinary Upload

- [ ] Uploaded manually through the Cloudinary dashboard.
- [ ] Uploaded to the correct article folder.
- [ ] Delivery URL is secure HTTPS.
- [ ] Delivery URL starts with:

```text
https://res.cloudinary.com/
```

- [ ] Cloudinary dashboard usage remains within free-plan limits.
- [ ] No Cloudinary API secret, credentials, upload preset, or SDK was added to the repo.

## Frontmatter

- [ ] `coverImage` contains the real Cloudinary secure delivery URL.
- [ ] `coverImage` is not fake, placeholder, TODO text, or copied from another article.
- [ ] `coverImageAlt` describes the actual image.
- [ ] `coverImageAlt` is not keyword-stuffed.
- [ ] `coverImageCredit` is accurate if attribution is needed.
- [ ] `coverImageCredit` is not fake.
- [ ] If no credit is needed, leaving `coverImageCredit` empty is intentional.

Example:

```yaml
coverImage: "https://res.cloudinary.com/{cloud-name}/image/upload/.../gaming-tech-blog/articles/{article-slug}/cover.webp"
coverImageAlt: "Home router setup with Ethernet cable for PS Remote Play and Steam Link"
coverImageCredit: "Photo by Neeraj Kumar Sharma."
```

## Post-Update Verification

- [ ] Run `pnpm --dir apps/web lint`.
- [ ] Run `pnpm --dir apps/web typecheck`.
- [ ] Run `pnpm --dir apps/web build`.
- [ ] Smoke check `/`.
- [ ] Smoke check `/articles`.
- [ ] Smoke check the updated article page.
- [ ] Confirm article card image renders.
- [ ] Confirm article detail cover image renders.
- [ ] Confirm no broken image URL renders.
- [ ] Confirm article JSON-LD contains no `undefined` or `null`.
- [ ] Confirm JSON-LD image is present only when the real image URL is valid.
- [ ] Confirm the article still looks acceptable when viewed on mobile width.
