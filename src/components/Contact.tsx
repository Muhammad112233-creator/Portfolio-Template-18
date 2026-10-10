"use client";

import React, { useState } from "react";
import { Shell } from "./Shell";
import { Button } from "./Button";
import { Reveal, SectionHeader } from "./Reveal";
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "./Icons";
import {
  CITY_FULL,
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/lib/data";

const inputClass =
  "w-full border-2 border-ink bg-paper-bright px-3.5 py-3 font-text text-[16px] text-ink placeholder:text-ink-faint focus:outline-none";
const labelClass =
  "mb-[7px] block font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft";
const socialBtnClass =
  "flex h-[42px] w-[42px] items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper";

const DESK_DETAILS = [
  {
    k: "Direct line",
    value: (
      <a className="link-pencil" href={`mailto:${CONTACT_EMAIL}`}>
        {CONTACT_EMAIL}
      </a>
    ),
    note: "For commissions, contracts, and the occasional good argument about CSS.",
  },
  {
    k: "The Desk",
    value: CITY_FULL,
    note: "AEST - working with teams worldwide, remote-first.",
  },
  {
    k: "Availability",
    value: "Freelance & contract only",
    note: "Working full-time at Kestrel, so he takes on select freelance / contract projects on the side.",
  },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "Project enquiry");
    const message = String(data.get("message") ?? "");
    const company = String(data.get("company") ?? "");

    setSending(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, company }),
      });
      if (!res.ok) throw new Error("Message failed to send.");
      form.reset();
      setSent(true);
    } catch {
      setErrorMsg(
        "Message could not be sent. Email Julian directly instead."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="border-t-4 border-ink py-[76px]">
      <Shell>
        <SectionHeader
          kicker="Submit a Tip"
          title="Letters & Commissions"
          sub="The desk is open for select work — 2026"
        />
        <Reveal className="grid grid-cols-1 border-2 border-ink min-[600px]:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b-2 border-ink p-6 min-[600px]:border-b-0 min-[600px]:border-r-2 min-[600px]:p-9">
            {sent ? (
              <div className="px-2 py-[30px] text-center">
                <div className="mb-3.5 font-display text-[56px] leading-none">
                  *
                </div>
                <h3 className="mb-2 font-display text-[30px]">
                  Tip received — filed for the morning edition
                </h3>
                <p className="mx-auto max-w-[34ch] font-text text-[15px] leading-[1.55] text-ink-soft">
                  Thanks for writing in. The desk reads every message and
                  replies within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h3 className="mb-1.5 font-display text-[32px] font-normal">
                  Put it in writing
                </h3>
                <p className="mb-6 font-text text-[15px] leading-[1.55] text-ink-soft">
                  A project in mind, a role to fill, or just a good question -
                  send it through and he’ll get back to you.
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    className="hidden"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <div className="grid grid-cols-1 gap-4 min-[600px]:grid-cols-2">
                    <div className="mb-4">
                      <label className={labelClass} htmlFor="contact-name">
                        Your name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        className={inputClass}
                        placeholder="Jane Doe"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className={labelClass} htmlFor="contact-email">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        className={inputClass}
                        type="email"
                        placeholder="jane@company.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className={labelClass} htmlFor="contact-subject">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      className={inputClass}
                      placeholder="A new product, a rebuild, a contract..."
                    />
                  </div>
                  <div className="mb-4">
                    <label className={labelClass} htmlFor="contact-message">
                      The story
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className={`${inputClass} min-h-[120px] resize-y leading-[1.5]`}
                      placeholder="Tell him what you're building."
                      required
                    />
                  </div>
                  {errorMsg ? (
                    <p
                      className="mb-4 font-text text-[14px] leading-[1.45] text-ink-soft"
                      role="alert"
                    >
                      {errorMsg}{" "}
                      <a
                        className="underline"
                        href={`mailto:${CONTACT_EMAIL}`}
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </p>
                  ) : null}
                  <div className="mt-[22px] flex flex-wrap items-center justify-between gap-4">
                    <span className="font-gothic text-[11px] uppercase tracking-[0.06em] text-ink-soft">
                      Usually replies within 24 hours
                    </span>
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      disabled={sending}
                    >
                      {sending ? "Sending..." : "Send the letter"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>

          <div className="flex flex-col bg-paper-warm p-6 min-[600px]:p-8">
            {DESK_DETAILS.map((item, idx) => (
              <div
                key={item.k}
                className={`border-b border-ink/25 py-4 last:border-b-0 ${
                  idx === 0 ? "pt-0" : ""
                }`}
              >
                <p className="mb-[5px] font-gothic text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                  {item.k}
                </p>
                <p className="font-display text-[21px] leading-[1.2] [overflow-wrap:anywhere]">
                  {item.value}
                </p>
                <p className="mt-1 font-text text-[14px] text-ink-soft">
                  {item.note}
                </p>
              </div>
            ))}

            <div className="mt-auto flex gap-2.5 pt-[22px]">
              <a
                className={socialBtnClass}
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GithubLogo className="h-[19px] w-[19px]" />
              </a>
              <a
                className={socialBtnClass}
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedinLogo className="h-[19px] w-[19px]" />
              </a>
              <a
                className={socialBtnClass}
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email"
              >
                <EnvelopeSimple className="h-[19px] w-[19px]" />
              </a>
            </div>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
