"use client";

/**
 * Calm scroll reveals for country body (Motion).
 * Owner pack: Motion scroll + CSS click. Respects prefers-reduced-motion.
 */
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Slight vertical rise (px). Keep small for product UI. */
  y?: number;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "initial" | "animate" | "whileInView" | "viewport" | "transition"
>;

export function CountryScrollReveal({
  children,
  className,
  delay = 0,
  y = 14,
  ...rest
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
