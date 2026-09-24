import { chromium } from "playwright";

/**
 * Fetch a JavaScript-rendered page using Chromium.
 *
 * Some official websites are SPAs (for example Angular/React apps).
 * A normal fetch() only receives the initial HTML shell.
 *
 * Playwright loads the page like a real browser, allowing the
 * JavaScript application to render its content.
 */
export const fetchRenderedPage = async (url: string): Promise<string> => {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle", //to be moved to waitUntil: "domcontentloaded"
      timeout: 30_000,
    });

    /**
     * page.content() returns the DOM after JavaScript has executed.
     */
    return await page.content();
  } finally {
    /**
     * Always close Chromium, including when an error occurs.
     */
    await browser.close();
  }
};
