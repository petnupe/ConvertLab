import { PanelTopOpen, MessageSquareText, Braces } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ClForm } from "./cl-form";

export function ClDifferential() {
  return (
    <section id="diferencial" className="cl-dark-soft relative overflow-hidden py-24 sm:py-32">
      <div className="cl-grid mask-fade absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              dark
              align="left"
              eyebrow="O diferencial"
              title={
                <>
                  A parte que{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                    quase ninguém faz
                  </span>
                </>
              }
              subtitle="Quando você clica em Solicitar Projeto, não abre o WhatsApp — abre um formulário."
            />

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: PanelTopOpen,
                  title: "Leads organizados de verdade",
                  text: "Cada solicitação vira um briefing estruturado — nada de conversa perdida no meio de mil mensagens.",
                },
                {
                  icon: MessageSquareText,
                  title: "Você chega pronto para negociar",
                  text: "Com as informações do cliente em mãos, você envia um orçamento certeiro — e fecha mais rápido.",
                },
                {
                  icon: Braces,
                  title: "Conversão acima da média",
                  text: "Páginas com formulário convertem até 3x mais que aquelas que mandam o visitante para o WhatsApp.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={0.05 * i}>
                  <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-bold tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/60">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="left" className="lg:sticky lg:top-24">
            <ClForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}