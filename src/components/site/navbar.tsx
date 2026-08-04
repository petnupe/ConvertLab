"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const links = [
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Antes e Depois", href: "#antes-e-depois" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          aria-label="Navegação principal"
          className={cn(
            "flex items-center justify-between rounded-full pl-5 pr-2 transition-all duration-300",
            scrolled
              ? "glass h-14"
              : "h-16 bg-transparent",
          )}
        >
          <a
            href="#inicio"
            className="flex items-center gap-2 text-ink"
            aria-label="Odonto Prime — início"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-[0_8px_20px_-8px_rgba(15,118,110,0.6)]">
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

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-100 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </Button>
            </a>
            <a href="#cta">
              <Button size="sm" className="px-5">
                Agendar Avaliação
              </Button>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-accent-100 lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <ul className="flex flex-col gap-2">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-4 text-2xl font-semibold tracking-tight text-ink transition-colors hover:bg-accent-100 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-3"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg" className="w-full">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Falar no WhatsApp
                  </Button>
                </a>
                <a href="#cta" onClick={() => setOpen(false)}>
                  <Button size="lg" className="w-full">
                    Agendar Avaliação
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
