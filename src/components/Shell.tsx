import React from "react";

export function Shell({
  children,
  wide = false,
  className = "",
}: {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto px-5 sm:px-[30px] ${
        wide ? "max-w-[1320px]" : "max-w-[1180px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
