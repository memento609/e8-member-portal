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
  Search,
  Users,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Bell,
  Sparkles,
  GraduationCap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "E8 Portal — Home" },
      {
        name: "description",
        content:
          "E8 Angels member portal: deal pipeline, fund voting, calendar, and portfolio news for the E8 investing community.",
      },
      { property: "og:title", content: "E8 Portal — Home" },
      {
        property: "og:description",
        content:
          "Deal pipeline, fund voting, and community news for E8 members.",
      },
    ],
  }),
  component: Index,
});

const nav: { label: string; icon: typeof HomeIcon; active?: boolean; to?: string }[] = [
  { label: "Home", icon: HomeIcon, active: true, to: "/" },
  { label: "Pipeline", icon: GitBranch },
  { label: "Calendar", icon: CalendarIcon },
  { label: "Recordings", icon: Video },
  { label: "E8 Fund", icon: Coins },
  { label: "Portfolio News", icon: Newspaper },
  { label: "Education", icon: GraduationCap, to: "/education" },
  { label: "Member Directory", icon: Users },
  { label: "Explore", icon: Compass },
];

const mainStages = [
  { name: "pre-screening", count: 12 },
  { name: "screening", count: 4 },
  { name: "pitch", count: 3 },
  { name: "follow-up", count: 2 },
  { name: "diligence", count: 2 },
  { name: "debrief", count: 1 },
];
const forkStages = [
  { name: "direct invest", count: 1 },
  { name: "fund vote", count: 1 },
];
const followOnStages = [
  { name: "diligence", count: 3 },
  { name: "debrief", count: 2 },
  { name: "investment ready", count: 1 },
];
const decarbonStages = [
  { name: "screening committee", count: 6 },
  { name: "sept. presentation", count: 3 },
  { name: "co-invest / donate", count: null as number | null },
];

type DiligenceStatus = "Team forming" | "Ongoing" | "Review";
const diligenceCompanies: {
  name: string;
  initials: string;
  tag?: string;
  status: DiligenceStatus;
  lead?: string;
  team: string[];
  teamFull: string;
  blurb: string;
}[] = [
  {
    name: "NALA Membranes",
    initials: "NALA",
    status: "Ongoing",
    lead: "Arielle Cohen",
    team: ["AC", "JC", "KG", "SG", "SW", "PA"],
    teamFull: "Arielle Cohen (Lead), Jeff Canin, Kathryn Gardow, Steven Gold, Susan Wall, Paulina A. Echeverria (Fellow)",
    blurb:
      "Commercializing the first new membranes in 40 years to reduce the cost and climate impact of advanced water treatment.",
  },
  {
    name: "PhytoGenesis",
    initials: "PG",
    tag: "DECARBON8",
    status: "Team forming",
    team: [],
    teamFull: "Team forming — sign up in Slack",
    blurb:
      "A scalable biological platform that activates innate plant immunity to deliver season-long disease protection, climate resilience, higher yields, and lower production costs.",
  },
  {
    name: "Raya Power",
    initials: "RP",
    tag: "DECARBON8",
    status: "Team forming",
    team: [],
    teamFull: "Team forming — sign up in Slack",
    blurb:
      "Delivers resilience to the 80% of Americans with no viable path to affordable, resilient energy: a solar + storage system that installs in a backyard in 3 hours, no permits, with automatic backup and scalable bill savings.",
  },
  {
    name: "Root Applied Sciences",
    initials: "RT",
    tag: "DECARBON8",
    status: "Ongoing",
    lead: "Kathryn Gardow",
    team: ["KG", "JC", "SW"],
    teamFull: "Kathryn Gardow (Lead), Jeff Canin, Susan Wall",
    blurb:
      "Provides farmers with regular information on airborne pathogens while they are still in the air, before they land on crops — improving resilience and reducing costs.",
  },
  {
    name: "Andros Innovations",
    initials: "AI",
    tag: "DECARBON8",
    status: "Review",
    lead: "Steven Gold",
    team: ["SG", "AC", "PA"],
    teamFull: "Steven Gold (Lead), Arielle Cohen, Paulina A. Echeverria",
    blurb:
      "Developing a chemical-looping ammonia reactor that uses atmospheric pressure and moderate temperature to enable lower-cost, distributed ammonia plants.",
  },
  {
    name: "Harmony Desalting",
    initials: "HD",
    tag: "DECARBON8",
    status: "Team forming",
    team: [],
    teamFull: "Team forming — sign up in Slack",
    blurb: "Advanced desalting for superior performance.",
  },
];

