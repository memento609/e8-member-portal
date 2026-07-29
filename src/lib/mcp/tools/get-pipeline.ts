import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  mainStages,
  forkStages,
  followOnStages,
  decarbonStages,
} from "../portal-data";

export default defineTool({
  name: "get_pipeline",
  title: "Get deal pipeline",
  description:
    "Return counts by stage for the E8 portal deal pipelines: main pipeline (with direct-invest/fund-vote fork), portfolio follow-ons, and the Decarbon8 pipeline.",
  inputSchema: {
    pipeline: z
      .enum(["main", "follow_ons", "decarbon8", "all"])
      .default("all")
      .describe("Which pipeline to return. Defaults to all."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ pipeline }) => {
    const payload: Record<string, unknown> = {};
    if (pipeline === "main" || pipeline === "all") {
      payload.main = { stages: mainStages, fork: forkStages };
    }
    if (pipeline === "follow_ons" || pipeline === "all") {
      payload.follow_ons = { stages: followOnStages };
    }
    if (pipeline === "decarbon8" || pipeline === "all") {
      payload.decarbon8 = { stages: decarbonStages };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
