"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DemoNavbarProps = {
  brandStart: string;
  brandEnd: string;
  navLinks: { label: string; href: string }[];
  ctaLabel: string;
  whatsapp: string;
};

export function DemoNavbar({
  brandStart,
  brandEnd,
  navLinks,
  ctaLabel,
  whatsapp,
}: DemoNavbarProps) {
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
            scrolled ? "glass h-14" : "h-16 bg-transparent",
          )}
        >
          <a href="#inicio" className="flex items-center gap-2 text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
              <span className="text-base font-black tracking-tight">
                {brandStart.charAt(0)}
              </span>
            </span>
            <span className="text-lg font-bold tracking-tight">
              {brandStart}{" "}
              <span className="text-primary">{brandEnd}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
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
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </Button>
            </a>
            <a href="#cta">
              <Button size="sm" className="px-5">
                {ctaLabel}
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
                {navLinks.map((link, i) => (
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
              >
                <a href="#cta" onClick={() => setOpen(false)}>
                  <Button size="lg" className="w-full">
                    {ctaLabel}
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