import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { removeProduto } from "@/lib/lead-store";

export const runtime = "nodejs";

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
