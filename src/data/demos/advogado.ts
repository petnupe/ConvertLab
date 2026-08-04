import {
  Briefcase,
  Users,
  HeartHandshake,
  Scale,
  Gavel,
  ShieldCheck,
} from "lucide-react";

import type { DemoConfig } from "@/lib/demo-config";

export const advogadoConfig: DemoConfig = {
  theme: "theme-advogado",
  name: "Nascimento & Cia",
  brandStart: "Nascimento",
  brandEnd: "& Cia",
  badge: "Consulta jurídica inicial gratuita",
  headlineStart: "Defendemos seus direitos com",
  highlight: "estratégia",
  headlineEnd: "e excelência.",
  description:
    "Escritório de advocacia com mais de 20 anos de atuação, dedicado a proteger o que importa para você e para o seu negócio — com atendimento próximo, humano e resultado.",
  bullets: [
    "Atuação em mais de 15 áreas",
    "Resposta em até 24h",
    "Honorários transparentes",
  ],
  image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
  imageAlt: "Símbolos da justiça sobre a mesa de um advogado",
  floatingTitle: "Resultados reais",
  floatingText: "em causas contenciosas",
  navLinks: [
    { label: "Áreas de atuação", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Dúvidas", href: "#faq" },
  ],
  ctaLabel: "Agendar consulta",
  whatsapp: "5511999990001",
  whatsappMessage: "Olá! Quero agendar uma consulta no Nascimento & Cia.",
  phoneDisplay: "(11) 99999-0001",
  email: "contato@nascimentoecia.com.br",
  instagram: "@nascimentoecia",
  address: "Av. Paulista, 2000 — São Paulo, SP",
  rating: 4.9,
  servicesEyebrow: "Áreas de atuação",
  servicesTitle: "A expertise que o seu caso merece",
  servicesSubtitle:
    "Uma equipe multidisciplinar para cuidar do seu problema de ponta a ponta, com atendimento estratégico em cada frente.",
  services: [
    {
      icon: Briefcase,
      title: "Direito Empresarial",
      description:
        "Assessoria completa para abertura de empresas, contratos, sócios e expansão do seu negócio com segurança jurídica.",
    },
    {
      icon: Users,
      title: "Direito Trabalhista",
      description:
        "Defesa de empresas e empregados em reclamatórias, negociações e compliance trabalhista preventivo.",
    },
    {
      icon: HeartHandshake,
      title: "Direito de Família",
      description:
        "Divórcios, guarda, inventários e pensão — conduzidos com sensibilidade e foco em preservar o que importa.",
    },
    {
      icon: Scale,
      title: "Direito Civil",
      description:
        "Ações de responsabilidade, contratos civis e indenizações, sempre orientadas por estratégia e clareza.",
    },
    {
      icon: Gavel,
      title: "Direito Criminal",
      description:
        "Defesa técnica rigorosa em todas as fases processuais, com sigilo absoluto e conduta ética.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance",
      description:
        "Programas de integridade e governança para empresas que desejam se proteger e crescer com reputação sólida.",
    },
  ],
  aboutEyebrow: "Sobre o escritório",
  aboutTitle: "Mais de duas décadas defendendo quem confia em nós",
  aboutText:
    "Fundado por especialistas apaixonados pelo direito, o Nascimento & Cia reúne advogados com pós-graduação e experiência em grandes bancas. Atendemos com a agilidade de um escritório boutique e a estrutura de uma grande firma — com contato direto com o advogado responsável pelo seu caso, do início ao fim.",
  aboutImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744",
  aboutImageAlt: "Sala de reuniões elegante do escritório de advocacia",
  stats: [
    { value: "+20", label: "anos de atuação" },
    { value: "+2.800", label: "casos conduzidos" },
    { value: "92%", label: "taxa de êxito" },
    { value: "24h", label: "retorno ao cliente" },
  ],
  testimonialsEyebrow: "Depoimentos",
  testimonialsTitle: "Quem confia, recomenda",
  testimonials: [
    {
      name: "Fernanda Ribeiro",
      role: "Empresária",
      quote:
        "Em um momento difícil da minha empresa, a equipe resolveu tudo com uma rapidez que eu não esperava. Profissionais sérios e humanos.",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      name: "Carlos Mendonça",
      role: "Cliente de família",
      quote:
        "Meu processo de inventário, que eu temia durar anos, foi conduzido com transparência total e terminou antes do prazo. Recomendo de olhos fechados.",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      name: "Aline Prado",
      role: "Sócia de startup",
      quote:
        "O Nascimento & Cia cuida dos contratos e do compliance da nossa empresa. É a tranquilidade que precisávamos para focar no crescimento.",
      avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    },
  ],
  faqEyebrow: "Dúvidas",
  faqTitle: "Perguntas frequentes",
  faqs: [
    {
      question: "A primeira consulta é realmente gratuita?",
      answer:
        "Sim. Na primeira conversa avaliamos seu caso, explicamos as possibilidades jurídicas e indicamos o melhor caminho — sem nenhum compromisso ou cobrança.",
    },
    {
      question: "Quanto custa o acompanhamento?",
      answer:
        "Depende da complexidade do caso. Após a análise inicial, apresentamos uma proposta clara por escrito, com honorários transparentes e opções de parcelamento.",
    },
    {
      question: "Em quanto tempo recebo um retorno?",
      answer:
        "Nosso compromisso é responder em até 24 horas úteis. Casos urgentes são atendidos com prioridade imediata.",
    },
    {
      question: "Posso acompanhar meu processo?",
      answer:
        "Sim. Você tem contato direto com o advogado responsável e recebe atualizações periódicas sobre cada etapa do seu caso.",
    },
    {
      question: "Atendem fora de São Paulo?",
      answer:
        "Sim. Atuamos em todo o território nacional, com suporte presencial em São Paulo e atendimento virtual para as demais localidades.",
    },
  ],
  ctaTitle: "Não deixe o seu problema para depois",
  ctaSubtitle:
    "Fale agora com um especialista e descubra, em uma conversa gratuita, como podemos defender você e o que você mais valoriza.",
};
