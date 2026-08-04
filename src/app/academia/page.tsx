import type { Metadata } from "next";

import { DemoPage } from "@/components/demo/demo-page";
import { academiaConfig } from "@/data/demos/academia";

export const metadata: Metadata = {
  title: "Forja Fitness — Treino de verdade",
  description:
    "Academia de musculação, funcional e cross training com plano sem fidelidade e primeiro treino grátis. Mais de 2.500 alunos treinando com a gente.",
};

export default function AcademiaPage() {
  return <DemoPage config={academiaConfig} />;
}