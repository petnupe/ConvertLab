import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import {
  removeLead,
  statusExists,
  updateLeadDados,
  updateLeadStatus,
} from "@/lib/lead-store";
import { normalizeWhatsapp } from "@/lib/lead";

export const runtime = "nodejs";

async function guard(): Promise<boolean> {
  return isAuthenticated();
}

export async function PATCH(request: Request) {
  if (!(await guard())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: {
    id?: string;
    status?: string;
    nome?: string;
    whatsapp?: string;
    justificativa?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const id = String(body.id ?? "");

  // Edição de dados cadastrais (nome e WhatsApp)
  if (body.nome !== undefined || body.whatsapp !== undefined) {
    const nome = String(body.nome ?? "").trim();
    const whatsapp = normalizeWhatsapp(String(body.whatsapp ?? ""));
    if (!nome) {
      return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
    }
    if (nome.length > 120) {
      return NextResponse.json({ error: "Nome muito longo (máx. 120)." }, { status: 400 });
    }
    if (whatsapp.length < 12 || whatsapp.length > 15) {
      return NextResponse.json(
        { error: "WhatsApp inválido (use DDD + número)." },
        { status: 400 },
      );
    }
    const dados = await updateLeadDados(id, nome, whatsapp);
    if (!dados) {
      return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
    }
    return NextResponse.json({ lead: dados });
  }

  const status = String(body.status ?? "");
  if (!status || !(await statusExists(status))) {
    return NextResponse.json({ error: "Status inválido." }, { status: 400 });
  }

  const justificativa = String(body.justificativa ?? "").trim();
  if (justificativa.length > 500) {
    return NextResponse.json({ error: "Justificativa muito longa (máx. 500)." }, { status: 400 });
  }

  const lead = await updateLeadStatus(id, status, justificativa);
  if (!lead) {
    return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ lead });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await guard())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  // O id vem na rota (/api/leads/:id); ?id= continua aceito por compatibilidade.
  const { id: routeId } = await params;
  const id = routeId || new URL(request.url).searchParams.get("id") || "";
  const ok = await removeLead(id);
  if (!ok) {
    return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}