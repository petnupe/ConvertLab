import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const FALLBACK_FROM = process.env.MAIL_FROM ?? "onboarding@resend.dev";
const TO = process.env.MAIL_TO ?? "contato@cuidadosmeus.com.br";
const FROM = `ConvertLab <${FALLBACK_FROM}>`;

const FIELDS = [
  { key: "nome", label: "Nome" },
  { key: "empresa", label: "Empresa" },
  { key: "instagram", label: "Instagram" },
  { key: "objetivo", label: "Objetivo" },
  { key: "servico", label: "Serviço" },
  { key: "cor", label: "Cor" },
  { key: "referencias", label: "Referências" },
];

type ContactPayload = Record<string, string>;

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "RESEND_API_KEY não configurada." },
      { status: 500 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Payload inválido." },
      { status: 400 },
    );
  }

  const lines = [
    "Novo briefing — ConvertLab",
    "------------------------",
    ...FIELDS.filter((f) => body[f.key]?.trim()).map(
      (f) => `${f.label}: ${body[f.key].trim()}`,
    ),
  ].join("\n");

  if (!lines.split("\n").slice(2).join("")) {
    return NextResponse.json(
      { ok: false, error: "Briefing vazio." },
      { status: 400 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: "Novo briefing — ConvertLab",
      text: lines,
      replyTo: process.env.MAIL_TO || body.email || TO,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Falha ao enviar email:", error);
    return NextResponse.json(
      { ok: false, error: "Falha ao enviar email." },
      { status: 500 },
    );
  }
}