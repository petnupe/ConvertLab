"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Check, Loader2, Trash2, X } from "lucide-react";

import type { Produto } from "@/lib/lead";

interface Props {
  produto: Produto | null;
  onClose: () => void;
  onSave: (id: string, nome: string) => Promise<string | null>; // retorna erro ou null
  onRequestDelete: (produto: Produto) => void;
  title?: string;
  /** false esconde o botão Excluir (itens protegidos, como a situação "Novo"). */
  canDelete?: boolean;
}

/** Edição do nome do produto; a exclusão é um passo separado, com confirmação. */
export function ProdutoEditModal({
  produto,
  onClose,
  onSave,
  onRequestDelete,
  title = "Editar produto",
  canDelete = true,
}: Props) {
  const [nome, setNome] = useState(produto?.nome ?? "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!produto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !busy && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [produto, busy, onClose]);

  if (!produto) return null;
  const current = produto;

  async function submit(e: FormEvent) {
    e.preventDefault();
    const clean = nome.trim();
    if (!clean) {
      setError("Informe o nome do produto.");
      return;
    }
    if (clean === current.nome) {
      onClose();
      return;
    }
    setBusy(true);
    setError("");
    const err = await onSave(current.id, clean);
    setBusy(false);
    if (err) setError(err);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={busy ? undefined : onClose}
    >
      <form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="produto-edit-title"
        className="cl-card w-full max-w-md rounded-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 id="produto-edit-title" className="text-lg font-bold text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          maxLength={80}
          autoFocus
          aria-label="Nome"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60"
        />
        {error ? (
          <p className="mt-3 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-2">
          {canDelete ? (
            <button
              aria-label="Excluir"
              title="Excluir"
              type="button"
              onClick={() => onRequestDelete(current)}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              aria-label="Cancelar"
              title="Cancelar"
              type="button"
              onClick={onClose}
              disabled={busy}
              className="rounded-xl px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white disabled:opacity-50"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              aria-label="Salvar"
              title="Salvar"
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-70"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Check className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
