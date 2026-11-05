import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { solutions } from "@/data/catalog";

export function ClSolutions() {
  const [featured, ...otherSolutions] = solutions;

  return (
    <section id="solucoes" className="cl-dark-soft relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Soluções sob medida"
          title={
            <>
              Tecnologia para{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                negócios reais
              </span>
            </>
          }
          subtitle="Conheça soluções digitais para vender online e organizar operações em diferentes segmentos."
        />

        {featured ? (
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal className="lg:col-span-2">
              <a
                href={featured.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] lg:grid-cols-[1.15fr_0.85fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[25rem]">
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/15"
                    aria-hidden="true"
                  />
                  <Badge className="absolute left-5 top-5 border-white/20 bg-black/55 px-3 py-1.5 text-white backdrop-blur-md">
                    {featured.tag}
                  </Badge>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    Em destaque
                  </p>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {featured.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/65">
                    {featured.blurb}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors group-hover:text-cyan-200">
                    Conhecer a Vitrinou!
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </Reveal>

            {otherSolutions.map((solution, index) => (
              <Reveal key={solution.slug} delay={0.08 * index} className="h-full">
                <a
                  href={solution.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={solution.image}
                      alt={solution.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <Badge className="absolute left-4 top-4 border-white/20 bg-black/55 px-3 py-1.5 text-white backdrop-blur-md">
                      {solution.tag}
                    </Badge>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {solution.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                      {solution.blurb}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition-colors group-hover:text-cyan-200">
                      Acessar projeto
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
