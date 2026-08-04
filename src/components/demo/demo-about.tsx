import Image from "next/image";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { DemoConfig } from "@/lib/demo-config";

export function DemoAbout({ config }: { config: DemoConfig }) {
  return (
    <section className="relative overflow-hidden bg-accent-50/60 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="right" className="relative">
          <div
            className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-secondary/20 to-primary/10 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 shadow-lift">
            <Image
              src={config.aboutImage}
              alt={config.aboutImageAlt}
              width={960}
              height={960}
              className="h-[24rem] w-full object-cover sm:h-[30rem]"
            />
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow={config.aboutEyebrow}
            title={config.aboutTitle}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {config.aboutText}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {config.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.08 * i}>
                <div className="rounded-3xl border border-line bg-white p-5 text-center shadow-soft">
                  <p className="text-3xl font-bold tracking-tight text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium leading-snug text-muted">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}