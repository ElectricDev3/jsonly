import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-[var(--accent-amber)] text-[#241608] hover:bg-[#f5b876] focus-visible:outline-[var(--accent-amber)]",
  secondary:
    "bg-[var(--surface-raised)] text-[var(--text)] border border-[var(--line)] hover:border-[var(--accent-cyan-dim)] hover:text-[var(--accent-cyan)] focus-visible:outline-[var(--accent-cyan)]",
  ghost:
    "bg-transparent text-[var(--text-muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--text)] focus-visible:outline-[var(--accent-cyan)]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
