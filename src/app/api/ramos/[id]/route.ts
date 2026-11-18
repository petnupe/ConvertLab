import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { removeRamo, renameRamo } from "@/lib/lead-store";

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
  if (nome.length > 40) {
    return NextResponse.json({ error: "Nome muito longo (máx. 40)." }, { status: 400 });
  }

  const { id } = await params;
  const result = await renameRamo(id, nome);
  if (result === null) {
    return NextResponse.json({ error: "Ramo não encontrado." }, { status: 404 });
  }
  if (result === "duplicado") {
    return NextResponse.json({ error: "Já existe um ramo com esse nome." }, { status: 409 });
  }
  return NextResponse.json({ ramo: result });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const { id } = await params;
  const result = await removeRamo(id);
  if (result === "naoencontrado") {
    return NextResponse.json({ error: "Ramo não encontrado." }, { status: 404 });
  }
  if (result === "protegido") {
    return NextResponse.json(
      { error: 'O ramo "Nenhum" não pode ser excluído.' },
      { status: 409 },
    );
  }
  return NextResponse.json({ ok: true });
}
