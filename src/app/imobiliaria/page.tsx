import type { Metadata } from "next";

import { DemoPage } from "@/components/demo/demo-page";
import { imobiliariaConfig } from "@/data/demos/imobiliaria";

export const metadata: Metadata = {
  title: "Terra Prime — Imobiliária de confiança",
  description:
    "Imobiliária com mais de 1.200 imóveis vendidos. Lançamentos, imóveis prontos, financiamento facilitado e atendimento que começa na escolha e acaba na escritura.",
};

export default function ImobiliariaPage() {
  return <DemoPage config={imobiliariaConfig} />;
}