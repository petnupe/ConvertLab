import { MessageCircle, Mail, MapPin } from "lucide-react";

import { InstagramIcon } from "@/components/ui/instagram-icon";
import { demoWhatsapp, type DemoConfig } from "@/lib/demo-config";

export function DemoFooter({ config }: { config: DemoConfig }) {
  return (
    <footer className="border-t border-line bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <a href="#inicio" className="flex items-center gap-2 text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
              <span className="text-base font-black tracking-tight">
                {config.brandStart.charAt(0)}
              </span>
            </span>
            <span className="text-lg font-bold tracking-tight">
              {config.brandStart}{" "}
              <span className="text-primary">{config.brandEnd}</span>
            </span>
          </a>

          <p className="max-w-md text-sm leading-relaxed text-muted">
            {config.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
            <a
              href={`https://instagram.com/${config.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <InstagramIcon className="h-4 w-4" />
              {config.instagram}
            </a>
            <a
              href={demoWhatsapp(config)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {config.phoneDisplay}
            </a>
            <a
              href={`mailto:${config.email}`}
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {config.email}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {config.address}
            </span>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-2 border-t border-line pt-8 text-xs text-muted sm:flex-row">
            <p>
              © {new Date().getFullYear()} {config.name}. Todos os direitos
              reservados.
            </p>
            <p>{config.badge}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}