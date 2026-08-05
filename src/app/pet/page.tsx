import type { Metadata } from "next";

import { DemoPage } from "@/components/demo/demo-page";
import { petConfig } from "@/data/demos/pet";

export const metadata: Metadata = {
  title: "Amigo Animal — Pet shop e veterinária",
  description:
    "Pet shop e clínica veterinária completa: banho e tosa, consultas, vacinação e emergência 24h. Agende o atendimento do seu pet.",
};

export default function PetPage() {
  return <DemoPage config={petConfig} />;
}