const ticker = [
  { kind: "slack", who: "E8 Slack", text: "First State to halt new Data Centers (via Pitchbook)" },
  { kind: "slack", who: "Jim", text: "Another Sparkfund thought piece (awaiting conversion to revenue)" },
  { kind: "slack", who: "Jim", text: "UbiQD receives a $200K grant from New Mexico" },
  { kind: "news", who: "What's new", text: "April Member Meeting recap — 5 companies to Follow-Up" },
  { kind: "news", who: "What's new", text: "New companies: Aslan Renewables, itselectric, NALA Membranes" },
];

const portfolioNews = [
  {
    company: "NxLite",
    date: "Jul 19, 2026",
    text: "Closed a $13.1M Series A, above its original target, and added a $3.5M debt facility from RSF Social Finance.",
  },
  {
    company: "UbiQD",
    date: "Jul 19, 2026",
    text: "Received a $200,000 award through New Mexico's Quantum Technologies Award, supporting continued expansion.",
  },
  {
    company: "Solidec",
    date: "Jul 15, 2026",
    text: "Announced partnership with a Fortune 500 chemicals maker for pilot deployment in Q4.",
  },
];

const calendar = [
  { day: "MON, JUL 20", time: "11:00 AM PT", title: "Andros Innovations — Decarbon8 Follow-Up Q&A" },
  { day: "MON, JUL 20", time: "12:00 PM PT", title: "PhytoGenesis — Decarbon8 Follow-Up Q&A", attending: true },
  { day: "WED, JUL 22", time: "10:00 AM PT", title: "Verdi — Decarbon8 Follow-Up Meeting" },
  { day: "WED, JUL 22", time: "12:00 PM PT", title: "Raya Power — Decarbon8 Follow-Up Q&A", attending: true },
  { day: "THU, JUL 23", time: "11:00 AM PT", title: "Root Applied Sciences — Decarbon8 Follow-Up", attending: true },
];

