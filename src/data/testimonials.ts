export type Testimonial = {
  name: string;
  age: number;
  treatment: string;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Marcela Duarte",
    age: 38,
    treatment: "Implantes e facetas",
    quote:
      "Eu tinha vergonha de sorrir em reuniões. Hoje, depois dos implantes e das facetas, me sinto uma outra pessoa. O cuidado da equipe foi impressionante do começo ao fim.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Ricardo Andrade",
    age: 47,
    treatment: "Implantes de titânio",
    quote:
      "Perdi um dente frontal num acidente e achava que nunca mais sorriria com naturalidade. O resultado é tão perfeito que ninguém percebe. Realmente profissional.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Juliana Menezes",
    age: 31,
    treatment: "Facetas de porcelana",
    quote:
      "Sempre escondi meu sorriso nas fotos. As facetas devolveram minha autoestima. O bom trabalho digital me mostrou o resultado antes mesmo de começar.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Patrícia Nogueira",
    age: 42,
    treatment: "Clareamento e ortodontia",
    quote:
      "Fiz o clareamento e depois os alinhadores invisíveis. Atendimento pontual, tudo explicadinho, sem dor e parcelado sem burocracia. Recomendo de olhos fechados.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Eduardo Santana",
    age: 55,
    treatment: "Próteses sobre implante",
    quote:
      "Tive medo da cirurgia, mas o Dr. e a equipe foram muito pacientes. Resultado firme, confortável e bonito. Volto sempre para os cuidados preventivos.",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Camila Ferreira",
    age: 29,
    treatment: "Design de sorriso",
    quote:
      "O que mais me impressionou foi a tecnologia: simulei meu novo sorriso antes de qualquer procedimento. A Odonto Prime parece um centro de excelência.",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
  },
];