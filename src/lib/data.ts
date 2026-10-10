export const SUBJECT_NAME = "Julian Vance";
export const PAPER_NAME = "The Julian Vance Chronicle";
export const CONTACT_EMAIL = "julian@studio47.com.au";
export const GITHUB_URL = "https://github.com/julianvance";
export const GITHUB_HANDLE = "github.com/julianvance";
export const LINKEDIN_URL = "https://www.linkedin.com/in/julian-vance-dev/";
export const CITY_FULL = "Melbourne, Australia";
export const CITY_SHORT = "Melbourne, AU";
export const CASE_NUMBER = "47";

export interface CaseSpec {
  label: string;
  value: string;
}

export interface ExhibitItem {
  slug: string;
  exhibit: string;
  clientLabel: string;
  recoveredFrom: string;
  domain: string;
  url: string;
  title: string;
  image: string;
  imageAlt: string;
  caseImageAlt: string;
  summary: string;
  tags: string[];
  yearLabel: string;
  featured?: boolean;
  caseFile: {
    headline: string;
    lead: string;
    year: string;
    figCaption: string;
    paragraphsBeforeQuote: string[];
    quote: string;
    paragraphsAfterQuote: string[];
    specs: CaseSpec[];
    relatedSlugs: string[];
    ctaLabel: string;
  };
}

