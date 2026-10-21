import { createHash, timingSafeEqual } from "node:crypto";

export function getAdminSecret(): string | undefined {
  const value = process.env.ADMIN_SECRET?.trim();

  return value ? value : undefined;
}

/** Checks `Authorization: Bearer <ADMIN_SECRET>` in constant time. */
export function isAdminAuthorized(request: Request, adminSecret: string): boolean {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);

  if (!match) {
    return false;
  }

  // Hash both sides so timingSafeEqual always compares equal-length buffers.
  const provided = createHash("sha256").update(match[1].trim()).digest();
  const expected = createHash("sha256").update(adminSecret).digest();

  return timingSafeEqual(provided, expected);
}
