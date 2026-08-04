import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { steps } from "@/data/steps";

export function SectionSteps() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Como funciona"
          title="Simples do início ao sorriso"
          subtitle="Três passos até você sorrir com confiança de novo — do primeiro contato ao resultado final."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={0.08 * i} className="h-full">
              <div className="relative h-full rounded-3xl border border-line bg-white p-8 pt-10 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="absolute -top-6 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white shadow-glow">
                  {step.number}
                </span>
                <span className="mx-auto mt-2 mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-accent-100 text-primary">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}