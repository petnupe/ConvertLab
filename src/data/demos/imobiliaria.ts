import {
  Building2,
  Home,
  KeyRound,
  Landmark,
  HandCoins,
  ClipboardCheck,
} from "lucide-react";

import type { DemoConfig } from "@/lib/demo-config";

export const imobiliariaConfig: DemoConfig = {
  theme: "theme-imobiliaria",
  name: "Terra Prime",
  brandStart: "Terra",
  brandEnd: "Prime",
  badge: "Imóveis à pronta entrega e lançamentos",
  headlineStart: "Encontre o imóvel dos seus",
  highlight: "sonhos",
  headlineEnd: ", sem estresse.",
  description:
    "Há 12 anos ajudando famílias e investidores a realizar o próximo passo com segurança. Parcerias com as melhores construtoras e um atendimento que começa na escolha e acaba na escritura.",
  bullets: [
    "Financiamento facilitado",
    "Visita em até 24h",
    "Escritura sem burocracia",
  ],
  image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  imageAlt: "Chaves entregues por um corretor ao novo proprietário",
  floatingTitle: "Apartamento avaliado em",
  floatingText: "venda e locação",
  navLinks: [
    { label: "Imóveis", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Dúvidas", href: "#faq" },
  ],
  ctaLabel: "Falar com um corretor",
  whatsapp: "5511999990002",
  whatsappMessage: "Olá! Quero falar com um corretor da Terra Prime.",
  phoneDisplay: "(11) 99999-0002",
  email: "contato@terraprime.com.br",
  instagram: "@terraprime",
  address: "Av. Brasil, 1500 — São Paulo, SP",
  rating: 4.8,
  servicesEyebrow: "O que oferecemos",
  servicesTitle: "Soluções completas para morar e investir",
  servicesSubtitle:
    "Da busca ao fechamento, uma assessoria completa para você escolher com tranquilidade e segurança.",
  services: [
    {
      icon: Building2,
      title: "Lançamentos",
      description:
        "Condições especiais de compra na planta, com parcelamento facilitado e valorização garantida.",
    },
    {
      icon: Home,
      title: "Imóveis prontos",
      description:
        "Casas e apartamentos à pronta entrega, prontos para visitar e mudar quando você quiser.",
    },
    {
      icon: KeyRound,
      title: "Locação",
      description:
        "Gestão completa de locação para proprietários e inquilinos, com todo o processo documentado.",
    },
    {
      icon: Landmark,
      title: "Alto padrão",
      description:
        "Uma seleção exclusiva de imóveis de alto padrão nos melhores endereços da cidade.",
    },
    {
      icon: HandCoins,
      title: "Financiamento",
      description:
        "Intermediação com os principais bancos para você conquistar as melhores taxas do mercado.",
    },
    {
      icon: ClipboardCheck,
      title: "Avaliação gratuita",
      description:
        "Avaliação precisa do seu imóvel para venda ou locação, gratuita e sem compromisso.",
    },
  ],
  aboutEyebrow: "Sobre a Terra Prime",
  aboutTitle: "O próximo passo da sua vida começa aqui",
  aboutText:
    "Somos uma imobiliária construída sobre confiança e resultado. Nossa equipe de corretores vive o mercado imobiliário todos os dias e usa essa experiência para encontrar o imóvel certo — e negociar as melhores condições para você. Do primeiro contato à entrega das chaves, você nunca está sozinho.",
  aboutImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  aboutImageAlt: "Corretora apresentando uma casa moderna a uma família",
  stats: [
    { value: "+1.200", label: "imóveis vendidos" },
    { value: "98%", label: "clientes satisfeitos" },
    { value: "12", label: "anos de mercado" },
    { value: "24h", label: "retorno à primeira visita" },
  ],
  testimonialsEyebrow: "Depoimentos",
  testimonialsTitle: "Famílias que já trocaram de endereço com a gente",
  testimonials: [
    {
      name: "Paula Martins",
      role: "Comprou um apartamento",
      quote:
        "A equipe da Terra Prime cuidou de tudo, do financiamento à escritura. Eu só apareci para receber as chaves. Experiência perfeita.",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    },
    {
      name: "Rodrigo Lopes",
      role: "Investidor",
      quote:
        "Já fechei três negócios com eles. São rápidos, honestos e conhecem o mercado como ninguém. Meu corretor de confiança.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      name: "Sofia Camargo",
      role: "Vendeu em 20 dias",
      quote:
        "Meu imóvel estava travado há meses em outra imobiliária. Na Terra Prime, vendi em 20 dias e pelo valor certo.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ],
  faqEyebrow: "Dúvidas",
  faqTitle: "Perguntas frequentes",
  faqs: [
    {
      question: "Como funciona o financiamento?",
      answer:
        "Intermediamos com os principais bancos para comparar condições e conseguir a melhor taxa para você, cuidando de toda a documentação.",
    },
    {
      question: "Posso visitar o imóvel hoje?",
      answer:
        "Sim. Agendamos visitas em até 24 horas úteis, em horário de sua escolha, com um corretor dedicado ao seu atendimento.",
    },
    {
      question: "A avaliação do meu imóvel é gratuita?",
      answer:
        "Sim. Nossa avaliação é gratuita e sem compromisso. Você recebe a análise e, se quiser prosseguir, cuidamos de todo o restante.",
    },
    {
      question: "Qual taxa vocês cobram?",
      answer:
        "Trabalhamos com comissão sobre o negócio fechado, dentro do padrão do mercado, e sempre informada com clareza antes de qualquer etapa.",
    },
    {
      question: "Atendem outras cidades?",
      answer:
        "Sim. Além da capital, atuamos na região metropolitana e, para lançamentos, em todo o estado, com atendimento presencial e virtual.",
    },
  ],
  ctaTitle: "O imóvel certo está mais perto do que você pensa",
  ctaSubtitle:
    "Converse agora com um dos nossos corretores e comece a dar o próximo passo. Visita, financiamento e escritura — a gente cuida de tudo.",
};