"use client";

import { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  CheckCircle2,
  Send,
  ArrowRight,
  MessageCircleOff,
  Upload,
  X,
  ImageIcon,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { catalogServices, convertlabContact } from "@/data/catalog";

const fields = [
  {
    name: "nome",
    label: "Nome",
    placeholder: "Seu nome",
    type: "text",
    full: true,
  },
  {
    name: "empresa",
    label: "Empresa",
    placeholder: "Nome da empresa ou negócio",
    type: "text",
    full: true,
  },
  {
    name: "instagram",
    label: "Instagram",
    placeholder: "@seudisparo",
    type: "text",
    full: true,
  },
  {
    name: "objetivo",
    label: "Objetivo",
    placeholder: "O que você espera da sua página? Ex.: captar leads de venda de planos.",
    type: "textarea",
    full: true,
  },
  {
    name: "servico",
    label: "Serviço",
    type: "select",
    full: true,
  },
  {
    name: "cor",
    label: "Cor",
    placeholder: "Cor(es) de referência da sua marca",
    type: "text",
    full: true,
  },
  {
    name: "referencias",
    label: "Referências",
    placeholder: "Links de páginas que você gosta ou inspirações",
    type: "textarea",
    full: true,
  },
] as const;

type FormState = Record<(typeof fields)[number]["name"], string> & {
  servico_outro: string;
};

const initial: FormState = {
  nome: "",
  empresa: "",
  instagram: "",
  objetivo: "",
  servico: "",
  cor: "",
  referencias: "",
  servico_outro: "",
};

const OUTRO = "Outro segmento";

export function ClForm() {
  const [data, setData] = useState<FormState>(initial);
  const [logo, setLogo] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (key: keyof FormState) => (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setData((d) => ({ ...d, [key]: e.target.value }));

  const onLogoChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLogo(e.target.files?.[0] ?? null);

  const effectiveServico =
    data.servico === OUTRO ? data.servico_outro : data.servico;

  const summary = fields
    .map((f) => ({
      label: f.label,
      value: f.name === "servico" ? effectiveServico : data[f.name],
    }))
    .filter((f) => f.value?.trim())
    .map((f) => ({ label: f.label, value: f.value!.trim() }));

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="cl-card rounded-3xl p-8 sm:p-10"
      >
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">
          Tudo organizado.
        </h3>
        <p className="mt-3 text-white/60">
          Recebemos suas informações. Em instantes você terá isso em mãos e, na
          sequência, o orçamento sob medida.
        </p>

        <div className="mt-7 space-y-3">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                {item.label}
              </p>
              <p className="mt-1 text-sm text-white/85">{item.value}</p>
            </div>
          ))}
          {summary.length === 0 ? (
            <p className="text-sm text-white/50">Nenhum campo preenchido.</p>
          ) : null}
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
          <ArrowRight className="h-4 w-4 text-cyan-300" aria-hidden="true" />
          Próximo passo: você recebe o orçamento. Sem cobrança antecipada.
        </p>

        <button
          type="button"
          onClick={() => {
            setData(initial);
            setSubmitted(false);
          }}
          className="mt-6 text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
        >
          Preencher novo briefing
        </button>
      </motion.div>
    );
  }

  const buildLines = (d: FormState) => {
    const body = fields
      .map((f) => ({
        label: f.label,
        value: f.name === "servico" ? effectiveServico : d[f.name],
      }))
      .filter((f) => f.value?.trim())
      .map((f) => `${f.label}: ${f.value!.trim()}`).join("\n");

    return body
      ? [
          "Novo briefing — ConvertLab",
          "------------------------",
          body,
        ].join("\n")
      : "Olá! Gostaria de criar uma landing page pelo ConvertLab. Pode me chamar? 🙂";
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const lines = buildLines(data);
        setSending(true);
        try {
          const fd = new FormData();
          for (const [key, value] of Object.entries(data)) {
            if (key === "servico" && data.servico === OUTRO) {
              fd.append("servico", data.servico_outro);
              continue;
            }
            fd.append(key, value);
          }
          if (logo) fd.append("logo", logo);
          const res = await fetch("/api/contact", {
            method: "POST",
            body: fd,
          });
          if (!res.ok) throw new Error("api_error");
        } catch {
          window.open(
            `https://wa.me/${convertlabContact.whatsappNumber}?text=${encodeURIComponent(
              lines,
            )}`,
            "_blank",
            "noopener,noreferrer",
          );
        } finally {
          setSending(false);
        }
        setSubmitted(true);
      }}
      className="cl-card flex flex-col gap-5 rounded-3xl p-8 sm:p-10"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white">
          <ClipboardList className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white">
            Briefing rápido
          </h3>
          <p className="text-sm text-white/55">Leva menos de 5 minutos.</p>
        </div>
      </div>

      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <label
            htmlFor={field.name}
            className="text-sm font-medium text-white/80"
          >
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              value={data[field.name]}
              onChange={set(field.name)}
              rows={3}
              placeholder={field.placeholder}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60 focus:bg-white/[0.08]"
            />
          ) : field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              value={data[field.name]}
              onChange={set(field.name)}
              className="w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400/60 focus:bg-white/[0.08]"
            >
              <option value="" disabled className="bg-[#14102a]">
                Selecione o segmento
              </option>
              {catalogServices.map((s) => (
                <option key={s} value={s} className="bg-[#14102a]">
                  {s}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type="text"
              value={data[field.name]}
              onChange={set(field.name)}
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60 focus:bg-white/[0.08]"
            />
          )}
        </div>
      ))}

      {data.servico === OUTRO ? (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="servico_outro"
            className="text-sm font-medium text-white/80"
          >
            Qual segmento?
          </label>
          <input
            id="servico_outro"
            name="servico_outro"
            type="text"
            value={data.servico_outro}
            onChange={set("servico_outro")}
            placeholder="Ex.: E-commerce, Restaurante, Barber..."
            className="w-full rounded-2xl border border-cyan-400/40 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400/60 focus:bg-white/[0.08]"
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="logo"
          className="text-sm font-medium text-white/80"
        >
          Logo da marca <span className="text-white/40">(opcional)</span>
        </label>
        <label
          htmlFor="logo"
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.04] px-4 py-6 text-center transition-colors hover:border-cyan-400/50 hover:bg-white/[0.06]"
        >
          {logo ? (
            <>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-400/15 text-cyan-300">
                <ImageIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex items-center gap-2 text-sm text-white/85">
                <span className="max-w-[16rem] truncate">{logo.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setLogo(null);
                  }}
                  className="rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Remover logo"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </span>
            </>
          ) : (
            <>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.06] text-white/60">
                <Upload className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm text-white/70">
                Clique para enviar seu logo
              </span>
              <span className="text-xs text-white/40">
                PNG, JPG ou SVG · até 5 MB
              </span>
            </>
          )}
        </label>
        <input
          id="logo"
          name="logo"
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          onChange={onLogoChange}
          className="hidden"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={sending}
        className="mt-1 w-full gap-2 bg-violet-600 shadow-[0_18px_50px_-14px_rgba(124,58,237,0.9)] hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" />
            Enviar logo
          </>
        )}
      </Button>

      <p className="flex items-start gap-2 text-xs text-white/45">
        <MessageCircleOff className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300/80" aria-hidden="true" />
        Sem whatsapp, sem spam: você recebe tudo organizado e depois um
        orçamento sob medida.
      </p>
    </form>
  );
}
