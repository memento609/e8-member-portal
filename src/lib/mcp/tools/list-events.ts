import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { events } from "../portal-data";

export default defineTool({
  name: "list_events",
  title: "List E8 events",
  description: "List upcoming E8 member events (pitches, follow-up Q&As, meetings).",
  inputSchema: {
    limit: z
      .number()
      .int()
      .default(10)
      .describe("Maximum number of events to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ limit }) => {
    const clamped = Math.max(1, Math.min(limit, events.length));
    const rows = events.slice(0, clamped);
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { events: rows },
    };
  },
});
