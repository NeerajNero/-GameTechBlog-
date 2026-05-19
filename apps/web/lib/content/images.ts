import fs from "node:fs";
import path from "node:path";

export function isCloudinaryImageUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
}

export function isPlaceholderImageValue(value: string | undefined): boolean {
  if (!value) {
    return true;
  }

  const normalized = value.trim().toLowerCase();

  return (
    normalized === "" ||
    normalized.includes("placeholder") ||
    normalized.includes("todo") ||
    normalized.endsWith("/readme.md")
  );
}

export function isExistingLocalPublicImage(value: string): boolean {
  if (!value.startsWith("/")) {
    return false;
  }

  return fs.existsSync(path.join(process.cwd(), "public", value));
}

export function isRenderableImage(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  if (isPlaceholderImageValue(value)) {
    return false;
  }

  return isCloudinaryImageUrl(value) || isExistingLocalPublicImage(value);
}

export function getRenderableImageSrc(value: string | undefined): string | undefined {
  return isRenderableImage(value) ? value : undefined;
}
