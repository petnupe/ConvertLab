import Image from "next/image";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { gallery } from "@/data/gallery";

export function SectionGallery() {
  return (
    <section id="antes-e-depois" className="relative overflow-hidden bg-accent-50/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Antes e depois"
          title="Resultados que falam por si"
          subtitle="Casos reais realizados por nossos especialistas — cada sorriso é único, e o resultado é natural."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {gallery.map((item, i) => (
            <Reveal key={item.case} delay={0.06 * i}>
              <article className="overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="grid grid-cols-2 gap-2 p-2">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={item.before}
                      alt={`Antes — ${item.case}`}
                      width={480}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">
                      Antes
                    </span>
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={item.after}
                      alt={`Depois — ${item.case}`}
                      width={480}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      Depois
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary-600">
                    {item.technique}
                  </p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight text-ink">
                    {item.case}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}