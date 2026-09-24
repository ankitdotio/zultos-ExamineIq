// src/scraper/discovery/findPdfCandidates.ts

import type { DiscoveredLink } from "./discoverLinks.js";

/**
 * Words that commonly appear around official exam notifications.
 *
 * This is deliberately deterministic.
 *
 * We don't need AI just to determine whether a link looks like
 * an exam notification.
 */
const NOTIFICATION_KEYWORDS = [
  "notification",
  "notice",
  "advertisement",
  "recruitment",
  "exam",
];

// const INCLUDE_KEYWORDS = [
//   "notification",
//   "advertisement",
//   "notice",
//   "recruitment",
//   "application",
//   "examination",
//   "calendar",
// ];

// const EXCLUDE_KEYWORDS = [
//   "debarred",
//   "tender",
//   "quotation",
//   "procurement",
//   "vendor",
//   "contract",
// ];

/**
 * Check whether a URL looks like a PDF.
 */
const isPdfUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);

    return parsed.pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return false;
  }
};

/**
 * Determine whether the link text looks relevant to an
 * official exam document.
 */
const looksRelevant = (text: string): boolean => {
  const normalized = text.toLowerCase();

  return NOTIFICATION_KEYWORDS.some((keyword) => normalized.includes(keyword));
};

/**
 * Find PDF links that are likely to be relevant documents.
 */
export const findPdfCandidates = (
  links: DiscoveredLink[],
): DiscoveredLink[] => {
  return links.filter((link) => {
    return isPdfUrl(link.url) && looksRelevant(link.text);
  });
};
