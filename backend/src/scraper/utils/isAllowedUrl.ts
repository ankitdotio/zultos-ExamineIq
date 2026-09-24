// src/scraper/utils/isAllowedUrl.ts

import type { SourceConfig } from "../source/source.types.js";

/**
 * Determine whether a URL belongs to one of the domains
 * explicitly allowed by the source configuration.
 */
export const isAllowedUrl = (url: string, source: SourceConfig): boolean => {
  try {
    const parsed = new URL(url);

    /**
     * Only allow HTTP(S).
     */
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return false;
    }

    /**
     * Exact hostname matching.
     *
     * Example:
     *
     * allowed: ssc.gov.in
     *
     * allowed:
     *   ssc.gov.in
     *
     * rejected:
     *   evil-ssc.gov.in
     */
    return source.allowedDomains.some(
      (domain) =>
        parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
};
