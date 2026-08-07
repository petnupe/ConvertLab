import { sql } from "@vercel/postgres";

import { normalizeWhatsapp } from "../src/lib/lead";

const SEED: Array<{ id: string; nome: string; whatsapp: string }> = [
  { id: "seed-petcenter", nome: "Pet Center", whatsapp: "5551985675260" },
  { id: "seed-petstore", nome: "Pet Store É o Bicho", whatsapp: "555134475634" },
  { id: "seed-patas", nome: "Patas e Pelos", whatsapp: "5551980429176" },
  { id: "seed-filhotes", nome: "Filhotes de 4 Patas", whatsapp: "5551985271176" },
  { id: "seed-petart", nome: "Pet Art", whatsapp: "5551981913970" },
  { id: "seed-bellevet", nome: "Clínica Belle Vet", whatsapp: "5551989316776" },
  { id: "seed-petsday", nome: "Pets Day", whatsapp: "5551986079331" },
];

async function main(): Promise<void> {
  await sql`CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'novo',
    criado TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  console.log("[db-setup] tabela 'leads' garantida.");

  for (const lead of SEED) {
    await sql`INSERT INTO leads (id, nome, whatsapp, status, criado)
      VALUES (${lead.id}, ${lead.nome}, ${normalizeWhatsapp(lead.whatsapp)}, 'contato', NOW())
      ON CONFLICT (id) DO NOTHING`;
  }
  console.log(`[db-setup] ${SEED.length} pet shops seedados (se já existiam, ignorados).`);

  const { rows } = await sql`SELECT COUNT(*)::int AS total FROM leads`;
  console.log(`[db-setup] total de leads no banco: ${rows[0].total}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[db-setup] erro:", err);
    process.exit(1);
  });