"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Check, Loader2, X } from "lucide-react";

import { formatWhatsapp, normalizeWhatsapp, type Lead } from "@/lib/lead";

interface Props {
  lead: Lead | null;
  onClose: () => void;
  onSave: (id: string, nome: string, whatsapp: string) => Promise<string | null>; // erro ou null
}

const INPUT =
  "mt-1 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60";

/** Edição de nome e WhatsApp do lead. Use com key={lead.id} para reiniciar os campos. */
export function LeadEditModal({ lead, onClose, onSave }: Props) {
  const [nome, setNome] = useState(lead?.nome ?? "");
  const [whatsapp, setWhatsapp] = useState(
    lead ? formatWhatsapp(lead.whatsapp) : "",
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!lead) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !busy && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lead, busy, onClose]);

  if (!lead) return null;
  const current = lead;

  async function submit(e: FormEvent) {
    e.preventDefault();
    const cleanNome = nome.trim();
    const digits = normalizeWhatsapp(whatsapp);
    if (!cleanNome || digits.length < 12) {
      setError("Preencha nome e um WhatsApp válido (DDD + número).");
      return;
    }
    if (cleanNome === current.nome && digits === current.whatsapp) {
      onClose();
      return;
    }
    setBusy(true);
    setError("");
    const err = await onSave(current.id, cleanNome, digits);
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
        aria-labelledby="lead-edit-title"
        className="cl-card w-full max-w-md rounded-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 id="lead-edit-title" className="text-lg font-bold text-white">
            Editar lead
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

        <label className="mt-4 block text-xs font-medium text-white/55">
          Nome / negócio
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            maxLength={120}
            autoFocus
            className={INPUT}
          />
        </label>

        <label className="mt-3 block text-xs font-medium text-white/55">
          WhatsApp
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            inputMode="tel"
            placeholder="(51) 99999-9999"
            className={INPUT}
          />
        </label>

        {error ? (
          <p className="mt-3 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-xl px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-70"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Check className="h-4 w-4" aria-hidden="true" />
            )}
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
