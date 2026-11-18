"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Package } from "lucide-react";

import type { Produto } from "@/lib/lead";

interface Props {
  produtos: Produto[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

/** Combo de múltipla escolha: marca/desmarca produtos de interesse do prospect. */
export function ProdutoMultiSelect({ produtos, selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggle(id: string) {
    onChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id],
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white outline-none transition-colors hover:border-white/25 focus:border-cyan-400/60"
      >
        <Package className="h-4 w-4 text-white/50" aria-hidden="true" />
        {selected.length === 0 ? "Produtos" : `Produtos (${selected.length})`}
        <ChevronDown className="h-4 w-4 text-white/50" aria-hidden="true" />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute right-0 z-20 mt-2 max-h-64 w-64 overflow-y-auto rounded-2xl border border-white/10 bg-[#14102a] p-1.5 shadow-xl"
        >
          {produtos.length === 0 ? (
            <p className="px-3 py-2 text-sm text-white/45">
              Cadastre um produto primeiro.
            </p>
          ) : (
            produtos.map((p) => {
              const on = selected.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  role="option"
                  aria-selected={on}
                  onClick={() => toggle(p.id)}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-white/85 transition-colors hover:bg-white/[0.06]"
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      on
                        ? "border-violet-500 bg-violet-600"
                        : "border-white/25"
                    }`}
                  >
                    {on ? <Check className="h-3 w-3 text-white" aria-hidden="true" /> : null}
                  </span>
                  <span className="truncate">{p.nome}</span>
                </button>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
