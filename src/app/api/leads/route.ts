import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { addLead, listLeads } from "@/lib/lead-store";
import { normalizeWhatsapp } from "@/lib/lead";

export const runtime = "nodejs";

async function guard(): Promise<boolean> {
  return isAuthenticated();
}

export async function GET() {
  if (!(await guard())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const leads = await listLeads();
  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  if (!(await guard())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: { nome?: string; whatsapp?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Payload inválido." },
      { status: 400 },
    );
  }

  const nome = String(body.nome ?? "").trim();
  const whatsapp = normalizeWhatsapp(String(body.whatsapp ?? ""));

  if (!nome) {
    return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
  }
  if (whatsapp.length < 12) {
    return NextResponse.json(
      { error: "WhatsApp inválido (use DDD + número)." },
      { status: 400 },
    );
  }

  const lead = await addLead({
    nome,
    whatsapp: whatsapp,
    status: "novo",
  });

  return NextResponse.json({ lead }, { status: 201 });
}