export const EXHIBITS: ExhibitItem[] = [
  {
    slug: "atelier-lumiere",
    exhibit: "Exhibit A",
    clientLabel: "Client · atelierlumiere.com.au",
    recoveredFrom: "www.atelierlumiere.com.au",
    domain: "atelierlumiere.com.au",
    url: "https://www.atelierlumiere.com.au",
    title: "Atelier Lumière Clinic",
    image: "/images/atelier-lumiere.png",
    imageAlt: "Atelier Lumière Clinic",
    caseImageAlt: "Atelier Lumière Clinic — the booking application",
    summary:
      "A Fitzroy skin clinic handed a whole operation, not a brochure: patient accounts behind auth, a clinical booking flow, an internal roster the therapists run themselves, and an AI skin concierge — “Clara” — that triages concerns, maps a treatment plan and takes the booking. Next.js and Tailwind over Supabase. No accomplices on record.",
    tags: ["Next.js", "Tailwind", "Supabase", "Auth", "Booking", "AI Concierge"],
    yearLabel: "2026 · Solo",
    featured: true,
    caseFile: {
      headline: "The clinic that keeps its own diary",
      lead: "A private dermal studio on Gertrude Street asked for a website. What the subject left behind was a working clinical operation: patient accounts, treatment bookings, an internal roster, and an AI skin concierge on the front desk. Filed as a solo job.",
      year: "2026",
      figCaption: "Fig. 1 — the clinic's front desk, open and taking appointments.",
      paragraphsBeforeQuote: [
        "Most jobs in this file end at the shop window. This one goes through it. Atelier Lumière is a private three-room dermal clinic at 118 Gertrude St, Fitzroy — quiet timber rooms, clinical-grade LED and peel protocols, a short and considered treatment menu, and the promise that you never cross paths with another client in the waiting room. That promise is the whole business, and a static page of opening hours does not keep it. Something had to hold the diary.",
        "So the subject built an application and hung a website on the front of it. Patients create accounts and sign in; the booking flow carries a consultation through from the treatment menu — barrier repair, LED therapy, enzymatic peels, the bespoke dermal plan — to a confirmed room and clinician slot, with buffer windows automatically locked between sessions. Behind the login sits an internal system where the clinic manages its own clinicians, rooms, contraindications and calendar, with no developer standing between the director and her own schedule. The desk has recorded that arrangement three times now and still regards it as the point of the exercise.",
        "The exhibit's distinguishing feature is the one that answers back. “Clara” — the clinic's AI intake concierge — sits in a consultation drawer and does the work a front-desk coordinator would: fields questions about downtime and active ingredients, walks a prospective patient through a skin intake, and hands them into the right booking slot at the end. Alongside it runs a regimen builder: the guest logs their current routine, checks ingredient conflicts, and sees the recommended preparation before stepping into the room. Per the clinic's own copy: no guesswork, just clear skin.",
      ],
      quote: "“She asked for a website. What she got was a front-desk coordinator who never sleeps.”",
      paragraphsAfterQuote: [
        "The construction is the familiar solo stack pushed further than the solo file has taken it before — Next.js and Tailwind on the surface, a Supabase layer holding patient accounts, treatment protocols and the diary underneath, with row-level auth and the clinician admin built on top of it rather than bolted beside it. The AI concierge is the newest instrument on the subject's person, and the desk notes it was deployed where it can be checked: in front of paying patients, on a live clinical diary, in a practice where a mis-booked room is an empty treatment bed.",
        "Four things this exhibit has that a brochure site does not: accounts, clinical bookings, an internal roster, and something that talks. The investigation regards the combination as the strongest single showing in the file — evidence that the subject builds software, not pages.",
        "The clinic is in production at atelierlumiere.com.au, taking appointments daily. The desk recommends the reader inspect the premises, and — if the winter wind has been unkind — the treatment table.",
      ],
      specs: [
        { label: "Front-end", value: "Next.js · Tailwind" },
        { label: "Data & auth", value: "Supabase" },
        { label: "Booking", value: "Accounts · roster · buffers" },
        { label: "Admin", value: "Internal clinical system" },
        { label: "AI", value: "“Clara” concierge · regimen check" },
        { label: "Role", value: "Solo" },
        { label: "Entered", value: "2026" },
        { label: "Status", value: "In production" },
      ],
      relatedSlugs: ["monroe-films", "harbour-care"],
      ctaLabel: "Inspect the evidence — visit the clinic →",
    },
  },
  {
    slug: "kestrel-store",
    exhibit: "Exhibit B",
    clientLabel: "Kestrel · kestrelpack.com.au",
    recoveredFrom: "kestrelpack.com.au",
    domain: "kestrelpack.com.au",
    url: "https://kestrelpack.com.au",
    title: "Kestrel Storefront",
    image: "/images/kestrel-store.png",
    imageAlt: "Kestrel Storefront",
    caseImageAlt: "Kestrel Storefront — packaging e-commerce platform",
    summary:
      "The customer-facing storefront, built with the team at Kestrel. The subject's prints are on it front to back — artwork preflight and file handling on AWS, a Supabase data layer underneath.",
    tags: ["Next.js", "Tailwind", "Supabase", "AWS", "Vercel"],
    yearLabel: "2023 — Now",
    caseFile: {
      headline: "The storefront with his prints on it",
      lead: "Kestrel manufactures short-run corrugated boxes and mailers out of Braeside. The storefront is where off-the-shelf cartons, custom print runs and artwork uploads meet the factory floor.",
      year: "2023 — Now",
      figCaption: "Fig. 1 — the storefront, open for business.",
      paragraphsBeforeQuote: [
        "Before a cardboard box ends up on a warehouse pallet in Melbourne, somebody has to order it. Kestrel's storefront is the front door for thousands of Australian merchants ordering stock mailers, shipping cartons, and custom-printed runs without picking up the phone.",
        "The subject's fingerprints turn up across both halves of the build. On the surface, a fast Next.js and Tailwind catalog handles tiered volume pricing, freight calculation by postcode, and instant stock checks. Underneath, customer artwork uploads — often heavy print-ready PDFs and dielines — stream straight to AWS S3 with automated preflight checks before a human prepress operator ever opens the file.",
      ],
      quote: "“The shop window loads fast and without ceremony — the pipeline behind it does the rest.”",
      paragraphsAfterQuote: [
        "Supabase holds the product catalog, customer accounts, and saved packaging templates, while Vercel serves the edge storefront across Australia. Working alongside the Kestrel engineering team, the subject has maintained and expanded the storefront continuously since 2023.",
        "The result is an industrial storefront that behaves like a consumer app — clean, predictable, and wired directly into the factory's dispatch queue.",
      ],
      specs: [
        { label: "Front-end", value: "Next.js · Tailwind" },
        { label: "Data & auth", value: "Supabase · PostgreSQL" },
        { label: "File pipeline", value: "AWS S3 · Lambda preflight" },
        { label: "Hosting", value: "Vercel" },
        { label: "Role", value: "Full-stack (Kestrel team)" },
        { label: "Entered", value: "2023 — Now" },
        { label: "Status", value: "In production" },
      ],
      relatedSlugs: ["kestrel-quote", "kestrel-3d"],
      ctaLabel: "Inspect the evidence — visit the storefront →",
    },
  },
  {
    slug: "kestrel-quote",
    exhibit: "Exhibit C",
    clientLabel: "Kestrel · quote.kestrelpack.com.au",
    recoveredFrom: "quote.kestrelpack.com.au",
    domain: "quote.kestrelpack.com.au",
    url: "https://quote.kestrelpack.com.au",
    title: "Kestrel Quote",
    image: "/images/kestrel-quote.png",
    imageAlt: "Kestrel Quote",
    caseImageAlt: "Kestrel Quote — live packaging pricing calculator",
    summary:
      "The quoting engine that turns millimetre specs into priced production orders. Examination shows a Next.js front-end over a Supabase core, a MySQL slice holding legacy board-grade pricing matrices, and AWS handling the dieline assets.",
    tags: ["Next.js", "Tailwind", "Supabase", "AWS", "MySQL"],
    yearLabel: "2023 — Now",
    caseFile: {
      headline: "The machine that names the price",
      lead: "Pricing a custom corrugated box used to take a sales rep, a spreadsheet, and an afternoon. This engine calculates board yield, machine setup, flute grade, and print plates in under a second.",
      year: "2023 — Now",
      figCaption: "Fig. 1 — the engine, mid-calculation.",
      paragraphsBeforeQuote: [
        "Custom packaging is a geometry problem disguised as a sales quote. Change the depth of a mailer by twelve millimetres and it might cross a sheet-width boundary on the corrugator, doubling the waste margin. Kestrel Quote takes length, width, depth, board flute, print finish, and quantity — and returns an exact unit price on the spot.",
        "Forensic inspection of the architecture reveals two databases working in tandem. A legacy MySQL instance holds years of calibrated factory board-grade tables and press run rates, while Supabase manages user sessions, saved quotes, and order conversion.",
      ],
      quote: "“Two databases at one scene is usually a sign of history. He wired them into a single engine.”",
      paragraphsAfterQuote: [
        "Rather than rewriting five years of factory pricing formulas from scratch for the sake of architectural vanity, the subject bridged the MySQL pricing core into a clean Next.js API layer, backed by Supabase for state and AWS for generated PDF quote sheets.",
        "Customers get an instant binding price; the sales desk gets a pre-validated spec sheet ready for the die-cutter.",
      ],
      specs: [
        { label: "Front-end", value: "Next.js · Tailwind" },
        { label: "Core data", value: "Supabase" },
        { label: "Pricing matrix", value: "MySQL" },
        { label: "Assets & PDFs", value: "AWS S3 · Lambda" },
        { label: "Role", value: "Full-stack (Kestrel team)" },
        { label: "Entered", value: "2023 — Now" },
        { label: "Status", value: "In production" },
      ],
      relatedSlugs: ["kestrel-store", "kestrel-3d"],
      ctaLabel: "Inspect the evidence — open the engine →",
    },
  },
  {
    slug: "kestrel-3d",
    exhibit: "Exhibit D",
    clientLabel: "Kestrel · studio.kestrelpack.com.au",
    recoveredFrom: "studio.kestrelpack.com.au",
    domain: "studio.kestrelpack.com.au",
    url: "https://studio.kestrelpack.com.au",
    title: "Kestrel 3D Studio",
    image: "/images/kestrel-3d.png",
    imageAlt: "Kestrel 3D Studio",
    caseImageAlt: "Kestrel 3D Studio — interactive WebGL packaging configurator",
    summary:
      "An interactive 3D packaging design platform built with React Three Fiber — customers fold, texture and configure die-cut cartons in real time. React and Material UI on the surface; Supabase and AWS Amplify found behind it.",
    tags: ["React", "Material UI", "React Three Fiber", "Supabase", "AWS Amplify"],
    yearLabel: "2023 — Now",
    caseFile: {
      headline: "The box that folds itself",
      lead: "Flat dielines make sense to structural engineers and almost nobody else. Kestrel 3D Studio puts a live WebGL carton in the browser so customers can place artwork on the flat net and watch the flaps fold shut.",
      year: "2023 — Now",
      figCaption: "Fig. 1 — the platform, mid-configuration. A die-cut box, live in the browser.",
      paragraphsBeforeQuote: [
        "Approve a flat 2D dieline with your logo upside-down on the tuck flap and you only discover the mistake when five hundred boxes arrive on a truck. Kestrel 3D Studio was built to kill that mistake before the press plates are etched.",
        "Built with React Three Fiber and Three.js over a Material UI workspace, the application links a 2D canvas editor directly to a parametric 3D mesh. Drag a logo across the lid panel on the flat net, and the 3D carton updates on the next frame. Pull the fold slider from zero to one hundred percent, and the creases hinge in sequence just as the physical board folds.",
        "Behind the viewport, parametric geometry generators recalculate crease lines and flap tolerances whenever dimensions change, keeping kraft paper and matte laminate shaders true to life under studio lighting.",
      ],
      quote: "“The customer isn’t reading a spec sheet — they’re turning the box over in their hands.”",
      paragraphsAfterQuote: [
        "Saving a configuration serializes the scene state, high-resolution textures, and print coordinates to Supabase and AWS storage, deployed through AWS Amplify. When the customer clicks approve, prepress receives both the 3D proof and the production vector net.",
        "It is the most technically dense exhibit in the Kestrel file — half CAD tool, half web app, running at sixty frames a second in a standard browser tab.",
      ],
      specs: [
        { label: "Front-end", value: "React · Material UI" },
        { label: "3D engine", value: "React Three Fiber · Three.js" },
        { label: "Data & state", value: "Supabase" },
        { label: "Cloud & deploy", value: "AWS Amplify · S3" },
        { label: "Role", value: "Full-stack (Kestrel team)" },
        { label: "Entered", value: "2023 — Now" },
        { label: "Status", value: "In production" },
      ],
      relatedSlugs: ["kestrel-store", "kestrel-quote"],
      ctaLabel: "Inspect the evidence — launch the studio →",
    },
  },
  {
    slug: "monroe-films",
    exhibit: "Exhibit E",
    clientLabel: "Client · monroefilms.com.au",
    recoveredFrom: "monroefilms.com.au",
    domain: "monroefilms.com.au",
    url: "https://monroefilms.com.au",
    title: "Monroe Wedding Films",
    image: "/images/monroe-films.png",
    imageAlt: "Monroe Wedding Films",
    caseImageAlt: "Monroe Wedding Films — editorial photography and cinema site",
    summary:
      "A site for an editorial wedding photography and Super 8 cinema studio, with a custom CMS admin so the directors curate galleries, film reels and date enquiries themselves. The subject worked alone on this one.",
    tags: ["Next.js", "Tailwind", "Supabase", "Custom CMS"],
    yearLabel: "2026",
    caseFile: {
      headline: "The wedding job he worked alone",
      lead: "A Melbourne documentary wedding and Super 8 studio needed a home that treated 35mm stills and motion reels properly — and an admin they could update on Sunday nights without calling a developer.",
      year: "2026",
      figCaption: "Fig. 1 — the studio's front page, galleries in evidence.",
      paragraphsBeforeQuote: [
        "Wedding photographers live and die by how their frames load. Compress them too hard and the grain turns to mud; serve them raw and the page stalls on mobile before the couple reaches the enquiry form. Monroe Wedding Films wanted an editorial layout that respected the work without slowing the browser.",
        "The subject built a Next.js front-end tuned around responsive image pipelines, quiet typography, and zero layout shift, paired with a custom Supabase CMS behind a private login.",
      ],
      quote: "“The site's whole job is to stay out of the pictures' way.”",
      paragraphsAfterQuote: [
        "From the custom dashboard, the studio owners drag-and-drop full wedding stories, reorder Super 8 reels, toggle seasonal availability dates, and read incoming booking enquiries in one place.",
        "No monthly page-builder tax, no bloated plugin stack, and no accomplices on record.",
      ],
      specs: [
        { label: "Front-end", value: "Next.js · Tailwind" },
        { label: "Data & storage", value: "Supabase" },
        { label: "Admin", value: "Custom gallery & enquiry CMS" },
        { label: "Role", value: "Solo" },
        { label: "Entered", value: "2026" },
        { label: "Status", value: "In production" },
      ],
      relatedSlugs: ["atelier-lumiere", "harbour-care"],
      ctaLabel: "Inspect the evidence — visit Monroe Films →",
    },
  },
  {
    slug: "meridian-physio",
    exhibit: "Exhibit F",
    clientLabel: "Client · meridianallied.com.au",
    recoveredFrom: "meridianallied.com.au",
    domain: "meridianallied.com.au",
    url: "https://meridianallied.com.au",
    title: "Meridian Allied Health",
    image: "/images/meridian-physio.png",
    imageAlt: "Meridian Allied Health",
    caseImageAlt: "Meridian Allied Health — clinical services and referral portal",
    summary:
      "A multidisciplinary allied-health and rehabilitation services site — a clear, accessible presence built to connect patients, GPs and support coordinators with the right clinician. No accomplices on record.",
    tags: ["Next.js", "Tailwind", "Supabase"],
    yearLabel: "2026",
    caseFile: {
      headline: "A clear line to the right care",
      lead: "When a patient or support coordinator lands on an allied-health site, they are not looking for fireworks. They are looking for whether the clinic treats their condition, takes their referral, and has an open slot this week.",
      year: "2026",
      figCaption: "Fig. 1 — the services page, plainly stated.",
      paragraphsBeforeQuote: [
        "Healthcare websites have a habit of burying the referral form three menus deep behind stock photography. Meridian Allied Health needed the opposite: plain language, high legibility, and a direct line from condition to clinician.",
        "Working solo, the subject structured the site around the three people who actually use it — patients booking physiotherapy or occupational therapy, GPs sending clinical referrals, and NDIS coordinators checking service coverage.",
      ],
      quote: "“A site that confuses the person who needs it has failed at the only thing it exists to do.”",
      paragraphsAfterQuote: [
        "Built with Next.js, Tailwind CSS, and Supabase handling structured referral submissions and practitioner profiles, the site scores top marks on accessibility and loads instantaneously on patchy mobile connections.",
        "Every discipline, suburb coverage map, and intake pathway is stated in plain English on the first screen.",
      ],
      specs: [
        { label: "Front-end", value: "Next.js · Tailwind" },
        { label: "Backend & forms", value: "Supabase" },
        { label: "Focus", value: "WCAG accessibility · fast intake" },
        { label: "Role", value: "Solo" },
        { label: "Entered", value: "2026" },
        { label: "Status", value: "In production" },
      ],
      relatedSlugs: ["harbour-care", "atelier-lumiere"],
      ctaLabel: "Inspect the evidence — visit Meridian →",
    },
  },
  {
    slug: "harbour-care",
    exhibit: "Exhibit G",
    clientLabel: "Client · harbourcare.com.au",
    recoveredFrom: "harbourcare.com.au",
    domain: "harbourcare.com.au",
    url: "https://harbourcare.com.au",
    title: "Harbour Care",
    image: "/images/harbour-care.png",
    imageAlt: "Harbour Care",
    caseImageAlt: "Harbour Care — NDIS support services & custom CMS",
    summary:
      "An NDIS support-worker and community care site with a configurable CMS admin — the internal team manages support programs, staff profiles and announcements without touching code. Filed as a solo job.",
    tags: ["Next.js", "Tailwind", "Supabase", "Custom CMS"],
    yearLabel: "2026",
    caseFile: {
      headline: "The office that runs without him",
      lead: "An NDIS provider needed a public site participants could trust and an internal dashboard their office staff could update between shifts without waiting on a developer ticket.",
      year: "2026",
      figCaption: "Fig. 1 — the site's front desk, staffed by its own team.",
      paragraphsBeforeQuote: [
        "Support organisations change weekly: new support programs open, coordinator rosters shift, and compliance documents get revised. Hard-coding that into a static site guarantees the information is out of date by next Tuesday.",
        "For Harbour Care, the subject paired a calm, accessible public portal with a tailored Supabase CMS dashboard built specifically around how the office staff actually work.",
      ],
      quote: "“He builds exactly the machinery the client can operate, then hands over the keys.”",
      paragraphsAfterQuote: [
        "Instead of a labyrinthine generic CMS with fifty unused menus, the admin exposes only what matters: service categories, team bios, participant intake enquiries, and site copy blocks — all guarded by Supabase authentication and row-level security.",
        "The subject deployed the build, walked the coordinators through the dashboard in twenty minutes, and hasn't had to touch a content edit since.",
      ],
      specs: [
        { label: "Front-end", value: "Next.js · Tailwind" },
        { label: "Data & auth", value: "Supabase" },
        { label: "Admin", value: "Configurable internal CMS" },
        { label: "Role", value: "Solo" },
        { label: "Entered", value: "2026" },
        { label: "Status", value: "In production" },
      ],
      relatedSlugs: ["meridian-physio", "monroe-films"],
      ctaLabel: "Inspect the evidence — visit Harbour Care →",
    },
  },
];

