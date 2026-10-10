import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Shell } from "@/components/Shell";
import { PAPER_NAME, SUBJECT_NAME } from "@/lib/data";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center py-14">
      <Shell>
        <div className="mx-auto max-w-[640px] border-4 border-ink bg-paper-bright px-6 py-9 text-center sm:px-12">
          <p className="font-gothic text-[11px] font-black uppercase tracking-[0.3em] text-ink-soft">
            {PAPER_NAME} · Public Notice
          </p>
          <h1 className="mt-3 border-y-4 border-ink py-2 font-gothic text-[clamp(26px,5.6vw,52px)] font-black uppercase leading-none tracking-[0.1em]">
            Missing Person
          </h1>
          <div className="font-display text-[clamp(96px,22vw,180px)] leading-none tracking-[-0.02em]">
            404
          </div>
          <div className="relative mx-auto mt-2 w-[200px]">
            <div className="relative aspect-square overflow-hidden border-2 border-ink bg-paper">
              <Image
                src="/images/julian-portrait.png"
                alt={`${SUBJECT_NAME} — the subject, still at large`}
                fill
                sizes="200px"
                className="object-cover grayscale mix-blend-multiply"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -right-8 top-1/2 -translate-y-1/2 -rotate-12 border-[3px] border-stamp bg-paper-bright/85 px-2.5 py-1 font-gothic text-[11px] font-black uppercase tracking-[0.16em] text-stamp [filter:url(#fm-rough)]"
            >
              Last seen: the front page
            </span>
          </div>
          <p className="mx-auto mt-6 max-w-[42ch] font-text text-[16px] italic leading-[1.55] text-ink-soft">
            The page you’re after has vanished without a trace — no witnesses,
            no forwarding address. The subject, however, remains at large and
            fully employable.
          </p>
          <Link
            href="/"
            className="mt-7 inline-block border-2 border-ink bg-ink px-6 py-3 font-gothic text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            Return to the case →
          </Link>
        </div>
      </Shell>
    </main>
  );
}
