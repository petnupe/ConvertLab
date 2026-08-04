"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MessageCircle,
  CalendarCheck,
  ShieldCheck,
  Users,
  Clock3,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stars } from "@/components/ui/stars";
import { Reveal } from "@/components/motion/reveal";
import { WHATSAPP_LINK, siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-aurora pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      <div
        className="bg-grid mask-fade absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="blob left-[-12rem] top-[-8rem] h-[34rem] w-[34rem] bg-accent-200/70"
        aria-hidden="true"
      />
      <div
        className="blob right-[-10rem] top-[22rem] h-[30rem] w-[30rem] bg-primary-100/60"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex flex-col items-start gap-7">
          <Reveal>
            <Badge variant="soft" className="gap-2 px-4 py-2 text-sm">
              <span
                className="relative flex h-2 w-2"
                aria-hidden="true"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-500" />
              </span>
              Avaliação inicial gratuita com especialista
            </Badge>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              Sorria com{" "}
              <span className="text-gradient-soft">confiança</span>{" "}
              novamente.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              Implantes, facetas e tratamentos estéticos realizados por
              especialistas para transformar seu sorriso — com tecnologia
              digital, conforto e resultados naturais.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="flex flex-wrap items-center gap-3">
            <a href="#cta">
              <Button size="xl" className="shimmer-sweep gap-2">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Agendar Avaliação
              </Button>
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="xl" className="gap-2">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Falar no WhatsApp
              </Button>
            </a>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <Stars value={5} />
                <span className="text-sm font-semibold text-ink">
                  {siteConfig.rating}
                </span>
                <span className="text-sm text-muted">
                  (avaliações reais)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-secondary-600" aria-hidden="true" />
                <span className="text-sm text-muted">
                  <strong className="font-semibold text-ink">
                    +3.000 pacientes
                  </strong>{" "}
                  atendidos
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-secondary-600" aria-hidden="true" />
                <span className="text-sm text-muted">
                  <strong className="font-semibold text-ink">
                    15 anos
                  </strong>{" "}
                  de experiência
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2} className="relative">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div
              className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-primary/15 via-accent-200 to-secondary/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 shadow-lift">
              <Image
                src="https://images.unsplash.com/photo-1609840114035-815d4c134f66?auto=format&fit=crop&w=1200&q=80"
                alt="Paciente sorrindo com confiança após tratamento na Odonto Prime"
                width={960}
                height={1150}
                priority
                className="h-[26rem] w-full object-cover sm:h-[32rem] lg:h-[34rem]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary-900/35 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="glass absolute -right-3 top-8 flex animate-float items-center gap-3 rounded-2xl px-4 py-3 sm:-right-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">
                  Garantia de 5 anos
                </p>
                <p className="text-xs text-muted">nos implantes</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="glass absolute -left-3 bottom-24 flex animate-float-slow items-center gap-3 rounded-2xl px-4 py-3 sm:-left-8"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#25D366]/10 text-[#1eb358]">
                <BadgeCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">
                  Especialistas certificados
                </p>
                <p className="text-xs text-muted">implantodontia e estética</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="glass absolute -bottom-5 right-6 flex animate-float items-center gap-3 rounded-2xl px-4 py-3"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-100 text-primary">
                <Users className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">
                  +3.000 sorrisos
                </p>
                <p className="text-xs text-muted">transformados desde 2010</p>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
