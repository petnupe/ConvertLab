export type LeadStatus =
  | "novo"
  | "contato"
  | "orcamento"
  | "fechado"
  | "perdido";

export interface Lead {
  id: string;
  nome: string;
  whatsapp: string; // apenas dígitos: 55 + DDD + número
  status: LeadStatus;
  criado: string; // ISO
}

export const LEAD_STATUSES: LeadStatus[] = [
  "novo",
  "contato",
  "orcamento",
  "fechado",
  "perdido",
];

/**
 * Normaliza um número brasileiro para o padrão E.164 (somente dígitos),
 * garantindo que comece com "55". Aceita "(51) 99999-9999", "5199999-9999", etc.
 */
export function normalizeWhatsapp(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("55") ? digits : `55${digits}`;
}

/** Formata um número normalizado para exibição: +55 (51) 99999-9999 */
export function formatWhatsapp(whatsapp: string): string {
  const d = whatsapp.replace(/\D/g, "");
  if (d.length < 12) return whatsapp;
  return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, 9)}-${d.slice(9)}`;
}

export function waLink(whatsapp: string, message?: string): string {
  const qs = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${whatsapp}${qs}`;
}