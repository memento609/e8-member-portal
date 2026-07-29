import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { portfolioNews, ticker } from "../portal-data";

export default defineTool({
  name: "list_portfolio_news",
  title: "List portfolio news",
  description:
    "Return recent news items about E8 portfolio companies, plus the top-of-portal ticker items (Slack highlights and 'what's new' announcements).",
  inputSchema: {
    include_ticker: z
      .boolean()
      .default(true)
      .describe("If true, also include the top-of-portal ticker items."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ include_ticker }) => {
    const payload: Record<string, unknown> = { news: portfolioNews };
    if (include_ticker) payload.ticker = ticker;
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
