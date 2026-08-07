import { MessageCircle, Mail, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { convertlabContact } from "@/data/catalog";

const nav = [
  { label: "Projetos", href: "#projetos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "O diferencial", href: "#diferencial" },
  { label: "FAQ", href: "#faq" },
];

export function ClFooter() {
  return (
    <footer className="cl-dark relative overflow-hidden border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M13 2.5 4.5 13.5h6.2l-1.2 8L18 10.5h-6l1.5-8z" />
                <path
                  d="M18.7 2.2l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </span>
            <p className="text-xl font-bold tracking-tight text-white">
              Convert<span className="text-cyan-300">Lab</span>
            </p>
            <p className="max-w-md text-sm leading-relaxed text-white/55">
              Projetadas para converter. Desenvolvidas para crescer. Sua página
              que vende, entregue em 24 horas.
            </p>
          </div>

          <nav aria-label="Rodapé" className="flex flex-wrap items-center justify-center gap-2">
            {nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-white/25 hover:text-white"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={`https://wa.me/${convertlabContact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-white/25 hover:text-white"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="mailto:contato@convertlab.com.br"
              aria-label="Email"
              className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-white/25 hover:text-white"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <a href="#diferencial">
            <Button size="lg" className="gap-2 bg-violet-600 hover:bg-violet-700">
              Solicitar Projeto
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </a>

          <div className="flex w-full flex-col items-center gap-1 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} ConvertLab. Todos os direitos
              reservados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/admin"
                className="text-sm text-white/25 transition-colors hover:text-white/60"
              >
                Área admin
              </a>
              <p className="text-sm text-white/40">
                Landing pages que convertem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}