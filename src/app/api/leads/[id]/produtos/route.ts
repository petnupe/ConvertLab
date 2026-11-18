import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { setLeadProdutos } from "@/lib/lead-store";

export const runtime = "nodejs";

/** Substitui os produtos de interesse do prospect: body { produtoIds: string[] }. */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: { produtoIds?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }
  if (!Array.isArray(body.produtoIds)) {
    return NextResponse.json({ error: "produtoIds deve ser uma lista." }, { status: 400 });
  }

  const { id } = await params;
  const produtos = await setLeadProdutos(id, body.produtoIds.map(String));
  if (!produtos) {
    return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ produtos });
}
