// src/scraper/discovery/discoverLinks.ts

import * as cheerio from "cheerio";

export interface DiscoveredLink {
  /**
   * Visible text of the link.
   */
  text: string;

  /**
   * Absolute URL.
   */
  url: string;
}

/**
 * Extract all anchor links from an HTML document.
 *
 * Relative URLs are converted to absolute URLs using baseUrl.
 */
export const discoverLinks = (
  html: string,
  baseUrl: string,
): DiscoveredLink[] => {
  const $ = cheerio.load(html);

  const links: DiscoveredLink[] = [];

  /**
   * Prevent duplicate URLs on the same page.
   */
  const seen = new Set<string>();

  $("a[href]").each((_, element) => {
    const href = $(element).attr("href");

    if (!href) {
      return;
    }

    try {
      const urlObject = new URL(href, baseUrl);

      /**
       * Remove URL fragments.
       *
       * These do not represent a different page:
       *
       * /notice#section1
       * /notice#section2
       *
       * Both are the same document.
       */
      urlObject.hash = "";

      const url = urlObject.href;

      if (seen.has(url)) {
        return;
      }

      seen.add(url);

      const text = $(element).text().replace(/\s+/g, " ").trim();

      links.push({
        text,
        url,
      });
    } catch {
      /**
       * Ignore malformed URLs.
       */
    }
  });

  return links;
};
