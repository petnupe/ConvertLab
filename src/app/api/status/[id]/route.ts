import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { removeStatus, renameStatus } from "@/lib/lead-store";

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
  const result = await renameStatus(id, nome);
  if (result === null) {
    return NextResponse.json({ error: "Situação não encontrada." }, { status: 404 });
  }
  if (result === "duplicado") {
    return NextResponse.json({ error: "Já existe uma situação com esse nome." }, { status: 409 });
  }
  return NextResponse.json({ status: result });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const { id } = await params;
  const result = await removeStatus(id);
  if (result === "naoencontrada") {
    return NextResponse.json({ error: "Situação não encontrada." }, { status: 404 });
  }
  if (result === "protegida") {
    return NextResponse.json(
      { error: "A situação inicial (Novo) não pode ser excluída." },
      { status: 409 },
    );
  }
  if (result === "em_uso") {
    return NextResponse.json(
      { error: "Há leads nesta situação. Mude a situação deles antes de excluir." },
      { status: 409 },
    );
  }
  return NextResponse.json({ ok: true });
}