function Index() {
  const [navOpen, setNavOpen] = useState(false);
  const [dilIdx, setDilIdx] = useState(0);
  const dilCount = diligenceCompanies.length;
  const dilCompany = diligenceCompanies[dilIdx];
  const nextDil = () => setDilIdx((i) => (i + 1) % dilCount);
  const prevDil = () => setDilIdx((i) => (i - 1 + dilCount) % dilCount);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border bg-sidebar px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            E8
          </div>
          <span className="font-semibold tracking-tight">E8 Portal</span>
        </div>
        <button
          onClick={() => setNavOpen(true)}
          aria-label="Open navigation"
          className="rounded-md p-2 hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            navOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 pb-4 pt-6">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  E8
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-tight">E8 Angels</div>
                  <div className="text-[11px] text-muted-foreground">Member portal</div>
                </div>
              </div>
              <button
                onClick={() => setNavOpen(false)}
                aria-label="Close navigation"
                className="rounded-md p-1.5 hover:bg-muted md:hidden"
              >
                <X className="h-4 w-4" />
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
                  <div className="truncate text-[11px] text-muted-foreground">nami@nagog.com</div>
                </div>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </aside>

        {navOpen && (
          <button
            aria-label="Close navigation overlay"
            onClick={() => setNavOpen(false)}
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
          />
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Ticker: Slack + What's New */}
          <div className="border-b border-border bg-sidebar/60">
            <div className="mx-auto max-w-[1400px] px-4 py-2.5 md:px-8">
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="flex shrink-0 items-center gap-2 rounded-full bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Live feed
                </div>
                <div className="relative flex-1 overflow-hidden">
                  <div className="flex animate-[ticker_60s_linear_infinite] gap-8 whitespace-nowrap text-sm">
                    {[...ticker, ...ticker].map((t, i) => (
                      <span key={i} className="flex items-center gap-2">
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-full ${
                            t.kind === "slack" ? "bg-accent" : "bg-chart-3"
                          }`}
                        />
                        <span className="font-medium text-foreground">{t.who}</span>
                        <span className="text-muted-foreground">{t.text}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes ticker {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8">
            <header className="mb-6 grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Home
                </div>
                <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                  Good afternoon, Nami.
                </h1>
                <div className="mt-1 hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                  <Sparkles className="h-3.5 w-3.5" />
                  Reworked wireframe
                </div>
              </div>

              {/* Member Profile — top-right corner */}
              <div className="w-full rounded-2xl border border-border bg-card p-4 shadow-sm md:w-[360px]">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-muted text-sm font-semibold">
                    NT
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">Nami Turner</div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      Member since Jun 2026
                    </div>
                  </div>
                  <a
                    href="#"
                    className="shrink-0 rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium hover:bg-muted"
                  >
                    Profile
                  </a>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3 text-xs">
                  <div className="text-muted-foreground">
                    <span className="font-medium text-foreground">0</span> investments
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-1 font-medium text-primary hover:underline"
                  >
                    <Users className="h-3.5 w-3.5" />
                    Member directory
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </header>

            {/* Pipeline HERO */}
            <section className="mb-6 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Main pipeline{" "}
                    <span className="text-muted-foreground font-normal">
                      (Direct + Fund)
                    </span>
                  </h2>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    view full pipeline <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-1">
                  <div className="flex min-w-0 flex-1 gap-3">
                    {mainStages.map((s) => (
                      <StageCard key={s.name} name={s.name} count={s.count} />
                    ))}
                  </div>
                  <div className="mx-1 hidden border-l border-dashed border-border md:block" />
                  <div className="flex shrink-0 flex-col gap-2">
                    {forkStages.map((s) => (
                      <StageCard key={s.name} name={s.name} count={s.count} compact accent />
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-right text-[11px] text-muted-foreground">
                  shared stages — fork at investment
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Portfolio follow-ons{" "}
                    <span className="text-muted-foreground font-normal">
                      (existing companies raising)
                    </span>
                  </h2>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    view full pipeline <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {followOnStages.map((s) => (
                    <StageCard key={s.name} name={s.name} count={s.count} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold tracking-tight">Decarbon8</h2>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    view full pipeline <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {decarbonStages.map((s) => (
                    <StageCard key={s.name} name={s.name} count={s.count} />
                  ))}
                </div>
              </div>
            </section>

            {/* Three-column organization */}
            <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              {/* LEFT — membership */}
              <div className="space-y-5 lg:col-span-3">


                <Card>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">E8 Events</h3>
                    <a href="#" className="text-xs font-medium text-primary hover:underline">
                      View all →
                    </a>
                  </div>
                  <ul className="space-y-3">
                    {calendar.slice(0, 2).map((e, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                            <span>{e.day}</span>
                            <span>{e.time}</span>
                          </div>
                          <div className="mt-0.5 text-sm">{e.title}</div>
                          {e.attending && (
                            <span className="mt-1 inline-block rounded-full bg-accent/30 px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                              Attending
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">Meeting recordings</h3>
                    <a href="#" className="text-xs font-medium text-primary hover:underline">
                      View all →
                    </a>
                  </div>
                  <div className="flex gap-2 border-b border-border pb-2 text-xs">
                    <span className="border-b-2 border-primary pb-1 font-medium">
                      Member Meetings
                    </span>
                    <span className="text-muted-foreground">Learning Labs</span>
                    <span className="text-muted-foreground">Debriefs</span>
                  </div>
                  <div className="mt-3 aspect-video rounded-lg bg-gradient-to-br from-muted to-secondary" />
                  <div className="mt-2 text-sm font-medium">Member Meeting: May 2026</div>
                  <div className="text-xs text-muted-foreground">
                    Ocean Build, Alithic, Without, E-Zn/E-Zinc, Fu…
                  </div>
                </Card>
              </div>

              {/* MIDDLE — investing / fund vote */}
              <div className="space-y-5 lg:col-span-5">
                <Card>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-chart-1" />
                      <h3 className="font-semibold">Diligence</h3>
                      <span className="text-xs text-muted-foreground">
                        {dilIdx + 1} of {dilCount} active
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={prevDil}
                        aria-label="Previous company"
                        className="grid h-7 w-7 place-items-center rounded-md border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextDil}
                        aria-label="Next company"
                        className="grid h-7 w-7 place-items-center rounded-md border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <a href="#" className="ml-1 text-xs font-medium text-primary hover:underline">
                        All →
                      </a>
                    </div>
                  </div>

                  <div className="relative rounded-xl border border-border bg-background p-4">
                    {dilCompany.tag && (
                      <span className="absolute right-3 top-3 text-[10px] font-bold tracking-wide text-muted-foreground">
                        {dilCompany.tag}
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-muted text-[10px] font-bold">
                        {dilCompany.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="font-semibold">{dilCompany.name}</div>
                          <StatusBadge status={dilCompany.status} />
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {dilCompany.blurb}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                          {dilCompany.team.length > 0 ? (
                            <>
                              {dilCompany.team.map((t) => (
                                <Chip key={t}>{t}</Chip>
                              ))}
                              <span className="ml-1">{dilCompany.teamFull}</span>
                            </>
                          ) : (
                            <span className="italic">{dilCompany.teamFull}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    {diligenceCompanies.map((c, i) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setDilIdx(i)}
                        aria-label={`Show ${c.name}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === dilIdx ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/40"
                        }`}
                      />
                    ))}
                  </div>
                </Card>

                <Card>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        E8 Fund 2026
                      </div>
                      <h3 className="mt-0.5 truncate font-semibold">Ocean Build</h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                      ● FINAL
                    </span>
                  </div>

                  <div className="space-y-2">
                    <VoteBar label="No" pct={50} color="bg-muted-foreground" val="50%" />
                    <VoteBar label="$125K" pct={29} color="bg-chart-1" val="29%" />
                    <VoteBar label="$175K" pct={6} color="bg-chart-4" val="6%" />
                    <VoteBar label="$225K" pct={16} color="bg-chart-5" val="16%" />
                  </div>

                  <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                    Thresholds: 67% to approve, 51% for funding level
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Final turnout
                      </div>
                      <div className="mt-0.5 text-sm">
                        <span className="font-semibold">58%</span> of voting units{" "}
                        <span className="text-muted-foreground">· Quorum met</span>
                      </div>
                    </div>
                    <span className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive">
                      Did not pass · 50%
                    </span>
                  </div>
                </Card>
              </div>

              {/* RIGHT — market/portfolio news */}
              <div className="space-y-5 lg:col-span-4">
                <Card>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-semibold">Portfolio News</span>
                      <span className="text-muted-foreground">|</span>
                      <span className="text-muted-foreground">Asks</span>
                    </div>
                    <a href="#" className="text-xs font-medium text-primary hover:underline">
                      View all →
                    </a>
                  </div>
                  <ul className="space-y-4">
                    {portfolioNews.map((n) => (
                      <li key={n.company} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="grid h-6 w-6 place-items-center rounded bg-muted text-[9px] font-bold">
                              {n.company.slice(0, 3).toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold">{n.company}</span>
                          </div>
                          <span className="text-[11px] text-muted-foreground">{n.date}</span>
                        </div>
                        <p className="mt-1.5 text-sm text-muted-foreground">{n.text}</p>
                        <a href="#" className="mt-1.5 inline-block text-xs font-medium text-primary hover:underline">
                          Show more
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">Market pulse</h3>
                    <span className="text-[11px] text-muted-foreground">This week</span>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-1" />
                      <div>
                        <div className="font-medium">Climate tech Q2 funding up 12% QoQ</div>
                        <div className="text-xs text-muted-foreground">Pitchbook · 2d</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-3" />
                      <div>
                        <div className="font-medium">DOE Loan Programs Office new guidance</div>
                        <div className="text-xs text-muted-foreground">Axios · 3d</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-4" />
                      <div>
                        <div className="font-medium">Grid-scale storage deployments hit record</div>
                        <div className="text-xs text-muted-foreground">CTVC · 5d</div>
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      {children}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-muted text-[9px] font-bold text-foreground">
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: DiligenceStatus }) {
  const styles: Record<DiligenceStatus, string> = {
    "Team forming": "border-chart-4/40 bg-chart-4/10 text-chart-4",
    Ongoing: "border-chart-1/40 bg-chart-1/10 text-chart-1",
    Review: "border-chart-5/40 bg-chart-5/15 text-chart-5",
  };
  const dot: Record<DiligenceStatus, string> = {
    "Team forming": "bg-chart-4",
    Ongoing: "bg-chart-1 animate-pulse",
    Review: "bg-chart-5",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
}


function StageCard({
  name,
  count,
  compact,
  accent,
}: {
  name: string;
  count: number | null;
  compact?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex min-w-[88px] flex-1 flex-col justify-between rounded-lg border border-border bg-background ${
        compact ? "px-2.5 py-1.5" : "px-3 py-2"
      } ${accent ? "ring-1 ring-accent/40" : ""}`}
    >
      <div className="text-[11px] font-medium leading-tight text-muted-foreground">{name}</div>
      <div className="mt-0.5 text-lg font-semibold leading-tight tracking-tight">
        {count === null ? "—" : count}
      </div>
    </div>
  );
}

function VoteBar({
  label,
  pct,
  color,
  val,
}: {
  label: string;
  pct: number;
  color: string;
  val: string;
}) {
  return (
    <div className="grid grid-cols-[70px_minmax(0,1fr)_50px] items-center gap-3 text-sm">
      <span className="truncate text-muted-foreground">{label}</span>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-right font-medium">{val}</span>
    </div>
  );
}
