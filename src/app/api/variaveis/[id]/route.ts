import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { removeVariavel, updateVariavel } from "@/lib/lead-store";
import { RESERVED_VARS, VAR_NAME_RE, normalizeVarName } from "@/lib/mensagem";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: { nome?: string; valor?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const dados: { nome?: string; valor?: string } = {};
  if (body.nome !== undefined) {
    const nome = normalizeVarName(String(body.nome));
    if (!VAR_NAME_RE.test(nome)) {
      return NextResponse.json(
        { error: "Nome inválido: use letras, números e _ (começando por letra, até 30)." },
        { status: 400 },
      );
    }
    if (RESERVED_VARS.has(nome)) {
      return NextResponse.json({ error: "Esse nome já é uma variável automática." }, { status: 409 });
    }
    dados.nome = nome;
  }
  if (body.valor !== undefined) {
    const valor = String(body.valor).trim();
    if (valor.length > 500) {
      return NextResponse.json({ error: "Valor muito longo (máx. 500)." }, { status: 400 });
    }
    dados.valor = valor;
  }

  const { id } = await params;
  const result = await updateVariavel(id, dados);
  if (result === null) {
    return NextResponse.json({ error: "Variável não encontrada." }, { status: 404 });
  }
  if (result === "duplicada") {
    return NextResponse.json({ error: "Já existe uma variável com esse nome." }, { status: 409 });
  }
  return NextResponse.json({ variavel: result });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const { id } = await params;
  if (!(await removeVariavel(id))) {
    return NextResponse.json({ error: "Variável não encontrada." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
