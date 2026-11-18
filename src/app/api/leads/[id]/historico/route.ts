import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { listLeadHistory } from "@/lib/lead-store";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  const { id } = await params;
  return NextResponse.json({ historico: await listLeadHistory(id) });
}
