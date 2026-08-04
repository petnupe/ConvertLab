"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mx-auto flex max-w-3xl flex-col gap-5",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
          dark
            ? "bg-white/10 text-secondary-400 ring-1 ring-white/20"
            : "bg-accent-100 text-primary ring-1 ring-secondary/20",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            dark ? "bg-secondary-400" : "bg-secondary-500",
          )}
          aria-hidden="true"
        />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "text-balance text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-muted",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
