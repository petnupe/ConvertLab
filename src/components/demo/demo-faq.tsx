import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { DemoConfig } from "@/lib/demo-config";

export function DemoFaq({ config }: { config: DemoConfig }) {
  return (
    <section id="faq" className="relative overflow-hidden bg-accent-50/60 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow={config.faqEyebrow} title={config.faqTitle} />

        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            {config.faqs.map((faq) => (
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