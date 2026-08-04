import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { faqs } from "@/data/faq";

export function SectionFaq() {
  return (
    <section id="faq" className="relative overflow-hidden bg-aurora py-24 sm:py-32">
      <div className="bg-grid mask-fade absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Dúvidas"
          title="Perguntas frequentes"
          subtitle="Reunimos as principais dúvidas dos nossos pacientes. Se a sua não estiver aqui, fale com a gente."
        />

        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}