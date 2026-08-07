import { useState } from "react";
import { ArrowRight, Plus, RefreshCw, Leaf } from "lucide-react";

// Combined view: one set of stages, three deal types per stage.
type DealType = "new" | "follow" | "d8";
type Counts = Partial<Record<DealType, number | null>>;

const dealStyles: Record<
  DealType,
  { label: string; badge: string; chip: string; bar: string; text: string }
> = {
  new: {
    label: "New",
    badge: "bg-primary text-primary-foreground",
    chip: "bg-primary/10 text-primary",
    bar: "bg-primary",
    text: "text-primary",
  },
  follow: {
    label: "Follow-on",
    badge: "border border-accent bg-accent/20 text-accent-foreground",
    chip: "bg-accent/25 text-accent-foreground",
    bar: "bg-accent",
    text: "text-accent-foreground",
  },
  d8: {
    label: "Decarbon8",
    badge: "border border-chart-3 bg-chart-3/15 text-chart-3",
    chip: "bg-chart-3/15 text-chart-3",
    bar: "bg-chart-3",
    text: "text-chart-3",
  },
};

const combinedStages: { name: string; counts: Counts }[] = [
  { name: "screening", counts: { new: 4, d8: 6 } },
  { name: "pitch", counts: { new: 3 } },
  { name: "follow-up", counts: { new: 2 } },
  { name: "diligence", counts: { new: 2, follow: 3 } },
  { name: "debrief", counts: { new: 1, follow: 2, d8: 3 } },
];
const combinedForkStages: { name: string; counts: Counts }[] = [
  { name: "direct invest", counts: { new: 1 } },
  { name: "fund vote", counts: { new: 1 } },
  { name: "investment ready", counts: { follow: 1, d8: null } },
];

export function PipelineSection() {
  const [view, setView] = useState<1 | 2>(1);
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-sm md:p-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-tight">
          Deal pipeline{" "}
          <span className="font-normal text-muted-foreground">(all programs)</span>
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-md border border-border p-0.5">
            {([1, 2] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                  view === v
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                Option {v}
              </button>
            ))}
          </div>
          {view === 1 && (
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              {(["new", "follow", "d8"] as DealType[]).map((t) => (
                <span key={t} className="flex items-center gap-1">
                  <span
                    className={`grid h-3.5 w-3.5 place-items-center rounded-[4px] ${dealStyles[t].badge}`}
                  >
                    {dealTypeIcon(t, "h-2.5 w-2.5")}
                  </span>
                  {dealStyles[t].label}
                </span>
              ))}
            </div>
          )}
          <a
            href="#"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            view full pipeline <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      {view === 1 ? <PipelineStacked /> : <PipelineLanes />}
    </div>
  );
}

