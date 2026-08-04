import { CalendarCheck, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WHATSAPP_LINK } from "@/lib/site-config";

export function SectionCta() {
  return (
    <section id="cta" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary-700 to-primary-900 px-6 py-20 text-center shadow-lift sm:px-12">
            <div className="bg-grid mask-fade absolute inset-0 opacity-30" aria-hidden="true" />
            <div
              className="blob right-[-8rem] top-[-8rem] h-[26rem] w-[26rem] bg-secondary/30"
              aria-hidden="true"
            />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/25">
                <CalendarCheck className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Comece hoje a transformação do seu sorriso
              </h2>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
                Agende sua avaliação gratuita e receba um plano de tratamento
                completo, com prazos e valores transparentes. Sem compromisso.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="xl"
                    variant="whatsapp"
                    className="shimmer-sweep gap-2"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Agendar Avaliação
                  </Button>
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="xl"
                    variant="outline"
                    className="gap-2 border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  >
                    Falar no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}