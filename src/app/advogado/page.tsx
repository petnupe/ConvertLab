import type { Metadata } from "next";

import { DemoPage } from "@/components/demo/demo-page";
import { advogadoConfig } from "@/data/demos/advogado";

export const metadata: Metadata = {
  title: "Nascimento & Cia — Advocacia de excelência",
  description:
    "Escritório de advocacia com mais de 20 anos defendendo pessoas e empresas com estratégia, ética e resultado. Agende uma consulta gratuita.",
};

export default function AdvogadoPage() {
  return <DemoPage config={advogadoConfig} />;
}