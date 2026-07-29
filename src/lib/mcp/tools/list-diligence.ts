import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { diligenceCompanies } from "../portal-data";

export default defineTool({
  name: "list_diligence",
  title: "List diligence companies",
  description:
    "List companies currently under diligence at E8, including team, lead, blurb, status (Team forming / Ongoing / Review), and Decarbon8 tag when applicable.",
  inputSchema: {
    status: z
      .enum(["Team forming", "Ongoing", "Review", "any"])
      .default("any")
      .describe("Filter by diligence status. Use 'any' for all companies."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ status }) => {
    const rows =
      status === "any"
        ? diligenceCompanies
        : diligenceCompanies.filter((c) => c.status === status);
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { companies: rows },
    };
  },
});