export interface LabSubstance {
  name: string;
  code: string;
  detected: string;
  finding: string;
  badgeClass: string;
  delay: number;
}

export const LAB_SUBSTANCES: LabSubstance[] = [
  {
    name: "Next.js",
    code: "NEXT",
    detected: "Most days",
    finding: "Primary tool",
    badgeClass: "-rotate-[1.5deg] border-stamp text-stamp",
    delay: 0,
  },
  {
    name: "React / TS",
    code: "RTS",
    detected: "Most days",
    finding: "Primary tool",
    badgeClass: "rotate-[1.2deg] border-stamp text-stamp",
    delay: 40,
  },
  {
    name: "Tailwind CSS",
    code: "TWX",
    detected: "Most days",
    finding: "Primary tool",
    badgeClass: "-rotate-[1deg] border-stamp text-stamp",
    delay: 80,
  },
  {
    name: "Supabase",
    code: "SUPA",
    detected: "In projects",
    finding: "Primary tool",
    badgeClass: "rotate-[1.5deg] border-stamp text-stamp",
    delay: 120,
  },
  {
    name: "PostgreSQL",
    code: "PG",
    detected: "In projects",
    finding: "Comfortable",
    badgeClass: "border-ink/60 text-ink rotate-[1deg]",
    delay: 160,
  },
  {
    name: "MySQL",
    code: "SQL",
    detected: "When needed",
    finding: "Comfortable",
    badgeClass: "border-ink/60 text-ink -rotate-[1deg]",
    delay: 200,
  },
  {
    name: "AWS",
    code: "AWS",
    detected: "Amplify·λ·S3",
    finding: "In training",
    badgeClass: "border-ink/60 text-ink rotate-[1deg]",
    delay: 240,
  },
  {
    name: "Vercel",
    code: "VRCL",
    detected: "Most days",
    finding: "Comfortable",
    badgeClass: "border-ink/60 text-ink -rotate-[1deg]",
    delay: 280,
  },
  {
    name: "Docker",
    code: "DCKR",
    detected: "Learning",
    finding: "Trace amount",
    badgeClass: "border-ink/60 text-ink rotate-[1deg]",
    delay: 320,
  },
  {
    name: "TanStack Start",
    code: "TNK",
    detected: "Learning",
    finding: "Trace amount",
    badgeClass: "border-ink/60 text-ink -rotate-[1deg]",
    delay: 360,
  },
];

export interface CareerEntry {
  period: string;
  role: string;
  org: string;
  notes: string;
  delay: number;
}

export const CAREER_LEDGER: CareerEntry[] = [
  {
    period: "Apr 2026 — Now",
    role: "Founder & Web Developer",
    org: "Studio 47",
    notes:
      "Subject last seen founding a small Melbourne studio to take on more than standard websites — he looks after the web architecture while the team handles fuller application builds for clients.",
    delay: 0,
  },
  {
    period: "2023 — Now",
    role: "Web Developer",
    org: "Kestrel Packaging (Melbourne)",
    notes:
      "Observed daily, building production web applications — the customer storefront, real-time quoting engine and an interactive 3D carton design platform — working across both front-end and back-end.",
    delay: 120,
  },
  {
    period: "2017 — 2023",
    role: "Shift Supervisor",
    org: " Pellegrini's Roastery, Brunswick",
    notes:
      "First recorded appearance. Ran morning shifts on the espresso bar — leading a small crew, keeping service calm when the queue hit the footpath, and learning the trade before the code.",
    delay: 240,
  },
];
