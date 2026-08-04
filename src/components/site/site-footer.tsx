import { MessageCircle, Mail, MapPin, Clock3 } from "lucide-react";

import { InstagramIcon } from "@/components/ui/instagram-icon";
import { siteConfig, WHATSAPP_LINK } from "@/lib/site-config";

export function SiteFooter() {
  const contacts = [
    {
      icon: InstagramIcon,
      label: "Instagram",
      href: siteConfig.instagram,
      text: siteConfig.instagramHandle,
      external: true,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: WHATSAPP_LINK,
      text: siteConfig.phoneDisplay,
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${siteConfig.email}`,
      text: siteConfig.email,
    },
  ];

  return (
    <footer className="border-t border-line bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="flex items-center gap-2 text-ink">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 5.5c-1.6-1.8-3.6-2.5-5.5-2.5C4 3 2.5 4.5 2.5 6.7c0 2.2 1 3.6 2 5.3 1 1.6 1.4 3.6 1.4 5.5 0 1.9-.3 3.5 1 3.5 1.6 0 2.6-4.5 3.6-4.5h2.4c1 0 2 4.5 3.6 4.5 1.3 0 1-1.6 1-3.5 0-1.9.4-3.9 1.4-5.5 1-1.7 2-3.1 2-5.3C21.5 4.5 20 3 17.5 3c-1.9 0-3.9.7-5.5 2.5z" />
                </svg>
              </span>
              <span className="text-lg font-bold tracking-tight">
                Odonto&nbsp;<span className="text-primary">Prime</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
              Contato
            </h3>
            <ul className="mt-4 space-y-3">
              {contacts.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    {...(contact.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                  >
                    <contact.icon className="h-4 w-4" aria-hidden="true" />
                    {contact.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
              Atendimento
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {siteConfig.address}
              </li>
              <li className="flex items-start gap-2">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {siteConfig.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-line pt-8 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
            reservados.
          </p>
          <p>{siteConfig.instagramHandle} · {siteConfig.rating}★ em avaliações reais</p>
        </div>
      </div>
    </footer>
  );
}