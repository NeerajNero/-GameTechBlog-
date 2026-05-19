const localSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function resolveSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const isProductionDeployment = process.env.VERCEL_ENV === "production";

  if (configuredUrl) {
    return normalizeSiteUrl(configuredUrl);
  }

  if (isProductionDeployment) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be set before launching the production Vercel deployment."
    );
  }

  return localSiteUrl;
}

export const siteUrl = resolveSiteUrl();

export const isProductionSite = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production" && siteUrl !== localSiteUrl;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
