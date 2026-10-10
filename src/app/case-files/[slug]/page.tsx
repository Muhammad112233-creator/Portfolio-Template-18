import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { Reveal } from "@/components/Reveal";
import { EXHIBITS, PAPER_NAME, SUBJECT_NAME } from "@/lib/data";

export function generateStaticParams() {
  return EXHIBITS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = EXHIBITS.find((e) => e.slug === slug);
  if (!item) {
    return { title: `Missing Case File · ${PAPER_NAME}` };
  }
  return {
    title: `${item.title} (${item.exhibit}) — ${SUBJECT_NAME}`,
    description: item.summary,
  };
}

export default async function CaseFilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = EXHIBITS.find((e) => e.slug === slug);

  if (!item) {
    notFound();
  }

  const relatedItems = item.caseFile.relatedSlugs
    .map((s) => EXHIBITS.find((e) => e.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <main className="relative z-[1] [overflow-x:clip]">
      <header className="pt-[18px]">
        <Shell>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink pb-[9px] font-gothic text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
            <Link
              href={`/#exhibit-${item.slug}`}
              className="link-pencil font-bold text-ink"
            >
              ← Back to the case
            </Link>
            <span>{PAPER_NAME} · Case Files</span>
            <span>Filed from Melbourne</span>
          </div>

          <div className="pt-8">
            <Reveal
              as="span"
              className="block font-gothic text-xs font-bold uppercase tracking-[0.18em] text-stamp"
            >
              Case File · {item.exhibit} · {item.domain}
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-2 max-w-[18ch] font-display text-[clamp(36px,6vw,74px)] font-normal leading-[1.02] tracking-[-0.02em]">
                {item.caseFile.headline}
              </h1>
            </Reveal>

            <Reveal
              as="p"
              delay={140}
              className="mt-4 max-w-[52ch] border-l-4 border-ink pl-[18px] font-text text-[clamp(17px,1.8vw,21px)] italic leading-[1.5] text-ink-soft"
            >
              {item.caseFile.lead}
            </Reveal>

            <Reveal
              as="p"
              delay={200}
              className="mt-4 font-gothic text-xs font-semibold uppercase tracking-[0.06em] text-ink-soft"
            >
              By <b className="text-ink">The Investigation Desk</b> ·{" "}
              {item.caseFile.year}
            </Reveal>
          </div>

          <figure className="mt-7">
            <div className="relative border border-ink/25 bg-paper-bright p-2 pb-0 shadow-[0_2px_14px_rgba(22,20,15,0.14)]">
              <span
                aria-hidden="true"
                className="absolute -top-2 left-1/2 z-[1] h-4 w-16 -translate-x-1/2 -rotate-2 border border-ink/10 bg-paper-deep/75"
              />
              <div className="relative aspect-[2/1] w-full overflow-hidden border border-ink/40 bg-paper">
                <Image
                  src={item.image}
                  alt={item.caseImageAlt}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1140px"
                  className="object-cover object-top grayscale contrast-[1.04] mix-blend-multiply"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-3 px-1 py-1.5 font-mono text-[12px] tracking-[0.02em] text-ink-soft">
                <span className="shrink-0 font-bold uppercase text-ink">
                  {item.exhibit}
                </span>
                <span className="truncate">{item.caseFile.figCaption}</span>
              </figcaption>
            </div>
          </figure>
        </Shell>
      </header>

      <section className="py-12">
        <Shell>
          <div className="grid grid-cols-1 items-start gap-10 min-[940px]:grid-cols-[1.6fr_1fr]">
            <Reveal
              as="article"
              className="dropcap font-text text-[16.5px] leading-[1.65] [hyphens:auto] [text-align:justify] min-[600px]:columns-2 min-[600px]:gap-9 min-[600px]:[column-rule:1px_solid_rgba(22,20,15,0.25)]"
            >
              {item.caseFile.paragraphsBeforeQuote.map((p, idx) => (
                <p key={idx} className="mb-4">
                  {p}
                </p>
              ))}

              <blockquote className="my-6 border-y-2 border-ink py-4 text-center font-display text-[24px] italic leading-[1.25] [column-span:all] [text-align:center]">
                {item.caseFile.quote}
              </blockquote>

              {item.caseFile.paragraphsAfterQuote.map((p, idx) => (
                <p
                  key={idx}
                  className={
                    idx === item.caseFile.paragraphsAfterQuote.length - 1
                      ? ""
                      : "mb-4"
                  }
                >
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={120} className="border-2 border-ink">
              <div className="bg-ink px-4 py-[9px] font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-paper">
                How it was built
              </div>

              {item.caseFile.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-[1fr_1.4fr] gap-3 border-t border-ink/25 px-4 py-3 first-of-type:border-t-0"
                >
                  <span className="font-gothic text-[11px] font-bold uppercase tracking-[0.1em] text-ink-soft">
                    {spec.label}
                  </span>
                  <span className="font-mono text-[13px]">{spec.value}</span>
                </div>
              ))}

              <div className="border-t border-ink/25 bg-paper-warm px-4 py-4">
                <p className="mb-3 font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                  Related exhibits
                </p>
                {relatedItems.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/case-files/${rel.slug}`}
                    className="link-pencil mb-2 block w-fit font-text text-[15px] last:mb-0"
                  >
                    {rel.exhibit} — {rel.title}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-4 border-ink pt-5">
            <Link
              href={`/#exhibit-${item.slug}`}
              className="inline-block border-2 border-ink px-5 py-3 font-gothic text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              ← Back to the case
            </Link>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-ink bg-ink px-5 py-3 font-gothic text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              {item.caseFile.ctaLabel}
            </a>
          </div>
        </Shell>
      </section>
    </main>
  );
}
