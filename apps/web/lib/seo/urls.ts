const localSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function withHttps(value: string): string {
  if (/^https?:\/\//.test(value)) {
    return value;
  }

  return `https://${value}`;
}

export function isProductionDeployment(): boolean {
  return process.env.VERCEL_ENV === "production";
}

export function isPreviewDeployment(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

export function hasConfiguredProductionSiteUrl(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
}

export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelUrl = process.env.VERCEL_URL?.trim();

  if (configuredUrl) {
    return normalizeSiteUrl(configuredUrl);
  }

  if (vercelUrl) {
    return normalizeSiteUrl(withHttps(vercelUrl));
  }

  return localSiteUrl;
}

export function isProductionIndexable(): boolean {
  return isProductionDeployment() && hasConfiguredProductionSiteUrl();
}

export function isLaunchReady(): boolean {
  return isProductionIndexable();
}

export const siteUrl = getSiteUrl();
export const isProductionSite = isProductionIndexable();

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
