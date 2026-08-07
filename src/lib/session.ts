import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "cl_session";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 dias

function secret(): string {
  return process.env.SESSION_SECRET ?? "";
}

function sign(payload: string): string {
  return createHmac("sha256", secret())
    .update(payload)
    .digest("base64url");
}

function verify(payload: string, signature: string): boolean {
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function createSession(): Promise<void> {
  const payload = `${Date.now() + SESSION_TTL * 1000}.${Math.random().toString(36).slice(2)}`;
  const cookie = `${payload}.${sign(payload)}`;
  (await cookies()).set(COOKIE_NAME, cookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL,
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [exp, nonce, signature] = value.split(".");
  if (!exp || !nonce || !signature) return false;
  if (!verify(`${exp}.${nonce}`, signature)) return false;
  return Number(exp) > Date.now();
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}