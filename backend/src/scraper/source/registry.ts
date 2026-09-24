import { SourceConfig } from "./source.types.js";

/**
 * SSC official source configuration.
 *
 * The crawler uses this configuration to determine:
 * - where to start
 * - which domains are allowed
 * - how aggressively to crawl
 */
export const sscSource: SourceConfig = {
  id: "ssc",
  name: "Staff Selection Commission",
  authority: "SSC",
  category: "government-exams",

  baseUrl: "https://ssc.gov.in",

  allowedDomains: ["ssc.gov.in"],

  seedUrls: ["https://ssc.gov.in"],

  enabled: true,
  fetchStrategy: "PLAYWRIGHT",

  crawl: {
    maxDepth: 3,
    maxDocumentsPerRun: 100,
    delayMs: 1500,
  },
};
