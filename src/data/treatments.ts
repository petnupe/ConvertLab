import {
  Anchor,
  Layers,
  Sparkles,
  AlignCenterHorizontal,
  Crown,
  type LucideIcon,
} from "lucide-react";

export type Treatment = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
};

export const treatments: Treatment[] = [
  {
    icon: Anchor,
    title: "Implantes",
    tagline: "Reconstrução definitiva do sorriso",
    description:
      "Reposição de dentes perdidos com titânio biocompatível e planejamento digital, para um resultado sólido e natural que dura a vida toda.",
    features: ["Planejamento em 3D", "Cirurgia guiada", "Garantia de 5 anos"],
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95",
    imageAlt: "Especialista odontológico no planejamento de implantes",
  },
  {
    icon: Layers,
    title: "Facetas",
    tagline: "Design de sorriso sob medida",
    description:
      "Lâminas ultrafinas em porcelana que corrigem a cor e o formato dos dentes, com efeito natural e mínimo desgaste.",
    features: ["Efeito invisível", "Resultado personalizado", "Em poucas semanas"],
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    imageAlt: "Paciente sorrindo com facetas de porcelana",
  },
  {
    icon: Sparkles,
    title: "Clareamento",
    tagline: "Brilho e saúde",
    description:
      "Técnicas clínicas seguras que recuperam a cor natural dos dentes, removendo manchas e devolvendo brilho sem agressividade.",
    features: ["Protocolo profissional", "Visual imediato", "Sem sensibilidade"],
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
    imageAlt: "Kit de clareamento dental profissional",
  },
  {
    icon: AlignCenterHorizontal,
    title: "Ortodontia",
    tagline: "Alinhamento invisível",
    description:
      "Alinhadores transparentes que reposicionam os dentes discretamente, devolvendo harmonia e função sem metais visíveis.",
    features: ["Alinhadores transparentes", "Menos consultas", "Conforto total"],
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99",
    imageAlt: "Alinhador dental transparente",
  },
  {
    icon: Crown,
    title: "Próteses",
    tagline: "Função e estética de alta precisão",
    description:
      "Coroas e próteses sobre implante confeccionadas em laboratório, com ajuste perfeito e acabamento que imita os dentes naturais.",
    features: ["Porcelana de alta qualidade", "Ajuste milimétrico", "Durabilidade"],
    image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce",
    imageAlt: "Protótipo de prótese dental sobre implante",
  },
];