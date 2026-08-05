import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_SECURE = (process.env.SMTP_SECURE ?? "ssl").toLowerCase() === "ssl";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASSWORD;
const FROM_NAME = process.env.SMTP_FROM_NAME ?? "ConvertLab";
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL ?? "contato@cuidadosmeus.com.br";
const FROM = `${FROM_NAME} <${FROM_EMAIL}>`;
const TO = process.env.MAIL_TO ?? "contato@cuidadosmeus.com.br";

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
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { ok: false, error: "SMTP não configurado." },
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
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
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
