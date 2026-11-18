import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { removeProduto, renameProduto } from "@/lib/lead-store";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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
  if (nome.length > 80) {
    return NextResponse.json({ error: "Nome muito longo (máx. 80)." }, { status: 400 });
  }

  const { id } = await params;
  const result = await renameProduto(id, nome);
  if (result === null) {
    return NextResponse.json({ error: "Produto não encontrado." }, { status: 404 });
  }
  if (result === "duplicado") {
    return NextResponse.json({ error: "Já existe um produto com esse nome." }, { status: 409 });
  }
  return NextResponse.json({ produto: result });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const { id } = await params;
  const ok = await removeProduto(id);
  if (!ok) {
    return NextResponse.json({ error: "Produto não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
