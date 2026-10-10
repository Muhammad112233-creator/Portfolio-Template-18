"use client";

import React, { useEffect, useRef, useState } from "react";

export function DateLine({ text }: { text: string }) {
  const [count, setCount] = useState(text.length);
  const started = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      let start = 0;
      const step = (now: number) => {
        if (!start) start = now;
        const progress = Math.min(1, (now - start) / 600);
        setCount(Math.round(progress * text.length));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (document.querySelector(".fm-intro")) {
      window.addEventListener("rt-intro-done", run, { once: true });
      return () => window.removeEventListener("rt-intro-done", run);
    }
    run();
  }, [text.length]);

  return (
    <span className="relative whitespace-nowrap">
      <span className="text-transparent">{text}</span>
      <span className="absolute inset-0" aria-hidden="true">
        {text.slice(0, count)}
      </span>
    </span>
  );
}
