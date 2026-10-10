"use client";

import React, { useLayoutEffect, useRef } from "react";

let sharedObserver: IntersectionObserver | null = null;
let introDone = false;
const pendingElements = new Set<Element>();

function observeElement(el: Element) {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
  }
  sharedObserver.observe(el);
}

export interface RevealProps {
  effect?: "settle" | "rule" | "develop" | "none";
  delay?: number;
  as?: React.ElementType;
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Reveal({
  effect = "settle",
  delay = 0,
  as: Component = "div",
  id,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-revealed");
      return;
    }

    try {
      if (
        document.documentElement.matches(
          ":active-view-transition-type(nav-back)"
        )
      ) {
        el.classList.add("is-revealed");
        return;
      }
    } catch {}

    if (!introDone && !document.querySelector(".fm-intro")) {
      introDone = true;
    }

    if (introDone) {
      observeElement(el);
    } else {
      if (pendingElements.size === 0) {
        window.addEventListener(
          "rt-intro-done",
          () => {
            introDone = true;
            pendingElements.forEach(observeElement);
            pendingElements.clear();
          },
          { once: true }
        );
      }
      pendingElements.add(el);
    }

    return () => {
      pendingElements.delete(el);
      sharedObserver?.unobserve(el);
    };
  }, []);

  const style = delay
    ? ({ "--rv-delay": `${delay}ms` } as React.CSSProperties)
    : undefined;
  const cls = ["rv", effect === "none" ? null : `rv-${effect}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Component ref={ref} id={id} className={cls} style={style}>
      {children}
    </Component>
  );
}

export function WordSplit({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <React.Fragment key={index}>
          {index > 0 ? " " : null}
          <span
            className="rv-word"
            style={{ "--i": index } as React.CSSProperties}
          >
            {word}
          </span>
        </React.Fragment>
      ))}
    </>
  );
}

export function SectionHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-[30px]">
      <Reveal
        effect="none"
        className="flex flex-wrap items-baseline justify-between gap-5 pb-2.5"
      >
        <div>
          <span className="rv-fade font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink">
            {kicker}
          </span>
          <h2 className="mt-1.5 font-display text-[clamp(30px,4vw,46px)] font-normal leading-[1.02] tracking-[-0.015em]">
            <WordSplit text={title} />
          </h2>
        </div>
        <span className="rv-fade whitespace-nowrap font-gothic text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
          {sub}
        </span>
      </Reveal>
      <Reveal effect="rule" className="h-1 bg-ink" />
    </div>
  );
}
