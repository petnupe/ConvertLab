import {
  Dumbbell,
  Flame,
  Zap,
  UserCheck,
  Users,
  Apple,
} from "lucide-react";

import type { DemoConfig } from "@/lib/demo-config";

export const academiaConfig: DemoConfig = {
  theme: "theme-academia",
  name: "Forja Fitness",
  brandStart: "Forja",
  brandEnd: "Fitness",
  badge: "Primeiro treino grátis para você",
  headlineStart: "Forje o seu melhor",
  highlight: "corpo",
  headlineEnd: "aqui dentro.",
  description:
    "Treino de verdade para quem quer resultado: musculação, funcional e cross com estrutura completa, professores que acompanham cada série e uma energia que contamina. Vem treinar grátis.",
  bullets: [
    "Avaliação física gratuita",
    "Planos sem fidelidade",
    "Treinos funcionais e musculação",
  ],
  image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
  imageAlt: "Aluno treinando na área de musculação da academia",
  floatingTitle: "+2.500 alunos",
  floatingText: "treinando com a gente",
  navLinks: [
    { label: "Treinos", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Dúvidas", href: "#faq" },
  ],
  ctaLabel: "Treinar grátis hoje",
  whatsapp: "5511999990003",
  whatsappMessage: "Olá! Quero agendar meu treino grátis na Forja Fitness.",
  phoneDisplay: "(11) 99999-0003",
  email: "contato@forjafitness.com.br",
  instagram: "@forjafitness",
  address: "Rua Augusta, 800 — São Paulo, SP",
  rating: 4.9,
  servicesEyebrow: "Treinos",
  servicesTitle: "Modalidades para todo nível e objetivo",
  servicesSubtitle:
    "Seja para perder peso, ganhar massa ou se sentir melhor — tem um treino certo para você, do iniciante ao avançado.",
  services: [
    {
      icon: Dumbbell,
      title: "Musculação",
      description:
        "Sala completa com equipamentos de alta qualidade e professores que montam e acompanham seu treino de perto.",
    },
    {
      icon: Flame,
      title: "Cross Training",
      description:
        "Treinos intensos e variados que queimam calorias, constroem resistência e transformam o corpo em poucas semanas.",
    },
    {
      icon: Zap,
      title: "Treino funcional",
      description:
        "Movimentos que melhoram sua postura, equilíbrio e condicionamento para o dia a dia e para qualquer esporte.",
    },
    {
      icon: UserCheck,
      title: "Personal trainer",
      description:
        "Acompanhamento individual com foco total no seu objetivo, na sua evolução e no seu tempo.",
    },
    {
      icon: Users,
      title: "Aulas coletivas",
      description:
        "Spinning, boxe, ritmos e muito mais: mais de 40 aulas semanais para você se movimentar com energia.",
    },
    {
      icon: Apple,
      title: "Nutrição esportiva",
      description:
        "Consultoria nutricional parceira para potencializar seus resultados com uma alimentação que funciona.",
    },
  ],
  aboutEyebrow: "Sobre a Forja",
  aboutTitle: "Mais que uma academia: um lugar que te puxa pra frente",
  aboutText:
    "A Forja Fitness nasceu para ser a academia onde a transformação realmente acontece. Equipe capacitada, estrutura completa e uma comunidade que não deixa ninguém desistir. Aqui, você treina com acompanhamento de verdade — e o seu primeiro treino é por nossa conta.",
  aboutImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
  aboutImageAlt: "Pessoas treinando juntas em uma aula coletiva",
  stats: [
    { value: "+2.500", label: "alunos ativos" },
    { value: "40+", label: "aulas por semana" },
    { value: "95%", label: "permanência anual" },
    { value: "7", label: "dias por semana abertos" },
  ],
  testimonialsEyebrow: "Depoimentos",
  testimonialsTitle: "Transformações reais, histórias reais",
  testimonials: [
    {
      name: "Diego Ferreira",
      role: "Aluno há 2 anos",
      quote:
        "Perdi 18kg em 8 meses e, o mais importante, virei a chave na minha rotina. O acompanhamento dos professores faz toda a diferença.",
      avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    },
    {
      name: "Larissa Costa",
      role: "Aluna de funcional",
      quote:
        "Nunca me senti acolhida numa academia até conhecer a Forja. As aulas são viciantes e eu não falto por nada.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Thiago Nunes",
      role: "Aluno de cross",
      quote:
        "Estrutura de primeiro mundo e uma galera que te motiva. Em 3 meses, meu condicionamento mudou completamente.",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    },
  ],
  faqEyebrow: "Dúvidas",
  faqTitle: "Perguntas frequentes",
  faqs: [
    {
      question: "O primeiro treino é mesmo gratuito?",
      answer:
        "Sim. Você agenda, conhece a estrutura, faz uma aula com um professor e ainda recebe uma avaliação física. Sem compromisso.",
    },
    {
      question: "Preciso ter experiência para treinar aqui?",
      answer:
        "Não. Nossos professores atendem do absoluto iniciante ao avançado, montando o treino certo para cada nível.",
    },
    {
      question: "Existe fidelidade no plano?",
      answer:
        "Não. Nossos planos são mensais e você pode cancelar quando quiser, sem multa e sem burocracia.",
    },
    {
      question: "A avaliação física está incluída?",
      answer:
        "Sim. Na sua primeira visita você já recebe uma avaliação completa de composição corporal para acompanhar sua evolução.",
    },
    {
      question: "A academia abre aos fins de semana?",
      answer:
        "Sim, abrimos todos os dias da semana, com horários estendidos para caber na sua rotina.",
    },
  ],
  ctaTitle: "Seu primeiro treino é por nossa conta",
  ctaSubtitle:
    "Agende agora sua visita, conheça a estrutura e sinta a energia da Forja. Você não precisa estar em forma para começar — só começar.",
};