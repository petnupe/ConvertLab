import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group rounded-2xl border border-line bg-white/80 transition-colors duration-300 hover:border-secondary/40",
        "data-[state=open]:border-secondary/50 data-[state=open]:bg-accent-50",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left text-base font-semibold text-ink outline-none transition-colors hover:text-primary focus-visible:ring-4 focus-visible:ring-secondary/30 md:px-7",
          className,
        )}
        {...props}
      >
        {children}
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-100 text-primary transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-primary group-data-[state=open]:text-white">
          <Plus className="h-4 w-4" aria-hidden="true" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("px-6 pb-6 pt-0 text-muted md:px-7", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};
