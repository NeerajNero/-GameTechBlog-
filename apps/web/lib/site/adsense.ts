/**
 * Google AdSense integration, gated behind an environment variable so the
 * site ships zero ad code until a publisher ID is configured.
 *
 * To activate (e.g. when applying for AdSense):
 *   1. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXXXXXXXXXX" in Vercel.
 *   2. Redeploy. The AdSense loader script is added to every page and
 *      /ads.txt starts serving the matching Google entry.
 *
 * The value must be the full client ID starting with "ca-pub-".
 */

const CLIENT_ID_PATTERN = /^ca-pub-\d{6,}$/;

export function getAdSenseClientId(): string | undefined {
  const value = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

  if (!value) {
    return undefined;
  }

  if (!CLIENT_ID_PATTERN.test(value)) {
    throw new Error(
      `Invalid NEXT_PUBLIC_ADSENSE_CLIENT_ID "${value}": expected a value like "ca-pub-1234567890123456".`
    );
  }

  return value;
}

export function getAdSensePublisherId(): string | undefined {
  const clientId = getAdSenseClientId();

  return clientId?.replace(/^ca-/, "");
}
