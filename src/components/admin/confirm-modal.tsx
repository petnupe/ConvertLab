"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, X } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
}

/** Modal de confirmação para ações destrutivas (excluir). */
export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Excluir",
  onClose,
  onConfirm,
}: Props) {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !busy && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, busy, onClose]);

  if (!open) return null;

  async function confirm() {
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={busy ? undefined : onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="cl-card w-full max-w-md rounded-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 id="confirm-title" className="text-lg font-bold text-white">
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

        <p id="confirm-desc" className="mt-2 text-sm leading-relaxed text-white/60">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            aria-label="Cancelar"
            title="Cancelar"
            type="button"
            onClick={onClose}
            disabled={busy}
            autoFocus
            className="rounded-xl px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white disabled:opacity-50"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            aria-label={confirmLabel}
            title={confirmLabel}
            type="button"
            onClick={confirm}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-70"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
