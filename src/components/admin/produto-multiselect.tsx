"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const MENU_W = 256; // w-64

  function toggleOpen() {
    if (open) return setOpen(false);
    const r = btnRef.current?.getBoundingClientRect();
    if (r) {
      setPos({
        top: r.bottom + 8,
        left: Math.max(8, Math.min(r.right - MENU_W, window.innerWidth - MENU_W - 8)),
      });
    }
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    const onScroll = (e: Event) => {
      // rolar a própria lista de produtos não deve fechá-la
      if (!menuRef.current?.contains(e.target as Node)) close();
    };
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open]);

  function toggle(id: string) {
    onChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id],
    );
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white outline-none transition-colors hover:border-white/25 focus:border-cyan-400/60"
      >
        <Package className="h-4 w-4 text-white/50" aria-hidden="true" />
        {selected.length === 0 ? "Produtos" : `Produtos (${selected.length})`}
        <ChevronDown className="h-4 w-4 text-white/50" aria-hidden="true" />
      </button>

      {open && pos
        ? createPortal(
        <div
          ref={menuRef}
          role="listbox"
          aria-multiselectable="true"
          style={{ position: "fixed", top: pos.top, left: pos.left, width: MENU_W }}
          className="z-[60] max-h-64 overflow-y-auto rounded-2xl border border-white/10 bg-[#14102a] p-1.5 shadow-xl"
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
        </div>,
        document.body,
      )
        : null}
    </div>
  );
}
