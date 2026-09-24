export interface SourceConfig {
  id: string;
  name: string;
  authority: string;
  category: string;

  baseUrl: string;

  allowedDomains: string[];

  seedUrls: string[];

  enabled: boolean;

  fetchStrategy: "HTTP" | "PLAYWRIGHT";

  crawl: {
    maxDepth: number;
    maxDocumentsPerRun: number;
    delayMs: number;
  };
}
