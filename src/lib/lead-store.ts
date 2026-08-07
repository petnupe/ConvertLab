import "server-only";

import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

import {
  normalizeWhatsapp,
  type Lead,
  type LeadStatus,
} from "@/lib/lead";

const DATA_DIR = path.join(process.cwd(), ".notes");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

async function readAll(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(leads: Lead[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function listLeads(): Promise<Lead[]> {
  return readAll();
}

export async function addLead(input: {
  nome: string;
  whatsapp: string;
  status?: LeadStatus;
}): Promise<Lead> {
  const lead: Lead = {
    id: randomUUID(),
    nome: input.nome.trim(),
    whatsapp: normalizeWhatsapp(input.whatsapp),
    status: input.status ?? "novo",
    criado: new Date().toISOString(),
  };
  const leads = await readAll();
  leads.push(lead);
  await writeAll(leads);
  return lead;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<Lead | null> {
  const leads = await readAll();
  const lead = leads.find((l) => l.id === id);
  if (!lead) return null;
  lead.status = status;
  await writeAll(leads);
  return lead;
}

export async function removeLead(id: string): Promise<boolean> {
  const leads = await readAll();
  const next = leads.filter((l) => l.id !== id);
  if (next.length === leads.length) return false;
  await writeAll(next);
  return true;
}