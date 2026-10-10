"use client";

import React, { useEffect, useRef } from "react";

export function LensCursor() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let visible = false;
    const onMove = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX + 12}px, ${
        e.clientY + 14
      }px)`;
      const target = e.target;
      const overInteractive =
        target instanceof Element &&
        target.closest("a, button, [data-lens]") !== null;
      if (overInteractive !== visible) {
        visible = overInteractive;
        el.style.opacity = overInteractive ? "1" : "0";
      }
    };

    const attach = () =>
      window.addEventListener("pointermove", onMove, { passive: true });

    if (document.querySelector(".fm-intro")) {
      window.addEventListener("rt-intro-done", attach, { once: true });
    } else {
      attach();
    }

    return () => {
      window.removeEventListener("rt-intro-done", attach);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9000] opacity-0 [transition:opacity_.15s_ease] [will-change:transform]"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        className="drop-shadow-sm"
      >
        <circle
          cx="10.5"
          cy="10.5"
          r="7"
          stroke="#16140f"
          strokeWidth="2.5"
          fill="rgba(251,250,245,0.55)"
        />
        <line
          x1="15.8"
          y1="15.8"
          x2="23"
          y2="23"
          stroke="#16140f"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="8.4" cy="8.2" r="2.1" fill="rgba(251,250,245,0.85)" />
      </svg>
    </div>
  );
}
