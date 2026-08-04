import {
  Award,
  MonitorSmartphone,
  HandCoins,
  HeartHandshake,
  Sparkles,
  ScanFace,
  type LucideIcon,
} from "lucide-react";

export type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    icon: Award,
    title: "Especialistas certificados",
    description:
      "Equipe formada em implantodontia e odontologia estética, com pós-graduação e atualização contínua.",
  },
  {
    icon: MonitorSmartphone,
    title: "Equipamentos modernos",
    description:
      "Scanner intraoral 3D, tomografia computadorizada e planejamento digital de alta precisão.",
  },
  {
    icon: HandCoins,
    title: "Parcelamento facilitado",
    description:
      "Condições especiais em até 12x no cartão e planos de tratamento sob medida para o seu orçamento.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento humanizado",
    description:
      "Você é recebido pelo nome, escuta cada dúvida e acompanha o tratamento do início ao fim.",
  },
  {
    icon: Sparkles,
    title: "Resultados naturais",
    description:
      "Estética que respeita a harmonia do seu rosto, com acabamento impecável e sorrisos autênticos.",
  },
  {
    icon: ScanFace,
    title: "Tecnologia digital",
    description:
      "Simulação do seu novo sorriso antes de começar, com previsibilidade e conforto em cada etapa.",
  },
];
