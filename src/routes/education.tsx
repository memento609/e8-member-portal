import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu,
  X,
  Home as HomeIcon,
  GitBranch,
  Calendar as CalendarIcon,
  Video,
  Coins,
  Newspaper,
  Compass,
  Users,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  FileText,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  Search,
  Bell,
  Compass as CompassIcon,
  Lightbulb,
  Link as LinkIcon,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Investor Education — E8 Portal" },
      {
        name: "description",
        content:
          "Learning Labs recordings and New to Angel Investing materials for E8 members.",
      },
      { property: "og:title", content: "Investor Education — E8 Portal" },
      {
        property: "og:description",
        content:
          "Curated video recordings and primers to sharpen your angel investing craft.",
      },
    ],
  }),
  component: EducationPage,
});

const nav: { label: string; icon: typeof HomeIcon; to?: string; active?: boolean }[] = [
  { label: "Home", icon: HomeIcon, to: "/" },
  { label: "Pipeline", icon: GitBranch },
  { label: "Calendar", icon: CalendarIcon },
  { label: "Recordings", icon: Video },
  { label: "E8 Fund", icon: Coins },
  { label: "Portfolio News", icon: Newspaper },
  { label: "Education", icon: GraduationCap, to: "/education", active: true },
  { label: "Member Directory", icon: Users },
  { label: "Explore", icon: Compass },
];

type Item = {
  title: string;
  duration: string;
  kind: "video" | "doc" | "reading";
  done?: boolean;
};

type Section = {
  id: string;
  eyebrow: string;
  title: string;
  meta: string;
  resourcesUrl?: string;
  items: Item[];
};

const learningLabs: Section[] = [
  {
    id: "ll-1",
    eyebrow: "Session 12",
    title: "Reading a SAFE: Caps, Discounts, and MFN",
    meta: "Recorded 18 Mar 2026 · 62 mins",
    resourcesUrl: "#",
    items: [
      { title: "Session intro & framing", duration: "6 mins", kind: "video", done: true },
      { title: "SAFE vs. Convertible Note", duration: "14 mins", kind: "video", done: true },
      { title: "Valuation cap mechanics", duration: "18 mins", kind: "video" },
      { title: "Discount + MFN interplay", duration: "12 mins", kind: "video" },
      { title: "Q&A with the panel", duration: "12 mins", kind: "video" },
    ],
  },
  {
    id: "ll-2",
    eyebrow: "Session 11",
    title: "Diligence Deep-Dive: Climate Hardware",
    meta: "Recorded 04 Feb 2026 · 74 mins",
    resourcesUrl: "#",
    items: [
      { title: "Why hardware is different", duration: "9 mins", kind: "video" },
      { title: "Techno-economic modeling 101", duration: "22 mins", kind: "video" },
      { title: "Manufacturing & scale risk", duration: "16 mins", kind: "video" },
      { title: "Panel discussion", duration: "27 mins", kind: "video" },
    ],
  },
  {
    id: "ll-3",
    eyebrow: "Session 10",
    title: "Term Sheets: Preferred Stock Essentials",
    meta: "Recorded 15 Jan 2026 · 58 mins",
    resourcesUrl: "#",
    items: [
      { title: "Liquidation preferences", duration: "15 mins", kind: "video" },
      { title: "Anti-dilution provisions", duration: "13 mins", kind: "video" },
      { title: "Protective provisions & board", duration: "18 mins", kind: "video" },
      { title: "Worked example: E8 deal", duration: "12 mins", kind: "video" },
    ],
  },
];

const primer: Section[] = [
  {
    id: "p-1",
    eyebrow: "Week 1",
    title: "What Angel Investing Actually Is",
    meta: "Unlocked 11 Feb 2026 · ~90 mins",
    resourcesUrl: "#",
    items: [
      { title: "Orientation", duration: "10 mins", kind: "reading", done: true },
      { title: "Accredited investor rules", duration: "15 mins", kind: "reading", done: true },
      { title: "Where angels fit in the stack", duration: "20 mins", kind: "video" },
      { title: "Portfolio math & the power law", duration: "25 mins", kind: "video" },
      { title: "Your toolkit", duration: "20 mins", kind: "doc" },
    ],
  },
  {
    id: "p-2",
    eyebrow: "Week 2",
    title: "Sourcing & Screening Deals",
    meta: "Unlocked 18 Feb 2026 · ~85 mins",
    resourcesUrl: "#",
    items: [
      { title: "Where deals come from", duration: "15 mins", kind: "video" },
      { title: "First-pass screening rubric", duration: "20 mins", kind: "doc" },
      { title: "Founder red flags", duration: "20 mins", kind: "video" },
      { title: "Practice: score 3 pitches", duration: "30 mins", kind: "reading" },
    ],
  },
  {
    id: "p-3",
    eyebrow: "Week 3",
    title: "Diligence Basics",
    meta: "Unlocked 25 Feb 2026 · ~95 mins",
    resourcesUrl: "#",
    items: [
      { title: "Anatomy of a diligence memo", duration: "18 mins", kind: "doc" },
      { title: "Reference calls that work", duration: "20 mins", kind: "video" },
      { title: "Reading a cap table", duration: "22 mins", kind: "video" },
      { title: "Financial model sanity checks", duration: "35 mins", kind: "reading" },
    ],
  },
  {
    id: "p-4",
    eyebrow: "Week 4",
    title: "Writing the Check & After",
    meta: "Unlocked 04 Mar 2026 · ~80 mins",
    resourcesUrl: "#",
    items: [
      { title: "Closing mechanics", duration: "15 mins", kind: "video" },
      { title: "Tracking your portfolio", duration: "20 mins", kind: "doc" },
      { title: "How to actually help founders", duration: "25 mins", kind: "video" },
      { title: "When things go sideways", duration: "20 mins", kind: "video" },
    ],
  },
];

