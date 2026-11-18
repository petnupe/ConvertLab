import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { ramoExists, setLeadRamo } from "@/lib/lead-store";

export const runtime = "nodejs";

/** Define o ramo de atividade do lead: body { ramoId: string }. */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: { ramoId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const ramoId = String(body.ramoId ?? "");
  if (!ramoId || !(await ramoExists(ramoId))) {
    return NextResponse.json({ error: "Ramo inválido." }, { status: 400 });
  }

  const { id } = await params;
  if (!(await setLeadRamo(id, ramoId))) {
    return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ ramoId });
}
