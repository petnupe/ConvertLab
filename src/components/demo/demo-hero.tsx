import Image from "next/image";
import { CheckCircle2, MessageCircle, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { DemoFloating } from "./demo-floating";
import { demoWhatsapp, type DemoConfig } from "@/lib/demo-config";

export function DemoHero({ config }: { config: DemoConfig }) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-aurora pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      <div className="bg-grid mask-fade absolute inset-0" aria-hidden="true" />
      <div
        className="blob left-[-12rem] top-[-8rem] h-[34rem] w-[34rem] bg-secondary/25"
        aria-hidden="true"
      />
      <div
        className="blob right-[-10rem] top-[22rem] h-[30rem] w-[30rem] bg-primary/15"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex flex-col items-start gap-7">
          <Reveal>
            <Badge variant="soft" className="gap-2 px-4 py-2 text-sm">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              {config.badge}
            </Badge>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl md:text-7xl">
              {config.headlineStart}{" "}
              <span className="text-gradient-soft">{config.highlight}</span>{" "}
              {config.headlineEnd}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              {config.description}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {config.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-2 text-sm font-medium text-ink-soft"
                >
                  <CheckCircle2
                    className="h-5 w-5 text-secondary"
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-wrap items-center gap-3">
            <a href="#cta">
              <Button size="xl" className="shimmer-sweep gap-2">
                {config.ctaLabel}
              </Button>
            </a>
            <a
              href={demoWhatsapp(config)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="xl" className="gap-2">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Falar no WhatsApp
              </Button>
            </a>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-ink">
                {config.rating.toLocaleString("pt-BR", {
                  minimumFractionDigits: 1,
                })}
              </span>
              <span className="text-sm text-muted">(avaliações reais)</span>
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2} className="relative">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div
              className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-primary/15 via-accent-200 to-secondary/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 shadow-lift">
              <Image
                src={config.image}
                alt={config.imageAlt}
                width={960}
                height={1150}
                priority
                className="h-[26rem] w-full object-cover sm:h-[32rem] lg:h-[34rem]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            <DemoFloating
              floatingTitle={config.floatingTitle}
              floatingText={config.floatingText}
              statValue={config.stats[0]?.value ?? ""}
              statLabel={config.stats[0]?.label ?? ""}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}