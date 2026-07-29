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

type Lab = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  topic: string;
};

const learningLabs: Lab[] = [
  {
    id: "ll-12",
    title: "Reading a SAFE: Caps, Discounts, and MFN",
    speaker: "Priya Ramaswamy",
    date: "18 Mar 2026",
    duration: "62 mins",
    topic: "Deal structure",
  },
  {
    id: "ll-11",
    title: "Diligence Deep-Dive: Climate Hardware",
    speaker: "Marcus Chen",
    date: "04 Feb 2026",
    duration: "74 mins",
    topic: "Diligence",
  },
  {
    id: "ll-10",
    title: "Term Sheets: Preferred Stock Essentials",
    speaker: "Elena Vasquez",
    date: "15 Jan 2026",
    duration: "58 mins",
    topic: "Deal structure",
  },
  {
    id: "ll-9",
    title: "Pricing Rounds Without a Lead",
    speaker: "David Okafor",
    date: "10 Dec 2025",
    duration: "49 mins",
    topic: "Deal structure",
  },
  {
    id: "ll-8",
    title: "Founder Reference Calls That Actually Work",
    speaker: "Sarah Kim",
    date: "13 Nov 2025",
    duration: "44 mins",
    topic: "Diligence",
  },
  {
    id: "ll-7",
    title: "Portfolio Construction for Small Checks",
    speaker: "Jordan Blake",
    date: "16 Oct 2025",
    duration: "55 mins",
    topic: "Strategy",
  },
  {
    id: "ll-6",
    title: "Sector Spotlight: Grid-Scale Storage",
    speaker: "Dr. Ana Rivera",
    date: "18 Sep 2025",
    duration: "67 mins",
    topic: "Sector",
  },
  {
    id: "ll-5",
    title: "Tax & Legal Basics for Angels (QSBS)",
    speaker: "Thomas Weller",
    date: "21 Aug 2025",
    duration: "51 mins",
    topic: "Legal",
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

type LabSort = "newest" | "oldest" | "shortest" | "longest";

function parseLabDate(d: string) {
  return new Date(d).getTime();
}
function parseDurationMins(d: string) {
  const m = d.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

function EducationPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("primer");
  const [labSort, setLabSort] = useState<LabSort>("newest");

  const sections = tab === "primer" ? primer : [];

  const sortedLabs = [...learningLabs].sort((a, b) => {
    switch (labSort) {
      case "newest":
        return parseLabDate(b.date) - parseLabDate(a.date);
      case "oldest":
        return parseLabDate(a.date) - parseLabDate(b.date);
      case "shortest":
        return parseDurationMins(a.duration) - parseDurationMins(b.duration);
      case "longest":
        return parseDurationMins(b.duration) - parseDurationMins(a.duration);
    }
  });

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
            <div className="mb-6 inline-flex flex-wrap rounded-xl border border-border bg-card p-1">
              {(
                [
                  { id: "primer", label: "New to Angel Investing", icon: GraduationCap },
                  { id: "labs", label: "Learning Labs", icon: Video },
                  { id: "guidance", label: "Guidance", icon: Lightbulb },
                  { id: "resources", label: "Other Resources", icon: CompassIcon },
                ] as { id: Tab; label: string; icon: typeof Video }[]
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    tab === t.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mb-6 rounded-2xl border border-border bg-card p-5">
              {tab === "primer" && (
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
              {tab === "labs" && (
                <>
                  <div className="text-sm font-semibold text-foreground">
                    Learning Labs recordings
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Member-only sessions on term sheets, diligence, sector deep-dives, and more.
                    Expand any session to see its chapters.
                  </p>
                </>
              )}
              {tab === "guidance" && (
                <>
                  <div className="text-sm font-semibold text-foreground">
                    E8 guidance & playbooks
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Internal frameworks, policies, and templates that define how E8 operates.
                  </p>
                </>
              )}
              {tab === "resources" && (
                <>
                  <div className="text-sm font-semibold text-foreground">Other resources</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    External reading, tools, and communities we recommend for angel investors.
                  </p>
                </>
              )}
            </div>

            {tab === "primer" && (
              <div className="space-y-4">
                {sections.map((s) => (
                  <SectionCard key={s.id} section={s} />
                ))}
              </div>
            )}

            {tab === "labs" && (
              <>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-muted-foreground">
                    {sortedLabs.length} recordings
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="lab-sort"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Sort by
                    </label>
                    <select
                      id="lab-sort"
                      value={labSort}
                      onChange={(e) => setLabSort(e.target.value as LabSort)}
                      className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="newest">Newest first</option>
                      <option value="oldest">Oldest first</option>
                      <option value="shortest">Shortest first</option>
                      <option value="longest">Longest first</option>
                    </select>
                  </div>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sortedLabs.map((lab) => (
                    <li
                      key={lab.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
                    >
                      <div className="relative aspect-video bg-gradient-to-br from-primary/25 via-primary/10 to-secondary">
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="grid h-12 w-12 place-items-center rounded-full bg-background/90 text-primary shadow-md transition-transform group-hover:scale-110">
                            <PlayCircle className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white">
                          {lab.duration}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                          {lab.topic}
                        </div>
                        <div className="mt-1 text-sm font-semibold leading-snug text-foreground">
                          {lab.title}
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">{lab.speaker}</div>
                        <div className="mt-auto pt-3 text-[11px] text-muted-foreground">
                          Recorded {lab.date}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {tab === "guidance" && (
              <ul className="space-y-3">
                {guidanceItems.map((g) => (
                  <li
                    key={g.title}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:bg-secondary/40"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground">{g.title}</div>
                        <div className="text-xs text-muted-foreground">{g.desc}</div>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Open
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {tab === "resources" && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {resourceLinks.map((r) => (
                  <li
                    key={r.title}
                    className="rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-secondary/40"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                        <LinkIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground">{r.title}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{r.desc}</div>
                        <a
                          href={r.href}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                          Visit <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
