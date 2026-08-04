import {
  Stethoscope,
  Baby,
  HeartPulse,
  Microscope,
  Video,
  ClipboardCheck,
} from "lucide-react";

import type { DemoConfig } from "@/lib/demo-config";

export const clinicaConfig: DemoConfig = {
  theme: "theme-clinica",
  name: "Clínica Vita",
  brandStart: "Clínica",
  brandEnd: "Vita",
  badge: "Agendamento online em minutos",
  headlineStart: "Cuidar da sua saúde é a nossa",
  highlight: "missão",
  headlineEnd: ".",
  description:
    "Uma clínica médica multiespecialidade pensada para o seu bem-estar: mais de 40 especialistas, exames com resultado em horas e um atendimento humano do agendamento ao retorno.",
  bullets: [
    "Especialidades médicas",
    "Convênios e particulares",
    "Resultados de exames online",
  ],
  image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
  imageAlt: "Recepção moderna e acolhedora da Clínica Vita",
  floatingTitle: "+40 especialistas",
  floatingText: "à sua disposição",
  navLinks: [
    { label: "Especialidades", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Dúvidas", href: "#faq" },
  ],
  ctaLabel: "Agendar consulta",
  whatsapp: "5511999990004",
  whatsappMessage: "Olá! Quero agendar uma consulta na Clínica Vita.",
  phoneDisplay: "(11) 99999-0004",
  email: "contato@clinicavita.com.br",
  instagram: "@clinicavita",
  address: "Rua Oscar Freire, 900 — São Paulo, SP",
  rating: 4.9,
  servicesEyebrow: "Especialidades",
  servicesTitle: "Tudo o que a sua saúde precisa em um só lugar",
  servicesSubtitle:
    "Das consultas de rotina aos exames especializados, uma estrutura completa para cuidar de você e da sua família.",
  services: [
    {
      icon: Stethoscope,
      title: "Clínico geral",
      description:
        "Consultas para diagnóstico e prevenção, com avaliação completa e encaminhamento quando necessário.",
    },
    {
      icon: Baby,
      title: "Pediatria",
      description:
        "Acompanhamento do seu filho do nascimento à adolescência, com carinho e protocolos atualizados.",
    },
    {
      icon: HeartPulse,
      title: "Cardiologia",
      description:
        "Avaliação cardiovascular completa, com exames modernos e prevenção de doenças do coração.",
    },
    {
      icon: Microscope,
      title: "Exames laboratoriais",
      description:
        "Coleta em nossa própria estrutura e resultados disponíveis online em poucas horas.",
    },
    {
      icon: Video,
      title: "Telemedicina",
      description:
        "Consultas por vídeo com a mesma qualidade do atendimento presencial, de onde você estiver.",
    },
    {
      icon: ClipboardCheck,
      title: "Check-up anual",
      description:
        "Avaliação completa da sua saúde com plano personalizado de prevenção e acompanhamento.",
    },
  ],
  aboutEyebrow: "Sobre a Clínica",
  aboutTitle: "Saúde de verdade começa com cuidado de verdade",
  aboutText:
    "A Clínica Vita nasceu para humanizar o atendimento médico. Tecnologia de ponta, especialistas renomados e um ambiente pensado para você se sentir acolhido em cada visita. Do agendamento online aos resultados na palma da mão, cuidamos de cada detalhe para que você foque só no que importa: a sua saúde.",
  aboutImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
  aboutImageAlt: "Médica atendendo paciente em consultório moderno",
  stats: [
    { value: "+40", label: "especialistas" },
    { value: "+15", label: "anos de atuação" },
    { value: "+30 mil", label: "atendimentos" },
    { value: "4.9", label: "avaliação média" },
  ],
  testimonialsEyebrow: "Depoimentos",
  testimonialsTitle: "Quem cuidamos, recomenda",
  testimonials: [
    {
      name: "Mariana Lopes",
      role: "Paciente de clínico geral",
      quote:
        "Agendei pelo site em dois minutos, fui atendida na hora e recebi o resultado do exame no mesmo dia. Eficiência e cuidado.",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      name: "João Pedro Souza",
      role: "Pai de paciente",
      quote:
        "Levei meu filho à pediatria e fomos tratados com uma paciência e carinho que raramente se vê. Virou nossa clínica de confiança.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      name: "Renata Almeida",
      role: "Paciente de cardiologia",
      quote:
        "O Dr. explicou tudo com calma e montamos um plano de prevenção. Pela primeira vez não tenho medo de ir ao médico.",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    },
  ],
  faqEyebrow: "Dúvidas",
  faqTitle: "Perguntas frequentes",
  faqs: [
    {
      question: "Como faço para agendar uma consulta?",
      answer:
        "É simples: acesse o formulário de agendamento, escolha a especialidade e o horário, e receba a confirmação em minutos pelo WhatsApp ou e-mail.",
    },
    {
      question: "Vocês aceitam convênios?",
      answer:
        "Sim, trabalhamos com as principais operadoras de saúde. Para atendimento particular, temos condições especiais e parcelamento.",
    },
    {
      question: "Quanto tempo demora o resultado dos exames?",
      answer:
        "A maioria dos exames laboratoriais tem resultado liberado em poucas horas, acessível pelo nosso portal online.",
    },
    {
      question: "O atendimento por telemedicina é confiável?",
      answer:
        "Sim. As consultas por vídeo são conduzidas pelos mesmos especialistas, com prontuário integrado e as mesmas garantias do atendimento presencial.",
    },
    {
      question: "O que é o check-up anual?",
      answer:
        "É uma avaliação completa da sua saúde — consulta, exames e plano de prevenção personalizado, para cuidar de você antes mesmo dos sintomas.",
    },
  ],
  ctaTitle: "Sua saúde não pode esperar",
  ctaSubtitle:
    "Agende sua consulta em minutos, escolha o especialista e o horário, e receba um cuidado que realmente escuta você.",
};