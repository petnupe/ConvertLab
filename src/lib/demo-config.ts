import type { LucideIcon } from "lucide-react";

export type DemoService = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type DemoStat = {
  value: string;
  label: string;
};

export type DemoTestimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export type DemoFaq = {
  question: string;
  answer: string;
};

export type DemoConfig = {
  theme: string;
  name: string;
  brandStart: string;
  brandEnd: string;
  badge: string;
  headlineStart: string;
  highlight: string;
  headlineEnd: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  floatingTitle: string;
  floatingText: string;
  navLinks: { label: string; href: string }[];
  ctaLabel: string;
  whatsapp: string;
  whatsappMessage: string;
  phoneDisplay: string;
  email: string;
  instagram: string;
  address: string;
  rating: number;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesSubtitle: string;
  services: DemoService[];
  aboutEyebrow: string;
  aboutTitle: string;
  aboutText: string;
  aboutImage: string;
  aboutImageAlt: string;
  stats: DemoStat[];
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  testimonials: DemoTestimonial[];
  faqEyebrow: string;
  faqTitle: string;
  faqs: DemoFaq[];
  ctaTitle: string;
  ctaSubtitle: string;
};

export function demoWhatsapp(config: DemoConfig) {
  return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    config.whatsappMessage,
  )}`;
}
