// Snapshot of the E8 portal mockup data exposed via MCP tools.
// Keep in sync with src/routes/index.tsx if the mockup data changes.

export const mainStages = [
  { name: "pre-screening", count: 12 },
  { name: "screening", count: 4 },
  { name: "pitch", count: 3 },
  { name: "follow-up", count: 2 },
  { name: "diligence", count: 2 },
  { name: "debrief", count: 1 },
];

export const forkStages = [
  { name: "direct invest", count: 1 },
  { name: "fund vote", count: 1 },
];

export const followOnStages = [
  { name: "diligence", count: 3 },
  { name: "debrief", count: 2 },
  { name: "investment ready", count: 1 },
];

export const decarbonStages: { name: string; count: number | null }[] = [
  { name: "screening committee", count: 6 },
  { name: "sept. presentation", count: 3 },
  { name: "co-invest / donate", count: null },
];

export type DiligenceStatus = "Team forming" | "Ongoing" | "Review";
export const diligenceCompanies: {
  name: string;
  tag?: string;
  status: DiligenceStatus;
  lead?: string;
  team: string;
  blurb: string;
}[] = [
  {
    name: "NALA Membranes",
    status: "Ongoing",
    lead: "Arielle Cohen",
    team: "Arielle Cohen (Lead), Jeff Canin, Kathryn Gardow, Steven Gold, Susan Wall, Paulina A. Echeverria (Fellow)",
    blurb:
      "Commercializing the first new membranes in 40 years to reduce the cost and climate impact of advanced water treatment.",
  },
  {
    name: "PhytoGenesis",
    tag: "DECARBON8",
    status: "Team forming",
    team: "Team forming — sign up in Slack",
    blurb:
      "A scalable biological platform that activates innate plant immunity to deliver season-long disease protection, climate resilience, higher yields, and lower production costs.",
  },
  {
    name: "Raya Power",
    tag: "DECARBON8",
    status: "Team forming",
    team: "Team forming — sign up in Slack",
    blurb:
      "Solar + storage that installs in a backyard in 3 hours with no permits, automatic backup, and scalable bill savings.",
  },
  {
    name: "Root Applied Sciences",
    tag: "DECARBON8",
    status: "Ongoing",
    lead: "Kathryn Gardow",
    team: "Kathryn Gardow (Lead), Jeff Canin, Susan Wall",
    blurb:
      "Gives farmers regular information on airborne pathogens while they're still in the air, before they land on crops.",
  },
  {
    name: "Andros Innovations",
    tag: "DECARBON8",
    status: "Review",
    lead: "Steven Gold",
    team: "Steven Gold (Lead), Arielle Cohen, Paulina A. Echeverria",
    blurb:
      "Chemical-looping ammonia reactor using atmospheric pressure and moderate temperature for lower-cost, distributed ammonia plants.",
  },
  {
    name: "Harmony Desalting",
    tag: "DECARBON8",
    status: "Team forming",
    team: "Team forming — sign up in Slack",
    blurb: "Advanced desalting for superior performance.",
  },
];

export const ticker = [
  { kind: "slack", who: "E8 Slack", text: "First State to halt new Data Centers (via Pitchbook)" },
  { kind: "slack", who: "Jim", text: "Another Sparkfund thought piece (awaiting conversion to revenue)" },
  { kind: "slack", who: "Jim", text: "UbiQD receives a $200K grant from New Mexico" },
  { kind: "news", who: "What's new", text: "April Member Meeting recap — 5 companies to Follow-Up" },
  { kind: "news", who: "What's new", text: "New companies: Aslan Renewables, itselectric, NALA Membranes" },
];

export const portfolioNews = [
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

export const events = [
  { day: "MON, JUL 20", time: "11:00 AM PT", title: "Andros Innovations — Decarbon8 Follow-Up Q&A" },
  { day: "MON, JUL 20", time: "12:00 PM PT", title: "PhytoGenesis — Decarbon8 Follow-Up Q&A" },
  { day: "WED, JUL 22", time: "10:00 AM PT", title: "Verdi — Decarbon8 Follow-Up Meeting" },
  { day: "WED, JUL 22", time: "12:00 PM PT", title: "Raya Power — Decarbon8 Follow-Up Q&A" },
  { day: "THU, JUL 23", time: "11:00 AM PT", title: "Root Applied Sciences — Decarbon8 Follow-Up" },
];
