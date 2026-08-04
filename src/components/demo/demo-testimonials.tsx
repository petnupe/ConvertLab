import Image from "next/image";
import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Stars } from "@/components/ui/stars";
import { Reveal } from "@/components/motion/reveal";
import type { DemoConfig } from "@/lib/demo-config";

export function DemoTestimonials({ config }: { config: DemoConfig }) {
  return (
    <section id="depoimentos" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={config.testimonialsEyebrow}
          title={config.testimonialsTitle}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {config.testimonials.map((t, i) => (
            <Reveal key={t.name} delay={0.07 * i} className="h-full">
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
                    <p className="text-xs text-muted">{t.role}</p>
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