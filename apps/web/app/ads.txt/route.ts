import { getAdSensePublisherId } from "@/lib/site/adsense";

export const dynamic = "force-static";

/**
 * Serves /ads.txt once an AdSense publisher ID is configured.
 * See lib/site/adsense.ts for activation instructions.
 */
export function GET(): Response {
  const publisherId = getAdSensePublisherId();

  if (!publisherId) {
    return new Response("Not found", { status: 404 });
  }

  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400"
    }
  });
}
