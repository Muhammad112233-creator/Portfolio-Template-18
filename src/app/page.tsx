import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/Button";
import { Reveal, SectionHeader } from "@/components/Reveal";
import { DateLine } from "@/components/DateLine";
import { Intro } from "@/components/Intro";
import { SiteNav } from "@/components/SiteNav";
import { Contact } from "@/components/Contact";
import { ReopenCase } from "@/components/ReopenCase";
import { GithubLogo, LinkedinLogo } from "@/components/Icons";
import {
  CAREER_LEDGER,
  CASE_NUMBER,
  CITY_FULL,
  CONTACT_EMAIL,
  EXHIBITS,
  GITHUB_URL,
  LAB_SUBSTANCES,
  LINKEDIN_URL,
  PAPER_NAME,
  SUBJECT_NAME,
} from "@/lib/data";

function formatBroadsheetDate() {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Melbourne",
  })
    .format(new Date())
    .replace(/,/g, "");
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const introSeen = cookieStore.get("rt_intro_seen")?.value === "1";
  const formattedDate = formatBroadsheetDate();

  const leadExhibit = EXHIBITS[0];
  const gridExhibits = EXHIBITS.slice(1);

  return (
    <div className="relative z-[1] [overflow-x:clip]">
      {!introSeen && <Intro />}

      <header className="bg-paper pt-[18px]">
        <Shell>
          <div className="flex items-center justify-between gap-4 pb-[9px] font-gothic text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
            <div className="flex-1">{CITY_FULL}</div>
            <div className="flex-1 text-center">The Investigation Edition</div>
            <div className="flex-1 text-right">Est. 2023</div>
          </div>
          <h1 className="m-0 border-t-2 border-ink px-0 pb-1 pt-1.5 text-center font-display text-[clamp(40px,8.5vw,104px)] font-normal leading-[0.92] tracking-[-0.01em]">
            {SUBJECT_NAME}
            <small className="mt-3.5 block font-gothic text-[clamp(8px,1.7vw,14px)] font-semibold uppercase tracking-[0.2em] text-ink-soft [text-wrap:balance] sm:tracking-[0.42em]">
              The Personal Record of a Web Developer
            </small>
          </h1>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-x-[22px] gap-y-1 border-y-2 border-ink py-[7px] font-gothic text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
            <span>
              <DateLine text={formattedDate} />
            </span>
            <span className="h-[3px] w-[3px] rounded-full bg-ink-soft" />
            <span>Vol. III</span>
            <span className="h-[3px] w-[3px] rounded-full bg-ink-soft" />
            <span>Selected Works &amp; Notes</span>
            <span className="h-[3px] w-[3px] rounded-full bg-ink-soft" />
            <span>Price: One Coffee</span>
          </div>
        </Shell>
      </header>

      <SiteNav />

      <section className="pb-2 pt-[30px]">
        <Shell>
          <div className="mb-[18px] flex items-center justify-between gap-4 border-b border-ink/25 pb-[9px] font-gothic text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
            <span>Front Page</span>
            <span>Filed under: Open Investigations</span>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 min-[940px]:grid-cols-[1.55fr_1fr]">
            <div>
              <Reveal
                as="span"
                className="block font-gothic text-xs font-bold uppercase tracking-[0.18em] text-ink"
              >
                Case No. {CASE_NUMBER} — Findings Published
              </Reveal>

              <Reveal delay={60}>
                <h1 className="mt-1 font-display text-[clamp(40px,6.6vw,86px)] font-normal leading-none tracking-[-0.02em]">
                  A Melbourne web developer who likes building things —{" "}
                  <em className="italic">front to back.</em>
                </h1>
              </Reveal>

              <Reveal
                as="p"
                delay={140}
                className="mt-5 max-w-[30ch] border-l-4 border-ink pl-[18px] font-text text-[clamp(18px,2vw,23px)] italic leading-[1.45] text-ink-soft"
              >
                Three years in: {SUBJECT_NAME} builds web apps at Kestrel, and
                runs Studio {CASE_NUMBER} — a small studio that takes on full
                application builds.
              </Reveal>

              <Reveal
                as="p"
                delay={200}
                className="mt-5 font-gothic text-xs font-semibold uppercase tracking-[0.06em] text-ink-soft"
              >
                By <b className="text-ink">The Investigation Desk</b>  · 
                Reporting from Melbourne, between Kestrel and Studio{" "}
                {CASE_NUMBER}
              </Reveal>

              <Reveal delay={260} className="mt-[22px] flex flex-wrap gap-3">
                <Button variant="primary" size="lg" href="#work">
                  Read the work →
                </Button>
                <Button variant="ghost" size="lg" href="#contact">
                  Get in touch
                </Button>
              </Reveal>

              <Reveal
                delay={320}
                className="mt-[30px] grid grid-cols-2 border-y-2 border-ink min-[600px]:grid-cols-4"
              >
                <div className="px-[18px] py-4 min-[600px]:border-r min-[600px]:border-ink/25 border-r border-ink/25 border-b min-[600px]:border-b-0">
                  <div className="whitespace-nowrap font-display text-[clamp(22px,2.3vw,32px)] leading-none">
                    No. {CASE_NUMBER}
                  </div>
                  <div className="mt-[7px] font-gothic text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                    Edition · first printing
                  </div>
                </div>
                <div className="px-[18px] py-4 min-[600px]:border-r min-[600px]:border-ink/25 border-b border-ink/25 min-[600px]:border-b-0">
                  <div className="whitespace-nowrap font-display text-[clamp(22px,2.3vw,32px)] leading-none">
                    19°C
                  </div>
                  <div className="mt-[7px] font-gothic text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                    Melbourne · crisp autumn sun
                  </div>
                </div>
                <div className="px-[18px] py-4 min-[600px]:border-r min-[600px]:border-ink/25 border-r border-ink/25">
                  <div className="whitespace-nowrap font-display text-[clamp(22px,2.3vw,32px)] leading-none">
                    Global
                  </div>
                  <div className="mt-[7px] font-gothic text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                    Circulation · remote-friendly
                  </div>
                </div>
                <div className="px-[18px] py-4">
                  <div className="whitespace-nowrap font-display text-[clamp(22px,2.3vw,32px)] leading-none">
                    Late Final
                  </div>
                  <div className="mt-[7px] font-gothic text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                    Ships when it&apos;s ready
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="border-t-2 border-ink pt-[22px] min-[940px]:border-l min-[940px]:border-t-0 min-[940px]:border-ink/25 min-[940px]:pl-[34px] min-[940px]:pt-0">
              <Reveal
                effect="develop"
                delay={180}
                className="relative aspect-square w-full overflow-hidden border-2 border-ink bg-paper"
              >
                <Image
                  src="/images/julian-portrait.png"
                  alt={`${SUBJECT_NAME} — the subject, photographed in his natural habitat`}
                  fill
                  priority
                  sizes="(max-width: 940px) 100vw, 380px"
                  className="object-cover mix-blend-multiply"
                />
              </Reveal>
              <Reveal
                as="p"
                delay={240}
                className="mt-2 font-gothic text-[11px] font-medium leading-[1.4] tracking-[0.04em] text-ink-soft"
              >
                <b className="font-bold uppercase tracking-[0.1em] text-ink">
                  Pictured:
                </b>{" "}
                the subject, in his natural habitat.
              </Reveal>
              <Reveal
                delay={300}
                className="dropcap mt-[18px] font-text text-[16px] leading-[1.6] [hyphens:auto] [text-align:justify]"
              >
                <p className="mb-3">
                  He enjoys the whole process — going from a rough idea on a
                  napkin to something that ships cleanly. His main stack is
                  Next.js and Tailwind on the front, with Supabase underneath
                  and Vercel for deploys.
                </p>
                <p className="mb-3">
                  When a build calls for it, he reaches for AWS — Amplify,
                  Lambda, S3 — and MySQL. Through Studio {CASE_NUMBER}, a small
                  Melbourne practice he started, he also helps take on larger
                  application builds alongside the team.
                </p>
              </Reveal>
            </div>
          </div>
        </Shell>
      </section>

      <hr className="border-0 border-t-4 border-ink" />

      <section id="work" className="py-[76px]">
        <Shell>
          <SectionHeader
            kicker="The Evidence"
            title="Selected Works"
            sub="Exhibits A – G · Entered 2023 – Now"
          />

          {/* Featured Exhibit A */}
          <article
            id={`exhibit-${leadExhibit.slug}`}
            className="group relative flex flex-col items-stretch gap-8 border-b border-ink/25 py-7 transition-colors hover:bg-paper-warm min-[940px]:flex-row"
          >
            <Reveal
              effect="develop"
              className="w-full self-start min-[940px]:w-[46%] min-[940px]:flex-none"
            >
              <div className="relative border border-ink/25 bg-paper-bright p-2 pb-0 shadow-[0_2px_14px_rgba(22,20,15,0.14)]">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 left-1/2 z-[1] h-4 w-16 -translate-x-1/2 -rotate-2 border border-ink/10 bg-paper-deep/75"
                />
                <div className="relative overflow-hidden border border-ink/40 bg-paper aspect-video min-[940px]:aspect-auto min-[940px]:h-[272px]">
                  <Image
                    src={leadExhibit.image}
                    alt={leadExhibit.imageAlt}
                    fill
                    sizes="(max-width: 940px) 100vw, 540px"
                    className="object-cover object-top grayscale contrast-[1.04] mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(166,56,44,0.5)_0.7px,transparent_0.8px)] bg-[length:4px_4px] opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-60 group-focus-within:opacity-60"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2.5 top-2.5 rotate-[8deg] scale-150 border-[3px] border-stamp bg-paper-bright/85 px-2.5 py-1 font-gothic text-[11px] font-black uppercase tracking-[0.18em] text-stamp opacity-0 transition-all duration-200 ease-out [filter:url(#fm-rough)] group-hover:-rotate-[8deg] group-hover:scale-100 group-hover:opacity-100 group-focus-within:-rotate-[8deg] group-focus-within:scale-100 group-focus-within:opacity-100"
                  >
                    Confirmed
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 px-1 py-1.5 font-mono text-[11px] tracking-[0.02em] text-ink-soft">
                  <span className="relative shrink-0 font-bold uppercase text-ink">
                    {leadExhibit.exhibit}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 120 44"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute -bottom-1.5 -left-2 -right-3 -top-1.5 h-[calc(100%+12px)] w-[calc(100%+20px)]"
                    >
                      <path
                        className="rv-sketch"
                        d="M10 24 C 8 10, 44 4, 76 7 C 104 10, 116 18, 112 28 C 108 38, 70 42, 40 39 C 16 37, 8 30, 12 20"
                        fill="none"
                        stroke="#a6382c"
                        strokeWidth="3"
                        strokeLinecap="round"
                        pathLength={1}
                        opacity="0.85"
                      />
                    </svg>
                  </span>
                  <span className="truncate">
                    recovered from {leadExhibit.recoveredFrom}
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} className="flex flex-1 flex-col">
              <span className="font-gothic text-[11px] font-bold uppercase tracking-[0.14em] text-stamp">
                {leadExhibit.exhibit}
              </span>
              <span className="mt-3 font-gothic text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
                {leadExhibit.clientLabel}
              </span>
              <h3 className="mt-2 font-display text-[clamp(30px,3.6vw,46px)] font-normal leading-[1.06] tracking-[-0.01em]">
                {leadExhibit.title}
              </h3>
              <p className="mt-3.5 mb-auto max-w-[60ch] font-text text-[17px] leading-[1.55] text-ink-soft [hyphens:auto] [text-align:justify]">
                {leadExhibit.summary}
              </p>
              <div className="mb-4 mt-[18px] flex flex-wrap gap-1.5">
                {leadExhibit.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 border border-ink px-2.5 py-[3px] font-mono text-[11px] font-medium bg-transparent text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-ink/25 pt-3.5">
                <span className="font-mono text-xs text-ink-soft">
                  {leadExhibit.yearLabel}
                </span>
                <Link
                  href={`/case-files/${leadExhibit.slug}`}
                  className="group inline-flex items-center gap-1.5 border-b-[1.5px] pb-0.5 font-gothic text-xs font-bold uppercase tracking-[0.08em] after:absolute after:inset-0 after:content-[''] text-stamp border-stamp"
                >
                  Open case file{" "}
                  <span className="transition-transform duration-150 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </article>

          {/* Grid Exhibits B - G */}
          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[940px]:grid-cols-3">
            {gridExhibits.map((item, idx) => (
              <Reveal
                key={item.slug}
                as="article"
                id={`exhibit-${item.slug}`}
                delay={(idx % 3) * 60}
                className="group relative flex flex-col border-t border-ink/25 py-[26px] pr-0 transition-colors hover:bg-paper-warm min-[600px]:border-r min-[600px]:border-ink/25 min-[600px]:pr-[26px] min-[600px]:[&:nth-child(2n)]:border-r-0 min-[600px]:[&:nth-child(2n)]:pr-0 min-[940px]:border-r min-[940px]:border-ink/25 min-[940px]:pr-[26px] min-[940px]:[&:nth-child(2n)]:border-r min-[940px]:[&:nth-child(2n)]:pr-[26px] min-[940px]:[&:nth-child(3n)]:border-r-0 min-[940px]:[&:nth-child(3n)]:pr-0"
              >
                <span className="font-gothic text-[11px] font-bold uppercase tracking-[0.14em] text-stamp">
                  {item.exhibit}
                </span>
                <span className="mt-3 font-gothic text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
                  {item.clientLabel}
                </span>
                <h3 className="mt-2 min-h-[calc(2*28px*1.06)] font-display text-[28px] font-normal leading-[1.06] tracking-[-0.01em]">
                  {item.title}
                </h3>
                <div className="mt-4">
                  <div className="relative border border-ink/25 bg-paper-bright p-2 pb-0 shadow-[0_2px_14px_rgba(22,20,15,0.14)]">
                    <span
                      aria-hidden="true"
                      className="absolute -top-2 left-1/2 z-[1] h-4 w-16 -translate-x-1/2 -rotate-2 border border-ink/10 bg-paper-deep/75"
                    />
                    <div className="relative overflow-hidden border border-ink/40 bg-paper h-[176px]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 940px) 50vw, 360px"
                        className="object-cover object-top grayscale contrast-[1.04] mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(166,56,44,0.5)_0.7px,transparent_0.8px)] bg-[length:4px_4px] opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-60 group-focus-within:opacity-60"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-2.5 top-2.5 rotate-[8deg] scale-150 border-[3px] border-stamp bg-paper-bright/85 px-2.5 py-1 font-gothic text-[11px] font-black uppercase tracking-[0.18em] text-stamp opacity-0 transition-all duration-200 ease-out [filter:url(#fm-rough)] group-hover:-rotate-[8deg] group-hover:scale-100 group-hover:opacity-100 group-focus-within:-rotate-[8deg] group-focus-within:scale-100 group-focus-within:opacity-100"
                      >
                        Confirmed
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 px-1 py-1.5 font-mono text-[11px] tracking-[0.02em] text-ink-soft">
                      <span className="relative shrink-0 font-bold uppercase text-ink">
                        {item.exhibit}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 120 44"
                          preserveAspectRatio="none"
                          className="pointer-events-none absolute -bottom-1.5 -left-2 -right-3 -top-1.5 h-[calc(100%+12px)] w-[calc(100%+20px)]"
                        >
                          <path
                            className="rv-sketch"
                            d="M10 24 C 8 10, 44 4, 76 7 C 104 10, 116 18, 112 28 C 108 38, 70 42, 40 39 C 16 37, 8 30, 12 20"
                            fill="none"
                            stroke="#a6382c"
                            strokeWidth="3"
                            strokeLinecap="round"
                            pathLength={1}
                            opacity="0.85"
                          />
                        </svg>
                      </span>
                      <span className="truncate">
                        recovered from {item.recoveredFrom}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3.5 mb-auto font-text text-[15px] leading-[1.55] text-ink-soft [hyphens:auto] [text-align:justify]">
                  {item.summary}
                </p>
                <div className="mb-4 mt-[18px] flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 border border-ink px-2.5 py-[3px] font-mono text-[11px] font-medium bg-transparent text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-ink/25 pt-3.5">
                  <span className="font-mono text-xs text-ink-soft">
                    {item.yearLabel}
                  </span>
                  <Link
                    href={`/case-files/${item.slug}`}
                    className="group inline-flex items-center gap-1.5 border-b-[1.5px] pb-0.5 font-gothic text-xs font-bold uppercase tracking-[0.08em] after:absolute after:inset-0 after:content-[''] text-stamp border-stamp"
                  >
                    Open case file{" "}
                    <span className="transition-transform duration-150 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      <section
        id="stack"
        className="border-y-4 border-ink bg-paper-warm py-[76px]"
      >
        <Shell>
          <SectionHeader
            kicker="Forensics"
            title="The Lab Report"
            sub="Substances detected on the subject, as of this edition"
          />
          <div className="border-2 border-ink bg-paper">
            <div className="hidden grid-cols-[2.4fr_1fr_1fr_1.3fr] bg-ink font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-paper sm:grid">
              <span className="border-r border-paper/25 px-4 py-[9px]">
                Substance
              </span>
              <span className="border-r border-paper/25 px-4 py-[9px]">
                Code
              </span>
              <span className="border-r border-paper/25 px-4 py-[9px]">
                Detected
              </span>
              <span className="px-4 py-[9px] text-right">Finding</span>
            </div>

            {LAB_SUBSTANCES.map((sub) => (
              <Reveal
                key={sub.code}
                delay={sub.delay}
                className="grid gap-2 border-t border-ink/25 px-3.5 py-3.5 font-mono transition-colors first:border-t-0 hover:bg-paper-warm sm:grid-cols-[2.4fr_1fr_1fr_1.3fr] sm:items-center sm:gap-0 sm:px-0 sm:py-0"
              >
                <span className="flex min-w-0 items-baseline justify-between gap-3 sm:block sm:border-r sm:border-ink/25 sm:px-4 sm:py-[11px]">
                  <span className="truncate font-display !text-[19px] tracking-normal sm:tracking-[-0.01em]">
                    {sub.name}
                  </span>
                  <span className="shrink-0 font-gothic text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft sm:hidden">
                    {sub.code}
                  </span>
                </span>
                <span className="hidden border-r border-ink/25 px-4 py-[11px] text-[13px] text-ink-soft sm:block">
                  {sub.code}
                </span>
                <span className="text-[12px] uppercase tracking-[0.08em] text-ink-soft sm:border-r sm:border-ink/25 sm:px-4 sm:py-[11px] sm:text-[13px] sm:normal-case sm:tracking-normal sm:text-ink">
                  {sub.detected}
                </span>
                <span className="sm:px-4 sm:py-[9px] sm:text-right">
                  <span
                    className={`rv-stampchild border-2 px-2 py-0.5 font-gothic text-[10px] font-black uppercase tracking-[0.14em] ${sub.badgeClass}`}
                  >
                    {sub.finding}
                  </span>
                </span>
              </Reveal>
            ))}
          </div>
          <p className="mt-3 text-left font-gothic text-[11px] font-medium tracking-[0.04em] text-ink-soft sm:text-right">
            Findings are illustrative — what he reaches for day to day, not a
            ranking.
          </p>
        </Shell>
      </section>

      <section id="career" className="py-[76px]">
        <Shell>
          <SectionHeader
            kicker="Known Whereabouts"
            title="The Career Ledger"
            sub="Movements on record since 2017"
          />
          <div className="border-t-2 border-ink">
            {CAREER_LEDGER.map((entry) => (
              <Reveal
                key={entry.period}
                delay={entry.delay}
                className="grid grid-cols-1 items-baseline gap-1.5 border-b border-ink/25 px-1 py-[22px] min-[600px]:grid-cols-[170px_1fr_0.9fr] min-[600px]:gap-6"
              >
                <div className="font-mono text-[13px] text-ink-soft">
                  <span className="rv-stampchild">{entry.period}</span>
                </div>
                <div className="font-display text-[24px] leading-[1.1]">
                  {entry.role}
                  <b className="mt-1.5 block font-gothic text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">
                    {entry.org}
                  </b>
                </div>
                <div className="font-text text-[15px] leading-[1.55] text-ink-soft">
                  {entry.notes}
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      <Contact />

      <footer className="border-t-[6px] border-ink bg-ink px-0 pb-[30px] pt-14 text-paper">
        <Shell>
          <div className="border-b border-paper/30 pb-[22px] text-center font-display text-[clamp(42px,7vw,82px)] leading-[0.9] tracking-[-0.01em]">
            {SUBJECT_NAME}
          </div>
          <div className="grid grid-cols-1 gap-8 pt-[30px] min-[600px]:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div className="min-[600px]:col-span-1">
              <p className="max-w-[34ch] font-text text-[15px] leading-[1.6] text-paper/[0.78]">
                A web developer in {CITY_FULL}. Building robust web apps at
                Kestrel, and founding Studio {CASE_NUMBER} — a studio whose team
                takes on full application builds. This broadsheet is hand-set in
                Caslon and Franklin.
              </p>
            </div>
            <div>
              <h4 className="mb-3.5 font-gothic text-[11px] font-bold uppercase tracking-[0.14em] text-paper/60">
                Sections
              </h4>
              <a
                className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper"
                href="#work"
              >
                Selected Works
              </a>
              <a
                className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper"
                href="#stack"
              >
                The Stack
              </a>
              <a
                className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper"
                href="#contact"
              >
                Contact
              </a>
            </div>
            <div>
              <h4 className="mb-3.5 font-gothic text-[11px] font-bold uppercase tracking-[0.14em] text-paper/60">
                The Desk
              </h4>
              <p className="mb-2.5 font-text text-[15px] text-paper">
                {CITY_FULL}
              </p>
              <p className="mb-2.5 font-text text-[15px] text-paper">
                AEST · Remote-first
              </p>
              <a
                className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <h4 className="mb-3.5 font-gothic text-[11px] font-bold uppercase tracking-[0.14em] text-paper/60">
                Wire Services
              </h4>
              <a
                className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="link-pencil-bright mb-2.5 block w-fit font-text text-[15px] text-paper"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <span
              aria-hidden="true"
              className="inline-block -rotate-6 border-4 border-stamp-bright px-6 py-2 font-gothic text-[15px] font-black uppercase tracking-[0.3em] text-stamp-bright [filter:url(#fm-rough)]"
            >
              Case Closed
            </span>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-paper/30 pt-5 font-gothic text-[11px] font-medium uppercase tracking-[0.1em] text-paper/70 min-[600px]:flex-row min-[600px]:justify-between">
            <span>
              © 2026 {PAPER_NAME} · All rights reserved · Printed in Melbourne
            </span>
            <div className="flex gap-2.5">
              <a
                aria-label="GitHub"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-paper/45 text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                <GithubLogo className="h-[18px] w-[18px]" />
              </a>
              <a
                aria-label="LinkedIn"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-paper/45 text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                <LinkedinLogo className="h-[18px] w-[18px]" />
              </a>
              <ReopenCase />
            </div>
          </div>
        </Shell>
      </footer>
    </div>
  );
}
