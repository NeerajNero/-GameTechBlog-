/**
 * Google Analytics 4 integration, gated behind an environment variable so the
 * site ships zero analytics code until a measurement ID is configured.
 *
 * To activate:
 *   1. Create a GA4 property at https://analytics.google.com and copy its
 *      measurement ID (looks like "G-XXXXXXXXXX").
 *   2. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel and redeploy.
 */

const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{6,}$/;

export function getGaMeasurementId(): string | undefined {
  const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  if (!value) {
    return undefined;
  }

  if (!MEASUREMENT_ID_PATTERN.test(value)) {
    throw new Error(
      `Invalid NEXT_PUBLIC_GA_MEASUREMENT_ID "${value}": expected a value like "G-ABC123DEF4".`
    );
  }

  return value;
}
