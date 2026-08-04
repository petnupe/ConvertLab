import Image from "next/image";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { treatments } from "@/data/treatments";

export function SectionTreatments() {
  return (
    <section id="tratamentos" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Tratamentos"
          title="Cuidados completos para o seu sorriso"
          subtitle="Do clareamento ao implante definitivo, tecnologias e especialistas para transformar seu sorriso com previsibilidade."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment, i) => (
            <Reveal key={treatment.title} delay={0.06 * i} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={treatment.image}
                    alt={treatment.imageAlt}
                    width={640}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/90 text-primary shadow-lg backdrop-blur-sm">
                    <treatment.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary-600">
                    {treatment.tagline}
                  </p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-ink">
                    {treatment.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {treatment.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {treatment.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}