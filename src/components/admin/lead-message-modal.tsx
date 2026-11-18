"use client";

import { useRef, useState, type FormEvent } from "react";
import { Check, Plus, Trash2, X } from "lucide-react";

import {
  BUILTIN_VARS,
  token,
  type Variavel,
} from "@/lib/mensagem";

interface Props {
  open: boolean;
  value: string;
  onClose: () => void;
  onSave: (text: string) => void;
  variaveis: Variavel[];
  /** Cada callback devolve uma mensagem de erro ou null quando deu certo. */
  onAddVar: (nome: string, valor: string) => Promise<string | null>;
  onUpdateVar: (id: string, valor: string) => Promise<string | null>;
  onDeleteVar: (v: Variavel) => void;
  /** Prévia com o primeiro lead da lista (null se não houver leads). */
  preview: { nome: string; render: (template: string) => string } | null;
}

const FIELD =
  "rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60";
const TOKEN =
  "shrink-0 rounded-lg bg-violet-500/15 px-2 py-1 font-mono text-xs text-violet-200 transition-colors hover:bg-violet-500/25";

export function LeadMessageModal({
  open,
  value,
  onClose,
  onSave,
  variaveis,
  onAddVar,
  onUpdateVar,
  onDeleteVar,
  preview,
}: Props) {
  const [text, setText] = useState(value);
  const [varError, setVarError] = useState("");
  const [newNome, setNewNome] = useState("");
  const [newValor, setNewValor] = useState("");
  const [adding, setAdding] = useState(false);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  if (!open) return null;

  function insert(tok: string) {
    const el = areaRef.current;
    const start = el?.selectionStart ?? text.length;
    const end = el?.selectionEnd ?? text.length;
    setText(text.slice(0, start) + tok + text.slice(end));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(start + tok.length, start + tok.length);
    });
  }

  async function addVar(e: FormEvent) {
    e.preventDefault();
    if (!newNome.trim()) return;
    setAdding(true);
    setVarError("");
    const err = await onAddVar(newNome, newValor);
    setAdding(false);
    if (err) setVarError(err);
    else {
      setNewNome("");
      setNewValor("");
    }
  }

  async function updateVar(v: Variavel, valor: string) {
    if (valor.trim() === v.valor) return;
    setVarError("");
    const err = await onUpdateVar(v.id, valor);
    if (err) setVarError(err);
  }

  const rendered = preview ? preview.render(text) : "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="msg-title"
        className="cl-card max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 id="msg-title" className="text-lg font-bold text-white">
            Texto da mensagem
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

        <p className="mt-1 text-xs text-white/45">
          Vazio = o WhatsApp abre sem texto. Clique numa variável abaixo para inseri-la.
        </p>

        <textarea
          ref={areaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          aria-label="Texto da mensagem"
          className="mt-3 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm leading-relaxed text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60"
        />

        {preview ? (
          <div className="mt-3 rounded-2xl border border-dashed border-white/15 px-4 py-3">
            <p className="text-xs font-medium text-white/45">Prévia com “{preview.nome}”</p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-white/80">
              {rendered || <span className="text-white/35">(sem texto)</span>}
            </p>
          </div>
        ) : null}

        {/* consulta de variáveis */}
        <h4 className="mt-6 text-sm font-semibold text-white/60">Variáveis automáticas</h4>
        <ul className="mt-2 space-y-1.5">
          {BUILTIN_VARS.map((v) => (
            <li key={v.nome} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <button
                type="button"
                onClick={() => insert(token(v.nome))}
                className={TOKEN}
                title="Inserir no texto"
              >
                {token(v.nome)}
              </button>
              <span className="text-white/65">{v.descricao}</span>
              <span className="text-xs text-white/35">ex.: {v.exemplo}</span>
            </li>
          ))}
        </ul>

        <h4 className="mt-6 text-sm font-semibold text-white/60">
          Minhas variáveis ({variaveis.length})
        </h4>
        {variaveis.length === 0 ? (
          <p className="mt-2 text-xs text-white/40">
            Nenhuma ainda. Crie valores fixos como PRECO ou LINK para usar em várias mensagens.
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {variaveis.map((v) => (
              <VarRow
                key={v.id}
                v={v}
                onInsert={() => insert(token(v.nome))}
                onSave={(valor) => updateVar(v, valor)}
                onDelete={() => onDeleteVar(v)}
              />
            ))}
          </ul>
        )}

        <form onSubmit={addVar} className="mt-3 flex flex-wrap gap-2">
          <input
            value={newNome}
            onChange={(e) => setNewNome(e.target.value)}
            placeholder="Nome (ex.: PRECO)"
            maxLength={30}
            aria-label="Nome da nova variável"
            className={`${FIELD} w-40 font-mono`}
          />
          <input
            value={newValor}
            onChange={(e) => setNewValor(e.target.value)}
            placeholder="Valor (ex.: R$ 799,00)"
            maxLength={500}
            aria-label="Valor da nova variável"
            className={`${FIELD} min-w-0 flex-1`}
          />
          <button
            type="submit"
            disabled={adding}
            aria-label="Adicionar variável"
            title="Adicionar variável"
            className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-4 py-2 text-white transition-colors hover:bg-violet-700 disabled:opacity-70"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
        {varError ? (
          <p className="mt-2 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {varError}
          </p>
        ) : null}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cancelar"
            title="Cancelar"
            className="rounded-xl px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onSave(text)}
            aria-label="Salvar"
            title="Salvar"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
          >
            <Check className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function VarRow({
  v,
  onInsert,
  onSave,
  onDelete,
}: {
  v: Variavel;
  onInsert: () => void;
  onSave: (valor: string) => void;
  onDelete: () => void;
}) {
  const [valor, setValor] = useState(v.valor);
  return (
    <li className="flex items-center gap-2">
      <button type="button" onClick={onInsert} className={TOKEN} title="Inserir no texto">
        {token(v.nome)}
      </button>
      <input
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        onBlur={() => onSave(valor)}
        maxLength={500}
        aria-label={`Valor de ${v.nome}`}
        className={`${FIELD} min-w-0 flex-1`}
      />
      <button
        type="button"
        onClick={onDelete}
        aria-label={`Excluir variável ${v.nome}`}
        title="Excluir"
        className="rounded-xl p-2 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </li>
  );
}
