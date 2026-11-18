import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { addVariavel, listVariaveis } from "@/lib/lead-store";
import { RESERVED_VARS, VAR_NAME_RE, normalizeVarName } from "@/lib/mensagem";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  return NextResponse.json({ variaveis: await listVariaveis() });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: { nome?: string; valor?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const nome = normalizeVarName(String(body.nome ?? ""));
  const valor = String(body.valor ?? "").trim();
  if (!VAR_NAME_RE.test(nome)) {
    return NextResponse.json(
      { error: "Nome inválido: use letras, números e _ (começando por letra, até 30)." },
      { status: 400 },
    );
  }
  if (RESERVED_VARS.has(nome)) {
    return NextResponse.json({ error: "Esse nome já é uma variável automática." }, { status: 409 });
  }
  if (valor.length > 500) {
    return NextResponse.json({ error: "Valor muito longo (máx. 500)." }, { status: 400 });
  }

  const variavel = await addVariavel(nome, valor);
  if (!variavel) {
    return NextResponse.json({ error: "Já existe uma variável com esse nome." }, { status: 409 });
  }
  return NextResponse.json({ variavel }, { status: 201 });
}
