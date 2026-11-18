import {
  RAMO_NENHUM,
  formatWhatsapp,
  statusNome,
  type Lead,
  type Produto,
  type Ramo,
  type Status,
} from "@/lib/lead";

/** Variável cadastrada pelo usuário (valor fixo, ex.: PRECO = R$ 799,00). */
export interface Variavel {
  id: string;
  nome: string; // MAIÚSCULAS, sem acento: PRECO
  valor: string;
}

/** Variáveis automáticas, preenchidas a partir dos dados de cada lead. */
export const BUILTIN_VARS = [
  { nome: "NOME", descricao: "Nome do lead / negócio", exemplo: "Pet Center" },
  { nome: "RAMO", descricao: "Ramo de atividade (vazio se for “Nenhum”)", exemplo: "PetShop" },
  {
    nome: "PRODUTOS",
    descricao: "Produtos de interesse do lead",
    exemplo: "CustomMyLanding e Recanto das Oliveiras",
  },
  { nome: "SITUACAO", descricao: "Situação atual do lead", exemplo: "Em contato" },
  { nome: "TELEFONE", descricao: "WhatsApp do lead, formatado", exemplo: "+55 (51) 99999-9999" },
] as const;

export const RESERVED_VARS: ReadonlySet<string> = new Set(BUILTIN_VARS.map((v) => v.nome));

export const VAR_NAME_RE = /^[A-Z][A-Z0-9_]{0,29}$/;

export const token = (nome: string) => `%%${nome}%%`;

/** "Preço final" -> "PRECO_FINAL" */
export function normalizeVarName(input: string): string {
  return input
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/\s+/g, "_");
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

export interface MessageContext {
  produtos: Produto[];
  ramos: Ramo[];
  statuses: Status[];
  variaveis: Variavel[];
}

/**
 * Monta a mensagem de um lead. Variável sem valor vira vazio; um código que não
 * existe (ex.: erro de digitação) é mantido como está, para ficar visível.
 */
export function renderMessage(template: string, lead: Lead, ctx: MessageContext): string {
  const produtoNome = new Map(ctx.produtos.map((p) => [p.id, p.nome]));
  const ramoNome = new Map(ctx.ramos.map((r) => [r.id, r.nome]));
  const custom = new Map(ctx.variaveis.map((v) => [v.nome, v.valor]));

  const builtin: Record<string, string> = {
    NOME: lead.nome,
    RAMO: lead.ramo === RAMO_NENHUM ? "" : (ramoNome.get(lead.ramo) ?? ""),
    PRODUTOS: joinList(
      lead.produtos.map((id) => produtoNome.get(id)).filter((n): n is string => Boolean(n)),
    ),
    SITUACAO: statusNome(ctx.statuses, lead.status),
    TELEFONE: formatWhatsapp(lead.whatsapp),
  };

  return template
    .replace(/%%([A-Za-z0-9_]+)%%/g, (match, raw: string) => {
      const key = raw.toUpperCase();
      if (key in builtin) return builtin[key];
      if (custom.has(key)) return custom.get(key) ?? "";
      return match;
    })
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}
