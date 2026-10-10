import type { Metadata } from "next";
import "./globals.css";
import { LensCursor } from "@/components/LensCursor";
import { PAPER_NAME, SUBJECT_NAME } from "@/lib/data";

export const metadata: Metadata = {
  title: `${SUBJECT_NAME} - Melbourne Web Developer`,
  description: `${SUBJECT_NAME} is a Melbourne web developer building full-stack web applications with Next.js, React, Tailwind, Supabase, AWS, and Vercel.`,
  applicationName: SUBJECT_NAME,
  authors: [{ name: SUBJECT_NAME }],
  keywords: [
    SUBJECT_NAME,
    "Melbourne web developer",
    "Next.js developer",
    "React developer",
    "full-stack developer",
    "Supabase developer",
    "Studio 47",
    "Kestrel",
    PAPER_NAME,
  ],
  creator: SUBJECT_NAME,
  publisher: SUBJECT_NAME,
  category: "portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-paper text-ink font-text antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js-motion")}catch(e){}`,
          }}
        />
        {children}
        <LensCursor />
        <svg
          aria-hidden="true"
          width="0"
          height="0"
          style={{ position: "absolute" }}
        >
          <filter
            id="fm-rough"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.035 0.06"
              numOctaves={2}
              seed={7}
              result="t"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="t"
              scale={7}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      </body>
    </html>
  );
}
