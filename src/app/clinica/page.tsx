import type { Metadata } from "next";

import { DemoPage } from "@/components/demo/demo-page";
import { clinicaConfig } from "@/data/demos/clinica";

export const metadata: Metadata = {
  title: "Clínica Vita — Cuidar de você",
  description:
    "Clínica médica multiespecialidade com mais de 40 especialistas, agendamento online e exames com resultado em horas. Cuidado humano do início ao fim.",
};

export default function ClinicaPage() {
  return <DemoPage config={clinicaConfig} />;
}