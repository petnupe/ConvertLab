import { ArrowUpRight, MousePointerClick, Zap, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

const stats = [
  { icon: Rocket, value: "+50", label: "projetos entregues" },
  { icon: Zap, value: "24h", label: "de briefing à publicação" },
  { icon: MousePointerClick, value: "3x", label: "conversão acima da média" },
];

export function ClHero() {
  return (
    <section id="inicio" className="cl-dark relative overflow-hidden">
      <div className="cl-grid mask-fade absolute inset-0" aria-hidden="true" />
      <div
        className="blob left-[-14rem] top-[-10rem] h-[36rem] w-[36rem] bg-violet-600/30"
        aria-hidden="true"
      />
      <div
        className="blob right-[-12rem] top-[16rem] h-[32rem] w-[32rem] bg-cyan-500/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 sm:pt-44 lg:pb-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <Reveal>
            <Badge
              variant="outline"
              className="border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              Landing pages que convertem
            </Badge>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-balance text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl">
              Projetadas para{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                converter
              </span>
              . Desenvolvidas para{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                crescer
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-white/65 sm:text-xl">
              Seu negócio merece uma página que vende. Entregamos landing
              pages de alta conversão com design, copy e estratégia — do
              briefing à publicação em até 24 horas.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="flex flex-wrap items-center justify-center gap-3">
            <a href="#diferencial">
              <Button size="xl" className="gap-2 bg-violet-600 shadow-[0_18px_50px_-14px_rgba(124,58,237,0.9)] hover:bg-violet-700">
                Solicitar Projeto
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </a>
            <a href="#projetos">
              <Button
                size="xl"
                variant="outline"
                className="border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                Ver projetos
              </Button>
            </a>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-6 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="cl-card rounded-2xl px-5 py-5 text-center">
                  <span className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white">
                    <stat.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-3xl font-bold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
