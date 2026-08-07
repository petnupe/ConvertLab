import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { removeLead, updateLeadStatus } from "@/lib/lead-store";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/lead";

export const runtime = "nodejs";

const STATUSES: LeadStatus[] = LEAD_STATUSES;

async function guard(): Promise<boolean> {
  return isAuthenticated();
}

export async function PATCH(request: Request) {
  if (!(await guard())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: { id?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const status = body.status as LeadStatus;
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ error: "Status inválido." }, { status: 400 });
  }

  const lead = await updateLeadStatus(String(body.id ?? ""), status);
  if (!lead) {
    return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ lead });
}

export async function DELETE(request: Request) {
  if (!(await guard())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "";
  const ok = await removeLead(id);
  if (!ok) {
    return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}