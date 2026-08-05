/**
 * Server-only fetch + parse layer for the Investor Education curriculum.
 *
 * Content lives in an external Google Sheet with two tabs: `Modules` and
 * `Media_Items`. Nothing here is hardcoded content — swapping the source later
 * (Notion, a CMS export, a database) only requires replacing `fetchTab()`.
 */

export type CurriculumModule = {
  moduleId: string;
  section: string;
  moduleNumber: string;
  title: string;
  summary: string;
  guidingQuestions: string[];
  order: number;
};

export type MediaItem = {
  mediaId: string;
  moduleId: string;
  title: string;
  type: string;
  sourcePublisher: string;
  length: string;
  requirement: "Required" | "Supplementary";
  url: string;
  isExternal: boolean;
  lastVerified: string;
  order: number;
  notes: string;
};

export type Curriculum = {
  modules: CurriculumModule[];
  mediaItems: MediaItem[];
  fetchedAt: string;
};

const SHEET_ID = "1Kww2UuJSl8MnPoLzhCOAfSEwcyNKjSgMDSUwelITZa4";

function tabUrl(tab: string) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
}

/** Minimal RFC-4180 CSV parser (handles quoted fields, escaped quotes, newlines). */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }
    if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function toRecords(csv: string): Record<string, string>[] {
  const rows = parseCsv(csv);
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const rec: Record<string, string> = {};
    headers.forEach((h, i) => {
      rec[h] = (r[i] ?? "").trim();
    });
    return rec;
  });
}

async function fetchTab(tab: string): Promise<Record<string, string>[]> {
  const res = await fetch(tabUrl(tab), { headers: { Accept: "text/csv" } });
  if (!res.ok) {
    throw new Error(`Failed to load "${tab}" from the content sheet [${res.status}]`);
  }
  return toRecords(await res.text());
}

function num(value: string, fallback: number) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

export async function loadCurriculum(): Promise<Curriculum> {
  const [moduleRows, mediaRows] = await Promise.all([
    fetchTab("Modules"),
    fetchTab("Media_Items"),
  ]);

  const modules: CurriculumModule[] = moduleRows
    .filter((r) => r["Module_ID"])
    .map((r, i) => ({
      moduleId: r["Module_ID"],
      section: r["Section"] ?? "",
      moduleNumber: r["Module_Number"] ?? "",
      title: r["Module_Title"] ?? "",
      summary: r["Summary"] ?? "",
      guidingQuestions: (r["Guiding_Questions"] ?? "")
        .split("|")
        .map((q) => q.trim())
        .filter(Boolean),
      order: num(r["Order"], (i + 1) * 10),
    }))
    .sort((a, b) => a.order - b.order);

  const mediaItems: MediaItem[] = mediaRows
    .filter((r) => r["Media_ID"])
    .map((r, i) => ({
      mediaId: r["Media_ID"],
      moduleId: r["Module_ID"] ?? "",
      title: r["Item_Title"] ?? "",
      type: r["Type"] ?? "",
      sourcePublisher: r["Source_Publisher"] ?? "",
      length: r["Length"] ?? "",
      requirement: (
        (r["Required_or_Supplementary"] ?? "").toLowerCase().startsWith("supp")
          ? "Supplementary"
          : "Required"
      ) as MediaItem["requirement"],

      url: r["URL"] ?? "",
      isExternal: (r["Internal_or_External"] ?? "").toLowerCase() === "external",
      lastVerified: r["Last_Verified"] ?? "",
      order: num(r["Order"], (i + 1) * 10),
      notes: r["Notes"] ?? "",
    }))
    .sort((a, b) => a.order - b.order);

  return { modules, mediaItems, fetchedAt: new Date().toISOString() };
}
