import { FileText, PenTool, CheckCircle2, Globe } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { catalogSteps } from "@/data/catalog";

const icons = [FileText, PenTool, CheckCircle2, Globe];

export function ClHow() {
  return (
    <section id="como-funciona" className="cl-dark relative overflow-hidden py-24 sm:py-32">
      <div className="cl-grid mask-fade absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Como funciona"
          title={
            <>
              Do briefing ao ar,{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                sem complicação
              </span>
            </>
          }
          subtitle="Um processo simples e transparente em quatro etapas. Você acompanha tudo até a publicação."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {catalogSteps.map((step, i) => {
            const Icon = icons[i] ?? FileText;
            return (
              <Reveal key={step.number} delay={0.08 * i} className="h-full">
                <div className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.07]">
                  <span className="mb-6 inline-flex w-fit items-center gap-2">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-4xl font-bold tracking-tight text-white/20">
                      {step.number}
                    </span>
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}