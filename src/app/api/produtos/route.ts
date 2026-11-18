import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { addProduto, listProdutos } from "@/lib/lead-store";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  return NextResponse.json({ produtos: await listProdutos() });
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
  if (nome.length > 80) {
    return NextResponse.json({ error: "Nome muito longo (máx. 80)." }, { status: 400 });
  }

  const produto = await addProduto(nome);
  if (!produto) {
    return NextResponse.json({ error: "Já existe um produto com esse nome." }, { status: 409 });
  }
  return NextResponse.json({ produto }, { status: 201 });
}
