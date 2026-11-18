import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { addStatus, listStatus } from "@/lib/lead-store";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  return NextResponse.json({ status: await listStatus() });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: { nome?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const nome = String(body.nome ?? "").trim();
  if (!nome) {
    return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
  }
  if (nome.length > 40) {
    return NextResponse.json({ error: "Nome muito longo (máx. 40)." }, { status: 400 });
  }

  const status = await addStatus(nome);
  if (!status) {
    return NextResponse.json({ error: "Já existe uma situação com esse nome." }, { status: 409 });
  }
  return NextResponse.json({ status }, { status: 201 });
}
