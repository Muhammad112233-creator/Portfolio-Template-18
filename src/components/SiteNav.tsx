"use client";

import React, { useEffect, useState } from "react";
import { Shell } from "./Shell";
import { Button } from "./Button";
import { ArrowUpRight, GithubLogo, MapPin } from "./Icons";
import { CITY_SHORT, GITHUB_HANDLE, GITHUB_URL, SUBJECT_NAME } from "@/lib/data";

const NAV_ITEMS = [
  { key: "work", label: "Work", href: "#work" },
  { key: "stack", label: "Stack", href: "#stack" },
  { key: "contact", label: "Contact", href: "#contact" },
];

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveKey(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    ["work", "stack", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      if (window.scrollY < 120) setActiveKey("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;
    const navWrap = document.querySelector(".nav-wrap") as HTMLElement | null;
    const offset = navWrap ? navWrap.offsetHeight : 56;
    const top =
      target.getBoundingClientRect().top + window.scrollY - offset - 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      className="nav-wrap sticky top-0 z-40 border-b-2 border-ink bg-paper"
      style={{ viewTransitionName: "site-header" } as React.CSSProperties}
    >
      <Shell>
        <nav className="flex min-h-[50px] items-center justify-between gap-[18px] py-[9px]">
          <span
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="cursor-pointer whitespace-nowrap select-none font-display text-[22px] font-normal tracking-[-0.01em] text-ink"
          >
            {SUBJECT_NAME}
          </span>

          <div className="hidden items-center gap-[26px] min-[940px]:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`cursor-pointer border-b-2 pb-0.5 font-gothic text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-150 hover:border-ink ${
                  activeKey === item.key ? "border-ink" : "border-transparent"
                }`}
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="primary"
              size="sm"
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              Hire him
            </Button>
          </div>

          <div className="flex items-center gap-3 min-[940px]:hidden">
            <span className="hidden min-[460px]:inline-flex">
              <Button
                variant="primary"
                size="sm"
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
              >
                Hire him
              </Button>
            </span>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-[42px] w-[42px] flex-none flex-col items-center justify-center gap-[5px] border-2 border-ink"
            >
              <span
                className={`h-0.5 w-5 bg-ink transition-transform duration-200 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-ink transition-opacity duration-150 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-ink transition-transform duration-200 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        <div
          aria-hidden={!menuOpen}
          className={`overflow-hidden transition-all duration-200 min-[940px]:hidden ${
            menuOpen
              ? "max-h-[600px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="border-t-2 border-ink pb-4 pt-1.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex items-center justify-between border-b border-ink/25 px-0.5 py-[15px] font-display text-[30px] font-normal tracking-[-0.01em] text-ink ${
                  activeKey === item.key ? "italic" : ""
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-[18px] w-[18px] text-ink-soft" />
              </a>
            ))}
            <div className="mt-[18px]">
              <Button
                variant="primary"
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
              >
                Hire him →
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-[18px] gap-y-2 font-gothic text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
              <span className="inline-flex items-center gap-[7px]">
                <MapPin className="h-3.5 w-3.5" /> {CITY_SHORT}
              </span>
              <span className="inline-flex items-center gap-[7px]">
                <GithubLogo className="h-3.5 w-3.5" />
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {GITHUB_HANDLE}
                </a>
              </span>
            </div>
          </div>
        </div>
      </Shell>
    </div>
  );
}
