import { CalendarCheck, ClipboardCheck, Smile } from "lucide-react";

export type Step = {
  number: string;
  icon: typeof CalendarCheck;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Agende",
    description:
      "Escolha o melhor horário pelo WhatsApp ou pelo formulário e receba a confirmação em minutos, sem filas.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Faça sua avaliação",
    description:
      "Conheça nossa equipe, realize o exame digital completo e receba um plano de tratamento com prazos e valores transparentes.",
  },
  {
    number: "03",
    icon: Smile,
    title: "Transforme seu sorriso",
    description:
      "Inicie o tratamento com todo o conforto e acompanhamento. Em poucas semanas, sorria com confiança de novo.",
  },
];
