import { DemoNavbar } from "./demo-navbar";
import { DemoHero } from "./demo-hero";
import { DemoServices } from "./demo-services";
import { DemoAbout } from "./demo-about";
import { DemoTestimonials } from "./demo-testimonials";
import { DemoFaq } from "./demo-faq";
import { DemoCta } from "./demo-cta";
import { DemoFooter } from "./demo-footer";
import { demoWhatsapp, type DemoConfig } from "@/lib/demo-config";

export function DemoPage({ config }: { config: DemoConfig }) {
  return (
    <>
      <DemoNavbar
        brandStart={config.brandStart}
        brandEnd={config.brandEnd}
        navLinks={config.navLinks}
        ctaLabel={config.ctaLabel}
        whatsapp={demoWhatsapp(config)}
      />
      <main className="flex-1">
        <DemoHero config={config} />
        <DemoServices config={config} />
        <DemoAbout config={config} />
        <DemoTestimonials config={config} />
        <DemoFaq config={config} />
        <DemoCta config={config} />
      </main>
      <DemoFooter config={config} />
    </>
  );
}