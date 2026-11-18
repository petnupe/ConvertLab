"use client";

import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";

import { statusNome, type Lead, type Status, type StatusChange } from "@/lib/lead";

interface Props {
  lead: Lead | null;
  statuses: Status[];
  onClose: () => void;
}

const fmt = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

/** Linha do tempo das trocas de situação de um lead. */
export function LeadHistoryModal({ lead, statuses, onClose }: Props) {
  const [items, setItems] = useState<StatusChange[] | null>(null);
  const [error, setError] = useState("");
  const leadId = lead?.id;

  useEffect(() => {
    if (!leadId) return;
    let cancelled = false;
    fetch(`/api/leads/${leadId}/historico`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) setError(data.error ?? "Não foi possível carregar o histórico.");
        else setItems(data.historico ?? []);
      })
      .catch(() => {
        if (!cancelled) setError("Não foi possível carregar o histórico.");
      });
    return () => {
      cancelled = true;
    };
  }, [leadId]);

  useEffect(() => {
    if (!leadId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [leadId, onClose]);

  if (!lead) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="hist-title"
        className="cl-card max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 id="hist-title" className="truncate text-lg font-bold text-white">
            Histórico · {lead.nome}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Fechar"
            title="Fechar"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {error ? (
          <p className="mt-4 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
        ) : items === null ? (
          <p className="mt-4 text-sm text-white/45">Carregando…</p>
        ) : items.length === 0 ? (
          <p className="mt-4 text-sm text-white/45">Nenhuma troca registrada.</p>
        ) : (
          <ol className="mt-4 space-y-3">
            {items.map((h) => (
              <li key={h.id} className="rounded-2xl border border-white/10 px-4 py-3">
                <p className="text-xs text-white/45">{fmt.format(new Date(h.em))}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/85">
                  {h.de === null ? (
                    <>
                      <span className="text-white/50">Entrada:</span>
                      <span className="font-medium">{statusNome(statuses, h.para)}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-white/60">{statusNome(statuses, h.de)}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
                      <span className="font-medium">{statusNome(statuses, h.para)}</span>
                    </>
                  )}
                </p>
                {h.justificativa ? (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-white/60">
                    {h.justificativa}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
