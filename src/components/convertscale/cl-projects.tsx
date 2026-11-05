import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/data/catalog";

export function ClProjects() {
  return (
    <section id="projetos" className="cl-dark-soft relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Portfólio"
          title={
            <>
              Sites e sistemas que{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                vendem
              </span>
            </>
          }
          subtitle="Conheça landing pages, vitrines online e sistemas feitos para apresentar negócios e apoiar sua operação."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={0.05 * i}>
              <Link
                href={project.href ?? `/${project.slug}`}
                target={project.href ? "_blank" : undefined}
                rel={project.href ? "noopener noreferrer" : undefined}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    width={640}
                    height={440}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <Badge className="absolute left-4 top-4 border-white/20 bg-black/50 px-3 py-1.5 text-white backdrop-blur-md">
                    {project.tag}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {project.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                    {project.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition-colors group-hover:text-cyan-200">
                    {project.href ? "Acessar projeto" : "Ver Demo"}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={0.25}>
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
              <p className="text-4xl" aria-hidden="true">
                →
              </p>
              <p className="text-sm font-medium text-white/55">
                O próximo projeto aqui pode ser o seu negócio.
              </p>
              <a href="#diferencial">
                <Badge
                  variant="outline"
                  className="border-white/20 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10"
                >
                  Solicitar Projeto
                </Badge>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
