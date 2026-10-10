import React from "react";

const variants = {
  primary: "bg-ink text-paper hover:bg-transparent hover:text-ink",
  ink: "bg-ink text-paper hover:bg-paper hover:text-ink",
  ghost: "bg-transparent text-ink hover:bg-ink hover:text-paper",
};

const sizes = {
  sm: "text-[11.5px] px-[15px] py-2",
  md: "text-[13px] px-[22px] py-3",
  lg: "text-[14px] px-7 py-[15px]",
};

export interface ButtonProps {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const cls = `inline-flex items-center gap-2.5 whitespace-nowrap border-2 border-ink font-gothic font-bold uppercase tracking-[0.1em] transition-colors duration-150 cursor-pointer ${
    variants[variant]
  } ${sizes[size]} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`;

  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
