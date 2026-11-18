import "server-only";

import { randomUUID } from "node:crypto";

import { sql } from "@vercel/postgres";

import {
  normalizeWhatsapp,
  type Lead,
  type LeadStatus,
  type Produto,
  type StatusChange,
} from "@/lib/lead";

/** Cria as tabelas de produtos (idempotente), uma vez por processo. */
let schemaReady: Promise<void> | null = null;
export function ensureSchema(): Promise<void> {
  schemaReady ??= (async () => {
    await sql`CREATE TABLE IF NOT EXISTS produtos (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      criado TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS produtos_nome_uq ON produtos (LOWER(nome))`;
    await sql`CREATE TABLE IF NOT EXISTS lead_produtos (
      lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      produto_id TEXT NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
      PRIMARY KEY (lead_id, produto_id)
    )`;
    await sql`CREATE TABLE IF NOT EXISTS lead_status_hist (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      de TEXT,
      para TEXT NOT NULL,
      em TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`;
    await sql`CREATE INDEX IF NOT EXISTS lead_status_hist_em_idx ON lead_status_hist (em)`;
    // Leads anteriores ao histórico ganham um registro inicial (situação atual, data de criação).
    await sql`INSERT INTO lead_status_hist (id, lead_id, de, para, em)
      SELECT gen_random_uuid()::text, l.id, NULL, l.status, l.criado FROM leads l
      WHERE NOT EXISTS (SELECT 1 FROM lead_status_hist h WHERE h.lead_id = l.id)`;
  })().catch((err) => {
    schemaReady = null;
    throw err;
  });
  return schemaReady;
}

export async function listLeads(): Promise<Lead[]> {
  await ensureSchema();
  const { rows } = await sql`
    SELECT l.id, l.nome, l.whatsapp, l.status, l.criado,
      COALESCE(
        ARRAY_AGG(lp.produto_id) FILTER (WHERE lp.produto_id IS NOT NULL),
        '{}'
      ) AS produtos
    FROM leads l
    LEFT JOIN lead_produtos lp ON lp.lead_id = l.id
    GROUP BY l.id
    ORDER BY l.criado ASC`;
  return (rows as unknown[]).map((r) =>
    mapToLead(r as Record<string, unknown>),
  );
}

function mapToLead(row: Record<string, unknown>): Lead {
  const criado =
    row.criado instanceof Date
      ? row.criado.toISOString()
      : new Date(String(row.criado)).toISOString();
  return {
    id: String(row.id),
    nome: String(row.nome),
    whatsapp: String(row.whatsapp),
    status: String(row.status) as LeadStatus,
    criado,
    produtos: Array.isArray(row.produtos) ? row.produtos.map(String) : [],
  };
}

