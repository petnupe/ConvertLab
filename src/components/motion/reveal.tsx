"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Direction = "up" | "down" | "left" | "right" | "none";

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 36 },
  down: { y: -36 },
  left: { x: 44 },
  right: { x: -44 },
  none: {},
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  amount?: number;
};

export function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.72,
  amount = 0.2,
}: RevealProps) {
  const hidden = { opacity: 0, ...directionOffset[direction] };
  const visible = { opacity: 1, x: 0, y: 0 };
  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
