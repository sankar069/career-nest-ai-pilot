
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
  children: React.ReactNode;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
  href: string;
  children: React.ReactNode;
};

type BrandButtonProps = ButtonProps | AnchorProps;

export const BrandButton: React.FC<BrandButtonProps> = (props) => {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-lg shadow-md bg-primary text-white hover:bg-accent hover:text-foreground focus:ring-2 focus:ring-primary transition-all duration-150 animate-fade-in";
  if (props.as === "a") {
    // Anchor version: Only anchor props are spread!
    const { as, children, className = "", ...rest } = props;
    return (
      <a className={`${base} ${className}`} {...rest}>
        {children}
      </a>
    );
  }
  // Button version
  const { as, children, className = "", ...rest } = props;
  return (
    <button type="button" className={`${base} ${className}`} {...rest}>
      {children}
    </button>
  );
};
