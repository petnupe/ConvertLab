import Image from "next/image";
import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Stars } from "@/components/ui/stars";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/data/testimonials";

export function SectionTestimonials() {
  return (
    <section id="depoimentos" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Depoimentos"
          title="Histórias de quem voltou a sorrir"
          subtitle="Mais de 3.000 pacientes transformados desde 2010. Veja o que eles dizem sobre a experiência."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={0.06 * i} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div>
                  <Quote className="h-7 w-7 text-secondary/40" aria-hidden="true" />
                  <blockquote className="mt-4 text-sm leading-relaxed text-ink-soft">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-muted">
                      {t.age} anos · {t.treatment}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Stars value={5} size={14} />
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}