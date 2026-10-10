"use client";

import React from "react";
import { Fingerprint } from "./Icons";

export function ReopenCase() {
  return (
    <button
      type="button"
      title="Reopen the case"
      aria-label="Reopen the case — replay the intro"
      onClick={() => {
        document.cookie = "rt_intro_seen=; path=/; max-age=0";
        window.location.reload();
      }}
      className="flex h-10 w-10 items-center justify-center border border-paper/45 text-paper transition-colors hover:border-stamp-bright hover:text-stamp-bright cursor-pointer"
    >
      <Fingerprint className="h-[22px] w-[22px]" />
    </button>
  );
}