function PipelineStacked() {
  return (
    <>
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {combinedStages.map((s) => (
            <SplitStageCard key={s.name} name={s.name} counts={s.counts} />
          ))}
        </div>
        <div className="mx-0.5 hidden border-l border-dashed border-border lg:block" />
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3 lg:flex lg:shrink-0 lg:flex-col">
          {combinedForkStages.map((s) => (
            <div
              key={s.name}
              className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 lg:min-w-[150px]"
            >
              <span className="text-[11px] font-medium leading-tight text-muted-foreground">
                {s.name}
              </span>
              <span className="flex items-center gap-1">
                {(Object.keys(s.counts) as DealType[]).map((t) => (
                  <CountChip key={t} type={t} value={s.counts[t]} />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 text-right text-[10px] text-muted-foreground">
        shared stages — fork at investment
      </div>
    </>
  );
}

// Option 2 — true swimlanes: one row (lane) per program across shared stage columns.
function PipelineLanes() {
  const cols = [...combinedStages, ...combinedForkStages];
  const lanes: { type: DealType; note: string }[] = [
    { type: "new", note: "direct + fund" },
    { type: "follow", note: "portfolio" },
    { type: "d8", note: "cohort" },
  ];
  const stageMax = Math.max(
    1,
    ...cols.flatMap((c) => (Object.values(c.counts) as (number | null | undefined)[]).map((v) => v ?? 0)),
  );

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px]">
        {/* stage headers */}
        <div className="grid grid-cols-[132px_repeat(8,minmax(0,1fr))] gap-1.5">
          <div />
          {cols.map((c, i) => (
            <div
              key={c.name}
              className={`px-1 pb-1 text-center text-[10px] font-semibold uppercase tracking-wide ${
                i >= combinedStages.length ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {c.name}
            </div>
          ))}
        </div>

        {lanes.map((lane) => {
          const s = dealStyles[lane.type];
          return (
            <div
              key={lane.type}
              className="mb-1.5 grid grid-cols-[132px_repeat(8,minmax(0,1fr))] items-stretch gap-1.5 rounded-lg border border-border bg-background p-1.5 last:mb-0"
            >
              <div className="flex items-center gap-1.5 pl-1">
                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md ${s.badge}`}>
                  {dealTypeIcon(lane.type, "h-3 w-3")}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-semibold leading-tight">
                    {s.label}
                  </span>
                  <span className="block truncate text-[9px] text-muted-foreground">
                    {lane.note}
                  </span>
                </span>
              </div>
              {cols.map((c) => {
                const has = lane.type in c.counts;
                const v = c.counts[lane.type];
                if (!has) {
                  return (
                    <div
                      key={c.name}
                      className="grid min-h-[34px] place-items-center rounded-md border border-dashed border-border/60 text-[10px] text-muted-foreground/40"
                    >
                      ·
                    </div>
                  );
                }
                const n = v ?? 0;
                return (
                  <div
                    key={c.name}
                    className={`relative grid min-h-[34px] place-items-center overflow-hidden rounded-md ${s.chip}`}
                    title={`${s.label} — ${c.name}: ${v ?? "—"}`}
                  >
                    <span
                      className={`absolute inset-x-0 bottom-0 ${s.bar} opacity-30`}
                      style={{ height: `${(n / stageMax) * 100}%` }}
                    />
                    <span className="relative text-sm font-bold leading-none">
                      {v === null || v === undefined ? "—" : v}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}

        <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>each row is a program lane — shaded fill scales with deal count</span>
          <span className="text-primary">last three columns = outcomes</span>
        </div>
      </div>
    </div>
  );
}

function dealTypeIcon(type: DealType, cls: string) {
  if (type === "new") return <Plus className={cls} />;
  if (type === "follow") return <RefreshCw className={cls} />;
  return <Leaf className={cls} />;
}

function CountChip({ type, value }: { type: DealType; value: number | null | undefined }) {
  const s = dealStyles[type];
  return (
    <span
      className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-sm font-semibold leading-none ${s.chip}`}
      title={s.label}
    >
      {dealTypeIcon(type, "h-3 w-3")}
      {value === null || value === undefined ? "—" : value}
    </span>
  );
}

function SplitStageCard({ name, counts }: { name: string; counts: Counts }) {
  const types = (Object.keys(counts) as DealType[]).filter((t) => counts[t] !== undefined);
  const total = types.reduce((sum, t) => sum + (counts[t] ?? 0), 0);
  return (
    <div className="flex min-w-0 flex-col rounded-lg border border-border bg-background px-2.5 py-2">
      <div className="text-[11px] font-medium leading-tight text-muted-foreground">{name}</div>
      <div className="mt-1 flex flex-wrap items-center gap-1">
        {types.map((t) => (
          <CountChip key={t} type={t} value={counts[t]} />
        ))}
      </div>
      <div className="mt-1.5 flex h-1 gap-px overflow-hidden rounded-full bg-muted">
        {total > 0 &&
          types.map((t) => (
            <div
              key={t}
              className={`h-full ${dealStyles[t].bar}`}
              style={{ width: `${((counts[t] ?? 0) / total) * 100}%` }}
            />
          ))}
      </div>
    </div>
  );
}
