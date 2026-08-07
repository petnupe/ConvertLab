import { NextResponse } from "next/server";
import { createSession, isAuthenticated } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (await isAuthenticated()) {
    return NextResponse.json({ ok: true });
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Payload inválido." },
      { status: 400 },
    );
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  const expectedEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!expectedEmail || !expectedPassword) {
    return NextResponse.json(
      { ok: false, error: "Credenciais de admin não configuradas." },
      { status: 500 },
    );
  }

  if (email !== expectedEmail || password !== expectedPassword) {
    return NextResponse.json(
      { ok: false, error: "Credenciais inválidas." },
      { status: 401 },
    );
  }

  await createSession();
  return NextResponse.json({ ok: true });
}