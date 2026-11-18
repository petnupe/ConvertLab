"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  LogOut,
  Loader2,
  MessageCircle,
  Users,
  FileText,
  FileDown,
  Package,
  Pencil,
  BarChart3,
} from "lucide-react";

import { LeadMessageModal } from "@/components/admin/lead-message-modal";
import { ProdutoMultiSelect } from "@/components/admin/produto-multiselect";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { ProdutoEditModal } from "@/components/admin/produto-edit-modal";
import { LeadEditModal } from "@/components/admin/lead-edit-modal";

import {
  formatWhatsapp,
  waLink,
  normalizeWhatsapp,
  LEAD_STATUSES,
  STATUS_LABELS,
  type Lead,
  type LeadStatus,
  type Produto,
} from "@/lib/lead";


export function AdminDashboard({
  leads: leadsProp,
  produtos: produtosProp,
}: {
  leads: Lead[];
  produtos: Produto[];
}) {
  const router = useRouter();

  // Estado local: a lista muda na hora após qualquer alteração; o router.refresh()
  // sincroniza com o banco e, quando chegam props novas, elas substituem o estado.
  const [leads, setLeads] = useState(leadsProp);
  const [prevLeadsProp, setPrevLeadsProp] = useState(leadsProp);
  if (leadsProp !== prevLeadsProp) {
    setPrevLeadsProp(leadsProp);
    setLeads(leadsProp);
  }
  const [produtos, setProdutos] = useState(produtosProp);
  const [prevProdutosProp, setPrevProdutosProp] = useState(produtosProp);
  if (produtosProp !== prevProdutosProp) {
    setPrevProdutosProp(produtosProp);
    setProdutos(produtosProp);
  }

  const [toDelete, setToDelete] = useState<
    { kind: "produto"; item: Produto } | { kind: "lead"; item: Lead } | null
  >(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);
  const [produtoNome, setProdutoNome] = useState("");
  const [produtoError, setProdutoError] = useState("");
  const [produtoFilter, setProdutoFilter] = useState<string>("todos");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "todos">("todos");
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState(() =>
    typeof window !== "undefined"
      ? (localStorage.getItem("convertscale.whatsapp.message") ?? "")
      : "",
  );

  async function addLead(e: FormEvent) {
    e.preventDefault();
    setError("");
    const digits = normalizeWhatsapp(whatsapp);
    if (!nome.trim() || digits.length < 12) {
      setError("Preencha nome e um WhatsApp válido (DDD + número).");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, whatsapp: digits }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Erro ao salvar.");
      if (data.lead) setLeads((prev) => [...prev, data.lead as Lead]);
      setNome("");
      setWhatsapp("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  async function setStatus(id: string, status: LeadStatus) {
    setError("");
    const res = await fetch("/api/leads/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setError("Não foi possível atualizar a situação.");
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    router.refresh();
  }

  async function saveLeadDados(
    id: string,
    nome: string,
    whatsapp: string,
  ): Promise<string | null> {
    const res = await fetch("/api/leads/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nome, whatsapp }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return data.error ?? "Erro ao salvar.";
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, nome, whatsapp } : l)));
    setEditingLead(null);
    router.refresh();
    return null;
  }

  async function addProduto(e: FormEvent) {
    e.preventDefault();
    setProdutoError("");
    if (!produtoNome.trim()) return;
    const res = await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: produtoNome }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setProdutoError(data.error ?? "Erro ao salvar produto.");
      return;
    }
    if (data.produto) {
      setProdutos((prev) =>
        [...prev, data.produto as Produto].sort((a, b) =>
          a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" }),
        ),
      );
    }
    setProdutoNome("");
    router.refresh();
  }

  async function renameProduto(id: string, nome: string): Promise<string | null> {
    const res = await fetch("/api/produtos/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return data.error ?? "Erro ao salvar produto.";
    }
    setProdutos((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, nome } : p))
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })),
    );
    setEditingProduto(null);
    router.refresh();
    return null;
  }

  async function removeProduto(p: Produto) {
    setProdutoError("");
    const res = await fetch("/api/produtos/" + p.id, { method: "DELETE" });
    if (!res.ok) {
      setProdutoError("Não foi possível excluir o produto.");
      return;
    }
    if (produtoFilter === p.id) setProdutoFilter("todos");
    setProdutos((prev) => prev.filter((x) => x.id !== p.id));
    setLeads((prev) =>
      prev.map((l) => ({ ...l, produtos: l.produtos.filter((id) => id !== p.id) })),
    );
    router.refresh();
  }

  async function setLeadProdutos(leadId: string, produtoIds: string[]) {
    setError("");
    const before = leads;
    // otimista: o combo reflete a marcação imediatamente
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, produtos: produtoIds } : l)),
    );
    const res = await fetch(`/api/leads/${leadId}/produtos`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produtoIds }),
    });
    if (!res.ok) {
      setLeads(before);
      setError("Não foi possível atualizar os produtos do prospect.");
      return;
    }
    router.refresh();
  }

  async function removeLead(id: string) {
    setError("");
    const res = await fetch("/api/leads/" + id, { method: "DELETE" });
    if (!res.ok) {
      setError("Não foi possível excluir o lead.");
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
    router.refresh();
  }

  function saveMessage(text: string) {
    setMessage(text);
    setMessageOpen(false);
    localStorage.setItem("convertscale.whatsapp.message", text);
  }

  function downloadTxt() {
    const links = visibleLeads.map((lead) =>
      waLink(lead.whatsapp, message.replaceAll("%%NOME%%", lead.nome)),
    );
    const blob = new Blob([links.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "whatsapp-links-convertscale.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const counts = LEAD_STATUSES.reduce<Record<LeadStatus, number>>(
    (acc, s) => ((acc[s] = leads.filter((l) => l.status === s).length), acc),
    { novo: 0, contato: 0, orcamento: 0, fechado: 0, perdido: 0 },
  );

  const produtoNomes = new Map(produtos.map((p) => [p.id, p.nome]));

  const visibleLeads = leads.filter(
    (l) =>
      (filter === "todos" || l.status === filter) &&
      (produtoFilter === "todos" ||
        (produtoFilter === "sem" ? l.produtos.length === 0 : l.produtos.includes(produtoFilter))),
  );

  return (
    <div className="theme-convertscale min-h-screen bg-[#0a0812]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Cadastro de leads
            </h1>
            <p className="mt-1 text-sm text-white/55">
              {leads.length} lead(s) ·{" "}
              {counts.fechado > 0
                ? `${counts.fechado} fechado(s) ✅`
                : "nenhum fechado ainda"}
            </p>
          </div>
          <div className="flex items-center gap-2">
          <Link
            href="/admin/relatorio"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
            Relatório
          </Link>
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              router.refresh();
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sair
          </button>
          </div>
        </header>

        <form
          onSubmit={addLead}
          className="cl-card mt-8 flex flex-col gap-3 rounded-3xl p-5 sm:flex-row"
        >
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do lead / negócio"
            className="w-full flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60"
          />
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="(51) 99999-9999"
            inputMode="tel"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60 sm:w-56"
          />
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_-12px_rgba(124,58,237,0.9)] transition-colors hover:bg-violet-700 disabled:opacity-70"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="h-4 w-4" aria-hidden="true" />
            )}
            Adicionar
          </button>
        </form>
        {error ? (
          <p className="mt-3 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {(LEAD_STATUSES).map((s) => (
            <div
              key={s}
              className="cl-card rounded-2xl px-4 py-3 text-center"
            >
              <p className="text-2xl font-bold text-white">{counts[s]}</p>
              <p className="mt-0.5 text-xs text-white/50">{STATUS_LABELS[s]}</p>
            </div>
          ))}
        </div>

        <section className="cl-card mt-6 rounded-3xl p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white/60">
            <Package className="h-4 w-4" aria-hidden="true" />
            Produtos ({produtos.length})
          </h2>
          <form onSubmit={addProduto} className="mt-3 flex gap-3">
            <input
              value={produtoNome}
              onChange={(e) => setProdutoNome(e.target.value)}
              placeholder="Novo produto (ex.: Recanto das Oliveiras, CustomMyLanding)"
              maxLength={80}
              className="w-full flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Adicionar
            </button>
          </form>
          {produtoError ? (
            <p className="mt-3 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {produtoError}
            </p>
          ) : null}
          {produtos.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {produtos.map((p) => (
                <li
                  key={p.id}
                >
                  <button
                    type="button"
                    onClick={() => setEditingProduto(p)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-sm text-white/85 transition-colors hover:border-cyan-400/50 hover:text-white"
                    aria-label={`Editar produto ${p.nome}`}
                  >
                    {p.nome}
                    <Pencil className="h-3 w-3 text-white/40" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section className="mt-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-white/60">
              <Users className="h-4 w-4" aria-hidden="true" />
              Leads cadastrados
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setMessageOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Mensagem
              </button>

              <button
                type="button"
                onClick={downloadTxt}
                disabled={visibleLeads.length === 0}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Gerar .txt ({visibleLeads.length})
              </button>

              <select
                value={produtoFilter}
                onChange={(e) => setProdutoFilter(e.target.value)}
                aria-label="Filtrar por produto"
                className="appearance-none rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-400/60"
              >
                <option value="todos" className="bg-[#14102a]">
                  Todos os produtos
                </option>
                <option value="sem" className="bg-[#14102a]">
                  Sem produto
                </option>
                {produtos.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#14102a]">
                    {p.nome}
                  </option>
                ))}
              </select>

              <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as LeadStatus | "todos")
              }
              className="appearance-none rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-400/60"
            >
              <option value="todos" className="bg-[#14102a]">
                Todas as situações
              </option>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s} className="bg-[#14102a]">
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          </div>

          {visibleLeads.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/15 px-4 py-8 text-center text-sm text-white/40">
              Nenhum lead neste filtro.
            </p>
          ) : (
            visibleLeads.map((lead) => (
              <div
                key={lead.id}
                className="cl-card flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-white">{lead.nome}</p>
                  <p className="mt-0.5 text-sm text-white/55">
                    {formatWhatsapp(lead.whatsapp)}
                  </p>
                  {lead.produtos.length > 0 ? (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {lead.produtos.map((pid) => (
                        <span
                          key={pid}
                          className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs text-violet-200"
                        >
                          {produtoNomes.get(pid) ?? "—"}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={waLink(lead.whatsapp, `Olá! Vi que você se interessou por uma landing page no ConvertScale.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-400/10"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>

                  <ProdutoMultiSelect
                    produtos={produtos}
                    selected={lead.produtos}
                    onChange={(ids) => setLeadProdutos(lead.id, ids)}
                  />

                  <select
                    value={lead.status}
                    onChange={(e) =>
                      setStatus(lead.id, e.target.value as LeadStatus)
                    }
                    className="appearance-none rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-400/60"
                  >
                    {(LEAD_STATUSES).map((s) => (
                      <option key={s} value={s} className="bg-[#14102a]">
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => setEditingLead(lead)}
                    className="rounded-xl p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label={`Editar ${lead.nome}`}
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setToDelete({ kind: "lead", item: lead })}
                    className="rounded-xl p-2 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    aria-label={`Excluir ${lead.nome}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        <LeadEditModal
          key={editingLead?.id ?? "none"}
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSave={saveLeadDados}
        />

        <ProdutoEditModal
          key={editingProduto?.id ?? "none"}
          produto={editingProduto}
          onClose={() => setEditingProduto(null)}
          onSave={renameProduto}
          onRequestDelete={(p) => {
            setEditingProduto(null);
            setToDelete({ kind: "produto", item: p });
          }}
        />

        <ConfirmModal
          open={toDelete !== null}
          title={
            toDelete?.kind === "produto"
              ? "Excluir produto?"
              : "Excluir lead?"
          }
          description={
            toDelete?.kind === "produto"
              ? `"${toDelete.item.nome}" será removido e deixará de constar em todos os prospects que o tinham. Essa ação não pode ser desfeita.`
              : toDelete
                ? `"${toDelete.item.nome}" será removido do cadastro, junto com seus produtos de interesse. Essa ação não pode ser desfeita.`
                : ""
          }
          onClose={() => setToDelete(null)}
          onConfirm={async () => {
            if (!toDelete) return;
            if (toDelete.kind === "produto") await removeProduto(toDelete.item);
            else await removeLead(toDelete.item.id);
            setToDelete(null);
          }}
        />

        <LeadMessageModal
          key={messageOpen ? "open" : "closed"}
          open={messageOpen}
          value={message}
          onClose={() => setMessageOpen(false)}
          onSave={saveMessage}
        />
      </div>
    </div>
  );
}