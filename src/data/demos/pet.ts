import {
  PawPrint,
  Syringe,
  Stethoscope,
  HeartPulse,
  Home,
  ShieldCheck,
} from "lucide-react";

import type { DemoConfig } from "@/lib/demo-config";

export const petConfig: DemoConfig = {
  theme: "theme-pet",
  name: "Amigo Animal",
  brandStart: "Amigo",
  brandEnd: "Animal",
  badge: "Primeira consulta com desconto",
  headlineStart: "Cuidado que o seu pet",
  highlight: "merece",
  headlineEnd: ".",
  description:
    "Pet shop e clínica veterinária completa: banho e tosa, consultas, vacinação e emergência 24h. Uma equipe apaixonada por animais e um atendimento que trata seu melhor amigo como parte da família.",
  bullets: [
    "Emergência 24 horas",
    "Banho e tosa premium",
    "Plano de saúde pet",
  ],
  image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  imageAlt: "Cachorros felizes brincando juntos",
  floatingTitle: "+8 mil",
  floatingText: "pets atendidos",
  navLinks: [
    { label: "Serviços", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Dúvidas", href: "#faq" },
  ],
  ctaLabel: "Agendar atendimento",
  whatsapp: "5511999990006",
  whatsappMessage: "Olá! Quero agendar um atendimento na Amigo Animal.",
  phoneDisplay: "(11) 99999-0006",
  email: "contato@amigoanimal.com.br",
  instagram: "@amigoanimal",
  address: "Av. Faria Lima, 1500 — São Paulo, SP",
  rating: 4.9,
  servicesEyebrow: "Serviços",
  servicesTitle: "Tudo o que o seu melhor amigo precisa",
  servicesSubtitle:
    "Do banho ao pronto-socorro, uma estrutura completa para cuidar da saúde, da beleza e da felicidade do seu pet.",
  services: [
    {
      icon: PawPrint,
      title: "Banho & tosa",
      description:
        "Serviço premium com produtos hipoalergênicos, tosa raça-específica e muito carinho do início ao fim.",
    },
    {
      icon: Stethoscope,
      title: "Consultas veterinárias",
      description:
        "Clínico geral e especialistas para cuidar da saúde do seu pet com diagnóstico preciso e atenção de verdade.",
    },
    {
      icon: Syringe,
      title: "Vacinação",
      description:
        "Protocolo completo de vacinas e vermífugos, com carteirinha digital e lembretes automáticos para você nunca esquecer.",
    },
    {
      icon: HeartPulse,
      title: "Emergência 24h",
      description:
        "Pronto-socorro veterinário aberto 24 horas para os momentos em que cada minuto faz diferença.",
    },
    {
      icon: Home,
      title: "Atendimento domiciliar",
      description:
        "Banho, tosa e consultas no conforto da sua casa, perfeito para pets idosos ou com medo de transporte.",
    },
    {
      icon: ShieldCheck,
      title: "Plano de saúde pet",
      description:
        "Consultas, vacinas e exames por um valor mensal fixo, para o seu pet estar sempre protegido.",
    },
  ],
  aboutEyebrow: "Sobre a Amigo Animal",
  aboutTitle: "Amor de verdade é o nosso principal tratamento",
  aboutText:
    "A Amigo Animal nasceu de uma convicção simples: todo pet merece ser tratado com carinho. Por isso, investimos em uma equipe apaixonada, estrutura completa e protocolos modernos, em um ambiente pensado para reduzir o estresse dos animais. Da vacinação à emergência 24h, cuidamos de cada detalhe para você ter tranquilidade — e o seu pet, muita saúde.",
  aboutImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
  aboutImageAlt: "Veterinária acolhendo um cachorro em um consultório",
  stats: [
    { value: "+8 mil", label: "pets atendidos" },
    { value: "24h", label: "emergência" },
    { value: "12", label: "especialidades" },
    { value: "98%", label: "clientes satisfeitos" },
  ],
  testimonialsEyebrow: "Depoimentos",
  testimonialsTitle: "Nossos clientes (e seus pets) aprovam",
  testimonials: [
    {
      name: "Patrícia Mendes",
      role: "Tutora do Thor",
      quote:
        "O Thor adora ir para o banho e tosa. Ele chega abanando o rabo e volta lindo. E a equipe cuida dele como se fosse da família.",
      avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      name: "Carlos Eduardo",
      role: "Tutor da Mel",
      quote:
        "Precisamos da emergência às 3 da manhã e fomos atendidos com rapidez e competência. Não tenho palavras para agradecer.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Beatriz Souza",
      role: "Tutora do Bob",
      quote:
        "O plano de saúde pet vale muito a pena. Consultas e vacinas sempre em dia, com um preço justo e atendimento humano.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ],
  faqEyebrow: "Dúvidas",
  faqTitle: "Perguntas frequentes",
  faqs: [
    {
      question: "Como funciona a emergência 24h?",
      answer:
        "Nosso pronto-socorro funciona de domingo a domingo, 24 horas por dia. Em caso de urgência, é só chamar no WhatsApp ou ligar.",
    },
    {
      question: "Preciso agendar banho e tosa?",
      answer:
        "Sim, recomendamos o agendamento para garantir o horário. Temos opção de atendimento domiciliar para quem prefere o conforto de casa.",
    },
    {
      question: "O plano de saúde pet cobre o quê?",
      answer:
        "Consultas, vacinas, exames de rotina e descontos em procedimentos. É a forma mais econômica de manter a saúde do seu pet em dia.",
    },
    {
      question: "Aceitam pets de todas as raças e portes?",
      answer:
        "Sim. Trabalhamos com todas as raças e portes, incluindo pets idosos, com necessidades especiais ou que precisam de atendimento mais delicado.",
    },
    {
      question: "Vocês vendem produtos?",
      answer:
        "Sim. Temos uma loja completa com rações, acessórios, medicamentos e brinquedos selecionados para o bem-estar do seu pet.",
    },
  ],
  ctaTitle: "Seu pet merece esse cuidado",
  ctaSubtitle:
    "Agende agora a primeira consulta com desconto, conheça nossa estrutura e dê ao seu melhor amigo o atendimento que ele merece.",
};
