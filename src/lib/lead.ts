/** Id de uma Situação cadastrada (as 5 originais mantêm seus ids: novo, contato...). */
export type LeadStatus = string;

export interface Status {
  id: string;
  nome: string;
}

/** Situação inicial de todo lead novo; não pode ser excluída. */
export const INITIAL_STATUS: LeadStatus = "novo";

/** Situações originais, semeadas no banco na primeira execução. */
export const DEFAULT_STATUSES: Status[] = [
  { id: "novo", nome: "Novo" },
  { id: "contato", nome: "Em contato" },
  { id: "orcamento", nome: "Orçamento" },
  { id: "fechado", nome: "Fechado" },
  { id: "perdido", nome: "Perdido" },
];

/** Ramo de atividade do lead (Funerário, PetShop...). */
export interface Ramo {
  id: string;
  nome: string;
}

/** Ramo padrão de todo lead; não pode ser excluído. */
export const RAMO_NENHUM = "nenhum";

/** Ramos iniciais, semeados no banco na primeira execução. */
export const DEFAULT_RAMOS: Ramo[] = [
  { id: "funerario", nome: "Funerário" },
  { id: "petshop", nome: "PetShop" },
  { id: "nenhum", nome: "Nenhum" },
  { id: "roupas", nome: "Roupas" },
  { id: "calcados", nome: "Calçados" },
];

/** Nome de uma situação pelo id (cobre situações já removidas do cadastro). */
export function statusNome(statuses: Status[], id: LeadStatus): string {
  return statuses.find((s) => s.id === id)?.nome ?? "Situação removida";
}

export interface Lead {
  id: string;
  nome: string;
  whatsapp: string; // apenas dígitos: 55 + DDD + número
  status: LeadStatus;
  criado: string; // ISO
  produtos: string[]; // ids de Produto (um prospect pode ter N produtos)
  ramo: string; // id do Ramo de atividade (1 por lead; "nenhum" por padrão)
}

/** Uma troca de situação de um lead. `de` é null no registro inicial (entrada do lead). */
export interface StatusChange {
  id: string;
  leadId: string;
  leadNome: string;
  de: LeadStatus | null;
  para: LeadStatus;
  em: string; // ISO
}

export interface Produto {
  id: string;
  nome: string;
}

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