function kindIcon(kind: Item["kind"]) {
  if (kind === "video") return PlayCircle;
  if (kind === "doc") return FileText;
  return BookOpen;
}

function SectionCard({ section }: { section: Section }) {
  const [open, setOpen] = useState(true);
  const completed = section.items.filter((i) => i.done).length;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 bg-secondary/40 px-5 py-4 text-left transition-colors hover:bg-secondary/60"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
            {completed === section.items.length ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <span className="text-[11px] font-semibold">
                {completed}/{section.items.length}
              </span>
            )}
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {section.eyebrow}
            </div>
            <div className="text-base font-semibold text-foreground">{section.title}</div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>{section.meta}</span>
              {section.resourcesUrl && (
                <a
                  href={section.resourcesUrl}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  Resources <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
        {open ? (
          <ChevronUp className="mt-1 h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="mt-1 h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {open && (
        <ul className="space-y-2 p-4">
          {section.items.map((item) => {
            const Icon = kindIcon(item.kind);
            return (
              <li
                key={item.title}
                className="flex items-center justify-between gap-3 rounded-xl bg-secondary/30 px-4 py-3 transition-colors hover:bg-secondary/60"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">
                      {item.title}
                    </div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {item.kind === "video"
                        ? "Recording"
                        : item.kind === "doc"
                          ? "Worksheet"
                          : "Reading"}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                  {item.done && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  <span>{item.duration}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

type Tab = "primer" | "labs" | "guidance" | "resources";

const guidanceItems = [
  {
    title: "E8 Investment Thesis & Values",
    desc: "How we evaluate deals, what we fund, and what we won't.",
  },
  {
    title: "Member Code of Conduct",
    desc: "Confidentiality, conflicts of interest, and community norms.",
  },
  {
    title: "Diligence Playbook",
    desc: "Step-by-step guide for leading or joining a diligence team.",
  },
  {
    title: "Deal Memo Template",
    desc: "The structure we use for pitch summaries and diligence write-ups.",
  },
  {
    title: "Voting & Follow-on Guidelines",
    desc: "How fund votes work and when we participate in follow-on rounds.",
  },
];

const resourceLinks = [
  {
    title: "Angel Capital Association",
    desc: "National trade association for accredited angel investors.",
    href: "#",
  },
  {
    title: "Holloway Guide to Raising Venture Capital",
    desc: "Founder-side reference that helps you spot fundraising red flags.",
    href: "#",
  },
  {
    title: "SAFE Financing Documents (Y Combinator)",
    desc: "The canonical SAFE templates and post-money primer.",
    href: "#",
  },
  {
    title: "NVCA Model Legal Documents",
    desc: "Industry-standard term sheets and definitive agreements.",
    href: "#",
  },
  {
    title: "Climate Tech VC Newsletter",
    desc: "Weekly market intel on climate deals, funds, and policy.",
    href: "#",
  },
];

function EducationPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("primer");

  const sections = tab === "primer" ? primer : tab === "labs" ? learningLabs : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-sidebar-border bg-sidebar transition-transform lg:static lg:translate-x-0 ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
                  E8
                </div>
                <div className="font-semibold">E8 Portal</div>
              </div>
              <button
                className="rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent lg:hidden"
                onClick={() => setNavOpen(false)}
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-3">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                <span>Search…</span>
              </div>
            </div>

            <nav className="mt-4 flex-1 space-y-0.5 px-3">
              {nav.map((item) => {
                const className = `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`;
                const inner = (
                  <>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </>
                );
                return item.to ? (
                  <Link key={item.label} to={item.to} className={className}>
                    {inner}
                  </Link>
                ) : (
                  <a key={item.label} href="#" className={className}>
                    {inner}
                  </a>
                );
              })}
            </nav>

            <div className="border-t border-sidebar-border p-3">
              <div className="flex items-center gap-3 rounded-lg px-2 py-2">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold">
                  NT
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">Nami Turner</div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    Member since 2022
                  </div>
                </div>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </aside>

        {navOpen && (
          <button
            aria-label="Close navigation overlay"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setNavOpen(false)}
          />
        )}

        <main className="min-h-screen flex-1">
          <header className="flex items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur lg:px-8">
            <button
              className="rounded-md p-2 text-muted-foreground hover:bg-secondary lg:hidden"
              onClick={() => setNavOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Investor Education</h1>
              <p className="text-xs text-muted-foreground">
                Sharpen your craft: recordings from Learning Labs and primers for new angels.
              </p>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
            <div className="mb-6 inline-flex rounded-xl border border-border bg-card p-1">
              <button
                onClick={() => setTab("labs")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  tab === "labs"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Video className="h-4 w-4" />
                Learning Labs
              </button>
              <button
                onClick={() => setTab("primer")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  tab === "primer"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                New to Angel Investing
              </button>
            </div>

            <div className="mb-6 rounded-2xl border border-border bg-card p-5">
              {tab === "labs" ? (
                <>
                  <div className="text-sm font-semibold text-foreground">
                    Learning Labs recordings
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Member-only sessions on term sheets, diligence, sector deep-dives, and more.
                    Expand any session to see its chapters.
                  </p>
                </>
              ) : (
                <>
                  <div className="text-sm font-semibold text-foreground">
                    New to Angel Investing
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A four-week primer for members writing their first checks. Work through the
                    weeks in order or jump to a topic.
                  </p>
                </>
              )}
            </div>

            <div className="space-y-4">
              {sections.map((s) => (
                <SectionCard key={s.id} section={s} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
