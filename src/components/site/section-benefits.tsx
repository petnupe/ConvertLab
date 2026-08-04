import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { benefits } from "@/data/benefits";

export function SectionBenefits() {
  return (
    <section className="relative overflow-hidden bg-aurora py-24 sm:py-32">
      <div className="bg-grid mask-fade absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Por que a Odonto Prime"
          title="O padrão que faz a diferença"
          subtitle="Mais que tecnologia, um jeito de cuidar de você — com transparência e resultados que falam por si."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={0.06 * i} className="h-full">
              <div className="group h-full rounded-3xl border border-line bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/50 hover:shadow-lift">
                <span className="mb-6 inline-grid h-12 w-12 place-items-center rounded-2xl bg-accent-100 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <benefit.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold tracking-tight text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}