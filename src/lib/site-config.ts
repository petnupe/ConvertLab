export const siteConfig = {
  name: "Odonto Prime",
  description:
    "Clínica odontológica premium especializada em implantes, facetas e transformação de sorriso. Tratamentos estéticos realizados por especialistas para você sorrir com confiança novamente.",
  url: "https://odontoprime.com.br",
  locale: "pt_BR",
  whatsappNumber: "5511999990000",
  phoneDisplay: "(11) 99999-0000",
  phoneLink: "tel:+5511999999999",
  email: "contato@odontoprime.com.br",
  instagram: "https://instagram.com/odontoprime",
  instagramHandle: "@odontoprime",
  address: "Av. Paulista, 1578 — Conj. 42, Bela Vista, São Paulo — SP",
  mapQuery: "Av+Paulista+1578+Bela+Vista+Sao+Paulo",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Av+Paulista+1578+Bela+Vista+Sao+Paulo",
  hours: "Seg a sex, 8h às 19h · Sábado, 9h às 14h",
  rating: 4.9,
  patients: 3000,
  experience: 15,
  satisfaction: 98,
  reviews: 500,
};

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Quero agendar uma avaliação na Odonto Prime.";

export const WHATSAPP_LINK = whatsappLink(WHATSAPP_DEFAULT_MESSAGE);
