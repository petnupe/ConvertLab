import {
  Sparkles,
  Gem,
  Droplets,
  Heart,
  Crown,
  Users,
} from "lucide-react";

import type { DemoConfig } from "@/lib/demo-config";

export const esteticaConfig: DemoConfig = {
  theme: "theme-estetica",
  name: "Lumi Estética",
  brandStart: "Lumi",
  brandEnd: "Estética",
  badge: "Avaliação gratuita para novos clientes",
  headlineStart: "Sua melhor versão",
  highlight: "brilha",
  headlineEnd: "aqui.",
  description:
    "Clínica de estética e spa premium com tratamentos faciais, corporais e de relaxamento. Tecnologia de ponta, profissionais certificados e um ambiente pensado para você se cuidar — e amar o resultado.",
  bullets: [
    "Avaliação gratuita",
    "Tecnologia de ponta",
    "Ambiente de spa",
  ],
  image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
  imageAlt: "Ambiente acolhedor e moderno do spa da Lumi Estética",
  floatingTitle: "+5 mil",
  floatingText: "clientes atendidas",
  navLinks: [
    { label: "Tratamentos", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Dúvidas", href: "#faq" },
  ],
  ctaLabel: "Agendar avaliação",
  whatsapp: "5511999990005",
  whatsappMessage: "Olá! Quero agendar uma avaliação na Lumi Estética.",
  phoneDisplay: "(11) 99999-0005",
  email: "contato@lumiestetica.com.br",
  instagram: "@lumiestetica",
  address: "Rua Oscar Freire, 1200 — São Paulo, SP",
  rating: 4.9,
  servicesEyebrow: "Tratamentos",
  servicesTitle: "Cuidado completo para a sua beleza e bem-estar",
  servicesSubtitle:
    "Do cuidado facial ao relaxamento profundo, uma estrutura completa com protocolos personalizados para cada pele e cada objetivo.",
  services: [
    {
      icon: Sparkles,
      title: "Limpeza de pele",
      description:
        "Tratamento profundo com extração, renovação e hidratação para uma pele limpa, luminosa e saudável.",
    },
    {
      icon: Gem,
      title: "Tratamentos faciais",
      description:
        "Peeling, laser e protocolos anti-idade com tecnologia de ponta para rejuvenescer e uniformizar a pele.",
    },
    {
      icon: Droplets,
      title: "Hidratação & nutrição",
      description:
        "Protocolos personalizados que devolvem viço e maciez, devolvendo à sua pele o equilíbrio que ela precisa.",
    },
    {
      icon: Heart,
      title: "Massagem & relaxamento",
      description:
        "Massagens relaxantes e drenagem linfática em um ambiente de spa que cuida do corpo e da mente.",
    },
    {
      icon: Crown,
      title: "Day spa premium",
      description:
        "Experiências exclusivas de meio período com tratamentos combinados para renovar você de dentro para fora.",
    },
    {
      icon: Users,
      title: "Planos & pacotes",
      description:
        "Pacotes mensais de manutenção com condições especiais para quem quer cuidar de si com constância.",
    },
  ],
  aboutEyebrow: "Sobre a Lumi",
  aboutTitle: "Beleza de verdade é cuidado de verdade",
  aboutText:
    "A Lumi Estética nasceu para transformar o autocuidado em ritual. Profissionais certificados, produtos de alta performance e um ambiente pensado para o seu descanso. Aqui, você não é mais um número: cada protocolo é montado sob medida para a sua pele e para os seus objetivos — e o primeiro passo é por nossa conta.",
  aboutImage: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9",
  aboutImageAlt: "Profissional aplicando tratamento estético facial em cliente",
  stats: [
    { value: "+5 mil", label: "clientes atendidas" },
    { value: "10+", label: "anos de experiência" },
    { value: "15+", label: "protocolos exclusivos" },
    { value: "4.9", label: "avaliação média" },
  ],
  testimonialsEyebrow: "Depoimentos",
  testimonialsTitle: "Quem se cuida aqui, recomenda",
  testimonials: [
    {
      name: "Camila Rocha",
      role: "Cliente de limpeza de pele",
      quote:
        "Sai da primeira sessão com a pele completamente diferente. O ambiente é um espetáculo e o cuidado é absurdo.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Fernanda Dias",
      role: "Cliente do day spa",
      quote:
        "Meu momento preferido do mês. A equipe é atenciosa, o espaço é lindo e eu sempre volto renovada.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Juliana Castro",
      role: "Cliente de tratamentos faciais",
      quote:
        "Fiz o protocolo anti-idade e em poucas sessões minha pele voltou a ter viço. Resultado de verdade, com acompanhamento de verdade.",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    },
  ],
  faqEyebrow: "Dúvidas",
  faqTitle: "Perguntas frequentes",
  faqs: [
    {
      question: "A avaliação é realmente gratuita?",
      answer:
        "Sim. Na sua primeira visita você recebe uma avaliação completa da pele e um plano de tratamento personalizado, sem custo e sem compromisso.",
    },
    {
      question: "Os tratamentos têm contraindicação?",
      answer:
        "Alguns protocolos exigem avaliação prévia. Por isso, todo tratamento começa pela nossa análise, garantindo segurança e o melhor resultado.",
    },
    {
      question: "Preciso agendar com antecedência?",
      answer:
        "Recomendamos o agendamento pelo WhatsApp ou site, mas trabalhamos com horários especiais para quem precisa de flexibilidade.",
    },
    {
      question: "Vocês aceitam pacotes ou planos?",
      answer:
        "Sim. Temos pacotes mensais de manutenção com condições especiais, pensados para quem quer cuidar de si com regularidade.",
    },
    {
      question: "Posso presentear alguém?",
      answer:
        "Sim. Temos vouchers de day spa e de tratamentos avulsos — o presente perfeito para quem merece um cuidado especial.",
    },
  ],
  ctaTitle: "Seu autocuidado começa com uma avaliação",
  ctaSubtitle:
    "Agende agora sua avaliação gratuita, conheça o espaço e descubra o tratamento ideal para a sua pele. Você merece esse cuidado.",
};
