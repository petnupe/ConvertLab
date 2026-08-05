import type { Metadata } from "next";

import { DemoPage } from "@/components/demo/demo-page";
import { construtoraConfig } from "@/data/demos/construtora";

export const metadata: Metadata = {
  title: "Alvorecer — Construtora de alto padrão",
  description:
    "Construtora com mais de 20 anos e 120 obras entregues. Do projeto às chaves, com garantia de obra e financiamento facilitado. Solicite orçamento.",
};

export default function ConstrutoraPage() {
  return <DemoPage config={construtoraConfig} />;
}