// Server-only. One shared password (ADMIN_PASSWORD in Vercel) guards the
// orders page. The cookie holds an HMAC derived from it, never the password,
// and changing the password signs everyone out.
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "certa_admin";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 24 * 30;

function sessionToken(): string {
  return createHmac("sha256", process.env.ADMIN_PASSWORD ?? "").update("certa-admin-session-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function passwordMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && safeEqual(candidate, expected!);
}

export function newSessionToken(): string {
  return sessionToken();
}

export async function isAdmin(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(value) && safeEqual(value!, sessionToken());
}
