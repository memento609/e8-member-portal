import { defineMcp } from "@lovable.dev/mcp-js";
import getPipeline from "./tools/get-pipeline";
import listDiligence from "./tools/list-diligence";
import listEvents from "./tools/list-events";
import listPortfolioNews from "./tools/list-portfolio-news";

export default defineMcp({
  name: "e8-portal-mcp",
  title: "E8 Portal MCP",
  version: "0.1.0",
  instructions:
    "Read-only access to the E8 angel-investing portal mockup: deal pipelines (main, follow-ons, Decarbon8), diligence companies with team/status, upcoming events, and portfolio news / ticker items. All data is public demo content.",
  tools: [getPipeline, listDiligence, listEvents, listPortfolioNews],
});
