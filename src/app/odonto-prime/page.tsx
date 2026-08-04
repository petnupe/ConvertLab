import type { Metadata } from "next";

import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { SectionTreatments } from "@/components/site/section-treatments";
import { SectionBenefits } from "@/components/site/section-benefits";
import { SectionSteps } from "@/components/site/section-steps";
import { SectionGallery } from "@/components/site/section-gallery";
import { SectionTestimonials } from "@/components/site/section-testimonials";
import { SectionFaq } from "@/components/site/section-faq";
import { SectionCta } from "@/components/site/section-cta";
import { SiteFooter } from "@/components/site/site-footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Odonto Prime — Transforme seu sorriso",
  description: siteConfig.description,
};

export default function OdontoPrimePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SectionTreatments />
        <SectionBenefits />
        <SectionSteps />
        <SectionGallery />
        <SectionTestimonials />
        <SectionFaq />
        <SectionCta />
      </main>
      <SiteFooter />
    </>
  );
}