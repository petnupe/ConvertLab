import "server-only";

import { randomUUID } from "node:crypto";

import { sql } from "@vercel/postgres";

import {
  normalizeWhatsapp,
  type Lead,
  type LeadStatus,
} from "@/lib/lead";

export async function listLeads(): Promise<Lead[]> {
  const { rows } = await sql`SELECT id, nome, whatsapp, status, criado FROM leads ORDER BY criado ASC`;
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
  await sql`INSERT INTO leads (id, nome, whatsapp, status, criado)
    VALUES (${id}, ${nome}, ${whatsapp}, ${status}, NOW())
    RETURNING criado`;
  return {
    id,
    nome,
    whatsapp,
    status,
    criado: new Date().toISOString(),
  };
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<Lead | null> {
  const { rows } = await sql`UPDATE leads SET status = ${status}
    WHERE id = ${id}
    RETURNING id, nome, whatsapp, status, criado`;
  if (rows.length === 0) return null;
  return mapToLead(rows[0] as Record<string, unknown>);
}

export async function removeLead(id: string): Promise<boolean> {
  const { rowCount } = await sql`DELETE FROM leads WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}