"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
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
  History,
  Pencil,
  BarChart3,
  ListChecks,
  Tag,
} from "lucide-react";

import { LeadMessageModal } from "@/components/admin/lead-message-modal";
import { ProdutoMultiSelect } from "@/components/admin/produto-multiselect";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { ProdutoEditModal } from "@/components/admin/produto-edit-modal";
import { LeadEditModal } from "@/components/admin/lead-edit-modal";
import { LeadHistoryModal } from "@/components/admin/lead-history-modal";
import { StatusJustifyModal } from "@/components/admin/status-justify-modal";
import { CadastroSection } from "@/components/admin/cadastro-section";

import {
  formatWhatsapp,
  waLink,
  normalizeWhatsapp,
  statusNome,
  INITIAL_STATUS,
  RAMO_NENHUM,
  type Lead,
  type LeadStatus,
  type Produto,
  type Ramo,
  type Status,
} from "@/lib/lead";
import { renderMessage, type Variavel } from "@/lib/mensagem";

type Kind = "produto" | "status" | "ramo";
interface Cad {
  id: string;
  nome: string;
}

/** Como cada cadastro conversa com a API e como é descrito nas mensagens. */
const KINDS: Record<
  Kind,
  { api: string; field: string; singular: string; sort: boolean }
> = {
  produto: { api: "/api/produtos", field: "produto", singular: "produto", sort: true },
  status: { api: "/api/status", field: "status", singular: "situação", sort: false },
  ramo: { api: "/api/ramos", field: "ramo", singular: "ramo", sort: false },
};

const byNome = (a: Cad, b: Cad) =>
  a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" });

const SELECT =
  "appearance-none rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-400/60";

