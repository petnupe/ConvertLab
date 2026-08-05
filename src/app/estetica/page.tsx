import type { Metadata } from "next";

import { DemoPage } from "@/components/demo/demo-page";
import { esteticaConfig } from "@/data/demos/estetica";

export const metadata: Metadata = {
  title: "Lumi Estética — Beleza e bem-estar",
  description:
    "Clínica de estética e spa premium com tratamentos faciais, corporais e de relaxamento. Agende sua avaliação gratuita.",
};

export default function EsteticaPage() {
  return <DemoPage config={esteticaConfig} />;
}