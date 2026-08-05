import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
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
  Search,
  Bell,
  Compass as CompassIcon,
  Lightbulb,
  Clock,
  HelpCircle,
  PencilRuler,
} from "lucide-react";
import { getCurriculum } from "@/lib/education/curriculum.functions";
import type { CurriculumModule, MediaItem } from "@/lib/education/curriculum.server";

const curriculumQuery = queryOptions({
  queryKey: ["curriculum"],
  queryFn: () => getCurriculum(),
  staleTime: 5 * 60_000,
});

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Investor Education — E8 Portal" },
      {
        name: "description",
        content:
          "New to Angel Investing modules, Learning Labs recordings, and guidance for E8 members.",
      },
      { property: "og:title", content: "Investor Education — E8 Portal" },
      {
        property: "og:description",
        content:
          "Curated modules, readings, and recordings to sharpen your angel investing craft.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(curriculumQuery),
  component: EducationPage,
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-lg font-semibold">Education content didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  notFoundComponent: () => <div className="p-8">No education content found.</div>,
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

type Tab = "primer" | "labs" | "guidance" | "resources";
type LabSort = "newest" | "oldest" | "shortest" | "longest";

function parseLabDate(d: string) {
  return new Date(d).getTime();
}
function parseDurationMins(d: string) {
  const m = d.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

function typeIcon(type: string) {
  const t = type.toLowerCase();
  if (t.includes("video")) return PlayCircle;
  if (t.includes("worksheet")) return PencilRuler;
  if (t.includes("doc")) return FileText;
  return BookOpen;
}

function youTubeId(url: string): string | null {
  const watch = url.match(/[?&]v=([\w-]{6,})/);
  if (watch) return watch[1];
  const short = url.match(/youtu\.be\/([\w-]{6,})/);
  if (short) return short[1];
  const embed = url.match(/youtube\.com\/embed\/([\w-]{6,})/);
  if (embed) return embed[1];
  return null;
}

function MediaCard({ item }: { item: MediaItem }) {
  const [playing, setPlaying] = useState(false);
  const Icon = typeIcon(item.type);
  const ytId = item.url ? youTubeId(item.url) : null;
  const unavailable = !item.url;

  return (
    <li className="rounded-xl border border-border bg-secondary/25 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold leading-snug text-foreground">
              {item.title}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
              {item.type && (
                <span className="rounded-md bg-primary/10 px-1.5 py-0.5 font-semibold uppercase tracking-wide text-primary">
                  {item.type}
                </span>
              )}
              {item.sourcePublisher && <span>{item.sourcePublisher}</span>}
              {item.length && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.length}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0 text-xs">
          {unavailable ? (
            <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
              Coming soon
            </span>
          ) : ytId ? (
            <button
              onClick={() => setPlaying((v) => !v)}
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              {playing ? "Hide" : "Watch"} <PlayCircle className="h-3.5 w-3.5" />
            </button>
          ) : item.isExternal ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              External <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <a
              href={item.url}
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              Open
            </a>
          )}
        </div>
      </div>

      {ytId && playing && (
        <div className="mt-3 aspect-video w-full overflow-hidden rounded-lg border border-border">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${ytId}`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </li>
  );
}

function ModuleCard({ module, items }: { module: CurriculumModule; items: MediaItem[] }) {
  const [open, setOpen] = useState(true);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [suppOpen, setSuppOpen] = useState(false);

  const required = items.filter((i) => i.requirement === "Required");
  const supplementary = items.filter((i) => i.requirement === "Supplementary");

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 bg-secondary/40 px-5 py-4 text-left transition-colors hover:bg-secondary/60"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
            {module.moduleNumber}
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Module {module.moduleNumber}
            </div>
            <div className="text-base font-semibold text-foreground">{module.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {required.length} {required.length === 1 ? "lesson" : "lessons"}
              {supplementary.length > 0 && ` · ${supplementary.length} extra`}
            </div>
          </div>
        </div>
        {open ? (
          <ChevronUp className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="space-y-4 p-5">
          {module.summary && (
            <p className="text-sm leading-relaxed text-muted-foreground">{module.summary}</p>
          )}

          {module.guidingQuestions.length > 0 && (
            <div className="rounded-xl border border-border bg-secondary/25">
              <button
                onClick={() => setQuestionsOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-primary">
                    <Lightbulb className="h-3.5 w-3.5" />
                  </span>
                  Guiding questions ({module.guidingQuestions.length})
                </span>
                {questionsOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {questionsOpen && (
                <ul className="list-disc space-y-1.5 px-9 pb-4 text-sm text-muted-foreground">
                  {module.guidingQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {required.length > 0 && (
            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Required
              </div>
              <ul className="space-y-2">
                {required.map((i) => (
                  <MediaCard key={i.mediaId} item={i} />
                ))}
              </ul>
            </div>
          )}

          {supplementary.length > 0 && (
            <div>
              <button
                onClick={() => setSuppOpen((v) => !v)}
                className="mb-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground"
              >
                Supplementary ({supplementary.length})
                {suppOpen ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
              {suppOpen && (
                <ul className="space-y-2">
                  {supplementary.map((i) => (
                    <MediaCard key={i.mediaId} item={i} />
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
      <div className="text-sm font-semibold text-foreground">{label} — coming soon</div>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Content for this section is being assembled. It will appear here as soon as the content
        team adds it to the education sheet.
      </p>
    </div>
  );
}

function EducationPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("primer");
  const [labSort, setLabSort] = useState<LabSort>("newest");
  const { data } = useSuspenseQuery(curriculumQuery);

  const primerModules = data.modules.filter(
    (m) => m.section.toLowerCase() === "new to angel investing",
  );

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
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-bold text-primary-foreground">
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
                Modules, readings, and recordings for E8 members.
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

            {tab === "primer" && (
              <>
                <div className="mb-6 rounded-2xl border border-border bg-card p-5">
                  <div className="text-sm font-semibold text-foreground">
                    New to Angel Investing
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {primerModules.length} modules covering the fundamentals. Everything is open —
                    work through them in order or jump to what you need.
                  </p>
                </div>
                <div className="space-y-4">
                  {primerModules.map((m) => (
                    <ModuleCard
                      key={m.moduleId}
                      module={m}
                      items={data.mediaItems.filter((i) => i.moduleId === m.moduleId)}
                    />
                  ))}
                  {primerModules.length === 0 && <ComingSoon label="New to Angel Investing" />}
                </div>
              </>
            )}

            {tab === "labs" && (
              <>
                <div className="mb-6 rounded-2xl border border-border bg-card p-5">
                  <div className="text-sm font-semibold text-foreground">
                    Learning Labs recordings
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Member-only sessions on term sheets, diligence, sector deep-dives, and more.
                  </p>
                </div>
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

            {tab === "guidance" && <ComingSoon label="Guidance" />}
            {tab === "resources" && <ComingSoon label="Other Resources" />}

            <p className="mt-10 border-t border-border pt-4 text-xs text-muted-foreground">
              E8 links to external sources for educational content; we don't host or claim rights
              to third-party material.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