export async function addLead(input: {
  nome: string;
  whatsapp: string;
  status?: LeadStatus;
}): Promise<Lead> {
  const id = randomUUID();
  const nome = input.nome.trim();
  const whatsapp = normalizeWhatsapp(input.whatsapp);
  const status = input.status ?? "novo";
  await ensureSchema();
  await sql`INSERT INTO leads (id, nome, whatsapp, status, criado)
    VALUES (${id}, ${nome}, ${whatsapp}, ${status}, NOW())
    RETURNING criado`;
  await sql`INSERT INTO lead_status_hist (id, lead_id, de, para, em)
    VALUES (${randomUUID()}, ${id}, NULL, ${status}, NOW())`;
  return {
    id,
    nome,
    whatsapp,
    status,
    criado: new Date().toISOString(),
    produtos: [],
  };
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<Lead | null> {
  await ensureSchema();
  const { rows: prev } = await sql`SELECT status FROM leads WHERE id = ${id}`;
  if (prev.length === 0) return null;
  const anterior = String(prev[0].status);
  const { rows } = await sql`UPDATE leads SET status = ${status}
    WHERE id = ${id}
    RETURNING id, nome, whatsapp, status, criado`;
  if (rows.length === 0) return null;
  if (anterior !== status) {
    await sql`INSERT INTO lead_status_hist (id, lead_id, de, para, em)
      VALUES (${randomUUID()}, ${id}, ${anterior}, ${status}, NOW())`;
  }
  return mapToLead(rows[0] as Record<string, unknown>);
}

/** Atualiza nome e WhatsApp do lead (já validados e normalizados). */
export async function updateLeadDados(
  id: string,
  nome: string,
  whatsapp: string,
): Promise<{ id: string; nome: string; whatsapp: string } | null> {
  const { rows } = await sql`UPDATE leads SET nome = ${nome}, whatsapp = ${whatsapp}
    WHERE id = ${id}
    RETURNING id, nome, whatsapp`;
  if (rows.length === 0) return null;
  return {
    id: String(rows[0].id),
    nome: String(rows[0].nome),
    whatsapp: String(rows[0].whatsapp),
  };
}

export async function removeLead(id: string): Promise<boolean> {
  await ensureSchema();
  await sql`DELETE FROM lead_produtos WHERE lead_id = ${id}`;
  const { rowCount } = await sql`DELETE FROM leads WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}

/* ───────────── Produtos ───────────── */

export async function listProdutos(): Promise<Produto[]> {
  await ensureSchema();
  const { rows } = await sql`SELECT id, nome FROM produtos ORDER BY LOWER(nome) ASC`;
  return rows.map((r) => ({ id: String(r.id), nome: String(r.nome) }));
}

/** Retorna null se já existir um produto com o mesmo nome (sem diferenciar maiúsculas). */
export async function addProduto(nome: string): Promise<Produto | null> {
  await ensureSchema();
  const id = randomUUID();
  const clean = nome.trim();
  const { rowCount } = await sql`INSERT INTO produtos (id, nome)
    VALUES (${id}, ${clean})
    ON CONFLICT DO NOTHING`;
  return (rowCount ?? 0) > 0 ? { id, nome: clean } : null;
}

/** Renomeia um produto. "duplicado" se outro já usa o nome (sem diferenciar maiúsculas). */
export async function renameProduto(
  id: string,
  nome: string,
): Promise<Produto | "duplicado" | null> {
  await ensureSchema();
  const clean = nome.trim();
  const { rows: found } = await sql`SELECT id FROM produtos WHERE id = ${id}`;
  if (found.length === 0) return null;
  const { rows: dup } = await sql`SELECT id FROM produtos
    WHERE LOWER(nome) = LOWER(${clean}) AND id <> ${id}`;
  if (dup.length > 0) return "duplicado";
  await sql`UPDATE produtos SET nome = ${clean} WHERE id = ${id}`;
  return { id, nome: clean };
}

export async function removeProduto(id: string): Promise<boolean> {
  await ensureSchema();
  await sql`DELETE FROM lead_produtos WHERE produto_id = ${id}`;
  const { rowCount } = await sql`DELETE FROM produtos WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}

/** Substitui os produtos de interesse do lead pelo conjunto informado. */
export async function setLeadProdutos(
  leadId: string,
  produtoIds: string[],
): Promise<string[] | null> {
  await ensureSchema();
  const { rows: found } = await sql`SELECT id FROM leads WHERE id = ${leadId}`;
  if (found.length === 0) return null;

  const wanted = new Set(produtoIds.map(String));
  const { rows: all } = await sql`SELECT id FROM produtos`;
  const ids = all.map((r) => String(r.id)).filter((id) => wanted.has(id));

  await sql`DELETE FROM lead_produtos WHERE lead_id = ${leadId}`;
  for (const pid of ids) {
    await sql`INSERT INTO lead_produtos (lead_id, produto_id)
      VALUES (${leadId}, ${pid}) ON CONFLICT DO NOTHING`;
  }
  return ids;
}

/* ───────────── Histórico de situações ───────────── */

export async function listStatusHistory(): Promise<StatusChange[]> {
  await ensureSchema();
  const { rows } = await sql`
    SELECT h.id, h.lead_id, l.nome AS lead_nome, h.de, h.para, h.em
    FROM lead_status_hist h
    JOIN leads l ON l.id = h.lead_id
    ORDER BY h.em DESC
    LIMIT 5000`;
  return rows.map((r) => ({
    id: String(r.id),
    leadId: String(r.lead_id),
    leadNome: String(r.lead_nome),
    de: r.de ? (String(r.de) as LeadStatus) : null,
    para: String(r.para) as LeadStatus,
    em:
      r.em instanceof Date ? r.em.toISOString() : new Date(String(r.em)).toISOString(),
  }));
}
