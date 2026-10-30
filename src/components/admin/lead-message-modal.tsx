"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

interface Props {
  open: boolean;
  value: string;
  onClose: () => void;
  onSave: (text: string) => void;
}

const DEFAULT_MESSAGE =
  "Olá, %%NOME%%! Vi o perfil do seu negócio e notei que dá pra vender mais. Quer que eu deixe sua página no ar em 24h com um exemplo pronto (convert-scale-sigma.vercel.app/pet)? Custo único de R$ 799,00, menos de R$ 2,20/dia — se paga com 1-2 agendamentos. Posso adaptar tudo com a marca de vocês. Topa?";

export function LeadMessageModal({ open, value, onClose, onSave }: Props) {
  const [text, setText] = useState(() => value || DEFAULT_MESSAGE);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="cl-card w-full max-w-lg rounded-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Texto da mensagem</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-1 text-xs text-white/45">
          Use <code className="text-cyan-300">%%NOME%%</code> para personalizar
          com o nome de cada lead ao gerar os links.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={9}
          className="mt-4 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm leading-relaxed text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60"
        />

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onSave(text)}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}