"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";

type DemoFloatingProps = {
  floatingTitle: string;
  floatingText: string;
  statValue: string;
  statLabel: string;
};

export function DemoFloating({
  floatingTitle,
  floatingText,
  statValue,
  statLabel,
}: DemoFloatingProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="glass absolute -right-3 top-8 flex animate-float items-center gap-3 rounded-2xl px-4 py-3 sm:-right-6"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
          <Star className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{floatingTitle}</p>
          <p className="text-xs text-muted">{floatingText}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        className="glass absolute -bottom-5 right-6 flex animate-float-slow items-center gap-3 rounded-2xl px-4 py-3"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-100 text-primary">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">
            {statValue} {statLabel}
          </p>
          <p className="text-xs text-muted">{floatingText}</p>
        </div>
      </motion.div>
    </>
  );
}