import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { catalogFaqs } from "@/data/catalog";

export function ClFaq() {
  return (
    <section id="faq" className="cl-dark relative overflow-hidden py-24 sm:py-32">
      <div className="cl-grid mask-fade absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="FAQ"
          title="Dúvidas frequentes"
          subtitle="Tudo o que você precisa saber antes de começar com a gente."
        />

        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            {catalogFaqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="border-white/10 bg-white/[0.04] data-[state=open]:border-white/25 data-[state=open]:bg-white/[0.06]"
              >
                <AccordionTrigger className="text-white hover:text-violet-300 data-[state=open]:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/60">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}