/* Texto da "Mensagem" (localStorage), lido sem divergir entre servidor e cliente. */
const MESSAGE_KEY = "convertscale.whatsapp.message";
const messageListeners = new Set<() => void>();
function subscribeMessage(cb: () => void) {
  messageListeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    messageListeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function readMessage(): string {
  try {
    return localStorage.getItem(MESSAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

/** Estado local que se re-sincroniza quando chegam props novas do servidor. */
function useSynced<T>(prop: T) {
  const [value, setValue] = useState(prop);
  const [prev, setPrev] = useState(prop);
  if (prop !== prev) {
    setPrev(prop);
    setValue(prop);
  }
  return [value, setValue] as const;
}

export function AdminDashboard({
  leads: leadsProp,
  produtos: produtosProp,
  statuses: statusesProp,
  ramos: ramosProp,
  variaveis: variaveisProp,
}: {
  leads: Lead[];
  produtos: Produto[];
  statuses: Status[];
  ramos: Ramo[];
  variaveis: Variavel[];
}) {
  const router = useRouter();

  // Estado local: a lista muda na hora após qualquer alteração; o router.refresh()
  // sincroniza com o banco e, quando chegam props novas, elas substituem o estado.
  const [leads, setLeads] = useSynced(leadsProp);
  const [produtos, setProdutos] = useSynced(produtosProp);
  const [statuses, setStatuses] = useSynced(statusesProp);
  const [ramos, setRamos] = useSynced(ramosProp);
  const [variaveis, setVariaveis] = useSynced(variaveisProp);

  const [toDelete, setToDelete] = useState<
    { kind: Kind | "lead" | "variavel"; item: Cad | Lead | Variavel } | null
  >(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [historyLead, setHistoryLead] = useState<Lead | null>(null);
  const [pendingStatus, setPendingStatus] = useState<{ lead: Lead; status: LeadStatus } | null>(null);
  const [editing, setEditing] = useState<{ kind: Kind; item: Cad } | null>(null);
  const [cadError, setCadError] = useState<Record<Kind, string>>({
    produto: "",
    status: "",
    ramo: "",
  });

  const [busca, setBusca] = useState("");
  const [produtoFilter, setProdutoFilter] = useState<string>("todos");
  const [ramoFilter, setRamoFilter] = useState<string>("todos");
  const [filter, setFilter] = useState<LeadStatus | "todos">("todos");

  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const message = useSyncExternalStore(subscribeMessage, readMessage, () => "");

  /** Texto enviado pelo botão WhatsApp: o da "Mensagem" (com %%NOME%%); vazio = sem texto. */
  const textFor = (lead: Lead) =>
    renderMessage(message, lead, { produtos, ramos, statuses, variaveis });

  const setList = (kind: Kind) =>
    kind === "produto" ? setProdutos : kind === "status" ? setStatuses : setRamos;

  /* ───────── cadastros genéricos (produtos, situações, ramos) ───────── */

  async function addCad(kind: Kind, nome: string): Promise<string | null> {
    const cfg = KINDS[kind];
    setCadError((e) => ({ ...e, [kind]: "" }));
    const res = await fetch(cfg.api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return data.error ?? `Erro ao salvar ${cfg.singular}.`;
    const item = data[cfg.field] as Cad | undefined;
    if (item) {
      setList(kind)((prev: Cad[]) => {
        const next = [...prev, item];
        return cfg.sort ? next.sort(byNome) : next;
      });
    }
    router.refresh();
    return null;
  }

  async function renameCad(kind: Kind, id: string, nome: string): Promise<string | null> {
    const cfg = KINDS[kind];
    const res = await fetch(`${cfg.api}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return data.error ?? `Erro ao salvar ${cfg.singular}.`;
    }
    setList(kind)((prev: Cad[]) => {
      const next = prev.map((p) => (p.id === id ? { ...p, nome } : p));
      return cfg.sort ? next.sort(byNome) : next;
    });
    setEditing(null);
    router.refresh();
    return null;
  }

  async function removeCad(kind: Kind, item: Cad) {
    const cfg = KINDS[kind];
    setCadError((e) => ({ ...e, [kind]: "" }));
    const res = await fetch(`${cfg.api}/${item.id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setCadError((e) => ({
        ...e,
        [kind]: data.error ?? `Não foi possível excluir ${cfg.singular}.`,
      }));
      return;
    }
    setList(kind)((prev: Cad[]) => prev.filter((x) => x.id !== item.id));
    if (kind === "produto") {
      if (produtoFilter === item.id) setProdutoFilter("todos");
      setLeads((prev) =>
        prev.map((l) => ({ ...l, produtos: l.produtos.filter((id) => id !== item.id) })),
      );
    } else if (kind === "ramo") {
      if (ramoFilter === item.id) setRamoFilter("todos");
      setLeads((prev) =>
        prev.map((l) => (l.ramo === item.id ? { ...l, ramo: RAMO_NENHUM } : l)),
      );
    } else if (filter === item.id) {
      setFilter("todos");
    }
    router.refresh();
  }

  /* ───────── variáveis da mensagem ───────── */

  async function addVariavel(nome: string, valor: string): Promise<string | null> {
    const res = await fetch("/api/variaveis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, valor }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return data.error ?? "Erro ao salvar variável.";
    if (data.variavel) {
      setVariaveis((prev) =>
        [...prev, data.variavel as Variavel].sort((a, b) => a.nome.localeCompare(b.nome)),
      );
    }
    router.refresh();
    return null;
  }

  async function updateVariavel(id: string, valor: string): Promise<string | null> {
    const res = await fetch(`/api/variaveis/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valor }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return data.error ?? "Erro ao salvar variável.";
    }
    const v = valor.trim();
    setVariaveis((prev) => prev.map((x) => (x.id === id ? { ...x, valor: v } : x)));
    router.refresh();
    return null;
  }

  async function removeVariavel(v: Variavel) {
    const res = await fetch(`/api/variaveis/${v.id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Não foi possível excluir a variável.");
      return;
    }
    setVariaveis((prev) => prev.filter((x) => x.id !== v.id));
    router.refresh();
  }

  /* ───────── leads ───────── */

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

  async function setStatus(id: string, status: LeadStatus, justificativa = "") {
    setError("");
    const res = await fetch("/api/leads/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, justificativa }),
    });
    if (!res.ok) {
      setError("Não foi possível atualizar a situação.");
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    router.refresh();
  }

  async function setRamo(id: string, ramoId: string) {
    setError("");
    const before = leads;
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ramo: ramoId } : l)));
    const res = await fetch(`/api/leads/${id}/ramo`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ramoId }),
    });
    if (!res.ok) {
      setLeads(before);
      setError("Não foi possível atualizar o ramo de atividade.");
      return;
    }
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
    setMessageOpen(false);
    try {
      localStorage.setItem(MESSAGE_KEY, text);
    } catch {
      /* sem armazenamento disponível: a mensagem não é lembrada */
    }
    messageListeners.forEach((l) => l());
  }

  function downloadTxt() {
    const links = visibleLeads.map((lead) => waLink(lead.whatsapp, textFor(lead)));
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

  /* ───────── derivados ───────── */

  const counts = new Map<string, number>();
  for (const l of leads) counts.set(l.status, (counts.get(l.status) ?? 0) + 1);

  const produtoNomes = new Map(produtos.map((p) => [p.id, p.nome]));
  const ramoNomes = new Map(ramos.map((r) => [r.id, r.nome]));
  const fechados = counts.get("fechado") ?? 0;

  const norm = (s: string) =>
    s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  const termo = norm(busca.trim());
  const termoDigits = busca.replace(/\D/g, "");

  const visibleLeads = leads.filter(
    (l) =>
      (termo === "" ||
        norm(l.nome).includes(termo) ||
        (termoDigits !== "" && l.whatsapp.replace(/\D/g, "").includes(termoDigits))) &&
      (filter === "todos" || l.status === filter) &&
      (ramoFilter === "todos" || l.ramo === ramoFilter) &&
      (produtoFilter === "todos" ||
        (produtoFilter === "sem" ? l.produtos.length === 0 : l.produtos.includes(produtoFilter))),
  );

  const deleteInfo = (() => {
    if (!toDelete) return { title: "", description: "" };
    if (toDelete.kind === "lead") {
      return {
        title: "Excluir lead?",
        description: `"${(toDelete.item as Lead).nome}" será removido do cadastro, junto com seus produtos de interesse e histórico. Essa ação não pode ser desfeita.`,
      };
    }
    if (toDelete.kind === "variavel") {
      const v = toDelete.item as Variavel;
      return {
        title: "Excluir variável?",
        description: `%%${v.nome}%% será removida. Mensagens que a usam passam a exibir o código sem valor. Essa ação não pode ser desfeita.`,
      };
    }
    const nome = (toDelete.item as Cad).nome;
    if (toDelete.kind === "produto") {
      return {
        title: "Excluir produto?",
        description: `"${nome}" será removido e deixará de constar em todos os prospects que o tinham. Essa ação não pode ser desfeita.`,
      };
    }
    if (toDelete.kind === "ramo") {
      return {
        title: "Excluir ramo de atividade?",
        description: `"${nome}" será removido e os leads desse ramo passarão para "Nenhum". Essa ação não pode ser desfeita.`,
      };
    }
    return {
      title: "Excluir situação?",
      description: `"${nome}" será removida do cadastro. Só é possível excluir situações sem leads. Essa ação não pode ser desfeita.`,
    };
  })();

  const editingTitle = editing
    ? { produto: "Editar produto", status: "Editar situação", ramo: "Editar ramo de atividade" }[
        editing.kind
      ]
    : undefined;
  const editingProtected =
    editing !== null &&
    ((editing.kind === "status" && editing.item.id === INITIAL_STATUS) ||
      (editing.kind === "ramo" && editing.item.id === RAMO_NENHUM));

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
              {fechados > 0 ? `${fechados} fechado(s) ✅` : "nenhum fechado ainda"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              aria-label="Relatório"
              title="Relatório"
              href="/admin/relatorio"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              aria-label="Sair"
              title="Sair"
              type="button"
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                router.refresh();
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
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
            aria-label="Adicionar lead"
            title="Adicionar lead"
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_-12px_rgba(124,58,237,0.9)] transition-colors hover:bg-violet-700 disabled:opacity-70"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </form>
        {error ? (
          <p className="mt-3 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {statuses.map((s) => {
            const active = filter === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setFilter(active ? "todos" : s.id)}
                aria-pressed={active}
                title={active ? "Remover filtro" : `Filtrar por ${s.nome}`}
                className={`cl-card rounded-2xl px-4 py-3 text-center outline-none transition-colors focus-visible:border-cyan-400/60 ${
                  active
                    ? "!border-violet-500/70 bg-violet-500/15"
                    : "hover:border-white/25"
                }`}
              >
                <p className="text-2xl font-bold text-white">{counts.get(s.id) ?? 0}</p>
                <p className="mt-0.5 truncate text-xs text-white/50">{s.nome}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-6">
          <CadastroSection
            title="Situações"
            icon={<ListChecks className="h-4 w-4" aria-hidden="true" />}
            items={statuses}
            placeholder="Nova situação (ex.: Reunião marcada)"
            maxLength={40}
            error={cadError.status}
            onAdd={(n) => addCad("status", n)}
            onEdit={(item) => setEditing({ kind: "status", item })}
          />
          <CadastroSection
            title="Ramos de atividade"
            icon={<Tag className="h-4 w-4" aria-hidden="true" />}
            items={ramos}
            placeholder="Novo ramo (ex.: Academia)"
            maxLength={40}
            error={cadError.ramo}
            onAdd={(n) => addCad("ramo", n)}
            onEdit={(item) => setEditing({ kind: "ramo", item })}
          />
          <CadastroSection
            title="Produtos"
            icon={<Package className="h-4 w-4" aria-hidden="true" />}
            items={produtos}
            placeholder="Novo produto (ex.: Recanto das Oliveiras, CustomMyLanding)"
            error={cadError.produto}
            onAdd={(n) => addCad("produto", n)}
            onEdit={(item) => setEditing({ kind: "produto", item })}
          />
        </div>

        <section className="mt-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-white/60">
              <Users className="h-4 w-4" aria-hidden="true" />
              Leads cadastrados
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              <button
                aria-label="Mensagem do WhatsApp"
                title="Mensagem do WhatsApp"
                type="button"
                onClick={() => setMessageOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                aria-label="Gerar .txt com os links"
                title="Gerar .txt com os links"
                type="button"
                onClick={downloadTxt}
                disabled={visibleLeads.length === 0}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                {visibleLeads.length}
              </button>

              <input
                type="search"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar nome ou telefone"
                aria-label="Buscar lead por nome ou telefone"
                className={`${SELECT} w-52 placeholder:text-white/35`}
              />

              <select
                value={ramoFilter}
                onChange={(e) => setRamoFilter(e.target.value)}
                aria-label="Filtrar por ramo de atividade"
                className={SELECT}
              >
                <option value="todos" className="bg-[#14102a]">
                  Todos os ramos
                </option>
                {ramos.map((r) => (
                  <option key={r.id} value={r.id} className="bg-[#14102a]">
                    {r.nome}
                  </option>
                ))}
              </select>

              <select
                value={produtoFilter}
                onChange={(e) => setProdutoFilter(e.target.value)}
                aria-label="Filtrar por produto"
                className={SELECT}
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
                onChange={(e) => setFilter(e.target.value as LeadStatus | "todos")}
                aria-label="Filtrar por situação"
                className={SELECT}
              >
                <option value="todos" className="bg-[#14102a]">
                  Todas as situações
                </option>
                {statuses.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#14102a]">
                    {s.nome}
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

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    aria-label={`WhatsApp de ${lead.nome}`}
                    title={`WhatsApp de ${lead.nome}`}
                    href={waLink(lead.whatsapp, textFor(lead))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-400/10"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <select
                    value={lead.ramo}
                    onChange={(e) => setRamo(lead.id, e.target.value)}
                    aria-label={`Ramo de atividade de ${lead.nome}`}
                    title={`Ramo: ${ramoNomes.get(lead.ramo) ?? "Nenhum"}`}
                    className={SELECT}
                  >
                    {ramos.map((r) => (
                      <option key={r.id} value={r.id} className="bg-[#14102a]">
                        {r.nome}
                      </option>
                    ))}
                  </select>

                  <ProdutoMultiSelect
                    produtos={produtos}
                    selected={lead.produtos}
                    onChange={(ids) => setLeadProdutos(lead.id, ids)}
                  />

                  <select
                    value={lead.status}
                    onChange={(e) => setPendingStatus({ lead, status: e.target.value as LeadStatus })}
                    aria-label={`Situação de ${lead.nome}`}
                    className={SELECT}
                  >
                    {statuses.map((s) => (
                      <option key={s.id} value={s.id} className="bg-[#14102a]">
                        {s.nome}
                      </option>
                    ))}
                    {statuses.some((s) => s.id === lead.status) ? null : (
                      <option value={lead.status} className="bg-[#14102a]">
                        {statusNome(statuses, lead.status)}
                      </option>
                    )}
                  </select>

                  <button
                    type="button"
                    onClick={() => setHistoryLead(lead)}
                    className="rounded-xl p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label={`Histórico de ${lead.nome}`}
                    title="Histórico"
                  >
                    <History className="h-4 w-4" aria-hidden="true" />
                  </button>

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

        <StatusJustifyModal
          key={pendingStatus ? `${pendingStatus.lead.id}:${pendingStatus.status}` : "none-just"}
          pending={pendingStatus}
          statuses={statuses}
          onCancel={() => setPendingStatus(null)}
          onConfirm={(texto) => {
            if (!pendingStatus) return;
            const { lead, status } = pendingStatus;
            setPendingStatus(null);
            void setStatus(lead.id, status, texto);
          }}
        />

        <LeadHistoryModal
          key={historyLead?.id ?? "none-hist"}
          lead={historyLead}
          statuses={statuses}
          onClose={() => setHistoryLead(null)}
        />

        <LeadEditModal
          key={editingLead?.id ?? "none"}
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSave={saveLeadDados}
        />

        <ProdutoEditModal
          key={editing ? `${editing.kind}:${editing.item.id}` : "none"}
          produto={editing?.item ?? null}
          title={editingTitle}
          canDelete={!editingProtected}
          onClose={() => setEditing(null)}
          onSave={(id, nome) => renameCad(editing!.kind, id, nome)}
          onRequestDelete={(item) => {
            if (!editing) return;
            setToDelete({ kind: editing.kind, item });
            setEditing(null);
          }}
        />

        <ConfirmModal
          open={toDelete !== null}
          title={deleteInfo.title}
          description={deleteInfo.description}
          onClose={() => setToDelete(null)}
          onConfirm={async () => {
            if (!toDelete) return;
            if (toDelete.kind === "lead") await removeLead((toDelete.item as Lead).id);
            else if (toDelete.kind === "variavel") await removeVariavel(toDelete.item as Variavel);
            else await removeCad(toDelete.kind, toDelete.item as Cad);
            setToDelete(null);
          }}
        />

        <LeadMessageModal
          key={messageOpen ? "open" : "closed"}
          open={messageOpen}
          value={message}
          onClose={() => setMessageOpen(false)}
          onSave={saveMessage}
          variaveis={variaveis}
          onAddVar={addVariavel}
          onUpdateVar={updateVariavel}
          onDeleteVar={(v) => setToDelete({ kind: "variavel", item: v })}
          preview={
            leads.length > 0
              ? {
                  nome: (visibleLeads[0] ?? leads[0]).nome,
                  render: (tpl) =>
                    renderMessage(tpl, visibleLeads[0] ?? leads[0], {
                      produtos,
                      ramos,
                      statuses,
                      variaveis,
                    }),
                }
              : null
          }
        />
      </div>
    </div>
  );
}
