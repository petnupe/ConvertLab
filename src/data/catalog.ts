export type Project = {
  slug: string;
  name: string;
  tag: string;
  blurb: string;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: "odonto-prime",
    name: "Odonto Prime",
    tag: "Odontologia",
    blurb:
      "Clínica odontológica premium com agendamento por avaliação, depoimentos e planejamento digital de sorriso.",
    image: "https://images.unsplash.com/photo-1609840114035-815d4c134f66",
    imageAlt: "Paciente sorrindo após tratamento odontológico",
  },
  {
    slug: "advogado",
    name: "Nascimento & Cia",
    tag: "Advocacia",
    blurb:
      "Escritório de advocacia de alta demanda com portfólio de áreas de atuação e atendimento humanizado.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
    imageAlt: "Escritório de advocacia com símbolo da justiça",
  },
  {
    slug: "imobiliaria",
    name: "Terra Prime",
    tag: "Imobiliária",
    blurb:
      "Imobiliária de lançamentos e alto padrão com financiamento facilitado e atendimento regional.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    imageAlt: "Chaves de um imóvel entregues ao novo proprietário",
  },
  {
    slug: "academia",
    name: "Forja Fitness",
    tag: "Academia & Fitness",
    blurb:
      "Academia de treino funcional com planos flexíveis, avaliação gratuita e resultados reais.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    imageAlt: "Equipamentos de musculação em academia moderna",
  },
  {
    slug: "clinica",
    name: "Clínica Vita",
    tag: "Clínica médica",
    blurb:
      "Clínica médica multiespecialidade com agendamento online, check-ups e atendimento humanizado.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
    imageAlt: "Recepção moderna de clínica médica",
  },
];

export const catalogServices = [
  "Odontologia",
  "Advocacia",
  "Imobiliária",
  "Academia & Fitness",
  "Clínica médica",
  "Outro segmento",
];

export const catalogSteps = [
  {
    number: "1",
    title: "Você responde um briefing",
    description:
      "Preenche o formulário rápido com os dados do seu negócio, objetivo e referências. Leva menos de 5 minutos.",
  },
  {
    number: "2",
    title: "Nós desenvolvemos",
    description:
      "Nosso time cria a landing com design, copy e estratégia de conversão sob medida para o seu público.",
  },
  {
    number: "3",
    title: "Você aprova",
    description:
      "Revisa cada seção e pede ajustes. O processo é transparente e sem burocracia até você ficar satisfeito.",
  },
  {
    number: "4",
    title: "Publicamos",
    description:
      "Subimos sua página no ar com domínio, hospedagem e rastreamento. Pronto para vender — em até 24 horas.",
  },
];

export const catalogFaqs = [
  {
    question: "Quanto custa uma landing page?",
    answer:
      "O valor depende do segmento e das seções necessárias. Ao enviar o formulário, você recebe um orçamento fechado e organizado, sem taxas escondidas e com tudo explicado por escrito.",
  },
  {
    question: "A entrega em 24 horas é real?",
    answer:
      "Sim. Projetos padrão (uma página completa, com texto, imagens e formulário) são publicados em até 24 horas após a aprovação do briefing. Projetos maiores têm prazo combinado na proposta.",
  },
  {
    question: "O que preciso fornecer?",
    answer:
      "Apenas o que você já sabe do seu negócio: nome, empresa, objetivo, serviço, cores de referência e links. A partir disso, nós escrevemos os textos e montamos tudo para você.",
  },
  {
    question: "E se eu não gostar do resultado?",
    answer:
      "Você aprova cada etapa antes da publicação. Se algo não estiver no caminho certo, ajustamos até que esteja. A publicação só acontece quando você diz que sim.",
  },
  {
    question: "A página fica pronta para vender de verdade?",
    answer:
      "Sim. Incluímos formulário de captação, botões de WhatsApp, integração com seu Instagram e rastreamento de visitas para você acompanhar a conversão desde o primeiro dia.",
  },
  {
    question: "Como faço para começar?",
    answer:
      "Clique em Solicitar Projeto e preencha o formulário. Em poucos minutos você recebe tudo organizado e, em seguida, um orçamento sob medida para o seu negócio.",
  },
];
