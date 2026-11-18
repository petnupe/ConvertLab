"use client";

import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";

import { statusNome, type Lead, type LeadStatus, type Status } from "@/lib/lead";

interface Props {
  pending: { lead: Lead; status: LeadStatus } | null;
  statuses: Status[];
  onCancel: () => void;
  onConfirm: (justificativa: string) => void;
}

/** Pede o motivo (opcional) antes de trocar a situação de um lead. */
export function StatusJustifyModal({ pending, statuses, onCancel, onConfirm }: Props) {
  const [texto, setTexto] = useState("");
  if (!pending) return null;
  const { lead, status } = pending;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="just-title"
        className="cl-card w-full max-w-md rounded-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="just-title" className="text-lg font-bold text-white">
          Justificativa da troca
        </h3>
        <p className="mt-1 truncate text-sm text-white/60">{lead.nome}</p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/85">
          <span className="text-white/60">{statusNome(statuses, lead.status)}</span>
          <ArrowRight className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
          <span className="font-medium">{statusNome(statuses, status)}</span>
        </p>

        <textarea
          autoFocus
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={4}
          maxLength={500}
          placeholder="Por que a situação mudou? (opcional)"
          aria-label="Justificativa"
          className="mt-4 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm leading-relaxed text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60"
        />

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancelar"
            title="Cancelar"
            className="rounded-xl px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onConfirm(texto.trim())}
            aria-label="Confirmar troca"
            title="Confirmar troca"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
          >
            <Check className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
