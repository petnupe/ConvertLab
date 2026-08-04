import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-tight transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-secondary/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-[0_10px_30px_-10px_rgba(15,118,110,0.6)] hover:bg-primary-700 hover:shadow-[0_16px_40px_-12px_rgba(15,118,110,0.7)] hover:-translate-y-0.5",
        gradient:
          "bg-gradient-to-r from-primary via-secondary to-secondary-400 text-white shadow-[0_14px_38px_-12px_rgba(20,184,166,0.65)] hover:shadow-[0_20px_50px_-14px_rgba(20,184,166,0.8)] hover:-translate-y-0.5",
        outline:
          "border border-line bg-white/70 text-ink backdrop-blur-sm hover:border-secondary/50 hover:bg-accent-100 hover:text-primary",
        ghost:
          "text-muted hover:bg-accent-100 hover:text-primary",
        whatsapp:
          "bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.55)] hover:bg-[#1fb959] hover:-translate-y-0.5",
        dark: "bg-ink text-white hover:bg-ink-soft hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-13 px-8 text-base",
        xl: "h-15 px-9 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
