
import React from "react";

interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
}

export const BrandButton: React.FC<BrandButtonProps> = ({
  children,
  as = "button",
  href,
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-lg shadow-md bg-primary text-white hover:bg-accent hover:text-foreground focus:ring-2 focus:ring-primary transition-all duration-150 animate-fade-in";
  if (as === "a" && href) {
    return (
      <a
        href={href}
        className={`${base} ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
};
