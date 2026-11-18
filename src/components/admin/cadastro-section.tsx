"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Pencil, Plus } from "lucide-react";

interface Item {
  id: string;
  nome: string;
}

interface Props {
  title: string;
  icon: ReactNode;
  items: Item[];
  placeholder: string;
  maxLength?: number;
  error?: string;
  /** Retorna uma mensagem de erro ou null quando salvou. */
  onAdd: (nome: string) => Promise<string | null>;
  onEdit: (item: Item) => void;
}

/** Bloco de cadastro simples (lista de nomes + adicionar + editar), usado por Produtos, Situações e Ramos. */
export function CadastroSection({
  title,
  icon,
  items,
  placeholder,
  maxLength = 80,
  error,
  onAdd,
  onEdit,
}: Props) {
  const [nome, setNome] = useState("");
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;
    setBusy(true);
    setLocalError("");
    const err = await onAdd(nome.trim());
    setBusy(false);
    if (err) setLocalError(err);
    else setNome("");
  }

  const message = localError || error;

  return (
    <section className="cl-card rounded-3xl p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-white/60">
        {icon}
        {title} ({items.length})
      </h2>
      <form onSubmit={submit} className="mt-3 flex gap-3">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-label={`Novo item em ${title}`}
          className="w-full flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-70"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Adicionar
        </button>
      </form>
      {message ? (
        <p className="mt-3 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {message}
        </p>
      ) : null}
      {items.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {items.map((it) => (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => onEdit(it)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-sm text-white/85 transition-colors hover:border-cyan-400/50 hover:text-white"
                aria-label={`Editar ${it.nome}`}
              >
                {it.nome}
                <Pencil className="h-3 w-3 text-white/40" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
