import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "coral" | "ghost" | "inverse" | "link";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  id?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
  id,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-forest text-white-soft hover:bg-forest-mid shadow-[0_8px_20px_rgba(8,40,40,0.16)] hover:-translate-y-px",
    coral:
      "bg-coral text-forest hover:bg-coral-deep hover:text-white-soft shadow-[0_8px_20px_rgba(227,138,114,0.28)] hover:-translate-y-px",
    ghost:
      "bg-transparent text-current border border-current/25 hover:border-current/50 hover:bg-white/6",
    inverse:
      "bg-white-soft text-forest hover:bg-ivory",
    link: "bg-transparent rounded-none px-0 py-0 text-[15px] tracking-tight hover:translate-x-0.5",
  }[variant];

  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium tracking-[0.02em] transition-all duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-40 disabled:pointer-events-none",
    disabled && "opacity-40 pointer-events-none cursor-not-allowed",
    styles,
    className,
  );

  if (href) {
    if (disabled) {
      return (
        <span
          id={id}
          role="link"
          aria-disabled="true"
          aria-label={ariaLabel}
          className={cls}
        >
          {children}
        </span>
      );
    }
    return (
      <Link
        id={id}
        href={href}
        className={cls}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      className={cls}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      {children}
    </button>
  );
}
